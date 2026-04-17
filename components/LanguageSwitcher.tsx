'use client';

import { useParams } from 'next/navigation';
import { useRouter, usePathname, routing } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as string) || routing.defaultLocale;

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select
      value={currentLocale as string}
      onChange={(e) => handleLocaleChange(e.target.value)}
      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {routing.locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale === 'en' ? 'EN' : locale === 'de' ? 'DE' : 'ES'}
        </option>
      ))}
    </select>
  );
}