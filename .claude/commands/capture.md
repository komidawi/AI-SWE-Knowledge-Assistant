---
description: Capture an idea, resource or goal into the right folder with valid frontmatter
argument-hint: <url, title, or a sentence describing the thing>
---

Capture this into the knowledge base: $ARGUMENTS

1. Decide the entity type: resource (a concrete artifact to consume), idea (something to learn or
   build), or goal (an outcome with a horizon). If it is genuinely ambiguous, ask once.
2. If a URL was given, fetch it to get the real title, author and scope. Do not guess metadata that
   the page states.
3. Check `ideas/`, `resources/` and `goals/` for an existing entry on the same thing. If one exists,
   update it rather than creating a near-duplicate, and say that is what you did.
4. Copy the matching file from `templates/` and fill every field. For a resource, `scale:` follows
   from the effort estimate and `nature:` from what the thing actually is — both vocabularies are in
   `CLAUDE.md`. Two words, not an interrogation; a wrong `scale:` shows up in the next dashboard.
5. Map topics to ids in `taxonomy/topics.yml`. If a needed topic is missing, add it to the taxonomy
   in the same change, under the right area, with the aliases someone would actually type. Place the
   file at `<entity>/<area>/<id>.md`, where `<area>` is the taxonomy area of the primary (first-
   listed) topic — `general/` if `topics: []`. If that area folder already has a topic-level split
   (see `CLAUDE.md`), file it under `<entity>/<area>/<topic>/<id>.md` instead.
6. Link it: set `goals:` if it serves an active goal, and add a `[[link]]` from any related entry.
7. Set `priority:` from the two axes: serves an active goal, or is on-stack per `taxonomy/stack.yml`.
   Neither - it is `low`, and say so in one line rather than filing it silently.
8. Print the path and the frontmatter you wrote.

Capture is meant to be cheap. Do not interrogate. Fill in what is knowable, leave optional fields
empty, and let triage happen later in `/groom`.
