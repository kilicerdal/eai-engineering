'use client';
import {useArtGallery} from './useArtGallery';
export default function ArtSave({id}:{id:string}){const {gallery,ready,error,notice,toggle}=useArtGallery(),saved=gallery.ids.includes(id);return <div className="art-save"><button disabled={!ready||!!error} aria-pressed={saved} onClick={()=>toggle(id)}>{saved?'Saved to My Gallery ✓':'Save to My Gallery +'}</button>{error?<p role="alert">{error}</p>:<p role="status">{notice||'A private collection in this browser. Nothing is sent to AI.'}</p>}</div>;}
