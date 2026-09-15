# AI_SKILL_ASSISTANT

Git + Markdown system for planning and tracking software-engineering skill growth, queryable by
topic, driven through Claude Code. Markdown is the source of truth; conventions are in `CLAUDE.md`.

## Layout

`kb/` is the content, `system/` is tooling and generated output.

| Path                        | Holds                                                        |
|-----------------------------|--------------------------------------------------------------|
| `README.md`                 | Generated front page (dashboard) — where everything stands   |
| `docs/`                     | This guide                                                   |
| `kb/ideas/`                 | Things worth learning or building, one file each             |
| `kb/resources/`             | Books, courses, articles, videos, talks, repos               |
| `kb/goals/`                 | Outcomes with horizons, success criteria and milestones      |
| `kb/areas/`                 | Living self-assessment per skill area: level, evidence, gaps |
| `kb/planning/`              | Year, month and week plans, each with a retro                |
| `kb/logs/`                  | `operations.md` — log of file-modifying operations           |
| `kb/taxonomy/topics.yml`    | Controlled vocabulary for every `topics:` field              |
| `kb/taxonomy/rubrics.md`    | How ideas, resources and goals get scored                    |
| `kb/taxonomy/stack.yml`     | Topics the current job requires — the second axis of worth   |
| `kb/templates/`             | Copy these when creating anything                            |
| `kb/scratch/`               | Working notes, not entities                                  |
| `system/scripts/`           | Dashboard, validator, indexer — see `system/scripts/README.md` |
| `system/assets/dashboard/`  | Generated SVG charts the dashboard embeds, light + dark      |
| `.claude/commands/`         | Slash commands                                               |

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
node system/scripts/dashboard.mjs                            # regenerate README.md
rg -l 'topics:.*\bmicroservices\b' kb/ideas kb/resources kb/goals kb/areas
rg -l 'status: in-progress' kb/resources
rg -l 'scale: snack' kb/resources                            # fits a 20-minute gap
```

Expand aliases through `kb/taxonomy/topics.yml` first — "k8s" misses `kubernetes`.
