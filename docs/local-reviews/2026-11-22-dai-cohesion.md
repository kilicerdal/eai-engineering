# dAI Learning Studio refinement — local review

Local implementation on `improvements-nov11`, following release a1e3f5e3f5f8a9a319e5d1794e1ea9798138f356. No publication, storage migration, catalog removal or new service. The recommendation list contains both new refinements and existing behavior retained and checked; it is not a count of 30 new features.

## Recommendation disposition

| # | Recommendation | Local outcome |
|---|---|---|
| 1 | Simpler Studio homepage | Seven rooms grouped into three purposes; directory server-rendered, existing workspaces retained. |
| 2 | Consistent navigation | Explicit Studio return label, Writing entry in More, correct Writing and Exam room identities. |
| 3 | One obvious next step | Existing primary room actions retained; browser checks cover small practice, resume and optional deeper tools. |
| 4 | Exact saved-work return | Both saved-work projections now open the dedicated Tutor workspace with session ID; draft not submitted. Reading and old certification edition returns checked. |
| 5 | Consistent controls | Existing primary/optional-control hierarchy retained and checked across rooms. |
| 6 | Mobile layouts | Grouped directory and compact reader typography adjusted; phone/desktop overflow and accessibility checks pass. |
| 7 | Calmer hierarchy | Three room groups; optional tools remain collapsed, no feature removed. |
| 8 | Clear saving | Room-specific saving help; existing unavailable-storage warning and recovery behavior checked. |
| 9 | Tutor goal and level | Prompt uses supplied purpose/level without repeating onboarding. |
| 10 | Tutor explanation structure | Prompt leads with central idea and reasoning/example, permits requested professional depth. |
| 11 | Relevant follow-ups | Prompt requires question-specific follow-ups; follow-up drawer names the learner question. |
| 12 | Tutor quality evaluation | Request contracts and mocked browser flows checked. Live response evaluation remains pending credentials, as previously requested. |
| 13 | Question editorial audit | All 1,090 questions screened; ten short explanation takeaways expanded without changing saved answer editions. Lexical flags remain recorded, not claimed as expert validation. |
| 14 | Clear practice modes | Five-question entry retained; longer balanced practice and pause behavior clarified. |
| 15 | Useful results | Finished-session domain snapshot shows sampled strongest/revisit areas with explicit sample limitations; saved revision respected. |
| 16 | Repetition counts | Labels describe retained same-edition history, avoiding a first-ever exposure claim. |
| 17 | Exam reference checks | 67 institutional documents across 12 paths responded; no missing mapped section detected. One changed fingerprint and 23 unbaselined references remain flagged for editorial review. |
| 18 | Book tiles | Wrapping and alignment improved; long titles/authors do not force clipping. |
| 19 | Reading orientation | Existing named chapter, section, position and saved return behavior checked. |
| 20 | Notes with context | Notes show chapter/section context; closing notes restores keyboard focus. Saved notes survive reload. |
| 21 | Reading comfort | Compact text wrapping, paragraph spacing rules and phone header wrapping; largest text/Paper theme visually checked. |
| 22 | Image availability states | Sensitive-image gate explicitly identifies the visitor viewing preference; institutional reference-only state remains separate. |
| 23 | Art essay navigation | Section chooser purpose clarified; full scholarship retained. Existing research, outline and return behavior checked. |
| 24 | Meaningful comparison | Personal pairings explicitly avoid implying a documented historical connection; whole reproductions remain uncropped. |
| 25 | Art credits and uncertainty | All 124 painting records screened; zero missing credit/rights/source fields for hosted images. Existing caption, description, image retry and research controls checked. Metadata presence does not independently establish every permission or interpretation. |
| 26 | Painter to study return | Exact biography paragraph and related-study card return verified in browser. |
| 27 | Discovery overlap | All 1,000 records screened for normalized duplicates and lexical similarity; none flagged at the documented thresholds. This is not proof of no conceptual overlap. |
| 28 | Why it matters | The sole short Why entry expanded with a concrete component-versus-system distinction. |
| 29 | Related discoveries | Four bounded thematic connections added, distinguishing analogy from historical influence. |
| 30 | Precise sources and claims | Pump casing question narrowed to what its cited source supports, with dated correction overlay; archived fact and stable ID preserved. Feed now actually displays corrected question. Other absolute-word flags remain editorial triage, not silently accepted as verified facts. |

## Evidence and limits

- Production build passed. Existing JavaScript, CSS, image and packed-book budgets passed without raising limits.
- Unit suite: 1,124 passed, zero failures.
- Browser suite: 74 passed, zero failures. Covers desktop/mobile, relevant accessibility scans, saved drafts/notes, historical answer editions, image preferences, exact study return and practice results.
- ESLint: zero errors; one existing StudyAccount.tsx location.assign warning.
- Visual inspection: Studio desktop and phone, practice results, corrected Curiosity question, phone reader at largest text size in Paper theme.
- Raw editorial and reference reports are adjacent JSON files. The 34 question flags include ten short explanation entries now complemented by richer study takeaways and absolute-language triage. They remain visible because the audit examines the source records; no graded answer or archived edition was rewritten. Discovery absolute-language and short Art introduction flags are also retained for contextual review; this package does not certify every statement in the collection.
- Existing 200 books, 1,000 discoveries, 12 certification paths, 1,090 questions, 124 paintings and 24 works on paper retained. Automated inventory and behavior checks are not independent scholarly review.
- Live Tutor testing remains pending credentials. No live model response was obtained or claimed.

Preview: http://127.0.0.1:3038/study
