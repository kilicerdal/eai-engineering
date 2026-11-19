import {ImageResponse} from 'next/og';
export function renderSocialCard(kind: 'site' | 'settlement'){
 const settlement=kind==='settlement';
 return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',padding:'64px 72px',background:'#071522',color:'#eee8db',fontFamily:'sans-serif',border:'2px solid #b58b57'}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:settlement?42:60,color:'#edc58c'}}>{settlement?'SettlementLab':'eAI'}</span><span style={{fontSize:25,color:'#bfccd6'}}>ERDAL KILIC</span></div>
  <div style={{display:'flex',flexDirection:'column'}}><div style={{fontSize:66,fontWeight:700,lineHeight:1.12}}>{settlement?'Independent financial assurance.':'Engineering you can inspect.'}</div><div style={{fontSize:27,color:'#bfccd6',marginTop:24}}>{settlement?'Synthetic trades. Independent checks. Durable recovery.':'Public source. Recorded evidence. Decisions explained.'}</div></div>
  <div style={{display:'flex',gap:16}}>{(settlement?['Matching controls','Durable workers','Crash recovery']:['Checkout retries','Claim redelivery','Settlement controls']).map(label=><div key={label} style={{display:'flex',padding:'16px 20px',fontSize:23,color:'#edc58c',border:'1px solid #65717a',borderRadius:6}}>{label}</div>)}</div>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:22,color:'#bfccd6'}}><span>eai.engineering</span><span>{settlement?'Recorded evidence · Public source':'Engineering · Learning · Exploration'}</span></div>
 </div>,{width:1200,height:630,headers:{'Cache-Control':'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'}});
}
