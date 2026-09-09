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

The gap ledger. One row per term, a 6-point confidence scale:

| # | State     | Means                                                                          |
|---|-----------|---------------------------------------------------------------------------------|
| 1 | `none`    | Genuinely new                                                                  |
| 2 | `minimal` | Recognise the name, cannot use it. **The dangerous one — feels like knowing** |
| 3 | `basic`   | Rough idea of what it does, cannot state the tradeoff or when *not* to use it  |
| 4 | `mid`     | Can explain with effort; tradeoff or the "when not" is incomplete             |
| 5 | `high`    | Explain unprompted, name the tradeoff, say when *not* to use it               |
| 6 | `highest` | Same as `high`, confirmed by surviving the closed-notes re-test               |

`highest` is only reached by surviving the closed-notes re-test, never on the day it was written —
the ceiling on write-up day is `high`.

Class: `label` (mechanism held, name missing) · `node` (never encountered) · `boundary` (what a
runtime cannot do). Found: `interview` · `sweep` · `self`.

#### Found in interviews

| Term                            | State      | Class    | Found       | Written up |
|---------------------------------|------------|----------|-------------|------------|
| Outbox Pattern                  | `high`     | label    | `interview` | yes        |
| Browser cannot listen on a port | `high`     | boundary | `interview` | yes        |

#### Outbox Pattern — `label`, cost a rejection

- **Problem.** DB write and broker publish are two systems, no shared transaction. Commit-then-publish loses the event on crash; publish-then-commit emits an event for state that never existed. Dual-write — no ordering fixes it.
- **Mechanism.** Write the event to an `outbox` table in the *same local transaction* as the state change. A relay then publishes, by polling or WAL tailing/CDC (Debezium), and marks the row.
- **Cost.** Relay can crash after publish, before mark → at-least-once, consumers must be idempotent. Ordering per key, not global.
- **Nearest known.** Idempotency and saga. Saga assumes events get emitted; outbox makes that true. Consumer-side inverse is the **inbox pattern** (dedupe by message id in the side-effect transaction) — check whether that is `cold`.

#### A browser cannot spawn a server — `boundary`

- **Rule.** Page JS has no `bind()`/`listen()`. Outbound only (fetch, WebSocket, EventSource); nothing can connect *to* it. A browser game cannot host itself.
- **Non-exceptions.** `localhost` dev servers are a separate process. A Service Worker intercepts only its own origin's page requests, unreachable from the network. WebRTC gives peer data channels but still needs signalling + STUN + TURN.
- **Lesson.** Ask the negative question of every runtime: what can it *not* do, and what does the sandbox forbid rather than merely make hard. That is milestone 4 of `[[interview-gap-coverage]]`.

### Gaps — catalogue sweeps, 2026-09-09

216 terms from `scratch/gap-ledger-checklist.md`. All `sweep`, none written up. Class is assigned
at write-up — confidence does not say whether the mechanism is held; part C is `boundary` throughout.
31 `none` · 56 `minimal` · 72 `basic` · 46 `mid` · 11 `high`. **Write-up queue: 87** (`none` + `minimal`).

#### A — microservices.io catalogue (messaging sweep 1)

**Service Boundaries**

| Term | State |
|---|---|
| Decompose by business capability | `high` |
| Decompose by subdomain | `high` |
| Self-contained Service | `mid` |
| Service per team | `high` |

**Refactoring to Services**

| Term | State |
|---|---|
| Strangler Application | `mid` |
| Anti-corruption layer | `minimal` |

**Service Collaboration**

| Term | State |
|---|---|
| Database per Service | `high` |
| Shared database | `mid` |
| Saga | `basic` |
| Command-side replica | `none` |
| API Composition | `mid` |
| CQRS | `mid` |
| Domain event | `mid` |
| Event sourcing | `basic` |

**Transactional Messaging**

| Term | State |
|---|---|
| Transaction log tailing | `none` |
| Polling publisher | `minimal` |

