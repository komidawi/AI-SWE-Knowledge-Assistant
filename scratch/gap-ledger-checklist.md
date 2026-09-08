# Gap ledger checklist — mark, then tell Claude to process

For each term, write a number after the arrow (1-6, Polish-school style) — leave it blank only if
you're confident it's a 5 (6 is not available on write-up day, it requires a later closed-notes
re-test):

| # | State     | Means                                                                          |
|---|-----------|---------------------------------------------------------------------------------|
| 1 | `none`    | Genuinely new                                                                  |
| 2 | `minimal` | Recognise the name, cannot use it                                              |
| 3 | `basic`   | Rough idea of what it does, cannot state the tradeoff or when *not* to use it  |
| 4 | `mid`     | Can explain with effort; tradeoff or the "when not" is incomplete             |
| 5 | `high`    | Explain unprompted, name the tradeoff, say when *not* to use it               |

Delete this instructions block when done, or don't — I'll ignore it.

Already ledgered, not repeated here: Outbox Pattern, "browser cannot listen on a port".

---

## A — microservices.io catalogue (messaging sweep 1)

### Service Boundaries
- [ ] Decompose by business capability →
- [ ] Decompose by subdomain →
- [ ] Self-contained Service →
- [ ] Service per team →

### Refactoring to Services
- [ ] Strangler Application →
- [ ] Anti-corruption layer →

### Service Collaboration
- [ ] Database per Service →
- [ ] Shared database →
- [ ] Saga →
- [ ] Command-side replica →
- [ ] API Composition →
- [ ] CQRS →
- [ ] Domain event →
- [ ] Event sourcing →

### Transactional Messaging
- [ ] Transaction log tailing →
- [ ] Polling publisher →

### Testing
- [ ] Consumer-driven contract test →
- [ ] Consumer-side contract test →
- [ ] Service component test →

### Deployment
- [ ] Multiple service instances per host →
- [ ] Service instance per host →
- [ ] Service instance per VM →
- [ ] Service instance per Container →
- [ ] Serverless deployment →
- [ ] Service deployment platform →

### Cross-cutting Concerns
- [ ] Microservice chassis →
- [ ] Externalized configuration →
- [ ] Service Template →

### Communication Styles
- [ ] Remote Procedure Invocation →
- [ ] Messaging →
- [ ] Domain-specific protocol →
- [ ] Idempotent Consumer →

### External API
- [ ] API gateway →
- [ ] Backend for front-end →

### Service Discovery
- [ ] Client-side discovery →
- [ ] Server-side discovery →
- [ ] Service registry →
- [ ] Self registration →
- [ ] 3rd party registration →

### Reliability
- [ ] Circuit Breaker →

### Security
- [ ] Access Token →

### Observability
- [ ] Log aggregation →
- [ ] Application metrics →
- [ ] Audit logging →
- [ ] Distributed tracing →
- [ ] Exception tracking →
- [ ] Health check API →
- [ ] Log deployments and changes →

### UI Design
- [ ] Server-side page fragment composition →
- [ ] Client-side UI composition →

## B — Enterprise Integration Patterns (messaging sweep 2)

### Message Construct
- [ ] Command Message →
- [ ] Document Message →
- [ ] Event Message →
- [ ] Request-Reply →
- [ ] Return Address →
- [ ] Correlation Identifier →
- [ ] Message Sequence →
- [ ] Message Expiration →
- [ ] Format Indicator →

### Message Routing
- [ ] Pipes-and-Filters →
- [ ] Message Router →
- [ ] Content-based Router →
- [ ] Message Filter →
- [ ] Dynamic Router →
- [ ] Recipient List →
- [ ] Splitter →
- [ ] Aggregator →
- [ ] Resequencer →
- [ ] Composed Msg. Processor →
- [ ] Scatter-Gather →
- [ ] Routing Slip →
- [ ] Process Manager →
- [ ] Message Broker →

### Message Transformation
- [ ] Message Translator →
- [ ] Envelope Wrapper →
- [ ] Content Enricher →
- [ ] Content Filter →
- [ ] Claim Check →
- [ ] Normalizer →
- [ ] Canonical Data Model →

### Messaging Endpoints
- [ ] Messaging Gateway →
- [ ] Messaging Mapper →
- [ ] Transactional Client →
- [ ] Polling Consumer →
- [ ] Event-driven Consumer →
- [ ] Competing Consumers →
- [ ] Message Dispatcher →
- [ ] Selective Consumer →
- [ ] Durable Subscriber →
- [ ] Idempotent Receiver →
- [ ] Service Activator →

### Messaging Channels
- [ ] Point-to-Point Channel →
- [ ] Publish-Subscr. Channel →
- [ ] Datatype Channel →
- [ ] Invalid Message Channel →
- [ ] Dead Letter Channel →
- [ ] Guaranteed Delivery →
- [ ] Channel Adapter →
- [ ] Messaging Bridge →
- [ ] Message Bus →

### Systems Mgmt.
- [ ] Control Bus →
- [ ] Detour →
- [ ] Wire Tap →
- [ ] Message History →
- [ ] Message Store →
- [ ] Smart Proxy →
- [ ] Test Message →
- [ ] Channel Purger →

## C — Runtime boundaries (milestone 4, pulled forward)

### Browser
- [ ] Service Worker scope limits →
- [ ] Same-origin policy →
- [ ] CORS preflight →
- [ ] No raw sockets →
- [ ] Storage quota/eviction →
- [ ] Cross-origin isolation (SharedArrayBuffer) →
- [ ] Web Worker has no DOM access →

### JVM process
- [ ] ClassNotFoundException vs NoClassDefFoundError →
- [ ] Stop-the-world GC pause →
- [ ] Heap vs stack →
- [ ] OOM killer vs OutOfMemoryError →
- [ ] JIT warmup →
- [ ] Java Memory Model / visibility without synchronized →
- [ ] Can't safely force-kill a thread →

### Container
- [ ] Shares host kernel (not a VM) →
- [ ] PID 1 / zombie reaping →
- [ ] cgroups vs namespaces →
- [ ] Ephemeral filesystem without a volume →
- [ ] Can't see host processes →
- [ ] OOMKilled vs app-level OOM →

### Serverless
- [ ] No persistent local state across invocations →
- [ ] Cold start →
- [ ] Execution time limit →
- [ ] No inbound long-lived connections →
- [ ] Stateless-by-design scaling →

## D — Backend/data patterns

- [ ] Isolation levels (read uncommitted/committed, repeatable read, serializable) →
- [ ] Dirty read →
- [ ] Non-repeatable read →
- [ ] Phantom read →
- [ ] Write skew →
- [ ] Optimistic vs pessimistic locking →
- [ ] MVCC →
- [ ] N+1 query problem →
- [ ] Read-your-writes consistency →
- [ ] Eventual consistency →
- [ ] Two-phase commit →
- [ ] CAP theorem →
- [ ] Sharding vs partitioning →
- [ ] Consistent hashing →
- [ ] Leader election →
- [ ] Quorum read/write →

## E — Resilience & ops vocabulary

- [ ] Bulkhead →
- [ ] Backpressure →
- [ ] Brownout →
- [ ] Canary vs blue-green deployment →
- [ ] SLO/SLI/SLA →
- [ ] Error budget →
- [ ] Retry with exponential backoff + jitter →
- [ ] Rate limiting vs throttling →
- [ ] Chaos engineering →
- [ ] Graceful degradation →
- [ ] Load shedding →
- [ ] Horizontal vs vertical scaling →
