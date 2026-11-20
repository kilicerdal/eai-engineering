# Art Room: 30-point refinement, local review

Local preview: http://127.0.0.1:3038/study/art

This builds on the owner-approved local 40-point navigation pass. It does not publish, add services, add paintings, change original image files, or change saved-work schemas. The approved gallery composition is retained.

## Editorial work

1. Reviewed painting-specific openings across the collection; retained strong existing introductions rather than replacing them with a template.
2. Replaced the repeated technical paragraph in all 12 modern studies with work-specific material/visible-effect analysis.
3. Added precise institutional context to The Magpie, Eugène Manet on the Isle of Wight and Galatea; retained existing researched commissions and audiences in the signature studies.
4. Moved visual-analysis paragraphs out of final historical sections where they had been mixed with collecting history. Existing section anchors remain valid.
5. Kept attributed disagreements and their evidence; clarified that an editorial question is not itself evidence of a dispute between named scholars. No historians or opposing positions invented.
6. Connected medium, scale, contour, density and painted surfaces to the specific visual problem in each of the 12 modern studies.
7. Distinguished making, institutional acquisition, reception and gaps. The Magpie's 1984 acquisition is explicitly separate from its 1868–69 making.
8. Consolidated the repeated modern technical caveat into shared research guidance, retaining important work-specific uncertainties.
9. Reworked six artist introductions around their practices and paired studies, with the existing career narratives retained.
10. Connected the six introductions to their particular works while resisting unsupported psychobiographical explanations.
11. Recalculated all manuscript word counts and reading times at 180 words/minute; introduction time follows its actual introductory text. Research is identified as additional topical reading.
12. Reviewed paragraph lengths across all manuscripts; structural audit found no paragraph over the review threshold of 180 words.
13. Replaced 72 generic section headings across the modern studies with specific arguments, preserving section IDs.
14. Added 12 painting-specific concluding returns to a visible detail. Existing strong conclusions elsewhere retained.
15. Corrected research-topic assignments, removed duplicate titled research entries and deduplicated essay bibliography URLs while remapping numeric citations.
16. Replaced broad homepage links for Caravaggio, Morisot, Raphael and Rembrandt with more specific institutional resources; added Orsay's Magpie object record.

## Presentation and continuity

17. Retained the approved contained-original-image layout and mobile tile order; checked mixed portrait/landscape collections through browser regression tests.
18. Retained original image resolution, proportions and credits. Added an accessible source-record fallback for loading failure, including failures before hydration.
19. Reference-only comparisons explain how to consult institutional images in another tab and return to the comparison; unavailable detail tools remain disabled.
20. Tightened long-text wrapping, minimum column widths, control sizing and return-link hierarchy without changing the gallery visual identity.
21. Tested largest-text mode at phone and desktop widths through study, profile, comparison, visits and My Art.
22. Phone comparisons stack whole works and avoid oversized fixed image boxes; tested horizontal overflow and the existing keyboard/accessibility journeys.
23. Suggested pairs retain their question, argument, visible evidence and differences. Suggested-pair controls now have question-specific accessible names; same-work choices are explained.
24. Comparison works and focus persist in the URL through refresh. A study opened from a comparison includes an explicit return to that pair and focus.
25. Added individual transitions between works in all eight short tours. Transitions develop the tour's central question through visible relationships, without claims of undocumented influence.
26. Distinguished reaching a visit's end from successfully saving completion. Guided-stop and completion messages use explicit browser-saving language; existing essay-read status remains separate.
27. My Art now leads with one continuation. Other return options and management tools remain available in secondary disclosures. Unfinished exhibitions also have a primary continuation when appropriate.
28. Saved notes, recovered drafts, essay positions and visit stops retain distinct labels. Drafts remain recovery copies, not silently treated as saved notes or added to backups.
29. Active note drafts survive a concurrent saved-note update; the reader sees the newer copy and chooses which to keep. The save callback checks the latest saved text before overwriting. Refresh, interrupted navigation, storage failure and backup compatibility remain covered.
30. Audited all 112 studies, 21 painter essays, 9 eras and 6 thematic essays for citation indices, unique anchors, actual word counts, URL shape, bibliography duplicates and image-file presence. Browser regressions cover empty states, search, old bookmarks, keyboard journeys and saved-work flows.

## Source review limits

Structural audit is not a claim that every external page or historical assertion was freshly verified. Orsay's object record, Marmottan inv. 6029 and Farnesina's Loggia account were opened successfully during this pass. MoMA's Red Studio and Pollock object pages and the Met's Autumn Rhythm record were also consulted. The specific Kimbell loan account was available in search but direct retrieval returned 403; the Hermitage Foundation's specific recording page was available in search but direct retrieval timed out. These links are recorded as specific resources, not certified continuously reachable endpoints. No historical facts were newly inferred from the blocked pages. No new image licenses are claimed.

## Verification

- Production build and existing asset budgets pass; no budget increases.
- 1,079 unit tests pass.
- All 89 Art Room browser tests pass, including desktop/mobile accessibility, comparison continuity, multi-tab note conflicts and image-load failures. Details: `/tmp/art-refine-browser-final.log` and `artifacts/art40/browser.json`.
- Scoped Art lint and TypeScript checks pass.
- Editorial structural audit: zero issues and zero broad-homepage warnings (`scripts/audit-art-refinement.mjs`).
- Built-study anchor audit: all 112 paintings, 1,922 required anchors, zero issues.
- Learning inventory: 1,000 discoveries, 200 books, 12 certification paths, 1,090 questions; zero issues.
- Desktop and mobile screenshots inspected under `artifacts/art-refinement/`; approved entrance/gallery screenshots under `artifacts/art40/`.
- Nothing committed, pushed or deployed in this pass.
