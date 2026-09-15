# AI_SKILL_ASSISTANT

Git + Markdown system for planning and tracking software-engineering skill growth, queryable by
topic, driven through Claude Code. Markdown is the source of truth; conventions are in `CLAUDE.md`.

## Layout

| Path                  | Holds                                                        |
|-----------------------|--------------------------------------------------------------|
| `README.md`           | Generated front page (dashboard) — where everything stands   |
| `assets/dashboard/`   | Generated SVG charts the dashboard embeds, light + dark      |
| `docs/`               | This guide                                                   |
| `ideas/`              | Things worth learning or building, one file each             |
| `resources/`          | Books, courses, articles, videos, talks, repos               |
| `goals/`              | Outcomes with horizons, success criteria and milestones      |
| `areas/`              | Living self-assessment per skill area: level, evidence, gaps |
| `planning/`           | Year, month and week plans, each with a retro                |
| `logs/`               | `operations.md` — log of file-modifying operations           |
| `taxonomy/topics.yml` | Controlled vocabulary for every `topics:` field              |
| `taxonomy/rubrics.md` | How ideas, resources and goals get scored                    |
| `taxonomy/stack.yml`  | Topics the current job requires — the second axis of worth   |
| `templates/`          | Copy these when creating anything                            |
| `.claude/commands/`   | Slash commands                                               |
| `scripts/`            | Dashboard, validator, indexer — see `scripts/README.md`      |

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
| `/raindrop-triage [filter]`     | Promotes untriaged Raindrop.io bookmarks, tags them `captured`          |

## Without Claude

```bash
node scripts/dashboard.mjs                                   # regenerate README.md
rg -l 'topics:.*\bmicroservices\b' ideas resources goals areas
rg -l 'status: in-progress' resources
rg -l 'scale: snack' resources                               # fits a 20-minute gap
```

Expand aliases through `taxonomy/topics.yml` first — "k8s" misses `kubernetes`.
