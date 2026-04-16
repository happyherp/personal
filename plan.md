# carlosfreund.dev — Website Plan

## Stack Decision

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 15 (App Router)** | Native Vercel, SSR/SSG, API routes, image optimization |
| Language | **TypeScript** | Type safety, better DX, signals modern fluency to clients |
| Styling | **Tailwind CSS** | Fast iteration, responsive out of the box, no CSS file sprawl |
| i18n | **next-intl** | Best-in-class App Router i18n — `/en`, `/de`, `/es` prefixed routes |
| Blog | **MDX (local files)** | Markdown + JSX components. No CMS dependency. Write posts in your editor, commit to git |
| Deployment | **Vercel** (free tier) | Push to GitHub → auto-deploy. Preview URLs on every PR |
| Domain | **carlosfreund.dev** | Buy on Cloudflare Registrar (~$12.20/yr). Point DNS to Vercel |
| Analytics | **Vercel Analytics** (free tier) | No cookie banners needed, privacy-friendly |
| Fonts | **Self-hosted via `next/font`** | No Google Fonts network dependency. Fast, private |

---

## Domain Setup (do this first)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → create free account
2. "Domain Registration" → "Register Domain" → `carlosfreund.dev`
3. Pay ~$12.20 (1 year)
4. After Vercel project exists: add custom domain in Vercel dashboard → Vercel gives you DNS records → add them in Cloudflare DNS panel
5. Done. SSL is automatic on both sides

---

## Site Architecture

```
carlosfreund.dev/
├── /[locale]/                    ← en | de | es
│   ├── /                         ← Home / Landing
│   ├── /about                    ← Extended bio + photo
│   ├── /work                     ← Portfolio / project showcase
│   ├── /work/[slug]              ← Individual project detail page
│   ├── /blog                     ← Blog index
│   ├── /blog/[slug]              ← Individual blog post (MDX)
│   └── /contact                  ← Contact form + Calendly embed + links
├── /api/
│   └── /contact                  ← Form handler (sends email via Resend)
└── sitemap.xml                   ← Auto-generated, all locales
```

Default locale: `en` (no prefix). German and Spanish get `/de/` and `/es/` prefixes.

---

## Pages & Content

### 1. Home (`/`)

The money page. A client lands here and decides in 10 seconds.

**Content:**
- Hero: Name, one-liner pitch ("Senior Backend Engineer · AI Integration · Ships Autonomously"), location/timezone badge (Belize, UTC-6)
- 3 value propositions (tiles or cards):
  - "15 years of Java/Kotlin backend depth"
  - "Production AI integration — not prototypes"
  - "Open-source contributor: OpenHands, litellm"
- Featured projects strip (3–4 thumbnails → link to /work/[slug])
- CTA: "Book a call" (Calendly link) + "View my work"
- Language switcher (flag icons or EN/DE/ES text toggle)

**Source content:** `profiles/upwork.md` bio, `CLAUDE.md` positioning

---

### 2. About (`/about`)

**Content:**
- Professional photo (get one taken or use a good existing one)
- Extended narrative: the arc from apprenticeship → freelance → Belize. Not a CV dump — a story
- Key facts sidebar: languages, timezone, availability, GitHub stats
- Tech stack visualization (grouped by depth: expert / proficient / familiar)
- Link to downloadable CV (PDF generated from `cv/carlos-freund-cv.md`)

**Source content:** `cv/carlos-freund-cv.md`, `CLAUDE.md` work history

---

### 3. Work / Portfolio (`/work`)

Grid of project cards. Each card: thumbnail, title, tech tags, one-line description.

**Projects to feature (from Upwork portfolio):**

| # | Project | Tags | Source |
|---|---------|------|--------|
| 1 | OpenHands & litellm contributions | Python, AI, Open Source | Portfolio item 1 |
| 2 | troy GmbH communication system | Kotlin, Email, PDF, SMS | Portfolio item 2 |
| 3 | DPVControl ESP32 firmware | C++, Embedded, ESP32 | Portfolio item 3 |
| 4 | ai-shell-loop | Python, AI Agent, CLI | Portfolio item 4 |
| 5 | LLM chatbot security disclosure | Security, AI, GDPR | Portfolio item 5 |
| 6 | food-algorithm.de (Simplex optimizer) | Java, Algorithms, Angular | Portfolio item 6 |
| 7 | Shoqu (influencer platform) | Product, Bubble.io, Startup | Portfolio item 7 |

Each project gets a detail page (`/work/[slug]`) with:
- Full description (pulled from Upwork portfolio text)
- Screenshots/images
- GitHub link where applicable
- Tech stack used

**Source content:** `profiles/upwork.md` portfolio section

---

### 4. Blog (`/blog`)

MDX-powered. Each post is a `.mdx` file in `/content/blog/[locale]/`.

**Structure per post:**
```
content/blog/en/my-first-post.mdx
content/blog/de/my-first-post.mdx   ← translated version (same slug)
content/blog/es/my-first-post.mdx
```

**Features:**
- Syntax highlighting (rehype-pretty-code or shiki)
- Reading time estimate
- Tags/categories
- RSS feed (`/feed.xml`)
- OG image auto-generation per post (via Vercel OG)

**Starter post ideas (write these launch week):**
1. "Why I left a €80k job to freelance from Belize" — personal, builds trust, SEO for your name
2. "I found a data breach in a medical chatbot — here's what happened" — security angle, showcases expertise
3. "What I learned contributing to OpenHands" — technical credibility, links to PRs

---

### 5. Contact (`/contact`)

