import type {BookId,Bookmark,Position,ReadingLibrary,ReadingNote} from './library';
import type {ReadingStatus} from '../study-reading';
import type {ReadingParagraph} from './session';
import type {Chapter} from './navigation';
import {savedPassage} from './comfort';
import {readingBooks} from '../study-reading';
export function pinnedNext(library:ReadingLibrary,shelf:Record<string,ReadingStatus>){return library.upNext&&shelf[library.upNext]==='Want to read'?readingBooks.find(b=>b.id===library.upNext)||null:null;}
export function pinNext(library:ReadingLibrary,shelf:Record<string,ReadingStatus>,id:BookId|null):ReadingLibrary{const next={...library};if(id===null){delete next.upNext;return next;}if(shelf[id]!=='Want to read')throw Error('Choose a book from Waiting for you.');return {...next,upNext:id};}
export const noteTypeChoices=['All notes','Question','Favorite passage','Thought','Without a type'] as const;
export function noteTypeMatches(note:ReadingNote,type:string){return type==='All notes'||(type==='Without a type'?!note.tag:note.tag===type);}
export function chapterRemaining(sections:ReadingParagraph[][],chapters:readonly Chapter[],place:Pick<Position,'section'|'paragraph'>){
 const all=sections.flatMap((ps,section)=>ps.map(p=>({...p,section}))),index=place.paragraph?all.findIndex(p=>p.section===place.section&&p.id===place.paragraph):all.findIndex(p=>p.section===place.section);if(index<0)return null;
 const anchors=chapters.map(c=>({...c,index:all.findIndex(p=>p.section===c.section&&p.id===c.paragraph)})).filter(c=>c.index>=0).sort((a,b)=>a.index-b.index),chapter=anchors.filter(c=>c.index<=index).at(-1),next=anchors.find(c=>c.index>index),end=next?.index??all.length;
 const words=all.slice(index,end).reduce((sum,p)=>sum+p.text.trim().split(/\s+/).filter(Boolean).length,0);
 return {label:chapter?.label||'Introductory material',words,nextLabel:next?.label||null,start:all[index].id,end:all[end-1]?.id||all[index].id};
}
export function returningAfterTime(place:Position|undefined,now:number){return !!place&&Number.isFinite(now)&&now>=place.updatedAt&&now-place.updatedAt>=7*24*60*60*1000;}
export function bookmarkedText(marks:readonly Bookmark[],editions:Partial<Record<BookId,ReadingParagraph[][]>>){return marks.map(mark=>{const sections=editions[mark.bookId],passage=sections&&savedPassage(sections,{...mark,updatedAt:0});if(!passage)throw Error('A bookmarked passage could not be loaded. Try again; your saved bookmark is unchanged.');const book=readingBooks.find(b=>b.id===mark.bookId)!;return `${book.title}\n${book.author}\nBookmarked passage\n\n${passage.text}\n\nSource: https://www.gutenberg.org/ebooks/${mark.bookId}\nSaved place: section ${mark.section+1}, ${passage.id}\nRead here: /study/reading/${mark.bookId}?section=${mark.section}&paragraph=${passage.id}`;}).join('\n\n══════════\n\n');}
