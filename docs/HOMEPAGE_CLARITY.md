# Homepage clarity and loading review

Reviewed November 18, 2026. The original artwork assets and their section order are retained.

## Visitor paths

The opening explains engineering projects, learning and the assistant in one sentence. Engineering and Learning are the two primary actions; chat remains a visible text link. The longer historical introduction is available in a disclosure instead of occupying the first phone screen.

The homepage section navigation links to real layout containers: `#project-work`, `#learning`, `#artwork` and `#contact`. On phones it stays available while scrolling. Keyboard activation moves focus to the destination without invoking legacy `#projects` redirects. A short professional introduction sits beside the selected projects.

## Measured loading change

Three cold-context Chromium baseline samples of the previous published revision (`d80fa75bbc1c8021ec321cdbdb897c0ebc4e2326`) transferred 1,840,633 bytes in the initial viewport. Median observed LCP was 1,728 ms, CLS was zero, and load-event completion was about 10.4 seconds under the configured mobile lab profile. A 284,420-byte response for the distant Barcelona background was part of that initial transfer.

The same background now uses a native lazy, responsive Next Image inside its existing positioned backdrop and gradient. Its artwork and placement are unchanged. This avoids loading it at first paint; it still loads when the About section is approached. Regression tests verify both behaviors. Existing heritage images remain at their original proportions.

## Reproduce the profile

```sh
npm ci
npx playwright install chromium
HOMEPAGE_AUDIT_REVISION=<published-git-sha> npm run audit:homepage-performance -- artifacts/homepage-performance/review.json
```

For a local production server, set `HOMEPAGE_AUDIT_URL=http://127.0.0.1:3061/` and revision `local`. The tool accepts only the public eAI site or loopback, opens fresh anonymous contexts, and blocks API/provider/analytics URLs. It does not send chats or access accounts.

The profile configures a 390×844 viewport, DPR 1, 4× CPU slowdown, 150 ms latency, 1.6 Mbps download and 0.75 Mbps upload, with browser cache disabled. It records three samples, largest resources, LCP, CLS and observed long-task blocking. CDN cache and host load are uncontrolled. These are synthetic observations, not field Core Web Vitals, Lighthouse scores, INP measurements or a guarantee for every device. Compare the same conditions after deployment and retain results with the deployment report; do not overwrite this dated baseline to imply a fresh run.
