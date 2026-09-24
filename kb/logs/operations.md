---
id: operations
type: log
created: 2026-09-08
updated: 2026-09-23
---

## 2026-09-24 — Kafka System Design Deep Dive: done

Finished, 100%. Status in-progress → done.

- **Modified:** `kb/resources/data/kafka-system-design-deep-dive.md`

## 2026-09-23 — Scaling Writes video + quiz done

Closes module 05's video track (video and quiz are one unit). W39's item ticked; next up per the
2026-09-23 reprioritization is Kafka.

- **Modified:** `planning/2026/2026-W39.md`, `resources/architecture/system-design/hello-interview-system-design-course.md`

## 2026-09-23 — Reprioritize system design next steps (theory + practice)

komidawi reordered next steps: theory Redis dropped behind Scaling Writes, Kafka, Real-time
Updates, Dealing with Contention, Multi-step Processes (Cassandra also pushed back, off-list);
practice pulls Online Auction and Payment System next, ahead of the platform's Easy→Medium→Hard
order (Online Auction after Local Delivery Service, Payment System right after it). Scope and
targets unchanged — order only. Correction: the practice `progress:` note first landed on
`hello-interview-system-design-course` instead of the actual practice tracker,
`hello-interview-guided-practice` — moved.

- **Modified:** `goals/system-design-fluency.md`, `goals/system-design-practice.md`,
  `planning/2026/2026-W39.md`, `resources/architecture/system-design/hello-interview-system-design-course.md`,
  `resources/architecture/system-design/hello-interview-guided-practice.md`

## 2026-09-21 15:20 — Practice scope corrected against the platform

komidawi's screenshots of the Guided Practice page: the catalogue is 36 problems, not the course's
17 — Medium is 16 and FB News Feed, Distributed Cache and FB Live Comments were missing here
entirely. Ticketmaster is done, Local Delivery Service in progress. Order follows the platform
(Easy → Medium → Hard, More Practice last), not the course modules, so News Aggregator leaves W39
and Local Delivery Service takes the slot. Scope kept, target moved per **scope over dates**.

- **Modified:** `goals/system-design-practice.md` (target 2027-01-03 → 2027-04-25, horizon quarter
  → year, milestones and capacity rebuilt), `planning/2026/2026-W39.md`, `planning/2026/2026-09.md`,
  `resources/architecture/system-design/hello-interview-guided-practice.md` (effort 124h → 136h)

## 2026-09-21 14:40 — Groom: inbox cleared, 6 ideas triaged

First groom since the ideas backlog built up. All six `inbox` ideas assessed against the idea
rubric: one accepted, five kept in `considering`. No stack blind spots, no stale entries, no
overdue milestones, `validate` clean. Noted for next groom: 25 ideas now sit in `considering`
against 1 `accepted` — the rubric says drop freely and that is not happening.

- **Modified:** `ideas/**` (6 files — status + dated assessment), `logs/operations.md`

## 2026-09-21 14:05 — W38 closed, W39 planned, practice write-ups batched

Retro for W38 filled from Toggl via Composio (4.15h actual vs 3.3h planned). W39 planned at 4.3h of
6.4h cap, first design attempt ahead of the videos. Per komidawi's decision the practice write-ups
move out of the per-exercise loop into one block after all 17 attempts — `system-design-practice`
milestones and capacity restructured, target date unchanged.

- **Added:** `planning/2026/2026-W39.md`
- **Modified:** `CLAUDE.md`, `planning/2026/2026-W38.md`, `planning/2026/2026-09.md`,
  `goals/system-design-practice.md`,
  `resources/architecture/system-design/hello-interview-system-design-course.md`,
  `resources/architecture/system-design/hello-interview-guided-practice.md`

## 2026-09-21 — Raindrop triage: 6 bookmarks, 2 resources

First triage since Raindrop was wired through Composio. Two promoted, four dropped as noise or
single opinion pieces; all six tagged `captured`, queue now empty.

