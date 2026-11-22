# Reading / Curiosity: forty local refinements

Implements the owner's forty-item Reading/Curiosity package in the existing rooms. This checkout also retains the preceding Writing/Materials and Exam packages. No push, release or new account/provider integration was performed.

## Implementation map and coverage limits

| # | Requested outcome | Local behavior |
|---|---|---|
| 1 | Notes beside passages | Identifiable bracketed source references open the exact matching source-note paragraph beside their reference. |
| 2 | Endnote return | Explicitly headed numbered Footnotes/Endnotes blocks are recognized, including the Art of War introduction; a bounded return stack retains the actual reference paragraph across reading-section navigation. |
| 3 | Internal references | Explicit see/in/refer-to chapter references gain navigation only when a unique verified contents heading matches. |
| 4 | Note identity | Explicit author/editor/translator wording is labeled; otherwise authorship remains unidentified. A marker is never taken as proof of authorship. |
| 5 | Long-note view | An optional full reading dialog accompanies the adjacent note; original-context navigation remains separate. |
| 6 | Plays | Identifiable speaker names and stage directions are distinguished, with original dialogue line breaks and emphasis retained. |
| 7 | Letters | Explicit letter headings, salutations, identifiable date lines and closings receive source-aware presentation. Unmarked boundaries are not invented. |
| 8 | Embedded documents | Explicit letter/extract/copy markers and salutations distinguish their source paragraphs; the renderer does not infer a document's unmarked ending. |
| 9 | Verified illustration | Pride and Prejudice p5/p6 is connected to Hugh Thomson's 1894 Reading Jane’s Letters frontispiece through its verified Commons identity, caption and reuse record. Loading the external reproduction is explicit and optional. **No local image was downloaded: Wikimedia returned HTTP 429.** Successful reproduction delivery is not claimed; a failure notice and source link remain. |
| 10 | Omission notices | Other illustration markers explicitly distinguish the retained source caption from an unavailable/unverified local reproduction. No substitute art is generated. |
| 11 | Exact phrases | Straight or curly quoted phrases remain together; unquoted words must all occur in the matching passage. |
| 12 | Chapter range | From/through controls use verified paragraph boundaries, including chapters sharing a stored reading section. |
| 13 | Exclude front matter | Main-work scope starts at this edition's first verified contents heading, excluding identifiable source notes. It is not a new scholarly reclassification of every section. |
| 14 | Search notes separately | Identified bracketed notes and explicitly headed numbered endnote entries can be searched separately. Unmarked commentary is not silently classified. |
| 15 | Whole words | Unicode word boundaries distinguish words from substrings. |
| 16 | Typography equivalence | Curly/straight quotation marks, dash forms, whitespace and existing accent folding match without rewriting source display text. |
| 17 | Boundary-spanning phrase | A phrase can cross into the following source paragraph; it cannot cross into a new named chapter or an identified note. The result names its continuation paragraph. |
| 18 | Group results | Results are grouped by their verified chapter heading. |
| 19 | Context expansion | Neighboring exact source paragraphs expand inside the search result; the query and result position remain. |
| 20 | Word occurrences | Optional literal query-term counts accompany chapter-grouped results. They are not interpreted as thematic importance; overlap and first-100-result limits are disclosed. |
| 21 | Dated response | Follow-ups append their own ID, timestamp and text, keeping original note text/date/quotation intact. |
| 22 | Connect notes | Existing notes can be linked across books, with an optional explanation. |
| 23 | Relationship meaning | Supports, challenges, complicates and contrasts are separate reader-selected relationships. |
| 24 | Interpretation history | Original note and dated responses are displayed in sequence, without claiming a measured learning gain. |
| 25 | Personal terms | Reader-entered terms and their own definitions are stored with the source note. No automatic dictionary or inferred definition is supplied. |
| 26 | Term context | Each term returns to its parent note's original edition/section/paragraph. |
| 27 | Resolve questions | Question notes support still open, partly answered and answered to my satisfaction, with a reader explanation. |
| 28 | Attach evidence | Existing source notes can be linked as support, challenge or complication for a question. |
| 29 | Quotation integrity | The unchanged saved quotation can be compared against the exact fetched paragraph; adapted wording is separate. Unavailable or unmatched originals remain explicitly unverified. |
| 30 | Publication wording | Selecting a retained source span prepares explicit […] omissions and bracketed additions. Export distinguishes adapted wording, unchanged saved quotation, original paragraph and exact return link. No publication-ready verification or ethical clearance is claimed. |
| 31 | Denominators | Selected numerical discoveries state which objects/population/quantity a ratio or percentage concerns. |
| 32 | Absolute/relative change | The saffron example explicitly distinguishes an additional 150 flowers from a 100% increase under a stated constant-yield arithmetic model. |
| 33 | Estimate/measurement | Selected source contexts distinguish estimates, reconstructed populations, rounded observations and explanatory models. |
| 34 | Precision | Rounded periods, unit conversions and descriptive dimensions retain their supported precision. |
| 35 | Ranges | The RHS recommended planting range is distinguished from statistical uncertainty; absent numerical uncertainty intervals are explicitly not invented. |
| 36 | Conditions | Relevant reference frames, dried product and controlled experimental conditions are placed beside the qualified claim. |
| 37 | Checkable scale | Explicit arithmetic converts the Sun–Earth light time to an immediate round-trip model and scales the stated saffron estimate, disclosing assumptions. |
| 38 | Nonlinear scale | A sourced related pH example distinguishes a tenfold change from a linear step; it supplies no invented yogurt pH measurement. |
| 39 | Groups/individuals | NPS group descriptions are separated from claims about individual residents. |
| 40 | Observation/explanation | Europa's inferred ocean and estimated water comparison are separated from direct inventory, interior illustration and claims of life. |

