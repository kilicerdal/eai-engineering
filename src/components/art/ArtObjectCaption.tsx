import type {ArtPainting} from '@/lib/art/collection';
export default function ArtObjectCaption({painting:p}:{painting:ArtPainting}){
 return <><strong>{p.title}</strong> · {p.date}<br/>{p.medium}{p.dimensions&&<> · {p.dimensions} (recorded dimensions)</>}<br/>{p.location}<br/><span>{p.image?'Whole painting · original composition':'Reference-only work · institutional image linked'}. A screen view is not actual size or a calibrated color record.</span><br/>{p.credit} · {p.rights}<br/><a href="#work-description">Read the image description ↓</a> · <a href={p.imageSource} target="_blank" rel="noreferrer">Image source & reuse details ↗</a></>;
}