**Testing**

| Term | State |
|---|---|
| Consumer-driven contract test | `basic` |
| Consumer-side contract test | `basic` |
| Service component test | `mid` |

**Deployment**

| Term | State |
|---|---|
| Multiple service instances per host | `basic` |
| Service instance per host | `basic` |
| Service instance per VM | `basic` |
| Service instance per Container | `mid` |
| Serverless deployment | `basic` |
| Service deployment platform | `basic` |

**Cross-cutting Concerns**

| Term | State |
|---|---|
| Microservice chassis | `none` |
| Externalized configuration | `basic` |
| Service Template | `minimal` |

**Communication Styles**

| Term | State |
|---|---|
| Remote Procedure Invocation | `minimal` |
| Messaging | `basic` |
| Domain-specific protocol | `minimal` |
| Idempotent Consumer | `basic` |

**External API**

| Term | State |
|---|---|
| API gateway | `mid` |
| Backend for front-end | `minimal` |

**Service Discovery**

| Term | State |
|---|---|
| Client-side discovery | `basic` |
| Server-side discovery | `basic` |
| Service registry | `mid` |
| Self registration | `mid` |
| 3rd party registration | `mid` |

**Reliability**

| Term | State |
|---|---|
| Circuit Breaker | `mid` |

**Security**

| Term | State |
|---|---|
| Access Token | `mid` |

**Observability**

| Term | State |
|---|---|
| Log aggregation | `mid` |
| Application metrics | `mid` |
| Audit logging | `mid` |
| Distributed tracing | `mid` |
| Exception tracking | `mid` |
| Health check API | `high` |
| Log deployments and changes | `mid` |

**UI Design**

| Term | State |
|---|---|
| Server-side page fragment composition | `minimal` |
| Client-side UI composition | `minimal` |

#### B — Enterprise Integration Patterns (messaging sweep 2)

**Message Construct**

| Term | State |
|---|---|
| Command Message | `basic` |
| Document Message | `none` |
| Event Message | `minimal` |
| Request-Reply | `minimal` |
| Return Address | `minimal` |
| Correlation Identifier | `mid` |
| Message Sequence | `none` |
| Message Expiration | `basic` |
| Format Indicator | `minimal` |

**Message Routing**

| Term | State |
|---|---|
| Pipes-and-Filters | `minimal` |
| Message Router | `minimal` |
| Content-based Router | `basic` |
| Message Filter | `minimal` |
| Dynamic Router | `minimal` |
| Recipient List | `basic` |
| Splitter | `minimal` |
| Aggregator | `basic` |
| Resequencer | `minimal` |
| Composed Msg. Processor | `minimal` |
| Scatter-Gather | `minimal` |
| Routing Slip | `none` |
| Process Manager | `none` |
| Message Broker | `mid` |

**Message Transformation**

| Term | State |
|---|---|
| Message Translator | `none` |
| Envelope Wrapper | `minimal` |
| Content Enricher | `minimal` |
| Content Filter | `minimal` |
| Claim Check | `basic` |
| Normalizer | `minimal` |
| Canonical Data Model | `minimal` |

**Messaging Endpoints**

| Term | State |
|---|---|
| Messaging Gateway | `basic` |
| Messaging Mapper | `minimal` |
| Transactional Client | `minimal` |
| Polling Consumer | `basic` |
| Event-driven Consumer | `basic` |
| Competing Consumers | `mid` |
| Message Dispatcher | `basic` |
| Selective Consumer | `basic` |
| Durable Subscriber | `basic` |
| Idempotent Receiver | `mid` |
| Service Activator | `none` |

**Messaging Channels**

| Term | State |
|---|---|
| Point-to-Point Channel | `minimal` |
| Publish-Subscr. Channel | `basic` |
| Datatype Channel | `none` |
| Invalid Message Channel | `minimal` |
| Dead Letter Channel | `basic` |
| Guaranteed Delivery | `mid` |
| Channel Adapter | `minimal` |
| Messaging Bridge | `basic` |
| Message Bus | `basic` |

