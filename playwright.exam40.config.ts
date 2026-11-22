import {defineConfig} from '@playwright/test';
import base from './playwright.dai45.config';
export default defineConfig({...base,testMatch:['**/exam40-depth.spec.ts'],outputDir:'test-results/exam40'});
