# scripts

## Built

**`dashboard.mjs`** — reads the entity frontmatter and writes `DASHBOARD.md`, the front page you
open without asking anything: active goals with milestone counts and weeks remaining, in-flight
resources with staleness, the current week's commitments, area gaps, and the five items most
worth attention. Zero dependencies; it parses the small YAML subset the templates actually use, and
should pull in a real parser rather than grow a fake one if the frontmatter ever gets richer.

```bash
node scripts/dashboard.mjs
```

Output is derived and rebuildable. Edit the entity files, never `DASHBOARD.md`.

**`validate.mjs`** — checks every file against its template: required frontmatter present, no
unknown fields, statuses/priorities/kinds/scales/natures within the vocabularies in `CLAUDE.md`,
ISO dates, `id` matching filename, every `topics:`/`stack.yml` value present in
`taxonomy/topics.yml`, every `goals:` value resolving to a real goal, every `[[link]]` resolving
to a real file. Manual command — not wired to a hook. Exits non-zero if it finds anything, so it
*can* be scripted later, but nothing here invokes it for you.

```bash
node scripts/validate.mjs
```

**`index.mjs`** — parses all Markdown into `.index/index.json`: per-entity frontmatter, plus
`by_topic`/`by_goal` reverse indexes with topics pre-expanded through `taxonomy/topics.yml`'s
alias/parent/area chains (an entity tagged `kubernetes` shows up under `kubernetes`, `docker`
[its parent] and `devops` [its area]). Rebuildable from scratch, never hand-edited, gitignored.

```bash
node scripts/index.mjs
```

**`lib/entities.mjs`** and **`lib/taxonomy.mjs`** — shared helpers `dashboard.mjs`, `validate.mjs`
and `index.mjs` all import: frontmatter loading (the same deliberately small YAML subset as
before), and the one hand-rolled parser for `topics.yml`/`stack.yml`'s richer nested shape
(`{ id, label, aliases: […], parent }` entries) — scoped to exactly that shape, not a general
YAML library.

## Still planned

1. **`query.mjs <term>`** — alias- and hierarchy-aware search over `.index/index.json`, grouped by
   entity type. What `/query` does today by reading files and expanding `taxonomy/topics.yml` by
   hand, done in milliseconds over the index instead. Not yet wired up — `/query` still does its
   own expansion for now.

2. **`report.mjs`** — derived views worth having once there is history, which `dashboard.mjs`
   deliberately does not attempt: hours planned vs actual over time, topic coverage against active
   goals, completion rates by resource kind. The dashboard is a snapshot; this is the trend.

Node 24 is available locally, with a built-in test runner and `node:sqlite` if the JSON index ever
outgrows itself. No dependencies used or needed anywhere above.
