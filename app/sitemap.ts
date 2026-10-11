import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://deckpilotai.com";
  const now = new Date();

  const routes = [
    "",
    "/product",
    "/solutions",
    "/technology",
    "/about",
    "/contact",
    "/security",
    "/privacy",
    "/terms",
    "/login",
    "/register",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/product" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/product" || route === "/solutions" ? 0.9 : 0.7,
  }));
}
