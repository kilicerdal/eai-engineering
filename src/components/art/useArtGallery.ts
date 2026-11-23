'use client';
import {useCallback,useEffect,useState} from 'react';
import {ART_GALLERY_KEY,parseArtGallery,type ArtGallery} from '@/lib/art/gallery';
import {artPaintings} from '@/lib/art/collection';
const allowed=new Set(artPaintings.map(p=>p.id));
export function useArtGallery(){
 const [gallery,setGallery]=useState<ArtGallery>({version:1,ids:[]}),[ready,setReady]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState('');
 const refresh=useCallback(()=>{try{setGallery(parseArtGallery(localStorage.getItem(ART_GALLERY_KEY),allowed));setError('');}catch(e){setError(e instanceof Error?e.message:'Your saved gallery could not be read.');}setReady(true);},[]);
 useEffect(()=>{queueMicrotask(refresh);const changed=(e:StorageEvent)=>{if(e.key===ART_GALLERY_KEY||e.key===null)refresh();};window.addEventListener('storage',changed);window.addEventListener('dai-art-gallery-change',refresh);return()=>{window.removeEventListener('storage',changed);window.removeEventListener('dai-art-gallery-change',refresh);};},[refresh]);
 function writeSelection(id:string,selected?:boolean){if(!ready||error||!allowed.has(id))return false;try{const latest=parseArtGallery(localStorage.getItem(ART_GALLERY_KEY),allowed),exists=latest.ids.includes(id),include=selected??!exists;if(exists===include){setGallery(latest);return true;}const next:ArtGallery={version:1,ids:include?[...latest.ids,id]:latest.ids.filter(x=>x!==id)};localStorage.setItem(ART_GALLERY_KEY,JSON.stringify(next));setGallery(next);setNotice(include?'Saved to My Gallery in this browser.':'Removed from My Gallery.');window.dispatchEvent(new Event('dai-art-gallery-change'));window.dispatchEvent(new CustomEvent('dai-browser-save',{detail:{key:ART_GALLERY_KEY,ok:true}}));return true;}catch(e){setError(e instanceof Error?e.message:'Saving failed. Your earlier gallery is unchanged.');window.dispatchEvent(new CustomEvent('dai-browser-save',{detail:{key:ART_GALLERY_KEY,ok:false}}));return false;}}
 function toggle(id:string){return writeSelection(id);}
 function setSaved(id:string,selected:boolean){return writeSelection(id,selected);}
 function download(){try{const raw=localStorage.getItem(ART_GALLERY_KEY)??JSON.stringify(gallery),url=URL.createObjectURL(new Blob([raw],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='dai-my-art-gallery.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch{setNotice('Download was unavailable. Your saved gallery was not changed.');}}
 return {gallery,ready,error,notice,toggle,setSaved,download};
}
