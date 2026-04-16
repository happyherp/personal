import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('Footer', () => {
  const renderFooter = () => {
    return render(<Footer />);
  };

  it('renders footer with copyright', () => {
    renderFooter();
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Carlos Freund`)).toBeInTheDocument();
  });
});