---
description: Triage the inbox and find rot - duplicates, orphans, stale items, broken links
---

Groom the knowledge base.

**Triage the inbox.** For each idea with `status: inbox`: assess it briefly against the idea rubric
and move it to `considering`, `accepted` or `dropped`. Nothing stays in `inbox` after a groom.

**Find rot:**

- **Orphans** - ideas and resources whose `goals:` is empty and whose topics match no `active` goal
  and no gap in `areas/`. Either link them or drop them.
- **Stale** - `in-progress` with no change to `updated` in 30+ days; `active` goals with a milestone
  date in the past.
- **Duplicates** - near-identical entries, and resources that substantially overlap something
  already `done`.
- **Schema breaks** - missing or unknown frontmatter fields, statuses outside the vocabulary in
  `CLAUDE.md`, dates not in ISO form.
- **Taxonomy breaks** - `topics:` values not present in `taxonomy/topics.yml`; topics defined in the
  taxonomy but used by nothing (candidates for removal).
- **Broken links** - `[[ids]]` pointing at files that do not exist.

Report findings grouped by category, most consequential first. Propose the specific fix for each,
then apply the mechanical ones (schema, links, taxonomy) directly. Ask before dropping anything -
that judgment is the user's.
