'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

function Field({
  label,
  id,
  type = 'text',
  area,
  value,
  onChange,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  area?: boolean;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const style = {
    background: 'transparent',
    border: 'none',
    color: 'var(--ink)',
    fontFamily: 'var(--sans)',
    fontSize: 18,
    outline: 'none',
    resize: 'vertical' as const,
    padding: 0,
    width: '100%',
  };
  return (
    <label
      htmlFor={id}
      style={{ display: 'grid', gap: 6, padding: '16px 0', borderBottom: '1px solid ' + (focus ? 'var(--ink)' : 'var(--rule)'), cursor: 'text' }}
    >
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: focus ? 'var(--accent)' : 'var(--ink-faint)', letterSpacing: '0.1em' }}>
        [ {label} ]
      </span>
      {area ? (
        <textarea
          id={id}
          rows={5}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={style}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={style}
        />
      )}
    </label>
  );
}

function DirectLine({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 10, padding: '4px 0', borderBottom: last ? 'none' : '1px dashed var(--rule)' }}>
      <span style={{ color: 'var(--ink-faint)', fontSize: 11, fontFamily: 'var(--mono)' }}>{label}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Contact() {
  const t = useTranslations('Contact');
  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'America/Belize',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        weekday: 'short',
      }).format(new Date()));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const sent = status === 'sent';

  return (
    <div className="page" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        <span>{t('eyebrow')}</span>
      </div>
      <h1 className="display" style={{ fontSize: 'clamp(56px, 11vw, 180px)' }}>
        {t('title')}<span style={{ color: 'var(--accent)' }}>.</span>
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: 20, maxWidth: 720, marginTop: 24, lineHeight: 1.55 }}>
        {t('intro')}
      </p>

      <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="section-num" style={{ marginBottom: 16 }}>{t('sectionForm')}</div>
          <Field label={t('labelName')} id="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Field label={t('labelEmail')} id="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          <Field label={t('labelCompany')} id="company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
          <Field label={t('labelMessage')} id="message" area value={form.message} onChange={(v) => setForm({ ...form, message: v })} required />
          <div style={{ marginTop: 24, display: 'flex', gap: 14, alignItems: 'center' }}>
            <button type="submit" className="btn btn-accent" disabled={sent || status === 'sending'}>
              {sent ? '✓ ' + t('sent') : t('submit')}
            </button>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>
              {sent ? t('replyTimeSent') : t('replyTime')}
            </span>
          </div>
          {status === 'error' && (
            <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 12, color: '#ff6b6b' }}>{t('error')}</div>
          )}
        </form>

        {/* Direct contact + clock */}
        <div>
          <div className="section-num" style={{ marginBottom: 16 }}>{t('sectionDirect')}</div>
          <div style={{ border: '1px solid var(--rule-bright)', padding: 24, fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 2 }}>
            <DirectLine label="EMAIL">
              <a href="mailto:carlosfreund@gmail.com" style={{ color: 'var(--accent)' }}>carlosfreund@gmail.com</a>
            </DirectLine>
            <DirectLine label="30 MIN CALL">
              <a href="https://calendly.com/carlosfreund/30min" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>calendly /30min ↗</a>
            </DirectLine>
            <DirectLine label="1 HOUR CALL">
              <a href="https://calendly.com/carlosfreund/1-hour-meeting" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>calendly /1-hour ↗</a>
            </DirectLine>
            <DirectLine label="GITHUB">
              <a href="https://github.com/happyherp" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>happyherp ↗</a>
            </DirectLine>
            <DirectLine label="LINKEDIN" last>
              <a href="https://linkedin.com/in/carlos-freund-93630582" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>carlos-freund ↗</a>
            </DirectLine>
          </div>

          <div style={{ marginTop: 24, border: '1px solid var(--rule-bright)', padding: 24, fontFamily: 'var(--mono)', fontSize: 12 }}>
            <div style={{ color: 'var(--ink-faint)', fontSize: 10, letterSpacing: '0.1em', marginBottom: 12 }}>[ WHERE I AM ]</div>
            {time && <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{time}</div>}
            <div style={{ color: 'var(--ink-dim)', marginTop: 4 }}>Duck Run 2, Cayo District, Belize · UTC−6</div>
            <div style={{ marginTop: 14, color: 'var(--accent)' }}>● {t('available')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
