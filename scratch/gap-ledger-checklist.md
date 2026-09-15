# Gap ledger checklist — mark, then tell Claude to process

**Processed into the ledger in `[[interviewing]]` on 2026-09-09 — all 216 terms.** Kept as the raw
marking sheet; the ledger is authoritative from here.

For each term, write a number after the arrow (1-6, Polish-school style) — leave it blank only if
you're confident it's a 5 (6 is not available on write-up day, it requires a later closed-notes
re-test):

| # | State     | Means                                                                         |
|---|-----------|-------------------------------------------------------------------------------|
| 1 | `none`    | Genuinely new                                                                 |
| 2 | `minimal` | Recognise the name, cannot use it                                             |
| 3 | `basic`   | Rough idea of what it does, cannot state the tradeoff or when *not* to use it |
| 4 | `mid`     | Can explain with effort; tradeoff or the "when not" is incomplete             |
| 5 | `high`    | Explain unprompted, name the tradeoff, say when *not* to use it               |

Delete this instructions block when done, or don't — I'll ignore it.

Already ledgered, not repeated here: Outbox Pattern, "browser cannot listen on a port".

---

## A — microservices.io catalogue (messaging sweep 1)

### Service Boundaries
- [ ] Decompose by business capability →5
- [ ] Decompose by subdomain →5
- [ ] Self-contained Service →4
- [ ] Service per team →5

### Refactoring to Services
- [ ] Strangler Application →4
- [ ] Anti-corruption layer →2

### Service Collaboration
- [ ] Database per Service →5
- [ ] Shared database →4
- [ ] Saga →3
- [ ] Command-side replica →1
- [ ] API Composition →4
- [ ] CQRS →4
- [ ] Domain event →4
- [ ] Event sourcing →3

### Transactional Messaging
- [ ] Transaction log tailing →1
- [ ] Polling publisher →2

### Testing
- [ ] Consumer-driven contract test →3
- [ ] Consumer-side contract test →3
- [ ] Service component test →4

### Deployment
- [ ] Multiple service instances per host →3
- [ ] Service instance per host →3
- [ ] Service instance per VM →3
- [ ] Service instance per Container →4
- [ ] Serverless deployment →3
- [ ] Service deployment platform →3

### Cross-cutting Concerns
- [ ] Microservice chassis →1
- [ ] Externalized configuration →3
- [ ] Service Template →2

### Communication Styles
- [ ] Remote Procedure Invocation →2
- [ ] Messaging →3
- [ ] Domain-specific protocol →2
- [ ] Idempotent Consumer →3

### External API
- [ ] API gateway →4
- [ ] Backend for front-end →2

### Service Discovery
- [ ] Client-side discovery →3
- [ ] Server-side discovery →3
- [ ] Service registry →4
- [ ] Self registration →4
- [ ] 3rd party registration →4

### Reliability
- [ ] Circuit Breaker →4

### Security
- [ ] Access Token →4

### Observability
- [ ] Log aggregation →4
- [ ] Application metrics →4
- [ ] Audit logging →4
- [ ] Distributed tracing →4
- [ ] Exception tracking →4
- [ ] Health check API →5
- [ ] Log deployments and changes →4

### UI Design
- [ ] Server-side page fragment composition →2
- [ ] Client-side UI composition →2

## B — Enterprise Integration Patterns (messaging sweep 2)

### Message Construct
- [ ] Command Message →3
- [ ] Document Message →1
- [ ] Event Message →2
- [ ] Request-Reply →2
- [ ] Return Address →2
- [ ] Correlation Identifier →4
- [ ] Message Sequence →1
- [ ] Message Expiration →3
- [ ] Format Indicator →2

### Message Routing
- [ ] Pipes-and-Filters →2
- [ ] Message Router →2
- [ ] Content-based Router →3
- [ ] Message Filter →2
- [ ] Dynamic Router →2
- [ ] Recipient List →3
- [ ] Splitter →2
- [ ] Aggregator →3
- [ ] Resequencer →2
- [ ] Composed Msg. Processor →2
- [ ] Scatter-Gather →2
- [ ] Routing Slip →1
- [ ] Process Manager →1
- [ ] Message Broker →4

### Message Transformation
- [ ] Message Translator →1
- [ ] Envelope Wrapper →2
- [ ] Content Enricher →2
- [ ] Content Filter →2
- [ ] Claim Check →3
- [ ] Normalizer →2
- [ ] Canonical Data Model →2

### Messaging Endpoints
- [ ] Messaging Gateway →3
- [ ] Messaging Mapper →2
- [ ] Transactional Client →2
- [ ] Polling Consumer →3
- [ ] Event-driven Consumer →3
- [ ] Competing Consumers →4
- [ ] Message Dispatcher →3
- [ ] Selective Consumer →3
- [ ] Durable Subscriber →3
- [ ] Idempotent Receiver →4
- [ ] Service Activator →1

### Messaging Channels
- [ ] Point-to-Point Channel →2
- [ ] Publish-Subscr. Channel →3
- [ ] Datatype Channel →1
- [ ] Invalid Message Channel →2
- [ ] Dead Letter Channel →3
- [ ] Guaranteed Delivery →4
- [ ] Channel Adapter →2
- [ ] Messaging Bridge →3
- [ ] Message Bus →3

### Systems Mgmt.
- [ ] Control Bus →1
- [ ] Detour →1
- [ ] Wire Tap →1
- [ ] Message History →3
- [ ] Message Store →3
- [ ] Smart Proxy →1
- [ ] Test Message →2
- [ ] Channel Purger →1

## C — Runtime boundaries (milestone 4, pulled forward)

