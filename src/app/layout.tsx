// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Providers } from "./providers";
// import Script from "next/script";
// import Analytics from "@/components/Analytics"; // ✅ import Analytics

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Exameets Skillverse Academy",
//   description:
//     "Best coaching centre in Kadapa ! Empowering learners with industry-ready skills.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {/* ✅ Google Analytics base script */}
//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-NPRC8MPNYD"
//           strategy="afterInteractive"
//         />
//         <Script id="google-analytics" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-NPRC8MPNYD');
//           `}
//         </Script>

//         <Providers>
//           {children}
//           <Analytics /> {/* ✅ Track route changes */}
//         </Providers>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import { Suspense } from "react"; // ✅ import Suspense

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exameets Skillverse Academy",
  description:
    "Best coaching centre in Kadapa ! Empowering learners with industry-ready skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
          {children}

          {/* ✅ Wrap Analytics with Suspense */}
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
