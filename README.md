# AI_SKILL_ASSISTANT

A Git + Markdown system for planning and tracking software-engineering skill growth: ideas,
resources, goals, plans, and honest self-assessment — queryable by topic, and workable with Claude
Code as the interface.

Markdown files are the source of truth. `CLAUDE.md` holds the conventions that keep them queryable.

## Layout

| Path                  | Holds                                                        |
|-----------------------|--------------------------------------------------------------|
| `DASHBOARD.md`        | Generated front page — where everything stands, at a glance  |
| `ideas/`              | Things worth learning or building, one file each             |
| `resources/`          | Books, courses, articles, videos, talks, repos               |
| `goals/`              | Outcomes with horizons, success criteria and milestones      |
| `areas/`              | Living self-assessment per skill area: level, evidence, gaps |
| `planning/`           | Year, month and week plans, each with a retro                |
| `logs/`               | Optional record of what was actually done                    |
| `taxonomy/topics.yml` | The controlled vocabulary every `topics:` field draws from   |
| `taxonomy/rubrics.md` | How ideas, resources and goals get scored                    |
| `templates/`          | Copy these when creating anything                            |
| `.claude/commands/`   | Slash commands                                               |
| `scripts/`            | `dashboard.mjs`; Stage B indexer and validator (not built)   |

## Commands

| Command                         | Does                                                                    |
|---------------------------------|-------------------------------------------------------------------------|
| `/capture <url or description>` | Files a new idea, resource or goal with valid frontmatter               |
| `/query <topic>`                | Everything about a topic or area, grouped by entity type                |
| `/assess <id or topic>`         | Scores against the rubric, appends a dated assessment                   |
| `/plan-week [YYYY-Www]`         | Builds the week's plan from goals, capacity and work in flight          |
| `/review-week [YYYY-Www]`       | Retro, status updates, roll-up into the month                           |
| `/groom`                        | Triages the inbox, finds duplicates, orphans, stale items, broken links |
| `/standup`                      | Where things stand and what most needs attention                        |
| `/raindrop-triage [filter]`     | Promotes untriaged Raindrop.io bookmarks in, tags them `captured`       |

## Capture from Raindrop

Links get bookmarked in Raindrop.io, where capturing costs one click. `/raindrop-triage` pulls the
ones not yet tagged `captured`, proposes which deserve a file, writes them, and tags them back.

It is **promotion, not sync** — one way, once. Raindrop holds no judgement, so nothing there can
overwrite `topics`, `goals`, ratings or assessments here. Once a bookmark is promoted, the Markdown
file stands alone: editing, moving or deleting that bookmark in Raindrop changes nothing. Bookmarks
are never deleted by this repo, `raindrop_id:` is the join key, and dropping a bookmark instead of
filing it is the common, correct outcome.

## Dashboard

`DASHBOARD.md` is the front page: active goals, in-flight resources, this week, area gaps, and the
five things most worth attention. Open it any time — no query, no Claude. Regenerate it after
editing entity files:

```bash
node scripts/dashboard.mjs
```

It is derived from the frontmatter and safe to delete. Never edit it by hand; edit the entity file
and rerun. `/standup` answers the same question conversationally and with judgement the script
cannot apply.

## Querying without Claude

```bash
rg -l 'topics:.*\bmicroservices\b' ideas resources goals areas
rg -l 'status: in-progress' resources
rg -n 'target: 2027' goals
rg -l 'scale: snack' resources     # what fits a twenty-minute gap
rg -l 'nature: trivia' resources   # what must never eat planned hours
```

`kind:` is the medium, `scale:` is what it costs and `nature:` is what kind of value it delivers.
The three are independent: a ten-minute curio and a ten-minute foundational explainer share a
`kind` and a `scale`, and only `nature` tells them apart. Both vocabularies are in `CLAUDE.md`.

Expand aliases through `taxonomy/topics.yml` first — a raw search for "k8s" will miss `kubernetes`.

## The one rule that matters

`topics:` accepts **only** ids from `taxonomy/topics.yml`. Free-text tags fragment the vocabulary (`js` / `JavaScript` /
`ES6`) and quietly break every query afterwards. Missing topic? Add it to the
taxonomy in the same change.

## House style

**Terse by default.** Entries, assessments, plans and retros are written to be re-read in seconds:
bullets and tables over prose, no preamble, no filler. A verbose entry is a bug — see hard rule 8
in `CLAUDE.md`.

## Stage B

`scripts/` will also hold a Node indexer that builds `.index/index.json` from the Markdown, plus a
frontmatter validator wired to a pre-commit hook. See `scripts/README.md`. The index is a cache —
always rebuildable, never authoritative. So is `DASHBOARD.md`.
