# Learning workspace refinement release

Owner authorized publishing the completed local packages to main on November 22, 2026. Base: 2f1d8381. This release includes the four approved packages (45 Writing/Materials outcomes, 25 follow-up refinements, 40 Exam outcomes and 40 Reading/Curiosity outcomes). These are 150 requested refinements, not 150 separate new services or independently validated learning gains.

## Resulting behavior

Writing supports passage-scoped, snapshot-bound reviews, multiple local drafts and checkpoints, paragraph comparisons, explicit feedback decisions and focused editing. Material import supports inspection before commit, extraction/column/table warnings, reversible cleaning, cancellable/retryable extraction, local original-PDF comparison and precise evidence context.

Exam practice adds accessible math/plain text, authored worked studies and diagrams, exact passage evidence, optional ungraded reasoning exercises, per-question scratch/reflections, reversible cross-outs, flags, non-linear question navigation and a debrief. Opening solutions before checking counts as help; historical authored question IDs, wording and keys are retained.

Reading adds source-aware inline/endnote reading with return paths, clearer marked dialogue/letters, scoped exact/whole-word/typographic search, context expansions and literal occurrence counts. Notebook follow-ups, cross-book connections, personal terms, question resolution and quotation adaptations remain distinct from original source text. Optional metadata is validated and preserved through local backups and conflict-aware merges. Reading notes remain outside the existing cloud upload allowlist.

Curiosity gains optional sourced numerical/uncertainty explanations on eight appropriate existing discoveries. This is not a fresh scientific review of every discovery. Existing packed books, discovery records, art assets and graded editions are preserved.

## Local release evidence

- 1,170 unit tests pass.
- Production build, TypeScript, packed-reading audit and bounded asset checks pass.
- ESLint: no errors; the existing StudyAccount navigation warning remains.
- New Exam suite: 10 desktop/mobile scenarios pass. New Reading/Curiosity suite: 12 pass; final affected existing reading/notebook suite: 26 pass.
- Writing/Materials and study-layout regressions, including the prior 45/25 packages, passed during implementation. Wider Reading integration run exercised 176 scenarios; 173 initially passed and three failures due to fixed-port/mobile-menu test assumptions were corrected without weakening their assertions; all affected viewport rechecks passed.
- Desktop and phone layouts were visually reviewed. Implementation maps and specific limits are in docs/local-reviews/2026-11-22-writing-materials45.md, 2026-11-22-writing-materials25.md, 2026-11-22-exam40.md and 2026-11-22-reading-curiosity40.md.
- Final required structural certification release audits are run before push. They do not constitute independent factual/psychometric sign-off.

## Limits retained

The verified Hugh Thomson frontispiece has a caption/source/reuse link and an explicit optional external-load control. Wikimedia rate-limited download (HTTP 429); no local reproduction was added and external delivery is not guaranteed. The unavailable-image fallback was checked.

Live Tutor response-quality tests remain pending credentials under the owner's earlier instruction. Native assistive-technology review, locally blocked Firefox verification and the outstanding substantive certification editorial queue are not represented as completed by these UI or structural checks. No new paid provider, automatic model request or data migration is introduced.

Main push, Vercel deployment status and public route checks are verified after publication. A Git push alone is not evidence of a successful deployment.
