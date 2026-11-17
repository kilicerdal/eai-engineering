# Practice learning improvements — local preview

Preview: http://127.0.0.1:3024/study/certifications/developer-associate

Eight improvements:
1. Optional saved second-choice note before checking/submitting; comparison after feedback, including explicit handling when both choices are wrong.
2. Three-step authored worked review using the saved question edition: requirement, mismatch, fitting answer.
3. Focused review includes correct answers marked Unsure or Guessing, without changing their grade. Missing confidence does not imply uncertainty.
4. Up to five different questions in the selected domain or review domains. Uses existing bank and favors different caselets; exact previous-session questions excluded. No automatic start or timer.
5. First recorded encounters and retry counts shown separately, based on retained same-edition history; retention limits disclosed. No old grade rewritten.
6. One contextual takeaway and a single official-section next action in the stopping panel; results remain reopenable.
7. Twenty additional scenario illustrations across all ten paths, restating supplied conditions. Existing code examples and illustrations remain. No canonical question or answer edits.
8. Quiet initial results: score, one takeaway, Review. Comparisons, exact retry, three-question recovery, plan, official-section and full-answer review stay available under More options.

Compatibility: new narrowed-choice data is an optional bounded field in coaching storage and included in combined backups. Existing local save keys, original/revised question editions, corruption/conflict protection, notes, flags, eliminations and backgrounds are retained. No data migration or new AI request.

Validation: 633 tests passed; TypeScript passed; lint has only the pre-existing StudyAccount navigation warning; production build passed. Browser QA: saved second choice survives reload, no test feedback before submission, pair and worked explanations shown after submission, correct-but-guessed answer included in focused review with its correct result unchanged, first/retry counts available, stopping/reopen flow works, five-question follow-up stays in the selected focus, 390px layout has no horizontal overflow. Existing synthetic preview saves were retained, with additional synthetic verification attempts.

Not committed or published. Screenshot: /private/tmp/certification-practice-v9-results.png
