'use client';
import {offerReadingUndo} from './ReadingUndo';
import {writeStudyCopy} from '@/lib/study-safe-storage';
import {useSyncExternalStore} from 'react';
import {READING_KEY,readShelf,type ReadingStatus} from '@/lib/study-reading';
import {LIBRARY_KEY,emptyLibrary,parseLibrary,type ReadingLibrary} from '@/lib/reading/library';
const unavailable='__reading_storage_unavailable__';
function subscribe(callback:()=>void){window.addEventListener('storage',callback);window.addEventListener('dai-reading-change',callback);return()=>{window.removeEventListener('storage',callback);window.removeEventListener('dai-reading-change',callback);};}
export function readingChanged(){window.dispatchEvent(new Event('dai-reading-change'));}
function snapshot(key:string){try{return localStorage.getItem(key);}catch{return unavailable;}}
export function useReadingLibrary(){
 const shelfRaw=useSyncExternalStore(subscribe,()=>snapshot(READING_KEY),()=>null),libraryRaw=useSyncExternalStore(subscribe,()=>snapshot(LIBRARY_KEY),()=>null);
 let shelf:Record<string,ReadingStatus>={},library=emptyLibrary(),shelfError='',libraryError='';
 try{if(shelfRaw===unavailable)throw Error('Bookshelf storage is unavailable. You can still read.');shelf=readShelf(shelfRaw);}catch(error){shelfError=error instanceof Error?error.message:'Bookshelf could not be read.';}
 try{if(libraryRaw===unavailable)throw Error('Reader storage is unavailable. You can still read.');library=parseLibrary(libraryRaw);}catch(error){libraryError=error instanceof Error?error.message:'Reading library could not be read.';}
 function updateLibrary(change:(library:ReadingLibrary)=>ReadingLibrary){if(libraryError)throw Error(libraryError);const original=localStorage.getItem(LIBRARY_KEY),latest=parseLibrary(original);const next=parseLibrary(JSON.stringify(change(latest)));const written=writeStudyCopy(localStorage,LIBRARY_KEY,original,next);if(original&&(next.notes.length<latest.notes.length||next.bookmarks.length<latest.bookmarks.length||JSON.stringify(next.collections)!==JSON.stringify(latest.collections)))offerReadingUndo(LIBRARY_KEY,original,written,'Reading notebook or collection updated.');readingChanged();return next;}
 function setShelf(id:string,status:string){if(shelfError)throw Error(shelfError);const original=localStorage.getItem(READING_KEY),latest=readShelf(original);if(status)latest[id]=status as ReadingStatus;else delete latest[id];readShelf(JSON.stringify(latest));const written=writeStudyCopy(localStorage,READING_KEY,original,latest);offerReadingUndo(READING_KEY,original||'{}',written,'Bookshelf status updated.');if(status||library.upNext===id){try{updateLibrary(state=>{const next={...state,...(status?{savedAt:{...state.savedAt,[id]:Date.now()}}:{})};if(next.upNext===id&&status!=='Want to read')delete next.upNext;return next;});}catch{/* Shelf status is saved even when its optional date cannot be written. */}}readingChanged();}
 return {shelf,library,shelfError,libraryError,updateLibrary,setShelf};
}
