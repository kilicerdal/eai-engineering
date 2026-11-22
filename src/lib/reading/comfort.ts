import {noteStudyText} from './note-study';
import {readingBooks,type ReadingStatus} from '../study-reading';
import {readingEditions,type BookId,type ReadingLibrary,type ReadingNote,type Position} from './library';
import {readingChapters,chapterAt} from './navigation';
import {sourceDetails} from './source-details';
import type {ReadingParagraph} from './session';
export type ShelfSort='recent'|'saved'|'title'|'author';
export type ReadingTime='all'|'minutes'|'evening'|'long';
export function inReadingTime(id:BookId,time:ReadingTime){const minutes=readingEditions[id].words/200;return time==='all'||(time==='minutes'?minutes<=30:time==='evening'?minutes>30&&minutes<=240:minutes>240);}
export function sortedShelf<T extends typeof readingBooks[number]>(books:readonly T[],sort:ShelfSort,library:ReadingLibrary){return [...books].sort((a,b)=>sort==='title'?a.title.localeCompare(b.title):sort==='author'?a.author.localeCompare(b.author)||a.title.localeCompare(b.title):((sort==='saved'?library.savedAt?.[b.id]:library.positions[b.id]?.updatedAt)||0)-((sort==='saved'?library.savedAt?.[a.id]:library.positions[a.id]?.updatedAt)||0)||a.title.localeCompare(b.title));}
export const librarianSelections=[
 {id:'11',invitation:'For an afternoon when the ordinary needs a little nonsense.'},
 {id:'46',invitation:'For an evening with a story of second chances.'},
 {id:'1661',invitation:'For the pleasure of following one mystery at a time.'},
 {id:'289',invitation:'For a quieter visit to the riverbank.'},
 {id:'1065',invitation:'For a few minutes of rhythm and unease.'},
 {id:'1342',invitation:'For wit, conversation, and unreliable first impressions.'},
 {id:'55',invitation:'For a journey somewhere wonderfully unfamiliar.'},
 {id:'1952',invitation:'For a short, unsettling encounter with a powerful voice.'},
 {id:'205',invitation:'For an unhurried thought about how to live.'}
] as const;
export function dailyIndex(day:string,length:number){let n=0;for(const char of day)n=(n*31+char.charCodeAt(0))>>>0;return length?n%length:0;}
export function librarianTable(day:string){const start=dailyIndex(day,librarianSelections.length);return Array.from({length:3},(_,i)=>librarianSelections[(start+i*2)%librarianSelections.length]);}
export function overlookedBook(day:string,shelf:Record<string,ReadingStatus>,library:ReadingLibrary){const candidates=readingBooks.filter(b=>!library.positions[b.id]&&shelf[b.id]!=='Finished');return candidates[dailyIndex(day,candidates.length)]||null;}
export function sourceSnippet(text:string,max=440){return text.length>max?text.slice(0,max).trimEnd()+'…':text;}
export function savedPassage(sections:ReadingParagraph[][],place:Position){const section=sections[place.section];if(!section)return null;return place.paragraph?section.find(p=>p.id===place.paragraph)||null:section[0]||null;}
export const BOOK_REASON='My reason for reading\n\n';
export function reasonNote(id:BookId,existing:ReadingNote|undefined,text:string,now:number,noteId:string):ReadingNote{const value=text.trim();if(!value||value.length>500)throw Error('Write a sentence of 1–500 characters.');const first=readingChapters[id][0];return existing?{...existing,text:BOOK_REASON+value}:{id:noteId,bookId:id,section:first.section,paragraph:first.paragraph,quote:'',text:BOOK_REASON+value,createdAt:now};}
export function notebookText(notes:readonly ReadingNote[]){return readingBooks.flatMap(book=>{const own=notes.filter(n=>n.bookId===book.id),source=sourceDetails[book.id] as {translator?:string;release?:string};return own.length?[`${book.title}\n${book.author}\nSource: https://www.gutenberg.org/ebooks/${book.id}\nProject Gutenberg edition ${book.id}${source.translator?' · Translator: '+source.translator:''}${source.release?'\nElectronic release: '+source.release+' (not the original publication date)':''}\n\n${own.map(n=>`${n.title?`${n.title}\n`:''}${n.tag?`[${n.tag}]\n`:''}${n.quote?`QUOTED PASSAGE\n“${n.quote}”\n\n`:''}MY NOTE\n${n.text}${n.study?`\n\n${noteStudyText(n.study)}`:''}\nChapter: ${chapterAt(book.id,n)?.label||'Introductory material'}\nPassage: section ${n.section+1}${n.paragraph?`, ${n.paragraph}`:''}\nOpen in dAI: /study/reading/${book.id}?section=${n.section}${n.paragraph?'&paragraph='+encodeURIComponent(n.paragraph):''}`).join('\n\n———\n\n')}`]:[];}).join('\n\n══════════\n\n');}

export const VISIT_KEY='dai-reading-return-v24';
export function readReturn(raw:string|null,signature:string){if(!raw)return null;try{const v=JSON.parse(raw);return v.signature===signature&&typeof v.y==='number'&&Number.isFinite(v.y)&&v.y>=0&&v.y<1000000?v.y:null;}catch{return null;}}