- **Added:** `resources/ai/agent-ready-environments.md`, `resources/career/productive-software-engineer.md`
- **Modified:** `logs/operations.md`

## 2026-09-19 — Practice goal extended to 2027-01-03

~71h at 4h/week didn't fit by 2026-12-13; dates moved, scope kept. New agreement: scope over dates.

- **Modified:** `CLAUDE.md`, `goals/system-design-practice.md`, `planning/2026/2026.md`, `areas/architecture.md`

## 2026-09-19 — Guided practice: Bitly, Dropbox, Yelp done

Hello Interview Guided Practice added as the exercise platform, split by level; problem = own attempt ~2h + write-up ~2h. Practice goal rescaled to ~71h — over capacity.

- **Added:** `resources/architecture/system-design/hello-interview-guided-practice.md`
- **Modified:** `resources/architecture/system-design/hello-interview-system-design-course.md`, `goals/system-design-practice.md`

## 2026-09-19 — Shorthand: `cp` = commit and push

- **Modified:** `CLAUDE.md`

## 2026-09-19 — Course rule: video + quiz = one unit

Video done implies its quiz done; texts and exercises stay separate units.

- **Modified:** `resources/architecture/system-design/hello-interview-system-design-course.md`

## 2026-09-19 — Videos through 04 Scaling Reads done

03 Thinking in Scale videos finished, closing the Part 1 videos milestone 8d early; 04 Scaling Reads done too, Redis next.

- **Modified:** `resources/architecture/system-design/hello-interview-system-design-course.md`, `goals/system-design-fluency.md`, `planning/2026/2026-W38.md`

## 2026-09-19 — 03 Caching video done

Caching video (pass 1) finished 2026-09-18; Sharding next. W38 item stays open.

- **Modified:** `resources/architecture/system-design/hello-interview-system-design-course.md`, `planning/2026/2026-W38.md`

## 2026-09-18 — Toggl: running timers excluded

Only finished entries count toward hours.

- **Modified:** `system/scripts/toggl.mjs`, `CLAUDE.md`, `system/scripts/README.md`

## 2026-09-18 — Toggl Track hours script

Read-only `toggl.mjs` pulls actual hours per entry description and matches them to kb ids;
`/review-week` uses it for actual vs planned and asks about unmatched rows.

- **Added:** `system/scripts/toggl.mjs`
- **Modified:** `.claude/commands/review-week.md`, `CLAUDE.md`, `docs/guide.md`, `system/scripts/README.md`

## 2026-09-18 — System design course split into tracks: videos, texts, practice

Syllabus formats verified: 15 video+guide lessons, 10 text-only, 17 exercises. Theory stays in
`system-design-fluency` (pass 1 videos, pass 2 texts); exercises moved to new concurrent goal
`system-design-practice`, taking the freed 4h/week.

- **Added:** `goals/system-design-practice.md`
- **Modified:** `resources/architecture/system-design/hello-interview-system-design-course.md`, `goals/system-design-fluency.md`, `planning/2026/2026.md`, `planning/2026/2026-09.md`, `planning/2026/2026-W38.md`, `areas/architecture.md`, `README.md`, `system/assets/dashboard/*.svg`

## 2026-09-17 — Module 02 Foundations closed, 03 Thinking in Scale started

Indexing done, so 01 and 02 are complete. W38's Indexing item ticked; the two estimation articles
added to W38 (+20m) since 03 covers Numbers to Know.

- **Modified:** `resources/architecture/system-design/hello-interview-system-design-course.md`, `planning/2026/2026-W38.md`, `README.md`, `system/assets/dashboard/*.svg`

## 2026-09-17 — Capture the two Hello Interview estimation articles

Estimates are the untrained step of the Delivery Framework; both `high`, on `system-design-fluency`.
New topic `capacity-estimation` (the existing `estimation` is agile planning, not sizing).

