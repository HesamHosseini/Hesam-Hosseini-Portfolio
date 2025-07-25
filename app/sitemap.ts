import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://hesam-hosseini.vercel.app"; // Replace with your actual domain

    return [
        {
            url: `${baseUrl}/en`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
            alternates: {
                languages: {
                    en: `${baseUrl}/en`,
                    fa: `${baseUrl}/fa`,
                },
            },
        },
        {
            url: `${baseUrl}/fa`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
            alternates: {
                languages: {
                    en: `${baseUrl}/en`,
                    fa: `${baseUrl}/fa`,
                },
            },
        },
    ];
}
