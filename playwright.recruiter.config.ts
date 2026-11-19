import {defineConfig,devices} from '@playwright/test';
import base from './playwright.engineering.config';
export default defineConfig({...base,
 testMatch:['**/recruiter-review.spec.ts'],globalTimeout:10*60*1000,
 reporter:[['list'],['json',{outputFile:'artifacts/recruiter-review/results.json'}],['html',{outputFolder:'artifacts/recruiter-review/html',open:'never'}]],
 outputDir:'test-results/recruiter-review',
 projects:[
  {name:'chromium-desktop',use:{...devices['Desktop Chrome']}},
  {name:'chromium-mobile',use:{browserName:'chromium',viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1}},
  {name:'firefox-desktop',use:{...devices['Desktop Firefox']}},
  {name:'firefox-narrow',use:{browserName:'firefox',viewport:{width:390,height:844},hasTouch:true,deviceScaleFactor:1}},
  {name:'webkit-desktop',use:{...devices['Desktop Safari']}},
  {name:'webkit-mobile',use:{...devices['iPhone 13'],deviceScaleFactor:1}},
 ],
});
