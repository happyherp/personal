import { test, expect } from '@playwright/test';
import { I18nHelper } from './utils/test-helpers';

test.describe('Navigation Tests', () => {
  const languages = ['en', 'de', 'es'];

  for (const lang of languages) {
    test.describe(`Navigation in ${lang}`, () => {
      test('should navigate to About page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);

        await page.goto(lang === 'en' ? '/' : `/${lang}`);

        await page.locator('[data-testid="main-nav"]').getByText(navTexts.about).click();

        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}about`));
        await expect(page.locator('main').getByRole('heading', { name: /Carlos/ })).toBeVisible();
      });

      test('should navigate to Work page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);

        await page.goto(lang === 'en' ? '/' : `/${lang}`);

        await page.locator('[data-testid="main-nav"]').getByText(navTexts.work).click();

        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}work`));
      });

      test('should navigate to Blog page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);

        await page.goto(lang === 'en' ? '/' : `/${lang}`);

        await page.locator('[data-testid="main-nav"]').getByText(navTexts.blog).click();

        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}blog`));
      });

      test('should navigate to Contact page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);

        await page.goto(lang === 'en' ? '/' : `/${lang}`);

        await page.locator('[data-testid="main-nav"]').getByText(navTexts.contact).click();

        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}contact`));
      });

      test('should navigate to Home page from any page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);

        await page.goto(lang === 'en' ? '/about' : `/${lang}/about`);

        await page.locator('[data-testid="main-nav"]').getByText(navTexts.home).click();

        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang}/?$`));
      });
    });
  }

  test('should maintain language when navigating between pages', async ({ page }) => {
    const i18n = new I18nHelper(page);

    await page.goto('/de/work');

    const deNav = await i18n.getNavigationText('de');
    await page.locator('[data-testid="main-nav"]').getByText(deNav.blog).click();

    await expect(page).toHaveURL(/\/de\/blog/);

    await page.locator('[data-testid="main-nav"]').getByText(deNav.about).click();
    await expect(page).toHaveURL(/\/de\/about/);

    await page.locator('[data-testid="main-nav"]').getByText(deNav.contact).click();
    await expect(page).toHaveURL(/\/de\/contact/);
  });
});
