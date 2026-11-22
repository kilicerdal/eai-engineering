import { MATERIAL_LIMITS, makeTextDocument, readMaterialLibrary, type CourseDocument, type MaterialLibrary } from "./study-materials";
import {extractionWarnings} from "./material-editorial";

async function fingerprint(data: BufferSource): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256",data);
  return `doc-${Array.from(new Uint8Array(digest),byte=>byte.toString(16).padStart(2,"0")).join("")}`;
}
export async function importCourseNotes(name: string, text: string): Promise<CourseDocument> {
  return {...makeTextDocument(name,text,await fingerprint(new TextEncoder().encode(`text\n${text.trim()}`)),Date.now()),metadata:{originalName:name.slice(0,512)||"Course notes",title:"",author:"",date:"",edition:""}};
}
export async function importCourseFile(file: File, reportProgress: (message: string) => void, signal?:AbortSignal): Promise<CourseDocument> {
  signal?.throwIfAborted();
  if (file.size > MATERIAL_LIMITS.fileBytes) throw new Error("Choose a file smaller than 10 MB.");
  if (!file.size) throw new Error("This file is empty.");
  if (/\.(txt|md)$/i.test(file.name)){const text=await file.text();signal?.throwIfAborted();const document=await importCourseNotes(file.name,text);signal?.throwIfAborted();return document;}
  if (!/\.pdf$/i.test(file.name)) throw new Error("Choose a PDF, TXT, or Markdown file.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (new TextDecoder().decode(bytes.slice(0,5)) !== "%PDF-") throw new Error("This file is not a readable PDF.");
  signal?.throwIfAborted();
  const id = await fingerprint(bytes);
  const pdfjs = await import("pdfjs-dist");
  signal?.throwIfAborted();
  const assets = `/pdfjs/${pdfjs.version}/`;
  pdfjs.GlobalWorkerOptions.workerSrc = `${assets}pdf.worker.min.mjs`;
  const loading = pdfjs.getDocument({ data: bytes, disableFontFace: true, cMapUrl: `${assets}cmaps/`, cMapPacked: true, standardFontDataUrl: `${assets}standard_fonts/`, wasmUrl: `${assets}wasm/`, maxImageSize: 0 });
  let rejectInterrupt:(reason:unknown)=>void=()=>{};
  const interrupted=new Promise<never>((_,reject)=>{rejectInterrupt=reject;});
  const cancel=()=>{rejectInterrupt(signal?.reason??new DOMException("Extraction cancelled","AbortError"));void loading.destroy().catch(()=>undefined);};
  signal?.addEventListener("abort",cancel,{once:true});
  let timedOut = false;
  const timeout = window.setTimeout(() => { timedOut = true;rejectInterrupt(new Error("Reading this PDF took too long. Try a smaller chapter."));void loading.destroy().catch(()=>undefined); },45000);
  try {
    const pdf = await Promise.race([loading.promise,interrupted]);
    if (pdf.numPages > MATERIAL_LIMITS.pages) throw new Error("This PDF has more than 100 pages. Upload a chapter or smaller selection.");
    const pages: import("./study-materials").MaterialPage[] = [];
    const extraction: import("./material-editorial").ExtractionPage[]=[];
    const labels=await Promise.race([pdf.getPageLabels(),interrupted]);
    let characters = 0;
    for (let number=1; number<=pdf.numPages; number++) {
      signal?.throwIfAborted();
      if (timedOut) throw new Error("Reading this PDF took too long. Try a smaller chapter.");
      reportProgress(`Reading page ${number} of ${pdf.numPages}…`);
      const page = await Promise.race([pdf.getPage(number),interrupted]);
      const content = await Promise.race([page.getTextContent(),interrupted]);signal?.throwIfAborted();
      const text = content.items.map(item => "str" in item ? `${item.str}${item.hasEOL ? "\n" : " "}` : "").join("").replace(/\u0000/g,"").trim();
      characters += text.length;
      if (characters > MATERIAL_LIMITS.documentCharacters) throw new Error("This file contains too much text. Upload a smaller chapter or selection.");
      const items=content.items.filter((item):item is import("pdfjs-dist/types/src/display/api").TextItem=>"str" in item&&!!item.str.trim());
      const width=page.getViewport({scale:1}).width;
      const left=items.filter(i=>i.transform[4]<width*.4),right=items.filter(i=>i.transform[4]>width*.5);
      const columns=left.length>5&&right.length>5&&left.some(a=>right.some(b=>Math.abs(a.transform[5]-b.transform[5])<3));
      const rowCounts=new Map<number,number>();for(const item of items){const y=Math.round(item.transform[5]/3);rowCounts.set(y,(rowCounts.get(y)||0)+1);}
      const table=[...rowCounts.values()].filter(n=>n>=4).length>=3;
      const label=labels?.[number-1]?.slice(0,80);
      extraction.push({number,...(label?{label}:{}),warnings:extractionWarnings(text,columns,table)});
      if (text) pages.push({ number, text,...(label?{label}:{}) });
      page.cleanup();
    }
    signal?.throwIfAborted();
    if (!pages.length) throw new Error("No readable text was found. Scanned or image-only PDFs need OCR before upload.");
    return { id, name: file.name.slice(0,120), kind: "pdf", pages, pageCount: pdf.numPages, addedAt: Date.now(),extraction,metadata:{originalName:file.name.slice(0,512),title:"",author:"",date:"",edition:""} };
  } catch (error) {
    signal?.throwIfAborted();
    if (timedOut) throw new Error("Reading this PDF took too long. Try a smaller chapter.");
    if (error instanceof Error && error.name === "PasswordException") throw new Error("Password-protected PDFs are not supported. Upload an unlocked copy.");
    throw error;
  } finally {
    signal?.removeEventListener("abort",cancel);
    window.clearTimeout(timeout);
    if(signal?.aborted||timedOut)void loading.destroy().catch(()=>undefined);
    else await loading.destroy().catch(()=>undefined);
  }
}

const DATABASE = "eai-course-library-v1";
const STORE = "library";
function openLibrary(): Promise<IDBDatabase> {
  return new Promise((resolve,reject) => {
    const request = indexedDB.open(DATABASE,1);
    request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE); };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Browser storage is unavailable."));
    request.onblocked = () => reject(new Error("Close other Study Assistant tabs to finish opening storage."));
  });
}
let pendingWrite = Promise.resolve();
export async function loadMaterialLibrary(): Promise<MaterialLibrary> {
  await pendingWrite.catch(() => undefined);
  const database = await openLibrary();
  try {
    const value = await new Promise<unknown>((resolve,reject) => {
      const request = database.transaction(STORE,"readonly").objectStore(STORE).get("current");
      request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error);
    });
    return readMaterialLibrary(value);
  } finally { database.close(); }
}
export function saveMaterialLibrary(library: MaterialLibrary, expected?: MaterialLibrary): Promise<void> {
  const snapshot = structuredClone(library);
  const expectedCopy=expected===undefined?undefined:JSON.stringify(readMaterialLibrary(expected));
  const next = pendingWrite.catch(()=>undefined).then(async () => {
    const database = await openLibrary();
    try {
      await new Promise<void>((resolve,reject) => {
        const transaction = database.transaction(STORE,"readwrite");
        const store=transaction.objectStore(STORE);
        let conflict=false;
        if(expectedCopy===undefined)store.put(snapshot,"current");
        else {
          const read=store.get("current");
          read.onsuccess=()=>{
            try{if(JSON.stringify(readMaterialLibrary(read.result))!==expectedCopy){conflict=true;transaction.abort();return;}store.put(snapshot,"current");}
            catch{conflict=true;transaction.abort();}
          };
        }

        transaction.oncomplete = () => { window.dispatchEvent(new Event("eai-study-progress-change")); resolve(); }; transaction.onerror = () => reject(transaction.error); transaction.onabort = () => reject(conflict?new Error("Another tab changed your material library. Your saved copy is preserved; reload before saving again."):transaction.error);
      });
    } finally { database.close(); }
  });
  pendingWrite = next;
  return next;
}
