import { notFound } from "next/navigation";
import Link from "next/link";

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  links: { label: string; url: string }[];
  videoId?: string;
  image?: { src: string; alt: string };
  gallery?: { src: string; alt: string }[];
}

const projectDetails: Record<string, ProjectDetail> = {
  openhands: {
    id: "openhands",
    title: "Open Source Contributor: OpenHands AI Agent & litellm",
    description: "12 merged pull requests in OpenHands (70k+ stars), the leading open-source AI coding agent",
    fullDescription: `
      <h2>Contributions to OpenHands</h2>
      <p>I have 12 merged pull requests in OpenHands (70k+ GitHub stars), the leading open-source AI coding agent. My contributions span the full stack:</p>
      
      <ul>
        <li><strong>Docker container lifecycle</strong> - Improved container management and stability</li>
        <li><strong>Runtime stability</strong> - Fixed critical bugs affecting agent execution</li>
        <li><strong>Frontend UX</strong> - Enhanced user experience and interface improvements</li>
        <li><strong>Build tooling</strong> - Streamlined development and deployment processes</li>
        <li><strong>Parallel test fixes</strong> - Resolved race conditions in test suites</li>
        <li><strong>LLM metrics</strong> - Added monitoring and optimization capabilities</li>
      </ul>
      
      <h2>Contributions to litellm</h2>
      <p>Rewrote the token_counter module in litellm (42k+ stars), fixing a silent bug where tool-call messages caused token counts to collapse. The rewrite included:</p>
      
      <ul>
        <li>Single high-level function architecture</li>
        <li>Clear separation between text and message counting paths</li>
        <li>Single-responsibility _count_messages loop</li>
        <li>Unified tokenizer selection via _get_count_function</li>
        <li>Comprehensive test suite covering edge cases and permutation-based monotonicity assertions</li>
      </ul>
      
      <p>Working in these codebases required deep understanding of LLM agent architecture, prompt caching, and context-window management.</p>
    `,
    tags: ["Python", "AI", "Open Source", "Docker", "Automated Testing"],
    links: [
      { label: "OpenHands PRs", url: "https://github.com/OpenHands/OpenHands/pulls" },
      { label: "litellm Token Counter PR", url: "https://github.com/BerriAI/litellm/pull/10409" }
    ]
  },
  "troy-comms": {
    id: "troy-comms",
    title: "Omni-Channel Customer Communication System — troy GmbH",
    description: "Complete outgoing communication system used across troy's client portfolio",
    fullDescription: `
      <h2>Project Overview</h2>
      <p>I was the main author of the complete outgoing communication system used across troy GmbH's client portfolio. This system handled all customer communications across multiple channels:</p>
      
      <h3>Physical Letters</h3>
      <p>Generated pixel-perfect PDFs from Google Docs templates with dynamic data injection. The system handled the entire pipeline from template selection to print-ready PDF generation, handing off programmatically to a print & mail fulfillment partner. No one at troy ever touched a physical letter.</p>
      
      <h3>HTML Emails</h3>
      <p>Designed and implemented responsive email templates with CSS media queries that adapted the layout for both mobile and desktop clients. The system ensured consistent rendering across all major email clients.</p>
      
      <h3>SMS Notifications</h3>
      <p>Integrated short-form automated SMS notifications into the same communication pipeline, allowing for timely customer alerts and reminders.</p>
      
      <h2>Technical Implementation</h2>
      <ul>
        <li><strong>Backend:</strong> Kotlin with Spring Framework</li>
        <li><strong>Template System:</strong> Google Docs API integration</li>
        <li><strong>PDF Generation:</strong> Custom rendering engine for pixel-perfect output</li>
        <li><strong>Email Delivery:</strong> Responsive HTML with comprehensive client testing</li>
        <li><strong>SMS Integration:</strong> Third-party SMS gateway APIs</li>
        <li><strong>Print Fulfillment:</strong> Automated handoff to printing partners</li>
      </ul>
      
      <p>This system became critical infrastructure for troy GmbH, handling all customer communications across their entire client portfolio.</p>
    `,
    tags: ["Kotlin", "Email", "PDF", "SMS", "Print Fulfillment"],
    links: []
  },
  dpvcontrol: {
    id: "dpvcontrol",
    title: "ESP32 Firmware for DIY Dive Propulsion Vehicle (DPVControl)",
    description: "Initial firmware for an open-source DIY dive propulsion vehicle",
    fullDescription: `
      <h2>Project Background</h2>
      <p>I wrote the initial firmware from scratch for a DIY underwater propulsion vehicle (DPV) built around an ESP32 and a 2000W VESC-controlled scooter motor. This was developed on-site with the hardware available for live testing.</p>
      
      <h2>Firmware Features</h2>
      <ul>
        <li><strong>Motor Control:</strong> Precise speed control via VESC UART interface</li>
        <li><strong>Reed Switch Input:</strong> Magnetic switch detection for user input</li>
        <li><strong>Cruise Control:</strong> Maintains constant speed without continuous input</li>
        <li><strong>Boost Mode:</strong> Temporary power increase for challenging conditions</li>
        <li><strong>Battery Monitoring:</strong> Real-time voltage and current measurement</li>
        <li><strong>Leak Detection:</strong> Water intrusion sensors with automatic shutdown</li>
        <li><strong>NeoPixel LEDs:</strong> Status indication and user feedback</li>
        <li><strong>Beep/LED Safety Codes:</strong> Audible and visual alerts for various conditions</li>
        <li><strong>Temperature Monitoring:</strong> Motor and battery temperature tracking</li>
      </ul>
      
      <h2>Technical Specifications</h2>
      <ul>
        <li><strong>MCU:</strong> ESP32 with dual-core processing</li>
        <li><strong>Motor Controller:</strong> VESC (Vedder Electronic Speed Controller)</li>
        <li><strong>Communication:</strong> UART interface to VESC</li>
        <li><strong>Development:</strong> PlatformIO framework</li>
        <li><strong>Language:</strong> C++ with Arduino core</li>
        <li><strong>Safety:</strong> Multiple redundant safety systems</li>
      </ul>
      
      <h2>Project Evolution</h2>
      <p>The v1 I wrote was the first version that went into the water. The project has since grown significantly with contributions from the community:</p>
      <ul>
        <li>20+ firmware releases with continuous improvements</li>
        <li>Full REST API for external control and monitoring</li>
        <li>Web-based GUI for configuration and real-time data</li>
        <li>Comprehensive test suite</li>
        <li>OpenAPI specification for API documentation</li>
      </ul>
      
      <p>This project demonstrates my ability to work at the hardware-software boundary, dealing with real-time constraints, safety-critical systems, and embedded Linux environments.</p>
    `,
    tags: ["C++", "Embedded", "ESP32", "PlatformIO", "VESC"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/BubTec/DPVControl" }
    ],
    image: { src: "/chris-divescooter.jpg", alt: "Diver using the DPVControl-powered dive propulsion vehicle underwater" },
    videoId: "6myfqZKiGTU"
  },
  "ai-shell-loop": {
    id: "ai-shell-loop",
    title: "ai-shell-loop: AI Agent that Generates & Executes Shell Commands",
    description: "Built in September 2024 — two months before Claude Code launched",
    fullDescription: `
      <h2>Project Overview</h2>
      <p>ai-shell-loop is a command-line AI agent I built in September 2024 — two months before Claude Code launched. It lets you describe a goal in plain English; the tool calls GPT to generate bash commands, executes them, observes the results, and iterates until the goal is reached.</p>

      <h2>How It Works</h2>
      <ul>
        <li><strong>Natural Language Input:</strong> Describe what you want done, e.g. "create a python program that lists primes below 100"</li>
        <li><strong>Command Generation:</strong> The tool calls the OpenAI API to translate the goal into concrete shell commands</li>
        <li><strong>Execution & Observation:</strong> Commands run locally, and their output feeds back into the loop</li>
        <li><strong>Iteration:</strong> If a command fails or the goal isn't met, the agent tries alternative approaches until it succeeds</li>
      </ul>

      <h2>Technical Details</h2>
      <ul>
        <li><strong>Language:</strong> Python, packaged and published on PyPI</li>
        <li><strong>Distribution:</strong> Installable via pip, runs on Linux and macOS</li>
        <li><strong>License:</strong> Apache License 2.0</li>
      </ul>

      <p>Building an agentic shell loop before agentic coding tools went mainstream gave me early, hands-on experience with the exact problem space — goal decomposition, tool execution, and iterative self-correction — that later became central to tools like Claude Code.</p>
    `,
    tags: ["Python", "AI Agent", "OpenAI API", "CLI", "PyPI"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/happyherp/ai-shell-loop" },
      { label: "PyPI Package", url: "https://pypi.org/project/ai-shell-loop/" }
    ]
  },
  "llm-security": {
    id: "llm-security",
    title: "Responsible Disclosure: LLM Chatbot Data Breach (Medical Sector)",
    description: "Critical data privacy vulnerability found in an AI-powered customer support chatbot",
    fullDescription: `
      <h2>The Discovery</h2>
      <p>While evaluating an AI-powered customer support chatbot at a regulated medical e-commerce company, I discovered a critical data privacy vulnerability: the underlying LLM had unrestricted access to the company's customer database, exposing sensitive personal and medical-adjacent order data through crafted prompts.</p>

      <h2>The Response</h2>
      <ul>
        <li><strong>Responsible Disclosure:</strong> Reported the vulnerability directly to the company through proper channels</li>
        <li><strong>Escalation:</strong> When the issue was not adequately remediated, escalated the matter to the Bavarian Data Protection Authority (Bayerisches Landesamt für Datenschutzaufsicht)</li>
        <li><strong>Regulatory Context:</strong> The exposure implicated GDPR obligations around personal data processing and data minimization</li>
      </ul>

      <h2>Why It Mattered</h2>
      <p>This case is a concrete example of a class of risk that becomes common as companies bolt LLMs onto existing systems without proper access controls: giving a language model direct, unscoped database access effectively removes the authorization boundary that would normally protect customer data. It reinforced my focus on building AI integrations with the same rigor — scoped credentials, least privilege, and auditability — that any production backend system requires.</p>

      <p>Details that could identify the company or its customers are withheld out of respect for the disclosure process and affected users.</p>
    `,
    tags: ["Security", "AI Security", "Prompt Injection", "GDPR", "Ethical Hacking"],
    links: [],
    image: { src: "/hack-blacked.png", alt: "Redacted chat log showing the chatbot exposing a customer's order data" }
  },
  shoqu: {
    id: "shoqu",
    title: "Shoqu — Influencer-Marketer Matching Platform (Co-Founder)",
    description: "Platform connecting social media influencers with marketers for sponsored content deals",
    fullDescription: `
      <h2>Project Overview</h2>
      <p>I co-founded Shoqu, a platform connecting social media influencers with marketers looking to run sponsored content deals. The platform matched influencers and brands, and managed the booking and collaboration workflow between them.</p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Instagram API Integration:</strong> Allowed influencers to pull their existing posts directly into their profiles, showcasing past content and engagement</li>
        <li><strong>Dual User Roles:</strong> Separate experiences and dashboards for influencers and marketers</li>
        <li><strong>Booking Flow:</strong> End-to-end flow for marketers to discover, evaluate, and book influencers for campaigns</li>
        <li><strong>Analytics:</strong> Dashboards surfacing engagement and campaign performance data</li>
      </ul>

      <h2>Technical Implementation</h2>
      <p>Built on Bubble.io to move quickly as a small team, with a custom integration against the Instagram API to sync influencer content and metrics.</p>

      <p>As co-founder, I was responsible for product development — translating the two-sided marketplace concept into a working platform, from user roles and matching logic to the third-party API integrations that made influencer profiles self-updating.</p>
    `,
    tags: ["Product Development", "Bubble.io", "Startup", "Instagram API"],
    links: [],
    gallery: [
      { src: "/shoqu1.png", alt: "Shoqu login page for marketers and influencers" },
      { src: "/shoqu2.png", alt: "Instagram photo picker letting influencers add posts to their Shoqu profile" }
    ]
  },
  "food-algorithm": {
    id: "food-algorithm",
    title: "Simplex Nutrition Optimizer — Solo-Founded Web App",
    description: "Built and launched food-algorithm.de as a solo founder. Applied the Simplex linear programming algorithm to find the cheapest possible diet meeting all nutritional requirements.",
    fullDescription: `
      <h2>The Problem</h2>
      <p>Eating a nutritionally complete diet requires hitting dozens of targets at once — vitamins, minerals, macros — while keeping cost down. Doing that by hand is effectively an optimization problem with 30+ simultaneous constraints. I built <a href="https://food-algorithm.de" target="_blank" rel="noopener noreferrer">food-algorithm.de</a> to solve it automatically.</p>

      <h2>How It Works</h2>
      <ol>
        <li><strong>Personal Information</strong> — the user enters sex, age, weight, and activity level (1.2–1.8), plus lifestyle factors like smoking, which shift daily requirements.</li>
        <li><strong>Nutrient Requirements</strong> — from that input, the app computes personalized min/max targets across 30+ nutrients (vitamins, minerals, macros — e.g. Niacin, Magnesium, Calcium, Sodium, Potassium, Iron, Iodine, Selenium), each individually editable before optimizing.</li>
        <li><strong>Optimization</strong> — the Simplex linear programming algorithm searches the space of available foods for the minimum-cost combination that satisfies every constraint simultaneously.</li>
      </ol>

      <h2>Results & Interaction</h2>
      <p>The result shows exactly which foods were selected and how much of each nutrient target they cover — for example, a serving of raw broccoli might supply 37% of the Vitamin C requirement, 17% of Beta-Carotene, and 13% of Folate. Users can remove any ingredient they don't want (allergy, dislike, availability) and instantly recompute the optimal diet around the remaining foods.</p>

      <h2>Technical Implementation</h2>
      <ul>
        <li><strong>Backend:</strong> Java, implementing the Simplex algorithm for linear programming</li>
        <li><strong>Frontend:</strong> Angular</li>
        <li><strong>Database:</strong> PostgreSQL for food and nutrient data</li>
        <li><strong>Role:</strong> Solo founder — designed, built, and launched the product end to end</li>
      </ul>
    `,
    tags: ["Java", "Algorithms", "Angular", "PostgreSQL", "Optimization"],
    links: [
      { label: "Live Site: food-algorithm.de", url: "https://food-algorithm.de" }
    ],
    videoId: "0nfaHVdiCFU",
    gallery: [
      { src: "/food-algorith1.png", alt: "food-algorithm.de landing page — Simplex Nutrition Optimizer" },
      { src: "/food-algorith2.png", alt: "Step 1: Personal Information form — sex, age, weight, activity level" },
      { src: "/food-algorith3.png", alt: "Step 2: Nutrition-Target table with computed min/max values per nutrient" },
      { src: "/food-algorith4.png", alt: "Step 2 continued: mineral targets (Magnesium, Calcium, Sodium, etc.) and Optimize button" },
      { src: "/food-algorith5.png", alt: "Step 3: Result of computation — selected foods, weights, and total cost" },
      { src: "/food-algorith6.png", alt: "Nutrient breakdown for a single selected food, with option to remove and recalculate" }
    ]
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = projectDetails[slug];
  
  if (!project) {
    notFound();
  }
  
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/work" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          ← Back to Portfolio
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl font-bold font-mono mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{project.description}</p>
        </header>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.image && (
          <div className="mb-8 w-full overflow-hidden rounded-lg shadow-sm">
            <img
              src={project.image.src}
              alt={project.image.alt}
              className="w-full h-auto"
            />
          </div>
        )}

        {project.gallery && (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.gallery.map((img) => (
              <div key={img.src} className="overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <img src={img.src} alt={img.alt} className="w-full h-auto" />
              </div>
            ))}
          </div>
        )}

        {project.videoId && (
          <div className="mb-12 aspect-video w-full overflow-hidden rounded-lg shadow-sm">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${project.videoId}`}
              title={`${project.title} — demo video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: project.fullDescription }}
        />
        
        {project.links.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-lg font-semibold mb-4">Links & Resources</h3>
            <div className="space-y-2">
              {project.links.map((link) => (
                <div key={link.url}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {link.label} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}