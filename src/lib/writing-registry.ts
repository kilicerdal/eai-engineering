// In-memory readiness state only; never stores writing content or sends data.
export function createWritingRegistry(){
 const pending=new Set<string>();
 return {
  update(id:string,dirty:boolean,error:boolean){if(!id)return;if(dirty||error)pending.add(id);else pending.delete(id);},
  clear(id:string){pending.delete(id);},
  hasPending(){return pending.size>0;},
 };
}
// Publishers retain their state even when the navigation listener hydrates later.
export const writingRegistry=createWritingRegistry();
