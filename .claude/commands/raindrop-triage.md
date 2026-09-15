---
description: Pull untriaged Raindrop.io bookmarks, promote the worthwhile ones into the repo, tag them captured
argument-hint: [optional collection name or filter, e.g. "NoSQL" or "videos only"]
---

Triage the Raindrop.io inbox: $ARGUMENTS

Rules: `CLAUDE.md` → External capture. Never delete a bookmark; never overwrite an existing file's
fields from Raindrop.

**1. Fetch.** `find_bookmarks` with `lacks_tags: ["captured"]`, `exclude_collection_ids: [-99]`
(Trash), narrowed by any filter above. Nothing untagged → say so, stop.

**2. Drop what is already here.**

```bash
rg --no-heading 'raindrop_id:|^url:' ideas resources goals
```

Match `raindrop_id` first; else normalized URL (no scheme, `www.`, trailing slash, query params).
Already present → tag `captured`, move on.

**3. Classify.**

| Call         | When                                                     | Result                                    |
|--------------|----------------------------------------------------------|-------------------------------------------|
| **resource** | Concrete artifact worth consuming end to end             | File in `resources/`, tagged `captured`   |
| **idea**     | Suggests something to learn or build, more than to read  | File in `ideas/`, tagged `captured`       |
| **drop**     | Noise, stray tab, or covered by something already `done` | No file, tagged `captured`                |
| **skip**     | Needs the user's judgement                               | No file, **not** tagged, returns next run |

Drop freely — most inboxes are half noise. Several bookmarks on one narrow subject → **one**
resource, the rest under `## Notes`.

**4. Fill the entry** from `templates/`:

- `topics:` — via `taxonomy/topics.yml`. The collection is a hint, not a topic (`Kafka` → `kafka`;
  `Great Courses` → nothing). Folder per `CLAUDE.md` layout.
- `kind:` — bookmark `type`, corrected by the URL.
- `scale:`/`nature:` — page reading-time beats a title guess. `snack` + `trivia` → usually
  **drop**; `perspective` → usually **idea**.
- `source: raindrop`, `raindrop_id:` — a list `[ id, id ]` when bookmarks were folded together.
- `goals:` — only if topics serve an `active` goal; else empty.
- `## Notes` — quote the bookmark's highlights (`find_highlights`). The most valuable part.
- `created:`/`updated:` — today. `## Why this one` — one honest line.

**5. Show the plan** (bookmark → call → file → topics). Get approval before writing or tagging.

**6. Apply.** Write the file **first**, then `update_bookmarks` → `tags: {add: ["captured"]}`, so a
failed write leaves the bookmark untriaged. That tag is the only Raindrop write: no
`delete_bookmarks`, no collection/title/link changes.

**7. Rebuild** with `node scripts/dashboard.mjs`. Report promoted, dropped (why), skipped.
