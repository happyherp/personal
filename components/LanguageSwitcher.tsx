'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n/request';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale || 'en';

  const handleLocaleChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = newLocale === 'en' 
      ? pathWithoutLocale || '/'
      : `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <select
      value={currentLocale as string}
      onChange={(e) => handleLocaleChange(e.target.value)}
      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale === 'en' ? 'EN' : locale === 'de' ? 'DE' : 'ES'}
        </option>
      ))}
    </select>
  );
}