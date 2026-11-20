import fs from 'node:fs/promises';
import sharp from 'sharp';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile),images=JSON.parse(await fs.readFile('data/art/images.json','utf8')),output={};
const ids=['monet-01','van-gogh-01','leonardo-01','vermeer-01','gentileschi-05'];
await fs.mkdir('tmp/art-quality',{recursive:true});
for(const id of ids){const r=images.find(x=>x.id===id);if(!r||!['Public domain','CC0'].includes(r.rights))throw Error('Unreviewed rights');let raw='tmp/art-originals/'+id;let m=await sharp(raw).metadata();if(Math.max(m.width,m.height)<1800){const target='tmp/art-quality/'+id;try{await fs.access(target);}catch{try{await run('curl',['-fLsS','--max-time','35','--max-filesize','45000000',r.originalUrl.split('?')[0],'-o',target]);}catch{console.log('Retain source resolution:',id);continue;}}raw=target;m=await sharp(raw,{limitInputPixels:300000000}).metadata();}
if(Math.max(m.width,m.height)<=Math.max(r.width,r.height)){console.log('No genuine resolution gain:',id);continue;}
const file='public/images/art/'+id+'-detail.webp';let buffer=await sharp(raw,{limitInputPixels:300000000}).rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).webp({quality:82}).toBuffer();if(buffer.length>430000)buffer=await sharp(raw,{limitInputPixels:300000000}).rotate().resize({width:2100,height:2100,fit:'inside',withoutEnlargement:true}).webp({quality:75}).toBuffer();for(const quality of [70,62,54]){if(buffer.length<=400000)break;buffer=await sharp(raw,{limitInputPixels:300000000}).rotate().resize({width:2100,height:2100,fit:'inside',withoutEnlargement:true}).webp({quality}).toBuffer();}if(buffer.length>500000){console.log('Detail variant exceeds byte budget:',id);continue;}await fs.writeFile(file,buffer);const meta=await sharp(buffer).metadata();output[id]={image:'/images/art/'+id+'-detail.webp',width:meta.width,height:meta.height,bytes:buffer.length,source:r.imageSource,rights:r.rights,licenseUrl:r.licenseUrl};console.log('Improved',id,meta.width,meta.height,buffer.length);}
await fs.writeFile('data/art/detail-images.json',JSON.stringify(output,null,2)+'\n');
