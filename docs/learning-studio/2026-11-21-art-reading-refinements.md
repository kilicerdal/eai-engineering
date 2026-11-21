# Art Room — twelve reading refinements

Local implementation; not published. This is a refinement package, not twelve new services. Existing reading-depth controls, source maintenance, notebook grouping, and image recovery were extended rather than counted again as entirely new capabilities.

| Approved improvement | Local delivery |
| --- | --- |
| 1. Read beside the work | Painting essays now share the artwork’s two-column layout. On wide screens the proportional original remains alongside the essay; individual passages have a return-to-artwork link. Below 1,100 pixels the layout becomes a single column. |
| 2. Overview and full study | Existing Introduction / Full study / Research choices move immediately after the overview, ahead of auxiliary tools. Full scholarship and stable passage IDs remain available. Existing defaults and bookmarked reading-depth choices are preserved. |
| 3. Distinctive openings | The painting overview opens with its work-specific looking question. Each of 24 paper accounts uses its individual first looking prompt rather than the same generic heading. No undocumented historical claims were added. |
| 4. One useful next step | A relevant drawing/painting connection is offered with its relationship, alongside the first related painting; further painting connections remain expandable. Artist biographies and all retained links remain. |
| 5. Phone comparisons | First work / Second work / Both switches hide without unmounting either comparison. Individual magnification and pan state and captions survive switching. Whole reproductions fit their boxes; deliberate detail mode remains labeled. |
| 6. Reverse captions | The two genuine verso photographs identify their separate subjects. Stage design and anatomical study are distinguished from their front subjects; front-only markers remain front-only. |
| 7. Paper continuity | The last studied sheet/discussion can be resumed from the paper room or My Art. The original version-1 reading/backup format accepts only known paper IDs and bounded discussion anchors. Previous positions stay protected until the visitor resumes or chooses a new place. |
| 8. Reading typography | Narrower line lengths, spaced headings/captions, a single essay contents column within the reading panel, and tested larger-text layouts. No global homepage styling changes. |
| 9. Precise source review | All 13 changed-text flags receive a separate bounded current-page review. Ten readable records and three access-limited responses are differentiated. RCT biography links point to the specific Life and Art article; manuscripts and generated essays agree. Automated hash/access flags remain intact. |
| 10. Compact notebook | Existing artwork groups gain short previews and expandable full notes. Detail-note links reopen their exact saved anchor with parent accordions open. Export retains all words; the print action temporarily opens note groups and restores the prior view. |
| 11. Less repetition | The paper purpose discussion links back to its visible observation instead of repeating it verbatim. Further related paintings and full notebook entries unfold on request. Essential subject, evidence and rights labels remain near the work. |
| 12. Loading and recovery | Viewer aspect ratios reserve the correct geometry, including verso changes. Shared comparison reproductions have an explicit retry/source fallback, recognize failures before hydration, and reset recovery state when the selected work changes. |

## Verification

Completed checks:

- 1,119 unit tests passed.
- Full local regression: 123 browser checks passed; 18 affected editorial/reading checks passed again against the final build after the last small look-first correction. These are reruns, not 141 unique tests.
- Production build, TypeScript, packed-book validation and existing asset budgets passed without increasing an allowance.
- Six final desktop/mobile views at 390 and 1,440 pixels: no horizontal overflow and no scoped WCAG A/AA axe violations. Screenshots were opened and inspected, including the corrected whole comparison image.
- Full lint: zero errors and one pre-existing StudyAccount navigation warning; changed Art Room code has no lint findings.
- `git diff --check` passed. HEAD remains `7bcbe88ba6ef937d50c92b7d0894e2ec44fdee47`.
 Evidence: `artifacts/art-room/reading-refinements/`, `/tmp/art-reading-unit.log`, `/tmp/art-reading-browser.log`, `/tmp/art-reading-build.log`, `/tmp/art-reading-lint.log`, `/tmp/art-reading-types.log`, and `artifacts/learning50-size-budget.json`.

Existing preservation audit: 200 books, 1,000 discoveries, 12 certification paths and 1,090 questions. Original artwork catalog identities, licenses, backgrounds, notes, galleries, observation journals and backup keys remain intact. No new artwork binaries, no change to asset allowances, no commit, push or deployment.

Source-review limits are explicit at `/study/art/editorial-review`. A readable institutional page is not independent scholarly review; a changed text hash is not proof that an attribution changed. The two Guggenheim responses and the Nature reference still need access review.
