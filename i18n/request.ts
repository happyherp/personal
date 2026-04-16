import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'de', 'es'] as const;
export const localePrefix = 'as-needed';

export default getRequestConfig(async ({ locale }) => {
  // Handle undefined or invalid locale
  const requestedLocale = locale || 'en';
  const validLocale = locales.includes(requestedLocale as any) ? requestedLocale : 'en';

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});