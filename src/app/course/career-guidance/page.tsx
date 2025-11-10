import { Metadata } from "next";
import CareerGuidanceClient from "@/components/CareerGuidanceClient";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Career Guidance & Counseling - Exameets Skillverse Academy",
  description: "Get personalized career guidance and counseling with expert mentoring, career assessments, resume building, and interview preparation. 7-day comprehensive program for ₹500. Perfect for students, professionals, and career changers.",
  authors: [{ name: "Exameets Skillverse Academy" }],
  publisher: "Exameets Skillverse Academy",
  keywords: [
    "career guidance",
    "career counseling",
    "career planning",
    "career roadmap",
    "professional development",
    "career assessment",
    "resume building",
    "interview preparation",
    "career coaching",
    "Kadapa career guidance",
    "career change support",
    "job search strategies",
    "LinkedIn optimization",
    "personal branding"
  ],
  openGraph: {
    title: "Career Guidance & Counseling - Transform Your Professional Future",
    description: "Personalized career guidance with expert mentoring, assessments, and strategic roadmap creation. 7-day program for just ₹500.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Career Guidance & Counseling Program"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Guidance & Counseling - Expert Career Planning",
    description: "Get personalized career guidance with assessments, mentoring, and strategic planning. 7-day program for ₹500.",
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
    canonical: "/course/career-guidance" // Update with your actual URL path
  }
};

export default function CareerGuidancePage() {
  return <CareerGuidanceClient />;
}