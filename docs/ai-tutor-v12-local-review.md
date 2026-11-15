# AI Tutor V1.2 — Understanding That Stays

Local-only implementation of all ten approved improvements. No commit, push or deployment.

1. A reply-level **Check my understanding** action opens the existing structured LessonCheckpoint workflow. It asks a fresh question only after an explicit click and retains the existing answer-first, feedback, hint/help and history behavior. Opening is scoped to the matching exchange, not carried into unrelated checks.
2. **Where I got lost** lets the learner select an exact explanation paragraph, inspect it, and prepare a request starting there. Earlier tutor text is explicitly fallible.
3. **Compare reasoning** places the original learner message beside the actual reply and prepares a first-gap review. It does not assume a question is an incorrect worked attempt or that the tutor's answer is authoritative.
4. **Takeaways** are editable notebook entries, with their original question, an exact tutor excerpt, source snapshot, identity and creation time. Drafts survive closing the editor. Saving is explicit and duplicate-safe; editing preserves provenance and clears only the previous self-reported review mark.
5. **Resume with a warm-up** prepares one unanswered recall request inside the returning-session disclosure. No automatic AI call, score or mastery claim.
6. **Remembered defaults** persist 16–24px text size, width, explanation depth and example preference across visits. New sessions inherit teaching defaults; existing sessions keep their own choices until explicitly applying defaults. Reset does not erase sessions or drafts. The new preferences key is included in optional account snapshots; the conversation and backup formats remain compatible.
7. **Conversation navigation** includes jump-to-question, latest reply and collapsible older exchanges. Long conversations initially show the latest eight messages; all original messages remain in storage and can be revealed.
8. **Source support** uses the source attached to that exact question, not a later pinned source. Quoted-phrase matching allows whitespace differences and is labelled a word check, not fact verification. An evidence-breakdown request distinguishes quotation, inference and unsupported claims.
9. **My tutor notebook** offers five compact entries per page, search, optional reveal-before-review, self-reported revisits and a separate recall session. Opening a review preserves the original session and all drafts. No streaks, grades or unsolicited reminders.
10. **Unhelpful reply?** prepares a targeted request for complexity, a missed question or a possible mistake. Nothing is submitted as an external report.

## Preservation and verification

- Existing sessions, drafts, scratchpads, recaps, sources, practice checks and account behavior retained. Takeaway fields are optional, bounded and strictly normalized; corrupt additions stop restoration rather than silently discarding work.
- No dependency changes, new backgrounds or asset replacements. Shared styles are tutor-scoped.
- All 475 Node tests pass, including 16 V1.2 tests covering legacy round trips, duplicate/capacity guards, edits and provenance, preferences/backup inclusion, source matching, bounded prompts and recall semantics.
- Type check and production build pass. Lint has no errors and one existing unrelated StudyAccount warning.
- Browser checks: remembered text/depth persisted across reload and new sessions; resetting defaults retained the current session's depth. Isolated sample-exchange checks exercised explanation selection, quote support, takeaway saving, editing and provenance.
- Complete Tutor integration was checked using temporary deterministic local responses on the separate localhost origin, without touching existing 127.0.0.1 sessions. Five sample exchanges verified collapsing/revealing older messages, question jumping, and opening the existing understanding check without making a provider request. A takeaway survived reload; opening recall created a new draft/session; editing returned to its original session.
- All temporary QA pages, endpoints and endpoint injection were removed before the final production build. No AI provider credentials were added and no production security checks were bypassed. Model generation for new prompts remains unverified locally because this checkout has no provider credentials.

Local preview: http://127.0.0.1:3024/study/tutor
Sample conversation for trying reply tools (clearly labelled sample replies, isolated browser storage): http://localhost:3024/study/tutor?session=42c3e2d5-bc5c-4dca-b63c-995bd0ee24cb

Final production preview verified on desktop and at 390px: no horizontal page overflow in the reply workbench. Restored the sample session through Recent sessions, including its saved takeaway/edit draft. Screenshot: /private/tmp/ai-tutor-v12-local.png. Production server remains running locally; no V1.2 changes were committed or published.
