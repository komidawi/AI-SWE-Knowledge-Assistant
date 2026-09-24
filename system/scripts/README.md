# scripts

Zero dependencies, Node 24. All output is derived and rebuildable.

## Built

| Script              | Does                                                                                                                                  |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `dashboard.mjs`     | Writes `README.md` (repo front page) and its light/dark SVG charts in `system/assets/dashboard/`: now (status, next up, this week), goals + milestones ahead, in flight, areas, backlog (pick by time, library). Never hand-edit the output. |
| `lib/svg.mjs`       | SVG string helpers and GitHub-matched light/dark themes for the dashboard charts.                                                     |
| `validate.mjs`      | Checks every entity against its template: fields, vocabularies, ISO dates, `id` = filename, topic/goal ids, `[[links]]`. Exits non-zero on findings. Manual, no hook. |
| `index.mjs`         | Writes gitignored `.index/index.json`: frontmatter plus `by_topic`/`by_goal`, topics expanded through alias/parent/area (`kubernetes` also lists under `docker` and `devops`). |
| `toggl.mjs [week|from to] [--json]` | Actual hours from Toggl Track (env `TOGGL_API_TOKEN`), finished entries only (running timers skipped), grouped by entry description, matched to kb ids by id/title. Read-only. Unmatched rows print `?`. Default: current ISO week. |
| `lib/entities.mjs`  | Shared frontmatter loader — small YAML subset. Swap in a real parser if frontmatter gets richer.                                      |
| `lib/taxonomy.mjs`  | Parser for `topics.yml`/`stack.yml`'s nested shape only — not a general YAML library.                                                |

```bash
node system/scripts/dashboard.mjs
node system/scripts/validate.mjs
node system/scripts/index.mjs
node system/scripts/toggl.mjs 2026-W38
```

## Planned

- **`query.mjs <term>`** — alias/hierarchy-aware search over the index, grouped by entity type. `/query` expands by hand until then.
- **`report.mjs`** — trends once history exists: planned vs actual hours, topic coverage vs goals, completion by `kind`.
