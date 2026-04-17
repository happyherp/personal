import { test, expect } from '@playwright/test';
import { I18nHelper } from './utils/test-helpers';

test.describe('Internationalization Tests', () => {
  test.describe('Language Switching', () => {
    test('should switch from English to German', async ({ page }) => {
      const i18n = new I18nHelper(page);
      
      // Start on English home page
      await page.goto('/');
      
      // Verify English content
      const enNav = await i18n.getNavigationText('en');
      await expect(page.getByText(enNav.home)).toBeVisible();
      
      // Switch to German
      await i18n.switchLanguage('de');
      
      // Verify German content
      const deNav = await i18n.getNavigationText('de');
      await expect(page.getByText(deNav.home)).toBeVisible();
      
      // Verify URL contains /de/
      await i18n.verifyCurrentLanguage('de');
    });

    test('should switch from German to Spanish', async ({ page }) => {
      const i18n = new I18nHelper(page);
      
      await page.goto('/de');
      
      // Switch to Spanish
      await i18n.switchLanguage('es');
      
      // Verify Spanish content
      const esNav = await i18n.getNavigationText('es');
      await expect(page.getByText(esNav.home)).toBeVisible();
      
      // Verify URL contains /es/
      await i18n.verifyCurrentLanguage('es');
    });

    test('should switch from Spanish back to English', async ({ page }) => {
      const i18n = new I18nHelper(page);
      
      await page.goto('/es');
      
      // Switch to English
      await i18n.switchLanguage('en');
      
      // Verify English content
      const enNav = await i18n.getNavigationText('en');
      await expect(page.getByText(enNav.home)).toBeVisible();
      
      // Verify URL does not contain language prefix
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
        
        // Verify all navigation links are translated
        for (const [_, text] of Object.entries(navTexts)) {
          await expect(page.getByText(text, { exact: true })).toBeVisible();
        }
      });
    }
  });
});