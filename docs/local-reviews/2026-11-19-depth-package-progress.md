# Local depth package: progress and verification

This package is in progress. It is not a completed 30-item release and has not been published.

## Implemented in this continuation

- 200 distinct editorial starting questions, one per catalog book. Original book texts are untouched.
- 30 specific comparative book pairings (60 books); other books retain the existing author/genre/mood fallback. These are editorial invitations, not claims of historical influence.
- New core practice sets keep four disjoint 25-question forms and the existing topic/activity quotas while reducing repeated shared cases within a form. Existing saved question lists are not rewritten. A few shared cases can still recur when balanced quotas constrain assignment.
- Eight fixed live Tutor evaluation scenarios prepared, with arithmetic answers and human-review criteria. **Live responses remain pending at the owner's request.** No API requests or credits were used.
- Public reference snapshots collected for 65 source documents linked by the 1,090 questions. All downloaded successfully at collection time. Five official PDFs have local extracted text for editorial review. Download success does not establish question accuracy, source relevance, or completed editorial verification.

## Checks

- 1,010 unit tests pass.
- TypeScript check passes.
- ESLint: zero errors; one pre-existing internal-navigation warning in StudyAccount.tsx.
- Inventory: 12 certification paths, 1,090 questions, 200 books, 1,000 discoveries; no inventory issues.
- Diff whitespace check passes.
- Production build and browser verification recorded separately in tmp/depth30-*.log.

## Still open

The remaining question-by-question editorial pass, stronger scenario choices, additional discovery bridges/variety, chapter/context audit, main-site/mobile/recovery review, and final full-package verification have not been completed by these changes. Do not describe this progress record as completion of all 30 accepted items. Live Tutor response quality is a separately accepted pending test.
