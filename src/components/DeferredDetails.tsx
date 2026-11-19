'use client';
import {useState,type ReactNode} from 'react';
// Mount on first opening, then retain the subtree so closing never discards a draft.
export default function DeferredDetails({summary,children,className}:{summary:string;children:ReactNode;className?:string}){const [visited,setVisited]=useState(false);return <details className={className} onToggle={e=>{if(e.currentTarget.open)setVisited(true);}}><summary>{summary}</summary>{visited&&children}</details>;}
