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

`level` is provisional. Some interviews pass and some fail badly, which is not a level — it is
variance. The rubric requires evidence, and the evidence here does not exist yet: the ledger below
is empty apart from two seed entries, so nothing can be cited. Level 2 until the first sweep is
marked.

Target 3 — clearing rounds without the outcome depending on which single term the interviewer
happened to reach for.

### Evidence

What was actually shipped, debugged or taught. No evidence → level 2 at most.

- _(none yet — the gap ledger and the cold re-test in `[[interview-gap-coverage]]` are what will
  populate this)_

### Gaps

Named, specific. "Cannot reason about consumer-group rebalancing", not "need more Kafka".

The gap ledger is this section. One row per term. Three states, and only three:

| State         | Means                                                                        |
|---------------|------------------------------------------------------------------------------|
| `cold`        | Can explain unprompted, name the tradeoff, and say when *not* to use it       |
| `heard-of`    | Recognise the name, cannot use it in an answer. **This is the dangerous one** |
| `never-heard` | Genuinely new                                                                 |

`heard-of` is the state that loses interviews, because it feels like knowing. A term only reaches
`cold` after surviving the closed-notes re-test, never on the day it was written.

| Term                             | State         | Class    | Found        | Written up |
|----------------------------------|---------------|----------|--------------|------------|
| Outbox Pattern                   | `heard-of`    | label    | `interview`  | yes        |
| Browser cannot listen on a port  | `heard-of`    | boundary | `interview`  | yes        |

Class is one of `label` (mechanism held, name missing), `node` (never encountered), `boundary`
(what a runtime cannot do). Found is `interview`, `sweep`, or `self`.

#### Outbox Pattern — `label`, cost a rejection

**The problem it solves.** Writing to the database and publishing to the broker are two separate
systems, so they cannot share a transaction. Commit-then-publish loses the event if the process
dies in between; publish-then-commit emits an event for state that never existed. This is the
dual-write problem, and there is no ordering of the two calls that fixes it.

**The mechanism.** The event is written into an `outbox` table inside the *same local transaction*
as the state change — one database, one commit, atomic by construction. A separate relay then reads
that table and publishes: either polling it, or tailing the write-ahead log via CDC (Debezium is the
usual answer). The row is marked or deleted once published.

**What it costs.** The relay can crash after publishing and before marking, so delivery is
at-least-once and consumers must be idempotent. Ordering holds per key, not globally.

**Nearest thing already known.** Idempotency and saga — both were held. Saga assumes the events
actually get emitted; outbox is what makes that assumption true. The inverse at the consumer end is
the **inbox pattern** (dedupe by message id in the same transaction as the side effect) — check
whether that one is `cold` or also `heard-of`.

#### A browser cannot spawn a server — `boundary`

**The rule.** Page JavaScript has no `bind()` and no `listen()`. It can open outbound connections
(fetch, WebSocket, EventSource) but nothing on the network can ever initiate a connection *to* it.
So a browser game cannot host itself for other players; a server process is started separately, by
the user or by a host, and the browser is a client of it.

**Why the confusion is reasonable.** Several things look like exceptions and are not:
`localhost` dev servers are a separate process the tooling started; a Service Worker intercepts only
requests its own origin's pages make, and is not reachable from the network; WebRTC gives real
peer-to-peer data channels but still needs a signalling server to introduce the peers, plus STUN,
plus TURN to relay when NAT blocks the direct path — so "peer-to-peer" in the browser still ships
with servers.

**The generalisation, which is the actual lesson.** Ask the negative question of every runtime
before assuming a capability: what can it not do, and what does the sandbox forbid rather than
merely make hard. That question is milestone 4 of `[[interview-gap-coverage]]`.

### Next moves

Links to ideas, resources or goals that close the gaps above.

- `[[interview-gap-coverage]]` is the active goal — messaging sweep by 2026-09-27, runtime boundary
  sweep by 2026-10-04, closed-notes re-test and re-assessment of this file 2026-10-11
- Sweep sources: `[[microservices-io-pattern-catalogue]]`, then the pattern headings of
  `[[enterprise-integration-patterns]]`
- Standing rule, no exceptions: every interview produces a same-day row here for every term the
  interviewer used that could not be fully owned — pass or fail
- Queued sweeps, not yet scheduled: backend & data patterns (isolation levels, optimistic vs
  pessimistic locking, N+1, read-your-writes), resilience & ops vocabulary (bulkhead, backpressure,
  brownout, canary vs blue-green, SLO/SLI)
- `[[interview-story-bank]]` — behavioral, out of scope for the current goal
