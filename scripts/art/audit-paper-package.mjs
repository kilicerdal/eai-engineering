/** Local file and evidence integrity. This is not specialist authentication. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const objects=(await read('data/art/research/on-paper-acquisition.json')).records;
const studies=(await read('data/art/research/on-paper.json')).studies;
const rows=[],issues=[],hashes=new Map();let bytes=0;
for(const r of objects){
 const paths=[{side:'front',...r},...(studies[r.id].reverse?[{side:'back',...studies[r.id].reverse}]:[])];
 for(const p of paths){const file=await fs.readFile('public'+p.image),meta=await sharp(file).metadata(),hash=createHash('sha256').update(file).digest('hex');bytes+=file.length;
 const checks={geometry:meta.width===p.width&&meta.height===p.height,rights:p.rights==='CC0'||p.rights==='Public domain',institutionalSource:new URL(p.source).protocol==='https:',uniqueImage:!hashes.has(hash)};
 for(const [check,ok]of Object.entries(checks))if(!ok)issues.push(`${r.id}/${p.side}: ${check}`);hashes.set(hash,r.id+'/'+p.side);rows.push({id:r.id,side:p.side,image:p.image,bytes:file.length,width:meta.width,height:meta.height,checks});
 }
}
if(objects.length!==24)issues.push('24 paper records required');
if(bytes>12*1024*1024)issues.push('Paper images exceed the 12 MiB allowance');
const report={checked:new Date().toISOString(),scope:'Asset geometry, distinct photographs, source fields and explicit reuse labels. Does not independently authenticate historical attribution or every source claim.',objects:objects.length,images:rows.length,bytes,rows,issues};
await fs.mkdir('artifacts/art-room',{recursive:true});await fs.writeFile('artifacts/art-room/paper-package-review.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({objects:objects.length,images:rows.length,bytes,issues},null,2));if(issues.length)process.exitCode=1;
