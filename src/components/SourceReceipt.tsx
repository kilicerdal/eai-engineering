import type {ReactNode} from 'react';
export default function SourceReceipt({supports,href,label,limit,children}:{supports:string;href:string;label:string;limit:string;children?:ReactNode}){
 return <details className="signature-source"><summary>Evidence & source</summary><dl><dt>What it supports</dt><dd>{supports}</dd><dt>Read the source</dt><dd><a href={href} target={href.startsWith('https:')?'_blank':undefined} rel="noreferrer">{label} ↗</a></dd><dt>Keep in mind</dt><dd>{limit}</dd></dl>{children}</details>;
}
