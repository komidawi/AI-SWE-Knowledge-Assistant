#!/usr/bin/env node

// Checks every entity file against its template and the controlled vocabularies in CLAUDE.md.
// Manual command, not wired to any hook - run it yourself, or from /groom.
//
//   node scripts/validate.mjs
//
// Reads entity files and taxonomy/*.yml. Writes nothing. Exits non-zero if anything is found, so
// it can be scripted later if that ever becomes useful - nothing in this repo invokes it for you.

import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {load, isDate} from './lib/entities.mjs'
import {loadTopics, loadStack} from './lib/taxonomy.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// --- Schema: required (non-empty) keys and the full known key set, per template -----------------

const SCHEMA = {
    idea: {
        required: ['id', 'type', 'title', 'status', 'priority', 'effort', 'created', 'updated'],
        known: ['id', 'type', 'title', 'status', 'priority', 'topics', 'goals', 'resources', 'url',
            'source', 'raindrop_id', 'effort', 'created', 'updated'],
        dates: ['created', 'updated']
    },
    resource: {
        required: ['id', 'type', 'kind', 'title', 'status', 'priority', 'effort', 'scale',
            'nature', 'created', 'updated'],
        known: ['id', 'type', 'kind', 'title', 'author', 'url', 'source', 'raindrop_id', 'topics',
            'goals', 'status', 'priority', 'effort', 'scale', 'nature', 'progress', 'rating',
            'started', 'finished', 'created', 'updated'],
        dates: ['created', 'updated', 'started', 'finished']
    },
    goal: {
        required: ['id', 'type', 'title', 'horizon', 'status', 'start', 'target', 'priority',
            'weekly_hours', 'created', 'updated'],
        known: ['id', 'type', 'title', 'horizon', 'status', 'start', 'target', 'topics', 'priority',
            'weekly_hours', 'created', 'updated'],
        dates: ['start', 'target', 'created', 'updated']
    },
    area: {
        required: ['id', 'type', 'title', 'level', 'target_level', 'reviewed'],
        known: ['id', 'type', 'title', 'topics', 'level', 'target_level', 'reviewed'],
        dates: ['reviewed']
    }
}

const VOCAB = {
    priority: ['high', 'medium', 'low'],
    source: ['raindrop', 'manual'],
    'idea.status': ['inbox', 'considering', 'accepted', 'active', 'done', 'dropped'],
    'resource.status': ['backlog', 'in-progress', 'done', 'dropped', 'reference'],
    'goal.status': ['draft', 'active', 'achieved', 'missed', 'dropped'],
    kind: ['book', 'course', 'article', 'video', 'talk', 'repo', 'docs', 'newsletter'],
    scale: ['multi-day', 'full-day', 'deep-dive', 'short', 'snack'],
    nature: ['core', 'applied', 'case-study', 'perspective', 'lookup', 'trivia'],
    horizon: ['year', 'quarter', 'month']
}

// --- Load ----------------------------------------------------------------------------------------

const byType = {
    idea: load(ROOT, 'ideas'),
    resource: load(ROOT, 'resources'),
    goal: load(ROOT, 'goals'),
    area: load(ROOT, 'areas')
}
const plans = load(ROOT, 'planning')
const allEntities = [...byType.idea, ...byType.resource, ...byType.goal, ...byType.area, ...plans]
const allIds = new Set(allEntities.map(e => e.id))
const goalIds = new Set(byType.goal.map(g => g.id))

const {areas, topicsById} = loadTopics(ROOT)
const stackGroups = loadStack(ROOT)

// --- Checks ----------------------------------------------------------------------------------------

const problems = [] // { rel, message }

function report(e, message) {
    problems.push({rel: e.rel, message})
}

