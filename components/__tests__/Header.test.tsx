import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

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
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) =>
    <a href={href} {...props}>{children}</a>,
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
  usePathname: () => '/',
}));

describe('Header', () => {
  it('renders the navigation element', () => {
    render(<Header />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders language switcher buttons', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'DE' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ES' })).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('work')).toBeInTheDocument();
    expect(screen.getByText('blog')).toBeInTheDocument();
    expect(screen.getByText('contact')).toBeInTheDocument();
  });
});
