---
id: system-design-practice
type: goal
title: Design a large-scale system end to end, unaided, using a repeatable framework
horizon: year
status: active
start: 2026-09-21
target: 2027-04-25
topics: [ system-design, distributed-systems, databases, caching, streaming, networking, rest-api ]
priority: high
weekly_hours: 4
created: 2026-09-18
updated: 2026-09-23
---

## Why this matters

Theory (`[[system-design-fluency]]`) is not evidence; designs are. The exercise track of
`[[hello-interview-system-design-course]]`, run concurrently with the theory, not interleaved.

## Success criteria

Scope is the practice platform's full catalogue (`[[hello-interview-guided-practice]]`), not the
course's 17 — corrected 2026-09-21 against the site.

- [ ] All 32 exercises with a write-up attempted **before** the walkthrough, plus the 4 "More Practice" problems that have none — attempts first, in one run
- [ ] Write-ups: every attempt compared against the walkthrough, delta written into the resource's Notes — one block after the last attempt, not per exercise. The 4 "More Practice" problems have no walkthrough, so no write-up
- [ ] One design produced cold — no course tab — for a system not covered by the platform, following the Delivery Framework: requirements, estimates, API, data model, high-level design, deep dives
- [ ] `[[architecture]]` re-assessed against `taxonomy/rubrics.md` citing this work

## Milestones

Order is the platform's own (Easy → Medium → Hard), with the 4 write-up-less "More Practice"
problems last — overridden 2026-09-23 for Online Auction and Payment System, pulled next
regardless of tier. Attempts first (~2h each), write-ups as one block behind them (~2h each). Deltas
are written from the attempt notes, so the notes must carry the reasoning, not just the diagram.

- [ ] `2026-11-15` — Attempts, Easy + Medium: Local Delivery Service, Instagram, FB News Feed, Tinder, LeetCode, WhatsApp, Strava, Distributed Cache, Rate Limiter, Online Auction, YouTube, Job Scheduler, FB Live Comments, News Aggregator, Price Tracking Service, Notification System (~32h). Reprioritized 2026-09-23: Online Auction moves next after Local Delivery Service, ahead of platform order.
- [ ] `2027-01-10` — Attempts, Hard + More Practice: YouTube Top K, Uber, Robinhood, Google Docs, Web Crawler, Ad Click Aggregator, FB Post Search, Payment System, Metrics Monitoring, Online Chess, ChatGPT, Flash Sale, Food Review App, Game Leaderboard, Donations Website, GitHub Actions (~32h) — all attempted. Reprioritized 2026-09-23: Payment System pulled forward, attempted right after Online Auction, ahead of the rest of this batch.
- [ ] `2027-03-07` — Write-ups + deltas, first 16 attempts in attempt order (~32h)
- [ ] `2027-04-25` — Write-ups + deltas, remaining 12 (~24h); cold non-course design (~3h); `[[architecture]]` re-assessed

## Capacity check

~123h left (32 × 2h attempts + 28 × 2h write-ups + cold design ~3h; Bitly, Dropbox, Yelp,
Ticketmaster done) · `weekly_hours` 4 × ~31 weeks from 2026-09-21 = ~124h · **fits** at the new
target.

Target moved 2027-01-03 → 2027-04-25 on 2026-09-21, scope kept, per **scope over dates**. Cause:
the catalogue is 36 problems, not the course's 17 — Medium alone is 16, and FB News Feed,
Distributed Cache and FB Live Comments were missing from this repo entirely. `horizon` quarter →
year follows the target.

**Known cost of the split:** a delta written weeks after its attempt corrects less — the reasoning
behind a choice fades faster than the diagram. Accepted deliberately: the block doubles as a
refresher pass before the cold design. If the first batch of deltas turns out to be recall rather
than correction, move write-ups back next to their attempts.

**Watch this:** the first write-up now lands ~5 months after the first attempt. That is the widest
the gap ever gets, and it falls on the Easy/Medium problems where the corrections matter most.

## Linked

- Resources: `[[hello-interview-system-design-course]]` — practice track, done in `[[hello-interview-guided-practice]]`.
- Goals: `[[system-design-fluency]]` — the theory, concurrent.

## Assessments
