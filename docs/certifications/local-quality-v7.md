# Practice quality and calm review — local preview

Completed locally November 15, 2026. Not published.

## Experience

The same two practice entry buttons remain. Sessions favor unseen questions across topics, mix Understand/Apply/Investigate tasks without adding a setting, and explain familiar-question inclusion. Related caselets remain separated where possible.

A Review later checkbox saves alongside the session without affecting the answer. Before submission, the interface counts unanswered and marked questions and offers direct return buttons. Timed expiry remains automatic. Results support one-at-a-time review with previous/next navigation, an up-to-three-question recovery round, exact retries, and Finish here/Reopen results. A progress comparison appears only with at least three repeated questions in the same content edition and explicitly explains the effect of familiarity; it makes no exam-readiness prediction.

Feedback highlights the deciding detail, offers a concise two-choice contrast and an authored simpler explanation, and allows Remember this in the existing notebook. Saved takeaways retain their text, source, edition and date. They do not overwrite personal reflections or convert correct answers into mistakes. Existing comparisons, diagrams, sources, concerns, tutor and teach-back remain available. Ten selected questions have optional worked evidence (workflow, trace, counts, boundaries or recovery data), without additional execution or AI calls. Hit areas, keyboard focus, code wrapping and reduced-motion behavior were improved.

## Whole-bank quality pass

All 500 questions were included in structural, identity, domain/source-owner and editorial revision checks. The report is `quality-v7-report.json`: 27 stronger alternative sets, 312 revised explanation sets, and 285 shorter stems. Other original questions retain their content where this pass did not require a change. Official references were checked, including targeted inspection of the AIF agent/MCP and managed-foundation-model scope, AWS security/compliance scope and GitHub Actions guide. The 44-document source check found no missing documents or section anchors. These checks and editorial revisions are not independent expert accreditation or proof of exhaustive exam coverage.

Original records are immutable. New sessions carry `contentRevision: quality-v7`; attempts inherit it. Sessions without that field resolve to the original question edition. Correct option identity is unchanged in every revised question, and the tutor receives the edition used by the attempt. Unknown editions are rejected while stored bytes remain protected. Revision details are visible in feedback. All ten paths still have 50 questions each, and no original record was removed.

## Saves and checks

Existing storage keys and versions remain. Optional bounded flags and Remember this notes extend the existing coaching record, automatically included with its raw recovery copy in the combined download. All old note, draft, session, challenge, plan and notebook records remain supported. No existing background assets changed.

620 full-suite tests passed. After the final plain-language refinement, 69 certification tests and targeted lint passed, and the production build passed. The unrelated preexisting StudyAccount lint warning remains. Browser QA checked a new session, flag and answer recovery after reload, submission counts, one-at-a-time review, saved takeaway visibility in the notebook, the combined export, and mobile fit. API behavior was validated with mocked requests; no live learner text was sent to AI for testing.

The read-only `npm run audit:certification-quality` command is included in the repository quality workflow. It reports source-owner mapping, content shape, answer identity, weak-alternative markers and edition hashes. Source document availability/fingerprint checks remain a separate maintenance workflow. Both require human interpretation and never rewrite content or learner records automatically.

Local preview: http://127.0.0.1:3024/study/certifications/developer-associate
