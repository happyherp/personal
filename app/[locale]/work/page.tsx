'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PROJECTS } from '@/lib/projects';

const TAG_MAP: Record<string, string[]> = {
  AI: ['AI', 'Python', 'OpenAI', 'MCP', 'Embeddings'],
  BACKEND: ['Kotlin', 'Java', 'Spring', 'Hibernate', 'AWS Redshift'],
  OSS: ['OSS', 'Haskell', 'Hackage'],
  EMBEDDED: ['C++', 'ESP32', 'Embedded'],
  SECURITY: ['Security', 'GDPR', 'Prompt Injection'],
  STARTUP: ['Angular', 'Algorithms'],
};
const FILTERS = ['ALL', ...Object.keys(TAG_MAP)] as const;

export default function Work() {
  const t = useTranslations('Work');
  const [filter, setFilter] = useState<string>('ALL');

  const visible = PROJECTS.filter(
    (p) => filter === 'ALL' || p.stack.some((s) => TAG_MAP[filter]?.includes(s))
  );

  return (
    <div className="page" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        <span>{t('eyebrow')}</span>
      </div>
      <h1 className="display" style={{ fontSize: 'clamp(56px, 11vw, 180px)' }}>
        {t('title')}<span style={{ color: 'var(--accent)' }}>.</span>
      </h1>
      <p style={{ color: 'var(--ink-dim)', maxWidth: 640, fontSize: 18, lineHeight: 1.55, marginTop: 28 }}>
        {t('desc')}
      </p>

      <div style={{ marginTop: 48, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 14px',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.08em',
              border: '1px solid ' + (filter === f ? 'var(--accent)' : 'var(--rule-bright)'),
              background: filter === f ? 'var(--accent)' : 'transparent',
              color: filter === f ? '#0e0e0c' : 'var(--ink-dim)',
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
        <span style={{ padding: '8px 14px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>
          {visible.length} / {PROJECTS.length} entries
        </span>
      </div>

      <div style={{ marginTop: 40, borderTop: '2px solid var(--ink)' }}>
        {visible.map((p) => (
          <Link
            key={p.id}
            href={`/work/${p.id}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 120px 1fr 1.5fr 120px 40px',
              gap: 24,
              padding: '28px 0',
              borderBottom: '1px solid var(--rule)',
              alignItems: 'center',
              transition: 'background 0.15s',
            }}
            className="work-row"
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>§ {p.no}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{p.year}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{p.title}</div>
              <div style={{ color: 'var(--ink-dim)', fontSize: 13, marginTop: 4 }}>{p.sub}</div>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)' }}>{p.summary}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {p.stack.slice(0, 3).map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 18, textAlign: 'right', color: 'var(--ink-dim)' }}>→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
