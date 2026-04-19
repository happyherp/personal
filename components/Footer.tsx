'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('Navigation');
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h4>Carlos Freund</h4>
          <div style={{ color: 'var(--ink)', fontSize: 13, lineHeight: 1.6, maxWidth: 380 }}>
            Senior backend engineer shipping AI into production.<br />
            Freelancing from Belize · UTC-6 · EN/DE/ES
          </div>
          <div style={{ marginTop: 20, color: 'var(--ink-faint)', fontSize: 11 }}>
            Built in 2026. No tracking. No cookies. No frameworks.
          </div>
        </div>
        <div>
          <h4>Pages</h4>
          <Link href="/">{t('home')}</Link>
          <Link href="/work">{t('work')}</Link>
          <Link href="/blog">{t('blog')}</Link>
          <Link href="/about">{t('about')}</Link>
          <Link href="/contact">{t('contact')}</Link>
        </div>
        <div>
          <h4>Elsewhere</h4>
          <a href="https://github.com/happyherp" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://linkedin.com/in/carlos-freund-93630582" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://www.upwork.com/freelancers/~017414ed3a00e19ec0" target="_blank" rel="noopener noreferrer">Upwork ↗</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="mailto:carlosfreund@gmail.com">carlosfreund@gmail.com</a>
          <a href="https://calendly.com/carlosfreund/30min" target="_blank" rel="noopener noreferrer">Book a call ↗</a>
        </div>
      </div>
    </footer>
  );
}
