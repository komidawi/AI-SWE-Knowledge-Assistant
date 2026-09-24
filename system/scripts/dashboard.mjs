#!/usr/bin/env node

// Builds README.md — the repo's front page — from the Markdown frontmatter, plus the SVG charts it
// embeds. Derived, disposable, always rebuildable:
//
//   node system/scripts/dashboard.mjs
//
// Reads the entity files and kb/taxonomy/rubrics.md. Writes README.md and system/assets/dashboard/*.svg.

import {mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {load as loadEntities, isoDate, isDate, pad} from './lib/entities.mjs'
import {THEMES, card, fit, rect, ring, segments, svg, text} from './lib/svg.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const TODAY = isoDate(new Date())
const STALE_DAYS = 21

function load(dir) {
    return loadEntities(ROOT, dir)
}

// --- Markdown body helpers ---------------------------------------------------------------------

function section(body, heading) {
    const start = new RegExp(`^##+\\s+${heading}\\s*$`, 'mi').exec(body)
    if (!start) return ''
    const rest = body.slice(start.index + start[0].length)
    const end = /^##\s+/m.exec(rest)
    return end ? rest.slice(0, end.index) : rest
}

function tasks(text) {
    return [...text.matchAll(/^\s*[-*]\s+\[([ xX])\]\s*(.*)$/gm)].map(m => ({
        done: m[1] !== ' ',
        text: m[2].trim(),
        date: (/`(\d{4}-\d{2}-\d{2})`/.exec(m[2]) || [])[1] ?? null
    }))
}

function stripDate(text) {
    return text.replace(/^`\d{4}-\d{2}-\d{2}`\s*[—-]?\s*/, '').trim()
}

// --- Dates -------------------------------------------------------------------------------------

function daysBetween(from, to) {
    if (!isDate(from) || !isDate(to)) return null
    return Math.round((Date.parse(to) - Date.parse(from)) / 86400000)
}

function isoWeekId(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
    return `${d.getUTCFullYear()}-W${pad(week)}`
}

// Display form, e.g. `W37(07-13.09)`, `W40(28.09-04.10)` — see CLAUDE.md rule 5.
function weekLabel(date) {
    const mon = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    mon.setUTCDate(mon.getUTCDate() + 1 - (mon.getUTCDay() || 7))
    const sun = new Date(mon)
    sun.setUTCDate(mon.getUTCDate() + 6)
    const dm = x => `${pad(x.getUTCDate())}.${pad(x.getUTCMonth() + 1)}`
    const from = mon.getUTCMonth() === sun.getUTCMonth() ? pad(mon.getUTCDate()) : dm(mon)
    return `${isoWeekId(date).slice(5)}(${from}-${dm(sun)})`
}

function age(date) {
    const days = daysBetween(date, TODAY)
    if (days === null) return '?'
    return days === 0 ? 'today' : `${days}d ago`
}

// --- Scale -------------------------------------------------------------------------------------
// `scale:` is the bucket, `effort:` is the number. Both are stored so `rg 'scale: snack'` works
// without tooling, so the two can drift — scaleFor() is the single definition of the bands and
// the mismatch check below is what keeps them honest.

const SCALES = ['multi-day', 'full-day', 'deep-dive', 'short', 'snack']
const SMALL = ['short', 'snack']

function parseEffort(value) {
    const m = /^\s*(\d+(?:\.\d+)?)\s*(h|hr|hrs|hours?|m|min|mins|minutes?)\s*$/i.exec(value ?? '')
    if (!m) return null
    return /^m/i.test(m[2]) ? Number(m[1]) / 60 : Number(m[1])
}

function scaleFor(hours) {
    if (hours === null) return null
    if (hours > 8) return 'multi-day'
    if (hours >= 3) return 'full-day'
    if (hours >= 1) return 'deep-dive'
    if (hours >= 1 / 3) return 'short'
    return 'snack'
}

// --- Rendering ---------------------------------------------------------------------------------

// Pads columns so the raw Markdown stays readable in an editor, not only once rendered.
function table(headers, rows) {
    if (rows.length === 0) return '_None._\n'
    const widths = headers.map((h, i) =>
        Math.max(h.length, ...rows.map(r => String(r[i] ?? '').length))
    )
    const line = cells => `| ${cells.map((c, i) => String(c ?? '').padEnd(widths[i])).join(' | ')} |`
    return [
        line(headers),
        `|${widths.map(w => '-'.repeat(w + 2)).join('|')}|`,
        ...rows.map(line)
    ].join('\n') + '\n'
}

function cell(value) {
    return String(value ?? '').replace(/\|/g, '\\|')
}

// GitHub doesn't resolve `[[id]]`, so ids become relative links to the entity file.
function link(id) {
    const rel = paths.get(id)
    return rel ? `[${id}](${encodeURI(rel)})` : id
}

function linkify(value) {
    return String(value ?? '').replace(/`?\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]`?/g, (_, id) => link(id.trim()))
}

// --- Model -------------------------------------------------------------------------------------

const ideas = load('kb/ideas')
const resources = load('kb/resources')
const areas = load('kb/areas')
const plans = load('kb/planning')

const goals = load('kb/goals').map(g => {
    const milestones = tasks(section(g.body, 'Milestones'))
    const criteria = tasks(section(g.body, 'Success criteria'))
    return {
        ...g,
        milestones,
        criteria,
        weeksLeft: isDate(g.fm.target) ? Math.round(daysBetween(TODAY, g.fm.target) / 7) : null,
        // Only an active goal's dates are commitments; draft and on-hold goals cannot slip.
        overdue: g.fm.status === 'active' ? milestones.filter(m => !m.done && isDate(m.date) && m.date < TODAY) : []
    }
})

const paths = new Map([...ideas, ...resources, ...areas, ...plans, ...goals]
    .map(e => [e.id, e.rel.replace(/\\/g, '/')]))

const activeGoals = goals.filter(g => g.fm.status === 'active')
const draftGoals = goals.filter(g => g.fm.status === 'draft')
const liveGoals = [...activeGoals, ...draftGoals]
const inFlight = resources.filter(r => r.fm.status === 'in-progress')
const stalled = inFlight.filter(r => (daysBetween(r.fm.updated, TODAY) ?? 0) > STALE_DAYS)
const inbox = ideas.filter(i => i.fm.status === 'inbox')

// What fits a gap: small, still unread, and not something that only entertains.
const PRIORITIES = ['high', 'medium', 'low']
const quickWins = resources
    .filter(r => r.fm.status === 'backlog' && SMALL.includes(r.fm.scale) && r.fm.nature !== 'trivia')
    .sort((a, b) => PRIORITIES.indexOf(a.fm.priority) - PRIORITIES.indexOf(b.fm.priority)
        || SMALL.indexOf(a.fm.scale) - SMALL.indexOf(b.fm.scale))

const misScaled = resources
    .map(r => ({...r, expected: scaleFor(parseEffort(r.fm.effort))}))
    .filter(r => r.expected && r.fm.scale && r.fm.scale !== r.expected)

const unclassified = resources.filter(r => !r.fm.scale || !r.fm.nature)

const weekId = isoWeekId(new Date())
const weekText = weekLabel(new Date())
const week = plans.find(p => p.id === weekId)
const committed = week ? tasks(section(week.body, 'Committed')) : []
const weekDone = committed.filter(t => t.done).length

const gaps = areas
    .map(a => ({...a, gap: Number(a.fm.target_level) - Number(a.fm.level)}))
    .filter(a => Number.isFinite(a.gap))
    .sort((a, b) => b.gap - a.gap)

// --- Needs attention ---------------------------------------------------------------------------
// Ordered by how much each item blocks everything downstream of it. The first one becomes the lead.

const attention = []

for (const g of goals) {
    for (const m of g.overdue) {
        attention.push({
            what: `Milestone slipped \`${m.date}\``,
            where: link(g.id),
            why: stripDate(m.text) || 'past its date and still open'
        })
    }
}

if (goals.length > 0 && activeGoals.length === 0) {
    attention.push({
        what: 'No goal is `active`',
        where: draftGoals.map(g => link(g.id)).join(', ') || '`kb/goals/`',
        why: 'Nothing for resources or weeks to be prioritised against'
    })
}

for (const g of activeGoals) {
    if (!Number(g.fm.weekly_hours)) {
        attention.push({
            what: '`weekly_hours` is 0',
            where: link(g.id),
            why: 'Capacity cannot be checked, so the milestone pace is unverified'
        })
    }
}

if (week && !Number(week.fm.capacity_hours)) {
    attention.push({
        what: '`capacity_hours` is 0',
        where: link(weekId),
        why: 'The week is committed to work with no stated budget'
    })
}

for (const r of stalled) {
    attention.push({
        what: `Stalled ${daysBetween(r.fm.updated, TODAY)}d`,
        where: link(r.id),
        why: `In progress, untouched since \`${r.fm.updated}\``
    })
}

for (const r of misScaled) {
    attention.push({
        what: `\`scale: ${r.fm.scale}\` vs \`effort: ${r.fm.effort}\``,
        where: link(r.id),
        why: `\`${r.fm.effort}\` falls in \`${r.expected}\` — one of the two is wrong`
    })
}

for (const r of unclassified) {
    attention.push({
        what: `Missing \`${!r.fm.scale ? 'scale' : 'nature'}\``,
        where: link(r.id),
        why: 'Cannot be picked by available time or filtered out of planned hours'
    })
}

if (inbox.length > 4) {
    attention.push({
        what: `${inbox.length} untriaged ideas`,
        where: '`kb/ideas/`',
        why: 'Run `/groom` — inbox items are invisible to planning'
    })
}

if (!week) {
    attention.push({
        what: `No plan for ${weekText}`,
        where: '`kb/planning/`',
        why: 'Run `/plan-week`'
    })
}

const lead = attention[0]
    ? `**${attention[0].what}** — ${attention[0].where}. ${linkify(attention[0].why)}.`
    : '**Nothing is blocked.** Goals, the week and in-flight work are all current.'

// [[value, n]] in vocabulary order; values outside `order` (or no order) sort alphabetically last.
function counts(items, field = 'status', order = []) {
    const tally = new Map()
    for (const item of items) {
        const value = item.fm[field] || 'none'
        tally.set(value, (tally.get(value) ?? 0) + 1)
    }
    const rank = value => (order.includes(value) ? order.indexOf(value) : order.length)
    return [...tally].sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]))
}

