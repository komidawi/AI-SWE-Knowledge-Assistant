---
id: system-design-fluency
type: goal
title: Design a large-scale system end to end, unaided, using a repeatable framework
horizon: quarter
status: active
start: 2026-09-07
target: 2026-12-13
topics: [ system-design, distributed-systems, databases, caching, streaming, networking, rest-api ]
priority: high
weekly_hours: 4
created: 2026-09-07
updated: 2026-09-08
---

## Why this matters

Most reading, least demonstrated ability: `[[architecture]]` is level 1, no evidence — five
half-read books, zero systems designed. `[[hello-interview-system-design-course]]` forces a design
at every step, turning reading into evidence.

## Success criteria

- [ ] Every module of `[[hello-interview-system-design-course]]` completed, quizzes included
- [ ] All 9 guided designs attempted **before** the walkthrough, then compared, delta written into the resource's Notes
- [ ] One design produced cold — no course tab — for a system not covered by the course, following the Delivery Framework: requirements, estimates, API, data model, high-level design, deep dives
- [ ] `[[architecture]]` re-assessed against `taxonomy/rubrics.md` citing this work

## Milestones

- [ ] `2026-09-27` — Part 1: Orientation, Foundations, Thinking in Scale (~8h)
- [ ] `2026-10-18` — Scaling Reads and Writes, incl. Postgres, Redis, Kafka, Cassandra (~8h)
- [ ] `2026-11-08` — Real-time Updates, Contention, Multi-step Processes (~7h)
- [ ] `2026-11-29` — Large Blobs, Long Running Tasks, Proximity-Based Services (~5h)
- [ ] `2026-12-13` — Final Designs, plus the cold non-course design (~6h)

## Capacity check

~40h (31h course, plus first-attempt designs and notes) · `weekly_hours` 4 × 14 weeks = 56h ·
**fits, ~16h slack** — deliberate: guided practices are worth redoing.

## Linked

- Ideas: `[[second-pass-on-architecture-books]]` — superseded for now; decide there, second pass or drop.
- Resources: `[[hello-interview-system-design-course]]` (the spine);
  `[[hello-interview-mastering-estimation]]` + `[[hello-interview-numbers-to-know]]` — the estimates
  step of the Delivery Framework, read before module 03.
- Goals: `[[interview-gap-coverage]]` — added 2026-09-08, parallel on its own 4h; catches missing pattern names. Gaps needing depth come here.
- Adjacent, not committed: `[[kafka-system-design-deep-dive]]`, `[[building-microservices]]`, `[[designing-event-driven-systems]]`, `[[databases-in-depth-course]]` — the course covers Kafka, Cassandra and sharding, so none start before it finishes.

## Assessments
