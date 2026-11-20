import 'server-only';
import data from '../../../data/art/research/signature-studies.json';
export type ArtSource={title:string;url:string};
export type SignatureStudy={title:string;evidence:{claim:string;status:string;source:ArtSource;limit:string}[];description:[string,string][];technique:string[];provenance:[string,string,ArtSource][];room:{kind:string;caption:string};reception:{voice:string;text:string;source:ArtSource|null}[];study:ArtSource;studyNote:string;conservation:ArtSource;before:string;after:string;relation:string;palette:[string,string,string][];reviewed:string;reviewScope:string};
export const signatureStudies=data as unknown as Record<string,SignatureStudy>;