- **Added:** `resources/architecture/system-design/hello-interview-mastering-estimation.md`, `resources/architecture/system-design/hello-interview-numbers-to-know.md`
- **Modified:** `taxonomy/topics.yml`, `goals/system-design-fluency.md`, `README.md`, `system/assets/dashboard/*.svg`

## 2026-09-15 23:00 — Set `started:` on the system design course

`in-progress` with blank `started:`; set to the goal's start date, exact day unrecorded.

- **Modified:** `resources/architecture/system-design/hello-interview-system-design-course.md`

## 2026-09-15 22:30 — Second-pass books back to `backlog`

`building-microservices` and `designing-event-driven-systems` were `in-progress` only because a second pass was owed; no goal, no scope. Moved to `backlog` until planned.

- **Modified:** `resources/architecture/microservices/building-microservices.md`, `resources/architecture/event-driven/designing-event-driven-systems.md`, `README.md`, `system/assets/dashboard/*.svg`

## 2026-09-15 22:00 — Defer `interview-gap-coverage`

Goal `active` → `on-hold` (new goal status); resume after `hello-interview-system-design-course`. Pulled from year/month/W38 plans; its 3h of W38 write-ups cut. Dashboard: only active goals' milestones slip or show as next; on-hold goals not shown (dashboard is current work only).

- **Modified:** `CLAUDE.md`, `templates/goal.md`, `system/scripts/validate.mjs`, `system/scripts/dashboard.mjs`, `goals/interview-gap-coverage.md`, `planning/2026/2026.md`, `planning/2026/2026-09.md`, `planning/2026/2026-W38.md`, `areas/interviewing.md`, `README.md`, `system/assets/dashboard/*.svg`

## 2026-09-15 21:30 — Split repo into `kb/` content and `system/` tooling

Content (entities, logs, taxonomy, templates, scratch) moved under `kb/`; scripts, assets and the
index cache under `system/`. Paths inside `kb/` stay `kb/`-relative; ids and links unchanged.

- **Moved:** `ideas|resources|goals|areas|planning|logs|taxonomy|templates|scratch/**` → `kb/…` (114 files), `scripts/**`, `assets/**` → `system/…` (15 files)
- **Modified:** `system/scripts/*.mjs`, `system/scripts/lib/{entities,taxonomy}.mjs`, `system/scripts/README.md`, `.claude/commands/*.md` (7), `.claude/settings.json`, `.codex/hooks.json`, `CLAUDE.md`, `docs/guide.md`, `README.md`

## 2026-09-15 20:30 — README becomes the visual dashboard

GitHub shows `README.md`, so `dashboard.mjs` now writes it, with light/dark SVG charts and real
links instead of `[[wiki]]`. Old README moved to `docs/guide.md`; `DASHBOARD.md` retired.

- **Added:** `scripts/lib/svg.mjs`, `assets/dashboard/*.svg` (8)
- **Modified:** `scripts/dashboard.mjs`, `README.md`, `CLAUDE.md`, `scripts/README.md`, `.claude/settings.json`, `.codex/hooks.json`, `README.md` → `docs/guide.md` (new `README.md` generated)
- **Removed:** `DASHBOARD.md`

## 2026-09-15 18:55 — Plan week W38

6h committed of 8h capacity. Write-ups carried from W37 go first, then course 02 Indexing and 03 in part.

- **Added:** `planning/2026/2026-W38.md`
- **Modified:** `planning/2026/2026-09.md`, `DASHBOARD.md`

## 2026-09-15 13:20 — Show weeks with their day range

Weeks in text now read `W37(07-13.09)`, and `W40(28.09-04.10)` when a week spans two months. Ids,
links and frontmatter stay `2026-W37`. `dashboard.mjs` generates the label.

- **Modified:** `CLAUDE.md`, `scripts/dashboard.mjs`, `templates/month.md`, `planning/2026/2026-09.md`, `goals/interview-gap-coverage.md`, `DASHBOARD.md`

## 2026-09-15 13:00 — Review week W37

