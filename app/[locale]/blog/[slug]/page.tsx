'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { BLOG_POSTS, BlogBlock } from '@/lib/blog-data';

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const patterns = [
    { re: /\*\*([^*]+)\*\*/g, tag: 'strong' as const },
    { re: /\*([^*]+)\*/g, tag: 'em' as const },
    { re: /`([^`]+)`/g, tag: 'code' as const },
    { re: /\[([^\]]+)\]\(([^)]+)\)/g, tag: 'a' as const },
  ];
  const matches: { start: number; end: number; tag: string; content: string; href?: string }[] = [];
  patterns.forEach(({ re, tag }) => {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, tag, content: m[1], href: tag === 'a' ? m[2] : undefined });
    }
  });
  matches.sort((a, b) => a.start - b.start);
  const nonOverlap: typeof matches = [];
  let cursor = -1;
  for (const m of matches) {
    if (m.start >= cursor) { nonOverlap.push(m); cursor = m.end; }
  }
  let i = 0;
  nonOverlap.forEach((m, ki) => {
    if (m.start > i) parts.push(text.slice(i, m.start));
    if (m.tag === 'strong') parts.push(<strong key={ki}>{m.content}</strong>);
    else if (m.tag === 'em') parts.push(<em key={ki}>{m.content}</em>);
    else if (m.tag === 'code') parts.push(<code key={ki} style={{ fontFamily: 'var(--mono)', background: '#1a1916', border: '1px solid var(--rule)', padding: '1px 5px', fontSize: '0.9em' }}>{m.content}</code>);
    else if (m.tag === 'a') parts.push(<a key={ki} href={m.href} style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{m.content}</a>);
    i = m.end;
  });
  if (i < text.length) parts.push(text.slice(i));
  return parts;
}

function PostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--ink)', maxWidth: 720 }}>
      {blocks.map((b, i) => {
        if (b.t === 'p') return <p key={i} style={{ margin: '0 0 24px' }}>{renderInline(b.c!)}</p>;
        if (b.t === 'h2') return <h2 key={i} style={{ fontFamily: 'var(--mono)', fontSize: 14, letterSpacing: '0.12em', color: 'var(--accent)', marginTop: 56, marginBottom: 20, textTransform: 'uppercase', borderTop: '1px solid var(--rule-bright)', paddingTop: 20 }}>§ {b.c}</h2>;
        if (b.t === 'h3') return <h3 key={i} style={{ fontSize: 22, fontWeight: 600, margin: '40px 0 16px' }}>{b.c}</h3>;
        if (b.t === 'ul') return (
          <ul key={i} style={{ margin: '0 0 24px', paddingLeft: 0, listStyle: 'none' }}>
            {b.items!.map((it, j) => (
              <li key={j} style={{ position: 'relative', paddingLeft: 28, marginBottom: 10 }}>
                <span style={{ position: 'absolute', left: 0, top: 2, color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 12 }}>▸</span>
                {renderInline(it)}
              </li>
            ))}
          </ul>
        );
        if (b.t === 'code') return (
          <pre key={i} style={{ background: '#050504', border: '1px solid var(--rule-bright)', padding: '16px 20px', overflow: 'auto', fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.55, color: '#d8d6cf', margin: '0 0 28px' }}>
            <div style={{ color: 'var(--ink-faint)', fontSize: 10, letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase' }}>{b.lang || 'text'}</div>
            {b.c}
          </pre>
        );
        if (b.t === 'quote') return (
          <blockquote key={i} style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 24, margin: '0 0 28px', fontSize: 22, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.45 }}>
            {renderInline(b.c!)}
          </blockquote>
        );
        if (b.t === 'hr') return <hr key={i} style={{ border: 0, borderTop: '1px dashed var(--rule-bright)', margin: '40px 0' }} />;
        if (b.t === 'img') return (
          <figure key={i} style={{ margin: '0 0 28px' }}>
            <img src={b.src} style={{ width: '100%', border: '1px solid var(--rule-bright)' }} alt={b.cap || ''} />
            {b.cap && <figcaption style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', marginTop: 8 }}>— {b.cap}</figcaption>}
          </figure>
        );
        return null;
      })}
    </div>
  );
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: '2-digit' });
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const idx = sorted.findIndex((p) => p.slug === slug);
  const prev = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const next = idx > 0 ? sorted[idx - 1] : null;
  const h2s = post.blocks.filter((b) => b.t === 'h2');

  return (
    <div className="page" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div className="eyebrow" style={{ marginBottom: 32 }}>
        <span><Link href="/blog" style={{ color: 'var(--ink-faint)' }}>§ BLOG</Link> / §{post.no} / {post.tags[0]?.toUpperCase()}</span>
        <span>{fmtDate(post.date).toUpperCase()} · {post.reading}</span>
      </div>

      <h1 style={{ fontSize: 'clamp(42px, 7vw, 88px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.02, margin: '0 0 20px', maxWidth: 1100 }}>
        {post.title}<span style={{ color: 'var(--accent)' }}>.</span>
      </h1>
      <p style={{ fontSize: 22, color: 'var(--ink-dim)', lineHeight: 1.45, maxWidth: 780, margin: '0 0 40px', fontStyle: 'italic' }}>
        {post.sub}
      </p>

      <div style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '16px 0', borderTop: '1px solid var(--rule-bright)', borderBottom: '1px solid var(--rule-bright)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--ink-dim)', marginBottom: 48, flexWrap: 'wrap' }}>
        <span>BY <b style={{ color: 'var(--ink)' }}>CARLOS FREUND</b></span>
        <span style={{ color: 'var(--ink-faint)' }}>◇</span>
        <span>{fmtDate(post.date).toUpperCase()}</span>
        <span style={{ color: 'var(--ink-faint)' }}>◇</span>
        <span>{post.reading.toUpperCase()} READ</span>
        <span style={{ color: 'var(--ink-faint)' }}>◇</span>
        <span>BELIZE · UTC−6</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {post.tags.map((tg) => <span key={tg} className="tag">{tg}</span>)}
        </span>
      </div>

      {post.hero && (
        <div style={{ marginBottom: 56, border: '1px solid var(--rule-bright)', background: '#0d0d0b', overflow: 'hidden' }}>
          <img src={post.hero} alt="" style={{ width: '100%', display: 'block', maxHeight: 560, objectFit: 'cover', filter: 'contrast(1.05)' }} />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 60, alignItems: 'start' }}>
        <aside style={{ position: 'sticky', top: 100, fontFamily: 'var(--mono)', fontSize: 11, lineHeight: 1.8, color: 'var(--ink-dim)' }}>
          <div style={{ color: 'var(--ink-faint)', letterSpacing: '0.12em', marginBottom: 8 }}>[ IN THIS POST ]</div>
          {h2s.map((b, i) => (
            <div key={i} style={{ padding: '4px 0', borderLeft: '1px solid var(--rule)', paddingLeft: 12 }}>
              {String(i + 1).padStart(2, '0')} · {b.c}
            </div>
          ))}
          <div style={{ marginTop: 32, color: 'var(--ink-faint)', letterSpacing: '0.12em', marginBottom: 8 }}>[ SHARE ]</div>
          <a href={`mailto:?subject=${encodeURIComponent(post.title)}`} style={{ color: 'var(--ink-dim)', display: 'block', padding: '4px 0' }}>→ EMAIL</a>
        </aside>

        <div>
          <PostBody blocks={post.blocks} />
          <div style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid var(--rule-bright)', display: 'grid', gridTemplateColumns: '72px 1fr', gap: 20, alignItems: 'center', maxWidth: 720 }}>
            <div style={{ width: 72, height: 72, border: '1px solid var(--rule-bright)', overflow: 'hidden' }}>
              <img src="/assets/portrait-caterpillar.jpg" alt="Carlos" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.08em', marginBottom: 4 }}>WRITTEN BY</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Carlos Freund</div>
              <div style={{ fontSize: 13, color: 'var(--ink-dim)' }}>
                Senior backend engineer shipping AI into production. Writes from a porch in Belize.{' '}
                <Link href="/contact" style={{ color: 'var(--accent)' }}>Say hi →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '2px solid var(--ink)', borderBottom: '1px solid var(--rule-bright)' }}>
        {prev ? (
          <Link href={`/blog/${prev.slug}`} style={{ display: 'block', padding: '28px 28px 28px 0', borderRight: '1px solid var(--rule-bright)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 8 }}>← OLDER · §{prev.no}</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{prev.title}</div>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/blog/${next.slug}`} style={{ display: 'block', padding: '28px 0 28px 28px', textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 8 }}>NEWER · §{next.no} →</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{next.title}</div>
          </Link>
        ) : <div />}
      </div>

      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <Link href="/blog" style={{ padding: '12px 24px', border: '1px solid var(--rule-bright)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--ink)' }}>← ALL POSTS</Link>
      </div>
    </div>
  );
}