**Systems Mgmt.**

| Term | State |
|---|---|
| Control Bus | `none` |
| Detour | `none` |
| Wire Tap | `none` |
| Message History | `basic` |
| Message Store | `basic` |
| Smart Proxy | `none` |
| Test Message | `minimal` |
| Channel Purger | `none` |

#### C — Runtime boundaries (milestone 4, pulled forward)

**Browser**

| Term | State |
|---|---|
| Service Worker scope limits | `none` |
| Same-origin policy | `minimal` |
| CORS preflight | `minimal` |
| No raw sockets | `none` |
| Storage quota/eviction | `minimal` |
| Cross-origin isolation (SharedArrayBuffer) | `none` |
| Web Worker has no DOM access | `none` |

**JVM process**

| Term | State |
|---|---|
| ClassNotFoundException vs NoClassDefFoundError | `minimal` |
| Stop-the-world GC pause | `basic` |
| Heap vs stack | `high` |
| OOM killer vs OutOfMemoryError | `basic` |
| JIT warmup | `minimal` |
| Java Memory Model / visibility without synchronized | `basic` |
| Can't safely force-kill a thread | `minimal` |

**Container**

| Term | State |
|---|---|
| Shares host kernel (not a VM) | `none` |
| PID 1 / zombie reaping | `none` |
| cgroups vs namespaces | `none` |
| Ephemeral filesystem without a volume | `none` |
| Can't see host processes | `none` |
| OOMKilled vs app-level OOM | `none` |

**Serverless**

| Term | State |
|---|---|
| No persistent local state across invocations | `none` |
| Cold start | `none` |
| Execution time limit | `minimal` |
| No inbound long-lived connections | `minimal` |
| Stateless-by-design scaling | `minimal` |

#### D — Backend/data patterns

| Term | State |
|---|---|
| Isolation levels (read uncommitted/committed, repeatable read, serializable) | `mid` |
| Dirty read | `basic` |
| Non-repeatable read | `basic` |
| Phantom read | `basic` |
| Write skew | `basic` |
| Optimistic vs pessimistic locking | `basic` |
| MVCC | `basic` |
| N+1 query problem | `basic` |
| Read-your-writes consistency | `none` |
| Eventual consistency | `mid` |
| Two-phase commit | `basic` |
| CAP theorem | `high` |
| Sharding vs partitioning | `mid` |
| Consistent hashing | `mid` |
| Leader election | `mid` |
| Quorum read/write | `mid` |

#### E — Resilience & ops vocabulary

| Term | State |
|---|---|
| Bulkhead | `minimal` |
| Backpressure | `minimal` |
| Brownout | `high` |
| Canary vs blue-green deployment | `basic` |
| SLO/SLI/SLA | `mid` |
| Error budget | `mid` |
| Retry with exponential backoff + jitter | `high` |
| Rate limiting vs throttling | `mid` |
| Chaos engineering | `basic` |
| Graceful degradation | `basic` |
| Load shedding | `minimal` |
| Horizontal vs vertical scaling | `mid` |

#### F — `taxonomy/stack.yml` sweep (on-stack, not covered by A-E)

**Backend (Java / Kotlin / Spring / Build)**

| Term | State |
|---|---|
| Dependency Injection: constructor vs field injection | `high` |
| Spring Bean lifecycle & scopes | `basic` |
| Spring AOP / proxies | `minimal` |
| Spring Data repositories | `basic` |
| Spring Security filter chain | `minimal` |
| Spring Cloud Config / service discovery (Eureka) | `basic` |
| Kotlin coroutines vs Java threads | `minimal` |
| Kotlin null safety / sealed classes | `mid` |
| Maven/Gradle dependency scopes | `mid` |
| Multi-module build & BOM | `mid` |

