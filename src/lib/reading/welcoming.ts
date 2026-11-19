import {bookStartQuestions} from './start-questions';
import {companionSuggestion} from './companions';
import {readingBooks,type ReadingStatus} from '../study-reading';
import {readingEditions,type BookId,type Bookmark,type ReadingLibrary} from './library';
import {readingChapters} from './navigation';
import {normalizeSearch} from './navigation';
import {savedPassage,dailyIndex} from './comfort';
import type {ReadingParagraph} from './session';
export function waitingBook(library:ReadingLibrary,shelf:Record<string,ReadingStatus>){return readingBooks.filter(b=>library.positions[b.id]&&shelf[b.id]!=='Finished'&&!library.bookExtras?.[b.id]?.paused).sort((a,b)=>(library.positions[b.id]?.updatedAt||0)-(library.positions[a.id]?.updatedAt||0))[0]||null;}
export function unopenedBooks(library:ReadingLibrary,shelf:Record<string,ReadingStatus>,day:string){const pool=readingBooks.filter(b=>!library.positions[b.id]&&shelf[b.id]!=='Finished');const start=dailyIndex(day,pool.length);return pool.length?Array.from({length:Math.min(3,pool.length)},(_,i)=>pool[(start+i)%pool.length]):[];}
export function companionBook(id:BookId){const suggestion=companionSuggestion(id);if(suggestion){const companion=readingBooks.find(b=>b.id===suggestion.id);if(companion)return {book:companion,reason:suggestion.reason};}const book=readingBooks.find(b=>b.id===id)!;const candidates=readingBooks.filter(b=>b.id!==id);const other=candidates.find(b=>b.author===book.author)||candidates.find(b=>b.genre===book.genre)||candidates.find(b=>readingEditions[b.id].moods.some(m=>(readingEditions[id].moods as readonly string[]).includes(m)))!;return {book:other,reason:`Compare the reading questions in these two books. In ${book.title}: ${bookStartQuestions[book.id]} In ${other.title}: ${bookStartQuestions[other.id]} Notice how the different forms or perspectives change your answer. This is an editorial invitation, not a claim of influence.`};}
export function readingCommitment(id:BookId){const b=readingBooks.find(b=>b.id===id)!,chapters=readingChapters[id];if(id==='1661')return 'Separate cases suit reading one mystery at a time.';if(b.genre==='Poetry')return 'Try one poem or a few pages per visit; the total estimate covers the whole edition.';if(readingEditions[id].words<6000)return 'A brief visit can take you through this edition. Pause whenever you like.';return chapters.length>1?'Read in brief visits, with original chapter or section headings as natural stopping places.':'Settle into a longer work in short visits; your place is kept between them.';}
export function queueBook(library:ReadingLibrary,id:BookId,action:'add'|'remove'|'up'|'down'):ReadingLibrary{const ids=[...(library.readingQueue||[])],index=ids.indexOf(id);if(action==='add'){if(index<0)ids.push(id);}else if(index>=0){if(action==='remove')ids.splice(index,1);else{const to=index+(action==='up'?-1:1);if(to>=0&&to<ids.length)[ids[index],ids[to]]=[ids[to],ids[index]];}}return {...library,readingQueue:ids};}
export function matchingBookmarkText(mark:Bookmark,sections:ReadingParagraph[][],query:string){const passage=savedPassage(sections,{...mark,updatedAt:0});if(!passage)return null;const text=normalizeSearch(`${mark.title||''} ${mark.label} ${passage.text}`);return normalizeSearch(query).split(/\s+/).filter(Boolean).every(word=>text.includes(word))?passage:null;}
export const seasonalSelections=[
 {name:'Spring · beginnings',invitation:'New places, renewal, and the possibility of belonging.',ids:['113','45','11']},
 {name:'Summer · journeys',invitation:'A river, an island, and a journey beyond the familiar.',ids:['289','120','55']},
 {name:'Autumn · thoughtful evenings',invitation:'Make a little space for reflection, observation, and mystery.',ids:['205','1661','1342']},
 {name:'Winter · stories by lamplight',invitation:'Second chances, family, and a little Gothic atmosphere.',ids:['46','514','84']}
] as const;
