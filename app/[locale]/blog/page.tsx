'use client';

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
  return [
    {
      slug: "placeholder",
      title: "[Placeholder] First Blog Post Coming Soon",
      description: "This is a placeholder. Real blog posts will be added here.",
      date: "2026-05-01",
      tags: ["Placeholder"],
      readingTime: 1
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