'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Link, usePathname, useRouter, routing } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const NAV_ITEMS = ['home', 'work', 'blog', 'about', 'contact'] as const;

function getActivePage(pathname: string): string {
  if (pathname === '/' || pathname === '') return 'home';
  const seg = pathname.split('/').filter(Boolean);
  const last = seg[seg.length - 1];
  if (routing.locales.includes(last as never)) return 'home';
  return last || 'home';
}

export function Header() {
  const t = useTranslations('Navigation');
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = (params.locale as string) || routing.defaultLocale;

  const [time, setTime] = useState('');
  const active = getActivePage(pathname);

  useEffect(() => {
    const tick = () => {
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Belize',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat('en-GB', opts).format(new Date()));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav className="nav" data-testid="main-nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          CF<span className="dot">_</span>
        </Link>

        <div className="nav-links">
          {NAV_ITEMS.map((key) => {
            const href = key === 'home' ? '/' : `/${key}`;
            const isActive = active === key;
            return (
              <Link key={key} href={href} className={isActive ? 'active' : ''}>
                {t(key)}
              </Link>
            );
          })}
        </div>

        <div className="nav-meta">
          <div style={{ display: 'flex', gap: 2, border: '1px solid var(--rule-bright)' }}>
            {routing.locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                title={`Switch to ${l.toUpperCase()}`}
                style={{
                  padding: '3px 8px',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.05em',
                  border: 'none',
                  background: locale === l ? 'var(--accent)' : 'transparent',
                  color: locale === l ? '#0e0e0c' : 'var(--ink-dim)',
                  cursor: 'pointer',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <span>
            <span className="status-dot" />
            AVAILABLE
          </span>
          {time && <span>BZE · {time}</span>}
        </div>
      </div>
    </nav>
  );
}
