---
id: interview-gap-coverage
type: goal
title: Find and close the named-concept gaps that are costing interviews
horizon: month
status: on-hold
start: 2026-09-08
target: 2026-10-11
topics: [ interviewing, integration-patterns, event-driven, distributed-systems, networking, browser-apis ]
priority: high
weekly_hours: 4
created: 2026-09-08
updated: 2026-09-15
---

> **Deferred 2026-09-15** — `active` → `on-hold`. Resume after `[[hello-interview-system-design-course]]`; re-date milestones then. Ledger and sweeps stay as done.

## Why this matters

Single-node failures, not breadth: the neighbourhood is held, the named node is missing.

- **Outbox Pattern** — rejected on it. Kafka, queues, idempotency, saga all held; the label was tested, not the derivation.
- **A browser cannot spawn a listening server.** Client–server, REST, Angular held; the gap was a boundary.

Tractable — the catalogues exist. Most entries are known in minutes; the rest is the yield.

| Class        | Gap                                  | Found by                          |
|--------------|--------------------------------------|-----------------------------------|
| **label**    | Mechanism held, name missing         | Sweeping catalogues. Cheapest.    |
| **node**     | Never encountered                    | Same sweep, costs real reading    |
| **boundary** | What a runtime *cannot* do           | Negative question per runtime — no catalogue lists these |

Behavioral is **out of scope** (`[[interview-story-bank]]`).

## Success criteria

- [x] Gap ledger in `[[interviewing]]`: every term marked on the confidence scale (`none`..`highest`), none left unmarked
- [x] Messaging & distributed patterns swept end to end against `[[microservices-io-pattern-catalogue]]` and `[[enterprise-integration-patterns]]` headings; every term of both in the ledger
- [ ] Runtime boundary checklist for at least 4 runtimes (browser, JVM process, container, serverless), each entry naming the mechanism, not just the rule
- [ ] Every `never-heard` / `heard-of` term written up in my own words: what it is, the problem it solves, what breaks without it, and **the nearest thing I already knew**
- [ ] Cold re-test at least 14 days after writing, notes closed. Anything missed drops to `heard-of` and is rewritten
- [ ] Standing rule honoured with zero exceptions: same-day ledger dump after every interview, pass or fail
- [ ] `[[interviewing]]` re-assessed against `taxonomy/rubrics.md` at target, citing ledger and re-test

## Milestones

- [ ] `2026-09-13` — Ledger created; recall pass over past interviews; Outbox and the browser boundary written up as the two worked examples (~3h) — **slipped**: ledger done, recall pass and rewrites not started
- [x] `2026-09-20` — Messaging sweep 1: `[[microservices-io-pattern-catalogue]]` marked end to end, no skipping the obvious (~4h) — done 2026-09-09
- [ ] `2026-09-27` — Messaging sweep 2: `[[enterprise-integration-patterns]]` headings marked; all unknowns from both sweeps written up (~4h) — marked 2026-09-09, write-ups outstanding
- [ ] `2026-10-04` — Runtime boundary sweep: browser, JVM process, container, serverless; findings written up (~4h) — marked 2026-09-09, write-ups outstanding
- [ ] `2026-10-11` — Cold re-test on everything written before 2026-09-27; `[[interviewing]]` re-assessed; next two sweeps chosen (~3h)

## Capacity check

~18h · `weekly_hours` 4 × 5 weeks = 20h · **fits, ~2h slack** — as sized 2026-09-08, assuming
sweeps dominated.

- `2026-09-09` — all six sweeps marked, ~5 weeks early. The 87 `none`/`minimal` write-ups are now
  the whole cost and unsized. Re-size at the W37(07-13.09) retro.
- `2026-09-15` — W37(07-13.09) re-size: 0 write-ups done, so no measured rate. Guess 87 × 10–15m ≈ 15–22h,
  plus recall pass and re-test ≈ 20–27h. Left to target: 4 × 4h = 16h. **Does not fit.** Time
  the first two write-ups in W38(14-20.09), then move dates or split the queue.
- Overflow carries into a second month as write-ups. Never leave a sweep half-marked — it looks done.
- Live goals total 8h/week. If observed hours come in lower, dates move; criteria don't weaken.

## Linked

- Areas: `[[interviewing]]` — holds the ledger.
- Goals: `[[system-design-fluency]]` — parallel, own 4h; builds design ability. Gaps needing depth, not a label, go there.
- Resources: `[[microservices-io-pattern-catalogue]]`, `[[enterprise-integration-patterns]]` — both `nature: lookup`, swept not read.
- Ideas: `[[interview-story-bank]]` — behavioral, cut from this goal.

## Assessments
