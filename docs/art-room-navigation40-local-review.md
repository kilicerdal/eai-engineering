# Art Room: navigation and study overhaul — local review

Local preview: http://127.0.0.1:3038/study/art

This package is local only. It changes the Art Room and its route-specific navigation; it does not publish, change account credentials, migrate existing saved records, add image assets or modify the other learning inventories.

## Approved work and implementation

| # | Improvement | Local implementation |
|---|---|---|
| 1 | Protect unfinished notes | Separate validated recovery drafts, explicit Save/Discard, shared unsaved-writing navigation guard and browser unload warning. Failed recovery storage leaves editor text and saved notes intact. |
| 2 | Shareable, resumable browsing | View, painter, era, mood, subject, query and page in the URL; native browser history integration; legacy session state supported. |
| 3 | Unaccented search | Catalog and scholarship use the same normalization. Cezanne/Cézanne and Dali/Dalí match. |
| 4 | Honest reference-only tools | Image-marker controls omitted where no reproduction is hosted; synchronized image detail requires two hosted images. |
| 5 | Smaller mobile header | Compact Art Room header replaces the duplicated Studio and orientation headers on Art routes only. |
| 6 | Correct collection copy | Cultural exchanges introduction now reflects 21 painters and Matisse's inclusion. |
| 7 | Modern mood/subject routes | All twelve modern works have selective editorial routes; no mood is presented as the artist's intention. |
| 8 | Short-tour continuity | Save stop on Previous/Next/Finish; resume from My Art; progress uses existing validated personal record with new bounded tour IDs. |
| 9 | Five destinations | Paintings, Painters, Guided Visits, My Art, About. |
| 10 | Grouped directory | About offers Read, Look/Compare, and Sources/Evidence with descriptions. Original URLs remain. |
| 11 | My Art overview | Saved paintings, writing, passages, arguments, collections, exhibition and reading/visit counts, existing backup tools. No data migration. |
| 12 | Guided Visits hub | Eight short tours, four question-led routes, three exhibitions and personal exhibition access. |
| 13 | Comparison entrance | Any-two comparison links to detail/composition and documented-version methods. |
| 14 | Contextual return | Back to your results retains filters/page and returns to the selected painting tile. |
| 15 | Art-specific wayfinding | Five Art destinations primary; other rooms and Learning Studio remain accessible. |
| 16 | Earlier collection | Gallery follows the introduction and relevant return card; long research directory and signature-study list move to About. |
| 17 | Six research groups | Materials; history/audiences; interpretations; looking/comparisons; evidence/conservation; sources. Existing passage IDs retained. |
| 18 | Shallower disclosure hierarchy | Research wrappers become headings within topic panels; simple artwork/context paragraphs no longer require separate nested disclosures. |
| 19 | Whole-study contents | Essay headings, whole image and six research groups together; existing essay contents also retained. |
| 20 | Reading depths | Introduction, full study with estimated reading time, and research-by-topic. Saved writing is unaffected by depth changes. |
| 21 | Compact citations | Numbered passage references retain descriptive accessible labels and link to full scoped bibliography. |
| 22 | One writing entrance | Write about this painting groups personal note/collections, observation journal and argument link. Old writing anchors open the right panels. |
| 23 | Return between image and passage | Whole-image/return-to-passage controls; existing detail-from-passage fullscreen and Escape return maintained. |
| 24 | Consistent quiet viewing | Research groups, secondary contents/context and writing tools hide in quiet mode; visible exit remains. |
| 25 | Visible search | Catalog search stays above optional filters. |
| 26 | Removable choices | Individual active-filter chips plus Clear choices. |
| 27 | Connected searches | Catalog query links to essays and matching painter profiles; scholarship links back to catalog search. |
| 28 | Mobile landscape viewing | Wide tiles span the mobile grid; isolated preceding/final portraits fill their row without changing reading order. Images remain contained. |
| 29 | Reference-only cards | Painter, work, date and institutional-study treatment; no replacement image. |
| 30 | Museum handoff | New-tab institutional viewing includes a work-specific looking question and instruction to return to the study. |
| 31 | Portrait alternatives | Initials and lifespan form a distinct identity treatment when no portrait is reproduced. |
| 32 | Easier comparison picking | Search each comparison list and select two works directly from gallery tiles. |
| 33 | Twelve modern evidence cases | Six companion cases added: Picasso's mirror, Dalí's Narcissus, Pollock's Autumn Rhythm, Matisse's Dance (I), Kahlo's Two Fridas and Magritte's False Mirror. Each separates visual argument, object history and evidentiary limits. |
| 34 | Less repeated reading | Duplicate essay bibliography list replaced with its original full bibliography link; repeated unresolved-question passage consolidated without dropping its anchor or attributed discussion. |
| 35 | Plainer entrances | Purpose-led navigation/reading labels; adult essay content retained. |
| 36 | Accurate listening labels | Browser-speech identity, transcript-based duration, availability message and complete visible transcript; About states five-study coverage. |
| 37 | Complete restore review | Preview includes saved paintings, notes, collections, passages, arguments, observation journals, detail/comparison notes, reading positions and exhibition introductions. Unsaved recovery drafts are explicitly separate. |
| 38 | Useful empty states | My Art and empty searches offer concrete first painting/browse actions. |
| 39 | Accessibility checks | Keyboard image/reading/writing journeys, Escape focus return, explicit text-field labels, named filter group, responsive overflow and axe checks. |
| 40 | Visitor walkthrough | Five tasks and feedback fields below. Prepared; actual participant feedback remains pending. |

