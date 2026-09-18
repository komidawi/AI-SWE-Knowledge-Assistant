#!/usr/bin/env node

// Actual hours from Toggl Track, grouped by entry description and matched to kb ids by name.
// Finished entries only - running timers are skipped. Read-only: prints, writes nothing.
// Token from env TOGGL_API_TOKEN (Toggl → Profile → API Token).
//
//   node system/scripts/toggl.mjs                 # current ISO week
//   node system/scripts/toggl.mjs 2026-W38        # an ISO week
//   node system/scripts/toggl.mjs 2026-09-01 2026-09-30
//   node system/scripts/toggl.mjs 2026-W38 --json
//
// Unmatched (`?`) or ambiguous rows are for the caller to resolve by asking - never guessed.

import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {load, isoDate} from './lib/entities.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const API = 'https://api.track.toggl.com/api/v9'

let candidates = []

// Errors set the exit code and let Node exit on its own: process.exit() with fetch's handles
// still closing trips a libuv assertion on Windows.
main().catch(e => {
    console.error(`toggl: ${e.message}`)
    process.exitCode = 1
})

async function main() {
    const args = process.argv.slice(2)
    const json = args.includes('--json')
    const [from, to] = range(args.filter(a => !a.startsWith('--')))

    const token = process.env.TOGGL_API_TOKEN
    if (!token) fail('TOGGL_API_TOKEN not set')

    const url = `${API}/me/time_entries?meta=true&start_date=${encodeURIComponent(rfc3339(from))}&end_date=${encodeURIComponent(rfc3339(isoDate(addDays(new Date(to + 'T00:00:00'), 1))))}`
    const res = await fetch(url, {headers: {Authorization: 'Basic ' + Buffer.from(`${token}:api_token`).toString('base64')}})
    if (!res.ok) fail(`Toggl ${res.status}: ${await res.text()}`)
    const entries = await res.json()

    candidates = [
        ...load(ROOT, 'kb/resources'),
        ...load(ROOT, 'kb/goals'),
        ...load(ROOT, 'kb/ideas')
    ].map(e => ({id: e.id, keys: [norm(e.id), norm(e.fm.title ?? '')].filter(Boolean)}))

    const groups = new Map()
    for (const e of entries.filter(e => e.duration >= 0)) { // running timers (duration < 0) never count
        const desc = (e.description ?? '').trim() || '(no description)'
        const g = groups.get(desc) ?? {description: desc, project: e.project_name ?? null, seconds: 0}
        g.seconds += e.duration
        groups.set(desc, g)
    }

    const rows = [...groups.values()]
        .map(g => ({...g, hours: +(g.seconds / 3600).toFixed(2), matches: match(g.description)}))
        .sort((a, b) => b.seconds - a.seconds)
    const total = +(rows.reduce((s, r) => s + r.seconds, 0) / 3600).toFixed(2)

    if (json) {
        console.log(JSON.stringify({from, to, total_hours: total, rows: rows.map(({seconds, ...r}) => r)}, null, 2))
    } else {
        console.log(`Toggl ${from} … ${to} — ${total}h`)
        for (const r of rows) {
            const id = r.matches.length === 1 ? r.matches[0] : r.matches.length ? `? ${r.matches.join(' | ')}` : '?'
            console.log(`${r.hours.toFixed(2).padStart(6)}h  ${id.padEnd(40)}  ${r.description}`)
        }
    }
}

// Description matches an entity when it contains the entity's id or title, word-bounded.
// The longest hit wins, so "system design course" beats "system design".
function match(desc) {
    const d = ` ${norm(desc)} `
    const hits = candidates
        .map(c => ({id: c.id, len: Math.max(0, ...c.keys.filter(k => d.includes(` ${k} `)).map(k => k.length))}))
        .filter(h => h.len > 0)
    const best = Math.max(0, ...hits.map(h => h.len))
    return hits.filter(h => h.len === best).map(h => h.id)
}

function norm(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function range(pos) {
    if (pos.length === 2) return pos.map(checkDate)
    if (pos.length === 1 && /^\d{4}-W\d{2}$/.test(pos[0])) return isoWeek(pos[0])
    if (pos.length === 1) return [checkDate(pos[0]), checkDate(pos[0])]
    const monday = new Date()
    monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7)
    return [isoDate(monday), isoDate(addDays(monday, 6))]
}

// Local-time dates throughout: isoDate() formats local, and the week is the user's week.
function isoWeek(w) {
    const [y, n] = w.split('-W').map(Number)
    const jan4 = new Date(y, 0, 4)
    const monday = addDays(jan4, -((jan4.getDay() + 6) % 7) + (n - 1) * 7)
    return [isoDate(monday), isoDate(addDays(monday, 6))]
}

function addDays(d, n) {
    const r = new Date(d)
    r.setDate(r.getDate() + n)
    return r
}

// Local midnight as RFC3339 with offset, so Toggl doesn't cut the day at UTC midnight.
function rfc3339(date) {
    const d = new Date(date + 'T00:00:00')
    const off = -d.getTimezoneOffset()
    const sign = off >= 0 ? '+' : '-'
    const hh = String(Math.floor(Math.abs(off) / 60)).padStart(2, '0')
    const mm = String(Math.abs(off) % 60).padStart(2, '0')
    return `${date}T00:00:00${sign}${hh}:${mm}`
}

function checkDate(s) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) fail(`not a YYYY-MM-DD date or YYYY-Www week: ${s}`)
    return s
}

function fail(msg) {
    throw new Error(msg)
}
