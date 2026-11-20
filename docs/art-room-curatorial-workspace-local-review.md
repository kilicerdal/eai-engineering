# Art Room: curatorial workspace — local review

This package is local only. It extends the existing museum-studies and close-reading packages; no push, commit or deployment was performed.

## Preview

- http://127.0.0.1:3038/study/art — unchanged calm entrance; optional study links
- http://127.0.0.1:3038/study/art/painting/vermeer-05 — curator opening, attributed interpretation, passage highlights, bibliography and audience context
- http://127.0.0.1:3038/study/art/research — an actual licensed related-version comparison
- http://127.0.0.1:3038/study/art/compare?left=leonardo-01&right=vermeer-01 — private comparison notes, existing synchronized zoom
- http://127.0.0.1:3038/study/art/my-exhibition — sequence an existing personal collection and write its introduction
- http://127.0.0.1:3038/study/art/connections — researched exchanges and turning-point comparisons

## Twelve recommendations: delivered scope

1. **Curator openings:** twenty individually authored openings, one for each signature work, behind an optional disclosure. An invitation to look is explicitly distinguished from an attributed artist or museum statement. Review corrected an initial mismatch between Girl with a Pearl Earring and The Milkmaid before final preview.
2. **Follow a passage:** visual-analysis sections of annotated essays now link their passage to a whole-image coordinate highlight, while retaining fullscreen inspection. This extends the existing guided-looking event and does not replace the artwork or its proportions.
3. **Compare interpretations:** added a sourced account of Rudolph, Swillens and Gowing on Woman Holding a Balance, linked to the NGA scholarly catalogue. The earlier Ginevra curator discussion remains. Fifteen pairs of editorial readings are still labelled editorial; published disagreements have not been invented for every painting.
4. **Related versions:** The Potato Eaters painting and the NGA's public-domain 1885 lithograph can now be seen together in the research desk. Both are uncropped. The print is a related version, not labelled as an infrared image or automatically as a preparatory drawing. Other technical images remain on museum sites under their own terms.
5. **First audience:** an optional audience/museum-encounter section on the twenty signature works uses the previously sourced audience dossiers or the original five contextual room accounts. Digital enlargement, physical scale and uncertain viewing conditions are distinguished; no unsupported exact viewing distances are invented.
6. **Turning points:** three focused comparisons for Van Gogh, Cassatt and Kandinsky connect works to a consequential change in pictorial means and an institutional history source. They are selective visual arguments, not complete biographies.
7. **Cross-cultural exchanges:** a new reading route names Hiroshige and Van Gogh, Cassatt's Japanese-print encounter, and Matisse's encounters with Islamic art. The Matisse example is explicitly outside the current fifteen-painter collection. These are researched starting points, not a universal survey or a substitute for the source traditions' own histories.
8. **Comparison workspace:** retained existing optional synchronized zoom, common-scale view, independent artwork selections and source links. Added private pair notes; either ordering of the same pair retrieves the same note. Selectors are unavailable while a note has unsaved changes, and the site’s writing/navigation guard is used.
9. **Personal exhibition:** existing collections can be reordered with keyboard-accessible earlier/later controls and given a saved introduction. A one-work-at-a-time private walkthrough follows the sequence. No public sharing, automatic publication or new account requirement. Selecting another collection is prevented while introduction changes are unsaved; discard is explicit.
10. **Return to observations:** existing before/after journals now display saved first and later readings together, with a question about what changed and no scoring. Original editing and detail-note tools remain.
11. **Annotated bibliography:** painting pages group object references, the essay's existing scoped reading, available published interpretation, conservation evidence and reproduction rights by purpose. Existing numbered citations and source anchors remain intact.
12. **Editorial review:** twenty openings checked against their actual artwork records; new historical claims tied to institutional sources, object identity and medium distinctions checked, exact repeated-paragraph and citation-index audits rerun. This is an editorial/structural pass, not independent specialist peer review of the complete collection.

## Persistence and limits

The existing `dai-art-personal-v1` key and backup format are preserved. New optional fields are:

- `comparisons`: at most forty canonical, distinct artwork pairs, with 1,500 characters per note.
- `collections[].introduction`: at most 1,200 characters; the existing ordered `ids` array is the exhibition sequence.

Old backups remain accepted. Merge retains current comparison notes, introductions and order on conflicts, adds new incoming items, and rejects overflow rather than truncating writing. No real user browser storage was cleared. Tests use isolated browser profiles.

## Image provenance and size

One new file: `/images/art/potato-eaters-lithograph-nga.webp` (468,622 bytes, 1200 × 1005). Source: NGA object 39824, accession 1951.10.33, Rosenwald Collection. The NGA explicitly marks the object's media public domain. The museum JPEG was resized and converted to WebP; no generative alteration. Full source/processing credit is in `data/art/research/comparative-image-credit.json`.

The new client interactions require about 38 KB additional raw JavaScript versus the previous local package. A bounded 40 KiB allowance is documented in the asset-budget script. Images remain within the existing image allowance. Book files are unchanged. These are local build measurements, not Vercel retained storage or future billing estimates.

## Preservation

100 paintings, 15 painters, 200 books, 12 certification paths, 1,090 certification questions and 1,000 discoveries remain. Existing backgrounds, notes, bookmarks, reading positions, essays, content notices, exports and other room features are retained. Technical Tutor provider tests remain outside this Art Room-only package.

## Final checks

- Production build, TypeScript compilation and asset-budget check pass.
- 1,061 unit tests pass, including old-format acceptance, new-field bounds and non-destructive backup merging.
- 74 browser tests pass, including the earlier Art Room suite and eight new workflow/responsive checks. New responsive checks cover 390, 768 and 1440 px and automated WCAG A/AA checks for tested states.
- Lint: no errors, one pre-existing StudyAccount.tsx navigation warning.
- Editorial-depth audit: 100 paintings, 20 signature studies, no repeated substantive paragraphs by the exact-normalization check, no citation-index issues. Curated-image and unrelated learning-inventory checks pass.
- Visually inspected the desktop curator opening, private exhibition editor and walkthrough, phone exhibition editor, and the two uncropped related versions.
- Browser testing found an unstable exact label lookup when saved comparison prose reloaded. The textarea now has an explicit accessible label; reverse-pair reload and draft protection pass.
- Final raw build assets: JavaScript approximately 8.74 MB, CSS approximately 607 KB, images 44,825,860 bytes, packed books 90,791,154 bytes. The book total is unchanged.

Technical checks are not a claim of independent scholarly peer review or a real-participant usability study. No production publishing took place.
