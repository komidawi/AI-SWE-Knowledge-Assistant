---
id: hello-interview-system-design-course
type: resource
kind: course
title: System Design Course
author: Hello Interview
url: https://www.hellointerview.com/learn/courses/system-design
source: manual
raindrop_id:
topics: [ system-design, distributed-systems, databases, caching, streaming, networking, rest-api ]
goals: [ system-design-fluency ]
status: backlog
priority: high
effort: 31h
scale: multi-day
nature: core
progress:
rating:
started:
finished:
created: 2026-09-07
updated: 2026-09-07
---

## Why this one

It is the spine of `[[system-design-fluency]]`, and it is the only thing in `resources/` that
forces output rather than input: every pattern module opens with a design attempted cold, before
its walkthrough. That inverts the failure mode the architecture books have already demonstrated —
reading about a tradeoff is not the same as having made it.

Also chosen for sequencing. It teaches Kafka, Cassandra, Redis and sharding in the context where
they matter, which is why `[[kafka-system-design-deep-dive]]` and `[[databases-in-depth-course]]`
stay in the backlog until this is finished rather than being read in parallel.

## Notes

Structure and stated timings, for milestone planning (~31h total, 24 video lessons, 17 quizzes,
9 guided practices):

**Part 1 — Fundamentals (~8h)**

| Module              | Contents                                                          | Time    |
|---------------------|-------------------------------------------------------------------|---------|
| 01 Orientation      | Introduction, Delivery Framework                                  | ~25m    |
| 02 Foundations      | Networking Essentials (~125m), API Design, Data Modeling, Indexing | ~285m   |
| 03 Thinking in Scale| Caching, Sharding, Consistent Hashing, CAP Theorem, Numbers to Know | ~165m   |

**Part 2 — The Patterns (~18h)**

| Module                       | Practice designs                        | Time  |
|------------------------------|------------------------------------------|-------|
| 04 Scaling Reads             | Bitly, News Aggregator; PostgreSQL, Redis | ~225m |
| 05 Scaling Writes            | Ad Click Aggregator; Kafka, Cassandra     | ~235m |
| 06 Real-time Updates         | FB Live Comments, WhatsApp                | ~170m |
| 07 Dealing with Contention   | Ticketmaster, Online Auction              | ~105m |
| 08 Multi-step Processes      | Notification System, Payment System       | ~135m |
| 09 Handling Large Blobs      | Dropbox, YouTube                          | ~90m  |
| 10 Managing Long Running Tasks | LeetCode, Web Crawler                   | ~100m |
| 11 Proximity-Based Services  | Yelp, Uber; Elasticsearch                 | ~130m |

**Part 3 — Put It All Together (~3h)**

| Module           | Contents                        | Time  |
|------------------|----------------------------------|-------|
| 12 Final Designs | FB News Feed, Metrics Monitoring | ~170m |

Rule for the practice designs, per `[[system-design-fluency]]`: attempt first, read second, and
record the delta here. A module counted as done without a first attempt does not count.

## Assessments
