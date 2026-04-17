import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/navigation';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|es)/:path*', '/((?!api|_next|_vercel|.*\\..*|sitemap.xml|robots.txt).*)'],
};