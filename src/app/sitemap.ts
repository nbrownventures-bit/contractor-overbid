import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://contractoroverbid.com'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/analyze`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  const seoPages = [
    'roofing',
    'hvac',
    'plumbing',
    'electrical',
    'kitchen-remodel',
    'general-contractor',
    'bathroom-remodel',
    'deck-patio',
    'painting',
    'flooring',
  ]

  const tradePages: MetadataRoute.Sitemap = seoPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const supportPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [...staticPages, ...tradePages, ...supportPages]
}