function breakdown(items, field = 'status', order = []) {
    return counts(items, field, order).map(([value, n]) => `${value} ${n}`).join(' · ') || '—'
}

const IDEA_STATUSES = ['inbox', 'considering', 'accepted', 'active', 'done', 'dropped']
const RESOURCE_STATUSES = ['backlog', 'in-progress', 'done', 'dropped', 'reference']
const NATURES = ['core', 'applied', 'case-study', 'perspective', 'lookup', 'trivia']

// Level names from the rubric table, so the meter labels can't drift from kb/taxonomy/rubrics.md.
const LEVELS = [...section(readFileSync(join(ROOT, 'kb/taxonomy/rubrics.md'), 'utf8'), 'Self-assessment levels.*')
    .matchAll(/^\|\s*(\d+)\s*\|\s*([^—|]+?)\s*[—|]/gm)].map(m => m[2])

const committedHours = committed.reduce((sum, t) => sum + Number((/\((\d+(?:\.\d+)?)h\)/.exec(t.text) || [])[1] ?? 0), 0)


// --- Display helpers ---------------------------------------------------------------------------
// The entity files are written for editing; these shorten them for scanning.

function fmtHours(hours) {
    const mins = Math.round(hours * 60)
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return [h ? `${h}h` : '', m ? `${m}m` : ''].filter(Boolean).join(' ') || '0h'
}

