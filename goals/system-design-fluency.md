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

Architecture has the most shelf-reading and the least demonstrated ability — `[[architecture]]` is
level 1 with an empty evidence list. Five half-read books, zero systems designed end to end.
`[[hello-interview-system-design-course]]` is the opposite shape: fixed syllabus, delivery
framework, a design produced at every step. Finishing it converts reading into evidence.

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
**fits, ~16h slack.** The slack is the point: guided practices are worth redoing, and Networking
Essentials alone is 125 minutes.

## Linked

- Ideas: `[[second-pass-on-architecture-books]]` — superseded for now; decide there, second pass or drop.
- Resources: `[[hello-interview-system-design-course]]` (the spine).
- Goals: `[[interview-gap-coverage]]` — added 2026-09-08, parallel on its own 4h, takes no hours from this. This goal builds the ability to design a system; that one ensures no named pattern inside it is missing. Gaps needing depth come back here.
- Adjacent, not committed: `[[kafka-system-design-deep-dive]]`, `[[building-microservices]]`, `[[designing-event-driven-systems]]`, `[[databases-in-depth-course]]` — the course covers Kafka, Cassandra and sharding, so none start before it finishes.

## Assessments
