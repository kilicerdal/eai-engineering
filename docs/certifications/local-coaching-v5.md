# Certification Studio — calmer study, deeper practice

Local preview completed November 15, 2026. Not published.

## Eight improvements

1. Today’s study: a saved recall → official reading → up-to-three-scenario sequence. An existing active session always takes priority. A previous day’s unfinished sequence is retained, not reset. Reading is a learner-confirmed step, not inferred from an external link click.
2. Forty-two original applied questions across all domains in the seven smaller paths. Total: 215. The original 173 complete question records are unchanged. Each new question has four rationales, progressive authored hints, a source and an individual review date.
3. Side-by-side comparison of the authored answer with a selected alternative, with the deciding requirement.
4. Two progressive hints during practice/review. Timed and assessment sessions do not expose hints before submission.
5. Optional teach-back: a locally saved explanation with an authored self-check. AI feedback requires pressing a button and sends only the visible explanation plus canonical question context through the existing protected tutor route. No other notes, recall drafts or history are included. AI feedback does not change a grade.
6. Three changeable requirement variants for each of four challenge families. Recommendations and requested evidence change while the original saved challenge remains intact. These are authored counterfactuals, not executed infrastructure or tests.
7. A brief session close names the practiced focus, what needs another look, the exact section/question to resume and a suggested review date. It explicitly permits stopping.
8. Read-only maintenance tooling checks 44 official documents, section links, PDF fingerprints and HTML heading fingerprints. A weekly/manual GitHub workflow is prepared; it becomes available only after publication. Reports require human review and never rewrite answers, sources or learner records. Unchanged headings do not prove unchanged content. Learner-facing transition information is kept in Sources, scope and saved work.

## Preservation and storage

All ten paths, official prep resources and existing backgrounds remain. Existing study, learning and challenge keys/schemas are unchanged. Coaching is an additive `eai-certification-coaching-v1:<path>` record with bounded daily recall and per-question teach-back drafts. Corrupt, quota-blocked and concurrently changed saves retain original bytes and keep in-tab drafts exportable. Combined backups now include coaching plus its raw recovery copy; prior three datasets and individual exports remain available. Combined restore is not added.

## Validation

607 tests passed, typecheck and production build passed. Existing StudyAccount lint warning is unrelated. The 44-document baseline audit returned no missing documents or section anchors. Browser QA completed a three-question Today sequence, recovered recall/teach-back drafts after reload, checked progressive hints/comparison, opened the precise official section from session summary, changed the challenge requirement, and downloaded all four datasets. Mobile width was 390px with no horizontal overflow. AI request validation/privacy/guard behavior was verified through mocked route tests; no live AI call was made.

Local: http://127.0.0.1:3024/study/certifications/solutions-architect#learn

## Maintainer workflow

Run `npm run audit:certifications` for a read-only source report at `/tmp/eai-certification-source-audit.json`. Changed fingerprints, missing links or missing anchors fail the check and require inspection of the provider’s current revisions. HTML checks cover headings and known section IDs, not every sentence. Review affected learning objectives and question rationales manually before changing content. Preserve question IDs and choice/answer identity for saved attempts; substantive answer changes need an explicit compatibility plan. Update only the review dates actually checked. After resolving/reviewing changes, explicitly regenerate the baseline with `node scripts/audit-certification-sources.mjs --baseline` and review the diff. Never use a new baseline merely to hide a failed audit.
