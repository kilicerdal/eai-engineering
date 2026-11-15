import {emptyNotebook,LAB_STORAGE_KEY,parseNotebook,writeNotebook,type LabNotebook} from './investigation-lab';
export type LabSnapshot={notebook:LabNotebook;ready:boolean;error:string;saved:boolean};
export const labServerSnapshot:LabSnapshot={notebook:emptyNotebook(),ready:false,error:'',saved:false};
type StoreStorage=Pick<Storage,'getItem'|'setItem'>;
/** External store: browser persistence happens in event handlers, never during React rendering. */
export function createLabNotebookStore(storageFactory:()=>StoreStorage,observe:(changed:(key:string|null,newValue:string|null)=>void)=>()=>void){
 let state=labServerSnapshot,expected:string|null=null,initialized=false,blocked=false,stop:(()=>void)|undefined;
 const listeners=new Set<()=>void>();
 const publish=(next:LabSnapshot)=>{state=next;for(const listener of listeners)listener()};
 return {
  getSnapshot:()=>state,
  subscribe:(listener:()=>void)=>{
   listeners.add(listener);
   if(!initialized){initialized=true;try{const raw=storageFactory().getItem(LAB_STORAGE_KEY);const notebook=parseNotebook(raw);expected=raw;publish({notebook,ready:true,error:'',saved:false})}catch{blocked=true;publish({notebook:emptyNotebook(),ready:true,saved:false,error:'This browser’s saved notebook could not be read. Its original copy has been left untouched. You can work in this tab and export your current work.'})}}
   if(!stop)stop=observe((key,newValue)=>{if((key===LAB_STORAGE_KEY||key===null)&&newValue!==expected){blocked=true;publish({...state,saved:false,error:'Another tab changed the saved notebook. Your work here is retained in memory. Export it before reloading.'})}});
   return()=>{listeners.delete(listener);if(!listeners.size){stop?.();stop=undefined}};
  },
  update:(fn:(previous:LabNotebook)=>LabNotebook)=>{
   const notebook=fn(state.notebook);
   if(blocked){publish({...state,notebook,saved:false});return}
   try{expected=writeNotebook(storageFactory(),expected,notebook);publish({notebook,ready:true,saved:true,error:''})}catch{blocked=true;publish({notebook,ready:true,saved:false,error:'The notebook could not be saved, or another tab changed it. Your current work remains in this tab. Export it before leaving.'})}
  },
 };
}
