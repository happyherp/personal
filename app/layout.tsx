import type { Metadata } from 'next';
import { JetBrains_Mono, Instrument_Serif, Space_Grotesk } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '700', '800'],
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Carlos Freund — Backend Engineer',
  description:
    'Senior backend engineer shipping AI into production. 15 years of Java + Kotlin. Open-source contributor to OpenHands and litellm. Freelancing from Belize, UTC-6.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
