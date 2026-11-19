import {readFileSync,existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import {posix} from 'node:path';
const ts=createRequire(import.meta.url)('typescript'),cache=new Map();
export function loadStudyModule(name){
 if(cache.has(name))return cache.get(name);
 const m={exports:{}};const code=ts.transpileModule(readFileSync(new URL(`../src/lib/${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 new Function('require','module','exports',code)(dep=>{const relative=posix.normalize(posix.join(posix.dirname(name),dep));return loadStudyModule(existsSync(new URL(`../src/lib/${relative}.ts`,import.meta.url))?relative:dep.slice(2));},m,m.exports);cache.set(name,m.exports);return m.exports;
}
