export interface Project {
  id: string;
  no: string;
  title: string;
  sub: string;
  stack: string[];
  year: string;
  role: string;
  stars?: string;
  thumb: string;
  summary: string;
  featured?: boolean;
}

export interface ProjectDetail {
  long: string;
  bullets: string[];
  links: { l: string; u: string }[];
  extraImages?: { src: string; caption: string }[];
  video?: string;
  slideshow?: { src: string; caption: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'openhands',
    no: '01',
    title: 'OpenHands + litellm',
    sub: 'Merged 12 PRs into the leading OSS AI coding agent',
    stack: ['Python', 'AI', 'Docker', 'OSS'],
    year: '2024 —',
    role: 'Contributor',
    stars: '70k★',
    thumb: '/assets/openhands-merges.png',
    summary:
      'Core contributions to context-window management, LLM cost optimization, and runtime stability in OpenHands (70k+ stars). Also landed a token-counter rewrite in litellm (42k+ stars).',
    featured: true,
  },
  {
    id: 'troy-comms',
    no: '02',
    title: 'troy Backend',
    sub: 'Four revenue-critical backend processes for a regulated collections firm',
    stack: ['Kotlin', 'Spring', 'Hibernate', 'AWS Redshift', 'Looker'],
    year: '2018–2022',
    role: 'Lead',
    thumb: '/assets/troy-email.png',
    summary:
      'Sole owner of 4 revenue-critical backend processes — client data import, IKAROS sync, letter generation, print handoff. Kotlin / Spring / Hibernate; AWS Redshift data warehouse + Looker.',
    featured: true,
  },
  {
    id: 'dpvcontrol',
    no: '03',
    title: 'DPVControl',
    sub: 'ESP32 firmware for a DIY underwater propulsion vehicle',
    stack: ['C++', 'ESP32', 'Embedded'],
    year: '2021',
    role: 'Initial author',
    thumb: '/assets/dpv-top.jpg',
    summary:
      'Wrote the initial firmware: motor control, Reed switch input, cruise control, boost mode, battery monitoring, leak detection, safety codes. Grew to 20+ releases with REST API and web GUI.',
    featured: true,
  },
  {
    id: 'ai-shell-loop',
    no: '04',
    title: 'ai-shell-loop',
    sub: 'AI agent that generates and executes shell commands',
    stack: ['Python', 'OpenAI', 'CLI'],
    year: '2024',
    role: 'Solo',
    thumb: '/assets/ai-shell-loop.png',
    summary:
      'Built Sep 2024 — two months before Claude Code. Describe goals in plain English; the tool plans, executes bash, observes results, iterates. Published on PyPI.',
    featured: true,
  },
  {
    id: 'llm-security',
    no: '05',
    title: 'LLM Chatbot Data Breach',
    sub: 'Responsible disclosure — medical e-commerce sector',
    stack: ['Security', 'GDPR', 'Prompt Injection'],
    year: '2024',
    role: 'Researcher',
    thumb: '/assets/llm-hack.png',
    summary:
      'Discovered a critical data privacy vulnerability: an AI support chatbot with unrestricted database access leaked customer PII. Escalated to Bavarian Data Protection Authority.',
  },
  {
    id: 'food-algorithm',
    no: '06',
    title: 'food-algorithm.de',
    sub: 'Simplex linear-programming diet optimizer',
    stack: ['Java', 'Angular', 'Algorithms'],
    year: '2016–2017',
    role: 'Solo founder',
    thumb: '/assets/food-algorithm.png',
    summary:
      'Solo-founded web app: Simplex LP algorithm finds the cheapest diet meeting 30+ nutritional constraints. Shipped the full product end-to-end.',
  },
  {
    id: 'luther-mcp',
    no: '07',
    title: 'luther-mcp',
    sub: 'MCP server for semantic Bible search — built in a day',
    stack: ['Python', 'MCP', 'Embeddings'],
    year: '2024',
    role: 'Author',
    thumb: '/assets/ai-shell-loop.png',
    summary:
      'An MCP (Model Context Protocol) server combining keyword + embedding retrieval so a query like "I am having a horrible day" surfaces thematically matching passages.',
  },
  {
    id: 'lazyset',
    no: '08',
    title: 'lazyset',
    sub: 'Haskell library for efficient search in infinite lazy sets',
    stack: ['Haskell', 'Hackage', 'OSS'],
    year: '2017',
    role: 'Author',
    thumb: '/assets/lazyset.png',
    summary:
      'Published on Hackage. Efficient search over infinite lazy sets — a small but useful primitive for pure-functional Haskell projects.',
  },
];

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  openhands: {
    long: `I've merged 12 pull requests into OpenHands — the leading open-source AI coding agent, 70k+ stars on GitHub. My contributions span Docker container hardening, runtime stability fixes, frontend UX polish, build-tool improvements, and LLM cost metrics. On top of that, I contributed a token-counter rewrite to litellm (42k+ stars), the universal LLM gateway library used across the industry.`,
    bullets: [
      '12 merged PRs in OpenHands core',
      'Context-window management improvements',
      'LLM cost optimization metrics',
      'Token-counter rewrite in litellm',
      'Docker runtime hardening',
      'Frontend UX polish across the agent dashboard',
    ],
    links: [
      { l: 'OpenHands on GitHub ↗', u: 'https://github.com/All-Hands-AI/OpenHands' },
      { l: 'litellm on GitHub ↗', u: 'https://github.com/BerriAI/litellm' },
    ],
    extraImages: [
      {
        src: '/assets/litellm-token-counter.png',
        caption: 'litellm PR #10409 — rewrite of util.token_counter, 12 commits, +743 / −381',
      },
    ],
  },
  'troy-comms': {
    long: `At troy GmbH I was sole owner of four revenue-critical backend processes — client data import, IKAROS synchronization, collection-letter generation, and print-service handoff. The full company revenue depended on their correctness. Primary developer on a Kotlin / Spring / Hibernate stack; designed and built a data warehouse on AWS Redshift fed from multiple sources, administered Looker, and developed LookML reports. Established SCRUM processes and served as Scrum Master.`,
    bullets: [
      'Sole owner of 4 revenue-critical backend processes',
      'Client data import + IKAROS synchronization',
      'Collection-letter generation + print-service handoff',
      'Kotlin / Spring / Hibernate backend',
      'AWS Redshift data warehouse + Looker / LookML',
      'Scrum Master; mentored and code-reviewed juniors',
    ],
    links: [],
  },
  dpvcontrol: {
    long: `DPVControl is an ESP32 firmware powering a DIY underwater dive-propulsion vehicle. I wrote the initial firmware: motor control via VESC, Reed-switch user input, cruise control, boost mode, battery monitoring, leak detection, and a set of haptic/audible safety codes. The project grew from my initial release into 20+ iterations with a full REST API and web GUI for config and telemetry.`,
    bullets: [
      'Motor control via VESC protocol',
      'Reed-switch input (waterproof, glove-friendly)',
      'Cruise control + boost mode',
      'Battery monitoring with low-voltage cutoff',
      'Leak detection + haptic safety codes',
      'Grew to 20+ releases, REST API, web GUI',
    ],
    links: [{ l: 'DPVControl on GitHub ↗', u: 'https://github.com/BubTec/DPVControl' }],
    extraImages: [
      {
        src: '/assets/chris-divescooter.jpg',
        caption: 'Chris with the DIY DPV underwater — firmware in action',
      },
    ],
  },
  'ai-shell-loop': {
    long: `ai-shell-loop is a CLI agent I built in September 2024 — two months before Claude Code launched. Describe a goal in plain English. The tool calls an LLM to generate bash commands, asks for confirmation, executes, observes the output, and iterates until the goal is reached. Published on PyPI with proper packaging, logging, and a sensible safety model.`,
    bullets: [
      'Plan → command → execute → observe loop',
      'Human-in-the-loop confirmation on every action',
      'Full session logging to ~/.cache/ai-shell-loop',
      'Published on PyPI',
      'Built 2 months before Claude Code',
    ],
    links: [{ l: 'ai-shell-loop on GitHub ↗', u: 'https://github.com/happyherp/ai-shell-loop' }],
  },
  'llm-security': {
    long: `While researching AI safety in commercial deployments, I discovered a critical data-privacy vulnerability in an AI-powered customer-support chatbot at a regulated medical e-commerce company. The LLM had unrestricted database access and could be prompt-injected into returning arbitrary customer data — including other users' orders and PII. I reported the issue through responsible disclosure. When it wasn't properly remediated, I escalated to the Bavarian Data Protection Authority.`,
    bullets: [
      'Unrestricted DB access via prompt injection',
      'Leaked PII + order history of other customers',
      'Responsible disclosure to vendor',
      'Escalated to Bavarian DPA (regulatory body)',
      'Sector: regulated medical e-commerce',
    ],
    links: [],
  },
  'food-algorithm': {
    long: `food-algorithm.de was my solo-founded web app. The core idea: use Simplex linear programming to find the cheapest possible diet that meets all 30+ nutritional constraints for a given person. Enter your age, weight, activity level; the system computes personalized targets across calories, macros, vitamins, minerals, and fatty acids, then solves for the minimum-cost combination of real foods from a database.`,
    bullets: [
      'Simplex linear-programming diet optimizer',
      '30+ nutritional constraints per person',
      'Food database with prices',
      'Per-ingredient nutritional breakdown on click',
      'Java backend, Angular frontend, PostgreSQL',
    ],
    links: [{ l: 'Demo video ↗', u: 'https://www.youtube.com/watch?v=0nfaHVdiCFU' }],
    video: 'https://www.youtube.com/embed/0nfaHVdiCFU',
    slideshow: [
      { src: '/assets/food-algo-1-landing.png', caption: '01 — Landing page: Simplex Nutrition Optimizer' },
      { src: '/assets/food-algo-2-personal.png', caption: '02 — Step 1: personal info (age, weight, activity, smoker)' },
      { src: '/assets/food-algo-3-targets.png', caption: '03 — Step 2: computed nutrition targets (30+ constraints)' },
      { src: '/assets/food-algo-4-optimize.png', caption: '04 — Full nutrient table → click Optimize to run the solver' },
      { src: '/assets/food-algo-5-results.png', caption: '05 — Step 3: minimum-cost diet — total €1.39/day' },
      { src: '/assets/food-algo-6-drilldown.png', caption: '06 — Click any ingredient to see its nutrient contribution' },
    ],
  },
  'luther-mcp': {
    long: `luther-mcp is a Model Context Protocol server for semantic Bible search. It combines traditional keyword search with embedding-based retrieval, so a query like "I am having a horrible day" surfaces thematically matching passages even when the literal words don't overlap. I built it in a single day as a practical demonstration of AI-augmented development.`,
    bullets: [
      'MCP (Model Context Protocol) server',
      'Hybrid: keyword + embedding retrieval',
      'Thematic matching for non-literal queries',
      'Built in a single day via vibe coding',
    ],
    links: [{ l: 'luther-mcp on GitHub ↗', u: 'https://github.com/happyherp/luther-mcp' }],
  },
  lazyset: {
    long: `lazyset is a small Haskell library I published on Hackage in 2017. It enables efficient search in infinite lazy sets — a niche but genuinely useful primitive when you want to work with infinite data structures in pure-functional code without giving up reasonable performance.`,
    bullets: [
      'Published on Hackage',
      'Efficient search over infinite lazy sets',
      'Pure Haskell, no hidden state',
    ],
    links: [
      { l: 'lazyset on Hackage ↗', u: 'https://hackage.haskell.org/package/lazyset' },
      { l: 'lazyset on GitHub ↗', u: 'https://github.com/happyherp/lazyset' },
    ],
  },
};