The ten Curiosity refinements are applied where warranted to eight existing discoveries: Venus rotation, Europa water budget, saffron flower yield, Cliff Palace room count, saffron stigmas, sunlight travel time, yogurt acidity, and the fountain-clock atomic toss. No claim that all 1,000 discoveries received a new scientific review is made.

## Source records

The original packed text, book identities, source quotations and discovery records are unchanged. Source-aware rendering uses identifiable local text patterns and verified contents metadata, not generated attributions. Unsupported or ambiguous references remain plain text. New source context is linked to NASA, NIST, RHS, NPS and USGS institutional references, reviewed 2026-11-22. Arithmetic examples are labeled editorial models rather than new observations.

- NASA: https://science.nasa.gov/venus/venus-facts/ ; https://spaceplace.nasa.gov/europa/en/ ; https://spaceplace.nasa.gov/all-about-the-sun/en/
- NIST: https://www.nist.gov/atomic-clocks/how-atomic-clocks-work/fountains-atoms-exquisite-timekeepers
- RHS: https://www.rhs.org.uk/herbs/saffron
- NPS: https://www.nps.gov/meve/learn/historyculture/cliff_palace.htm
- USGS: https://www.usgs.gov/water-science-school/science/ph-and-water (direct access restricted; indexed institutional text confirms logarithmic/tenfold explanation); supporting accessible institutional page: https://pubs.usgs.gov/gip/gw/quality.html
- Illustration identity and licensing: https://commons.wikimedia.org/wiki/File:Thomson-PP01.jpg ; placement p5/p6 and delivery limitation are recorded in 2026-11-22-reading40-illustration.json.

## Persistence and privacy

Reading library version 1 gains optional validated note.study fields. Old records retain their shape. New additions are bounded, stay local, participate in unsaved-writing protection, survive the Reading Room backup and appear in selected/single-note exports. Conflicting imports remap relationships to imported note identities while preserving existing connections; identical linked notes are copied when necessary to preserve an imported relationship. Reader edits retain the latest stored study additions. Concurrent note edits refuse replacement and retain unsaved additions.

The local Reading backup import allowance is 32 MiB to accommodate extended notes. Existing cloud upload keys are unchanged: Reading notebook data is still excluded from that account upload allowlist. Nothing is automatically sent to the Tutor, a dictionary service, Wikimedia or another provider. The optional illustration-load button is explicitly labeled as an external Wikimedia request.

## Verification

- Full unit suite: 1,170 passing, including thirteen new source/search/metadata/merge/quotation/privacy tests.
- New browser suite: twelve desktop/390px phone scenarios pass; covers real inline notes and numbered endnotes, exact return, scoped search, persisted follow-ups/relationships/status/terms, quotation export, concurrent edits, drama formatting, illustration fallback and Curiosity explanations.
- Existing regression suite: 176 scenarios exercised. Initial result 173 pass; two failures assumed preview port 3038 and one assumed an open desktop navigation on a phone. Portable URL/menu setup corrections preserve their assertions; all four affected viewport rechecks pass.
- After the final typography correction, all twelve new browser checks and twenty-six existing reading/notebook/bookmark checks passed again against the final production build.
- Production build, TypeScript, packed-reading audit and bounded asset audit pass. Added package allowances: 48 KiB JavaScript / 8 KiB CSS; no local image additions.
- ESLint has no new errors; the pre-existing StudyAccount navigation warning remains.
- Automated accessibility checks cover the new quantitative panel; existing relevant room checks also pass. This is not a native screen-reader session or a claim of whole-site accessibility certification.
- Desktop and phone source-note, search, notebook, drama, illustration-fallback and quantity screenshots are in artifacts/reading40/. They were opened for visual review. The review found and corrected checkbox layout, source paragraph inheritance and original drama line breaks.

Local preview: http://127.0.0.1:3047/study/reading
Curiosity example: http://127.0.0.1:3047/study/curiosity?fact=saffron-flower-gram

Nothing published. External illustration delivery remains dependent on the host; its download was rate-limited, and no successful local reproduction is claimed.