Filled the W37 retro from the user's answers. Course moved to `in-progress`. The goal's
2026-09-13 milestone slipped, and the write-up queue was re-sized: it doesn't fit before target.

- **Modified:** `planning/2026/2026-W37.md`, `planning/2026/2026-09.md`, `goals/interview-gap-coverage.md`, `resources/architecture/system-design/hello-interview-system-design-course.md`, `DASHBOARD.md`

## 2026-09-15 12:00 — Enforce rule 8 (terse) across docs and entries

Audited all files for verbosity. Trimmed prose and cross-file duplication. Rule 8 now names docs,
instructions, commands, templates and comments, and bans duplicating another file. No meaning changed.

- **Modified:** `CLAUDE.md`, `README.md`, `scripts/README.md`, `.claude/commands/raindrop-triage.md`, `taxonomy/rubrics.md`, `taxonomy/stack.yml`, `goals/interview-gap-coverage.md`, `goals/system-design-fluency.md`, `ideas/architecture/second-pass-on-architecture-books.md`, `ideas/career/interview-story-bank.md`, `planning/2026/2026.md`, `resources/architecture/system-design/hello-interview-system-design-course.md`, `DASHBOARD.md`

## 2026-09-11 14:20 — Search out the Kraków groups the original list missed

Swept the stack topic by topic plus crossweb.pl, dev.events and the MOTIFE community index. Ten new
groups worth a verdict, two more picks (KraQA, GenAI Cracow — the latter runs on Luma, not
meetup.com), a conference shortlist led by JDD 2026, and a note on where to search next time.

- **Modified:** `scratch/krakow-meetups.md`

## 2026-09-11 13:55 — Rework the meetup assessment into one ordered pros/cons table

Replaced the verdict table with a single table in link order carrying pros, cons and a comment per
group, and added Developer Productivity Group — it was in the provided links and had been dropped
from the first pass. The three missing groups moved to their own table.

- **Modified:** `scratch/krakow-meetups.md`

## 2026-09-11 13:40 — Assess 31 Kraków meetup groups against goals and stack

Checked every group's meetup.com page for activity, size and topic, then scored on goals + stack +
whether it is still alive. Seven picks, three of them groups missing from the original list (PJUG,
SCKRK, DDD-KRK); nine are dead. Kept in `scratch/` — an analysis note, not an entity.

- **Added:** `scratch/krakow-meetups.md`

## 2026-09-11 00:20 — Bump priority on an existing resource instead of duplicating it

User flagged `https://cstack.github.io/db_tutorial/` as very valuable — already captured as
`[[how-does-a-database-work]]` (same URL), so raised priority `medium` → `high` instead of adding
a near-duplicate file.

- **Modified:** `resources/data/how-does-a-database-work.md`

## 2026-09-11 00:10 — Capture two more learning-gap ideas (Idempotency, UUID vs ID)

Idempotency is tied to `[[interview-gap-coverage]]` as a depth gap — the ledger already has it at
`basic`/`mid`, not `none`/`minimal`. UUID vs sequential ID is an unattached schema-design decision.

- **Added:** `ideas/architecture/idempotency.md`, `ideas/data/uuid-vs-sequential-id.md`
- **Modified:** `taxonomy/topics.yml` (added `idempotency`; added `uuid`/`primary-key` aliases to `data-modeling`)

## 2026-09-11 00:00 — Capture four learning-gap ideas (OSGi, ODS, Canonical Data Model, Java version features)

Four named-concept gaps the user flagged were captured as ideas, with new taxonomy topics added
for the three that had no existing id. `canonical-data-model` ties into `[[interview-gap-coverage]]`
since it's an EIP-family pattern that goal is already sweeping; the other three are unattached.

- **Added:** `ideas/languages/osgi.md`, `ideas/data/operational-data-store.md`,
  `ideas/architecture/canonical-data-model.md`, `ideas/languages/java-version-features-in-daily-use.md`
