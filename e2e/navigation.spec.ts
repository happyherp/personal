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
        await page.getByText(navTexts.about).click();
        
        // Verify URL and content
        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}about`));
        await expect(page.getByRole('heading', { name: /About|Über|Sobre/ })).toBeVisible();
      });

      test('should navigate to Work page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);
        
        await page.goto(lang === 'en' ? '/' : `/${lang}`);
        
        // Click Work link
        await page.getByText(navTexts.work).click();
        
        // Verify URL
        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}work`));
      });

      test('should navigate to Blog page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);
        
        await page.goto(lang === 'en' ? '/' : `/${lang}`);
        
        // Click Blog link
        await page.getByText(navTexts.blog).click();
        
        // Verify URL
        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}blog`));
      });

      test('should navigate to Contact page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);
        
        await page.goto(lang === 'en' ? '/' : `/${lang}`);
        
        // Click Contact link
        await page.getByText(navTexts.contact).click();
        
        // Verify URL
        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}contact`));
      });

      test('should navigate to Home page from any page', async ({ page }) => {
        const i18n = new I18nHelper(page);
        const navTexts = await i18n.getNavigationText(lang);
        
        // Start on a different page
        await page.goto(lang === 'en' ? '/about' : `/${lang}/about`);
        
        // Click Home link
        await page.getByText(navTexts.home).click();
        
        // Verify back to home
        await expect(page).toHaveURL(new RegExp(`/${lang === 'en' ? '' : lang + '/'}$`));
      });
    });
  }

  test('should maintain language when navigating between pages', async ({ page }) => {
    const i18n = new I18nHelper(page);
    
    // Start on German work page
    await page.goto('/de/work');
    
    // Navigate to blog
    const deNav = await i18n.getNavigationText('de');
    await page.getByText(deNav.blog).click();
    
    // Verify still in German
    await expect(page).toHaveURL(/\/de\/blog/);
    
    // Navigate through a few more pages
    await page.getByText(deNav.about).click();
    await expect(page).toHaveURL(/\/de\/about/);
    
    await page.getByText(deNav.contact).click();
    await expect(page).toHaveURL(/\/de\/contact/);
  });
});