'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  color: string;
}

const projects: Project[] = [
  {
    id: "openhands",
    title: "Open Source Contributor: OpenHands AI Agent & litellm",
    description: "12 merged pull requests in OpenHands (70k+ stars), the leading open-source AI coding agent. Contributions span Docker containers, runtime stability, frontend UX, build tooling, and LLM metrics. Also contributed token-counter rewrite to litellm (42k+ stars).",
    tags: ["Python", "AI", "Open Source", "Docker", "Automated Testing"],
    thumbnail: "/openhands-merge-commits.png",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: "troy-comms",
    title: "Omni-Channel Customer Communication System — troy GmbH",
    description: "Built the complete outgoing communication system used across troy's client portfolio. Generated pixel-perfect PDFs from Google Docs templates, responsive HTML emails with CSS media queries, and integrated SMS notifications—all handed off to print & mail fulfillment partners.",
    tags: ["Kotlin", "Email", "PDF", "SMS", "Print Fulfillment"],
    thumbnail: "/troy-email.png",
    color: "from-green-500 to-blue-600"
  },
  {
    id: "dpvcontrol",
    title: "ESP32 Firmware for DIY Dive Propulsion Vehicle (DPVControl)",
    description: "Wrote the initial firmware for a DIY underwater propulsion vehicle. Features motor control, Reed switch input, cruise control, boost mode, battery monitoring, leak detection, and safety codes. The project has grown to 20+ releases with a full REST API and web GUI.",
    tags: ["C++", "Embedded", "ESP32", "PlatformIO", "VESC"],
    thumbnail: "/dpvtop2.jpg",
    color: "from-orange-500 to-red-600"
  },
  {
    id: "ai-shell-loop",
    title: "ai-shell-loop: AI Agent that Generates & Executes Shell Commands",
    description: "Built in September 2024 — two months before Claude Code launched. Lets you describe goals in plain English; the tool calls GPT to generate bash commands, executes them, observes results, and iterates until the goal is reached. Published on PyPI with proper packaging.",
    tags: ["Python", "AI Agent", "OpenAI API", "CLI", "PyPI"],
    thumbnail: "/ai-shell-loop.png",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "llm-security",
    title: "Responsible Disclosure: LLM Chatbot Data Breach (Medical Sector)",
    description: "Discovered a critical data privacy vulnerability in an AI-powered customer support chatbot at a regulated medical e-commerce company. The LLM had unrestricted database access exposing customer data. Reported to the company and escalated to Bavarian Data Protection Authority when not properly fixed.",
    tags: ["Security", "AI Security", "Prompt Injection", "GDPR", "Ethical Hacking"],
    thumbnail: "🔒",
    color: "from-red-500 to-orange-600"
  },
  {
    id: "food-algorithm",
    title: "Simplex Nutrition Optimizer — Solo-Founded Web App",
    description: "Built and launched food-algorithm.de as a solo founder. Applied the Simplex linear programming algorithm to find the cheapest possible diet meeting all nutritional requirements. The system computes personalized targets across 30+ constraints and finds minimum-cost food combinations.",
    tags: ["Java", "Algorithms", "Angular", "PostgreSQL", "Optimization"],
    thumbnail: "/food-algorith1.png",
    color: "from-teal-500 to-green-600"
  },
  {
    id: "shoqu",
    title: "Shoqu — Influencer-Marketer Matching Platform (Co-Founder)",
    description: "Co-founded a platform connecting social media influencers with marketers for sponsored content deals. Built Instagram API integration allowing influencers to pull posts into their profiles. Featured dual user roles, separate dashboards, booking flow, and analytics.",
    tags: ["Product Development", "Bubble.io", "Startup", "Instagram API"],
    thumbnail: "/shoqu1.png",
    color: "from-pink-500 to-rose-600"
  }
];

export default function Work() {
  const t = useTranslations("Work");
  
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-mono mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          A collection of projects spanning backend systems, AI integration, embedded firmware, and security research.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              href={`/work/${project.id}`}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
                  {project.thumbnail.startsWith('/') ? (
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-5xl">{project.thumbnail}</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}