#!/usr/bin/env node

// Shortcuts for the two most repeated KB operations, so an agent does not hand-edit 4-5 files per step.
//
//   node system/scripts/kb.mjs add-resource --json <file|->  [--dry-run] [--no-commit] [--no-dashboard]
//   node system/scripts/kb.mjs done <id> [--date YYYY-MM-DD] [--rating N] [--tick 1,3|all]
//                                        [--dry-run] [--no-commit] [--no-dashboard]
//
// add-resource: JSON → `kb/resources/<area>[/<topic>]/<id>.md` from kb/templates/resource.md, checks
//   (unique id, topic/goal ids, vocabularies, effort↔scale), log entry, validate, dashboard, commit.
//   JSON keys: id, kind, title, effort, nature (required); author, url, source, raindrop_id, topics,
//   goals, status, priority, scale, progress, rating, started, finished, why, notes (optional).
//   `scale` defaults from `effort`; `priority` defaults from the stack/goal fit (fit → medium, none → low).
// done: status done, finished/started/updated, optional rating, log, validate, dashboard, commit.
//   Lists open `- [ ]` checkboxes linking [[id]] in kb/planning + kb/goals, numbered. Ticks only those
//   named in --tick (they are often parts of a course, so nothing is ticked by default).
//
// Never pushes (CLAUDE.md: push only on `cp`). Prints a short summary, never whole files.

import {existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, unlinkSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {execFileSync} from 'node:child_process'
import {load, isDate} from './lib/entities.mjs'
import {loadTopics, loadStack} from './lib/taxonomy.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const LOG = 'kb/logs/operations.md'
const TEMPLATE = 'kb/templates/resource.md'

const VOCAB = {
    kind: ['book', 'course', 'article', 'video', 'talk', 'repo', 'docs', 'newsletter'],
    status: ['backlog', 'in-progress', 'done', 'dropped', 'reference'],
    priority: ['high', 'medium', 'low'],
    scale: ['multi-day', 'full-day', 'deep-dive', 'short', 'snack'],
    nature: ['core', 'applied', 'case-study', 'perspective', 'lookup', 'trivia'],
    source: ['raindrop', 'manual']
}

// Same bands as dashboard.mjs scaleFor()/parseEffort() — keep in sync.
function parseEffort(value) {
    const m = /^\s*(\d+(?:\.\d+)?)\s*(h|hr|hrs|hours?|m|min|mins|minutes?)\s*$/i.exec(String(value ?? ''))
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

// --- small helpers -------------------------------------------------------------------------------

function die(lines, code = 1) {
    for (const l of [].concat(lines)) console.error(l)
    process.exit(code)
}

function parseArgs(argv) {
    const args = {_: []}
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i]
        if (!a.startsWith('--')) args._.push(a)
        else if (['--dry-run', '--no-commit', '--no-dashboard'].includes(a)) args[a.slice(2)] = true
        else args[a.slice(2)] = argv[++i]
    }
    return args
}

function warsawNow() {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).map(p => [p.type, p.value]))
    return {date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}`}
}

function read(rel) {
    return readFileSync(join(ROOT, rel), 'utf8')
}

function eolOf(text) {
    return text.includes('\r\n') ? '\r\n' : '\n'
}

function yamlScalar(v, {quote = false} = {}) {
    if (v === undefined || v === null || v === '') return ''
    const s = String(v)
    if (!quote && !/: |\s#|:$|^[\[\]{}&*!|>%@`"'#,?-]|^\s|\s$/.test(s)) return s
    return s.includes('"') ? `'${s.replace(/'/g, "''")}'` : `"${s}"`
}

function yamlList(v) {
    const items = [].concat(v ?? []).map(String).filter(Boolean)
    return items.length ? `[ ${items.join(', ')} ]` : '[ ]'
}

function git(args, opts = {}) {
    return execFileSync('git', args, {cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts})
}

