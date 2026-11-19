import type { Metadata } from "next";
import Home from "./HomePage";
import { publicPageMetadata } from "@/lib/public-metadata";
export const metadata: Metadata = publicPageMetadata("/", "eAI | Intelligence Engineered", "Inspect Erdal Kilic’s engineering projects, source code and recorded evidence, or explore the dAI Learning Studio.");
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"ProfilePage",url:"https://www.eai.engineering/",mainEntity:{"@type":"Person",name:"Erdal Kilic",url:"https://www.eai.engineering/",sameAs:["https://github.com/kilicerdal"]}}).replace(/</g,"\\u003c")}}/><Home/></>; }
