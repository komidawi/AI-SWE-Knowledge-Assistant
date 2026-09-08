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

The catalogue where Outbox lives, alongside the patterns adjacent to it — Transactional Outbox,
Transaction Log Tailing, Polling Publisher, Saga, CDC, API Composition, CQRS, Aggregate. Exactly the
neighbourhood where the rejection happened.

Used as a **coverage sweep, not a read**: walk the index, mark every entry `cold` / `heard-of` /
`never-heard` in the ledger in `[[interviewing]]`, and only then read the ones that are not `cold`.
Most entries will come back `cold` in minutes, which is the point — the sweep is cheap and the
residue is the whole value. `nature: lookup`, so it is `reference` by rubric definition and is never
scheduled as a cover-to-cover read.

## Notes

Sweep the index page first and mark from the titles alone. Marking `cold` from a title is only
allowed if the tradeoff can be stated out loud without opening the page — otherwise it is
`heard-of`, which is the state this whole exercise exists to find.

## Assessments
