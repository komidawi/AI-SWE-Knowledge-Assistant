# Assessment rubrics

The point of a fixed rubric is comparability: a resource scored in March and one scored in November
must be judgeable against each other. Do not invent dimensions per assessment.

Every assessment is written into the entity's own file as a dated block and is **relative to the
goals that are `active` right now**. When the active goals change, old assessments become stale
rather than wrong — re-assess instead of editing history.

## Resource rubric

Score each dimension 1–5.

| Dimension | 1 | 5 |
|---|---|---|
| **Goal fit** | Unrelated to any active goal | Directly unblocks a milestone of an active goal |
| **Source quality** | Anonymous blog post, no depth, likely wrong | Primary source or recognised authority; still cited years later |
| **Effort vs payoff** | 40h for a marginal skill | Hours for something used weekly |
| **Prerequisite fit** | Needs foundations not yet held → will bounce off | Sits exactly at the edge of current ability |
| **Decay risk** | Framework-version-specific, stale in 12 months | Concepts that outlive the tools (protocols, tradeoffs, theory) |

**Verdict** — one of:
- `do-now` — schedule it into the current month's plan
- `queue` — good, but blocked by prerequisites or capacity; say what unblocks it
- `reference` — do not read start-to-finish; keep for lookup
- `skip` — say why, so it is not re-litigated in six months

A high total with poor prerequisite fit is still `queue`, never `do-now`. Sequencing beats enthusiasm.

## Idea rubric

| Dimension | Question |
|---|---|
| **Leverage** | How much other work gets easier once this is held? |
| **Durability** | Still valuable in five years? |
| **Evidence of need** | Has this actually blocked something real, or does it just sound good? |
| **Cost to first value** | Hours until it produces something usable, not until mastery |
| **Overlap** | Does an existing skill in `areas/` already cover 80% of this? |

**Verdict**: `accept` (promote to a goal or schedule it), `keep` (leave in `considering`),
`drop` (with a reason). Be willing to say `drop` — an idea list that only grows is a liability.

## Goal rubric

A goal is well-formed only if all five hold. Flag every failure explicitly:

1. **Outcome, not activity.** "Ship a deployed fullstack app" beats "study React".
2. **Falsifiable success criteria.** Someone else could rule on whether it was met.
3. **Dated horizon.** A target date exists.
4. **Milestones with dates**, each independently checkable.
5. **Capacity-checked.** Estimated hours fit the weekly hours actually available — count real weeks,
   subtract holidays and known crunch periods.

Goals failing #5 are the normal failure mode. Say plainly how many hours the plan needs versus how
many exist, and propose what to cut.

## Self-assessment levels (`areas/*.md`)

| Level | Meaning |
|---|---|
| 1 | Aware — can follow a conversation about it |
| 2 | Assisted — can use it with docs and close reference |
| 3 | Independent — can build and ship with it unaided |
| 4 | Fluent — can debug the hard cases and make design tradeoffs |
| 5 | Authoritative — others come here for decisions; can teach it |

Claim a level only with **evidence** — something shipped, debugged, or taught. No evidence means
level 2 at most, regardless of how much has been read.
