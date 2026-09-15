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
status: in-progress
priority: high
effort: 31h
scale: multi-day
nature: core
progress: "01 done; 02: Networking, API Design, Data Modeling done — Indexing next"
rating:
started: 2026-09-07
finished:
created: 2026-09-07
updated: 2026-09-15
---

## Why this one

Spine of `[[system-design-fluency]]`; the only resource that forces output — each pattern module
opens with a cold design attempt. Covers Kafka, Cassandra, Redis and sharding, so
`[[kafka-system-design-deep-dive]]` and `[[databases-in-depth-course]]` wait until it is done.

## Notes

~31h total · 24 video lessons · 17 quizzes · 9 guided practices.

**Part 1 — Fundamentals (~8h)**

| Module               | Contents                                                           | Time  |
|----------------------|--------------------------------------------------------------------|-------|
| 01 Orientation       | Introduction, Delivery Framework                                   | ~25m  |
| 02 Foundations       | Networking Essentials (~125m), API Design, Data Modeling, Indexing  | ~285m |
| 03 Thinking in Scale | Caching, Sharding, Consistent Hashing, CAP Theorem, Numbers to Know | ~165m |

**Part 2 — The Patterns (~18h)**

| Module                         | Practice designs                          | Time  |
|--------------------------------|-------------------------------------------|-------|
| 04 Scaling Reads               | Bitly, News Aggregator; PostgreSQL, Redis | ~225m |
| 05 Scaling Writes              | Ad Click Aggregator; Kafka, Cassandra     | ~235m |
| 06 Real-time Updates           | FB Live Comments, WhatsApp                | ~170m |
| 07 Dealing with Contention     | Ticketmaster, Online Auction              | ~105m |
| 08 Multi-step Processes        | Notification System, Payment System       | ~135m |
| 09 Handling Large Blobs        | Dropbox, YouTube                          | ~90m  |
| 10 Managing Long Running Tasks | LeetCode, Web Crawler                     | ~100m |
| 11 Proximity-Based Services    | Yelp, Uber; Elasticsearch                 | ~130m |

**Part 3 — Put It All Together (~3h)**

| Module           | Contents                         | Time  |
|------------------|----------------------------------|-------|
| 12 Final Designs | FB News Feed, Metrics Monitoring | ~170m |

Practice rule: attempt first, read second, record the delta here. No first attempt → module not done.

## Assessments
