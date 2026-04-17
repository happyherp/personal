import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',
  
  // URL structure: /locale/path or /path (for default locale)
  localePrefix,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|es)/:path*', '/((?!api|_next|_vercel|.*\\..*|sitemap.xml|robots.txt).*)'],
};