import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';

// Mock i18n/navigation to prevent next-intl import issues
jest.mock('@/i18n/navigation', () => ({
  routing: {
    locales: ['en', 'de', 'es'] as const,
    defaultLocale: 'en',
    localePrefix: 'as-needed',
  },
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
}));

jest.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
}));
import React from 'react';

describe('LanguageSwitcher', () => {
  it('renders language switcher select element', () => {
    render(<LanguageSwitcher />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('displays current locale', () => {
    // Test with Spanish - component should work with different locales
    render(<LanguageSwitcher />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('en'); // Mocked to 'en' in jest.mock above
  });

  it('renders all language options', () => {
    render(<LanguageSwitcher />);
    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('DE')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });
});