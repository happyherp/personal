import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Carlos Freund — Senior Backend & AI Engineer";
const description = "Senior Backend Engineer specializing in Java, Kotlin, and AI integration. 15 years of production experience. Based in Belize, UTC-6.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.carlosfreund.dev"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://www.carlosfreund.dev",
    siteName: "Carlos Freund",
    images: [
      {
        url: "/Portraet_CarlosFreund_lowres.jpg",
        width: 591,
        height: 886,
        alt: "Carlos Freund",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/Portraet_CarlosFreund_lowres.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
