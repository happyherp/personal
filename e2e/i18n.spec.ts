import { test, expect } from '@playwright/test';
import { I18nHelper } from './utils/test-helpers';

test.describe('Internationalization Tests', () => {
  test.describe('Language Switching', () => {
    test('should switch from English to German', async ({ page }) => {
      const i18n = new I18nHelper(page);

      await page.goto('/');

      const enNav = await i18n.getNavigationText('en');
      await expect(page.locator('[data-testid="main-nav"]').getByText(enNav.home)).toBeVisible();

      await i18n.switchLanguage('de');

      const deNav = await i18n.getNavigationText('de');
      await expect(page.locator('[data-testid="main-nav"]').getByText(deNav.home)).toBeVisible();

      await i18n.verifyCurrentLanguage('de');
    });

    test('should switch from German to Spanish', async ({ page }) => {
      const i18n = new I18nHelper(page);

      await page.goto('/de');

      await i18n.switchLanguage('es');

      const esNav = await i18n.getNavigationText('es');
      await expect(page.locator('[data-testid="main-nav"]').getByText(esNav.home)).toBeVisible();

      await i18n.verifyCurrentLanguage('es');
    });

    test('should switch from Spanish back to English', async ({ page }) => {
      const i18n = new I18nHelper(page);

      await page.goto('/es');

      await i18n.switchLanguage('en');

      const enNav = await i18n.getNavigationText('en');
      await expect(page.locator('[data-testid="main-nav"]').getByText(enNav.home)).toBeVisible();

      await i18n.verifyCurrentLanguage('en');
    });
  });

  test.describe('Navigation Translation', () => {
    const languages = ['en', 'de', 'es'];

    for (const lang of languages) {
      test(`should display correct navigation in ${lang}`, async ({ page }) => {
        const i18n = new I18nHelper(page);

        await page.goto(lang === 'en' ? '/' : `/${lang}`);

        const navTexts = await i18n.getNavigationText(lang);
        const nav = page.locator('[data-testid="main-nav"]');

        for (const [_, text] of Object.entries(navTexts)) {
          await expect(nav.getByText(text, { exact: true })).toBeVisible();
        }
      });
    }
  });
});