- **Modified:** `taxonomy/topics.yml` (added `osgi`, `operational-data-store`, `canonical-data-model`)

## 2026-09-09 14:40 — Mirror the operations-log Stop hook for Codex

`.codex/hooks.json` was staged but uncommitted, which kept the Stop hook firing every turn. It is
byte-identical to `.claude/settings.json`, so Codex enforces the same log convention Claude does —
consistent with `AGENTS.md` pointing at `CLAUDE.md` as the single source of truth.

- **Added:** `.codex/hooks.json`

## 2026-09-09 14:20 — Process the gap-ledger checklist into the ledger

The checklist is fully marked (F was the last part), so all 216 terms moved into the gap ledger in
`[[interviewing]]` as tables grouped by source part, plus counts and the 87-term write-up queue.
State only — class is left for write-up time, since confidence does not say whether the mechanism
is held. Sweep milestones ticked in the goal and plans; the sweeps landed ~5 weeks early, so the
goal's capacity check now flags that the unsized write-ups are the whole remaining cost.

- **Modified:** `areas/interviewing.md`, `goals/interview-gap-coverage.md`, `planning/2026/2026-09.md`, `planning/2026/2026-W37.md`, `scratch/gap-ledger-checklist.md`, `DASHBOARD.md`

## 2026-09-09 13:30 — Build Stage B: frontmatter validator and index

Built the indexer and validator CLAUDE.md had listed as "planned, not built," now that the repo
has grown to 91 entities. `scripts/validate.mjs` checks every file against its template (required/
unknown fields, controlled vocab, ISO dates, `id` = filename, `topics:`/`stack.yml`/`goals:` ids
resolving, `[[links]]` resolving) — manual command, verified clean against the real repo and
against a deliberately broken smoke-test file (reverted). `scripts/index.mjs` writes
`.index/index.json` (gitignored, rebuildable) with per-entity frontmatter plus `by_topic`/`by_goal`
reverse indexes, topics pre-expanded through `taxonomy/topics.yml` alias/parent/area chains.
Extracted `dashboard.mjs`'s frontmatter-loading helpers into `scripts/lib/entities.mjs` so all
three scripts share one implementation — confirmed `DASHBOARD.md` output is byte-identical after
the refactor. Added `scripts/lib/taxonomy.mjs`, the one hand-rolled parser for `topics.yml`'s
nested shape (no new dependency). Updated `groom.md`'s schema/taxonomy/link-break bullets to point
at `validate.mjs` instead of describing manual re-derivation, mirroring its existing
`dashboard.mjs` pointer for scale/effort.

- **Added:** `scripts/validate.mjs`, `scripts/index.mjs`, `scripts/lib/entities.mjs`,
  `scripts/lib/taxonomy.mjs`
- **Modified:** `scripts/dashboard.mjs`, `scripts/README.md`, `CLAUDE.md`,
  `.claude/commands/groom.md`, `DASHBOARD.md` (regenerated)

## 2026-09-09 12:00 — Capture stack blind spots, fix a real orphan, decide the rest stay

Captured all 9 stack topics that had zero coverage (`sql`, `orm`, `docker`, `observability`, `soap`,
`messaging`, `typescript`, `angular`, `html-css`) as new ideas in `considering`, each a concrete
learnable thing rather than a vague "learn X". Added `resilience` to the `[[architecture]]` area's
`topics:` — it was already treated as a queued gap in `[[interviewing]]`'s body text but missing from
any area's frontmatter, which is what made `[[calculus-of-service-availability]]` and `[[release-it]]`
look like orphans. Asked about dropping the remaining 10 career/quality orphans (off-stack, off-goal,
but not junk); user said keep all of them as-is — no goal or stack currently claims them, and that's
fine.

