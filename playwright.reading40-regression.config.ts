import {defineConfig} from '@playwright/test';import base from './playwright.dai45.config';
export default defineConfig({...base,testMatch:['**/study-layout.spec.ts','**/dai-professional-pass.spec.ts','**/dai-110.spec.ts','**/dai-depth58.spec.ts','**/dai-next-distinct.spec.ts'],outputDir:'test-results/reading40-regression'});
