import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import { Suspense } from "react"; // ✅ import Suspense
import AuthInit from "@/components/AuthInit";
import { Inter } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Exameets Skillverse Academy | Best Tech Training in Kadapa",
  description:
    `Transform your career with Exameets Skillverse Academy in Kadapa. 
    Expert-led courses in Java, MERN, Web Development, Digital Marketing, Python, and more. 
    Hands-on labs, mock interviews, and career support included.`,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "ExaMeets SkillVerse",
              "description": "Comprehensive exam preparation courses and practice tests",
              "url": "https://exameets-skillverse.com",
              "sameAs": [
                "https://facebook.com/exameetsskillverse",
                "https://twitter.com/exameetsverse",
                "https://linkedin.com/company/exameets-skillverse"
              ]
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Google Analytics base script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NPRC8MPNYD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NPRC8MPNYD');
          `}
        </Script>
          <Providers>
            <AuthInit />   {/* ✅ auto restore session */}
            {children}

            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
          </Providers>
      </body>
    </html>
  );
}