- Calendly embed (30-min booking: calendly.com/carlosfreund/30min)
- Simple contact form (name, email, message) → hits `/api/contact` → sends via Resend (free tier: 100 emails/day)
- Direct links: GitHub, LinkedIn, Upwork, email
- Timezone display: "It's currently [time] where I am (UTC-6)"

---

## i18n Strategy

| Aspect | Approach |
|--------|----------|
| Library | `next-intl` with App Router middleware |
| URL structure | `/en/about`, `/de/about`, `/es/about` (default `en` can omit prefix) |
| Translation files | JSON per locale: `messages/en.json`, `messages/de.json`, `messages/es.json` |
| Blog posts | Separate MDX files per locale (not machine-translated — write or translate manually) |
| Language switcher | Visible on every page. Preserves current route |
| SEO | `hreflang` tags auto-generated. Separate sitemap entries per locale |

**Translation scope for launch:** Translate UI strings (nav, buttons, headings, CTAs) into all 3 languages. Blog posts can start English-only — add DE/ES translations over time.

---

## Design Direction

**Tone:** Clean, technical, confident. Not corporate — not quirky. A developer's site that looks like a developer built it *well*.

**Aesthetic:**
- Dark mode default (with light mode toggle)
- Monospace accent font for headings/code (e.g., JetBrains Mono or IBM Plex Mono)
- Clean sans-serif for body (e.g., Geist or Satoshi)
- Accent color: electric blue or warm amber on dark gray (#0a0a0a)
- Generous whitespace. No visual clutter
- Subtle animations: fade-in on scroll, hover states on project cards
- Terminal-inspired hero section (cursor blink, typed text effect) — nods to the engineering identity without being gimmicky

**Mobile-first.** Clients check on phones.

---

## Repo Structure

```
carlosfreund.dev/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx              ← Home
│   │   ├── about/page.tsx
│   │   ├── work/page.tsx
│   │   ├── work/[slug]/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── contact/route.ts
│   ├── layout.tsx                ← Root layout
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   ├── ThemeToggle.tsx
│   ├── ProjectCard.tsx
│   ├── BlogPostCard.tsx
│   ├── ContactForm.tsx
│   ├── CalendlyEmbed.tsx
│   └── TechStack.tsx
├── content/
│   ├── projects/                 ← Project data (JSON or MDX)
│   │   ├── openhands.mdx
│   │   ├── troy-comms.mdx
│   │   ├── dpvcontrol.mdx
│   │   ├── ai-shell-loop.mdx
│   │   ├── llm-security.mdx
│   │   ├── food-algorithm.mdx
│   │   └── shoqu.mdx
│   └── blog/
│       ├── en/
│       ├── de/
│       └── es/
├── messages/
│   ├── en.json
│   ├── de.json
│   └── es.json
├── public/
│   ├── images/
│   ├── cv/carlos-freund-cv.pdf
│   └── favicon.ico
├── lib/
│   ├── mdx.ts                   ← MDX parsing utilities
│   └── projects.ts              ← Project data helpers
├── i18n.ts                       ← next-intl config
├── middleware.ts                 ← Locale detection/redirect
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## SEO & Meta

- **Title pattern:** "Carlos Freund — [Page] | Senior Backend & AI Engineer"
- **OG images:** Auto-generated per page using `@vercel/og`
- **Structured data:** JSON-LD for Person, WebSite, BlogPosting schemas
- **Sitemap:** Auto-generated with all locale variants
- **robots.txt:** Allow all
- **Canonical URLs:** Per-locale with `hreflang` alternates

---

## Launch Phases

### Phase 1: Ship it (this week)
- [ ] Buy `carlosfreund.dev` on Cloudflare
- [ ] `npx create-next-app@latest carlosfreund.dev --typescript --tailwind --app`
- [ ] Set up next-intl with EN/DE/ES
- [ ] Build Home page with hero, value props, CTA
- [ ] Build About page with narrative + tech stack
- [ ] Build Work page with project grid (content from Upwork portfolio)
- [ ] Build Contact page with Calendly embed + form
- [ ] Deploy to Vercel, connect domain
- [ ] Add to LinkedIn, Upwork, and GitHub profile links

### Phase 2: Blog + Polish (week 2)
- [ ] Set up MDX pipeline with syntax highlighting
- [ ] Write and publish first blog post
- [ ] Add RSS feed
- [ ] Add OG image generation
- [ ] Translate UI strings to DE/ES
- [ ] Add dark/light theme toggle
- [ ] SEO: structured data, sitemap, meta tags

### Phase 3: Grow (ongoing)
- [ ] Write 1 blog post per week (even short ones)
- [ ] Add project detail pages with screenshots
- [ ] Translate select blog posts to DE/ES
- [ ] Add Vercel Analytics
- [ ] Consider: interactive AI demo page (e.g., live MCP server demo or chatbot)

---

## Cost Summary

| Item | Cost |
|------|------|
| Domain (carlosfreund.dev) | ~$12.20/year |
| Vercel hosting (free tier) | $0 |
| Resend email (free tier) | $0 |
| Vercel Analytics (free tier) | $0 |
| Cloudflare DNS | $0 |
| **Total year 1** | **~$12.20** |

---

## Content Migration Checklist

All content already exists in the work-from-belize repo. Map:

| Website section | Source file |
|----------------|------------|
| Bio / Hero text | `profiles/upwork.md` → Bio section |
| Work history | `cv/carlos-freund-cv.md` → Professional Experience |
| Project descriptions | `profiles/upwork.md` → Portfolio items 1–7 |
| Tech stack | `CLAUDE.md` → Stack & Positioning |
| Contact links | `CLAUDE.md` → Who I Am section |
| Calendly | calendly.com/carlosfreund/30min |