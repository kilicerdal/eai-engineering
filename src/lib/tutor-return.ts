export const TUTOR_RETURN='eai-tutor-return-v1';
export function certificationReturn(value:unknown):string|null{return typeof value==='string'&&/^\/study\/certifications\/[a-z][a-z-]{0,60}#practice$/.test(value)?value:null;}
