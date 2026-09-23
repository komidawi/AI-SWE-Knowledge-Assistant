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
goals: [ system-design-fluency, system-design-practice ]
status: in-progress
priority: high
effort: 31h
scale: multi-day
nature: core
progress: "Videos: 02, 03 done, 04: Scaling Reads done 2026-09-19 — reprioritized 2026-09-23: Scaling Writes, Kafka, Real-time Updates, Dealing with Contention, Multi-step Processes next, Redis behind them · Texts: 01 done"
rating:
started: 2026-09-07
finished:
created: 2026-09-07
updated: 2026-09-23
---

## Why this one

Spine of `[[system-design-fluency]]` (theory) and `[[system-design-practice]]` (exercises).
Covers Kafka, Cassandra, Redis and sharding, so `[[kafka-system-design-deep-dive]]` and
`[[databases-in-depth-course]]` wait until it is done.

## Notes

~31h listed · formats verified on the syllabus page 2026-09-18.

**Three tracks, never mixed:**

| Track    | Goal                         | Items                                                          |
|----------|------------------------------|----------------------------------------------------------------|
| Videos   | `[[system-design-fluency]]`  | Pass 1 — 15 "video and guide" lessons, their 12 quizzes        |
| Texts    | `[[system-design-fluency]]`  | Pass 2 — 15 guides + 10 text-only lessons, their 4 quizzes     |
| Practice | `[[system-design-practice]]` | Concurrent — 17 exercises with their video reviews and quizzes |

A video and its quiz are one unit — video done means quiz done. Texts and exercises are separate units. A named system (Bitly, Uber, Metrics Monitoring, …) is
practice, whatever its format. Practice rule: attempt first, review second, record the delta here.
No first attempt → exercise not done. Since 2026-09-21 the review+delta step is batched — all
attempts first, write-ups in one block behind them (`[[system-design-practice]]` milestones).

| Module                         | Video + guide                                                       | Text only                        | Practice                                                        |
|--------------------------------|---------------------------------------------------------------------|----------------------------------|-----------------------------------------------------------------|
| 01 Orientation                 | —                                                                   | Introduction, Delivery Framework | —                                                               |
| 02 Foundations                 | Networking Essentials, API Design, Data Modeling, Database Indexing | —                                | —                                                               |
| 03 Thinking in Scale           | Caching, Sharding, Consistent Hashing, CAP Theorem                  | Numbers to Know                  | —                                                               |
| Part 2 intro                   | —                                                                   | Common Patterns                  | —                                                               |
| 04 Scaling Reads               | Scaling Reads, Redis                                                | PostgreSQL                       | Bitly + review, News Aggregator                                 |
| 05 Scaling Writes              | Scaling Writes, Kafka, Cassandra                                    | —                                | Ad Click Aggregator + review                                    |
| 06 Real-time Updates           | Real-time Updates                                                   | —                                | FB Live Comments + review, WhatsApp                             |
| 07 Dealing with Contention     | —                                                                   | Dealing with Contention          | Ticketmaster + review, Online Auction                           |
| 08 Multi-step Processes        | Multi-step Processes                                                | —                                | Notification System, Payment System                             |
| 09 Handling Large Blobs        | —                                                                   | Handling Large Blobs             | Dropbox + review, YouTube                                       |
| 10 Managing Long Running Tasks | —                                                                   | Managing Long Running Tasks      | LeetCode + review, Web Crawler                                  |
| 11 Proximity-Based Services    | —                                                                   | Proximity Search, Elasticsearch  | Yelp + review, Uber                                             |
| 12 Final Designs               | —                                                                   | —                                | FB News Feed + review, Metrics Monitoring (video + guide, quiz) |

Numbers to Know text = `[[hello-interview-numbers-to-know]]`.
Exercises are done in `[[hello-interview-guided-practice]]`.

## Assessments
