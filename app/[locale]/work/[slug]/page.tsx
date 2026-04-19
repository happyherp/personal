'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { PROJECTS, PROJECT_DETAILS } from '@/lib/projects';

function Slideshow({ slides }: { slides: { src: string; caption: string }[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((x) => (x + 1) % slides.length), 3200);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div style={{ position: 'relative', border: '1px solid var(--rule-bright)', background: '#1a1916', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 480, padding: 24 }}>
          {slides.map((s, k) => (
            <img key={k} src={s.src} alt={s.caption} style={{
              position: k === 0 ? 'relative' : 'absolute',
              maxWidth: 'calc(100% - 48px)',
              maxHeight: 480,
              width: 'auto',
              height: 'auto',
              opacity: k === idx ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 12, right: 16, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)', background: '#0d0d0bc0', padding: '4px 8px' }}>
          {String(idx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
        <button onClick={() => setIdx((x) => (x - 1 + slides.length) % slides.length)} style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', width: 40, height: 40, background: '#0d0d0bd0', border: '1px solid var(--rule-bright)', color: 'var(--ink)', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
        <button onClick={() => setIdx((x) => (x + 1) % slides.length)} style={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', width: 40, height: 40, background: '#0d0d0bd0', border: '1px solid var(--rule-bright)', color: 'var(--ink)', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', marginTop: 8 }}>↳ {slides[idx].caption}</div>
    </div>
  );
}

function DKV({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 10, padding: '6px 0', borderBottom: last ? 'none' : '1px dashed var(--rule)' }}>
      <span style={{ color: 'var(--ink-faint)', fontSize: 10 }}>{k}</span>
      <span style={{ color: 'var(--ink)', fontSize: 12 }}>{v}</span>
    </div>
  );
}

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const p = PROJECTS.find((pp) => pp.id === slug);
  if (!p) notFound();

  const d = PROJECT_DETAILS[p.id] || { long: p.summary, bullets: [], links: [] };
  const pidx = PROJECTS.findIndex((pp) => pp.id === p.id);
  const prev = PROJECTS[(pidx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(pidx + 1) % PROJECTS.length];

  return (
    <div className="page" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <Link href="/work" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-dim)' }}>← BACK TO INDEX</Link>

      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end', borderBottom: '1px solid var(--rule-bright)', paddingBottom: 40 }}>
        <div>
          <div className="section-num" style={{ marginBottom: 12 }}>§ {p.no} / {p.year}</div>
          <h1 className="display" style={{ fontSize: 'clamp(44px, 8vw, 120px)' }}>{p.title}</h1>
          <p style={{ color: 'var(--ink-dim)', fontSize: 20, maxWidth: 720, marginTop: 20, lineHeight: 1.5 }}>{p.sub}</p>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)', textAlign: 'right', lineHeight: 1.8 }}>
          <div style={{ color: 'var(--ink-faint)' }}>[ ROLE ]</div>
          <div style={{ color: 'var(--ink)', fontSize: 14 }}>{p.role}</div>
          <div style={{ color: 'var(--ink-faint)', marginTop: 10 }}>[ STACK ]</div>
          <div>{p.stack.join(' / ')}</div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        {d.slideshow ? (
          <Slideshow slides={d.slideshow} />
        ) : (
          <div style={{ border: '1px solid var(--rule-bright)', background: '#1a1916', padding: 24, display: 'flex', justifyContent: 'center' }}>
            <img src={p.thumb} style={{ maxWidth: '100%', maxHeight: 480, width: 'auto', height: 'auto', display: 'block' }} alt={p.title} />
          </div>
        )}
      </div>

      {d.extraImages?.map((ex, i) => (
        <div key={i} style={{ marginTop: 24 }}>
          <div style={{ border: '1px solid var(--rule-bright)', background: '#1a1916', padding: 24, display: 'flex', justifyContent: 'center' }}>
            <img src={ex.src} style={{ maxWidth: '100%', maxHeight: 480, width: 'auto', height: 'auto', display: 'block' }} alt={ex.caption} />
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', marginTop: 8 }}>↳ {ex.caption}</div>
        </div>
      ))}

      {d.video && (
        <div style={{ marginTop: 40 }}>
          <div className="section-num" style={{ marginBottom: 12 }}>§ DEMO VIDEO</div>
          <div style={{ position: 'relative', border: '1px solid var(--rule-bright)', background: '#1a1916', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe src={d.video} title="Demo video" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} />
          </div>
        </div>
      )}

      <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 60 }}>
        <div>
          <div className="section-num" style={{ marginBottom: 8 }}>§ OVERVIEW</div>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--ink)', margin: 0 }}>{d.long}</p>
          {d.bullets.length > 0 && (
            <>
              <div style={{ height: 40 }} />
              <div className="section-num" style={{ marginBottom: 8 }}>§ HIGHLIGHTS</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {d.bullets.map((b, i) => (
                  <li key={i} style={{ display: 'grid', gridTemplateColumns: '30px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px dashed var(--rule)', fontSize: 15 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {d.links.length > 0 && (
            <>
              <div style={{ height: 40 }} />
              <div className="section-num" style={{ marginBottom: 12 }}>§ LINKS</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {d.links.map((l, i) => (
                  <a key={i} href={l.u} target="_blank" rel="noopener noreferrer" className="btn">{l.l}</a>
                ))}
              </div>
            </>
          )}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.8 }}>
          <div style={{ border: '1px solid var(--rule-bright)', padding: 20 }}>
            <div style={{ color: 'var(--ink-faint)', fontSize: 10, letterSpacing: '0.1em', marginBottom: 12 }}>[ AT A GLANCE ]</div>
            <DKV k="PROJECT" v={p.id} />
            <DKV k="YEAR" v={p.year} />
            <DKV k="ROLE" v={p.role} />
            {p.stars && <DKV k="STARS" v={p.stars} />}
            <DKV k="STACK" v={p.stack.join(', ')} last />
          </div>
        </div>
      </div>

      <div style={{ height: 100 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--rule-bright)', border: '1px solid var(--rule-bright)' }}>
        <Link href={`/work/${prev.id}`} style={{ padding: 24, background: 'var(--bg)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>← PREV / § {prev.no}</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 6 }}>{prev.title}</div>
        </Link>
        <Link href={`/work/${next.id}`} style={{ padding: 24, background: 'var(--bg)', textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>NEXT / § {next.no} →</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 6 }}>{next.title}</div>
        </Link>
      </div>
    </div>
  );
}
