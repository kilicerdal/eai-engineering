# Engineering Certification Studio — first local release

## Scope

Three paths at `/study/certifications`: AWS Cloud Practitioner (CLF-C02), AWS AI Practitioner (AIF-C01) and ISTQB Foundation Level (CTFL v4.0, syllabus v4.0.1). All seven requested capabilities are implemented:

1. Starting assessments sample one question per domain (4/5/6 questions) and produce local evidence, not pass predictions.
2. Study plans use official domain/chapter allocations and latest checked examples. Learners choose 10–60 minutes/day and 7/14/28 days; daily learn/practice/reflection allocations sum exactly to that budget.
3. 75 original, single-choice questions, 25 per path, with four authored rationales each. Correct choice positions rotate. IDs, source dates and task/section mappings are retained. This is selected-objective coverage, not a complete official exam bank.
4. Missed/unanswered checked attempts automatically enter a separate certification notebook, retaining the learner’s reasoning and editable reflection. A later correct retry does not erase the saved missed attempt. Retention keeps notebook-referenced evidence and caps each path at 300 attempts.
5. Focused practice, assessment and timed sets (5/10/25 items, 10/20/40 minute local budgets). Active answers and reasoning resume through refresh; absolute deadlines continue while away. Late answers trigger finalization, unanswered questions count as missed, repeated finish is idempotent, and timed feedback remains hidden until submission. Timed sets do not reproduce official lengths, question-type mixes or scoring.
6. Each domain links to an existing Explore experience, Investigation Lab, AI Tutor or public engineering case, with a concrete observation/reasoning task.
7. Every question exposes a task/section reference, authored rationales, official source and source-check date. Path resources state the guide version and scope.

An optional reasoning tutor uses the existing protected Cloudflare streaming infrastructure via `/api/certifications/tutor`. The server chooses canonical question/key content by ID and accepts only a supported answer plus bounded reasoning. Plans, other history and notebook reflections are excluded. AI text cannot alter authored keys or local grades. No official sample exams or recalled exam items are copied. Independent study material; no official/accredited status is claimed.

## Source verification — client date 2026-11-14

- [CLF-C02 current online guide](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html) and its four domain pages: 24/30/34/12 percent.
- [AIF-C01 current online guide](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) and five domain pages: 20/24/28/14/14 percent. The current guide includes formats beyond single choice; our scope statement explicitly distinguishes the local bank.
- [Official CTFL overview](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/), linked [syllabus v4.0.1](https://istqb.org/?download_id=3345&sdm_process_download=1) and [exam structure tables v1.21](https://istqb.org/?download_id=3832&sdm_process_download=1). Chapter allocation informs planning; no local percent is represented as an official score.

## Preservation and storage

All existing SAT/PSAT/other exam preparation remains at its current locations. The old mistake notebook, Reading Room, Explore saves and other learning storage keys are untouched. New work uses only `eai-certification-v1:<path-id>` and includes path-local JSON export. Damaged, unsupported, quota-constrained and concurrently changed saves preserve original bytes and retain in-tab work for export. Browser-local certification data is not account synced.

Entrances are added to existing exam prep, the Study navigation menu and the homepage Learning rooms links. The existing Göbekli Tepe/Da Vinci hero remains unchanged. The new hub reuses existing library-to-future artwork; no existing images are removed or edited.

## Validation

571 tests pass, including 20 new content, numerical answer-key, domain coverage, scheduling, timer/expiry, grading, immutable checked answers, notebook retention, save isolation, corruption/concurrency/quota, privacy and real-route-with-mocked-provider checks. Type checking and production build pass. Lint has no errors and one pre-existing StudyAccount warning.

Browser checks cover all three paths; assessment answer/reasoning refresh persistence; missed-item capture; reflection/review controls; a changed 7-day/10-minute plan; timed-session refresh using its original deadline; practical links; the local AI-unavailable state; and 390 px practice layout without horizontal overflow. Browser QA found and fixed a timer display rounding issue and made plan select labels explicit. Deadline expiration is covered deterministically in tests rather than waiting through a real ten-minute session.

Live provider generation is not verified locally because the local AI configuration is incomplete. The authored practice and explanations work independently. Local review only; no commit, push or publication for this release.
