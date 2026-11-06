# dAI medium/lower-priority refinement

## Returning learners

The hero shows Resume learning only when existing normalizers find saved meaningful work: a valid daily session, an accepted plan, a tutor/exam activity, or material-library documents. It navigates to that work; it never starts a new session or sends a saved draft. Empty or unreadable records do not create a resume promise. Existing records and local storage keys are preserved.

## Page density

Open work shows the latest activity, with additional links and help on demand. The review-notebook card is a compact overview with detailed feedback collapsed. Weekly counts stay visible while recent activity expands on demand. Notebook capture collapses when entries exist; saved attempts are in a separate disclosure. Existing practice handoffs open the saved-work disclosure so the target remains reachable.

## Status and type

Saved-check labels share StudyFeedbackStatus in the learning dashboard and main checkpoint result. Uncertain, practice, helped and independent outcomes have explicit text and distinct styling. Explanations separate uncertain feedback from an established error, clarify AI review/substitution checking and retain self-reported-help and no-mastery limitations. No new scores or outcome inference were added.

Dynamic lesson/question titles wrap on narrow screens and use smaller heading sizes than section headings. The session action layout remains below its concise focus summary instead of an unbalanced two-column layout.

## Labels

Planner help, notebook input labels, note-editing labels and the Save entry action use consistent wording. Generated tutor prompts retain the learner's first-person voice. Review timing, AI calls and storage behavior are unchanged.

## Validation

- 22 browser executions passed on desktop/mobile: prior session, planner, navigation and export flows, plus conditional resume, all four feedback states, weekly disclosure, notebook capture, and practice handoff visibility.
- 228 study unit tests passed.
- Production build passed.
- Lint: zero errors; five existing warnings.
- Populated desktop/mobile screenshots reviewed; no paid service or dependency added.
