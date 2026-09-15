// Parses taxonomy/topics.yml and taxonomy/stack.yml - the one place in this repo with YAML richer
// than the flat `key: scalar` / `key: [a, b]` subset entities.mjs handles. Scoped only to the exact
// shapes those two files use today; not a general YAML parser.

import {readFileSync} from 'node:fs'
import {join} from 'node:path'

// topics.yml shape:
//   areas:
//     - id: <area-id>
//       label: <area label>
//       topics:
//         - { id: x, label: y, aliases: [ a, b ], parent: z }
export function loadTopics(root) {
    const text = readFileSync(join(root, 'taxonomy/topics.yml'), 'utf8')
    const areas = new Map()      // area-id -> { id, label, topicIds: [] }
    const topicsById = new Map() // topic-id -> { id, label, aliases: [], parent, area }

    let currentArea = null
    for (const line of text.split(/\r?\n/)) {
        const indent = line.length - line.trimStart().length

        const areaStart = indent === 2 && /^\s*-\s*id:\s*(\S+)\s*$/.exec(line)
        if (areaStart) {
            currentArea = {id: areaStart[1], label: '', topicIds: []}
            areas.set(currentArea.id, currentArea)
            continue
        }

        const areaLabel = indent === 4 && /^\s*label:\s*(.+?)\s*$/.exec(line)
        if (areaLabel && currentArea) {
            currentArea.label = areaLabel[1]
            continue
        }

        const topicFlow = /^\s*-\s*\{(.+)\}\s*$/.exec(line)
        if (topicFlow && currentArea) {
            const topic = parseFlowTopic(topicFlow[1], currentArea.id)
            topicsById.set(topic.id, topic)
            currentArea.topicIds.push(topic.id)
        }
    }

    return {areas, topicsById}
}

function parseFlowTopic(inner, areaId) {
    const topic = {id: null, label: null, aliases: [], parent: null, area: areaId}
    for (const field of splitFlowFields(inner)) {
        const m = /^\s*([A-Za-z_]+):\s*(.+?)\s*$/.exec(field)
        if (!m) continue
        const [, key, rawValue] = m
        if (key === 'aliases') {
            topic.aliases = rawValue.replace(/^\[\s*|\s*\]$/g, '').split(',').map(s => s.trim()).filter(Boolean)
        } else {
            topic[key] = rawValue.trim()
        }
    }
    return topic
}

// Splits a `{ ... }` flow mapping's inner text on top-level commas, respecting `[ ]` nesting so
// `aliases: [ a, b ]` doesn't get split into two fields.
function splitFlowFields(inner) {
    const fields = []
    let depth = 0
    let current = ''
    for (const ch of inner) {
        if (ch === '[') depth++
        if (ch === ']') depth--
        if (ch === ',' && depth === 0) {
            fields.push(current)
            current = ''
        } else {
            current += ch
        }
    }
    if (current.trim()) fields.push(current)
    return fields
}

// stack.yml shape:
//   groups:
//     - id: <group-id>
//       label: <label>
//       topics: [ a, b, c ]
export function loadStack(root) {
    const text = readFileSync(join(root, 'taxonomy/stack.yml'), 'utf8')
    const groups = []
    let current = null

    for (const line of text.split(/\r?\n/)) {
        const indent = line.length - line.trimStart().length

        const groupStart = indent === 2 && /^\s*-\s*id:\s*(\S+)\s*$/.exec(line)
        if (groupStart) {
            current = {id: groupStart[1], label: '', topicIds: []}
            groups.push(current)
            continue
        }

        const groupLabel = indent === 4 && /^\s*label:\s*(.+?)\s*$/.exec(line)
        if (groupLabel && current) {
            current.label = groupLabel[1]
            continue
        }

        const groupTopics = indent === 4 && /^\s*topics:\s*\[(.*)\]\s*$/.exec(line)
        if (groupTopics && current) {
            current.topicIds = groupTopics[1].split(',').map(s => s.trim()).filter(Boolean)
        }
    }

    return groups
}

// Resolves a query term (label, id, or alias - case-insensitive) to a canonical topic or area id.
export function resolve(term, {areas, topicsById}) {
    const needle = term.trim().toLowerCase()
    for (const area of areas.values()) {
        if (area.id.toLowerCase() === needle || area.label.toLowerCase() === needle) return area.id
    }
    for (const topic of topicsById.values()) {
        if (topic.id.toLowerCase() === needle) return topic.id
        if (topic.label && topic.label.toLowerCase() === needle) return topic.id
        if (topic.aliases.some(a => a.toLowerCase() === needle)) return topic.id
    }
    return null
}

// A topic id plus its parent (if any) and area - the upward closure so an entity tagged with a
// child topic also surfaces under a query for the parent or the area, per how /query expands
// ("a topic plus its children", "an area matches every topic inside it").
export function upwardClosure(topicId, {topicsById}) {
    const topic = topicsById.get(topicId)
    if (!topic) return [topicId]
    const ids = new Set([topicId, topic.area])
    if (topic.parent) ids.add(topic.parent)
    return [...ids]
}
