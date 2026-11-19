'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {useReportWebVitals} from 'next/web-vitals';
let visitedAnotherRoute=false;
const preference='eai-performance-disabled';
function report(metric:{name:string;value:number}) {
 if(!['LCP','CLS','INP'].includes(metric.name) || navigator.webdriver)return;
 if(navigator.doNotTrack==='1' || (navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl)return;
 try {if(localStorage.getItem(preference)==='true')return;}catch{return;}
 const entry=performance.getEntriesByType('navigation')[0];
 if(!entry || new URL(entry.name).pathname!=='/')return;
 if(location.pathname!=='/')visitedAnotherRoute=true;
 const body=JSON.stringify({metric:metric.name,value:metric.value,context:visitedAnotherRoute?'after-navigation':'home-so-far',device:matchMedia('(max-width:760px)').matches?'mobile':'desktop'});
 try {
  void fetch('/api/performance',{method:'POST',body,keepalive:true,credentials:'omit',referrerPolicy:'no-referrer',headers:{'Content-Type':'text/plain'}}).catch(()=>{});
 }catch{/* Measurement must never interfere with navigation. */}
}
export default function HomeVitals(){const path=usePathname();useEffect(()=>{if(path!=='/')visitedAnotherRoute=true;},[path]);useReportWebVitals(report);return null;}
