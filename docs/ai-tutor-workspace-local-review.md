# AI Tutor — A Better Place to Think (local review)

Local-only implementation of the 18 approved improvements. No deployment, commit or push.

1. Dedicated `/study/tutor` room, linked from the existing embedded tutor. Shares session storage and opens the selected session; framework route query passed through a loading boundary.
2. Focus mode, 16–24px conversation text, comfortable/wide conversation. Escape exits; background siblings are inert while focused and restored on exit.
3. Three starter invitations prepare editable drafts and select the existing approach.
4. “I’m stuck” prepares a concrete demonstration request without restarting intake.
5. Quick/step-by-step/deeper explanation preferences sent through validated server profile; legacy sessions keep automatic concise behavior.
6. Small clue, stronger hint and one worked step prepare distinct drafts; no automatic AI calls.
7. Pinned problem or supplied passage beside the conversation; mobile conversation/source switch.
8. Session scratchpad saved locally, excluded from prompts. Explicit copy of up to 2,400 characters, with a truncation notice.
9. Mouse selection or accessible “Ask about a part” opens an editable exact-text selection; explanatory draft quotes at most 1,000 characters and treats earlier AI text as fallible.
10. Analogy, comparison table or simple text flow requests; no claim of generated images or executable diagrams.
11. Teach-back prompt waits for the learner before evaluating.
12. Fresh transfer problem prompt omits the answer and waits for an attempt.
13. AI recap request, editable draft, explicitly saved recap and learner’s next step. No invented scores.
14. Returning-session disclosure includes actual last learner question, saved recap and next step; starting fresh keeps earlier work.
15. Session search over titles/messages/recaps/next steps; pins (up to five through UI); existing rename/backup controls retained.
16. Source picker reads existing Materials without mutation; reads exact Reading Room paragraphs from the 200-book catalogue. Selected text and original location remain visible. Each submitted user message retains its own source provenance, including regeneration. Server bounds and labels supplied excerpts as untrusted, not independently verified citations.
17. Optional everyday/engineering/cooking/sport example preferences, without learning-style diagnoses.
18. Optional device read-aloud (local English voices only) with voice, pace, pause/resume/stop. Reuses the Reading Room component with tutor-specific wording. No autoplay.

## Preservation and limits

The original conversation storage key and backup format are unchanged. Optional workspace/profile/source fields are normalized and included in existing exports and optional account snapshots. Invalid stored additions reject the affected record so existing safe storage preserves the original copy; fields are never silently truncated during restore. Original reading assets, books, notes, bookmarks, and backgrounds are untouched. New styles are tutor-scoped. No dependency or hosting changes.

Sources are supplied excerpts, not a browsing feature or independent fact-check. Source-specific explanation requests ask for [S1] and exact short snippets, but generated statements still require review. Recaps are editable reflections rather than evidence of mastery. Audio depends on browser/device voices. Local checkout contains no configured AI service credentials; actual provider generation cannot be verified here. Real route request behavior is tested with a mocked upstream and existing auth/security boundaries remain in place.

## Validation

- 459 Node tests passed, including 11 new workspace and real-route checks.
- Lint: no errors; one pre-existing unrelated StudyAccount warning.
- Browser and production build validation recorded at completion below.

Final validation: all 459 tests, type checking and production build passed. Browser review covered 390px mobile (no horizontal overflow), desktop Focus mode and Escape, source-panel switching, a real Reading Room paragraph and original link, scratchpad preservation, recap and next-step restoration, session pins/search, explanation/example preferences, and draft-only hints. Found and repaired a Next Activity lifecycle race: cached routes now restore their latest session snapshot before the stale-write-protected writer runs, without replacing failed/unsaved work. Retested embedded/full-workspace navigation successfully in the production build. Final preview runs at http://127.0.0.1:3024/study/tutor with DAI_LOCAL_PREVIEW=1; no credentials were added and no production security checks were bypassed. Actual AI generation remains unverified locally.
