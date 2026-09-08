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

Architecture is the area with the most shelf-reading and the least demonstrated ability — see
`[[architecture]]`, sitting at level 1 with an empty evidence list. Five half-read books have not
produced a single system designed end to end. [[hello-interview-system-design-course]] is the
opposite shape: a fixed syllabus with a delivery framework, guided practice, and a design to
produce at every step. Finishing it converts reading into evidence.

## Success criteria

Falsifiable. Someone else could rule on whether these were met.

- [ ] Every module of [[hello-interview-system-design-course]] completed, quizzes included
- [ ] All 9 guided practice designs attempted **before** reading the walkthrough, then compared
      against it, with the delta written into the resource's Notes
- [ ] One design produced cold — no course tab open — for a system not covered by the course,
      following the Delivery Framework: requirements, estimates, API, data model, high-level
      design, deep dives
- [ ] `[[architecture]]` re-assessed against `taxonomy/rubrics.md` with this work cited as evidence

## Milestones

- [ ] `2026-09-27` — Part 1 done: Orientation, Foundations, Thinking in Scale (~8h)
- [ ] `2026-10-18` — Scaling Reads and Scaling Writes, incl. Postgres, Redis, Kafka, Cassandra (~8h)
- [ ] `2026-11-08` — Real-time Updates, Contention, Multi-step Processes (~7h)
- [ ] `2026-11-29` — Large Blobs, Long Running Tasks, Proximity-Based Services (~5h)
- [ ] `2026-12-13` — Final Designs, plus the cold design that is not from the course (~6h)

## Capacity check

Estimated total: ~40h (31h of course material, plus first-attempt designs and notes) · Available:
`weekly_hours` 4 × 14 weeks = 56h · Verdict: **fits, with ~16h of slack.** The slack is the point —
the guided practices are worth redoing, and Networking Essentials alone is a 125-minute lesson.

## Linked

Ideas: `[[second-pass-on-architecture-books]]` — this goal supersedes it for now; decide there
whether the books are a second pass or a drop.
· Resources: `[[hello-interview-system-design-course]]` (the spine).
Goals: `[[interview-gap-coverage]]` — added 2026-09-08, runs in parallel on its own 4h and does not
take hours from this one. Division of labour: this goal builds the ability to design a system, that
one makes sure no single named pattern inside it is missing. A gap it surfaces that needs real depth
rather than a label comes back here.
Adjacent, not committed: `[[kafka-system-design-deep-dive]]`, `[[building-microservices]]`,
`[[designing-event-driven-systems]]`, `[[databases-in-depth-course]]` — the course covers Kafka,
Cassandra and sharding itself, so none of these are started before it is finished.

## Assessments
