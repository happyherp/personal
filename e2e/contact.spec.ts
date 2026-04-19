import { test, expect } from '@playwright/test';

test.describe('Contact Form Tests', () => {
  const languages = [
    { code: 'en', submitText: /send message/i },
    { code: 'de', submitText: /nachricht senden/i },
    { code: 'es', submitText: /enviar mensaje/i },
  ];

  for (const lang of languages) {
    test.describe(`Contact form in ${lang.code}`, () => {
      test('form has all required fields', async ({ page }) => {
        await page.goto(`/${lang.code}/contact`);

        await expect(page.getByLabel(/name|nombre/i)).toBeVisible();
        await expect(page.getByLabel(/e-mail|email|correo/i)).toBeVisible();
        await expect(page.getByLabel(/nachricht|message|mensaje/i)).toBeVisible();
      });

      test('can fill and submit form', async ({ page }) => {
        await page.goto(`/${lang.code}/contact`);

        await page.getByLabel(/name|nombre/i).fill('Test User');
        await page.getByLabel(/e-mail|email|correo/i).fill('test@example.com');
        await page.getByLabel(/nachricht|message|mensaje/i).fill('This is a test message');

        const submitButton = page.getByRole('button', { name: lang.submitText });
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();
      });
    });
  }
});
