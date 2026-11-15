// Lossless one-time/import conversion. Originals remain in Git history; .gz files retain every source byte.
import {readdir,readFile,writeFile,mkdir,rename,unlink} from 'node:fs/promises';
import {gzipSync,gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import path from 'node:path';
const root=process.cwd(),dir=path.join(root,'data/reading');await mkdir(dir,{recursive:true});
const legacy=path.join(root,'public/reading');
let input=[];try{input=(await readdir(legacy)).filter(n=>/^\d+\.(json|txt)$/.test(n));}catch(e){if(e.code!=='ENOENT')throw e;}
for(const name of input){const bytes=await readFile(path.join(legacy,name)),packed=gzipSync(bytes,{level:9});if(!gunzipSync(packed).equals(bytes))throw Error('Lossless check failed: '+name);const target=path.join(dir,name+'.gz');await writeFile(target+'.tmp',packed);await rename(target+'.tmp',target);await unlink(path.join(legacy,name));}
const names=(await readdir(dir)).filter(n=>/^\d+\.(json|txt)\.gz$/.test(n)).sort(),files={};let originalBytes=0,packedBytes=0;
for(const name of names){const packed=await readFile(path.join(dir,name)),raw=gunzipSync(packed),file=name.slice(0,-3);files[file]={bytes:raw.length,packedBytes:packed.length,sha256:createHash('sha256').update(raw).digest('hex')};originalBytes+=raw.length;packedBytes+=packed.length;}
if(names.length!==400||new Set(names.map(n=>n.split('.')[0])).size!==200)throw Error('Expected all 200 book pairs');
const manifest={version:1,originalBytes,packedBytes,files};await writeFile(path.join(dir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({books:200,files:names.length,originalBytes,packedBytes,savedBytes:originalBytes-packedBytes,percentSaved:((originalBytes-packedBytes)/originalBytes*100).toFixed(2)},null,2));
