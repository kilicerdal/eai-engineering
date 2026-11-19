import type { Metadata } from "next";
export function publicPageMetadata(path: string, title: string, description: string, image = "/images/heritage/orbital-score.webp"): Metadata {
 const url = new URL(path, "https://www.eai.engineering").href;
 return {title,description,alternates:{canonical:url},openGraph:{title,description,url,type:"website",siteName:"eAI",images:[{url:image,alt:title}]},twitter:{card:"summary_large_image",title,description,images:[image]}};
}
