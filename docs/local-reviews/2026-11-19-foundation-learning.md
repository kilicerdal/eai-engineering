# Foundation learning improvements — local review

Local only. No deployment, Git push, remote database change or account settings change.

## Implemented

1. **Editorial quality improvements for AWS Cloud Practitioner and ISTQB Foundation.** Eight core items receive clearer wording, closer alternatives or more precise explanations in `quality-v11`. Changes include excluding Spot reclamation in the short-experiment purchasing question, qualifying EBS Multi-Attach, distinguishing cloud benefits, removing an unnecessarily restrictive regression distractor, improving a defect-report question, and disambiguating inspection from other reviews. The review-role section label is corrected. ISTQB questions now link to checked syllabus page destinations; explicit tool-adoption enrichment retains its existing reference.
2. **Optional small lessons after mistakes.** Fifteen authored concepts have a short rule and example. Only explicitly mapped questions show a lesson. One related comparison excludes every question in the active session, uses the same authored concept and prefers unseen items. Its answers are page-local and unscored; it never replaces a saved session.
3. **One useful return suggestion.** When no session is active, a retained mistaken concept can offer a small review and one related saved practice question. Future-dated attempts are ignored. Later correct evidence on that concept suppresses the old mistaken suggestion. The former welcome prompt is suppressed only while this replacement is visible; other study tools remain available.
4. **Connections to existing engineering work.** Relevant optional links lead to recorded checkout/claim evidence, boundary design, permission boundaries, recovery or route models. Labels distinguish recorded synthetic evidence and authored local models from live AWS execution. No infrastructure is launched.
5. **A real learner walkthrough.** The existing three-task recorder now includes an actual certification practice journey and optional hesitation notes in its download. Data stays in memory and is not uploaded. Actual owner/visitor feedback has not been supplied or fabricated.

## Scope and sources

The two foundation paths contain 200 core questions. This is a targeted editorial improvement and source-navigation pass, not independent expert validation of all 200 answers. No official sample questions were copied; no claim of accreditation or official-exam equivalence is added. The other ten paths are retained.

Official sources opened on 2026-11-19:

- [AWS CLF-C02 guide](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html), including all four domain pages.
- [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html).
- [EC2 On-Demand](https://aws.amazon.com/ec2/pricing/on-demand/) and [Spot constraints](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html).
- [EFS](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html) and [EBS Multi-Attach limitations](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html).
- [SQS at-least-once delivery](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html).
- [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html).
- [ISTQB CTFL overview](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/) and [v4.0.1 syllabus](https://istqb.org/?download_id=3345&sdm_process_download=1). Page destinations were checked against the contents and applicable section text, especially confirmation/regression, review roles, inspection, boundaries, coverage, reporting and defect management.

## Preservation

`quality-v10` and older editions remain selectable and immutable. Saved sessions keep their original content revision; no automatic rewrite or regrading occurs. The new revision is used for newly started sessions. Select-two/extra-v1 editions are unchanged; the displayed current reference link is separate. Storage keys and schema are unchanged. Notes, notebooks, attempts, shelves and backgrounds are retained.

Inventory: 12 paths, 1,090 questions, 200 books, 1,000 discoveries.

## Validation

- 996 unit tests passed, including pinned historical editions, backup parsing and new recommendation/session-preservation checks.
- 114 browser checks passed across the broader suite and the corrected selector rerun. One existing selector had to target the specific help drawer after a second optional drawer was added; its rerun passed.
- TypeScript passed. ESLint: zero errors; one existing `StudyAccount.tsx` navigation warning.
- Production build and asset budgets passed. Question structural audit: 1,090 checked, zero issues. Inventory audit passed.
- Desktop and phone screenshots visually inspected. Optional lesson radio groups checked for WCAG A/AA issues with axe; zero reported violations within that reviewed component. This is not a whole-site accessibility certification.
- Private content was not transmitted to an AI provider during checks. Browser tests use isolated synthetic saves.

Local preview: http://127.0.0.1:3038/study/certifications/cloud-practitioner
Owner walkthrough: http://127.0.0.1:3038/guide/experience-review

Remaining human step: try the walkthrough and supply actual observations. No publication performed.
