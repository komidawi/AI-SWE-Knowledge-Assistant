# AI_SKILL_ASSISTANT — conventions

Git + Markdown knowledge base for software-engineering skill growth. Markdown under `kb/` is the
**single source of truth**; `system/` holds tooling. `README.md` (the dashboard), `system/assets/dashboard/`
and `system/.index/` are generated — never hand-edit; the repo guide is `docs/guide.md`. Rerun `node system/scripts/dashboard.mjs` after any change that moves the numbers.

## Working agreements

This file holds every principle, rule and agreement for working here. When one is established (by
the user or while working), write it here or into the relevant template/taxonomy file — not only
into chat or an AI's private memory. This rule included.

- **Commit to the checked-out branch.** No feature branches, no switching — single-user repo.
  Commit only when asked; split unrelated changes; never push unless asked (local runs ahead of
  `origin`).

## Entities

| Folder          | Entity   | Holds                                                               |
|-----------------|----------|---------------------------------------------------------------------|
| `kb/ideas/`     | Idea     | Something I might learn or build. Cheap to add, triaged later.      |
| `kb/resources/` | Resource | A concrete artifact to consume: book, course, article, video, repo. |
| `kb/goals/`     | Goal     | Outcome with horizon and success criteria; milestones inside.       |
| `kb/areas/`     | Area     | Living self-assessment of one skill area: level, evidence, gaps.    |
| `kb/planning/`  | Plan     | Year / month / week commitments, plus retros.                       |
| `kb/logs/`      | Log      | `kb/logs/operations.md` — see below.                                |

`kb/resources/` and `kb/ideas/` are foldered by the taxonomy **area** of the primary (first-listed)
topic: `<entity>/<area>/<id>.md`, or `general/` for `topics: []`. Past ~15 files, split by topic:
`<entity>/<area>/<topic>/<id>.md` — only `resources/architecture/` so far. `goals/` and `areas/`
stay flat. Paths written inside `kb/` are relative to `kb/`.

## Operation log

After any operation that adds, modifies, moves or removes a repo file, add one entry per
task/request (not per tool call) to `kb/logs/operations.md` — **on top**, right after the frontmatter.

```
## YYYY-MM-DD HH:MM — Title of the operation

One to three sentences on what and why.

- **Added:** `path/a.md`, `path/b.md`
- **Modified:** `path/c.md`
- **Moved:** `old/path.md` → `new/path.md`
- **Removed:** `path/d.md`
```

- Omit empty category lines.
- Bulk changes: a glob and a count, not every path.
- Moved and edited: once, under **Modified**, path change inline.
- A Stop hook (`.claude/settings.json`) flags repo changes with no log change. It checks only that
  the log was touched, not its content.

## Hard rules

1. **Filename = ID.** `ddia.md` has `id: ddia`. Kebab-case, stable, no dates or numbers; renaming
   breaks every `[[link]]`. Path is not identity — links resolve by id.
2. **Every file starts with YAML frontmatter** matching `kb/templates/`. Missing or extra fields are a bug.
3. **`topics:` takes only ids from `kb/taxonomy/topics.yml`** — never labels, aliases or free text.
   Missing topic → add it to the taxonomy in the same change.
4. **Cross-reference with wiki links by id**: `[[ddia]]`, `[[system-design-fluency]]`.
5. **Dates are ISO `YYYY-MM-DD`.** Never relative. A week in text is written with its days:
   `W37(07-13.09)`, across months `W40(28.09-04.10)`. Ids, links and frontmatter stay `2026-W37`.
6. **Append assessments, never overwrite.** Each is a dated `### Assessment YYYY-MM-DD` block.
7. **`scale:` must agree with `effort:`** (bucket vs number; `dashboard.mjs` flags mismatches).
   New values for any controlled vocabulary are added in the same change, as rule 3 does for topics.
8. **Be terse.** Applies to everything written here — entries, docs, instructions, commands,
   templates, comments — and to chat answers. Shortest text that carries the information: bullets
   and tables over prose, no preamble, no restating, no filler caveats, no duplicating what another
   file already says (point to it). Assessment notes are 1-3 sentences. A verbose entry is as much
   a bug as a missing field.

## Vocabularies