for (const [type, schema] of Object.entries(SCHEMA)) {
    for (const e of byType[type]) {
        for (const key of schema.required) {
            if (!e.fm[key]) report(e, `missing required field \`${key}\``)
        }
        for (const key of e.fmKeys) {
            if (!schema.known.includes(key)) report(e, `unknown field \`${key}\``)
        }
        for (const key of schema.dates) {
            if (e.fm[key] && !isDate(e.fm[key])) report(e, `\`${key}: ${e.fm[key]}\` is not an ISO date`)
        }
        if (e.fm.priority && !VOCAB.priority.includes(e.fm.priority)) {
            report(e, `\`priority: ${e.fm.priority}\` not in ${VOCAB.priority.join('|')}`)
        }
        if (e.fm.source && !VOCAB.source.includes(e.fm.source)) {
            report(e, `\`source: ${e.fm.source}\` not in ${VOCAB.source.join('|')}`)
        }
        if (e.fm.status && !VOCAB[`${type}.status`]?.includes(e.fm.status)) {
            report(e, `\`status: ${e.fm.status}\` not in ${VOCAB[`${type}.status`].join('|')}`)
        }
        if (e.fm.id && e.fm.id !== e.id) {
            report(e, `\`id: ${e.fm.id}\` does not match filename \`${e.id}\``)
        }
    }
}

for (const e of byType.resource) {
    if (e.fm.kind && !VOCAB.kind.includes(e.fm.kind)) report(e, `\`kind: ${e.fm.kind}\` not in ${VOCAB.kind.join('|')}`)
    if (e.fm.scale && !VOCAB.scale.includes(e.fm.scale)) report(e, `\`scale: ${e.fm.scale}\` not in ${VOCAB.scale.join('|')}`)
    if (e.fm.nature && !VOCAB.nature.includes(e.fm.nature)) report(e, `\`nature: ${e.fm.nature}\` not in ${VOCAB.nature.join('|')}`)
}

for (const g of byType.goal) {
    if (g.fm.horizon && !VOCAB.horizon.includes(g.fm.horizon)) report(g, `\`horizon: ${g.fm.horizon}\` not in ${VOCAB.horizon.join('|')}`)
}

// topics: values must be real topic ids (never labels, never aliases - rule 3)
for (const e of [...byType.idea, ...byType.resource, ...byType.goal, ...byType.area]) {
    for (const t of e.fm.topics ?? []) {
        if (!topicsById.has(t)) report(e, `\`topics:\` has \`${t}\`, not a topic id in taxonomy/topics.yml`)
    }
}

// goals: values must resolve to a real goal file
for (const e of [...byType.idea, ...byType.resource]) {
    for (const g of e.fm.goals ?? []) {
        if (!goalIds.has(g)) report(e, `\`goals:\` has \`${g}\`, no such goal in goals/`)
    }
}

// taxonomy/stack.yml self-check: every id it lists must exist in topics.yml
for (const group of stackGroups) {
    for (const t of group.topicIds) {
        if (!topicsById.has(t)) {
            problems.push({rel: 'taxonomy/stack.yml', message: `group \`${group.id}\` has \`${t}\`, not a topic id in taxonomy/topics.yml`})
        }
    }
}

// [[wiki-links]] must resolve to a real entity
const linkPattern = /\[\[([^\]|]+)(?:\|[^\]]*)?]]/g
for (const e of allEntities) {
    for (const m of e.body.matchAll(linkPattern)) {
        if (!allIds.has(m[1])) report(e, `\`[[${m[1]}]]\` does not resolve to a file`)
    }
}

// --- Report ----------------------------------------------------------------------------------------

if (problems.length === 0) {
    console.log('validate: clean.')
    process.exit(0)
}

const byFile = new Map()
for (const p of problems) {
    if (!byFile.has(p.rel)) byFile.set(p.rel, [])
    byFile.get(p.rel).push(p.message)
}

for (const [rel, messages] of byFile) {
    console.log(rel)
    for (const m of messages) console.log(`  - ${m}`)
}
console.log(`\n${problems.length} problem(s) in ${byFile.size} file(s).`)
process.exit(1)
