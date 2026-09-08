---
description: Triage the inbox and find rot - duplicates, orphans, stale items, broken links
---

Groom the knowledge base.

**Triage the inbox.** For each idea with `status: inbox`: assess it briefly against the idea rubric
and move it to `considering`, `accepted` or `dropped`. Nothing stays in `inbox` after a groom.

**Find rot:**

- **Orphans** - ideas and resources whose `goals:` is empty and whose topics match no `active` goal,
  no gap in `areas/` and nothing in `taxonomy/stack.yml`. Either link them or drop them.
- **Stack blind spots** - topic ids in `taxonomy/stack.yml` that no idea, resource, goal or area
  covers. The job requires them and nothing here does. Report them; propose a capture, do not
  invent one.
- **Stale** - `in-progress` with no change to `updated` in 30+ days; `active` goals with a milestone
  date in the past.
- **Duplicates** - near-identical entries, and resources that substantially overlap something
  already `done`.
- **Schema breaks** - missing or unknown frontmatter fields, statuses outside the vocabulary in
  `CLAUDE.md`, dates not in ISO form. Resources additionally need `scale:` and `nature:`, both from
  the vocabularies in `CLAUDE.md`. Do not re-derive the `scale:`/`effort:` bands here - run
  `node scripts/dashboard.mjs` and read the disagreements off **Needs attention**.
- **Taxonomy breaks** - `topics:` values not present in `taxonomy/topics.yml`, and ids in
  `taxonomy/stack.yml` not present there either; topics defined in the taxonomy, used by nothing and
  off-stack (candidates for removal).
- **Misfiled** - an entry whose folder doesn't match its primary (first-listed) topic's area per
  `taxonomy/topics.yml` (or isn't in `general/` despite `topics: []`), and area folders that have
  passed ~15 files without the topic-level split described in `CLAUDE.md`.
- **Broken links** - `[[ids]]` pointing at files that do not exist.

Report findings grouped by category, most consequential first. Propose the specific fix for each,
then apply the mechanical ones (schema, links, taxonomy) directly. Ask before dropping anything -
that judgment is the user's.
