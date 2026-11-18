import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'./tests/monitoring',forbidOnly:true,fullyParallel:false,retries:0,workers:1,
 timeout:30000,globalTimeout:4*60*1000,
 reporter:[['list'],['html',{outputFolder:'artifacts/production/browser-html',open:'never'}],['json',{outputFile:'artifacts/production/browser.json'}]],
 outputDir:'test-results/production',
 use:{baseURL:'https://www.eai.engineering',serviceWorkers:'block',trace:'retain-on-failure',screenshot:'only-on-failure'},
 projects:[{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1}}],
});
