# Hourly local Art Room review — November 21, 2026, 09:38 Eastern

Scope: bounded accessibility correction in the existing dark fullscreen viewer. Nothing published, pushed or deployed.

## Reproduced issue

The rendered “Fit whole sheet” button had pale text (245, 239, 223) over the pale hover background (221, 215, 198): approximately 1.25:1 contrast. This was also possible on the other viewer buttons when hovered. The control appeared washed out despite being active.

## Local correction

Scoped the viewer’s hover and pressed buttons to dark gallery ink on the existing light control surface. The computed color pair now provides approximately 9.40:1 contrast. Other gallery controls, artwork, images, notes and viewer behavior remain intact. No JavaScript or saved-data format change was required.

## Verification

- Inspected rendered before/after screenshots.
- New browser check measures actual computed foreground/background contrast for hovered Look closer, Zoom in and Close controls, then the pressed fit control after the pointer leaves. Each meets 4.5:1. Fit-to-whole and Escape close still work.
- All 21 focused paper/Looking Room browser checks passed, including mobile layouts, looking tools, comparisons, notes, viewing preferences and recent navigation/loading fixes.
- Scoped test lint, TypeScript, production build, packed-book audit and bounded size checks passed; `git diff --check` passed.

All 200 books and saving formats remain intact. The wider 110-outcome package remains in progress; the implemented-outcome count has not been inflated. Preview: http://127.0.0.1:3038/study/art/on-paper.
