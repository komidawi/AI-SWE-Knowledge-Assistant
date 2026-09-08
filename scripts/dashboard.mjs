#!/usr/bin/env node

// Builds DASHBOARD.md from the Markdown frontmatter. Derived, disposable, always rebuildable:
//
//   node scripts/dashboard.mjs
//
// Reads nothing but the entity files. Writes nothing but DASHBOARD.md.

import {writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {load as loadEntities, isoDate, isDate, pad} from './lib/entities.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
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

function link(id) {
    return `[[${id}]]`
}

// --- Model -------------------------------------------------------------------------------------

const ideas = load('ideas')
const resources = load('resources')
const areas = load('areas')
const plans = load('planning')

const goals = load('goals').map(g => {
    const milestones = tasks(section(g.body, 'Milestones'))
    const criteria = tasks(section(g.body, 'Success criteria'))
    return {
        ...g,
        milestones,
        criteria,
        weeksLeft: isDate(g.fm.target) ? Math.round(daysBetween(TODAY, g.fm.target) / 7) : null,
        overdue: milestones.filter(m => !m.done && isDate(m.date) && m.date < TODAY)
    }
})

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
        where: draftGoals.map(g => link(g.id)).join(', ') || '`goals/`',
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
        where: '`ideas/`',
        why: 'Run `/groom` — inbox items are invisible to planning'
    })
}

if (!week) {
    attention.push({
        what: `No plan for ${weekId}`,
        where: '`planning/`',
        why: 'Run `/plan-week`'
    })
}

const lead = attention[0]
    ? `**${attention[0].what}** — ${attention[0].where}. ${attention[0].why}.`
    : '**Nothing is blocked.** Goals, the week and in-flight work are all current.'

function breakdown(items, field = 'status', order = null) {
    const counts = new Map()
    for (const item of items) {
        const value = item.fm[field] || 'none'
        counts.set(value, (counts.get(value) ?? 0) + 1)
    }
    const rank = value => (order ? order.indexOf(value) : -1)
    const entries = [...counts].sort((a, b) =>
        order ? rank(a[0]) - rank(b[0]) : a[0].localeCompare(b[0])
    )
    return entries.map(([value, n]) => `${value} ${n}`).join(' · ') || '—'
}

// --- Output ------------------------------------------------------------------------------------

const out = []

out.push('<!-- Generated by scripts/dashboard.mjs. Do not edit by hand — edit the entity files and')
out.push('     rerun `node scripts/dashboard.mjs`. The Markdown entities are the source of truth. -->')
out.push('')
out.push('# Dashboard')
out.push('')
out.push(`\`${TODAY}\` · ${activeGoals.length} active goal(s) · ${inFlight.length} in flight`
    + ` · ${inbox.length} in inbox · \`${weekId}\` ${weekDone}/${committed.length} done`)
out.push('')

out.push('## Right now')
out.push('')
out.push(`> ${lead}`)
out.push('')

out.push('## Needs attention')
out.push('')
out.push(table(
    ['What', 'Where', 'Why it matters'],
    attention.slice(0, 5).map(a => [a.what, a.where, a.why])
))

out.push('## Goals')
out.push('')
out.push(table(
    ['Goal', 'Status', 'Target', 'Weeks left', 'Milestones', 'Criteria', 'h/wk'],
    liveGoals.map(g => [
        link(g.id),
        `\`${g.fm.status}\``,
        isDate(g.fm.target) ? `\`${g.fm.target}\`` : '—',
        g.weeksLeft ?? '—',
        `${g.milestones.filter(m => m.done).length}/${g.milestones.length}`,
        `${g.criteria.filter(c => c.done).length}/${g.criteria.length}`,
        Number(g.fm.weekly_hours) || '**0**'
    ])
))

const nextMilestones = goals
    .flatMap(g => g.milestones.filter(m => !m.done && isDate(m.date)).map(m => ({...m, goal: g.id})))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5)

if (nextMilestones.length > 0) {
    out.push('### Next milestones')
    out.push('')
    out.push(table(
        ['Due', 'In', 'Goal', 'Milestone'],
        nextMilestones.map(m => [
            `\`${m.date}\``,
            `${daysBetween(TODAY, m.date)}d`,
            link(m.goal),
            stripDate(m.text)
        ])
    ))
}

out.push('## In flight')
out.push('')
out.push(table(
    ['Resource', 'Kind', 'Scale', 'Progress', 'Effort', 'Priority', 'Updated'],
    inFlight.map(r => [
        link(r.id),
        r.fm.kind || '—',
        r.fm.scale || '—',
        r.fm.progress || '—',
        r.fm.effort || '—',
        r.fm.priority || '—',
        age(r.fm.updated)
    ])
))

out.push('## Pick by time')
out.push('')
out.push('_Backlog resources small enough to finish in a gap._')
out.push('')
out.push(table(
    ['Resource', 'Scale', 'Effort', 'Nature', 'Priority'],
    quickWins.map(r => [
        link(r.id),
        r.fm.scale,
        r.fm.effort || '—',
        r.fm.nature || '—',
        r.fm.priority || '—'
    ])
))

out.push(`## This week — \`${weekId}\``)
out.push('')
if (!week) {
    out.push('_No week file. Run `/plan-week`._')
} else {
    out.push(`${weekDone}/${committed.length} committed done · capacity \`${week.fm.capacity_hours}h\``
        + ` · \`${week.fm.start}\` → \`${week.fm.end}\``)
    out.push('')
    for (const t of committed) out.push(`- [${t.done ? 'x' : ' '}] ${t.text}`)
}
out.push('')

out.push('## Areas')
out.push('')
out.push(table(
    ['Area', 'Level', 'Target', 'Gap', 'Reviewed'],
    gaps.map(a => [
        link(a.id),
        a.fm.level,
        a.fm.target_level,
        a.gap > 0 ? `+${a.gap}` : '—',
        `\`${a.fm.reviewed}\` (${age(a.fm.reviewed)})`
    ])
))

out.push('## Resource shape')
out.push('')
out.push(table(
    ['Axis', 'Breakdown'],
    [
        ['By scale', breakdown(resources, 'scale', SCALES)],
        ['By nature', breakdown(resources, 'nature')]
    ]
))

out.push('## Everything else')
out.push('')
out.push(table(
    ['Entity', 'Count', 'By status'],
    [
        ['Ideas', ideas.length, breakdown(ideas)],
        ['Resources', resources.length, breakdown(resources)],
        ['Goals', goals.length, breakdown(goals)],
        ['Areas', areas.length, '—'],
        ['Plans', plans.length, '—']
    ]
))

writeFileSync(join(ROOT, 'DASHBOARD.md'), out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n')
console.log(`DASHBOARD.md written — ${TODAY}, ${attention.length} item(s) needing attention`)
