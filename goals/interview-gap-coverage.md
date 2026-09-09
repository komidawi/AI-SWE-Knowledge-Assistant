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
updated: 2026-09-09
---

## Why this matters

Not breadth failures — single-node failures: the neighbourhood of a concept is held, the one node
with a name on it is missing.

- **Outbox Pattern** — rejected on it. Kafka, pub/sub, queues, competing consumers, idempotency, saga all held. Outbox sits between two of them and could have been derived live. The interviewer was testing the label, not the derivation.
- **A browser cannot spawn a listening server.** Client–server, REST, Angular held. The missing piece was a boundary, not a concept.

Coverage problems are tractable — someone already wrote the catalogue. Most entries come back `cold`
in minutes; the 10% that does not is the entire yield.

Three gap classes, three hunts:

1. **Missing label** — mechanism held, industry name missing. Cheapest: renaming, not learning. Found by sweeping pattern catalogues.
2. **Missing node** — never encountered. Same hunt, costs real reading.
3. **Missing boundary** — what a runtime *cannot* do. In no catalogue, since catalogues list what exists. Found only by asking the negative question per runtime.

Behavioral is **out of scope**, parked as `[[interview-story-bank]]`, so this goal stays falsifiable.

## Success criteria

- [x] Gap ledger in `[[interviewing]]`: every term marked on the confidence scale (`none`..`highest`), none left unmarked
- [x] Messaging & distributed patterns swept end to end against `[[microservices-io-pattern-catalogue]]` and `[[enterprise-integration-patterns]]` headings; every term of both in the ledger
- [ ] Runtime boundary checklist for at least 4 runtimes (browser, JVM process, container, serverless), each entry naming the mechanism, not just the rule
- [ ] Every `never-heard` / `heard-of` term written up in my own words: what it is, the problem it solves, what breaks without it, and **the nearest thing I already knew**
- [ ] Cold re-test at least 14 days after writing, notes closed. Anything missed drops to `heard-of` and is rewritten
- [ ] Standing rule honoured with zero exceptions: same-day ledger dump after every interview, pass or fail
- [ ] `[[interviewing]]` re-assessed against `taxonomy/rubrics.md` at target, citing ledger and re-test

## Milestones

- [ ] `2026-09-13` — Ledger created; recall pass over past interviews; Outbox and the browser boundary written up as the two worked examples (~3h)
- [x] `2026-09-20` — Messaging sweep 1: `[[microservices-io-pattern-catalogue]]` marked end to end, no skipping the obvious (~4h) — done 2026-09-09
- [ ] `2026-09-27` — Messaging sweep 2: `[[enterprise-integration-patterns]]` headings marked; all unknowns from both sweeps written up (~4h) — marked 2026-09-09, write-ups outstanding
- [ ] `2026-10-04` — Runtime boundary sweep: browser, JVM process, container, serverless; findings written up (~4h) — marked 2026-09-09, write-ups outstanding
- [ ] `2026-10-11` — Cold re-test on everything written before 2026-09-27; `[[interviewing]]` re-assessed; next two sweeps chosen (~3h)

## Capacity check

Re-check 2026-09-09: all six sweeps marked in one pass, ~5 weeks early. The 87 `none`/`minimal`
write-ups are now the whole remaining cost and were never sized — the ~18h below assumed sweeping
dominated. Re-size at the W37 retro.

~18h · `weekly_hours` 4 × 5 weeks = 20h · **fits, ~2h slack.** Thin knowingly: the sweeps are
predictable, the volume of unknowns they surface is not. Overflow carries as write-ups into a second
month; a sweep is never left half-marked — a partly-marked catalogue looks done.

Total `weekly_hours` across live goals is 8, up from 4. Check at the first retro: if observed hours
come in at 5, dates move rather than criteria weakening.

## Linked

- Areas: `[[interviewing]]` — holds the ledger.
- Goals: `[[system-design-fluency]]` — parallel, own 4h. That one builds the ability to design a system; this one ensures no named pattern inside it is missing. Gaps needing depth rather than a label go there.
- Resources: `[[microservices-io-pattern-catalogue]]`, `[[enterprise-integration-patterns]]` — both `nature: lookup`, swept not read.
- Ideas: `[[interview-story-bank]]` — behavioral, cut from this goal.

## Assessments
