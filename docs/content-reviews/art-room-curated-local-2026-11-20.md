# Art Room curated local upgrade — 2026-11-20

Status: local only; not committed, pushed or published. Builds on production commit 62ed170b.

## The 25 requested areas

1. Three-choice entrance: paintings, painters, eras. Existing collection controls and routes retained.
2. Ten flagship essays: Leonardo 01/02, Michelangelo 02, Raphael 01, Caravaggio 01, Rembrandt 01, Vermeer 01, Goya 01, Monet 01, Van Gogh 01. Each exceeds 700 words and seven sections.
3. All 15 painter biographies expanded with career/practice discussion.
4. Patronage, audience and original setting developed within the flagship essays.
5. Visual analysis describes spatial organization, handling, gesture and attention.
6. Symbolism is distinguished from documented intention.
7. Debated identifications and interpretation explicitly qualified.
8. Two genuine higher-resolution variants: Monet 01 and Gentileschi 05. Every original retained; no AI reconstruction or fake upscaling.
9. Optional three-detail studies for the ten flagships, using licensed reproduction crops.
10. Thirty work-specific annotations, with keyboard-accessible explanations. Raphael, Caravaggio and Rembrandt coordinates checked visually and adjusted.
11. Original scale visualization preserves both physical axes; absent dimensions are not invented.
12. Material/technique discussion expanded, with corrected Raphael fresco/panel labels.
13. Conservation/reconstruction case studies distinguish current appearance, research and original paint.
14. A selective three-work visual career chronology for each painter, with subject notices respected.
15. Four additional purpose-led comparison pairs; existing comparisons retained.
16. Historical reception developed within flagship essays.
17. Influence and legacy discussed with uncertainty distinguished from proof.
18. Institutional collection references, corrected metadata links and source-index checks.
19. Quieter artwork opening: painting, short orientation, essay link, Save; secondary tools grouped.
20. Browser-local essay section and read-state continuity, explicit resume only, included in existing backup/restore. No automatic scrolling on page open.
21. Related suggestions explain the specific visual comparison; fallback themes are not presented as historical influence.
22. Painting-specific reflection prompts beside private notes; never overwrite notes.
23. Structural/editorial audit of all 100 records, selected factual corrections, duplicate-paragraph checks. This is not an independent specialist review of all historical claims.
24. Phone/tablet/desktop checks at 390, 768 and 1440 pixels, including largest text setting.
25. Keyboard controls, visible focus, touch targets, subject notices, reduced motion, whole-image proportions and WCAG A/AA automated checks.

## Preservation and size

- Inventory: 100 paintings; 15 painters; 1,000 discoveries; 200 books; 12 certification paths; 1,090 questions.
- Original image and thumbnail files remain intact. New detail files total 622,392 bytes.
- Existing personal storage keys and schema version remain unchanged. Optional reading positions are accepted without requiring legacy records to have that field.
- Raw JavaScript budget adds a bounded 32 KiB allowance for curated metadata, continuity and viewer controls. Build report records actual size. This is not an estimate of Vercel retained storage or account costs.
- Existing backgrounds, manuscripts and unrelated features retained.

## Review limits

Higher-resolution upgrades depend on available licensed source pixels; only two justified variants were added. The other reproductions retain their originals. Institutional sources support selected factual corrections and the expanded essays; the collection-wide audit checks structure and source metadata, not every claim against every external page. An independent art-history editorial review remains distinct from automated verification.

## Evidence

- artifacts/art-room/curated-collection-review.json
- artifacts/art-room/browser-results.json
- artifacts/art-room/visual-entrance.png, visual-painting.png, visual-career.png
- artifacts/art-room/curated-reading-390.png, -768.png, -1440.png
- artifacts/learning50-size-budget.json
- Unit tests, production build and local Playwright suite; final results recorded in the completion response.

Final validation: 1,050 unit tests passed; the 16 Art Room unit tests were rerun after the final metadata corrections and passed. All 51 browser checks passed. Production build and raw asset budget passed. ESLint has zero errors and one pre-existing StudyAccount navigation warning. Final screenshots were visually inspected. Local preview: http://127.0.0.1:3038/study/art .
