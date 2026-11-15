import {connection} from 'next/server';
import {packedBook} from '@/lib/reading/packed';
export async function GET(request:Request,{params}:{params:Promise<{file:string}>}){await connection();const {file}=await params;return packedBook(request,file);}
export async function HEAD(request:Request,context:{params:Promise<{file:string}>}){return GET(request,context);}
