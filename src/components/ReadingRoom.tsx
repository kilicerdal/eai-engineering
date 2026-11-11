"use client";
import {useRef,useState,useSyncExternalStore} from "react";
import {readingBooks,readingStatuses,READING_KEY,readShelf,type ReadingStatus} from "@/lib/study-reading";
function subscribe(callback:()=>void){window.addEventListener("storage",callback);window.addEventListener("dai-reading-change",callback);return()=>{window.removeEventListener("storage",callback);window.removeEventListener("dai-reading-change",callback);};}
const unavailable = Symbol("bookshelf unavailable");
function snapshot(): string | null | typeof unavailable {try{return localStorage.getItem(READING_KEY);}catch{return unavailable;}}
function searchable(text: string) {
  return text.toLowerCase().replace(/[’']/g, "").replace(/[.,!?;:()–—-]/g, " ");
}
export default function ReadingRoom(){
 const raw=useSyncExternalStore(subscribe,snapshot,()=>null);
 const [query,setQuery]=useState(""),[genre,setGenre]=useState("All"),[filter,setFilter]=useState("All books"),[feedback,setFeedback]=useState<{message:string;raw:ReturnType<typeof snapshot>}|null>(null);
 const notice=feedback && feedback.raw===raw ? feedback.message : "";
 let shelf:Record<string,ReadingStatus>={},corrupt=false;try{if(raw!==unavailable)shelf=readShelf(raw);}catch{corrupt=true;}
 const words=searchable(query).split(/\s+/).filter(Boolean);
 const visible=readingBooks.filter(book=>(genre==="All"||genre===book.genre)&&words.every(word=>searchable(`${book.title} ${book.author} ${book.genre}`).includes(word))&&(raw===unavailable||corrupt||filter==="All books"||shelf[book.id]===filter));
 const showAll = useRef<HTMLButtonElement>(null);
 const searchInput = useRef<HTMLInputElement>(null);
 const visibleShelf = corrupt || raw===unavailable ? "All books" : filter;
 function save(id:string,status:string){
  try{
   const latest=readShelf(localStorage.getItem(READING_KEY));
   if(status)latest[id]=status as ReadingStatus;
   else delete latest[id];
   const updated=JSON.stringify(latest);
   localStorage.setItem(READING_KEY,updated);
   window.dispatchEvent(new Event("dai-reading-change"));
   const index=visible.findIndex(book=>book.id===id);
   const book=visible[index];
   setFeedback({message:status ? `${book.title} moved to ${status}.` : `${book.title} removed from your shelf.`,raw:updated});
   if(filter!=="All books" && status!==filter){
    const neighbor=visible[index+1] ?? visible[index-1];
    requestAnimationFrame(()=>{
     const target=neighbor && document.getElementById(`reading-shelf-${neighbor.id}`);
     (target || showAll.current || searchInput.current)?.focus();
    });
   }
  }catch{setFeedback({message:"Your bookshelf could not be saved. Try again when browser storage is available.",raw:snapshot()});}
 }
 const control="w-full rounded-lg border border-[#766746] bg-[#101f2d] p-3 text-[#f5eddf] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#edc779]";
 return <>
 <div className="grid gap-4 rounded-2xl border border-[#766746] bg-[#0c1a27] p-5 md:grid-cols-3">
 <label>Find a book<input ref={searchInput} className={control} type="search" placeholder="Title, author, or genre" value={query} onChange={e=>{setQuery(e.target.value);setFeedback(null);}}/></label>
 <label>Genre<select className={control} value={genre} onChange={e=>{setGenre(e.target.value);setFeedback(null);}}><option>All</option>{[...new Set(readingBooks.map(book=>book.genre))].map(value=><option key={value}>{value}</option>)}</select></label>
 <label>My bookshelf<select className={control} disabled={corrupt||raw===unavailable} value={visibleShelf} onChange={e=>{setFilter(e.target.value);setFeedback(null);}}><option>All books</option>{readingStatuses.map(value=><option key={value}>{value}</option>)}</select></label>
 </div>
 <p className="my-4 text-sm text-[#d3dce2]">Bookshelf choices stay in this browser. They are not synced to your account. Reading opens on Project Gutenberg; your page position there is not tracked here.</p>
 <p role="status" className="my-3 text-[#edc779]">{notice && `${notice} `}{visible.length} {visible.length===1?"book":"books"} to explore</p>
 {raw===unavailable&&<p role="status">Browser storage is unavailable. You can still find and read books. Enable browser storage to use your bookshelf.</p>}
 {corrupt&&<p role="alert">Your saved bookshelf could not be read. It has been preserved; saving is disabled to avoid replacing it.</p>}
 {!visible.length&&<div className="rounded-xl border border-[#766746] p-6"><h2 className="text-2xl">A little room for discovery.</h2><p className="my-3">No books match these choices. Try another search, or add a book to this shelf.</p><button ref={showAll} className="underline" onClick={()=>{setQuery("");setGenre("All");setFilter("All books");setFeedback(null);searchInput.current?.focus();}}>Show all books</button></div>}
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible.map((book,index)=><article key={book.id} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#766746] bg-[#0c1a27]">
 <div className="relative flex min-h-48 flex-col justify-end border-b border-[#766746] bg-gradient-to-br from-[#253e48] via-[#172a3c] to-[#101724] p-6"><span aria-hidden="true" className="absolute right-5 top-3 text-5xl text-[#edc779]/30">✧</span><p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#edc779]">{String(index+1).padStart(2,"0")} · {book.genre}</p><h2 className="font-serif text-3xl leading-tight text-[#fff5e1]">{book.title}</h2><p className="mt-3 text-[#e1cfae]">{book.author}</p></div>
 <div className="flex flex-1 flex-col gap-4 p-5"><p className="flex-1 text-[#d3dce2]">{book.note}</p><a className="rounded-lg bg-[#e5bd73] px-4 py-3 text-center font-semibold text-[#101724] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href={`https://www.gutenberg.org/ebooks/${book.id}`} target="_blank" rel="noopener noreferrer">Read free on Project Gutenberg ↗<span className="sr-only"> — {book.title}, opens in a new tab</span></a><label className="text-sm">Shelf for {book.title}<select id={`reading-shelf-${book.id}`} disabled={corrupt||raw===unavailable} className={control} value={shelf[book.id]||""} onChange={e=>save(book.id,e.target.value)}><option value="">Not on my shelf</option>{readingStatuses.map(status=><option key={status}>{status}</option>)}</select></label></div>
 </article>)}</div>
 </>;
}
