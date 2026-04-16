'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");
  
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-mono mb-8">{t('title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="relative w-64 h-64 mx-auto lg:mx-0 mb-6">
                <Image
                  src="/Portraet_CarlosFreund_lowres.jpg"
                  alt="Carlos Freund"
                  fill
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
              
              {/* Key Facts Sidebar */}
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-500 dark:text-gray-400">{t('timezone')}</h3>
                  <p>UTC-6 (Belize)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500 dark:text-gray-400">{t('availability')}</h3>
                  <p>Available now</p>
                  <p className="text-gray-600 dark:text-gray-400">More than 30 hrs/week</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500 dark:text-gray-400">{t('languages')}</h3>
                  <p>English (Fluent)</p>
                  <p>German (Native)</p>
                  <p>Spanish (Native)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500 dark:text-gray-400">Links</h3>
                  <p><a href="https://github.com/happyherp" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub</a></p>
                  <p><a href="https://linkedin.com/in/carlos-freund-93630582" className="text-blue-600 dark:text-blue-400 hover:underline">LinkedIn</a></p>
                  <p><a href="https://www.upwork.com/freelancers/~017414ed3a00e19ec0" className="text-blue-600 dark:text-blue-400 hover:underline">Upwork</a></p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bio and Narrative */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">The Journey</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="mb-4">
                  I'm Carlos Freund, a Senior Backend Engineer with 15 years of experience building production software. 
                  My journey began with a software development apprenticeship in Germany, where I learned the fundamentals 
                  of building robust, maintainable systems.
                </p>
                
                <p className="mb-4">
                  After years of working in corporate environments and even founding my own startup 
                  (food-algorithm.de - a nutrition optimization web app), I made a deliberate choice to 
                  step away from the traditional career path. I left a €80k job to freelance from Belize, 
                  seeking the freedom to work on problems that truly matter while living life on my own terms.
                </p>
                
                <p className="mb-4">
                  Today, I help companies integrate AI into real backend systems — not as pilots or prototypes, 
                  but as production reality. At KPS, I was the first engineer to formally push for AI adoption, 
                  building the internal case, presenting the roadmap, and delivering on the promise. I built MCP 
                  servers for LLM tool integration and work daily with agents, embeddings, and Python AI tooling 
                  — on top of my 15-year Java/Spring backend foundation.
                </p>
                
                <p className="mb-4">
                  What sets me apart is that I'm not just a consumer of AI tools — I'm a contributor. I have 
                  multiple merged pull requests in OpenHands (the leading open-source AI coding agent with 70k+ stars), 
                  including core work on context-window management and LLM cost optimization. I also contributed 
                  a critical token-counter fix to litellm, the universal LLM gateway library used across the industry.
                </p>
                
                <p>
                  I ship autonomously without hand-holding. Whether it's building a complete communication system 
                  for troy GmbH (handling email, PDF letters, SMS, and print fulfillment), writing firmware for 
                  an underwater dive propulsion vehicle, or revealing critical security vulnerabilities in AI systems, 
                  I take ownership and deliver results.
                </p>
              </div>
            </div>
            
            {/* Technical Skills */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('techStackTitle')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">Expert</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Java', 'Kotlin', 'SQL', 'Hibernate', 'JavaScript', 'Haskell'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Proficient</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Spring', 'Maven', 'Docker', 'AWS', 'Python', 'Angular', 'TypeScript', 'ElasticSearch'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-600 dark:text-purple-400">AI / Agentic</h3>
                  <div className="flex flex-wrap gap-2">
                    {['OpenHands', 'LiteLLM', 'MCP', 'vibe coding'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-orange-600 dark:text-orange-400">Embedded</h3>
                  <div className="flex flex-wrap gap-2">
                    {['C++', 'ESP32'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Timeline */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold">Senior Java & AI Integration Engineer</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">KPS Software GmbH | May 2022 – Feb 2025</p>
                  <p className="text-sm">
                    Java backend development and API design for iOS integration. Pioneered AI-assisted 
                    development workflows and built comprehensive automated test suites.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-lg font-semibold">Lead Backend Developer & SCRUM Master</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">troy GmbH | 2018 – 2022</p>
                  <p className="text-sm">
                    Owned four revenue-critical backend processes. Primary developer for Kotlin/Spring backend, 
                    built AWS Redshift data warehouse, and mentored junior developers.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-lg font-semibold">Java Consultant (Freelance)</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">FINCON | 2017 – 2018</p>
                  <p className="text-sm">
                    €80/h freelance consultant customizing banking software. Performance optimization, 
                    frontend development, and test-driven development.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-lg font-semibold">Founder & Developer</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">food-algorithm.de | 2016 – 2017</p>
                  <p className="text-sm">
                    Solo founder building a nutrition optimization web app. Implemented Simplex algorithm 
                    for diet optimization and launched the complete product.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}