import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  readingTime: number;
}

const blogPosts: Record<string, BlogPost> = {
  "placeholder": {
    slug: "placeholder",
    title: "[Placeholder] First Blog Post Coming Soon",
    content: `
      <p class='mb-6 text-gray-500 italic'>This is a placeholder blog post. Real content will be added here soon.</p>

      <p class='mb-6 text-gray-500 italic'>Check back later for actual articles about AI integration, backend engineering, and production systems.</p>
    `,
    date: "2026-05-01",
    tags: ["Placeholder"],
    readingTime: 1
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {};
  }

  const description = post.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);

  return {
    title: `${post.title} — Carlos Freund`,
    description,
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          ← Back to Blog
        </Link>
        
        <article>
          <header className="mb-12">
            <h1 className="text-4xl font-bold font-mono mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Thanks for reading! Have thoughts? <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Get in touch</a>.
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}