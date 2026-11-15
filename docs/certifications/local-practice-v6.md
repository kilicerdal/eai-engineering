# Practice Test refresh — local review

Completed locally November 15, 2026. Not published.

## Simple experience

- Quick practice starts five untimed questions with feedback after each checked answer.
- Practice test starts ten untimed questions, withholding feedback until submission. Choices remain editable until submission.
- More options retains topic selection, both learning styles at either length, the starting assessment, and all previous timed/longer sessions.
- Results separate correct, incorrect and unanswered counts. Review my mistakes opens missed feedback; all answers remain accessible.
- Practice what I missed uses different question IDs from missed domains, balancing topics and preferring different caselets. Exact retries remain available. Existing active sessions cannot be replaced.
- Explanations lead with one deciding clue. Detailed tools, comparisons, teach-back and resources remain accessible without dominating the screen.
- A three-point optional refresher adapts to the selected topic.
- Practice, Learn and Official prep are primary navigation. Plans, challenges and notebooks remain under More study tools.

## Expanded bank

500 original sourced questions: exactly 50 in each of ten paths. All original 215 complete question records are byte-for-byte equivalent after serialization; no original IDs, choices, answers, explanations, dates or sources changed. There are 285 added exercises drawn from 103 original caselets, covering decisions, verification evidence and interpretation of a demonstrated gap. Related exercises are not independent incidents. The selector avoids siblings within a test where possible and prefers unseen questions. A focused domain can contain fewer than ten questions; the UI says “up to” and displays the actual count.

The added records are frozen in `src/lib/certification-practice-questions.ts`. Preserve their IDs, option order and answer identity. The authoring caselets are retained separately in `docs/certifications/authoring/caselets-v6.ts.txt`; they are not bundled into the app. Do not regenerate existing question options during future expansions. Append new IDs instead.

Every new question links to its official domain guide or syllabus and has a rationale for each option. These are independent learning exercises, not copied official questions, an official exam simulation or exhaustive syllabus coverage.

## Preservation and verification

All existing study, learning, challenge and coaching storage keys and schemas are retained. Test-myself reuses the existing deferred-feedback assessment mode; exact question lists save in the same session record. No migrations, deletes, background changes, automatic AI requests or external publication were performed. The tutor request now includes canonical selected/authored answer context without redundantly including every distractor, keeping maximal normal reasoning plus an explicitly selected note within the existing request guard.

614 full-suite tests passed. After freezing records and final label/selection refinements, all 63 certification tests, targeted lint, typecheck and production build passed. The unrelated existing StudyAccount lint warning remains. The source audit checked 44 documents and section anchors with zero issues. Browser QA verified saved test answer recovery, deferred test feedback, immediate quick feedback, mistake counts and filtering, targeted follow-up, optional refreshers and retained controls. Mobile layout at 390px has no horizontal overflow. Local synthetic QA work was retained; no existing saved work was cleared.

Local: http://127.0.0.1:3024/study/certifications/developer-associate
