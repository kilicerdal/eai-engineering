import { publicPageMetadata } from "@/lib/public-metadata";
import WelcomeHome from '@/components/WelcomeHome';
import {facts} from '../study/curiosity/facts';
export const metadata={...publicPageMetadata('/start','Start with curiosity | eAI','Choose engineering projects, learning or interactive discoveries.'),title:'Start with curiosity | eAI',description:'Explore, read or practice. One welcoming starting point for your next small discovery.'};
export default function Page(){const f=facts.find(f=>f.id==='antikythera-gears')!;return <WelcomeHome discovery={{title:f.title,text:f.text,source:f.source,url:f.url}}/>;}
