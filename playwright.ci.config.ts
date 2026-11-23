import {defineConfig} from '@playwright/test';
import base from './playwright.engineering.config';

// One production build serves both existing suites; no live integrations required.
export default defineConfig({...base,
 testMatch:[...base.testMatch as string[], '**/study-layout.spec.ts', '**/practice-learning50.spec.ts', '**/site-refinement.spec.ts', '**/site-polish.spec.ts', '**/connected-visit.spec.ts', '**/tutor-visit.spec.ts', '**/tutor-guidance.spec.ts', '**/try-one-idea.spec.ts', '**/tutor-reliability.spec.ts', '**/site-discoverability.spec.ts', '**/signature-package.spec.ts', '**/short-experiences.spec.ts', '**/quiet-package.spec.ts','**/foundation-learning.spec.ts','**/learning-depth.spec.ts','**/transfer-check.spec.ts','**/site-consolidation.spec.ts','**/art-room.spec.ts','**/art-room-upgrade.spec.ts','**/art-experience45.spec.ts','**/art-writing35.spec.ts','**/art-finishing.spec.ts','**/art-writing-history35.spec.ts','**/art-picasso-paper.spec.ts','**/art-learning.spec.ts','**/simple-entry.spec.ts','**/foundation-quality-v14.spec.ts','**/dai45-workbench.spec.ts','**/dai25-polish.spec.ts','**/exam40-depth.spec.ts','**/reading40-scholar.spec.ts'],
 globalTimeout:20*60*1000,
 reporter:[['list'],['html',{outputFolder:'artifacts/browser-ci/html',open:'never'}],['json',{outputFile:'artifacts/browser-ci/results.json'}]],
 outputDir:'test-results/browser-ci',
 use:{...base.use,serviceWorkers:'block'},
});
