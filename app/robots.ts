import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/workspace/", "/admin/", "/api/"],
      },
    ],
    sitemap: "https://deckpilotai.com/sitemap.xml",
  };
}
