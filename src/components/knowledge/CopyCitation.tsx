'use client';
import {useState} from 'react';

export default function CopyCitation({value,label='Copy citation'}:{value:string;label?:string}){
 const [status,setStatus]=useState('');
 async function copy(){
  try{await navigator.clipboard.writeText(value);setStatus('Citation copied to clipboard.');}
  catch{setStatus('Copy unavailable. Select and copy the citation text.');}
 }
 return <span className="knowledge-copy-control"><button type="button" onClick={copy}>{label}</button><span role="status" aria-live="polite">{status}</span></span>;
}
