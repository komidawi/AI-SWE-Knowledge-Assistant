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
```

Expand aliases through `taxonomy/topics.yml` first — a raw search for "k8s" will miss `kubernetes`.

## The one rule that matters

`topics:` accepts **only** ids from `taxonomy/topics.yml`. Free-text tags fragment the vocabulary (`js` / `JavaScript` /
`ES6`) and quietly break every query afterwards. Missing topic? Add it to the
taxonomy in the same change.

## Stage B

`scripts/` will also hold a Node indexer that builds `.index/index.json` from the Markdown, plus a
frontmatter validator wired to a pre-commit hook. See `scripts/README.md`. The index is a cache —
always rebuildable, never authoritative. So is `DASHBOARD.md`.