### Browser
- [ ] Service Worker scope limits →1
- [ ] Same-origin policy →2
- [ ] CORS preflight →2
- [ ] No raw sockets →1
- [ ] Storage quota/eviction →2
- [ ] Cross-origin isolation (SharedArrayBuffer) →1
- [ ] Web Worker has no DOM access →1

### JVM process
- [ ] ClassNotFoundException vs NoClassDefFoundError →2
- [ ] Stop-the-world GC pause →3
- [ ] Heap vs stack →5
- [ ] OOM killer vs OutOfMemoryError →3
- [ ] JIT warmup →2
- [ ] Java Memory Model / visibility without synchronized →3
- [ ] Can't safely force-kill a thread →2

### Container
- [ ] Shares host kernel (not a VM) →1
- [ ] PID 1 / zombie reaping →1
- [ ] cgroups vs namespaces →1
- [ ] Ephemeral filesystem without a volume →1
- [ ] Can't see host processes →1
- [ ] OOMKilled vs app-level OOM →1

### Serverless
- [ ] No persistent local state across invocations →1
- [ ] Cold start →1
- [ ] Execution time limit →2
- [ ] No inbound long-lived connections →2
- [ ] Stateless-by-design scaling →2

## D — Backend/data patterns

- [ ] Isolation levels (read uncommitted/committed, repeatable read, serializable) →4
- [ ] Dirty read →3
- [ ] Non-repeatable read →3
- [ ] Phantom read →3
- [ ] Write skew →3
- [ ] Optimistic vs pessimistic locking →3
- [ ] MVCC →3
- [ ] N+1 query problem →3
- [ ] Read-your-writes consistency →1
- [ ] Eventual consistency →4
- [ ] Two-phase commit →3
- [ ] CAP theorem →5
- [ ] Sharding vs partitioning →4
- [ ] Consistent hashing →4
- [ ] Leader election →4
- [ ] Quorum read/write →4

## E — Resilience & ops vocabulary

- [ ] Bulkhead →2
- [ ] Backpressure →2
- [ ] Brownout →
- [ ] Canary vs blue-green deployment →3
- [ ] SLO/SLI/SLA →4
- [ ] Error budget →4
- [ ] Retry with exponential backoff + jitter →5
- [ ] Rate limiting vs throttling →4
- [ ] Chaos engineering →3
- [ ] Graceful degradation →3
- [ ] Load shedding →2
- [ ] Horizontal vs vertical scaling →4

## F — `taxonomy/stack.yml` sweep (on-stack, not covered by A-E)

### Backend (Java / Kotlin / Spring / Build)
- [ ] Dependency Injection: constructor vs field injection →5
- [ ] Spring Bean lifecycle & scopes →3
- [ ] Spring AOP / proxies →2
- [ ] Spring Data repositories →3
- [ ] Spring Security filter chain →2
- [ ] Spring Cloud Config / service discovery (Eureka) →3
- [ ] Kotlin coroutines vs Java threads →2
- [ ] Kotlin null safety / sealed classes →4
- [ ] Maven/Gradle dependency scopes →4
- [ ] Multi-module build & BOM →4

### Databases / ORM / Migrations
- [ ] Hibernate first-level vs second-level cache →2
- [ ] Lazy vs eager loading →3
- [ ] JPA entity lifecycle (transient/managed/detached) →3
- [ ] Liquibase changelog & rollback →3
- [ ] Flyway versioned vs repeatable migrations →3
- [ ] Database indexing strategy →4
- [ ] Connection pooling (HikariCP) →2

### DevOps (Kubernetes / CI-CD / Observability)
- [ ] Kubernetes Pod / Deployment / ReplicaSet →3
- [ ] Kubernetes Service vs Ingress →3
- [ ] ConfigMap vs Secret →3
- [ ] Readiness vs liveness probe →3
- [ ] Horizontal Pod Autoscaler →4
- [ ] CI/CD pipeline stages & quality gates →3
- [ ] OpenTelemetry spans/traces →3
- [ ] Prometheus metrics & Grafana dashboards →3

### Architecture (Service Mesh / Design Patterns)
- [ ] Service mesh sidecar proxy →3
- [ ] Istio traffic management (VirtualService/DestinationRule) →3
- [ ] mTLS between services →3
- [ ] GoF: Strategy, Decorator, Observer, Factory, Adapter, Builder →3
- [ ] Hexagonal / ports & adapters →3

### APIs (REST / SOAP)
- [ ] REST idempotent methods (PUT vs POST) →4
- [ ] HATEOAS →4
- [ ] API versioning strategies →4
- [ ] OpenAPI/Swagger: contract-first vs code-first →4
- [ ] SOAP envelope / WSDL contract →4
- [ ] WS-Security →2

### Messaging (Streaming)
- [ ] Kafka partitions & consumer groups →3
- [ ] Kafka offsets & consumer lag →3
- [ ] Kafka Streams: KTable vs KStream →1
- [ ] Exactly-once vs at-least-once semantics →2

### Testing
- [ ] Test doubles: mock vs stub vs fake vs spy →3
- [ ] TDD red-green-refactor →5
- [ ] BDD / Gherkin →3
- [ ] Test pyramid →4
- [ ] Contract testing tooling (Pact) →2

### Frontend (Angular / TypeScript)
- [ ] Angular change detection (zone.js, OnPush) →1
- [ ] RxJS operators & subscription management →1
- [ ] Angular dependency injection hierarchy →2
- [ ] TypeScript generics & utility types →2
- [ ] Standalone components vs NgModules →2

### AI (LLM / AI Engineering / AI Tooling)
- [ ] RAG pipeline: retrieval + generation →2
- [ ] Embeddings & vector search →2
- [ ] Prompt engineering / few-shot →3
- [ ] Agent tool-use loop →3
- [ ] Context window / token limits →3
