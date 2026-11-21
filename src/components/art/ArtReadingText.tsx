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
export function ArtParagraph({text,termsId,paragraphId,works=[]}:{text:string;paragraphId?:string;termsId:string;works?:{id:string;title:string}[]}){
 const work=works.find(w=>text.includes(w.title));
 if(work){const at=text.indexOf(work.title);return <p id={paragraphId}>{text.slice(0,at)}<Link href={'/study/art/painting/'+work.id}>{work.title}</Link>{text.slice(at+work.title.length)}</p>}
 const term=termsIn(text)[0];if(!term)return <p id={paragraphId}>{text}</p>;const match=new RegExp('\\b'+term.term+'\\b','i').exec(text)!;
 return <p id={paragraphId}>{text.slice(0,match.index)}<a className="art-term-link" href={'#'+termsId} aria-label={match[0]+': definition in this section'}>{match[0]}</a>{text.slice(match.index+match[0].length)}</p>;
}

// Contextual examples are visual readings; they do not infer unexamined paint layers.
export function termContext(term:string,id:string){
 const examples:Record<string,Record<string,string>>={
 sfumato:{'leonardo-01':'Here, compare the hard-to-locate boundary around the mouth with the more firmly described hands. The term names that softened transition; it does not identify the sitter’s emotion.','leonardo-06':'Here, compare the modeled face with the sharper juniper foliage. Different boundaries do different work within the same portrait.'},
 tronie:{'vermeer-01':'Here, the headdress and turn construct a presence without supplying the identifying setting expected of a commissioned likeness.'},
 chiaroscuro:{'caravaggio-02':'Here, follow the relation between the illuminated bodies and the darker room. Light organizes the encounter rather than functioning only as an atmospheric effect.','rembrandt-02':'Here, the pale body and the participants’ illuminated faces create different centers of attention within one demonstration.'},
 provenance:{'leonardo-01':'Here, the documented royal and museum history does not by itself supply every transfer from Leonardo’s possession. Consult the object record for the stages actually supported.','vermeer-01':'Here, the modern auction and museum history must remain separate from an imagined account of the painting’s earlier owners.'}
 };return examples[term]?.[id];
}
