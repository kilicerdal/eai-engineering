import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const url = process.env.HOMEPAGE_AUDIT_URL || 'https://www.eai.engineering/';
const target = new URL(url);
const publicSite = target.protocol === 'https:' && ['www.eai.engineering', 'eai.engineering'].includes(target.hostname);
const localSite = ['http:', 'https:'].includes(target.protocol) && ['127.0.0.1', 'localhost', '[::1]'].includes(target.hostname);
if ((!publicSite && !localSite) || target.username || target.password || target.search || target.hash || target.pathname !== '/') {
  throw new Error('Use the public eAI homepage or a credential-free loopback URL.');
}
const revision = process.env.HOMEPAGE_AUDIT_REVISION || null;
if (revision && !/^(?:[a-f0-9]{7,40}|local)$/.test(revision)) throw new Error('Revision must be a Git SHA or local.');
const selection = process.env.HOMEPAGE_AUDIT_PROFILE || 'mobile';
if (!['mobile', 'desktop', 'both'].includes(selection)) throw new Error('Profile must be mobile, desktop or both.');
const profiles = [
  { id: 'mobile', width: 390, height: 844, latencyMs: 150, downloadMbps: 1.6, uploadMbps: .75, cpuSlowdown: 4 },
  { id: 'desktop', width: 1440, height: 1000, latencyMs: 40, downloadMbps: 10, uploadMbps: 5, cpuSlowdown: 1 },
].filter(profile => selection === 'both' || profile.id === selection);
const output = process.argv[2] || 'artifacts/homepage-performance/latest.json';
const browser = await chromium.launch();
const results = [];
try {
  for (const profile of profiles) for (let trial = 1; trial <= 3; trial++) {
    const context = await browser.newContext({ viewport: { width: profile.width, height: profile.height }, deviceScaleFactor: 1, isMobile: profile.id === 'mobile', hasTouch: profile.id === 'mobile' });
    const page = await context.newPage();
    await page.addInitScript(() => {
      performance.setResourceTimingBufferSize(2000);
      window.__homepageAudit = { lcp: null, history: [], cls: 0, longTasks: [] };
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const element = entry.element;
          const sample = {
            startTime: entry.startTime, renderTime: entry.renderTime, loadTime: entry.loadTime,
            size: entry.size, url: entry.url,
            element: element ? { tag: element.tagName, id: element.id, className: typeof element.className === 'string' ? element.className : null } : null,
          };
          window.__homepageAudit.lcp = sample;
          window.__homepageAudit.history.push(sample);
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__homepageAudit.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__homepageAudit.longTasks.push(entry.duration); }).observe({ type: 'longtask', buffered: true });
    });
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.setBlockedURLs', { urls: ['*/api/*', '*supabase.co/*', '*cloudflare.com/*', '*vercel-insights.com/*', '*googletagmanager.com/*'] });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: profile.latencyMs, downloadThroughput: profile.downloadMbps * 1000000 / 8, uploadThroughput: profile.uploadMbps * 1000000 / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: profile.cpuSlowdown });
    const requests = [];
    cdp.on('Network.requestWillBeSent', event => { if (event.type === 'Image') requests.push({ id: event.requestId, url: event.request.url, initialPriority: event.request.initialPriority, finalPriority: event.request.initialPriority }); });
    cdp.on('Network.resourceChangedPriority', event => { const request = requests.find(request => request.id === event.requestId); if (request) request.finalPriority = event.newPriority; });
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    if (!response || response.status() !== 200) throw new Error(`Homepage returned HTTP ${response?.status()}`);
    await page.locator('#hero-title').waitFor({ state: 'attached' });
    await page.waitForTimeout(2000);
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');
      const audit = window.__homepageAudit;
      const lcp = audit.lcp;
      if (!lcp) throw new Error('No LCP sample was observed.');
      const resource = resources.find(resource => resource.name === lcp.url);
      const hero = document.querySelector('.atlas-landscape');
      return {
        lcpMs: lcp.startTime, lcp, lcpHistory: audit.history, cls: audit.cls,
        fcpMs: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
        ttfbMs: nav.responseStart, loadEventMs: nav.loadEventEnd,
        observedBlockingMs: audit.longTasks.reduce((sum, duration) => sum + Math.max(0, duration - 50), 0),
        transferBytes: resources.reduce((sum, resource) => sum + resource.transferSize, nav.transferSize),
        resourceCount: resources.length,
        lcpResource: resource ? { url: resource.name, startMs: resource.startTime, requestMs: resource.requestStart, responseStartMs: resource.responseStart, endMs: resource.responseEnd, bytes: resource.transferSize } : null,
        lcpBreakdown: {
          ttfbMs: nav.responseStart,
          resourceLoadDelayMs: resource ? Math.max(0, resource.startTime - nav.responseStart) : 0,
          resourceLoadDurationMs: resource ? resource.responseEnd - resource.startTime : 0,
          renderDelayMs: Math.max(0, lcp.startTime - (resource?.responseEnd ?? nav.responseStart)),
        },
        largestResources: resources.filter(resource => resource.transferSize > 0).sort((a, b) => b.transferSize - a.transferSize).slice(0, 8).map(resource => ({ url: resource.name, bytes: resource.transferSize, durationMs: resource.duration })),
        imageBytes: resources.filter(resource => resource.initiatorType === 'img').reduce((sum, resource) => sum + resource.transferSize, 0),
        heroSrc: hero?.currentSrc, heroNatural: [hero?.naturalWidth, hero?.naturalHeight], viewport: [innerWidth, innerHeight],
      };
    });
    const lcpRequests = requests.filter(request => request.url === metrics.lcp.url);
    const result = { profile: profile.id, trial, httpStatus: response.status(), ...metrics, lcpRequests };
    results.push(result);
    console.log(JSON.stringify({ profile: profile.id, trial, lcpMs: metrics.lcpMs, cls: metrics.cls, transferBytes: metrics.transferBytes, lcpElement: metrics.lcp.element, lcpRequests }));
    await context.close();
  }
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify({ phase: 'audit', url, recordedAt: new Date().toISOString(), declaredRevision: revision, profiles, conditions: { engine: 'Chromium synthetic lab; not field Core Web Vitals, Lighthouse or INP', cache: 'disabled in fresh anonymous contexts; CDN cache uncontrolled', requests: 'API/provider/analytics URLs blocked via CDP; no request interception', sample: 'initial viewport, no scrolling; 2 seconds after network idle' }, results }, null, 2));
} finally { await browser.close(); }
