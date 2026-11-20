/** A separate, versioned key. Never reads or replaces other rooms' saved work. */
export const ART_GALLERY_KEY='dai-art-gallery-v1';
export type ArtGallery={version:1;ids:string[]};
export function parseArtGallery(raw:string|null,allowed:ReadonlySet<string>):ArtGallery{
 if(raw===null)return {version:1,ids:[]};
 if(raw.length>50000)throw Error('This gallery copy is too large. Your saved copy is unchanged.');
 let value:unknown;
 try{value=JSON.parse(raw);}catch{throw Error('This gallery copy cannot be read. Download it before trying recovery; it has not been replaced.');}
 if(!value||typeof value!=='object'||!('version'in value)||value.version!==1||!('ids'in value)||!Array.isArray(value.ids)||value.ids.length>allowed.size||value.ids.some(id=>typeof id!=='string'||!allowed.has(id))||new Set(value.ids).size!==value.ids.length)throw Error('This gallery copy cannot be read. Download it before trying recovery; it has not been replaced.');
 return {version:1,ids:[...value.ids]};
}
