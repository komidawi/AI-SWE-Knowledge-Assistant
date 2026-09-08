---
id: interview-gap-coverage
type: goal
title: Find and close the named-concept gaps that are costing interviews
horizon: month
status: active
start: 2026-09-08
target: 2026-10-11
topics: [ interviewing, integration-patterns, event-driven, distributed-systems, networking, browser-apis ]
priority: high
weekly_hours: 4
created: 2026-09-08
updated: 2026-09-08
---

## Why this matters

The failures are not breadth failures. They are single-node failures: the whole neighbourhood of a
concept is held and the one node with a name on it is missing.

Two confirmed cases:

- **Outbox Pattern** — rejected on it. Kafka, pub/sub, decoupling, queues, competing consumers,
  idempotency and saga were all held. Outbox sits geometrically *between* two of those, and could
  almost certainly have been derived live. The interviewer was not testing the derivation. They were
  testing the label.
- **A browser cannot spawn a listening server.** Client–server, REST and Angular were all held. The
  missing piece was not a concept but a boundary: what the runtime is physically incapable of.

That is a coverage problem, and coverage problems are the tractable kind — someone has already
written the catalogue. A sweep is cheap precisely because most entries come back "know it cold";
the 10% that does not is the entire yield.

Three gap classes, each needing a different hunt:

1. **Missing label** — the mechanism is understood, the industry name for it is not. Cheapest to
   close: it is renaming, not learning. Found by sweeping pattern catalogues.
2. **Missing node** — genuinely never encountered. Found the same way, costs actual reading.
3. **Missing boundary** — what a runtime *cannot* do. In no pattern catalogue, because catalogues
   list what exists. Found only by asking the negative question per runtime, deliberately.

Behavioral / storytelling is deliberately **out of scope** — parked as `[[interview-story-bank]]`
so this goal does exactly one thing and stays falsifiable.

## Success criteria

Falsifiable. Someone else could rule on whether these were met.

- [ ] A gap ledger exists in `[[interviewing]]`: one row per term, each marked `cold`
      (can explain unprompted, with tradeoffs), `heard-of` (recognise the name, cannot use it) or
      `never-heard`. Nothing is left unmarked — an unswept term is indistinguishable from a gap
- [ ] Messaging & distributed patterns swept end to end against
      `[[microservices-io-pattern-catalogue]]` and the chapter/pattern headings of
      `[[enterprise-integration-patterns]]`. Every term in both appears in the ledger
- [ ] Runtime boundary checklist written for at least 4 runtimes — browser, JVM process, container,
      serverless function — built from the negative question: what can this thing **not** do, and
      what does a candidate wrongly assume it can. Each entry names the mechanism, not just the rule
- [ ] Every `never-heard` and `heard-of` term has a written entry in my own words covering: what it
      is, the problem it solves, what breaks without it, and **the nearest thing I already knew** —
      that last field is what converts a missing label into a permanent one
- [ ] Cold re-test at least 14 days after writing: ledger quizzed with notes closed. Anything missed
      drops back to `heard-of` and is rewritten. A term is only `cold` after surviving this
- [ ] Standing rule honoured with zero exceptions: every interview in this window produces a
      same-day dump into the ledger of every term the interviewer used that I could not fully own —
      pass or fail, and regardless of whether it seemed to matter
- [ ] `[[interviewing]]` re-assessed against `taxonomy/rubrics.md` at the target date, citing the
      ledger and the re-test result

## Milestones

- [ ] `2026-09-13` — Ledger created; recall pass over past interviews for every term I remember not
      owning; Outbox and the browser-server boundary written up in full as the two worked examples
      of what an entry looks like (~3h)
- [ ] `2026-09-20` — Messaging sweep part 1: `[[microservices-io-pattern-catalogue]]` marked end to
      end, no skipping the obvious ones (~4h)
- [ ] `2026-09-27` — Messaging sweep part 2: `[[enterprise-integration-patterns]]` headings marked;
      every unknown found in both sweeps written up (~4h)
- [ ] `2026-10-04` — Runtime boundary sweep: the negative question asked for browser, JVM process,
      container and serverless; findings written up (~4h)
- [ ] `2026-10-11` — Cold re-test on everything written before 2026-09-27; `[[interviewing]]`
      re-assessed; next two sweeps chosen — backend/data patterns and resilience vocabulary are the
      standing candidates (~3h)

## Capacity check

Estimated total: ~18h · Available: `weekly_hours` 4 × 5 weeks = 20h · Verdict: **fits, with ~2h of
slack.** Thin, and knowingly so — the sweeps are the predictable part, but the number of unknowns
they surface is not. If a sweep yields far more than expected, the write-ups are what carry into a
second month; the sweep itself is never left half-marked, because a partially-marked catalogue is
worse than an unstarted one — it looks done.

Total `weekly_hours` across live goals is now 8, raised from 4. That is the number to check at the
first retro. If observed hours come in at 5, these dates move rather than the criteria weakening.

## Linked

Areas: `[[interviewing]]` — holds the ledger; this goal reports into it.
· Goals: `[[system-design-fluency]]` runs in parallel on its own 4h. Division of labour: that goal
builds the ability to design a system, this one makes sure no single named pattern inside it is
missing. A gap found here that needs real depth rather than a label gets handed there.
· Resources: `[[microservices-io-pattern-catalogue]]` and `[[enterprise-integration-patterns]]` —
both `nature: lookup`, swept for coverage rather than read.
· Ideas: `[[interview-story-bank]]` — the behavioral track, deliberately cut from this goal.

## Assessments
