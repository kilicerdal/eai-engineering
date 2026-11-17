# Local reasoning and recovery review — 2026-11-16

Ten accepted improvements are implemented locally. Nothing has been committed, pushed or published by this batch.

1. Optional Why I kept this notes on saved discovery cards, saved explorations and Your Space items (including reading notes/bookmarks).
2. Learner-selected source / model / inference / unknown support assessment, with limitations and no claim of automated verification.
3. Explicit immutable question snapshots, linked to their previous version; draft edits preserve all kept versions.
4. Counter-evidence and smallest-check writing tool.
5. Short authored retry-evidence decision exercise with bounded feedback.
6. Two defensible queue/job-table designs compared by constraints.
7. Editable handover using visible selected context and fields, exact export preview invalidated by edits.
8. Optional decorative entrance/hover motion reduction. Model playback and backgrounds retained.
9. Tutor request lifecycle metadata and safe draft recovery. Interrupted/unknown is not called complete; no automatic resend. Failed/stopped requests restore the submitted draft only if no new composer writing exists. Late completion cannot settle a newer request ID.
10. /guide/release-review links earlier local changes, check evidence, limits and three small review tasks. No deploy control.

New writing uses eai-reasoning-notebook-v1 with strict bounds, compare-before-write protection, explicit failure states, backup and previewed non-destructive merge. Request metadata uses eai-tutor-request-state-v1 separately from sessions. Existing room stores are not migrated or replaced. Comfort schema accepts older records without the new optional preference.

Verification: 713 tests passed; typecheck passed; lint zero errors with the existing StudyAccount internal-navigation warning; production build passed. Build retains 200 books / 400 packed files / 90,791,154 packed bytes. Final build log: /private/tmp/reasoning-build-last.log.

Browser review: question snapshots survived reload; edited handover removed stale export preview; support assessment and counter-check snapshots saved; bounded scenario feedback and tradeoff alternatives rendered; 390×480 viewport had no horizontal overflow; motion preference changed the document attribute and was reset to the previous unchecked setting. No browser errors observed. Fictional QA writing is confined to the release-review example reference.

Limits: live AI/provider requests deliberately not made in credential-free local preview. Real physical keyboard and production provider failure behavior remain untested. Earlier 42-link audit is not verification of all discovery content. Existing saved work should be reviewed by its owner before any separately authorized release.
