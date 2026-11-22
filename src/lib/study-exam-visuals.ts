import type {ExamBankQuestion} from "./study-exam-bank";
export type ExamPlot={title:string;description:string;xLabel:string;yLabel:string;kind:"lines"|"bars";series:{name:string;points:[number,number][]}[];categories?:string[]};
export function examPlot(q:ExamBankQuestion,variant="current"):ExamPlot|null{
 const p=q.proof;if(!p)return null;const v=p.values;
 if(q.skill==="linear"){const [a,b,x]=v,rhs=a*x+b;return {title:"Two functions representing the equality",description:`The line y=${a}x+${b} meets y=${rhs} at (${x}, ${rhs}). The x-coordinate solves the original equation.`,xLabel:"x (unitless)",yLabel:"y (unitless)",kind:"lines",series:[{name:`y = ${a}x + ${b}`,points:[[-2,b-2*a],[x+2,a*(x+2)+b]]},{name:`y = ${rhs}`,points:[[-2,rhs],[x+2,rhs]]}]};}
 if(q.skill==="systems"){
  if(variant!=="current")return {title:variant==="parallel"?"Related example: no solution":"Related example: infinitely many solutions",description:variant==="parallel"?"The lines y=x and y=x+1 have the same slope and different intercepts; no point lies on both.":"The equations y=x and 2y=2x describe the same line. Every point on it satisfies both.",xLabel:"x (unitless)",yLabel:"y (unitless)",kind:"lines",series:[{name:"y = x",points:[[-2,-2],[4,4]]},{name:variant==="parallel"?"y = x + 1":"2y = 2x",points:[[-2,variant==="parallel"?-1:-2],[4,variant==="parallel"?5:4]]}]};
  const [x,y]=v,s=x+y,d=x-y;return {title:"Intersection of the two original equations",description:`y=${s}−x and y=x−${d} meet at (${x}, ${y}); the pair satisfies both equations.`,xLabel:"x (unitless)",yLabel:"y (unitless)",kind:"lines",series:[{name:`y = ${s} − x`,points:[[-1,s+1],[x+2,s-x-2]]},{name:`y = x − ${d}`,points:[[-1,-1-d],[x+2,x+2-d]]}]};
 }
 if(q.skill==="quadratics"){
  const a=variant==="single"?2:variant==="none"?0:v[0],b=variant==="single"?2:variant==="none"?0:p.form==="quadraticPositive"?v[1]:-v[1],min=variant==="none"?-3:Math.min(a,b)-2,max=variant==="none"?3:Math.max(a,b)+2;
  const points:[number,number][]=Array.from({length:41},(_,i)=>{const x=min+(max-min)*i/40;return [x,variant==="none"?x*x+1:(x-a)*(x-b)];});
  if(variant!=="none"){points.push([a,0],[b,0],[(a+b)/2,((a+b)/2-a)*((a+b)/2-b)]);points.sort((l,r)=>l[0]-r[0]);}
  return {title:variant==="current"?"Roots and x-axis crossings":variant==="single"?"Related example: one distinct real root":"Related example: no real roots",description:variant==="none"?"y=x²+1 stays above the x-axis: no real x makes it zero.":variant==="single"?"y=(x−2)² touches the x-axis at x=2, giving one distinct real root.":`The original quadratic is zero at x=${a} and x=${b}. These are its x-axis crossings.`,xLabel:"x (unitless)",yLabel:"Function value (unitless)",kind:"lines",series:[{name:variant==="none"?"y = x² + 1":variant==="single"?"y = (x − 2)²":`y = (x − ${a})(x ${b<0?"+":"−"} ${Math.abs(b)})`,points}]};
 }
 if(q.skill==="percent"){const [amount,rate]=v,original=p.form==="percentOriginal"?amount/(1-rate/100):amount,final=original*(p.form==="percentDecrease"||p.form==="percentOriginal"?1-rate/100:1+rate/100);return {title:"Original and resulting prices",description:"Both bars are dollar amounts, not percentages. Their heights use the same scale beginning at zero.",xLabel:"Price stage",yLabel:"Dollars",kind:"bars",categories:["Original price","Resulting price"],series:[{name:"Price",points:[[0,original],[1,final]]}]};}
 if(q.skill==="mean"){
  let values:number[],categories:string[],description:string;
  if(p.form==="meanAdded"){values=[v[1],(v[0]*v[1]+v[2])/(v[0]+1)];categories=["Original mean","New mean"];description="These are aggregate means, not invented individual observations. The original individual measurements were not supplied.";}
  else{const count=p.form==="meanFour"?4:3;values=[...v.slice(1),count*v[0]-v.slice(1).reduce((a,b)=>a+b,0)];categories=values.map((_,i)=>i===values.length-1?"Recovered value":`Given value ${i+1}`);description="The final bar is the recovered missing measurement; earlier bars are the supplied measurements. All share the same scale.";}
  return {title:"Reading the measurements",description,xLabel:p.form==="meanAdded"?"Dataset mean":"Observation",yLabel:q.prompt.includes("minutes")?"Minutes":"Value (units not specified)",kind:"bars",categories,series:[{name:"Value",points:values.map((value,i)=>[i,value])}]};
 }
 return null;
}
export function geometryMeasurements(q:ExamBankQuestion){if(!q.proof)return null;const v=q.proof.values,f=q.proof.form;if(q.skill==="triangle")return {kind:"triangle" as const,base:f==="triangleHeight"?v[1]:v[0],height:f==="triangleHeight"?2*v[0]/v[1]:v[1],unit:"cm"};if(q.skill==="circle"){const radius=f==="circleRadius"||f==="circleDiameter"?Math.sqrt(v[0]):v[0];return {kind:"circle" as const,radius,diameter:2*radius,unit:"cm"};}return null;}
