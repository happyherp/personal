import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

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

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
}));

describe('Header', () => {
  const renderHeader = () => {
    return render(<Header />);
  };

  it('renders the site title', () => {
    renderHeader();
    expect(screen.getByText('Carlos Freund')).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    renderHeader();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderHeader();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});