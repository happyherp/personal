import { Page } from '@playwright/test';

export class I18nHelper {
  constructor(private page: Page) {}

  async switchLanguage(targetLang: string) {
    const select = this.page.locator('select');
    await select.selectOption(targetLang);
    // Wait for navigation to complete
    await this.page.waitForURL(url => {
      const urlStr = url.toString();
      if (targetLang === 'en') {
        return !urlStr.match(/\/de\//) && !urlStr.match(/\/es\//);
      }
      return urlStr.includes(`/${targetLang}/`);
    }, { timeout: 10000 });
  }

  async verifyCurrentLanguage(expectedLang: string) {
    const currentUrl = this.page.url();
    if (expectedLang === 'en') {
      expect(currentUrl).not.toMatch(/\/de\//);
      expect(currentUrl).not.toMatch(/\/es\//);
    } else {
      expect(currentUrl).toContain(`/${expectedLang}/`);
    }
  }

  async getNavigationText(language: string): Promise<Record<string, string>> {
    const translations: Record<string, Record<string, string>> = {
      en: {
        home: 'Home',
        about: 'About',
        work: 'Work',
        blog: 'Blog',
        contact: 'Contact',
      },
      de: {
        home: 'Start',
        about: 'Über mich',
        work: 'Arbeiten',
        blog: 'Blog',
        contact: 'Kontakt',
      },
      es: {
        home: 'Inicio',
        about: 'Acerca de',
        work: 'Trabajos',
        blog: 'Blog',
        contact: 'Contacto',
      },
    };
    return translations[language] || translations.en;
  }
}