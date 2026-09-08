# AI_SKILL_ASSISTANT — conventions

A Git + Markdown knowledge base for planning and tracking software-engineering skill growth.
Markdown files under the entity folders are the **single source of truth**. `DASHBOARD.md` and
anything under `.index/` are generated and disposable — never hand-edit them. `DASHBOARD.md` is
rebuilt with `node scripts/dashboard.mjs`; rerun it after any change that would move the numbers.

## Entities

| Folder       | Entity   | What it holds                                                                         |
|--------------|----------|---------------------------------------------------------------------------------------|
| `ideas/`     | Idea     | Something I might learn or build. Cheap to add, triaged later.                        |
| `resources/` | Resource | A concrete artifact to consume: book, course, article, video, repo, talk.             |
| `goals/`     | Goal     | An outcome with a horizon and success criteria. Milestones live inside the goal file. |
| `areas/`     | Area     | Living self-assessment of one skill area: current level, evidence, gaps.              |
| `planning/`  | Plan     | Year / month / week files. What is actually committed to, plus retros.                |
| `logs/`      | Log      | Optional record of what was actually done.                                            |

## Hard rules

1. **Filename = ID.** `resources/ddia.md` has `id: ddia`. IDs are kebab-case, stable, never renamed
   casually (renaming breaks every `[[link]]`). No dates or numbers in IDs.
2. **Every file starts with YAML frontmatter** matching `templates/`. Missing or extra fields are a bug.
3. **`topics:` accepts only topic IDs from `taxonomy/topics.yml`.** Never labels, never aliases,
   never free text. If a topic is missing, add it to the taxonomy first, in the same change.
4. **Cross-reference by ID with wiki links**: `[[ddia]]`, `[[system-design-fluency]]`. Works in plain text and Obsidian.
5. **Dates are ISO `YYYY-MM-DD`.** Never "last week", never a relative date.
6. **Append, don't overwrite, assessments.** Each is its own dated `### Assessment YYYY-MM-DD` block
   so the history of judgment stays visible in the file and in `git log`.
7. **`scale:` must agree with `effort:`.** It is the bucket, `effort:` is the number. They are stored
   separately so `rg` can find a bucket without tooling; `node scripts/dashboard.mjs` flags any
   disagreement under **Needs attention**. New values for any vocabulary below go in, in the same
   change — the discipline rule 3 imposes on topics applies to every controlled field.
8. **Be terse.** Every file here is read fast and re-read often. Write the shortest text that
   carries the information: bullets and tables over prose, no preamble, no restating the question,
   no filler caveats. Assessment notes are 1-3 sentences, not paragraphs. This is a hard rule, not
   a style suggestion — a verbose entry is as much a bug as a missing field. It applies to chat
   answers too.

## Vocabularies

- Idea status: `inbox` → `considering` → `accepted` → `active` → `done` | `dropped`
- Resource status: `backlog` → `in-progress` → `done` | `dropped` | `reference` (kept for lookup, not read start-to-finish)
- Goal status: `draft` → `active` → `achieved` | `missed` | `dropped`
- Priority everywhere: `high` | `medium` | `low`
- Resource `kind:` — the medium: `book` | `course` | `article` | `video` | `talk` | `repo` | `docs` | `newsletter`

### Resource `scale:` — how much time and scheduling it needs

Bands are on `effort:`. `kind:` says what medium it is; `scale:` says what it costs.

| Value       | Effort | Means                                                     |
|-------------|--------|-----------------------------------------------------------|
| `multi-day` | > 8h   | Multi-module. Spans days — needs a milestone, not a slot. |
| `full-day`  | 3–8h   | ~1 MD. One subject end to end in a day.                   |
| `deep-dive` | 1–3h   | One specific topic, in depth. One long sitting.           |
| `short`     | 20–60m | One sitting.                                              |
| `snack`     | < 20m  | Fits a gap.                                               |

### Resource `nature:` — what kind of value it delivers

Orthogonal to `scale:`. A 10-minute curio and a 10-minute foundational explainer are the same size
and not the same value; this is the field that separates them.

| Value         | Means                                                                    |
|---------------|--------------------------------------------------------------------------|
| `core`        | Durable concepts, theory, protocols. Outlives the tools.                 |
| `applied`     | Hands-on — build it, follow it, produce an artifact.                      |
| `case-study`  | How someone actually did it: war story, incident write-up, architecture. |
| `perspective` | An argument or proposal. An idea described, not knowledge conveyed.      |
| `lookup`      | Spec, docs, pattern catalogue. Consulted, not read start to finish.      |
| `trivia`      | Curio, fun fact, entertainment. Real, but never earns planned hours.     |

`lookup` deliberately avoids the word `reference`, which is already a `status:` value. Both fields
are **resource-only** — an idea is not consumed, so neither axis means anything for it.

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
- Keep the body short (rule 8). Notes exist to remind, not to explain — if it takes a paragraph,
  the entry is probably two entries.

## External capture (Raindrop)

Bookmarks arrive in Raindrop.io, and `/raindrop-triage` promotes the worthwhile ones into here.
The relationship is deliberately **one-way and one-time — promotion, not sync**:

- Raindrop is an inbox. It holds URLs, page text and highlights. It holds no judgement.
- This repo holds the judgement: `topics`, `goals`, `priority`, `rating`, dated assessments.
  Nothing in Raindrop may overwrite any of it, ever.
- A bookmark is promoted once. After that the Markdown file is independent, and the bookmark being
  edited, moved, retitled or deleted in Raindrop means nothing here.
- Nothing is ever deleted in Raindrop. Triaged bookmarks get the tag `captured` — including the
  ones judged not worth a file — so `lacks_tags: ["captured"]` is the exact untriaged queue.
- `raindrop_id:` is the join key, not the URL: it survives retitles, moves and tracking params.
- Not every bookmark deserves a file. Dropping is the common, correct outcome.

Nothing in this repo may depend on Raindrop being reachable. The MCP server is not always
connected, and every command except `/raindrop-triage` must work without it.
## Stage B (planned, not built)

`scripts/` will hold a Node indexer producing `.index/index.json` plus a frontmatter validator.
The Markdown stays authoritative — the index is a cache and must be rebuildable from scratch.
