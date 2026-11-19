import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
 return {rules:{userAgent:"*",allow:"/",disallow:["/api/","/recruiters/","/auth/","/study/account","/your-space"]},sitemap:"https://www.eai.engineering/sitemap.xml",host:"https://www.eai.engineering"};
}
