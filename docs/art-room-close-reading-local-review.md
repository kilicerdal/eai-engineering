# Art Room: close-reading package — local review

Local only. No commit, push, deployment or production data migration was performed for this package. This extends the earlier museum-studies package; its features remain in place.

## Preview

- http://127.0.0.1:3038/study/art
- http://127.0.0.1:3038/study/art/painting/morisot-02 — three-stop guided looking
- http://127.0.0.1:3038/study/art/painting/cassatt-01 — expanded essay and audience/argument dossier
- http://127.0.0.1:3038/study/art/exhibitions/private-interior — one work at a time, five/twenty-minute routes, save/resume
- http://127.0.0.1:3038/study/art/vocabulary
- http://127.0.0.1:3038/study/art/research
- http://127.0.0.1:3038/study/art/collection-notes
- http://127.0.0.1:3038/study/art/notebook

## Recommendation coverage and limits

| # | Recommendation | Implemented scope |
|---|---|---|
| 1 | Twenty signature studies | Expanded the featured selection from five to twenty, covering all fifteen painters. Original five retain their fuller research/evidence dossiers; fifteen new essays have additional work-specific arguments, audience context, interpretation pairs and three looking points. New fifteen essays range from about 680 to 1,305 words, rather than claiming every essay has the same depth. |
| 2 | Painting-specific central arguments | Optional argument panel on painting pages; new fifteen have individually authored dossier arguments, other works use their existing editorial lead. |
| 3 | Richer painter profiles | Preserved earlier working-circumstance expansions and added specific professional-access context for Gentileschi, Morisot and Cassatt. |
| 4 | Development through three works | All fifteen career comparisons now have three work-specific development captions. |
| 5 | Artistic disagreements | Fifteen pairs of explicitly editorial readings; one attributed curatorial interpretation on Ginevra de’ Benci. Not presented as a collection-wide survey of published scholarly disagreements. |
| 6 | Commission/audience context | Added to the fifteen new dossiers, with institutional links and limits on inferred intention. |
| 7 | Women’s training/access | Expanded three painter profiles with sourced institutional, training and exhibition context. |
| 8 | Look before interpretation | Existing look-first flow retained, now uses the painting’s own question and asks for visible evidence. |
| 9 | Guided looking | Optional three-stop sequence on annotated paintings, with previous/next and a whole-image highlight. |
| 10 | Passage-to-detail highlights | Inline detail links highlight coordinates on the main painting without requiring a modal; existing fullscreen inspection remains available. |
| 11 | Preparatory/finished comparisons | Research desk links related print/preparatory evidence to official museum pages. Technical/comparative photographs are not newly licensed or rehosted; no in-app technical-image comparison slider is claimed. |
| 12 | Conservation changes | Four research cases explain related versions, underlying design, pigment fading and later intervention. Official evidence opens on the institution’s own site. |
| 13 | Original viewing conditions | Earlier five structured research studies retain room/context diagrams; new audience dossiers add contextual discussion. Not a reconstruction of every original installation. |
| 14 | Illustrated vocabulary | Eight terms with retained artwork examples, looking prompts and a technical-glossary reference. |
| 15 | Cross-era connections | Existing three curated exhibitions and related-work links retained, presented through the new one-stop visit flow. |
| 16 | Five/twenty-minute routes | Two-work or four-work exhibition visits, without a countdown. |
| 17 | Return/resume | Manual exhibition-stop save and resume, unfinished exhibition entry and recent observation return. Existing essay reading positions remain valid. |
| 18 | Printable study sheet | Notebook gets a dedicated print heading, collection/work count, notes and references, with shared navigation/footer excluded. Existing Markdown export and restorable JSON backup remain separate. |
| 19 | Collection balance | New collection-notes page reports six eras, fifteen painters and representation limits: three women and twenty paintings by women. It explicitly describes a selective European-tradition collection. |
| 20 | Editorial quality pass | Automated structural review across 100 essays: valid citation indexes, distinct substantive paragraphs, twenty featured studies and all fifteen career sequences. This is not independent scholarly peer review or a semantic fact-check of every sentence. |

## Verification

- Production build and TypeScript compilation pass.
- 1,057 unit tests pass, including exhibition-key validation and backup round trips.
- 66 local browser checks pass, including previous Art Room, navigation and saved-reading regressions.
- New browser checks cover 390, 768 and 1440 px layouts and automated WCAG A/AA checks for the tested pages/states.
- Desktop/mobile guided looking, exhibition, vocabulary, research and print layouts were visually inspected. Print review caught and corrected the shared footer appearing in the export.
- Lint: zero errors; one existing StudyAccount.tsx navigation warning.
- Editorial-depth and curated-collection audits report no issues; no identical substantive paragraphs found by the exact-normalization check.
- Learning inventory unchanged: 200 books, 12 certification paths, 1,090 questions, 1,000 discoveries. Art inventory remains 100 paintings and 15 painters.

## Storage and persistence

No new image files or book files were added. Image bytes remain 44,357,238; packed books remain 90,791,154. The package required a documented, bounded 32 KiB increase to the local JavaScript budget; this is a local asset-size check, not Vercel account usage or a guarantee about bills.

Existing personal/gallery storage keys are retained. The reading parser accepts only the three known exhibition IDs and valid station identifiers in addition to existing artwork/biography reading records. Backup merge preserves current entries; no user browser storage was cleared. Browser test fixtures used isolated Playwright profiles.

## Content sourcing

New historical context cites institutional collection records from the NGA, National Gallery, Vatican Museums, Mauritshuis, Royal Collection, Prado, Art Institute of Chicago, Van Gogh Museum and Guggenheim Bilbao. Conservation resources link Getty, Rijksmuseum, Dresden and Thyssen-Bornemisza research. Original visual interpretations are labelled separately from historical evidence; no invented artist quotations or inferred private intentions are treated as facts.

Technical images stay on institutional sites under their own terms. No AI recoloring, simulated scan or fabricated preparatory image is presented as conservation evidence. External site availability remains outside this application’s control.
