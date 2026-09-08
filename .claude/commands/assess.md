---
description: Score an idea, resource or goal against the rubric and append a dated assessment
argument-hint: <entity id, or a topic to assess everything under it>
---

Assess: $ARGUMENTS

1. Read `taxonomy/rubrics.md` and use its dimensions exactly. Do not invent or reweight dimensions.
2. Read every goal with `status: active` - assessment is relative to what is being aimed at now. If
   no goal is active, say so and assess against the gaps in `areas/` instead.
3. Read `taxonomy/stack.yml`. Say for each target whether its topics are on-stack. When no active
   goal covers it, Goal fit is scored against the stack per `taxonomy/rubrics.md` - on-stack caps
   at 3, off-stack at 1.
4. For each target entity, score every dimension 1-5 with a one-line justification per score. A
   score without a reason is noise.
5. Give the verdict from the rubric: `do-now` / `queue` / `reference` / `skip` for resources,
   `accept` / `keep` / `drop` for ideas, the five well-formedness checks for goals.
6. Append to the entity file under `## Assessments`, never overwriting an earlier one, in the form:

       ### Assessment 2026-09-07
       Goal fit 4/5 - directly serves [[goal-id]]
       Source quality 5/5 - ...
       **Verdict: queue** - blocked until X

Be willing to say `skip` and `drop`, with the reason recorded so it is not re-litigated in six
months. A list that only grows is a liability. Where a resource is redundant with one already
`done`, say which one and why the overlap is not worth paying for twice.
