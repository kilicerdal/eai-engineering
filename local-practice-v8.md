# Practice improvements — local review

Local preview: http://127.0.0.1:3024/study/certifications/developer-associate

Implemented eight improvements:
- Numbered question navigation with answered/unanswered and marked states, without revealing grading.
- Wrong-answer feedback explaining the difference between a useful idea and the supplied requirement.
- Optional saved choice-elimination marks. Selecting a crossed-out choice restores it; marks never affect grading.
- Up to three due-topic questions after the suggested gap, avoiding recent questions and preferring different caselets when possible.
- Question-specific requirement hints, available in learning modes and withheld in test modes.
- Optional changed-requirement exercise directly in answer review, independent of the original grade.
- Saved session summaries and comparisons restricted to matching length, topic/task mix, mode, timer budget and question edition. Short rounds are not compared. Questions may still differ in difficulty; this is disclosed.
- Local editorial signal export and an offline explicit-backup review script. Alternative counts are separated by edition. No written learner content is exported in the signal summary and nothing is transmitted. Counts do not establish that a question is wrong; answers never change automatically.

All ten paths and 500 questions remain unchanged. Optional fields extend the existing coaching save; old saves still parse. Combined backups include the new fields. Existing protection for corrupt saves, concurrent writes and quota failures remains.

Validation: 626 tests pass; TypeScript passes; production build passes. Full lint has only the pre-existing StudyAccount navigation warning after the new hook warning was fixed; targeted changed-file lint is clean. Browser checks cover jumping, marks and elimination persistence after reload, restoration on selection, contextual hints, independent transfer review, deferred test feedback, matching-session comparison, and 390px mobile width with no overflow.

Preview contains clearly synthetic test attempts created during verification; existing retained attempts and notes were not cleared. Not committed or published.
