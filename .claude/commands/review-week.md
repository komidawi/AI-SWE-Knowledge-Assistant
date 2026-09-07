---
description: Close out the week - retro, status updates, and roll-up into the month
argument-hint: [YYYY-Www, defaults to the current ISO week]
---

Review the week: $ARGUMENTS (default: the current ISO week)

1. Open the week file and go through each committed item. Ask what was actually done. Do not assume
   completion, and do not assume failure.
2. Update the underlying entities: `status`, `progress`, `updated`, `rating` on anything finished.
   The week file records the week; the entity files hold the truth.
3. Fill the retro: done, not done **and why**, actual vs planned hours, adjustment for next week.
   The "why" is the part with value - chase the real cause, not "was busy".
4. Update the month file's retro section if this is the last week of the month.
5. Flag honestly:
   - Anything `in-progress` untouched for 3+ weeks. Finish it, or set it to `dropped`.
   - Systematic overcommitment - compare planned vs actual hours across the last four weeks.
   - Milestones on `active` goals whose dates have slipped past today.
6. End with one observation about the pattern across recent weeks, not just this one.
