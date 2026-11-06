import base from './playwright.engineering.config';
import {defineConfig} from '@playwright/test';
export default defineConfig({...base,testMatch:['**/study-layout.spec.ts'],reporter:'list',outputDir:'test-results/study-layout'});
