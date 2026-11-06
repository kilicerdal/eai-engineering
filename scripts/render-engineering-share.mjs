import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  for (const name of ["order-once", "claim-twice"]) {
    const svg = await readFile(
      `public/images/engineering/${name}-share.svg`,
      "utf8",
    );
    await page.setContent(
      "<!doctype html><html><head><style>body{margin:0}</style></head><body>" +
        svg +
        "</body></html>",
    );
    await page.screenshot({
      path: `public/images/engineering/${name}-share.png`,
    });
  }
} finally {
  await browser.close();
}
