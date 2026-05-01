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

        // Click About link
        await page.getByRole('navigation').getByRole('link', { name: navTexts.about, exact: true }).first().click();

        // Verify URL and content
        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}about`));
        await expect(page.getByRole('heading', { name: /About|Über|Sobre|Acerca de/i }).first()).toBeVisible();
      });

      test('should navigate to Work page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);

        await page.goto(lang === 'en' ? '/' : `/${lang}`);

        // Click Work link
        await page.getByRole('navigation').getByRole('link', { name: navTexts.work, exact: true }).first().click();

        // Verify URL
        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}work`));
      });

      test('should navigate to Contact page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);

        await page.goto(lang === 'en' ? '/' : `/${lang}`);

        // Click Contact link
        await page.getByRole('navigation').getByRole('link', { name: navTexts.contact, exact: true }).first().click();

        // Verify URL
        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}contact`));
      });

      test('should navigate to Home page from any page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);

        // Start on a different page
        await page.goto(lang === 'en' ? '/about' : `/${lang}/about`);

        // Click Home link
        await page.getByRole('navigation').getByRole('link', { name: navTexts.home, exact: true }).first().click();

        // Verify back to home
        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '(/)?'}$`));
      });
  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } }); // Mobile viewport

    test('should toggle mobile menu visibility', async ({ page }) => {
      await page.goto('/');

      // Desktop items should be hidden
      const homeLink = page.getByRole('link', { name: 'Home' }).first();
      await expect(homeLink).toBeHidden();

      // Click the hamburger menu to open
      await page.getByRole('button', { name: 'Open main menu' }).click();

      // Mobile items should be visible
      const mobileHomeLink = page.getByRole('link', { name: 'Home' }).last();
      await expect(mobileHomeLink).toBeVisible();

      // Click a link inside the mobile menu
      await mobileHomeLink.click();

      // Menu should close after clicking a link
      await expect(mobileHomeLink).toBeHidden();
    });
  });
    });
  }

  test('should maintain language when navigating between pages', async ({ page }) => {
    const i18n = new I18nHelper(page);

    // Start on German home page
    await page.goto('/de');

    const deNav = await i18n.getNavigationText('de');

    // Navigate through a few pages, verifying language is maintained
    await page.getByRole('navigation').getByRole('link', { name: deNav.work, exact: true }).first().click();
    await expect(page).toHaveURL(/\/de\/work/);

    await page.getByRole('navigation').getByRole('link', { name: deNav.about, exact: true }).first().click();
    await expect(page).toHaveURL(/\/de\/about/);

    await page.getByRole('navigation').getByRole('link', { name: deNav.contact, exact: true }).first().click();
    await expect(page).toHaveURL(/\/de\/contact/);
  });
});
