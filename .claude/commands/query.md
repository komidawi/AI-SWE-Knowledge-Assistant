---
description: Find everything about a topic, technology or area across all entities
argument-hint: <topic, e.g. JavaScript | Frontend | System Design>
---

Find everything related to: $ARGUMENTS

1. Resolve the term against `taxonomy/topics.yml`: match on label, id or alias, case-insensitively.
   - If it names an **area**, expand to every topic in that area.
   - If it names a **topic**, expand to that topic plus its children (topics with `parent:` set).
   - If it matches nothing, say so, show the closest candidates, and search free-text as a fallback.
2. Search frontmatter across `ideas/`, `resources/`, `goals/`, `areas/` and `planning/` for any of
   the expanded ids.
3. Report grouped by entity type, and within each group sorted by status then priority:

   - **Goals** - title, status, target date, progress through milestones
   - **Ideas** - title, status, priority
   - **Resources** - title, kind, status, progress, rating
   - **Areas** - current level vs target
   - **Planning** - which weeks and months committed to this

4. Close with what the results actually show: what is stalled, what is unlinked to any goal, what
   is duplicated, and what is missing given the goals that are `active`.

State which topic ids you expanded to, so a wrong expansion is visible rather than silent.
