import { Metadata } from "next";
import JavaFullStackClient from "@/components/JavaFullStackClient";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Java Full Stack Development Course - Exameets Skillverse Academy",
  description: "Master enterprise-level Java Full Stack development with Spring Boot, Microservices, React, and database design. 90-day comprehensive course with 6 real-world projects for ₹22,000. Perfect for CS graduates and experienced developers seeking advanced skills.",
  authors: [{ name: "Exameets Skillverse Academy" }],
  publisher: "Exameets Skillverse Academy",
  keywords: [
    "Java full stack course",
    "Java full stack developer",
    "Spring Boot training",
    "Java microservices",
    "full stack development",
    "Java backend development",
    "React Java integration",
    "enterprise Java course",
    "Java REST API",
    "Spring framework course",
    "full stack Java training",
    "Kadapa Java full stack",
    "Java developer certification",
    "Java Spring Boot",
    "full stack engineer course",
    "Java enterprise applications",
    "Java placement training"
  ],
  openGraph: {
    title: "Java Full Stack Development - Master Enterprise Java & Spring Boot",
    description: "Comprehensive 90-day Java Full Stack course with Spring Boot, Microservices, React. 6 enterprise projects, placement guarantee, AWS deployment. Elite batches of 10 students.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Java Full Stack Development Course"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Java Full Stack Development - Enterprise Java Training",
    description: "Master Spring Boot, Microservices & React in 90 days. 6 projects, placement guarantee, AWS deployment. Elite mentoring for 10 students. ₹22,000",
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
    canonical: "/course/java-full-stack" // Update with your actual URL path
  }
};

export default function JavaFullStackPage() {
  return <JavaFullStackClient />;
}