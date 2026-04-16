import { useTranslations } from "next-intl";
import Link from "next/link";
import { promises as fs } from 'fs';
import path from 'path';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  // For now, return static blog posts
  // In the future, this could read from content/blog/en directory
  return [
    {
      slug: "why-i-left-80k-job",
      title: "Why I Left a €80k Job to Freelance from Belize",
      description: "The real story behind walking away from corporate security to build a location-independent career in AI integration.",
      date: "2026-04-20",
      tags: ["Career", "Remote Work", "AI", "Freelancing"],
      readingTime: 8
    },
    {
      slug: "medical-chatbot-breach",
      title: "I Found a Data Breach in a Medical Chatbot — Here's What Happened",
      description: "How a routine security test revealed critical vulnerabilities in an AI-powered medical e-commerce platform and what I learned about LLM safety.",
      date: "2026-04-18",
      tags: ["Security", "AI", "LLM", "Ethical Hacking"],
      readingTime: 12
    },
    {
      slug: "openhands-contributions",
      title: "What I Learned Contributing to OpenHands",
      description: "12 merged pull requests later, here are the key insights about AI agent architecture, prompt caching, and building production-ready LLM systems.",
      date: "2026-04-15",
      tags: ["Open Source", "AI", "OpenHands", "LLM"],
      readingTime: 10
    }
  ];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Blog({ params }: PageProps) {
  const { locale } = await params;
  const t = await import(`@/messages/${locale}.json`).then(m => m.default.Blog || m.default);
  const posts = await getBlogPosts();
  
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-mono mb-4">{t?.title || "Blog"}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Thoughts on AI integration, backend engineering, and building production systems.
        </p>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-0"
            >
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}