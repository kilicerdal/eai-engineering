import {defineConfig} from '@playwright/test';
import base from './playwright.ci.config';
export default defineConfig({...base,webServer:undefined,use:{...base.use,baseURL:'http://127.0.0.1:3038'},testMatch:[...base.testMatch as string[],'**/art-room.spec.ts','**/simple-entry.spec.ts','**/foundation-quality-v14.spec.ts'],reporter:[['list'],['json',{outputFile:'artifacts/art-room/regression-results.json'}]],outputDir:'test-results/art-regression'});