**Databases / ORM / Migrations**

| Term | State |
|---|---|
| Hibernate first-level vs second-level cache | `minimal` |
| Lazy vs eager loading | `basic` |
| JPA entity lifecycle (transient/managed/detached) | `basic` |
| Liquibase changelog & rollback | `basic` |
| Flyway versioned vs repeatable migrations | `basic` |
| Database indexing strategy | `mid` |
| Connection pooling (HikariCP) | `minimal` |

**DevOps (Kubernetes / CI-CD / Observability)**

| Term | State |
|---|---|
| Kubernetes Pod / Deployment / ReplicaSet | `basic` |
| Kubernetes Service vs Ingress | `basic` |
| ConfigMap vs Secret | `basic` |
| Readiness vs liveness probe | `basic` |
| Horizontal Pod Autoscaler | `mid` |
| CI/CD pipeline stages & quality gates | `basic` |
| OpenTelemetry spans/traces | `basic` |
| Prometheus metrics & Grafana dashboards | `basic` |

**Architecture (Service Mesh / Design Patterns)**

| Term | State |
|---|---|
| Service mesh sidecar proxy | `basic` |
| Istio traffic management (VirtualService/DestinationRule) | `basic` |
| mTLS between services | `basic` |
| GoF: Strategy, Decorator, Observer, Factory, Adapter, Builder | `basic` |
| Hexagonal / ports & adapters | `basic` |

**APIs (REST / SOAP)**

| Term | State |
|---|---|
| REST idempotent methods (PUT vs POST) | `mid` |
| HATEOAS | `mid` |
| API versioning strategies | `mid` |
| OpenAPI/Swagger: contract-first vs code-first | `mid` |
| SOAP envelope / WSDL contract | `mid` |
| WS-Security | `minimal` |

**Messaging (Streaming)**

| Term | State |
|---|---|
| Kafka partitions & consumer groups | `basic` |
| Kafka offsets & consumer lag | `basic` |
| Kafka Streams: KTable vs KStream | `none` |
| Exactly-once vs at-least-once semantics | `minimal` |

**Testing**

| Term | State |
|---|---|
| Test doubles: mock vs stub vs fake vs spy | `basic` |
| TDD red-green-refactor | `high` |
| BDD / Gherkin | `basic` |
| Test pyramid | `mid` |
| Contract testing tooling (Pact) | `minimal` |

**Frontend (Angular / TypeScript)**

| Term | State |
|---|---|
| Angular change detection (zone.js, OnPush) | `none` |
| RxJS operators & subscription management | `none` |
| Angular dependency injection hierarchy | `minimal` |
| TypeScript generics & utility types | `minimal` |
| Standalone components vs NgModules | `minimal` |

**AI (LLM / AI Engineering / AI Tooling)**

| Term | State |
|---|---|
| RAG pipeline: retrieval + generation | `minimal` |
| Embeddings & vector search | `minimal` |
| Prompt engineering / few-shot | `basic` |
| Agent tool-use loop | `basic` |
| Context window / token limits | `basic` |

### Next moves

- `[[interview-gap-coverage]]` (active): sweeps A-F marked 2026-09-09; write-ups next, cold re-test + re-assessment 2026-10-11.
- **Write-up queue: 87 terms** at `none`/`minimal` — the actual work. Order: on-stack (F) and boundaries (C) first, then A/B/D/E.
- Confirm **Brownout** — left blank on the checklist, recorded `high` per the blank-means-5 rule, but its neighbours are `minimal`. Likely a slip.
- Standing rule, no exceptions: every interview produces a same-day row here for every term not fully owned — pass or fail.
- Sweeps done: `[[microservices-io-pattern-catalogue]]`, `[[enterprise-integration-patterns]]`, runtime boundaries, backend/data, resilience & ops, `taxonomy/stack.yml`. Next unswept source unchosen.
- `[[interview-story-bank]]` — behavioral, out of scope here.
