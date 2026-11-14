import {readingBooks,type ReadingStatus} from '../study-reading';
import {readingEditions, type BookId,type Position,type ReadingNote} from './library';
import {chapterAt} from './navigation';
export type Book=typeof readingBooks[number];
export const readingJourneys:[{id:string;title:string;description:string;books:BookId[]},...{id:string;title:string;description:string;books:BookId[]}[]]=[
 {id:'strange-worlds',title:'Strange Worlds',description:'Step through a rabbit hole, across dimensions, or into a distant future.',books:['11','55','35','36','97','289','12','16','32','54']},
 {id:'under-two-hours',title:'An Hour or Two',description:'Complete works under two hours, from short fiction to poetry and satire.',books:['1952','844','1065','1080','58585','5616']},
 {id:'human-mind',title:'The Human Mind',description:'Identity, perception, conscience, and the stories we tell ourselves.',books:['84','174','43','1952','2680','1342','209','2500','145']},
 {id:'lasting-ideas',title:'Ideas That Stay With Us',description:'Explore freedom, responsibility, perspective, and how to live.',books:['23','205','132','2680','97','84','408','1497','216','2017']}
];
export function inJourney(id:BookId,journey:string){return !journey||!!readingJourneys.find(j=>j.id===journey)?.books.includes(id);}
export type FinderChoices={time:'short'|'evening'|'any';mood:string;novelty:'familiar'|'surprising'};
export function recommendBooks(choices:FinderChoices,shelf:Record<string,ReadingStatus>){
 const known=new Set(readingBooks.filter(b=>shelf[b.id]).map(b=>b.genre));
 return readingBooks.filter(b=>shelf[b.id]!=='Finished'&&(choices.mood==='Any mood'||(readingEditions[b.id].moods as readonly string[]).includes(choices.mood))&&(choices.time==='any'||readingEditions[b.id].words/200<=(choices.time==='short'?120:300)))
 .map(book=>{const familiar=known.has(book.genre),info=readingEditions[book.id];const affinity=known.size?(choices.novelty==='familiar'?familiar:!familiar):false;
 return {book,score:(affinity?4:0)+(!shelf[book.id]?2:0),reason:[choices.mood!=='Any mood'?`A ${choices.mood.toLowerCase()} choice.`:info.why,known.size?(choices.novelty==='familiar'&&familiar?`Another ${book.genre.toLowerCase()} book to explore.`:choices.novelty==='surprising'&&!familiar?'A genre you have not put on your shelf yet.':'A different voice within the collection.'):'A starting point while your bookshelf takes shape.'].join(' ')};
 }).sort((a,b)=>b.score-a.score||readingEditions[a.book.id].words-readingEditions[b.book.id].words).slice(0,3);
}
export function nextBooks(id:BookId,shelf:Record<string,ReadingStatus>){const from=readingBooks.find(b=>b.id===id)!,moods=readingEditions[id].moods as readonly string[];
 return readingBooks.filter(b=>b.id!==id&&shelf[b.id]!=='Finished').map(book=>{const overlap=(readingEditions[book.id].moods as readonly string[]).filter(m=>moods.includes(m));return {book,score:(book.genre===from.genre?4:0)+overlap.length,reason:book.genre===from.genre?`Another ${book.genre.toLowerCase()} voice to explore.`:overlap.length?`Keep following a ${overlap[0].toLowerCase()} mood.`:'Try a different direction next.'};}).sort((a,b)=>b.score-a.score||a.book.title.localeCompare(b.book.title)).slice(0,2);
}
export function continuingBooks(shelf:Record<string,ReadingStatus>,positions:Partial<Record<BookId,Position>>){return readingBooks.filter(b=>shelf[b.id]!=='Finished'&&(shelf[b.id]==='Reading'||positions[b.id])).sort((a,b)=>(positions[b.id]?.updatedAt||0)-(positions[a.id]?.updatedAt||0));}
export function resumeSummary(id:BookId,place?:Position){if(!place)return {label:'Ready when you are',percent:0,started:false};const info=readingEditions[id],chapter=chapterAt(id,place),ratio=place.paragraph?(Number(place.paragraph.slice(1))-1)/info.paragraphs:place.section/info.sections;return {label:chapter?.label||'Introductory material',percent:Math.max(0,Math.min(99,Math.floor(ratio*100))),started:true};}
export function reflectionNote(bookId:BookId,place:Position|undefined,text:string,id:string,now:number):ReadingNote{const value=text.trim();if(!value||value.length>4500)throw Error('Write a reflection of 1–4,500 characters.');return {id,bookId,section:place?.section??readingEditions[bookId].excerptSection,...(place?.paragraph?{paragraph:place.paragraph}:{}),quote:'',text:`After finishing · What stayed with me\n\n${value}`,createdAt:now};}
