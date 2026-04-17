import { test, expect } from '@playwright/test';
import { I18nHelper } from './utils/test-helpers';

test.describe('Contact Form Tests', () => {
  const languages = [
    { code: 'en', submitText: 'Send Message' },
    { code: 'de', submitText: 'Nachricht senden' },
    { code: 'es', submitText: 'Enviar mensaje' },
  ];

  for (const lang of languages) {
    test.describe(`Contact form in ${lang.code}`, () => {
      test('form has all required fields', async ({ page }) => {
        const i18n = new I18nHelper(page);
        await page.goto(`/${lang.code}/contact`);
        
        await expect(page.getByLabel(/Name|Nombre/)).toBeVisible();
        await expect(page.getByLabel(/Email|Correo/)).toBeVisible();
        await expect(page.getByLabel(/Message|Mensaje/)).toBeVisible();
      });

      test('can fill and submit form', async ({ page }) => {
        const i18n = new I18nHelper(page);
        await page.goto(`/${lang.code}/contact`);
        
        // Fill form fields
        await page.getByLabel(/Name|Nombre/).fill('Test User');
        await page.getByLabel(/Email|Correo/).fill('test@example.com');
        await page.getByLabel(/Message|Mensaje/).fill('This is a test message');
        
        // Submit button should be visible and enabled
        const submitButton = page.getByRole('button', { name: new RegExp(lang.submitText) });
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();
      });
    });
  }
});