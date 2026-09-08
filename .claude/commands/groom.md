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
- **Schema, taxonomy and link breaks** - missing/unknown frontmatter fields, statuses outside the
  vocabulary in `CLAUDE.md`, dates not in ISO form, `topics:`/`stack.yml` ids not present in
  `taxonomy/topics.yml`, `goals:` ids with no such goal, `[[links]]` pointing at files that don't
  exist. Do not re-derive any of this by hand - run `node scripts/validate.mjs` and read its
  output directly. Do not re-derive the `scale:`/`effort:` bands either - run
  `node scripts/dashboard.mjs` and read the disagreements off **Needs attention**.
- **Taxonomy dead weight** - topics defined in `taxonomy/topics.yml`, used by nothing and
  off-stack (candidates for removal). `validate.mjs` checks ids resolve; it does not check for
  unused ones - that still takes reading `topics.yml` against actual usage.
- **Misfiled** - an entry whose folder doesn't match its primary (first-listed) topic's area per
  `taxonomy/topics.yml` (or isn't in `general/` despite `topics: []`), and area folders that have
  passed ~15 files without the topic-level split described in `CLAUDE.md`.

Report findings grouped by category, most consequential first. Propose the specific fix for each,
then apply the mechanical ones (schema, links, taxonomy) directly. Ask before dropping anything -
that judgment is the user's.
