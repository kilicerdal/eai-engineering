import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {gunzipSync} from 'node:zlib';
import manifest from '../../../data/reading/manifest.json';
type FileInfo={bytes:number;packedBytes:number;sha256:string};
const files:Record<string,FileInfo>=manifest.files;
export function bookEncoding(value:string|null,gzipAvailable=true){const entries=new Map((value??'').split(',').map(part=>{const [name,...params]=part.trim().toLowerCase().split(';');const quality=params.find(p=>p.trim().startsWith('q='));const n=quality?Number(quality.trim().slice(2)):1;return [name,Number.isFinite(n)&&n>=0&&n<=1?n:0];}));const gzip=entries.get('gzip')??entries.get('*')??0,identity=entries.get('identity')??(entries.get('*')===0?0:1);return gzipAvailable&&gzip>0?'gzip':identity>0?'identity':null;}
export function bookInfo(file:string){return /^\d+\.(json|txt)$/.test(file)&&Object.hasOwn(files,file)?files[file]:null;}
export async function packedBook(request:Request,file:string,{precompressed=true}:{precompressed?:boolean}={}){const info=bookInfo(file);if(!info)return new Response('Book not found',{status:404,headers:{'Cache-Control':'no-store'}});const encoding=bookEncoding(request.headers.get('accept-encoding'),precompressed);if(!encoding)return new Response('No acceptable encoding',{status:406,headers:{'Vary':'Accept-Encoding','Cache-Control':'no-store'}});
 const etag=`W/"${info.sha256}${precompressed?'':'-identity-v2'}"`,headers=new Headers({'Content-Type':file.endsWith('.json')?'application/json; charset=utf-8':'text/plain; charset=utf-8','Cache-Control':'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600','Vary':'Accept-Encoding','ETag':etag,'X-Content-Type-Options':'nosniff'});
 if(encoding==='gzip')headers.set('Content-Encoding','gzip');
 const tags=request.headers.get('if-none-match')?.split(',').map(s=>s.trim().replace(/^W\//,''));if(tags?.includes('*')||tags?.includes(etag.replace(/^W\//,'')))return new Response(null,{status:304,headers});
 headers.set('Content-Length',String(encoding==='gzip'?info.packedBytes:info.bytes));if(request.method==='HEAD')return new Response(null,{headers});
 try{const packed=await readFile(path.join(process.cwd(),'data/reading',file+'.gz'));if(packed.length!==info.packedBytes)throw Error('Incomplete archive');const body=encoding==='gzip'?packed:gunzipSync(packed);return new Response(new Uint8Array(body),{headers});}catch{return new Response('Book temporarily unavailable. Your saved work is unchanged.',{status:503,headers:{'Cache-Control':'no-store'}});}
}
