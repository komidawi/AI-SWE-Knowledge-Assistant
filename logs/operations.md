---
id: operations
type: log
created: 2026-09-08
updated: 2026-09-08
---

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
