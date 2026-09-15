---
id: operations
type: log
created: 2026-09-08
updated: 2026-09-15
---

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
