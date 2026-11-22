'use client';
import {useEffect,useRef,useState} from 'react';

export default function ArtAudioIntroduction({title,transcript}:{title:string;transcript:string}){
 const [supported,setSupported]=useState(false),[state,setState]=useState('Stopped'),[error,setError]=useState('');
 const utterance=useRef<SpeechSynthesisUtterance|null>(null);
 function stop(){const active=utterance.current;utterance.current=null;if(active)window.speechSynthesis?.cancel();setState('Stopped');setError('');}
 useEffect(()=>{queueMicrotask(()=>setSupported('speechSynthesis' in window&&'SpeechSynthesisUtterance' in window));return()=>{const active=utterance.current;utterance.current=null;if(active)window.speechSynthesis?.cancel();};},[]);
 function play(){
  setError('');utterance.current=null;
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(transcript);u.lang='en-US';u.rate=.93;
   u.onend=()=>{if(utterance.current!==u)return;utterance.current=null;setState('Finished');};
   u.onerror=event=>{if(utterance.current!==u)return;utterance.current=null;setState('Stopped');if(!['canceled','interrupted'].includes(event.error))setError('Speech playback is unavailable. The full transcript remains below.');};
   utterance.current=u;speechSynthesis.speak(u);setState('Playing');
  }catch{utterance.current=null;setState('Stopped');setError('This browser cannot play the introduction. Read the transcript below.');}
 }
 function changePlayback(pause:boolean){try{if(pause)speechSynthesis.pause();else speechSynthesis.resume();setState(pause?'Paused':'Playing');}catch{utterance.current=null;try{speechSynthesis.cancel();}catch{/* Transcript remains available. */}setState('Stopped');setError('Speech playback is unavailable. The full transcript remains below.');}}
 return <details className="art-audio-intro" onToggle={event=>{if(!event.currentTarget.open&&utterance.current)stop();}}><summary>Listen: browser-read introduction · about {Math.max(1,Math.ceil(transcript.trim().split(/\s+/).length/140))} minutes</summary><p>Listen to an original Art Room introduction to {title}. This is a synthetic browser voice, not an artist’s voice or a museum recording. Voice availability and processing depend on your browser’s speech service. Closing this introduction stops playback.</p><div className="art-tool-row"><button disabled={!supported} onClick={play}>Play introduction</button><button disabled={!supported||state!=='Playing'} onClick={()=>changePlayback(true)}>Pause</button><button disabled={!supported||state!=='Paused'} onClick={()=>changePlayback(false)}>Resume</button><button disabled={!supported||!['Playing','Paused'].includes(state)} onClick={stop}>Stop</button></div><p role="status">{error||state}{!supported?' · Speech is unavailable here; use the transcript.':''}</p><h3>Complete transcript</h3><p>{transcript}</p></details>;
}
