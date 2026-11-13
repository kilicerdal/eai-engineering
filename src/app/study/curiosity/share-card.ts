import type {Fact} from './facts';
import {discoveryQuestion} from './insights';
export const CARD_WIDTH=1200, CARD_HEIGHT=1600;
export function wrapCardText(text:string,width:number,measure:(text:string)=>number):string[] {
  const lines:string[]=[];let line='';
  for(const word of text.trim().split(/\s+/)) {
    if(measure(word)>width) {
      if(line) {lines.push(line);line='';}
      let piece='';for(const character of word) {if(piece && measure(piece+character)>width) {lines.push(piece);piece='';}piece+=character;}line=piece;
    } else if(line && measure(line+' '+word)>width) {lines.push(line);line=word;} else line=line?line+' '+word:word;
  }
  if(line)lines.push(line);return lines;
}
export async function drawShareCard(canvas:HTMLCanvasElement,fact:Fact,background:string) {
  canvas.width=CARD_WIDTH;canvas.height=CARD_HEIGHT;
  const ctx=canvas.getContext('2d');if(!ctx)throw Error('Image creation is unavailable.');
  ctx.fillStyle='#061624';ctx.fillRect(0,0,CARD_WIDTH,CARD_HEIGHT);
  try {
    const image=await new Promise<HTMLImageElement>((resolve,reject)=>{const value=new Image();value.onload=()=>resolve(value);value.onerror=reject;value.src=background;});
    const scale=Math.max(CARD_WIDTH/image.width,CARD_HEIGHT/image.height);ctx.drawImage(image,(CARD_WIDTH-image.width*scale)/2,0,image.width*scale,image.height*scale);
  } catch { /* The card remains usable with the code-drawn background. */ }
  const shade=ctx.createLinearGradient(0,0,0,CARD_HEIGHT);shade.addColorStop(0,'rgba(4,15,27,.68)');shade.addColorStop(.45,'rgba(4,15,27,.94)');shade.addColorStop(1,'rgba(4,15,27,.98)');ctx.fillStyle=shade;ctx.fillRect(0,0,CARD_WIDTH,CARD_HEIGHT);
  ctx.strokeStyle='rgba(211,178,113,.26)';ctx.lineWidth=2;
  for(let i=0;i<5;i++){ctx.beginPath();ctx.ellipse(1040,330,160+i*75,160+i*75,0,0,Math.PI*2);ctx.stroke();}
  ctx.strokeStyle='#bca16b';ctx.strokeRect(34,34,1132,1532);
  ctx.textBaseline='top';ctx.fillStyle='#e8cf9e';ctx.font='28px Arial';ctx.fillText('dAI  /  THE CURIOSITY ROOM',80,88);
  ctx.font='22px Arial';ctx.fillStyle='#c5cdd0';ctx.fillText(fact.category.toUpperCase(),80,143);
  const blocks=[{text:discoveryQuestion(fact),font:'Georgia',size:64,color:'#faf1df',gap:36},{text:fact.title,font:'Georgia',size:48,color:'#e7c98b',gap:28},{text:fact.text,font:'Arial',size:36,color:'#e0e5e5',gap:0}];
  let layout:{lines:string[];size:number;font:string;color:string;gap:number}[]=[];
  for(let scale=1;scale>=.45;scale-=.025) {
    layout=blocks.map(block=>{const size=Math.floor(block.size*scale);ctx.font=`${size}px ${block.font}`;return {...block,size,lines:wrapCardText(block.text,1040,text=>ctx.measureText(text).width)};});
    if(layout.reduce((sum,block)=>sum+block.lines.length*block.size*1.3+block.gap,0)<=900)break;
  }
  let y=235;for(const block of layout){ctx.font=`${block.size}px ${block.font}`;ctx.fillStyle=block.color;for(const line of block.lines){ctx.fillText(line,80,y);y+=block.size*1.3;}y+=block.gap;}
  ctx.strokeStyle='rgba(211,178,113,.5)';ctx.beginPath();ctx.moveTo(80,1208);ctx.lineTo(1120,1208);ctx.stroke();
  const foot=(text:string,size:number,color:string,start:number)=>{ctx.font=`${size}px Arial`;ctx.fillStyle=color;const lines=wrapCardText(text,1040,text=>ctx.measureText(text).width);for(const line of lines){ctx.fillText(line,80,start);start+=size*1.3;}return start;}
  y=foot(`Source: ${fact.source}`,25,'#e7c98b',1240);
  y=foot(new URL(fact.url).hostname.replace(/^www\./,''),23,'#bdc9ce',y+10);
  foot(`Explore & check the source: eai.engineering/study/curiosity?fact=${fact.id}`,24,'#e0e5e5',Math.max(1380,y+30));
  ctx.font='20px Arial';ctx.fillStyle='#aabcc5';ctx.fillText('ANCIENT CURIOSITY. FUTURE POSSIBILITY.',80,1520);
}
