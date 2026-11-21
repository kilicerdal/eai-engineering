/** The optional hiding preference is shared by the sheet room and connection views. */
export function paperContentNote(id:string){
 if(id==='kollwitz-paper-1')return 'Historical subject: contemplation of suicide; non-graphic.';
 if(id==='raphael-paper-1')return 'Historical subject: suicide; non-graphic.';
 return ['michelangelo-paper-2','michelangelo-paper-3','raphael-paper-2','raphael-paper-3','raphael-paper-4','degas-paper-2'].includes(id)?'Anatomical or nude figure study.':'';
}

export const PAPER_IDS=new Set(['leonardo','michelangelo','raphael','rembrandt','degas','kollwitz'].flatMap(artist=>[1,2,3,4].map(n=>`${artist}-paper-${n}`)));
export const paperStudyHref=(id:string)=>PAPER_IDS.has(id)?'/study/art/on-paper#'+id:'/study/art/painting/'+id;
