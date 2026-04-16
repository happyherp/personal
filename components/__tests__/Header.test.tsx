import { render, screen } from '@testing-library/react';
import Header from '../Header';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
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