import { MATERIAL_LIMITS, makeTextDocument, normalizeMaterialLibrary, type CourseDocument, type MaterialLibrary } from "./study-materials";

async function fingerprint(data: BufferSource): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256",data);
  return `doc-${Array.from(new Uint8Array(digest),byte=>byte.toString(16).padStart(2,"0")).join("")}`;
}
export async function importCourseNotes(name: string, text: string): Promise<CourseDocument> {
  return makeTextDocument(name,text,await fingerprint(new TextEncoder().encode(`text\n${text.trim()}`)),Date.now());
}
export async function importCourseFile(file: File, reportProgress: (message: string) => void): Promise<CourseDocument> {
  if (file.size > MATERIAL_LIMITS.fileBytes) throw new Error("Choose a file smaller than 10 MB.");
  if (!file.size) throw new Error("This file is empty.");
  if (/\.(txt|md)$/i.test(file.name)) return importCourseNotes(file.name,await file.text());
  if (!/\.pdf$/i.test(file.name)) throw new Error("Choose a PDF, TXT, or Markdown file.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (new TextDecoder().decode(bytes.slice(0,5)) !== "%PDF-") throw new Error("This file is not a readable PDF.");
  const id = await fingerprint(bytes);
  const pdfjs = await import("pdfjs-dist");
  const assets = `/pdfjs/${pdfjs.version}/`;
  pdfjs.GlobalWorkerOptions.workerSrc = `${assets}pdf.worker.min.mjs`;
  const loading = pdfjs.getDocument({ data: bytes, disableFontFace: true, cMapUrl: `${assets}cmaps/`, cMapPacked: true, standardFontDataUrl: `${assets}standard_fonts/`, wasmUrl: `${assets}wasm/`, maxImageSize: 0 });
  let timedOut = false;
  const timeout = window.setTimeout(() => { timedOut = true; void loading.destroy(); },45000);
  try {
    const pdf = await loading.promise;
    if (pdf.numPages > MATERIAL_LIMITS.pages) throw new Error("This PDF has more than 100 pages. Upload a chapter or smaller selection.");
    const pages: { number: number; text: string }[] = [];
    let characters = 0;
    for (let number=1; number<=pdf.numPages; number++) {
      if (timedOut) throw new Error("Reading this PDF took too long. Try a smaller chapter.");
      reportProgress(`Reading page ${number} of ${pdf.numPages}…`);
      const page = await pdf.getPage(number);
      const content = await page.getTextContent();
      const text = content.items.map(item => "str" in item ? `${item.str}${item.hasEOL ? "\n" : " "}` : "").join("").replace(/\u0000/g,"").trim();
      characters += text.length;
      if (characters > MATERIAL_LIMITS.documentCharacters) throw new Error("This file contains too much text. Upload a smaller chapter or selection.");
      if (text) pages.push({ number, text });
      page.cleanup();
    }
    if (!pages.length) throw new Error("No readable text was found. Scanned or image-only PDFs need OCR before upload.");
    return { id, name: file.name.slice(0,120), kind: "pdf", pages, pageCount: pdf.numPages, addedAt: Date.now() };
  } catch (error) {
    if (timedOut) throw new Error("Reading this PDF took too long. Try a smaller chapter.");
    if (error instanceof Error && error.name === "PasswordException") throw new Error("Password-protected PDFs are not supported. Upload an unlocked copy.");
    throw error;
  } finally {
    window.clearTimeout(timeout);
    await loading.destroy().catch(()=>undefined);
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
export async function loadMaterialLibrary(): Promise<MaterialLibrary> {
  const database = await openLibrary();
  try {
    const value = await new Promise<unknown>((resolve,reject) => {
      const request = database.transaction(STORE,"readonly").objectStore(STORE).get("current");
      request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error);
    });
    return normalizeMaterialLibrary(value);
  } finally { database.close(); }
}
let pendingWrite = Promise.resolve();
export function saveMaterialLibrary(library: MaterialLibrary): Promise<void> {
  const snapshot = structuredClone(library);
  const next = pendingWrite.catch(()=>undefined).then(async () => {
    const database = await openLibrary();
    try {
      await new Promise<void>((resolve,reject) => {
        const transaction = database.transaction(STORE,"readwrite");
        transaction.objectStore(STORE).put(snapshot,"current");
        transaction.oncomplete = () => { window.dispatchEvent(new Event("eai-study-progress-change")); resolve(); }; transaction.onerror = () => reject(transaction.error); transaction.onabort = () => reject(transaction.error);
      });
    } finally { database.close(); }
  });
  pendingWrite = next;
  return next;
}
