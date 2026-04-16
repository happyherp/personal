import { notFound } from "next/navigation";
import Link from "next/link";

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  links: { label: string; url: string }[];
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