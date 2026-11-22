"use client";
import {useEffect,useRef,useState} from "react";

/** Render one local page. Original file bytes never enter library storage or an AI request. */
export default function MaterialPdfPreview({file,pageNumber}:{file:File;pageNumber:number}){
 const canvas=useRef<HTMLCanvasElement>(null),[status,setStatus]=useState("Opening original PDF…");
 useEffect(()=>{
  let disposed=false,loading:import("pdfjs-dist").PDFDocumentLoadingTask|undefined,render:import("pdfjs-dist").RenderTask|undefined;
  const element=canvas.current;
  if(!element)return;
  element.width=0;element.height=0;
  queueMicrotask(()=>setStatus("Opening original PDF…"));
  void(async()=>{
   const pdfjs=await import("pdfjs-dist");if(disposed)return;
   const bytes=new Uint8Array(await file.arrayBuffer());if(disposed)return;
   const assets=`/pdfjs/${pdfjs.version}/`;pdfjs.GlobalWorkerOptions.workerSrc=`${assets}pdf.worker.min.mjs`;
   loading=pdfjs.getDocument({data:bytes,cMapUrl:`${assets}cmaps/`,cMapPacked:true,standardFontDataUrl:`${assets}standard_fonts/`,wasmUrl:`${assets}wasm/`});
   const pdf=await loading.promise;if(disposed)return;
   const page=await pdf.getPage(pageNumber);if(disposed)return;
   const natural=page.getViewport({scale:1}),width=Math.min(760,Math.max(220,element.parentElement?.clientWidth||600)),viewport=page.getViewport({scale:Math.min(width/natural.width,1600/natural.height)}),ratio=Math.min(2,window.devicePixelRatio||1);
   element.width=Math.ceil(viewport.width*ratio);element.height=Math.ceil(viewport.height*ratio);
   render=page.render({canvas:element,viewport,transform:ratio===1?undefined:[ratio,0,0,ratio,0,0]});await render.promise;
   if(!disposed)setStatus(`Original PDF · page ${pageNumber}`);
  })().catch(()=>{if(!disposed)setStatus("The original PDF could not be displayed. Inspect it in your PDF reader; extracted text remains available.");});
  return()=>{disposed=true;render?.cancel();void loading?.destroy().catch(()=>undefined);};
 },[file,pageNumber]);
 return <figure className="material-original-pdf"><figcaption role="status" className="mb-3 text-sm text-slate-400">{status}</figcaption><canvas ref={canvas} aria-label={`Original PDF page ${pageNumber}`} className="h-auto w-full bg-white"/><p className="mt-2 text-xs text-slate-400">Rendered from your local file for inspection. Original PDF bytes are not saved in the library or sent with questions.</p></figure>;
}
