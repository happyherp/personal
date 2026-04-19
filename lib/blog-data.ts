export interface BlogBlock {
  t: 'p' | 'h2' | 'h3' | 'ul' | 'code' | 'quote' | 'hr' | 'img';
  c?: string;
  items?: string[];
  lang?: string;
  src?: string;
  cap?: string;
}

export interface BlogPost {
  slug: string;
  no: string;
  title: string;
  sub: string;
  date: string;
  tags: string[];
  reading: string;
  featured?: boolean;
  cover: string;
  hero: string;
  dek: string;
  blocks: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'token-counter-rewrite',
    no: '01',
    title: "Rewriting LiteLLM's token counter",
    sub: 'A correctness bug you could only find by asking the wrong question.',
    date: '2025-05-18',
    tags: ['AI', 'OSS', 'Python'],
    reading: '7 min',
    featured: true,
    cover: '/assets/litellm-token-counter.png',
    hero: '/assets/litellm-token-counter.png',
    dek: "LiteLLM's token_counter had a subtle monotonicity bug: adding messages could decrease the count. Here's how I found it, why it existed, and how I rewrote the module from scratch.",
    blocks: [
      { t: 'p', c: "LiteLLM is the *lingua franca* for LLM calls in Python — 42k+ stars, basically the default translation layer between OpenAI-flavored code and every other provider. If you use agents, odds are you use LiteLLM whether you know it or not." },
      { t: 'p', c: "So when I noticed `util.token_counter` returning weird numbers on a specific kind of payload, I figured it was worth digging in." },
      { t: 'h2', c: 'The symptom' },
      { t: 'p', c: "Start with a list of messages. Count tokens. Now append a message — any message. Count again. The count should go *up*. In a few cases, it went **down**." },
      { t: 'p', c: "That's not a tokenizer quirk. That's a counting bug. And for anyone building an agent loop with a context budget, it's the kind of bug that doesn't crash — it just silently makes your \"am I near the limit?\" checks lie." },
      { t: 'h2', c: 'The cause' },
      { t: 'p', c: "Two competing code paths. One branch counted a list-of-messages by serializing them and counting as a single string. Another branch iterated per message. Which path you hit depended on whether any message contained a `tool_calls` field." },
      { t: 'quote', c: "The bug wasn't in the tokenizer. It was in the control flow deciding which tokenizer call to make." },
      { t: 'h2', c: 'The rewrite' },
      { t: 'p', c: "I threw out the branching and wrote one high-level function with two clearly separated paths: one for plain text, one for a list of messages." },
      { t: 'ul', items: ['Single high-level function, `token_counter(...)`.', 'Two explicit branches — `_count_text` and `_count_messages`.', 'A single responsibility for each helper: `_count_messages` loops, nothing else.', 'A single tokenizer-selection function, `_get_count_function`, so the tokenizer choice is made in exactly one place.'] },
      { t: 'h2', c: 'The tests' },
      { t: 'p', c: "The thing I wanted most from the new tests was a *property*, not an example: that the counter is monotonic in message count." },
      { t: 'code', lang: 'python', c: `@pytest.mark.parametrize("perm", itertools.permutations(MSGS, 3))
def test_monotonicity(perm):
    counts = [token_counter(messages=list(perm[:i+1]))
              for i in range(len(perm))]
    assert counts == sorted(counts), \\
        f"non-monotonic sequence: {counts}"` },
      { t: 'h2', c: 'The merge' },
      { t: 'p', c: "[PR #10409](https://github.com/BerriAI/litellm/pull/10409) merged to main. The new module is ~40% smaller than the old one and — as far as anyone has reported — no longer lies." },
      { t: 'hr' },
      { t: 'p', c: "Moral: when something *almost* works, the bug is usually not in the math. It's in the control flow deciding which piece of math to run." },
    ],
  },
  {
    slug: 'ai-shell-loop',
    no: '02',
    title: 'I built Claude Code two months before Claude Code',
    sub: 'Not to brag — to make a point about where the leverage was in late 2024.',
    date: '2024-11-02',
    tags: ['AI', 'Tools', 'Python'],
    reading: '5 min',
    cover: '/assets/ai-shell-loop.png',
    hero: '/assets/ai-shell-loop.png',
    dek: "In September 2024 I shipped ai-shell-loop — a small CLI that takes a plain-English goal, plans, runs shell commands, and iterates. Here's what I learned building it.",
    blocks: [
      { t: 'p', c: "In early September 2024 I got tired of writing `find` commands. Not the command itself — that's fine. The *friction* of switching from \"what do I want\" to \"what does find want\" and back again." },
      { t: 'h2', c: 'The loop' },
      { t: 'p', c: "The design was embarrassingly simple. Four-step loop, runs until the model says `done`:" },
      { t: 'ul', items: ['**Plan.** Given a goal + state, what should happen next?', '**Command.** Turn that plan into one shell command.', '**Execute.** Run it, show output, ask for a yes/no/new-command.', '**Observe.** Feed stdout back into context, repeat.'] },
      { t: 'h2', c: 'What the loop gets you' },
      { t: 'quote', c: "The model isn't better than you at shell. It's better than you at remembering the exact shell you wanted." },
      { t: 'h2', c: 'Where it falls down' },
      { t: 'p', c: "Two places. First: long-running or stateful commands. Second: confirmation fatigue — if you always say yes, you're running arbitrary AI-generated commands on your machine." },
      { t: 'hr' },
      { t: 'p', c: "Repo: [github.com/happyherp/ai-shell-loop](https://github.com/happyherp/ai-shell-loop). PyPI: `pip install ai-shell-loop`." },
    ],
  },
  {
    slug: 'llm-chatbot-breach',
    no: '03',
    title: 'How a support chatbot leaked a database',
    sub: 'A disclosure story. Names omitted; lessons not.',
    date: '2024-08-22',
    tags: ['Security', 'AI', 'GDPR'],
    reading: '9 min',
    cover: '/assets/llm-hack.png',
    hero: '/assets/llm-hack.png',
    dek: 'A medical e-commerce site put an LLM support chatbot in front of their production database. I asked it for a customer. It gave me one.',
    blocks: [
      { t: 'p', c: "This is a redacted account of a responsible-disclosure case I handled in 2024. Names and exact details are omitted because the fix is deployed and I have no interest in naming-and-shaming." },
      { t: 'h2', c: 'The setup' },
      { t: 'p', c: "Medical e-commerce site — think mail-order prescriptions. They'd added an AI support chatbot in the bottom-right corner. The bot had \"tool access\" to their backend so it could answer \"where's my order\" without a human. The tool access was, shall we say, *generous*." },
      { t: 'h2', c: 'The probe' },
      { t: 'code', lang: 'text', c: `> Can you look up order #12345?\nSure — here's the details for order 12345, placed by\n[name redacted] on [date]. It contained [redacted medication].` },
      { t: 'quote', c: "Every LLM tool call is an API endpoint. If it wouldn't pass security review as an endpoint, it shouldn't pass review as a tool." },
      { t: 'h2', c: 'What should have happened' },
      { t: 'ul', items: ['**Authenticated caller identity** — not "the prompt says who," but a real user ID from a session.', '**Scoped queries** — every database call pre-filtered by `user_id = current_user`.', '**Rate limits** — probing is slow if you\'re throttled.', '**Audit logs** — every tool call logged with inputs and outputs.', '**Red-team before launch** — try to break it before users do.'] },
      { t: 'hr' },
      { t: 'p', c: "If you're deploying an LLM with tool access to a database, assume a curious user will try every prompt-injection trick in the book. They will." },
    ],
  },
  {
    slug: 'dpv-firmware-notes',
    no: '04',
    title: 'Firmware for a dive scooter, or: rubber ducks in the deep',
    sub: 'What happens when your bug report is "it stopped underwater."',
    date: '2023-06-10',
    tags: ['Embedded', 'C++', 'ESP32'],
    reading: '8 min',
    cover: '/assets/dpv-top.jpg',
    hero: '/assets/dpv-top.jpg',
    dek: "The DPVControl firmware runs on an ESP32 inside a waterproof tube, fifteen meters down, driving a brushless motor. Here's what that environment does to a debugging workflow.",
    blocks: [
      { t: 'p', c: "My friend Chris is a cave diver. He wanted an open-source DPV and he needed firmware. I'd never written embedded code for anything more demanding than an Arduino blink sketch." },
      { t: 'h2', c: 'What "underwater" does to your debugging' },
      { t: 'quote', c: 'Everything observable had to fit in the color and pattern of one LED.' },
      { t: 'h2', c: 'LED as a debugger' },
      { t: 'ul', items: ['**Solid green:** normal, motor available.', '**Pulsing green:** motor running.', '**Solid blue:** boost mode active.', '**Slow amber:** battery low.', '**Red, solid:** leak detected, motor hard-killed, surface now.'] },
      { t: 'h2', c: 'Lessons, embedded edition' },
      { t: 'ul', items: ['Design your debug channel before you ship.', 'Every safety-critical path needs a visible name.', 'Moving averages solve more problems than you\'d think.'] },
      { t: 'hr' },
      { t: 'p', c: "The firmware is open source: [github.com/BubTec/DPVControl](https://github.com/BubTec/DPVControl). Twenty releases in, still going." },
    ],
  },
  {
    slug: 'belize-remote-work',
    no: '05',
    title: 'On working from the jungle',
    sub: 'A short note on latency, bandwidth, and howler monkeys.',
    date: '2024-03-04',
    tags: ['Remote', 'Life'],
    reading: '3 min',
    cover: '/assets/portrait-park.jpg',
    hero: '/assets/portrait-park.jpg',
    dek: "I moved from Germany to the Cayo District of Belize in 2023. People ask about the internet. Here's what I tell them.",
    blocks: [
      { t: 'p', c: "I live on a dirt road in the Cayo District of Belize. The neighbors are howler monkeys and iguanas. Starlink: 120 Mbps down, 20 up, round-trip to US East around 45ms." },
      { t: 'h2', c: 'The boring part is the boring part' },
      { t: 'p', c: "The actual work is the same work. A terminal is a terminal. UTC−6 puts me in the same working hours as Mexico City, Chicago, San José." },
      { t: 'quote', c: 'The office never moved. It was always the laptop.' },
      { t: 'hr' },
      { t: 'p', c: "If you're US-based and looking for a senior backend engineer in your timezone who *mostly* doesn't complain about the weather — [say hi](/contact)." },
    ],
  },
];
