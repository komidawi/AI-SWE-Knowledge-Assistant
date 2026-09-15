# scripts

Zero dependencies, Node 24. All output is derived and rebuildable.

## Built

| Script              | Does                                                                                                                                  |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `dashboard.mjs`     | Writes `README.md` (repo front page) and its light/dark SVG charts in `assets/dashboard/`: needs attention, goals, this week, in flight, areas, pick by time. Never hand-edit the output. |
| `lib/svg.mjs`       | SVG string helpers and GitHub-matched light/dark themes for the dashboard charts.                                                     |
| `validate.mjs`      | Checks every entity against its template: fields, vocabularies, ISO dates, `id` = filename, topic/goal ids, `[[links]]`. Exits non-zero on findings. Manual, no hook. |
| `index.mjs`         | Writes gitignored `.index/index.json`: frontmatter plus `by_topic`/`by_goal`, topics expanded through alias/parent/area (`kubernetes` also lists under `docker` and `devops`). |
| `lib/entities.mjs`  | Shared frontmatter loader — small YAML subset. Swap in a real parser if frontmatter gets richer.                                      |
| `lib/taxonomy.mjs`  | Parser for `topics.yml`/`stack.yml`'s nested shape only — not a general YAML library.                                                |

```bash
node scripts/dashboard.mjs
node scripts/validate.mjs
node scripts/index.mjs
```

## Planned

- **`query.mjs <term>`** — alias/hierarchy-aware search over the index, grouped by entity type. `/query` expands by hand until then.
- **`report.mjs`** — trends once history exists: planned vs actual hours, topic coverage vs goals, completion by `kind`.
