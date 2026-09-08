---
id: operations
type: log
created: 2026-09-08
updated: 2026-09-08
---

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
