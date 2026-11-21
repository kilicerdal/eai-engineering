# Next local Art Room quality pass

Local only; not published. Builds on the depth-and-facts package without changing save schemas, catalogue IDs, artwork or backgrounds.

Changes:
- More specific headings for the new facts, retaining stable IDs.
- Precise Night Watch trimming/copy references from the Rijksmuseum; copy attribution remains qualified. Dalí scale entry points directly to MoMA's object record.
- Same-page return links from facts to full essays and biographies, including a 44px minimum tap height. A browser test exposed Next Link's hash-only navigation leaving Introduction mode active; native same-page anchors now trigger the existing depth-reveal behavior.
- Search excerpts locate original words rather than applying normalized offsets to accented/apostrophized text. Snippets preserve ordinary word boundaries. Search form says Search words, reflecting all-word matching rather than promising exact phrase matching.
- Reference checks detect short loading, JavaScript and access-screen responses despite HTTP 200. Script/style content cannot turn an empty main article into readable source evidence. A readable response is still not historical verification.

Validation:
- 1,097 unit tests passed, including gate-page and accented search cases.
- Initial full browser run: 129 passed, one new return-link regression exposed. After the fix, all six fact browser tests passed, including the previously failing scenario. No blanket claim that the entire suite was rerun after the fix.
- Final production build and existing asset-size budgets passed; scoped ESLint and TypeScript passed.
- Desktop and phone screenshots visually inspected; captured 390/768/1440 with no horizontal overflow.
- Inventory retained: 200 books, 1,000 discoveries, 12 certification paths, 1,090 questions.

Source snapshot: 85 selected URLs; 22 reachable without text-change flags, 14 text-change flags, 42 access-restricted responses, five responses with insufficient readable text and two access screens. These maintenance findings remain visible for manual review; none certifies independent verification of every claim.
