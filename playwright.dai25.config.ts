import {defineConfig} from '@playwright/test';
import base from './playwright.dai45.config';
export default defineConfig({...base,testMatch:['**/dai25-polish.spec.ts','**/dai45-workbench.spec.ts','**/study-layout.spec.ts'],outputDir:'test-results/dai25'});
