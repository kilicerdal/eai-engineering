# Website discoverability, accessibility and field performance

## Public review journey

The homepage retains its approved artwork and composition. Existing project links lead to `/engineering/tour`, which now offers direct Demo, Source and Evidence links for the three selected projects, followed by the existing guided stops. All results are labelled recorded and synthetic. The tour does not execute production services.

`/robots.txt` advertises the sitemap and excludes API, authentication, recruiter and personal-work routes. This is crawler guidance, not an access control. The sitemap is an explicit public-page allowlist; it excludes drafts, private invitations and account content. Primary public pages have scoped canonicals and route-specific sharing metadata. The existing checkout and claim PNGs are reused; general links and SettlementLab use 1200×630 PNG cards rendered by the built-in ImageResponse API so a tall dashboard screenshot is not cropped into a social thumbnail. No artwork assets are changed. Social crawlers can cache previews, so an existing LinkedIn post may require a fresh scrape to reflect new metadata.

## Accessibility and deferred work

The homepage skip link now stays on the page and focuses its heading. Mobile navigation supports Arrow Down, Escape with focus return, normal Tab navigation and dismissal outside the header. Visible focus rings and the existing reduced-motion rules are tested. The accessible atlas HTML and all artwork stay server-rendered. Only decorative connection drawing is imported when the atlas approaches the viewport; resize observers attach then and disconnect on cleanup. If that import fails, the text, filters and node controls remain usable.

## Actual visitor measurements

The built-in `next/web-vitals` client reports LCP, CLS and INP to the first-party `/api/performance` endpoint for documents initially opened at `/`. Core Web Vitals are document-lifecycle measurements; subsequent client navigation remains part of that entry document, not an individual route score. INP requires an interaction and some metrics finalize when the page becomes hidden. Automated browsers, DNT, GPC, blocked storage and the local opt-out suppress reporting.

The payload contains only metric name, numeric value and a mobile/desktop viewport bucket. Server code validates ranges and exact field names, rejects cross-origin requests, bounds the actual body to 512 bytes and applies a best-effort cap of 300 intake attempts per minute per server instance without collecting IPs or visitor identifiers. It logs only `homepage_web_vital`, document scope, allowlisted values, rating and deployment SHA. Public telemetry can be spoofed; it must not drive security or billing decisions. The cap is not a distributed rate limiter.

No analytics cookies, IDs, drafts, messages, saved work, query strings or fragments are sent in metric events. Fetch omits credentials and referrer. Hosting infrastructure separately has its normal request logging. `/privacy` describes this and offers an immediate browser opt-out; learning privacy remains available separately.

## Review results

In the hosting project's runtime Logs, search for `homepage_web_vital` and select the revision and time window. Retention and export availability depend on the existing hosting plan: this change does not buy a plan or add a permanent database. Export available records as NDJSON, then run:

```sh
node scripts/summarize-web-vitals.mjs /path/to/exported-runtime-logs.ndjson
```

The output groups metrics by deployment and viewport category, with sample count, nearest-rank p75 and range. It explicitly labels samples under 20 as small. Do not interpret the export as unique visitors, a complete population or proof of field Core Web Vitals compliance. No genuine visitor results are claimed at deployment; wait for actual usage.

Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:browser:ci` before deployment. The production monitor remains read-only; it also checks `/privacy`. The browser regression suite validates SEO files, sharing-image responses, keyboard behavior, accessibility, deferred atlas startup, telemetry privacy controls and the three-project route.

Reference: [Next.js web vitals](https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals), [lazy loading](https://nextjs.org/docs/app/guides/lazy-loading).
