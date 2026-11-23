'use client';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {accountConfigured} from '@/lib/study-account';
import BrandWordmark from './BrandWordmark';

export default function StudyNavigation({overlay=false}:{overlay?:boolean}){
 const path=usePathname(),[menuOpen,setMenuOpen]=useState(false),[more,setMore]=useState(false),[hash,setHash]=useState('');
 useEffect(()=>{const sync=()=>setHash(window.location.hash);queueMicrotask(sync);window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('popstate',sync);};},[path]);
 useEffect(()=>{const heading=document.querySelector<HTMLElement>('main h1');if(!heading)return;if(!heading.id)heading.id='study-main-heading';heading.tabIndex=-1;},[path]);
 const current=(href:string):'page'|'location'|undefined=>{const [p,h]=href.split('#');return (path!==p&&!(!h&&p!=='/study'&&path.startsWith(p+'/')))?undefined:!h?'page':hash==='#'+h||(!hash&&h==='ai-assistant')?'location':undefined;};
 if(path==='/study/art'||path.startsWith('/study/art/'))return null;
 const primary=[['AI Tutor','/study/tutor'],['Reading Room','/study/reading'],['Art Room','/study/art'],['Curiosity Room','/study/curiosity'],['Nobel Stories','/study/nobel'],['Certification Studio','/study/certifications']];
 const secondary=[['Great Discoveries · full stories','/study/curiosity/discoveries'],['Key terms','/study/glossary'],['Writing Studio','/study/writing'],['Start here','/start'],['My learning','/study#my-learning'],['Saved work','/your-space'],['Guided journeys','/study/journeys'],['Your Materials','/study/materials'],['Exam preparation','/study/exams'],['Help','/guide'],...(accountConfigured?[['Account','/study/account']]:[]),['← eAI Engineering','/']];
 const shortcuts=path==='/study'?[['Start here','/start'],['Read','/study/reading'],['Practice','/study/certifications']]:[['Read','/study/reading'],['Art','/study/art'],['Discover','/study/curiosity'],['Nobel','/study/nobel'],['Practice','/study/certifications']];
 function close(){setMenuOpen(false);setMore(false);}
 return <header className={`studio-nav studio-nav-simple ${overlay?'studio-nav-overlay':''}`} onKeyDown={e=>{if(e.key==='Escape'&&(more||menuOpen)){if(more){setMore(false);document.getElementById('study-more-toggle')?.focus();}else{setMenuOpen(false);document.getElementById('study-menu-toggle')?.focus();}}}}>
  <a className="studio-skip-link" href="#study-main-heading">Skip to this page’s main content</a>
  <Link href="/study" className="studio-brand" aria-label="Back to Learning Studio"><BrandWordmark name="dAI" descriptor="Learning Studio"/></Link>
  <button id="study-menu-toggle" className="studio-menu-toggle" aria-expanded={menuOpen} aria-controls="study-navigation-links" onClick={()=>{setMenuOpen(!menuOpen);setMore(false);}}>{menuOpen?'Close':'Menu'}<span aria-hidden="true">{menuOpen?'−':'+'}</span></button>
  <div className="studio-mobile-shortcuts" role="navigation" aria-label="Quick learning links">{shortcuts.map(([name,href])=><Link key={href} href={href} aria-current={current(href)} onClick={close}>{name}</Link>)}</div>
  <nav id="study-navigation-links" data-open={menuOpen} aria-label="Study navigation">{primary.map(([name,href])=><Link key={href} href={href} aria-current={current(href)} onClick={close}>{name}</Link>)}<details className="studio-more" open={more} onToggle={e=>setMore(e.currentTarget.open)}><summary id="study-more-toggle">More</summary><div className="studio-more-links">{secondary.map(([name,href])=><Link key={href} href={href} aria-current={current(href)} onClick={()=>{const anchor=href.split('#')[1];if(anchor)setHash('#'+anchor);close();}}>{name}</Link>)}</div></details></nav>
 </header>;
}
