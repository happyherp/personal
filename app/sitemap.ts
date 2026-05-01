import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://carlosfreund.com'; // Change to actual url
  
  // These are the core routes
  const routes = [
    '',
    '/about',
    '/work',
    '/contact',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for all supported languages
  const locales = ['en', 'de', 'es'];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      // Default to /en implicitly for next-intl or explicit /en, but let's
      // provide the base without locale prefix and also explicitly with locale.
      const isDefault = locale === 'en'; // Assuming 'en' is the default locale
      const url = isDefault 
        ? `${baseUrl}${route}` // Assuming domain.com/about for 'en'
        : `${baseUrl}/${locale}${route}`;
        
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}