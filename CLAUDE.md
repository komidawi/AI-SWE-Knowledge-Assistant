# AI_SKILL_ASSISTANT — conventions

A Git + Markdown knowledge base for planning and tracking software-engineering skill growth.
Markdown files are the **single source of truth**. Anything under `.index/` is generated and disposable.

## Entities

| Folder | Entity | What it holds |
|---|---|---|
| `ideas/` | Idea | Something I might learn or build. Cheap to add, triaged later. |
| `resources/` | Resource | A concrete artifact to consume: book, course, article, video, repo, talk. |
| `goals/` | Goal | An outcome with a horizon and success criteria. Milestones live inside the goal file. |
| `areas/` | Area | Living self-assessment of one skill area: current level, evidence, gaps. |
| `planning/` | Plan | Year / month / week files. What is actually committed to, plus retros. |
| `logs/` | Log | Optional record of what was actually done. |

## Hard rules

1. **Filename = ID.** `resources/ddia.md` has `id: ddia`. IDs are kebab-case, stable, never renamed
   casually (renaming breaks every `[[link]]`). No dates or numbers in IDs.
2. **Every file starts with YAML frontmatter** matching `templates/`. Missing or extra fields are a bug.
3. **`topics:` accepts only topic IDs from `taxonomy/topics.yml`.** Never labels, never aliases,
   never free text. If a topic is missing, add it to the taxonomy first, in the same change.
4. **Cross-reference by ID with wiki links**: `[[ddia]]`, `[[fullstack-2027]]`. Works in plain text and Obsidian.
5. **Dates are ISO `YYYY-MM-DD`.** Never "last week", never a relative date.
6. **Append, don't overwrite, assessments.** Each is its own dated `### Assessment YYYY-MM-DD` block
   so the history of judgment stays visible in the file and in `git log`.

## Status vocabularies

- Idea: `inbox` → `considering` → `accepted` → `active` → `done` | `dropped`
- Resource: `backlog` → `in-progress` → `done` | `dropped` | `reference` (kept for lookup, not read start-to-finish)
- Goal: `draft` → `active` → `achieved` | `missed` | `dropped`
- Priority everywhere: `high` | `medium` | `low`

## Querying (stage A — no build step)

Query by topic means: expand the term through `taxonomy/topics.yml` (label → id → aliases → child
topics), then search frontmatter across all entity folders, then group results by entity type.

```bash
rg -l 'topics:.*\bjavascript\b' ideas resources goals areas
rg -l 'status: active' goals
rg --no-heading 'topics:' resources | rg 'system-design'
```

Do the alias expansion before searching. A query for "JS" must find `javascript`, and a query for
"Frontend" must find every topic in that area.

## Assessing

Score against `taxonomy/rubrics.md`. Never invent dimensions or weights ad hoc — the point of the
rubric is that a resource assessed in March and one assessed in November are comparable.
Assessment always references the currently `active` goals; a resource is only "worth it" relative to
what is being aimed at right now.

## Writing new entries

- Copy the matching file from `templates/`.
- Fill frontmatter completely; leave a field out only if the template marks it optional.
- Prefer one specific entry over one vague entry. "Learn Kafka consumer-group rebalancing" beats
  "Learn Kafka".
- New topics go into `taxonomy/topics.yml` under the right area, with aliases people actually type.

## Stage B (planned, not built)

`scripts/` will hold a Node indexer producing `.index/index.json` plus a frontmatter validator.
The Markdown stays authoritative — the index is a cache and must be rebuildable from scratch.
