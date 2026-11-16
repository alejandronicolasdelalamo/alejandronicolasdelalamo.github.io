import type { MetadataRoute } from "next";
import { SITIO } from "@/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITIO.url}/`, changeFrequency: "monthly", priority: 1 }];
}
