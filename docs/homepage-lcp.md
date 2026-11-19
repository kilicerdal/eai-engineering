# Homepage LCP verification

The original homepage artwork, compositions, responsive sizing and image quality are retained. The opening image is eager and high priority so the browser schedules the actual LCP resource immediately. Geist font files remain available on demand; the opening screen uses Arial and Georgia and does not need their global preloads.

## Reproduce

After `npm ci` and `npx playwright install chromium`, run a production build with `npm run build` and `npm run start -- --hostname 127.0.0.1 --port 3063`.

In another shell:

```sh
HOMEPAGE_AUDIT_URL=http://127.0.0.1:3063/ HOMEPAGE_AUDIT_PROFILE=both HOMEPAGE_AUDIT_REVISION=local npm run audit:homepage-performance -- artifacts/homepage-performance/local.json
```

For production, omit `HOMEPAGE_AUDIT_URL` and provide the deployed Git SHA in `HOMEPAGE_AUDIT_REVISION`. Use a quiet machine and run comparisons sequentially. The script performs three cold-browser trials per profile and records exact throttling, LCP element/resource, load timing breakdown, request priority, transfer size and layout shifts. Server/CDN caches and host load are uncontrolled; report medians and ranges, not a single best run.

The browser suite checks that the hero starts exactly one high-priority request using the original source and quality. It deliberately does not enforce a millisecond LCP threshold on a shared CI runner. Run `npm run test:browser:ci` for the complete desktop/mobile suite.

These are synthetic Chromium measurements, not field Core Web Vitals, real-device testing, Lighthouse scores or INP evidence. Use real-user field data when sufficient traffic exists. See [Optimize LCP](https://web.dev/articles/optimize-lcp) for the resource scheduling and timing model.
