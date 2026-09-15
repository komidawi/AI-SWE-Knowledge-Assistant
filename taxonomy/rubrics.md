# Assessment rubrics

Fixed dimensions keep assessments comparable over time — never invent new ones. Each assessment is
a dated block in the entity's file, **relative to `active` goals** and `taxonomy/stack.yml`
(neither → `skip`). When goals change, old assessments go stale, not wrong: re-assess, don't edit.

## Resource rubric

Score each dimension 1–5.

| Dimension            | 1                                                | 5                                                               |
|----------------------|--------------------------------------------------|-----------------------------------------------------------------|
| **Goal fit**         | Unrelated to any active goal                     | Directly unblocks a milestone of an active goal                 |
| **Source quality**   | Anonymous blog post, no depth, likely wrong      | Primary source or recognised authority; still cited years later |
| **Effort vs payoff** | `multi-day` for a marginal skill                 | `deep-dive` or smaller for something used weekly                |
| **Prerequisite fit** | Needs foundations not yet held → will bounce off | Sits exactly at the edge of current ability                     |
| **Decay risk**       | Framework-version-specific, stale in 12 months   | Concepts that outlive the tools (protocols, tradeoffs, theory)  |

**Goal fit with no covering `active` goal:** score against `taxonomy/stack.yml` — on-stack caps
at 3, off-stack at 1.

**Verdict** — one of:
- `do-now` — schedule it into the current month's plan
- `queue` — good, but blocked by prerequisites or capacity; say what unblocks it
- `reference` — do not read start-to-finish; keep for lookup
- `skip` — say why, so it is not re-litigated in six months

A high total with poor prerequisite fit is still `queue`, never `do-now`. Sequencing beats enthusiasm.

`nature:` gates the verdict before the scores are weighed:

- `trivia` is never `do-now` — read in the gaps or not at all.
- `lookup` is always `reference`.
- `perspective` is judged on whether it changes a decision. A convincing one also belongs in `ideas/`.

## Idea rubric

| Dimension               | Question                                                              |
|-------------------------|-----------------------------------------------------------------------|
| **Leverage**            | How much other work gets easier once this is held?                    |
| **Durability**          | Still valuable in five years?                                         |
| **Evidence of need**    | Has this actually blocked something real, or does it just sound good? |
| **Cost to first value** | Hours until it produces something usable, not until mastery           |
| **Overlap**             | Does an existing skill in `areas/` already cover 80% of this?         |

**Verdict**: `accept` (promote to a goal or schedule), `keep` (stays `considering`), `drop` (with
a reason). Drop freely — an idea list that only grows is a liability.

## Goal rubric

Well-formed only if all five hold. Flag every failure:

1. **Outcome, not activity.** "Ship a deployed fullstack app" beats "study React".
2. **Falsifiable success criteria.** Someone else could rule on whether it was met.
3. **Dated horizon.** A target date exists.
4. **Milestones with dates**, each independently checkable.
5. **Capacity-checked.** Estimated hours fit real available weeks, minus holidays and crunch.

#5 is the usual failure: state hours needed vs available, propose what to cut.

## Self-assessment levels (`areas/*.md`)

| Level | Meaning                                                      |
|-------|--------------------------------------------------------------|
| 1     | Aware — can follow a conversation about it                   |
| 2     | Assisted — can use it with docs and close reference          |
| 3     | Independent — can build and ship with it unaided             |
| 4     | Fluent — can debug the hard cases and make design tradeoffs  |
| 5     | Authoritative — others come here for decisions; can teach it |

A level needs **evidence** — shipped, debugged or taught. No evidence → level 2 at most, however
much was read.
