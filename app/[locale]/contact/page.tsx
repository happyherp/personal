'use client';

import { useState } from 'react';
import { useTranslations } from "next-intl";

const CalendlyEmbed = ({ t }: { t: any }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold mb-4">{t('scheduleCall')}</h3>
      <div className="h-96 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
        <a 
          href="https://calendly.com/carlosfreund/new-meeting"
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-flex items-center"
        >
          {t('openCalendly')}
        </a>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
        {t('calendlyDescription')}
      </p>
    </div>
  );
};

export default function Contact() {
  const t = useTranslations("Contact");
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };
  
  const currentTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/Belize',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold font-mono mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('intro')}
          </p>
        </header>
        
        {/* Timezone Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
          <p className="text-center text-blue-900 dark:text-blue-200">
            {t('timezoneText', { time: currentTime })}
          </p>
          <p className="text-center text-sm text-blue-700 dark:text-blue-300 mt-2">
            {t('availabilityStatus')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('formName')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('formEmail')}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('formMessage')}
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder={t('formPlaceholder')}
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {t('formSubmit')}
              </button>
              
              {status === 'success' && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg">
                  {t('formSuccess')}
                </div>
              )}
              
              {status === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
                  {t('formError')}
                </div>
              )}
            </form>
          </div>
          
          {/* Calendly Embed */}
          <div>
            <CalendlyEmbed t={t} />
          </div>
        </div>
        
        {/* Contact Links */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">{t('directLinks')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a 
              href="mailto:carlosfreund@gmail.com"
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              <span className="text-3xl mb-2">📧</span>
              <span className="font-medium">Email</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">carlosfreund@gmail.com</span>
            </a>
            
            <a 
              href="https://github.com/happyherp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              <span className="text-3xl mb-2">🐙</span>
              <span className="font-medium">GitHub</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">@happyherp</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/carlos-freund-93630582"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              <span className="text-3xl mb-2">💼</span>
              <span className="font-medium">LinkedIn</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Profile</span>
            </a>
            
            <a 
              href="https://www.upwork.com/freelancers/~017414ed3a00e19ec0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              <span className="text-3xl mb-2">💻</span>
              <span className="font-medium">Upwork</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Freelance Profile</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}