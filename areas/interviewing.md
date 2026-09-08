---
id: interviewing
type: area
title: Interviewing
topics: [ interviewing, integration-patterns, event-driven, distributed-systems, networking, browser-apis ]
level: 2
target_level: 3
reviewed: 2026-09-08
---

## Current level: 2 — provisional, pending the first sweep

Some interviews pass, some fail badly — that is variance, not a level. Evidence below is empty, so
nothing can be cited. Target 3: clearing rounds without the outcome hinging on one term.

### Evidence

What was shipped, debugged or taught. No evidence → level 2 at most.

- _(none yet — the ledger and cold re-test in `[[interview-gap-coverage]]` will populate this)_

### Gaps

The gap ledger. One row per term, three states only:

| State         | Means                                                                 |
|---------------|------------------------------------------------------------------------|
| `cold`        | Explain unprompted, name the tradeoff, say when *not* to use it        |
| `heard-of`    | Recognise the name, cannot use it. **The dangerous one — feels like knowing** |
| `never-heard` | Genuinely new                                                          |

`cold` is only reached by surviving the closed-notes re-test, never on the day it was written.

| Term                            | State      | Class    | Found       | Written up |
|---------------------------------|------------|----------|-------------|------------|
| Outbox Pattern                  | `heard-of` | label    | `interview` | yes        |
| Browser cannot listen on a port | `heard-of` | boundary | `interview` | yes        |

Class: `label` (mechanism held, name missing) · `node` (never encountered) · `boundary` (what a
runtime cannot do). Found: `interview` · `sweep` · `self`.

#### Outbox Pattern — `label`, cost a rejection

- **Problem.** DB write and broker publish are two systems, no shared transaction. Commit-then-publish loses the event on crash; publish-then-commit emits an event for state that never existed. Dual-write — no ordering fixes it.
- **Mechanism.** Write the event to an `outbox` table in the *same local transaction* as the state change. A relay then publishes, by polling or WAL tailing/CDC (Debezium), and marks the row.
- **Cost.** Relay can crash after publish, before mark → at-least-once, consumers must be idempotent. Ordering per key, not global.
- **Nearest known.** Idempotency and saga. Saga assumes events get emitted; outbox makes that true. Consumer-side inverse is the **inbox pattern** (dedupe by message id in the side-effect transaction) — check whether that is `cold`.

#### A browser cannot spawn a server — `boundary`

- **Rule.** Page JS has no `bind()`/`listen()`. Outbound only (fetch, WebSocket, EventSource); nothing can connect *to* it. A browser game cannot host itself.
- **Non-exceptions.** `localhost` dev servers are a separate process. A Service Worker intercepts only its own origin's page requests, unreachable from the network. WebRTC gives peer data channels but still needs signalling + STUN + TURN.
- **Lesson.** Ask the negative question of every runtime: what can it *not* do, and what does the sandbox forbid rather than merely make hard. That is milestone 4 of `[[interview-gap-coverage]]`.

### Next moves

- `[[interview-gap-coverage]]` (active): messaging sweep 2026-09-27, runtime boundary sweep 2026-10-04, cold re-test + re-assessment 2026-10-11.
- Sweep sources: `[[microservices-io-pattern-catalogue]]`, then `[[enterprise-integration-patterns]]` pattern headings.
- Standing rule, no exceptions: every interview produces a same-day row here for every term not fully owned — pass or fail.
- Queued sweeps, unscheduled: backend/data patterns (isolation levels, optimistic vs pessimistic locking, N+1, read-your-writes); resilience & ops vocabulary (bulkhead, backpressure, brownout, canary vs blue-green, SLO/SLI).
- `[[interview-story-bank]]` — behavioral, out of scope here.
