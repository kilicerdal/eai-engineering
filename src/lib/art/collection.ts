import paintings from '../../../data/art/paintings.json';
export type ArtPainting={id:string;artist:string;index:number;title:string;date:string;era:string;medium:string;location:string;dimensions:string;image:string;thumbnail:string;width:number;height:number;credit:string;rights:string;licenseUrl:string;imageSource:string;originalUrl:string;commonsTitle:string;alt:string;story:string;how:string;details:string[];question:string;sources:{title:string;url:string}[];checked:string;imageStatus?:string;contentNote:string};
export const artPaintings:ArtPainting[]=paintings;
