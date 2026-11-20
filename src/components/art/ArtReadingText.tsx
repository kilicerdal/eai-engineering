import Link from 'next/link';
const terms=[
{term:'tronie',meaning:'A study of a type, expression or costume rather than a commissioned portrait of a named sitter.'},
{term:'patronage',meaning:'The support, commissioning and collecting relationships through which art is funded and given a setting or audience.'},
{term:'glazing',meaning:'Using thin translucent layers of paint to modify the appearance of underlying color.'},
{term:'sfumato',meaning:'Soft tonal transitions that make a boundary difficult to locate, often associated with Leonardo.'},
{term:'chiaroscuro',meaning:'The use of light and dark to model forms or organize a composition.'},
{term:'provenance',meaning:'An object’s documented ownership history. Gaps in that history should remain explicit.'}
];
export function termsIn(text:string){return terms.filter(t=>new RegExp('\\b'+t.term+'\\b','i').test(text));}
export function ArtParagraph({text,termsId,works=[]}:{text:string;termsId:string;works?:{id:string;title:string}[]}){
 const work=works.find(w=>text.includes(w.title));
 if(work){const at=text.indexOf(work.title);return <p>{text.slice(0,at)}<Link href={'/study/art/painting/'+work.id}>{work.title}</Link>{text.slice(at+work.title.length)}</p>}
 const term=termsIn(text)[0];if(!term)return <p>{text}</p>;const match=new RegExp('\\b'+term.term+'\\b','i').exec(text)!;
 return <p>{text.slice(0,match.index)}<a className="art-term-link" href={'#'+termsId} aria-label={match[0]+': definition in this section'}>{match[0]}</a>{text.slice(match.index+match[0].length)}</p>;
}