- **Added:** `ideas/languages/sql-window-functions-and-query-plans.md`,
  `ideas/data/orm-fundamentals.md`, `ideas/devops/docker-hands-on.md`,
  `ideas/devops/observability-fundamentals.md`, `ideas/backend/soap-ws-basics.md`,
  `ideas/architecture/message-broker-end-to-end.md`, `ideas/languages/typescript-hands-on.md`,
  `ideas/frontend/angular-fundamentals.md`, `ideas/frontend/html-css-refresh.md`
- **Modified:** `areas/architecture.md`, `DASHBOARD.md` (regenerated)

## 2026-09-09 11:15 — Correct the commit-branch working agreement

The rule said "commit directly to master," but the repo is actually checked out on `develop`. Fixed
the agreement to say "commit to whatever branch is currently checked out" instead of naming a
specific branch, since the point was never pushing/branching, not which branch.

- **Modified:** `CLAUDE.md`

## 2026-09-09 10:30 — Confirm two guessed resource statuses, put second pass on hold, groom the inbox

Confirmed the two seeded resource statuses the week plan flagged as guesses (both checked out
correct on inspection). Put `[[second-pass-on-architecture-books]]` on hold per user decision
(revisit after the job search). Ran `/groom`: triaged all 15 inbox ideas (11 → `considering`, 1
`learn-c4-model` → `accepted` and linked to `[[system-design-fluency]]`, 1
`kali-linux-ethical-hacking` → `dropped` per user), fixed a repo-wide schema gap where 37 resources
and 10 ideas were missing the templated `source:`/`raindrop_id:` fields entirely, and confirmed no
broken links, misfiled entries, or duplicate titles. Flagged (not yet actioned): 9 stack topics with
zero coverage anywhere, and ~12 orphan resources/ideas with empty `goals:` and no stack/goal/area tie.

- **Modified:** `resources/architecture/integration-patterns/enterprise-integration-patterns.md`,
  `resources/architecture/microservices/monolith-to-microservices.md` (status confirmed, uncertainty
  note removed), 37 resource files (added missing `source:`/`raindrop_id:` fields), 15 idea files
  under `ideas/` (triage status + schema fields), `ideas/architecture/second-pass-on-architecture-books.md`
  (on-hold note + schema fields), `ideas/career/interview-story-bank.md` (schema fields),
  `planning/2026/2026-W37.md` (checked off second-pass decision), `DASHBOARD.md` (regenerated)

## 2026-09-09 00:05 — Add Stop hook enforcing the operations log convention

Added a `.claude/settings.json` Stop hook that flags when tracked/untracked repo files changed
without a matching change to `logs/operations.md` (checks presence of an update only, not
content/format). Noted its existence in `CLAUDE.md`.

- **Added:** `.claude/settings.json`
- **Modified:** `CLAUDE.md`

## 2026-09-08 23:55 — Add Working agreements section to CLAUDE.md

Established that principles/rules/agreements/ways of operating are sourced from `CLAUDE.md` (not
chat or AI memory), per user request. Moved the commit-directly-to-master rule in from memory.

- **Modified:** `CLAUDE.md`

## 2026-09-08 23:39 — Add self-reported operation log convention

Stood up `logs/operations.md` as the running, self-reported record of file-modifying operations,
per user request. Documented the convention in `CLAUDE.md`.

- **Added:** `logs/operations.md`
- **Modified:** `CLAUDE.md`
- **Removed:** `logs/.gitkeep`

## 2026-09-08 (backfilled, exact time not recorded) — Group resources/ideas into topic-area subfolders

Restructured `resources/` and `ideas/` from flat directories into subfolders by taxonomy area
(`taxonomy/topics.yml`), with `resources/architecture/` further split by topic since it passed the
~15-file threshold. Updated the commands that write into these folders to match.

- **Moved:** `resources/*.md` → `resources/<area>/[<topic>/]*.md` (61 files),
  `ideas/*.md` → `ideas/<area>/*.md` (17 files)
- **Modified:** `CLAUDE.md`, `.claude/commands/capture.md`, `.claude/commands/groom.md`,
  `.claude/commands/raindrop-triage.md`, `DASHBOARD.md` (regenerated)
