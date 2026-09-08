---
description: Build the plan for the coming week from goals, capacity and what is in flight
argument-hint: [ YYYY-Www, defaults to the current ISO week ]
---

Plan the week: $ARGUMENTS (default: the current ISO week)

1. Read `planning/<year>/<year>.md` and the current month file for `weekly_hours`, focus and targets.
2. Read the previous week file: carry forward what was not done, and take its retro seriously. If
   the last three weeks all overran, plan fewer hours, not the same hours again.
3. Read every `status: active` goal and its next unchecked milestone.
4. Pull candidates from `resources/` with `status: in-progress` (finish what is started before
   starting more) and `ideas/` with `status: accepted`.
5. Ask for this week's real available hours if `capacity_hours` is unset. Do not assume.
6. Write the week file from `templates/week.md`. Rules:
    - Total committed hours no more than 80% of capacity. The remainder absorbs reality.
    - Every item names the entity it advances, with a `[[link]]`.
    - Every item is finishable within the week. "Read DDIA" is not an item; "DDIA ch. 5-6" is.
    - At most one new start. Finishing beats starting.
    - Commit by `scale:`. A `multi-day` resource is never a week's line item — commit the slice of
      it that finishes this week. `short` and `snack` items are what the 20% reserve absorbs, so
      they are added last and cut first.
    - `nature: trivia` never gets planned hours. It is read in the gaps or not at all.
    - Tie-break on the stack. Two items advancing goals equally: the one whose topics are in
      `taxonomy/stack.yml` wins. An item on neither axis is not committed at all.
7. Say plainly what did not fit and why, rather than quietly dropping it.
