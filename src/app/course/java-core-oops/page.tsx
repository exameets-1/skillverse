import { Metadata } from "next";
import JavaCoreOOPSClient from "@/components/JavaCoreOOPSClient";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Java Core & OOPs Course - Exameets Skillverse Academy",
  description: "Master Java programming fundamentals and Object-Oriented Programming concepts. 60-day comprehensive course with 5 hands-on projects for ₹10,000. Perfect for beginners and CS students looking to build strong Java foundation.",
  authors: [{ name: "Exameets Skillverse Academy" }],
  publisher: "Exameets Skillverse Academy",
  keywords: [
    "Java course",
    "Java programming",
    "Core Java training",
    "OOPs concepts",
    "Object-oriented programming",
    "Java for beginners",
    "Java development course",
    "Java collections",
    "Exception handling Java",
    "Java projects",
    "Learn Java programming",
    "Kadapa Java training",
    "Java developer course",
    "Java fundamentals",
    "Java backend development",
    "Java certification course",
    "Java programming basics"
  ],
  openGraph: {
    title: "Java Core & OOPs - Master Java Programming Fundamentals",
    description: "Comprehensive 60-day Java course with 5 practical projects. Learn Core Java, OOPs principles, Collections, Exception Handling from scratch. Small batches of 12 students.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Java Core & OOPs Course"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Java Core & OOPs - Complete Java Programming Course",
    description: "Master Java fundamentals & OOPs in 60 days. 5 projects, small batches, placement assistance. Perfect for beginners. ₹10,000",
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
    canonical: "/course/java-core-oops" // Update with your actual URL path
  }
};

export default function JavaCoreOOPSPage() {
  return <JavaCoreOOPSClient />;
}