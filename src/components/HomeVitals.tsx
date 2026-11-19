'use client';
import {useReportWebVitals} from 'next/web-vitals';
const preference='eai-performance-disabled';
function report(metric:{name:string;value:number}) {
 if(!['LCP','CLS','INP'].includes(metric.name) || navigator.webdriver)return;
 if(navigator.doNotTrack==='1' || (navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl)return;
 try {if(localStorage.getItem(preference)==='true')return;}catch{return;}
 const entry=performance.getEntriesByType('navigation')[0];
 if(!entry || new URL(entry.name).pathname!=='/')return;
 const body=JSON.stringify({metric:metric.name,value:metric.value,device:matchMedia('(max-width:760px)').matches?'mobile':'desktop'});
 try {
  void fetch('/api/performance',{method:'POST',body,keepalive:true,credentials:'omit',referrerPolicy:'no-referrer',headers:{'Content-Type':'text/plain'}}).catch(()=>{});
 }catch{/* Measurement must never interfere with navigation. */}
}
export default function HomeVitals(){useReportWebVitals(report);return null;}
