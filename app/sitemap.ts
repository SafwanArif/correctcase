import type { MetadataRoute } from 'next'

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://correctcase.co.uk';

    // Define static routes here. In a real programmatic SEO setup, 
    // these might come from a list of supported conversions.
    const routes = [
        '',
        '/sentence-case',
        '/title-case',
        '/slug-generator',
        // Add other planned routes
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    }));
}