function runNode(script) {
    try {
        return {ok: true, out: execFileSync(process.execPath, [join(ROOT, 'system/scripts', script)], {cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']})}
    } catch (e) {
        return {ok: false, out: `${e.stdout ?? ''}${e.stderr ?? ''}`}
    }
}

// Writes files, then validates; on a validation regression restores every touched file.
function applyWrites(writes, {dryRun}) {
    if (dryRun) return
    const before = runNode('validate.mjs')
    const backups = writes.map(w => ({rel: w.rel, existed: existsSync(join(ROOT, w.rel)), text: existsSync(join(ROOT, w.rel)) ? read(w.rel) : null}))
    for (const w of writes) {
        mkdirSync(dirname(join(ROOT, w.rel)), {recursive: true})
        writeFileSync(join(ROOT, w.rel), w.text)
    }
    const after = runNode('validate.mjs')
    if (!after.ok) {
        if (before.ok) {
            for (const b of backups) {
                if (b.existed) writeFileSync(join(ROOT, b.rel), b.text)
                else unlinkSync(join(ROOT, b.rel))
            }
            die(['validate failed after the change — rolled back, nothing written:', after.out.trim()])
        }
        console.log(`validate: was already failing before this change — left as is:\n${after.out.trim()}`)
    } else {
        console.log('validate: clean.')
    }
}

function dirtyPaths() {
    return git(['status', '--porcelain']).split('\n').filter(Boolean).map(l => l.slice(3))
}

function finish({touched, message, args, dirtyBefore}) {
    if (args['dry-run']) {
        console.log('dry-run: nothing written.')
        return
    }
    const extra = []
    if (!args['no-dashboard']) {
        const d = runNode('dashboard.mjs')
        if (!d.ok) console.log(`dashboard: FAILED\n${d.out.trim()}`)
        else {
            console.log('dashboard: regenerated.')
            extra.push('README.md', 'system/assets/dashboard')
        }
    }
    if (args['no-commit']) {
        console.log('commit: skipped (--no-commit).')
        return
    }
    const clash = dirtyBefore.filter(p => touched.includes(p) || extra.some(x => p.startsWith(x)))
    if (clash.length) {
        console.log(`commit: skipped — these paths had uncommitted changes before: ${clash.join(', ')}`)
        return
    }
    git(['add', '--', ...touched, ...extra.filter(x => existsSync(join(ROOT, x)))])
    const staged = git(['diff', '--cached', '--name-only']).split('\n').filter(Boolean)
    if (!staged.length) {
        console.log('commit: nothing to commit.')
        return
    }
    git(['commit', '-q', '-m', message])
    console.log(`commit: ${git(['rev-parse', '--short', 'HEAD']).trim()} "${message}" (${staged.length} file(s), not pushed)`)
}

function logEntry({title, text, added = [], modified = []}) {
    const {date, time} = warsawNow()
    const lines = [`## ${date} ${time} — ${title}`, '', text, '']
    if (added.length) lines.push(`- **Added:** ${added.map(p => `\`${p}\``).join(', ')}`)
    if (modified.length) lines.push(`- **Modified:** ${modified.map(p => `\`${p}\``).join(', ')}`)
    lines.push('', '')
    const log = read(LOG)
    const eol = eolOf(log)
    const m = /^(---\r?\n[\s\S]*?\r?\n---\r?\n)(\r?\n)?/.exec(log)
    if (!m) die(`${LOG}: no frontmatter`)
    const head = setFrontmatterKey(m[1], 'updated', date)
    return head + eol + lines.join(eol) + log.slice(m[0].length)
}

// Replaces `key: …` inside a frontmatter block (keeps the rest of the line layout); inserts before
// `insertBefore` if the key is absent.
function setFrontmatterKey(fmBlock, key, value, insertBefore = 'created') {
    const re = new RegExp(`^${key}:.*$`, 'm')
    if (re.test(fmBlock)) return fmBlock.replace(re, `${key}: ${value}`)
    const eol = eolOf(fmBlock)
    const at = new RegExp(`^${insertBefore}:`, 'm')
    return at.test(fmBlock) ? fmBlock.replace(at, `${key}: ${value}${eol}${insertBefore}:`) : fmBlock
}

function fit(topicIds, goalIds, ctx) {
    const stackIds = new Set(ctx.stack.flatMap(g => g.topicIds))
    const closure = t => {
        const topic = ctx.topicsById.get(t)
        return [t, topic?.parent].filter(Boolean)
    }
    const onStack = topicIds.filter(t => closure(t).some(x => stackIds.has(x)))
    const active = ctx.goals.filter(g => g.fm.status === 'active')
    const onGoal = new Set(goalIds.filter(g => active.some(a => a.id === g)))
    for (const g of active) {
        if ((g.fm.topics ?? []).some(t => topicIds.includes(t))) onGoal.add(g.id)
    }
    return {onStack, onGoal: [...onGoal]}
}

function context() {
    const {areas, topicsById} = loadTopics(ROOT)
    return {
        areas, topicsById,
        stack: loadStack(ROOT),
        goals: load(ROOT, 'kb/goals'),
        resources: load(ROOT, 'kb/resources'),
        allIds: new Set(['kb/ideas', 'kb/resources', 'kb/goals', 'kb/areas', 'kb/planning']
            .flatMap(d => load(ROOT, d)).map(e => e.id))
    }
}

// --- add-resource ----------------------------------------------------------------------------------

function addResource(args) {
    if (!args.json) die('usage: kb.mjs add-resource --json <file|-> [--dry-run] [--no-commit] [--no-dashboard]')
    let input
    try {
        input = JSON.parse(args.json === '-' ? readFileSync(0, 'utf8') : readFileSync(args.json, 'utf8'))
    } catch (e) {
        die(`bad JSON: ${e.message}`)
    }
    const ctx = context()
    const {date} = warsawNow()
    const errors = []
    const r = {...input}
    r.topics = [].concat(r.topics ?? [])
    r.goals = [].concat(r.goals ?? [])
    r.status ??= 'backlog'
    r.created ??= date
    r.updated ??= date

    for (const k of ['id', 'kind', 'title', 'effort', 'nature']) if (!r[k]) errors.push(`missing \`${k}\``)
    if (r.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.id)) errors.push(`id \`${r.id}\` is not kebab-case`)
    if (r.id && ctx.allIds.has(r.id)) errors.push(`id \`${r.id}\` already exists`)
    for (const [k, vocab] of Object.entries(VOCAB)) {
        if (r[k] && !vocab.includes(r[k])) errors.push(`\`${k}: ${r[k]}\` not in ${vocab.join('|')}`)
    }
    for (const t of r.topics) {
        if (!ctx.topicsById.has(t)) {
            const hint = [...ctx.topicsById.values()].find(x => x.label?.toLowerCase() === String(t).toLowerCase()
                || x.aliases.some(a => a.toLowerCase() === String(t).toLowerCase()))
            errors.push(`topic \`${t}\` not in topics.yml${hint ? ` (did you mean \`${hint.id}\`?)` : ' — add it to the taxonomy first'}`)
        }
    }
    for (const g of r.goals) if (!ctx.goals.some(x => x.id === g)) errors.push(`goal \`${g}\` not in kb/goals/`)
    for (const k of ['created', 'updated', 'started', 'finished']) {
        if (r[k] && !isDate(r[k])) errors.push(`\`${k}: ${r[k]}\` is not YYYY-MM-DD`)
    }
    if (r.rating !== undefined && r.rating !== '' && !(Number(r.rating) >= 1 && Number(r.rating) <= 10)) errors.push('rating must be 1-10')
    const hours = parseEffort(r.effort)
    if (r.effort && hours === null) errors.push(`effort \`${r.effort}\` not like 45m / 2h`)
    const expected = scaleFor(hours)
    if (!r.scale) r.scale = expected
    else if (expected && r.scale !== expected) errors.push(`scale \`${r.scale}\` vs effort \`${r.effort}\` → expected \`${expected}\``)

    const f = fit(r.topics, r.goals, ctx)
    r.priority ??= (f.onStack.length || f.onGoal.length) ? 'medium' : 'low'

    if (errors.length) die([`add-resource: ${errors.length} problem(s), nothing written:`, ...errors.map(e => `  - ${e}`)])

    // Path: <area>/<id>.md, or <area>/<topic>/<id>.md once the area folder is split by topic.
    const primary = r.topics[0]
    const area = primary ? ctx.topicsById.get(primary).area : 'general'
    const areaDir = join(ROOT, 'kb/resources', area)
    const split = existsSync(areaDir) && readdirSync(areaDir).some(n => statSync(join(areaDir, n)).isDirectory())
    const rel = split ? `kb/resources/${area}/${primary}/${r.id}.md` : `kb/resources/${area}/${r.id}.md`

    // Fill the template in its own key order; body sections come from the template too.
    const tpl = read(TEMPLATE)
    const eol = eolOf(tpl)
    const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(tpl)
    const keys = m[1].split(/\r?\n/).map(l => /^([A-Za-z_][\w-]*):/.exec(l)?.[1]).filter(Boolean)
    const value = k => {
        if (k === 'type') return 'resource'
        if (k === 'topics' || k === 'goals') return yamlList(r[k])
        if (k === 'title') return yamlScalar(r.title, {quote: true})
        if (k === 'raindrop_id') return Array.isArray(r.raindrop_id) ? yamlList(r.raindrop_id) : yamlScalar(r.raindrop_id)
        return yamlScalar(r[k])
    }
    const fm = keys.map(k => `${k}: ${value(k)}`.trimEnd())
    let body = m[2]
    body = body.replace(/(## Why this one\r?\n)/, `$1${eol}${(r.why ?? '').trim()}${r.why ? eol : ''}`)
    body = body.replace(/(## Notes\r?\n)/, `$1${eol}${(r.notes ?? '').trim()}${r.notes ? eol : ''}`)
    const text = ['---', ...fm, '---', ''].join(eol) + body.replace(/(\r?\n){3,}/g, eol + eol)

    const fitLine = `stack: ${f.onStack.length ? `on (${f.onStack.join(', ')})` : 'off'} · goals: ${f.onGoal.length ? `on (${f.onGoal.join(', ')})` : 'off'} → priority ${r.priority}`
    const logText = logEntry({
        title: `Captured ${r.title}`,
        text: `${r.kind}, ${r.effort} (${r.scale}), ${r.nature}; ${fitLine.replace(' → ', ', ')}.`,
        added: [rel]
    })

    const dirtyBefore = dirtyPaths()
    console.log(`${args['dry-run'] ? 'would add' : 'added'}: ${rel}`)
    console.log(fm.filter(l => !/:\s*(\[ \])?$/.test(l)).map(l => `  ${l}`).join('\n'))
    console.log(fitLine)
    applyWrites([{rel, text}, {rel: LOG, text: logText}], {dryRun: args['dry-run']})
    finish({touched: [rel, LOG], message: `Capture ${r.title}`, args, dirtyBefore})
}

// --- done ------------------------------------------------------------------------------------------

function done(args) {
    const id = args._[1]
    if (!id) die('usage: kb.mjs done <id> [--date YYYY-MM-DD] [--rating N] [--tick 1,3|all] [--dry-run] [--no-commit] [--no-dashboard]')
    const ctx = context()
    const res = ctx.resources.find(r => r.id === id)
    if (!res) {
        const near = ctx.resources.filter(r => r.id.includes(id) || id.includes(r.id) || (r.fm.title ?? '').toLowerCase().includes(id.toLowerCase())).map(r => r.id)
        die(`no resource \`${id}\`${near.length ? ` — did you mean: ${near.slice(0, 5).join(', ')}` : ''}`)
    }
    const date = args.date ?? warsawNow().date
    if (!isDate(date)) die(`--date ${date} is not YYYY-MM-DD`)
    if (args.rating !== undefined && !(Number(args.rating) >= 1 && Number(args.rating) <= 10)) die('--rating must be 1-10')

    const writes = []
    const modified = []

    // Resource frontmatter
    const text = read(res.rel)
    const m = /^(---\r?\n[\s\S]*?\r?\n---)/.exec(text)
    let fmBlock = m[1]
    const wasDone = res.fm.status === 'done'
    fmBlock = setFrontmatterKey(fmBlock, 'status', 'done')
    if (!res.fm.started) fmBlock = setFrontmatterKey(fmBlock, 'started', date)
    if (!wasDone || !res.fm.finished) fmBlock = setFrontmatterKey(fmBlock, 'finished', date)
    if (args.rating !== undefined) fmBlock = setFrontmatterKey(fmBlock, 'rating', String(Number(args.rating)))
    fmBlock = setFrontmatterKey(fmBlock, 'updated', date)
    const newText = fmBlock + text.slice(m[1].length)
    if (newText !== text) {
        writes.push({rel: res.rel, text: newText})
        modified.push(res.rel)
    }

    // Open checkboxes linking [[id]] in plans and goals
    const link = `[[${id}]]`
    const boxes = []
    for (const dir of ['kb/planning', 'kb/goals']) {
        for (const e of load(ROOT, dir)) {
            read(e.rel).split(/\r?\n/).forEach((line, i) => {
                if (/^\s*- \[ \]/.test(line) && line.includes(link)) boxes.push({rel: e.rel, line: i, text: line.trim()})
            })
        }
    }
    let ticks = []
    if (args.tick === 'all') ticks = boxes.map((_, i) => i + 1)
    else if (args.tick) ticks = args.tick.split(',').map(s => Number(s.trim()))
    const bad = ticks.filter(n => !(n >= 1 && n <= boxes.length))
    if (bad.length) die(`--tick ${bad.join(',')}: only 1..${boxes.length} exist`)

    const byFile = new Map()
    for (const n of ticks) {
        const b = boxes[n - 1]
        if (!byFile.has(b.rel)) byFile.set(b.rel, [])
        byFile.get(b.rel).push(b.line)
    }
    for (const [rel, lineNos] of byFile) {
        const t = writes.find(w => w.rel === rel)?.text ?? read(rel)
        const eol = eolOf(t)
        const lines = t.split(/\r?\n/)
        for (const i of lineNos) lines[i] = lines[i].replace('- [ ]', '- [x]')
        writes.push({rel, text: lines.join(eol)})
        modified.push(rel)
    }

    if (writes.length) {
        writes.push({rel: LOG, text: logEntry({
            title: `Done: ${res.fm.title || id}`,
            text: `\`${id}\` finished ${date}${args.rating ? `, rating ${Number(args.rating)}` : ''}${ticks.length ? `; ticked ${ticks.length} checkbox(es)` : ''}.`,
            modified
        })})
    }

    const dirtyBefore = dirtyPaths()
    const verb = args['dry-run'] ? 'would set' : 'set'
    if (!writes.length) console.log(`${id}: already done (finished ${res.fm.finished}), nothing to change.`)
    else console.log(`${verb}: ${res.rel} → status done, finished ${wasDone && res.fm.finished ? res.fm.finished : date}${args.rating ? `, rating ${Number(args.rating)}` : ''}`)
    if (boxes.length) {
        console.log(`open checkboxes linking ${link}:`)
        boxes.forEach((b, i) => console.log(`  ${ticks.includes(i + 1) ? '[x]' : '[ ]'} ${i + 1}. ${b.rel}:${b.line + 1}  ${b.text.slice(0, 140)}`))
        if (!ticks.length) console.log('  (none ticked — rerun with --tick 1,3 or --tick all)')
    } else {
        console.log(`no open checkboxes link ${link}.`)
    }
    if (!writes.length) return
    applyWrites(writes, {dryRun: args['dry-run']})
    finish({touched: writes.map(w => w.rel), message: `Done: ${res.fm.title || id}`, args, dirtyBefore})
}

// --- main ------------------------------------------------------------------------------------------

const args = parseArgs(process.argv.slice(2))
const cmd = args._[0]
if (cmd === 'add-resource') addResource(args)
else if (cmd === 'done') done(args)
else die(['usage:',
    '  kb.mjs add-resource --json <file|-> [--dry-run] [--no-commit] [--no-dashboard]',
    '  kb.mjs done <id> [--date YYYY-MM-DD] [--rating N] [--tick 1,3|all] [--dry-run] [--no-commit] [--no-dashboard]'])
