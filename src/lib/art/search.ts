import {normalizeArtText} from './navigation';
// Alternate names aid discovery; object titles and attributions remain unchanged.
const aliases:Record<string,string>={
 'velazquez-01':'Las Meninas Maids of Honour', 'velazquez-03':'Las Hilanderas Fable of Arachne',
 'bosch-02':'Haywain Hay Wagon', 'okeeffe-02':'Black Iris III O Keeffe OKeeffe',
 'okeeffe-01':'O Keeffe OKeeffe', 'okeeffe-03':'O Keeffe OKeeffe pastel',
 'leonardo-01':'La Gioconda La Joconde', 'leonardo-02':'Il Cenacolo L Ultima Cena',
 'rembrandt-01':'De Nachtwacht Nightwatch', 'vermeer-01':'Meisje met de parel',
 'vermeer-02':'Het melkmeisje', 'monet-01':'Impression soleil levant',
 'monet-03':'La Pie', 'van-gogh-01':'Starry Night La Nuit etoilee',
 'van-gogh-04':'Cafe Terrace Place du Forum', 'magritte-02':'Ceci nest pas une pipe La Trahison des images',
 'dali-01':'La persistencia de la memoria melting clocks', 'kahlo-02':'Las dos Fridas',
 'matisse-01':'L Atelier rouge', 'matisse-02':'La Danse', 'kandinsky-03':'Gelb Rot Blau'
};
export function artSearchText(id:string,title:string,artist:string){return normalizeArtText(title+' '+artist+' '+(aliases[id]??'')).replace(/[^\p{L}\p{N} ]/gu,' ');}
export function artSearchMatches(query:string,text:string){const terms=normalizeArtText(query).split(/[^\p{L}\p{N}]+/u).filter(Boolean);return (!query.trim()||terms.length>0)&&terms.every(t=>text.includes(t));}
function distance(a:string,b:string){let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+Number(a[i-1]!==b[j-1]));row=next;}return row[b.length];}
export function artSearchSuggestions(query:string,works:{id:string;title:string;artist:string}[]){const tokens=normalizeArtText(query).split(/[^a-z0-9]+/).filter(Boolean);if(!tokens.length||tokens.length>6||tokens.some(t=>t.length>30))return [];return works.map(w=>{const words=artSearchText(w.id,w.title,w.artist).split(/\s+/);const score=tokens.reduce((sum,t)=>sum+Math.min(...words.map(word=>word.includes(t)?0:distance(t,word))),0);return {...w,score};}).filter(w=>w.score<=Math.max(tokens.length,Math.min(3,Math.floor(tokens.join('').length/5)))).sort((a,b)=>a.score-b.score||a.title.localeCompare(b.title)).slice(0,3);}

/** Stable relevance within the existing collection; ties retain curatorial order. */
export function artSearchScore(query:string,text:string,title:string){const q=normalizeArtText(query).replace(/[^\p{L}\p{N} ]/gu,' ').replace(/\s+/g,' ').trim(),t=normalizeArtText(title).replace(/[^\p{L}\p{N} ]/gu,' ').replace(/\s+/g,' ').trim();if(!q)return 0;return (t===q?1000:t.startsWith(q)?300:t.includes(q)?150:0)+(text.includes(q)?50:0)+q.split(' ').filter(term=>t.split(' ').includes(term)).length*10;}
