import {readingBooks} from '@/lib/study-reading';
import {readingEditions,estimateLength,type BookId} from '@/lib/reading/library';
import {readingIntroductions} from '@/lib/reading/introductions';
import {type Book} from '@/lib/reading/discovery';
import {ReadingDialog} from './ReadingDialog';
export default function ReadingCompare({ids,onClose,onChoose}:{ids:BookId[];onClose:()=>void;onChoose:(book:Book)=>void}){return <ReadingDialog title="A few books, side by side" onClose={onClose}><p>Choose by the experience you want. Lengths are guides, never targets.</p><div className="rr-compare-grid" data-count={ids.length}>{ids.map(id=>{const book=readingBooks.find(b=>b.id===id)!,info=readingEditions[id];return <article key={id}><h3>{book.title}</h3><p>{book.author}</p><dl><dt>Time for this edition</dt><dd>{estimateLength(info.words)}</dd><dt>Mood</dt><dd>{info.moods.join(' · ')}</dd><dt>Why read this?</dt><dd>{info.why}</dd><dt>Language & reading</dt><dd>{readingIntroductions[id].language}</dd></dl><button className="rr-primary" onClick={()=>onChoose(book)}>Meet this book →</button></article>;})}</div></ReadingDialog>;}