- Idea status: `inbox` → `considering` → `accepted` → `active` → `done` | `dropped`
- Resource status: `backlog` → `in-progress` → `done` | `dropped` | `reference` (lookup, not read through)
- Goal status: `draft` → `active` → `achieved` | `missed` | `dropped`
- Priority: `high` | `medium` | `low`
- Resource `kind:` (medium): `book` | `course` | `article` | `video` | `talk` | `repo` | `docs` | `newsletter`

### Resource `scale:` — what it costs

| Value       | Effort | Means                                   |
|-------------|--------|-----------------------------------------|
| `multi-day` | > 8h   | Spans days — needs a milestone.         |
| `full-day`  | 3–8h   | ~1 MD. One subject end to end.          |
| `deep-dive` | 1–3h   | One topic in depth. One long sitting.   |
| `short`     | 20–60m | One sitting.                            |
| `snack`     | < 20m  | Fits a gap.                             |

### Resource `nature:` — what value it delivers

Orthogonal to `scale:` — separates a 10-minute curio from a 10-minute foundational explainer.

| Value         | Means                                                        |
|---------------|--------------------------------------------------------------|
| `core`        | Durable concepts, theory, protocols. Outlives the tools.     |
| `applied`     | Hands-on — build or follow along, produce an artifact.       |
| `case-study`  | How someone did it: war story, incident, architecture.       |
| `perspective` | An argument or proposal, not knowledge conveyed.             |
| `lookup`      | Spec, docs, catalogue. Consulted, not read through.          |
| `trivia`      | Curio, entertainment. Never earns planned hours.             |

`lookup`, not `reference` — that is a `status:`. Both fields are resource-only.

## Querying

Expand the term through `kb/taxonomy/topics.yml` first (label → id → aliases → children; an area →
all its topics), then search frontmatter across entity folders, group by entity type. "JS" must
find `javascript`.

```bash
rg -l 'topics:.*\bjavascript\b' kb/ideas kb/resources kb/goals kb/areas
rg -l 'status: active' kb/goals
```

## The stack

`kb/taxonomy/stack.yml` lists topic ids the current job requires — a judgement input, not a
vocabulary. Ids must exist in `topics.yml`; requirement wording (Hibernate, Swagger, …) lives
there as aliases. Edit it when the job changes, not when interest does.

Two axes set priority everywhere (`/capture`, `/assess`, `/plan-week`, `/groom`):

- **Goals** — what is aimed at this month. Urgency.
- **Stack** — what the job demands regardless. Right subject at all.

Neither → `skip`. On-goal only → fine. On-stack only → capture, but never takes planned hours from
an on-goal item. A stack topic nothing covers is a blind spot; `/groom` reports them.

## Assessing

Score against `kb/taxonomy/rubrics.md` only — no ad hoc dimensions or weights, so assessments stay
comparable over time. Worth is relative to `active` goals and `kb/taxonomy/stack.yml`.

## Writing new entries

- Copy from `kb/templates/`; fill frontmatter completely (omit only fields marked optional).
- Specific over vague: "Kafka consumer-group rebalancing", not "Learn Kafka".
- New topics go under the right area in `kb/taxonomy/topics.yml`, with aliases people type.
- Body short (rule 8). If a note needs a paragraph, it is probably two entries.

## External capture (Raindrop)

`/raindrop-triage` promotes Raindrop.io bookmarks here — **one-way, one-time; promotion, not sync**.

- Raindrop holds URLs and highlights, no judgement. Nothing there overwrites `topics`, `goals`,
  `priority`, `rating` or assessments here.
- Once promoted, the file is independent of the bookmark.
- Nothing is deleted in Raindrop. Every triaged bookmark, dropped ones included, gets tag
  `captured` — so `lacks_tags: ["captured"]` is the untriaged queue.
- `raindrop_id:` is the join key, not the URL.
- Dropping is the common, correct outcome.
- Nothing but `/raindrop-triage` may depend on Raindrop being reachable.

## Scripts

`node system/scripts/validate.mjs` (schema, vocabularies, ids, links; manual, no hook) and
`node system/scripts/index.mjs` (gitignored `system/.index/index.json` cache — query it with a small
`node`/`jq` snippet, never read it whole into a conversation). Details: `system/scripts/README.md`.
