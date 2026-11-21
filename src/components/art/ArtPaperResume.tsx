'use client';
import {useArtPersonal} from './useArtPersonal';
import {PAPER_IDS} from '@/lib/art/paper-viewing';
export default function ArtPaperResume(){const {personal,ready}=useArtPersonal(),entry=Object.entries(personal.reading??{}).filter(([id,r])=>PAPER_IDS.has(id)&&!r.completed).at(-1);return ready&&entry?<p className="art-paper-resume"><a href={'#'+entry[1].section}>Continue studying your saved sheet ↓</a></p>:null;}
