# dAI high-priority follow-up

## Session starter

The suggested lesson and short reason stay above the duration selector and Start action. Feedback, evidence, progress and alternative plan actions move below those controls into disclosures. Existing session records, targets, exports and no-auto-send behavior are unchanged.

## Accepted plans

Accepted plans render AcceptedStudyPlan instead of the creation wizard. The current lesson opens by default; other lessons are collapsed. Current focus respects a valid saved plan choice and otherwise uses the first lesson not marked complete. Overview and adjustment evidence remain available in a disclosure. Edit, goal/pace changes, material handoffs, individual lesson starts, completion marks and existing safe-save behavior remain available. The original plan data is not rewritten by the presentation.

## Mobile tutor modes

A labeled native Learning approach selector replaces the offscreen mobile tab strip. It exposes all five existing approaches and calls the same changeLearning handler. Desktop retains the buttons. Changing approaches does not send a message.

## Individual-study proposals

The server already rejected several classroom activity patterns for new proposals. The quality gate now also inspects objectives and checkpoints, including class debriefs, classmates, breakout groups and group presentations. The planner prompt asks for direct imperative instructions for one learner. Legacy plan validation stays separate so existing saved wording remains readable and editable. This deterministic gate catches specified patterns; it is not a guarantee of all model output quality. No live inference was used for validation.

## Verification

- Production build passed.
- 228 study unit tests passed, including proposal rejection and legacy-plan compatibility.
- 16 desktop/mobile browser executions passed, including populated accepted plans, editing, checkbox state, legacy wording, compact session layout, mobile approach persistence, backups and no automatic API POST.
- Lint: zero errors, five pre-existing warnings.
- Reviewed populated-plan, mobile session and mobile tutor screenshots.

No storage migration, paid dependency, new service or automatic model call was added.
