import {defineConfig} from '@playwright/test';import base from './playwright.dai45.config';
export default defineConfig({...base,testMatch:['**/reading40-scholar.spec.ts'],outputDir:'test-results/reading40'});
