---
id: microservices-io-pattern-catalogue
type: resource
kind: docs
title: "microservices.io — Pattern Catalogue"
author: Chris Richardson
url: https://microservices.io/patterns/
topics: [ microservices, event-driven, integration-patterns, distributed-systems ]
goals: [ interview-gap-coverage ]
status: reference
priority: high
effort: 4h
scale: full-day
nature: lookup
progress:
rating:
started:
finished:
created: 2026-09-08
updated: 2026-09-08
---

## Why this one

The catalogue Outbox lives in, alongside its neighbours — Transactional Outbox, Transaction Log
Tailing, Polling Publisher, Saga, CDC, API Composition, CQRS, Aggregate. Exactly where the rejection
happened.

A **coverage sweep, not a read**: walk the index, mark every entry `cold` / `heard-of` /
`never-heard` in the ledger in `[[interviewing]]`, then read only what is not `cold`. Most entries
come back `cold` in minutes — the residue is the whole value. `nature: lookup`, so `reference` by
rubric and never scheduled as a cover-to-cover read.

## Notes

Mark from the index titles alone. `cold` from a title is allowed only if the tradeoff can be stated
out loud without opening the page — otherwise `heard-of`, the state this exercise exists to find.

## Assessments
