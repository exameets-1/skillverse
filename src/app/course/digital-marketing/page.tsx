import { Metadata } from "next";
import DigitalMarketingClient from "@/components/DigitalMarketingClient";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Digital Marketing Mastery Course - Exameets Skillverse Academy",
  description: "Master comprehensive digital marketing strategies including SEO, SEM, Social Media Marketing, Content Marketing, Email Marketing, and Analytics. 60-day intensive program with 6 live campaigns for ₹25,000. Perfect for entrepreneurs and marketing professionals.",
  authors: [{ name: "Exameets Skillverse Academy" }],
  publisher: "Exameets Skillverse Academy",
  keywords: [
    "digital marketing course",
    "digital marketing training",
    "SEO course",
    "social media marketing",
    "Google Ads training",
    "Facebook Ads course",
    "content marketing",
    "email marketing",
    "Google Analytics",
    "PPC advertising",
    "digital marketing certification",
    "Kadapa digital marketing",
    "online marketing course",
    "digital marketing for business",
    "marketing automation",
    "growth hacking",
    "digital marketing agency training"
  ],
  openGraph: {
    title: "Digital Marketing Mastery - Master All Digital Marketing Channels",
    description: "Comprehensive 60-day digital marketing course with 6 live campaigns. Learn SEO, Social Media, PPC, Email Marketing & Analytics. Google certification prep included.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Digital Marketing Mastery Course"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Mastery - Complete Marketing Training",
    description: "Master SEO, Social Media, PPC & Analytics in 60 days. 6 live campaigns, Google certification prep, job placement assistance. ₹25,000",
    images: ["/logo.jpg"] // Add your Twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/course/digital-marketing" // Update with your actual URL path
  }
};

export default function DigitalMarketingPage() {
  return <DigitalMarketingClient />;
}