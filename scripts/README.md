# Stage B — indexer and validator (not built yet)

Deliberately deferred. Building query tooling against an empty repository means guessing at the
queries. Build this once there are ~50–100 real entries and the actual query patterns are visible.

Planned, in order of value:

1. **`validate.mjs`** — the highest-value piece, and the one to write first.
   Checks every file against its template: required frontmatter present, no unknown fields, statuses
   within the vocabularies in `CLAUDE.md`, ISO dates, `id` matching filename, every `topics:` value
   present in `taxonomy/topics.yml`, every `[[link]]` resolving to a real file.
   Exit non-zero on failure; wire to `.git/hooks/pre-commit`.

2. **`index.mjs`** — parses all Markdown into `.index/index.json`: entities with frontmatter,
   resolved topic closures (topic → parent → area), and a reverse link graph. Rebuildable from
   scratch, never hand-edited, gitignored.

3. **`query.mjs <term>`** — alias- and hierarchy-aware search over the index, grouped by entity
   type. What `/query` does today by reading files, done in milliseconds over thousands of entries.

4. **`report.mjs`** — derived views worth having once there is history: hours planned vs actual over
   time, topic coverage against active goals, staleness, completion rates by resource kind.

Node 24 is available locally, with a built-in test runner and `node:sqlite` if the JSON index ever
outgrows itself. No dependencies needed for any of the above beyond a YAML parser.
