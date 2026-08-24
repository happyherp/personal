'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl font-bold font-mono mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-6">
            {t('heroSubtitle')}
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
            {t('locationBadge')}
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/work" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              {t('ctaWork')}
            </Link>
            <a 
              href="https://calendly.com/carlosfreund/1-hour-meeting"
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors"
            >
              {t('ctaContact')}
            </a>
          </div>
        </div>
      </section>
      
      {/* Value Propositions */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('valueProp1')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('valueProp1Description')}
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('valueProp2')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('valueProp2Description')}
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('valueProp3')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('valueProp3Description')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Preview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('featuredProjects')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('featuredProjectsSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/work/openhands" className="group cursor-pointer block">
              <div className="h-32 rounded-lg mb-3 flex items-center justify-center overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img src="/openhands-merge-commits.png" alt="OpenHands AI Agent" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                OpenHands AI Agent
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Python, Open Source</p>
            </Link>
            
            <Link href="/work/troy-comms" className="group cursor-pointer block">
              <div className="h-32 rounded-lg mb-3 flex items-center justify-center overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img src="/troy-email.png" alt="troy Comms System" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                troy Comms System
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Kotlin, Email, PDF</p>
            </Link>
            
            <Link href="/work/dpvcontrol" className="group cursor-pointer block">
              <div className="h-32 rounded-lg mb-3 flex items-center justify-center overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img src="/dpvtop2.jpg" alt="DPVControl Firmware" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                DPVControl Firmware
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">C++, ESP32, Embedded</p>
            </Link>
            
            <Link href="/work/ai-shell-loop" className="group cursor-pointer block">
              <div className="h-32 rounded-lg mb-3 flex items-center justify-center overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img src="/ai-shell-loop.png" alt="ai-shell-loop" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                ai-shell-loop
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Python, AI Agent</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}