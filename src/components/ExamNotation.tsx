import {renderToString} from "katex";
import {notationParts} from "@/lib/study-exam-learning";
import "katex/dist/katex.min.css";
export default function ExamNotation({text,plain=false}:{text:string;plain?:boolean}){
 if(plain)return <>{text}</>;
 return <>{notationParts(text).map((part,i)=>{if(!part.tex)return part.text;try{return <span key={i} className="exam-math-fragment" dangerouslySetInnerHTML={{__html:renderToString(part.tex,{throwOnError:true,strict:"ignore",trust:false,output:"htmlAndMathml"})}}/>;}catch{return part.text;}})}</>;
}
