'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Terminal } from '@/components/Terminal';
import { Ticker } from '@/components/Ticker';
import { PROJECTS } from '@/lib/projects';

function ProjectRow({ p }: { p: (typeof PROJECTS)[0] }) {
  return (
    <Link
      href={`/work/${p.id}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 200px 40px',
        gap: 24,
        padding: '28px 0',
        borderBottom: '1px solid var(--rule)',
        alignItems: 'center',
        transition: 'background 0.15s',
      }}
      className="project-row"
    >
      <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>
        § {p.no}
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>{p.title}</div>
        <div style={{ color: 'var(--ink-dim)', fontSize: 13, marginTop: 4 }}>{p.sub}</div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {p.stack.slice(0, 3).map((s) => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 18, textAlign: 'right', color: 'var(--ink-dim)' }}>→</div>
    </Link>
  );
}

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div>
      {/* Hero */}
      <section className="page" style={{ paddingTop: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span>PORTFOLIO 2026 / CARLOS FREUND</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(56px, 10vw, 160px)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              {t('heroLine1')} <span style={{ color: 'var(--accent)' }}>AI</span><br />
              {t('heroLine2')} <u style={{ textDecorationThickness: 2, textUnderlineOffset: 14 }}>{t('heroLine3')}</u>
            </h1>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 18, color: 'var(--ink-dim)', maxWidth: 480, marginTop: 32, lineHeight: 1.55 }}>
              {t('heroDesc')}
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
              <Link href="/work" className="btn btn-accent">{t('ctaWork')}</Link>
              <Link href="/contact" className="btn">{t('ctaContact')}</Link>
            </div>
          </div>

          {/* Photo collage */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(4, 110px)', gap: 8 }}>
            <Link
              href="/about"
              title="About Carlos →"
              style={{ gridColumn: '1 / 2', gridRow: '1 / 4', background: '#1a1916', overflow: 'hidden', border: '1px solid var(--rule-bright)', position: 'relative', display: 'block' }}
            >
              <img src="/assets/portrait-park.jpg" alt="Carlos" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', filter: 'grayscale(0.2) contrast(1.05)', display: 'block' }} />
            </Link>
            <Link
              href="/work/dpvcontrol"
              style={{ gridColumn: '2 / 3', gridRow: '1 / 3', background: '#050504', overflow: 'hidden', border: '1px solid var(--rule-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
            >
              <img src="/assets/dpv-top.jpg" alt="DPV" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Link>
            <Link
              href="/work/food-algorithm"
              style={{ gridColumn: '2 / 3', gridRow: '3 / 4', background: '#1a1916', overflow: 'hidden', border: '1px solid var(--rule-bright)', position: 'relative', display: 'block' }}
            >
              <img src="/assets/katana-pitch.png" alt="Pitching on a whiteboard" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </Link>
            <div style={{ gridColumn: '1 / 3', gridRow: '4 / 5', background: '#050504', border: '1px solid var(--rule-bright)', padding: 20, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)', lineHeight: 1.7 }}>
              <div style={{ color: 'var(--ink-faint)', fontSize: 10, letterSpacing: '0.1em', marginBottom: 8 }}>[ CAPTION ]</div>
              {t('photoCaption')}
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 120 }} />
      <Ticker />
      <div style={{ height: 120 }} />

      {/* Manifesto */}
      <section className="page" style={{ maxWidth: 1100 }}>
        <div className="section-num" style={{ marginBottom: 40 }}>{t('manifestoLabel')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, borderTop: '1px solid var(--ink)' }}>
          {([
            { n: '01', tk: 'manifesto1Title', bk: 'manifesto1Body' },
            { n: '02', tk: 'manifesto2Title', bk: 'manifesto2Body' },
            { n: '03', tk: 'manifesto3Title', bk: 'manifesto3Body' },
          ] as const).map((m, i) => (
            <div key={i} style={{
              padding: '32px 28px 32px 0',
              borderRight: i < 2 ? '1px solid var(--rule)' : 'none',
              paddingLeft: i > 0 ? 28 : 0,
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 16 }}>↳ {m.n}</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 32, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 12px', lineHeight: 1.1 }}>
                {t(m.tk)}
              </h3>
              <p style={{ color: 'var(--ink-dim)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{t(m.bk)}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 140 }} />

      {/* Terminal callout */}
      <section className="page">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 40, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="section-num" style={{ marginBottom: 12 }}>{t('terminalLabel')}</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 72, fontWeight: 400, margin: '0 0 16px', lineHeight: 1 }}>
              {t('terminalTitle')}<br />
              <span style={{ color: 'var(--accent)' }}>{t('terminalTitleAccent')}</span>
            </h2>
            <p style={{ color: 'var(--ink-dim)', maxWidth: 420, margin: '0 0 20px', fontSize: 16 }}>
              <span style={{ fontFamily: 'var(--mono)', color: 'var(--ink)' }}>ai-shell-loop</span> — {t('terminalDesc')}
            </p>
            <div>
              <Link href="/work/ai-shell-loop" className="btn">{t('terminalCta')}</Link>
            </div>
          </div>
          <div style={{ height: 480 }}>
            <Terminal />
          </div>
        </div>
      </section>

      <div style={{ height: 140 }} />

      {/* Selected work */}
      <section className="page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 80, margin: 0, fontWeight: 400, letterSpacing: '-0.02em' }}>
            {t('selectedWork')}
          </h2>
          <Link href="/work" className="btn">{t('allProjects')}</Link>
        </div>
        <div style={{ borderTop: '1px solid var(--ink)' }}>
          {PROJECTS.filter((p) => p.featured).map((p) => (
            <ProjectRow key={p.id} p={p} />
          ))}
        </div>
      </section>

      <div style={{ height: 80 }} />
    </div>
  );
}
