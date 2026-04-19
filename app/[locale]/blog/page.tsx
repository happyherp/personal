'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { BLOG_POSTS } from '@/lib/blog-data';

const ALL_TAGS = ['ALL', ...Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags)))];

function fmtDate(iso: string) {
  return new Date(iso)
    .toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' })
    .toUpperCase();
}

export default function Blog() {
  const t = useTranslations('Blog');
  const [tag, setTag] = useState('ALL');

  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const filtered = sorted.filter((p) => tag === 'ALL' || p.tags.includes(tag));
  const featured = tag === 'ALL' ? sorted.find((p) => p.featured) : null;
  const list = featured ? filtered.filter((p) => p !== featured) : filtered;

  return (
    <div className="page" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        <span>{t('eyebrow')}</span>
        <span>{BLOG_POSTS.length} ENTRIES · UPDATED {fmtDate(sorted[0].date)}</span>
      </div>
      <h1 className="display" style={{ fontSize: 'clamp(56px, 11vw, 180px)' }}>
        {t('title')}<span style={{ color: 'var(--accent)' }}>.</span>
      </h1>
      <p style={{ color: 'var(--ink-dim)', maxWidth: 640, fontSize: 18, lineHeight: 1.55, marginTop: 28 }}>
        {t('desc')}
      </p>

      {/* Filter chips */}
      <div style={{ marginTop: 48, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {ALL_TAGS.map((tg) => (
          <button key={tg} onClick={() => setTag(tg)} style={{
            padding: '8px 14px',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.08em',
            border: '1px solid ' + (tag === tg ? 'var(--accent)' : 'var(--rule-bright)'),
            background: tag === tg ? 'var(--accent)' : 'transparent',
            color: tag === tg ? '#0e0e0c' : 'var(--ink-dim)',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}>
            {tg}
          </button>
        ))}
        <span style={{ padding: '8px 14px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>
          {filtered.length} / {BLOG_POSTS.length} entries
        </span>
      </div>

      {/* Featured post */}
      {featured && (
        <Link href={`/blog/${featured.slug}`} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          marginTop: 60,
          padding: 32,
          border: '1px solid var(--rule-bright)',
          background: '#0d0d0b',
        }} className="featured-post">
          <div style={{ background: '#1a1916', border: '1px solid var(--rule)', overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src={featured.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.15) contrast(1.05)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 14 }}>
                ★ FEATURED · §{featured.no} · {fmtDate(featured.date)} · {featured.reading}
              </div>
              <h2 style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 14px', lineHeight: 1.05 }}>
                {featured.title}
              </h2>
              <p style={{ color: 'var(--ink-dim)', fontSize: 16, lineHeight: 1.55, margin: 0 }}>{featured.dek}</p>
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              {featured.tags.map((tg) => <span key={tg} className="tag">{tg}</span>)}
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--ink-dim)' }}>READ →</span>
            </div>
          </div>
        </Link>
      )}

      {/* Post list */}
      <div style={{ marginTop: 60, borderTop: '2px solid var(--ink)' }}>
        {list.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} style={{
            display: 'grid',
            gridTemplateColumns: '80px 140px 1fr 2fr 120px 40px',
            gap: 24,
            padding: '28px 0',
            borderBottom: '1px solid var(--rule)',
            alignItems: 'center',
          }} className="blog-row">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>§ {p.no}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{fmtDate(p.date)}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{p.title}</div>
              <div style={{ color: 'var(--ink-dim)', fontSize: 13, marginTop: 4 }}>{p.sub}</div>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)', lineHeight: 1.55 }}>{p.dek}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {p.tags.slice(0, 3).map((tg) => <span key={tg} className="tag">{tg}</span>)}
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)', width: '100%', marginTop: 4 }}>{p.reading}</span>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 18, textAlign: 'right', color: 'var(--ink-dim)' }}>→</div>
          </Link>
        ))}
      </div>

      {/* Subscribe strip */}
      <div style={{ marginTop: 80, padding: 28, border: '1px solid var(--rule-bright)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.12em', marginBottom: 8 }}>[ SUBSCRIBE ]</div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 6 }}>{t('subscribeTitle')}</div>
          <div style={{ color: 'var(--ink-dim)', fontSize: 14 }}>{t('subscribeDesc')}</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="mailto:carlosfreund@gmail.com?subject=Subscribe" style={{ padding: '12px 20px', background: 'var(--accent)', color: '#0e0e0c', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', fontWeight: 700 }}>
            EMAIL ME →
          </a>
        </div>
      </div>
    </div>
  );
}
