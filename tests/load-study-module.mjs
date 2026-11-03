import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const ts=createRequire(import.meta.url)('typescript'),cache=new Map();
export function loadStudyModule(name){
 if(cache.has(name))return cache.get(name);
 const m={exports:{}};const code=ts.transpileModule(readFileSync(new URL(`../src/lib/${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 new Function('require','module','exports',code)(dep=>loadStudyModule(dep.slice(2)),m,m.exports);cache.set(name,m.exports);return m.exports;
}
