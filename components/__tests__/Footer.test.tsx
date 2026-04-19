import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) =>
    <a href={href} {...props}>{children}</a>,
}));

describe('Footer', () => {
  it('renders footer with site name', () => {
    render(<Footer />);
    expect(screen.getByText('Carlos Freund')).toBeInTheDocument();
  });

  it('renders contact email', () => {
    render(<Footer />);
    expect(screen.getByText('carlosfreund@gmail.com')).toBeInTheDocument();
  });
});