// Resources and areas read better by title; goals and plans have ids that already are one.
function label(id) {
    const e = byId.get(id)
    if (!e || e.fm.type === 'goal' || e.fm.type === 'plan') return id
    return e.fm.title || id
}

function titleLink(id) {
    const rel = paths.get(id)
    return rel ? `[${label(id)}](${encodeURI(rel)})` : id
}

function titleLinkify(value) {
    return String(value ?? '').replace(/`?\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]`?/g, (_, id) => titleLink(id.trim()))
}

// "Attempts, Easy + Medium: A, B, … (~32h). Reprioritized …" → "Attempts, Easy + Medium (16)".
// Headline = text before the first " — ", "; ", " (" or ". "; a long colon list collapses to its count.
function headline(text) {
    let head = stripDate(text).split(/ — |; | \(|\. /)[0].replace(/,\s*reprioriti[sz]ed \d{4}-\d{2}-\d{2}$/i, '').trim()
    const list = /^(.*?):\s*(.+)$/.exec(head)
    if (list && list[2].split(',').length > 3) head = `${list[1]} (${list[2].split(',').length})`
    return head
}

function effortOf(text) {
    return (/~(\d+(?:\.\d+)?h)/.exec(text) || [])[1] ?? '—'
}

function shortTitle(goal) {
    return String(goal.fm.title || goal.id).split(' — ')[0]
}

// Emoji squares render the same everywhere; block characters don't in GitHub's fonts.
function bar(done, total, width = 10) {
    const on = total ? Math.min(width, Math.max(done > 0 ? 1 : 0, Math.round((done / total) * width))) : 0
    return '🟩'.repeat(on) + '⬜'.repeat(width - on)
}

// Non-breaking hyphens keep dates and ids on one line in narrow table cells.
function nb(value) {
    return String(value).replace(/-/g, '\u2011')
}

// `progress:` is "Part: state — note · Part: state". Fractions become one bar; notes a "next" line.
function progressLines(progress) {
    const parts = String(progress ?? '').split(' · ').map(p => p.trim()).filter(Boolean)
    const notes = []
    const fractions = []
    const states = []
    for (const part of parts) {
        const [state, ...rest] = part.split(' — ')
        if (rest.length) notes.push(rest.join(' — '))
        const f = /^(.+?):\s*(\d+)\/(\d+)$/.exec(state.trim())
        if (f) fractions.push({name: f[1], done: Number(f[2]), total: Number(f[3])})
        else {
            const s = /^([^:]{1,20}):\s*(.+)$/.exec(state.trim())
            states.push(s ? `**${s[1]}:** ${s[2]}` : state.trim())
        }
    }
    const lines = []
    if (fractions.length) {
        const done = fractions.reduce((n, f) => n + f.done, 0)
        const total = fractions.reduce((n, f) => n + f.total, 0)
        lines.push(`${bar(done, total)} **${done}/${total}** — ${fractions.map(f => `${f.name} ${f.done}/${f.total}`).join(' · ')}`)
    }
    lines.push(...states)
    for (const n of notes) lines.push(`➜ ${n}`)
    return lines
}

// Week tasks: "(2h) — [[id]]: what" → hours + the rest.
function weekTask(t) {
    const m = /^\((\d+(?:\.\d+)?\s*(?:h|m))\)\s*[—-]\s*/.exec(t.text)
    return {...t, effort: m ? m[1].replace(/\s/g, '') : null, hours: m ? parseEffort(m[1]) : 0, what: m ? t.text.slice(m[0].length) : t.text}
}

const byId = new Map([...ideas, ...resources, ...areas, ...plans, ...goals].map(e => [e.id, e]))
const weekTasks = committed.map(weekTask)
const weekOpen = weekTasks.filter(t => !t.done)
const weekHoursDone = weekTasks.filter(t => t.done).reduce((s, t) => s + t.hours, 0)
const weekHours = weekTasks.reduce((s, t) => s + t.hours, 0)

const openMilestones = activeGoals
    .flatMap(g => g.milestones.filter(m => !m.done && isDate(m.date)).map(m => ({...m, goal: g})))
    .sort((a, b) => a.date.localeCompare(b.date))
const nextMilestone = openMilestones[0]
const behindGoals = activeGoals.filter(g => g.overdue.length > 0)

// --- Charts ------------------------------------------------------------------------------------
// Each chart is a function of a theme, rendered once per theme.

const W = 880

function kpiChart(t) {
    const gap = 12
    const w = (W - gap * 3) / 4
    const h = 112
    const tile = (i, label, value, sub, {color = t.text, subColor = t.muted, extra = '', valueWidth = w - 36} = {}) => {
        const x = i * (w + gap)
        return card(x, 0, w, h, t)
            + text(x + 18, 30, fit(label, 11, w - 36), t.muted, {size: 11, weight: 600, spacing: 0.6})
            + text(x + 18, 74, fit(value, 34, valueWidth), color, {size: 34, weight: 600})
            + text(x + 18, 97, fit(sub, 12, w - 36), subColor, {size: 12})
            + extra
    }
    const x0 = 0
    const pct = weekHours ? weekHoursDone / weekHours : 0
    const weekRing = week
        ? ring(x0 + w - 44, 66, 25, pct, t.good, t.track, 7)
        + text(x0 + w - 44, 71, `${Math.round(pct * 100)}%`, t.text, {size: 13, weight: 600, anchor: 'middle'})
        : ''
    const nextIn = nextMilestone ? daysBetween(TODAY, nextMilestone.date) : null
    return svg(W, h, [
        tile(0, 'THIS WEEK', week ? `${weekTasks.length - weekOpen.length}/${weekTasks.length}` : '—',
            week ? `${fmtHours(weekHoursDone)} / ${fmtHours(weekHours)} done` : 'no plan — run /plan-week',
            {extra: weekRing, valueWidth: w - 110, subColor: week ? t.muted : t.bad}),
        tile(1, nextMilestone ? `NEXT MILESTONE · ${nextMilestone.date}` : 'NEXT MILESTONE',
            nextMilestone ? (nextIn < 0 ? `${-nextIn}d late` : `in ${nextIn}d`) : '—',
            nextMilestone ? headline(nextMilestone.text) : 'none dated',
            {color: nextIn !== null && nextIn < 0 ? t.bad : t.text}),
        tile(2, 'GOALS ON TRACK', `${activeGoals.length - behindGoals.length}/${activeGoals.length}`,
            behindGoals.length ? `${behindGoals.length} behind — milestone slipped` : `${openMilestones.length} milestones open`,
            {color: behindGoals.length ? t.bad : t.good, subColor: behindGoals.length ? t.bad : t.muted}),
        tile(3, 'NEEDS ATTENTION', attention.length,
            `${stalled.length} stalled · ${inbox.length} in inbox`,
            {color: attention.length ? t.bad : t.good})
    ].join('\n'))
}

function goalsChart(t) {
    const h = 150
    const gap = 12
    const x0 = 24
    const x1 = W - 24
    const rows = liveGoals.map((g, i) => {
        const y = i * (h + gap)
        const span = daysBetween(g.fm.start, g.fm.target)
        const at = date => {
            const d = daysBetween(g.fm.start, date)
            return x0 + (span > 0 && d !== null ? Math.max(0, Math.min(1, d / span)) : 0) * (x1 - x0)
        }
        const late = g.overdue.length > 0
        const left = g.weeksLeft === null ? '' : g.weeksLeft < 0 ? `${-g.weeksLeft} wk over` : `${g.weeksLeft} wk left`
        const ty = y + 88
        const todayX = at(TODAY)
        const next = g.milestones.find(m => !m.done && isDate(m.date))
        const dots = g.milestones.filter(m => isDate(m.date)).map(m => {
            const cx = at(m.date).toFixed(1)
            if (m.done) return `<circle cx="${cx}" cy="${ty + 3}" r="6" fill="${t.good}"/>`
            if (m.date < TODAY) return `<circle cx="${cx}" cy="${ty + 3}" r="6" fill="${t.bad}"/>`
            if (m === next) return `<circle cx="${cx}" cy="${ty + 3}" r="7" fill="${t.accent}" stroke="${t.surface}" stroke-width="2"/>`
            return `<circle cx="${cx}" cy="${ty + 3}" r="5" fill="${t.surface}" stroke="${t.accent}" stroke-width="2"/>`
        }).join('')
        const mDone = g.milestones.filter(m => m.done).length
        const cDone = g.criteria.filter(c => c.done).length
        const badge = late ? 'BEHIND' : g.fm.status === 'active' ? 'ON TRACK' : g.fm.status.toUpperCase()
        const badgeColor = late ? t.bad : g.fm.status === 'active' ? t.good : t.muted
        const bw = badge.length * 7.2 + 18
        const nextIn = next ? daysBetween(TODAY, next.date) : null
        const nextText = next ? `Next: ${headline(next.text)} — ${next.date} (${nextIn < 0 ? `${-nextIn}d late` : `in ${nextIn}d`})` : 'No dated milestone left'
        return [
            card(0, y, W, h, t),
            text(x0, y + 32, fit(shortTitle(g), 16, W - 150), t.text, {size: 16, weight: 600}),
            rect(x1 - bw, y + 16, bw, 22, badgeColor, {r: 11, opacity: 0.15, stroke: badgeColor}),
            text(x1 - bw / 2, y + 31, badge, badgeColor, {size: 11, weight: 700, anchor: 'middle', spacing: 0.5}),
            text(x0, y + 54, `${g.id} · ${g.fm.weekly_hours || 0} h/wk · milestones ${mDone}/${g.milestones.length} · criteria ${cDone}/${g.criteria.length}`, t.muted, {size: 12}),
            text(x1, y + 54, left, late ? t.bad : t.muted, {size: 12, weight: 600, anchor: 'end'}),
            rect(x0, ty, x1 - x0, 6, t.track, {r: 3}),
            rect(x0, ty, todayX - x0, 6, t.accent, {r: 3, opacity: 0.45}),
            `<line x1="${todayX.toFixed(1)}" y1="${ty - 8}" x2="${todayX.toFixed(1)}" y2="${ty + 14}" stroke="${t.text}" stroke-width="1.5"/>`,
            text(todayX, ty - 12, 'today', t.text, {size: 10, weight: 600, anchor: todayX < x0 + 20 ? 'start' : todayX > x1 - 20 ? 'end' : 'middle'}),
            dots,
            text(x0, ty + 26, g.fm.start, t.muted, {size: 11}),
            text(x1, ty + 26, g.fm.target, t.muted, {size: 11, anchor: 'end'}),
            text(x0, y + 136, fit(nextText, 13, W - 48), late ? t.bad : t.text, {size: 13, weight: 600})
        ].join('')
    })
    return svg(W, liveGoals.length * (h + gap) - gap, rows.join('\n'))
}

function areasChart(t) {
    const rowH = 76
    const h = gaps.length * rowH + 8
    const mx = 380
    const mw = W - 24 - mx
    const n = LEVELS.length || 5
    const seg = (mw - 4 * (n - 1)) / n
    const rows = gaps.map((a, i) => {
        const y = 4 + i * rowH
        const level = Number(a.fm.level)
        const target = Number(a.fm.target_level)
        const meter = Array.from({length: n}, (_, k) => {
            const x = mx + k * (seg + 4)
            const lvl = k + 1
            const bar = lvl <= level ? rect(x, y + 22, seg, 10, t.accent, {r: 5})
                : lvl <= target ? rect(x + 0.5, y + 22.5, seg - 1, 9, t.accent, {r: 4.5, opacity: 0.15, stroke: t.accent, dash: '3 2'})
                    : rect(x, y + 22, seg, 10, t.track, {r: 5})
            return bar + text(x + seg / 2, y + 52, `${lvl} ${LEVELS[k] ?? ''}`.trim(),
                lvl === level ? t.text : t.muted, {size: 11, weight: lvl === level ? 600 : 400, anchor: 'middle'})
        }).join('')
        return [
            i > 0 ? rect(24, y - 1, W - 48, 1, t.border) : '',
            text(24, y + 32, fit(a.fm.title || a.id, 14, mx - 48), t.text, {size: 14, weight: 600}),
            text(24, y + 52, `level ${level} → ${target} · reviewed ${age(a.fm.reviewed)}`, t.muted, {size: 12}),
            meter
        ].join('')
    })
    return svg(W, h + 8, card(0, 0, W, h + 8, t) + '\n' + rows.join('\n'))
}

function shapeChart(t) {
    const series = [
        ['Resources by status', counts(resources, 'status', RESOURCE_STATUSES), RESOURCE_STATUSES],
        ['Resources by scale', counts(resources, 'scale', SCALES), SCALES],
        ['Resources by nature', counts(resources, 'nature', NATURES), NATURES],
        ['Ideas by status', counts(ideas, 'status', IDEA_STATUSES), IDEA_STATUSES]
    ]
    const rowH = 84
    const bw = W - 48
    const rows = series.map(([label, entries, order], i) => {
        const y = 8 + i * rowH
        const total = entries.reduce((s, [, n]) => s + n, 0)
        const color = value => t.series[(order.includes(value) ? order.indexOf(value) : order.length) % t.series.length]
        let x = 24
        const bars = entries.map(([value, n]) => {
            const w = total ? (n / total) * bw : 0
            const r = rect(x.toFixed(1), y + 32, Math.max(0, w - 2).toFixed(1), 14, color(value), {r: 3})
            x += w
            return r
        }).join('')
        let lx = 24
        const legend = entries.map(([value, n]) => {
            const s = `${value} ${n}`
            const out = rect(lx, y + 58, 10, 10, color(value), {r: 2}) + text(lx + 15, y + 67, s, t.muted, {size: 12})
            lx += 15 + s.length * 6.8 + 18
            return out
        }).join('')
        return text(24, y + 22, label, t.text, {size: 13, weight: 600})
            + text(W - 24, y + 22, total, t.muted, {size: 12, anchor: 'end'})
            + bars + legend
    })
    const h = series.length * rowH + 12
    return svg(W, h, card(0, 0, W, h, t) + '\n' + rows.join('\n'))
}

// --- Output ------------------------------------------------------------------------------------

const ASSETS = 'system/assets/dashboard'
mkdirSync(join(ROOT, ASSETS), {recursive: true})
for (const f of readdirSync(join(ROOT, ASSETS))) if (f.endsWith('.svg')) rmSync(join(ROOT, ASSETS, f))

function picture(name, chart, alt) {
    for (const [theme, t] of Object.entries(THEMES)) {
        writeFileSync(join(ROOT, ASSETS, `${name}-${theme}.svg`), chart(t))
    }
    return [
        '<picture>',
        `  <source media="(prefers-color-scheme: dark)" srcset="${ASSETS}/${name}-dark.svg">`,
        `  <img src="${ASSETS}/${name}-light.svg" alt="${alt}">`,
        '</picture>',
        ''
    ].join('\n')
}

const out = []

out.push('<!-- Generated by system/scripts/dashboard.mjs. Do not edit by hand — edit the entity files and')
out.push('     rerun `node system/scripts/dashboard.mjs`. The Markdown entities are the source of truth. -->')
out.push('')
out.push('<h1 align="center">AI_SKILL_ASSISTANT</h1>')
out.push('')
out.push('<p align="center">Software-engineering skill growth — goals, resources, weekly plans.<br>')
out.push(`<code>${TODAY}</code> · <code>${weekText}</code> · <a href="docs/guide.md">Guide</a> · <a href="CLAUDE.md">Conventions</a></p>`)
out.push('')
out.push('<p align="center">')
out.push('<a href="#-now">Now</a> · <a href="#-goals">Goals</a> · <a href="#-in-flight">In flight</a> · <a href="#-areas">Areas</a> · <a href="#-backlog">Backlog</a>')
out.push('</p>')
out.push('')
out.push(picture('kpi', kpiChart,
    `Week ${weekTasks.length - weekOpen.length}/${weekTasks.length} done, next milestone ${nextMilestone?.date ?? 'none'}, ${activeGoals.length - behindGoals.length}/${activeGoals.length} goals on track, ${attention.length} needing attention`))

// --- Now: status line + the one thing to do next -----------------------------------------------

out.push('## 🧭 Now')
out.push('')
const up = weekOpen[0]
const nextUp = up ? `**Next up:** ${titleLinkify(up.what)}${up.effort ? ` · \`${up.effort}\`` : ''}` : ''
if (attention.length) {
    out.push('> [!WARNING]')
    out.push(`> ${lead}`)
    if (nextUp) out.push('>', `> ${nextUp}`)
} else {
    out.push('> [!TIP]')
    out.push('> **On track** — nothing blocked; goals, week and in-flight work are current.')
    if (nextUp) out.push('>', `> ${nextUp}`)
}
out.push('')

if (attention.length > 1) {
    out.push('<details open>')
    out.push(`<summary><b>⚠️ ${attention.length - 1} more need attention</b></summary>`)
    out.push('')
    out.push(table(
        ['What', 'Where', 'Why it matters'],
        attention.slice(1, 6).map(a => [cell(a.what), a.where, cell(linkify(a.why))])
    ))
    out.push('</details>')
    out.push('')
}

out.push(`### 🗓️ This week — \`${weekText}\``)
out.push('')
if (!week) {
    out.push('_No week file. Run `/plan-week`._')
} else {
    const pct = weekHours ? Math.round((weekHoursDone / weekHours) * 100) : 0
    out.push(`${bar(weekHoursDone, weekHours)} **${pct}%** · ${fmtHours(weekHoursDone)} of ${fmtHours(weekHours)} done`
        + ` · ${fmtHours(weekHours - weekHoursDone)} left · capacity ${week.fm.capacity_hours}h · ${link(weekId)}`)
    out.push('')
    // Open first — the list is read top-down as a to-do.
    for (const t of [...weekOpen, ...weekTasks.filter(x => x.done)]) {
        const what = titleLinkify(t.what)
        out.push(`- [${t.done ? 'x' : ' '}] ${t.effort ? `\`${t.effort.padStart(3)}\` ` : ''}${t.done ? `~~${what}~~` : what}`)
    }
}
out.push('')

// --- Goals ---------------------------------------------------------------------------------------

out.push('## 🎯 Goals')
out.push('')
if (liveGoals.length === 0) {
    out.push('_No active or draft goals._')
    out.push('')
} else {
    out.push(picture('goals', goalsChart, liveGoals.map(g => g.id).join(', ')))
    out.push(liveGoals.map(g => `**${link(g.id)}** — ${cell(shortTitle(g))}`).join('<br>\n'))
    out.push('')
}

if (openMilestones.length > 0) {
    out.push('### 🏁 Milestones ahead')
    out.push('')
    out.push(table(
        ['Due', 'In', 'Goal', 'Milestone', 'Effort'],
        openMilestones.slice(0, 6).map(m => {
            const days = daysBetween(TODAY, m.date)
            return [nb(m.date), days < 0 ? `🔴 ${-days}d late` : days <= 14 ? `🟡 ${days}d` : `${days}d`,
                `[${nb(m.goal.id)}](${encodeURI(paths.get(m.goal.id))})`, cell(headline(m.text)), effortOf(m.text)]
        })
    ))
    out.push('<sub>🟡 due within 2 weeks · 🔴 late · full milestone text lives in the goal file</sub>')
    out.push('')
}

// --- In flight -----------------------------------------------------------------------------------

out.push('## 📖 In flight')
out.push('')
if (inFlight.length === 0) out.push('_Nothing in progress._')
for (const r of inFlight) {
    const stale = stalled.includes(r)
    out.push(`**${titleLink(r.id)}** · ${[r.fm.kind, r.fm.effort, r.fm.priority && `${r.fm.priority} priority`].filter(Boolean).join(' · ')}`
        + ` · ${stale ? `🔴 stalled, updated ${age(r.fm.updated)}` : `updated ${age(r.fm.updated)}`}`)
    out.push('')
    for (const line of progressLines(r.fm.progress)) out.push(`- ${titleLinkify(line)}`)
    out.push('')
}

// --- Areas ---------------------------------------------------------------------------------------

if (gaps.length > 0) {
    out.push('## 📈 Areas')
    out.push('')
    out.push(picture('areas', areasChart, gaps.map(a => `${a.id} level ${a.fm.level} of target ${a.fm.target_level}`).join(', ')))
    out.push(gaps.map(a => titleLink(a.id)).join(' · '))
    out.push('')
}

// --- Backlog ---------------------------------------------------------------------------------------

out.push('## 📚 Backlog')
out.push('')
out.push('<details>')
out.push(`<summary><b>⏱️ Pick by time</b> — ${quickWins.length} short reads that fit a gap</summary>`)
out.push('')
out.push(table(
    ['Priority', 'Effort', 'Resource', 'Nature'],
    quickWins.map(r => [{high: '🔥 high', medium: 'medium', low: 'low'}[r.fm.priority] || '—', r.fm.effort || '—', titleLink(r.id), r.fm.nature || '—'])
))
out.push('</details>')
out.push('')

out.push('<details>')
out.push(`<summary><b>🗂️ Library</b> — ${resources.length} resources, ${ideas.length} ideas, ${goals.length} goals, ${areas.length} areas, ${plans.length} plans</summary>`)
out.push('')
out.push(picture('shape', shapeChart, 'Resource and idea breakdown by status, scale and nature'))
out.push(table(
    ['Entity', 'Count', 'By status'],
    [
        ['Ideas', ideas.length, breakdown(ideas, 'status', IDEA_STATUSES)],
        ['Resources', resources.length, breakdown(resources, 'status', RESOURCE_STATUSES)],
        ['Goals', goals.length, breakdown(goals)],
        ['Areas', areas.length, '—'],
        ['Plans', plans.length, '—']
    ]
))
out.push('</details>')
out.push('')

out.push('---')
out.push('')
out.push('<sub>Generated by <code>node system/scripts/dashboard.mjs</code> from the Markdown entities. How it works: <a href="docs/guide.md">docs/guide.md</a>.</sub>')

writeFileSync(join(ROOT, 'README.md'), out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n')
console.log(`README.md written — ${TODAY}, ${attention.length} item(s) needing attention`)
