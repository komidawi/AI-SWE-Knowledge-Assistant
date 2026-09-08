// Shared frontmatter/file-loading helpers for scripts/*.mjs. Pure functions - callers pass their
// own repo root (computed from their own import.meta.url), nothing here bakes in a path.

import {readdirSync, readFileSync} from 'node:fs'
import {basename, join} from 'node:path'

export function walk(root, dir) {
    let entries
    try {
        entries = readdirSync(join(root, dir), {withFileTypes: true})
    } catch {
        return []
    }
    return entries.flatMap(e =>
        e.isDirectory() ? walk(root, join(dir, e.name))
            : e.name.endsWith('.md') ? [join(dir, e.name)]
                : []
    )
}

export function load(root, dir) {
    return walk(root, dir).map(rel => {
        const text = readFileSync(join(root, rel), 'utf8')
        const split = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text)
        if (!split) return {rel, id: basename(rel, '.md'), fm: {}, fmKeys: [], body: text}
        return {
            rel,
            id: basename(rel, '.md'),
            fm: parseFrontmatter(split[1]),
            fmKeys: frontmatterKeys(split[1]),
            body: split[2]
        }
    })
}

// A deliberately small YAML subset: `key: scalar` and `key: [ a, b ]`. That is all the templates
// use. Anything more and this should pull in a real parser rather than grow a fake one.
export function parseFrontmatter(block) {
    const fm = {}
    for (const line of block.split(/\r?\n/)) {
        const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line)
        if (kv) fm[kv[1]] = parseValue(kv[2])
    }
    return fm
}

// Keys as they appear in the file, before defaulting - lets validate.mjs tell "key present but
// empty" apart from "key absent" when it needs to (e.g. an unknown-field check).
export function frontmatterKeys(block) {
    return block.split(/\r?\n/)
        .map(line => /^([A-Za-z_][\w-]*):/.exec(line))
        .filter(Boolean)
        .map(m => m[1])
}

export function parseValue(raw) {
    const value = raw.trim()
    if (value.startsWith('[') && value.endsWith(']')) {
        return value.slice(1, -1).split(',').map(item => unquote(item)).filter(Boolean)
    }
    return unquote(value)
}

export function unquote(raw) {
    const value = raw.trim()
    if (/^"[\s\S]*"$/.test(value) || /^'[\s\S]*'$/.test(value)) return value.slice(1, -1)
    return value.replace(/\s+#.*$/, '').trim()
}

export function isoDate(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function pad(n) {
    return String(n).padStart(2, '0')
}

export function isDate(value) {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}
