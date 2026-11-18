import {defineConfig} from '@playwright/test';
import base from './playwright.engineering.config';

// One production build serves both existing suites; no live integrations required.
export default defineConfig({...base,
 testMatch:[...base.testMatch as string[], '**/study-layout.spec.ts', '**/practice-learning50.spec.ts'],
 globalTimeout:15*60*1000,
 reporter:[['list'],['html',{outputFolder:'artifacts/browser-ci/html',open:'never'}],['json',{outputFile:'artifacts/browser-ci/results.json'}]],
 outputDir:'test-results/browser-ci',
 use:{...base.use,serviceWorkers:'block'},
});
