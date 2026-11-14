import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const ts=createRequire(import.meta.url)('typescript'),cache=new Map();
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file);const mod={exports:{}};new Function('require','module','exports',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(name=>load(path.resolve(path.dirname(file),name+'.ts')),mod,mod.exports);cache.set(file,mod.exports);return mod.exports;}
const books=load('src/lib/study-reading.ts').readingBooks,editions=load('src/lib/reading/editions.ts').readingEditions,chapters=load('src/lib/reading/navigation.ts').readingChapters,intros=load('src/lib/reading/introductions.ts').readingIntroductions;
if(books.length!==200)throw Error('Expected 200');fs.writeFileSync('/private/tmp/reading-v30-metadata.json',JSON.stringify({books,editions,chapters,intros}));
