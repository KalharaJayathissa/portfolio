import type { MetadataRoute } from "next";

const siteUrl = "https://kalhara.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/read`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/socket`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
