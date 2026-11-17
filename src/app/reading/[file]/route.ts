import {connection} from 'next/server';
import {packedBook} from '@/lib/reading/packed';
export async function GET(request:Request,{params}:{params:Promise<{file:string}>}){await connection();const {file}=await params;// Vercel manages transport compression; emit original bytes with matching headers.
return packedBook(request,file,{precompressed:false});}
export async function HEAD(request:Request,context:{params:Promise<{file:string}>}){return GET(request,context);}