## Sources checked for the six added cases

Object facts were checked on November 20, 2026 against the linked institutional records. These checks support the specific new object facts, not a claim to have reverified every assertion throughout the collection. Visual interpretation is original editorial analysis. Unknown transfers, restoration histories and working sequences remain unspecified.

- Picasso, *Girl before a Mirror*: https://www.moma.org/collection/works/78311
- Dalí, *Metamorphosis of Narcissus*: https://catalogues.salvador-dali.org/catalogues/en/heritageobject/1198-965c/
- Pollock, *Autumn Rhythm*: https://www.metmuseum.org/art/collection/search/488978
- Matisse, *Dance (I)*: https://www.moma.org/collection/works/79124 — corrected stored dimensions to the current record's 260.4 × 390.4 cm.
- Kahlo, *The Two Fridas*: MAM's institutional entry at https://artsandculture.google.com/asset/the-two-fridas-frida-kahlo/zAHG4EZ1WrwVYg
- Magritte, *The False Mirror*: https://www.moma.org/collection/works/78938

No image permission is implied by these references. All twelve modern works remain reference-only.

## Visitor walkthrough — owner feedback requested

Use your normal browser, and repeat one task on your phone if convenient. No time limit or score.

1. Find Cézanne without typing an accent. Open a work and return to the same results.
2. Read one section of a study. Inspect the image, return to the passage, and save a thought. Find it again through My Art.
3. Choose two paintings in the gallery and compare them. Find a different painter using the comparison search.
4. Start a short Guided Visit, advance one work, leave and resume it from My Art.
5. Find sources for a claim, then create a small printable museum guide or download an Art Room backup.

Record: device/browser; where you expected to click first; anything hard to find; unfamiliar labels; any lost position or writing; what should be simpler. Technical browser automation does not replace this real-person feedback.

## Technical validation

Results and screenshots: `artifacts/art40/`. Final counts and size results are recorded after the final candidate run. The built-page anchor audit checks every painting and all retained essay/research deep links. Existing learning inventory must remain 1,000 discoveries, 200 books, 12 certification paths and 1,090 questions.

Final local candidate checks:

- Full unit suite: 1,076 passed; focused navigation/draft/source tests also passed after the final UI edits.
- Art Room browser suite: 81 passed, including existing and new journeys, storage-failure behavior, backup restore, keyboard controls, print layout and responsive accessibility checks.
- Type generation, TypeScript and production build passed. Scoped lint: no issues. Repository-wide lint: no errors; one pre-existing StudyAccount navigation warning remains outside this package.
- Built-page audit: 112 paintings, 1,910 required anchors, no missing or duplicate IDs.
- Learning inventory: 1,000 discoveries, 200 books, 12 paths and 1,090 questions; no issues.
- Build asset budgets: passed without increasing limits; image assets unchanged. Exact totals: artifacts/art40/build-size.json.
- Visually inspected final home and study layouts at 390 and 1440 px, including collapsed research topics. The mobile Art header measures 129 px in the checked default layout. Mona Lisa has 35 disclosure elements and 10 nested disclosures, compared with 48 and 12 in the original audit.
- User walkthrough: offered through the local link; participant feedback is still pending. No deployment or push performed.
