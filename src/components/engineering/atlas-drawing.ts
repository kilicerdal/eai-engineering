export function mountAtlasDrawing(map: HTMLDivElement, edges: readonly (readonly string[])[], update: (paths: string[]) => void) {
 let frame = 0;
 const draw = () => {
  const bounds = map.getBoundingClientRect();
  update(edges.map(([from,to]) => {
   const source=map.querySelector<HTMLElement>(`[data-node="${from}"]`), target=map.querySelector<HTMLElement>(`[data-node="${to}"]`);
   if (!source || !target) return "";
   const a=source.getBoundingClientRect(),b=target.getBoundingClientRect();
   const ax=a.left+a.width/2-bounds.left,ay=a.bottom-bounds.top,bx=b.left+b.width/2-bounds.left,by=b.top-bounds.top;
   if(by<ay-80)return `M${a.right-bounds.left} ${a.top+a.height/2-bounds.top} H${bounds.width-3} V${b.top+b.height/2-bounds.top} H${b.right-bounds.left}`;
   if(Math.abs(ay-by)<90&&Math.abs(ax-bx)>60)return `M${a.right-bounds.left} ${a.top+a.height/2-bounds.top} H${b.left-bounds.left}`;
   return `M${ax} ${ay} V${(ay+by)/2} H${bx} V${by}`;
  }));
  map.dataset.connections="ready";
 };
 const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);};
 const observer=new ResizeObserver(schedule);observer.observe(map);map.querySelectorAll(".node").forEach(node=>observer.observe(node));schedule();
 return ()=>{observer.disconnect();cancelAnimationFrame(frame);};
}
