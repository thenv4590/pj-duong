import type { MetadataRoute } from "next";
import { siteConfig, mainNav, allProducts } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", ...mainNav.map((item) => item.href)];
  const uniquePaths = Array.from(new Set(staticPaths));

  const staticEntries: MetadataRoute.Sitemap = uniquePaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
