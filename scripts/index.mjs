#!/usr/bin/env node

// Builds .index/index.json: a frontmatter mirror plus topic/goal reverse indexes, topics
// pre-expanded through taxonomy/topics.yml's alias/parent/area chains. Gitignored, disposable,
// rebuildable from scratch - the Markdown stays authoritative.
//
//   node scripts/index.mjs
//
// Query it with small node/jq snippets against the file, not by reading the whole thing into a
// conversation - it mirrors the same content the Markdown already has.

import {mkdirSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {load, isoDate} from './lib/entities.mjs'
import {loadTopics, upwardClosure} from './lib/taxonomy.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const entities = [
    ...load(ROOT, 'ideas'),
    ...load(ROOT, 'resources'),
    ...load(ROOT, 'goals'),
    ...load(ROOT, 'areas')
]

const {topicsById} = loadTopics(ROOT)

const byTopic = {}
const byGoal = {}

for (const e of entities) {
    for (const t of e.fm.topics ?? []) {
        for (const id of upwardClosure(t, {topicsById})) {
            (byTopic[id] ??= []).push(e.id)
        }
    }
    for (const g of e.fm.goals ?? []) {
        (byGoal[g] ??= []).push(e.id)
    }
}

for (const key of Object.keys(byTopic)) byTopic[key] = [...new Set(byTopic[key])].sort()
for (const key of Object.keys(byGoal)) byGoal[key] = [...new Set(byGoal[key])].sort()

const index = {
    generated: isoDate(new Date()),
    entities: entities.map(e => ({id: e.id, type: e.fm.type ?? null, path: e.rel, fm: e.fm})),
    by_topic: byTopic,
    by_goal: byGoal
}

mkdirSync(join(ROOT, '.index'), {recursive: true})
writeFileSync(join(ROOT, '.index/index.json'), JSON.stringify(index, null, 2) + '\n')
console.log(`.index/index.json written - ${entities.length} entities, ${Object.keys(byTopic).length} topics, ${Object.keys(byGoal).length} goals`)
