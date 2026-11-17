# Engineering Certification Studio release candidate — November 17, 2026

## Result

Twelve certification paths and 1,090 original practice questions, including AWS Solutions Architect Professional (SAP-C02) and ISTQB Advanced Agile Tester (CTAL-AT v2.0). New question wording is editioned; earlier attempts retain their original content and grades.

Accumulated improvements include focused practice, review filters, optional answer comparisons and glossary help, source-linked explanations, smaller starting checks, bookmarks and uncertainty flags, backup inspection/recovery safeguards, simple topic progress and concrete next study steps. Optional tools remain collapsed.

## Preservation

Original 1,000-question bank fingerprint: e8f9161cc4bf4ad41736233625e92d18d2b0c530dcbcce8fb5a43af042b7e4e9.
The existing 40 supplemental questions and 50 new-path questions bring the total to 1,090. Existing storage keys and older editions are retained. No content clearing, migration that replaces learner records, server database changes, book changes or background changes are included.

The build retains all 200 books / 400 packed files. Packed books: 90,791,154 bytes. Reading delivery trace: 92,605,158 bytes. These are local build sizes, not provider account-wide storage totals.

## Validation

- 846 automated tests passed; TypeScript and production build passed.
- Lint: zero errors; one pre-existing StudyAccount navigation warning.
- Structural, historical-edition, calculation, supplemental-set and balance audits passed. Recorded editorial queues have no unresolved blocking signal.
- 44 existing official prep documents: reachable, section checks pass, recorded fingerprints unchanged.
- 23 distinct source/guide URLs for the two new paths: HTTP 200. Current SAP-C02 guide and CTAL-AT v2.0 syllabus inspected. Availability checks are not independent validation of every question.
- Browser checks preserve the earlier paused Cloud Practitioner question 2/5, Agile v1 3/3 result and notebook marker. Review filters, edition-aware explanations, glossary and 200-book Reading Room checked locally.
- No private notes, personal backups or credentials are included in source control.

## Human review status

The owner reported “Looks good, check completed” after the local preview and explanation of outstanding human checks, following the instruction to publish the accumulated improvements. Owner walkthrough is recorded complete. Independent subject-matter review has not been received and remains an outstanding follow-up. The strict release-readiness script continues to show independent review pending; it has not been weakened or falsely marked passed. Publication follows the owner’s release decision, with that review gap disclosed.

## Deployment and rollback

The existing GitHub main-to-Vercel integration publishes the release. Previous production source: 0ee6d02fdee4ecfc37fb107c8227c0f9db531d78. Retain the previous production deployment for rollback. A rollback changes delivered code only; never clear browser saves or replace stored learner work. Verify current-edition compatibility before rolling back new-path UI support.

After publication: verify deployment status and live home, Learning Studio, certification catalog, all twelve paths, new-path review controls, Reading Room and a book asset. No retention setting changes or old-deployment deletion are part of this release.
