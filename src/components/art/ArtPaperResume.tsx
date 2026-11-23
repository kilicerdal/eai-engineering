'use client';
import {useArtPersonal} from './useArtPersonal';
import {PAPER_IDS} from '@/lib/art/paper-viewing';
export default function ArtPaperResume({titles={}}:{titles?:Record<string,string>}){const {personal,ready,error}=useArtPersonal(),entry=Object.entries(personal.reading??{}).filter(([id,r])=>PAPER_IDS.has(id)&&!r.completed).at(-1);return ready&&!error&&entry?<p className="art-paper-resume"><a href={'#'+entry[1].section}>Continue studying: {titles[entry[0]]??'your saved sheet'} ↓</a></p>:null;}
