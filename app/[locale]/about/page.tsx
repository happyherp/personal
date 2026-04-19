'use client';

import { useTranslations } from 'next-intl';

function InfoBlock({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ marginBottom: last ? 0 : 24, paddingBottom: last ? 0 : 24, borderBottom: last ? 'none' : '1px dashed var(--rule)' }}>
      <div style={{ color: 'var(--ink-faint)', letterSpacing: '0.1em', fontSize: 10, marginBottom: 8 }}>[ {label} ]</div>
      <div style={{ color: 'var(--ink)' }}>{children}</div>
    </div>
  );
}

function SkillGroup({ label, color = 'var(--ink-dim)', items, last }: { label: string; color?: string; items: string[]; last?: boolean }) {
  return (
    <div style={{ marginBottom: last ? 0 : 20 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color, letterSpacing: '0.1em', marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {items.map((i) => <span key={i} className="tag" style={{ fontSize: 12, padding: '5px 11px' }}>{i}</span>)}
      </div>
    </div>
  );
}

function TimelineRow({ y, r, c, d, last }: { y: string; r: string; c: string; d: string; last?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24, padding: '20px 0', borderBottom: last ? 'none' : '1px solid var(--rule)' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)' }}>{y}</div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 600 }}>{r}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-dim)', marginTop: 2 }}>{c}</div>
        <div style={{ color: 'var(--ink-dim)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{d}</div>
      </div>
    </div>
  );
}

function PhotoCard({ src, cap }: { src: string; cap: string }) {
  return (
    <div style={{ border: '1px solid var(--rule-bright)' }}>
      <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#1a1916' }}>
        <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
      </div>
      <div style={{ padding: 12, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)', lineHeight: 1.6, borderTop: '1px solid var(--rule-bright)' }}>
        {cap}
      </div>
    </div>
  );
}

export default function About() {
  const t = useTranslations('About');

  return (
    <div className="page" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        <span>{t('eyebrow')}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 60, alignItems: 'start' }}>
        <div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 10vw, 160px)', marginBottom: 0 }}>
            {t('greeting')}<br />Carlos<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
        </div>
        <div style={{ border: '1px solid var(--rule-bright)', overflow: 'hidden', aspectRatio: '3/4' }}>
          <img src="/assets/portrait-caterpillar.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Carlos" />
        </div>
      </div>

      <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60 }}>
        {/* Sticky sidebar */}
        <div style={{ position: 'sticky', top: 100, alignSelf: 'start', fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.8 }}>
          <InfoBlock label={t('labelLocation')}>
            Duck Run 2, Cayo District<br />
            Belize 🇧🇿<br />
            UTC−6 / CST
          </InfoBlock>
          <InfoBlock label={t('labelAvailability')}>
            <span style={{ color: 'var(--accent)' }}>●</span> {t('availableNow')}<br />
            30+ hrs/week<br />
            {t('prefersUS')}
          </InfoBlock>
          <InfoBlock label={t('labelLanguages')}>
            English (fluent)<br />
            German (native)<br />
            Spanish (native)
          </InfoBlock>
          <InfoBlock label="LINKS" last>
            <a href="https://github.com/happyherp" style={{ color: 'var(--accent)', display: 'block' }}>github.com/happyherp ↗</a>
            <a href="https://linkedin.com/in/carlos-freund-93630582" style={{ color: 'var(--accent)', display: 'block' }}>linkedin ↗</a>
            <a href="https://www.upwork.com/freelancers/~017414ed3a00e19ec0" style={{ color: 'var(--accent)', display: 'block' }}>upwork ↗</a>
          </InfoBlock>
        </div>

        {/* Main content */}
        <div>
          <div className="section-num" style={{ marginBottom: 8 }}>§ 01 / {t('sectionNarrative')}</div>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: 32, fontWeight: 700, margin: '0 0 20px', letterSpacing: '-0.02em' }}>{t('narrativeTitle')}</h2>
          <div style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink)', maxWidth: 640 }}>
            <p>
              I'm a senior backend engineer, 15+ years in. I started as a Fachinformatiker
              apprentice at Neusta in Bremen, studied computer science at FH Wedel
              (GPA 1.7, two competitive-programming awards), then spent a decade writing
              Java and Kotlin across banking, EV research, e-commerce, and debt-collection
              tech — with a solo-founded nutrition-optimizer startup in the middle.
            </p>
            <p>
              In 2022 I joined KPS Software as the team's AI-workflow pioneer: evaluating
              and integrating AI coding tools into our SDLC while shipping the Java backend.
              That led me to OpenHands and litellm, where I'm now a regular contributor —
              including a complete rewrite of litellm's token-counter module (PR #10409, merged).
            </p>
            <p>
              Then in 2025 I left the €80k job, moved to Belize, and started freelancing.
              I wanted the freedom to work on problems that actually matter and to
              <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)' }}> live a life I designed. </em>
              It's been the best decision I've made.
            </p>
            <p>
              Outside of paid work I maintain ESP32 firmware for an open-source dive
              scooter, built an MCP server for semantic Bible search in a day, published
              a Haskell library (lazyset) on Hackage, and solved 50+ Project Euler problems.
            </p>
          </div>

          <div style={{ height: 80 }} />

          <div className="section-num" style={{ marginBottom: 8 }}>§ 02 / {t('sectionStack')}</div>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: 32, fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.02em' }}>{t('stackTitle')}</h2>
          <SkillGroup label={t('skillExpert')} color="var(--accent)" items={['Java SE/EE', 'Kotlin', 'SQL', 'Hibernate', 'JavaScript']} />
          <SkillGroup label={t('skillProficient')} items={['Python', 'Spring', 'Maven', 'Docker', 'AWS Redshift', 'Angular', 'TypeScript', 'ElasticSearch', 'Git', 'Linux', 'TestNG/JUnit', 'REST/SOAP', 'Haskell']} />
          <SkillGroup label={t('skillAI')} color="var(--accent)" items={['OpenHands', 'LiteLLM', 'MCP', 'Claude / GPT', 'Embeddings', 'Vibe coding', 'AI-augmented SDLC']} />
          <SkillGroup label={t('skillEmbedded')} items={['C++', 'ESP32', 'PlatformIO', 'VESC', 'NeoPixel']} />
          <SkillGroup label={t('skillFamiliar')} items={['C', 'C#', 'Bash', 'Django', 'Gradle', 'jQuery']} last />

          <div style={{ height: 80 }} />

          <div className="section-num" style={{ marginBottom: 8 }}>§ 03 / {t('sectionTimeline')}</div>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: 32, fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.02em' }}>{t('timelineTitle')}</h2>
          <div style={{ borderTop: '1px solid var(--ink)' }}>
            <TimelineRow y="2025—" r="Senior Backend / AI Freelancer" c="Independent · Belize" d="AI integration into production backend systems. MCP servers, LLM gateways, agents. Available for remote contracts with US clients." />
            <TimelineRow y="2022–2025" r="Software Engineer" c="KPS Software GmbH · Bremen (remote)" d="Java backend + API design for iOS. Pioneered AI-assisted development workflows; evaluated and integrated AI coding tools into the SDLC." />
            <TimelineRow y="2018–2022" r="Lead Backend Developer & SCRUM Master" c="troy GmbH · Bremen" d="Sole owner of four revenue-critical backend processes. Kotlin/Spring/Hibernate. Built AWS Redshift data warehouse, administered Looker, mentored juniors." />
            <TimelineRow y="2017–2018" r="Java Consultant (Freelance, €80/h)" c="FINCON Unternehmensberatung GmbH" d="Customized banking software: Java 8, Hibernate, JPA2, Spring, DB2, ElasticSearch. TDD with TestNG/EasyMock." />
            <TimelineRow y="2016–2017" r="Founder & Developer" c="food-algorithm.de (own product)" d="Solo-built nutrition optimizer: Java + Angular 2 + TypeScript + PostgreSQL. Implemented Simplex and Mixed Integer Programming." />
            <TimelineRow y="2014–2015" r="Java Developer — EV Research" c="Move About GmbH (RWTH Aachen / E.ON)" d="Sole dev on a research data aggregation app. Scaled PostgreSQL to 100+ GB of EV telemetry; reverse-engineered CAN networks." />
            <TimelineRow y="2007–2012" r="Java Developer (Apprenticeship → Mid-level)" c="Neusta GmbH · Bremen" d="Web auction platform. Built company-wide microservice for unified billing. Completed Fachinformatiker apprenticeship." last />
          </div>

          <div style={{ height: 80 }} />

          <div className="section-num" style={{ marginBottom: 8 }}>§ 04 / {t('sectionAlso')}</div>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: 32, fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.02em' }}>{t('alsoTitle')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <PhotoCard src="/assets/dive-scooter.jpg" cap="My friend Chris on his dive scooter. I wrote the firmware for the prototype next to it." />
            <PhotoCard src="/assets/portrait-daisy.jpg" cap="Daisy behind the ear. Summer 2023." />
            <PhotoCard src="/assets/portrait-hat.jpg" cap="A cow-themed ice cream stop somewhere in Central America." />
            <PhotoCard src="/assets/portrait-park.jpg" cap="In the park, Germany. Summer light, pre-Belize era." />
          </div>
        </div>
      </div>

      <div style={{ height: 100 }} />
    </div>
  );
}
