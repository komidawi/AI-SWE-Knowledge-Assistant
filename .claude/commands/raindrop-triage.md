---
description: Pull untriaged Raindrop.io bookmarks, promote the worthwhile ones into the repo, tag them captured
argument-hint: [optional collection name or filter, e.g. "NoSQL" or "videos only"]
---

Triage the Raindrop.io inbox: $ARGUMENTS

Raindrop is a **capture inbox**, not a source of truth. Bookmarks flow one way — into this repo,
once — and after that the Markdown file is independent. Nothing in Raindrop is ever deleted here,
and nothing in Raindrop ever overwrites a field in a file that already exists.

**1. Fetch the untriaged.** `find_bookmarks` with `lacks_tags: ["captured"]`. Exclude Trash
(`exclude_collection_ids: [-99]`). Narrow further if the user named a collection or filter above.
If everything is tagged, say so and stop.

**2. Rule out what is already here.** Build the known set from the repo:

```bash
rg --no-heading 'raindrop_id:|^url:' ideas resources goals
```

Match on `raindrop_id` first — it is the stable key. Fall back to comparing URLs normalized:
strip the scheme, `www.`, trailing slash, and query params (`?t=`, `?utm_*`, `?si=`). A bookmark
already in the repo is not a new capture — tag it `captured` and move on.

**3. Classify each remaining bookmark.** One of four calls:

| Call         | When                                                                        | Result                                     |
|--------------|-----------------------------------------------------------------------------|--------------------------------------------|
| **resource** | A concrete artifact worth consuming end to end                              | File in `resources/`, tagged `captured`    |
| **idea**     | It suggests something to learn or build, more than it is a thing to read    | File in `ideas/`, tagged `captured`        |
| **drop**     | Noise, a stray tab, or duplicated by something already `done`               | No file, tagged `captured`                 |
| **skip**     | Genuinely undecided — needs the user's judgement, not yours                 | No file, **not** tagged, returns next run  |

Be willing to drop. Most bookmark inboxes are half noise, and `resources/` is only worth querying
if every entry in it earned its place. Several bookmarks on one narrow subject are usually **one**
resource with the rest listed under `## Notes`, not one file each — prefer that when they are
clearly a single study cluster.

**4. Fill the entry properly.** Copy from `templates/`, then:

- `topics:` — map through `taxonomy/topics.yml`. The Raindrop collection is a **hint, not a topic**:
  `Kafka` suggests the `kafka` id, but `Great Courses` is a quality signal and maps to nothing.
  If a needed topic is missing, add it to the taxonomy in the same change (rule 3 in `CLAUDE.md`).
  The file's folder follows from the primary (first-listed) topic's area, per the layout rule in
  `CLAUDE.md`: `<entity>/<area>/<id>.md`, `general/` if `topics: []`, or `<area>/<topic>/` where
  that area is already split.
- `kind:` — from the bookmark `type` where it is set (`video`, `article`), corrected by the URL.
- `scale:`/`nature:` — the vocabularies in `CLAUDE.md`. These sharpen the call in step 3 rather than
  repeat it: a bookmark that reads `snack` + `trivia` is usually a **drop**, and one whose value is
  `perspective` — an argument being made, not knowledge being taught — is usually the **idea** call.
  A page's own reading-time estimate is a better source for `scale:` than a guess from the title.
- `source: raindrop` and `raindrop_id: <bookmark_id>` — a list, `[ id, id, id ]`, when several
  bookmarks were folded into one entry, so every one of them stays matchable on the next run.
- `goals:` — set it if the topics serve an `active` goal. Otherwise leave empty and let `/groom` catch it.
- `## Notes` — pull the bookmark's highlights with `find_highlights` and quote them here. This is
  the part worth doing carefully; a link without your highlights is just a URL you already had.
- `created:`/`updated:` — today's date, not the bookmark's. `## Why this one` gets one honest line.

**5. Show the plan before touching anything.** A table of bookmark → call → target file → topics.
Get approval. Do not write files or tag anything before that.

**6. Apply, in this order.** Write the file **first**, then tag with
`update_bookmarks` → `tags: {add: ["captured"]}`. Never the reverse: if a write fails, the bookmark
must stay untriaged rather than be marked done with nothing to show for it. `add` is additive and
leaves the user's own tags alone. Never call `delete_bookmarks`, never change a bookmark's
collection, title or link — this command's only write to Raindrop is that one tag.

**7. Rebuild.** `node scripts/dashboard.mjs`, then report what was promoted, what was dropped and
why, and what was skipped for the user to decide on.

`captured` means "has been through triage", so it covers dropped bookmarks too. To see which
captured bookmarks actually became files, cross-reference their ids against `raindrop_id:` in the
repo — nothing extra needs to be recorded in Raindrop to answer that.
