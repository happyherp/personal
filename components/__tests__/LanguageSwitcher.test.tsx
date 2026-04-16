import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from '../LanguageSwitcher';

// Mock next-intl
jest.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
  useLocale: () => 'en',
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useParams: () => ({ locale: 'en' }),
}));
import React from 'react';

describe('LanguageSwitcher', () => {
  const renderLanguageSwitcher = (locale: string = 'en') => {
    // Mock useParams to return the locale
    jest.mocked(require('next/navigation').useParams).mockReturnValue({ locale });
    
    return render(<LanguageSwitcher />);
  };

  it('renders language switcher select element', () => {
    renderLanguageSwitcher('en');
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('displays current locale', () => {
    renderLanguageSwitcher('de');
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('de');
  });

  it('renders all language options', () => {
    renderLanguageSwitcher('en');
    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('DE')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });
});