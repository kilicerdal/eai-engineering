import {readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {parseEditorialManuscript} from './editorial-manuscript.mjs';
const output={};let previous={};try{previous=JSON.parse(readFileSync('data/art/editorial-v2.json','utf8'));}catch{/* First build has no previous ordering. */}
for(const kind of ['painters','paintings','eras','essays']){
 output[kind]={};const names=readdirSync(`data/art/editorial-v2/${kind}`).filter(n=>n.endsWith('.md'));
 const order=Object.keys(previous[kind]??{});names.sort((a,b)=>{const ai=order.indexOf(a.slice(0,-3)),bi=order.indexOf(b.slice(0,-3));return (ai<0?Infinity:ai)-(bi<0?Infinity:bi)||a.localeCompare(b);});
 for(const name of names)output[kind][name.slice(0,-3)]=parseEditorialManuscript(readFileSync(`data/art/editorial-v2/${kind}/${name}`,'utf8'));
}
writeFileSync('data/art/editorial-v2.json',JSON.stringify(output,null,2)+'\n');console.log(Object.fromEntries(Object.entries(output).map(([k,v])=>[k,{entries:Object.keys(v).length,words:Object.values(v).reduce((n,e)=>n+e.words,0)}])));
