import type { MetadataRoute } from "next";
import { guidePosts } from "@/lib/guide-posts";

const BASE = "https://www.toronto-shotengai.com";

/**
 * 賃貸モードで公開しているページ（middlewareで許可しているパス）のみを掲載。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/guide`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/board`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const guidePages: MetadataRoute.Sitemap = guidePosts.map((post) => ({
    url: `${BASE}/guide/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...guidePages];
}
