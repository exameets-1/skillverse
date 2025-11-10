import { Metadata } from "next";
import WebDevelopmentClient from "@/components/WebDevelopmentClient";

export const metadata: Metadata = {
  title: "Web Development Course - Exameets Skillverse Academy",
  description: "Master web development fundamentals with HTML, CSS, JavaScript, and responsive design. 75-day comprehensive course with 6 hands-on projects for ₹14,000. Perfect for beginners.",
  authors: [{ name: "Exameets Skillverse Academy" }],
  publisher: "Exameets Skillverse Academy",
  keywords: [
    "web development course",
    "HTML CSS training",
    "JavaScript course",
    "web design fundamentals",
    "responsive design",
    "frontend development",
    "web development basics",
    "HTML5 CSS3",
    "JavaScript essentials",
    "web development projects",
    "web development tutorial",
    "Kadapa web development",
    "website building course",
    "web developer training",
    "frontend web development",
    "web design course",
    "beginner web development"
  ],
  openGraph: {
    title: "Web Development Fundamentals - Master Modern Web Design",
    description: "Comprehensive 75-day web development course with HTML, CSS, JavaScript. 6 complete website projects, portfolio building, live deployment. Small batches of 15 students.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Web Development Course"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Fundamentals - Modern Web Design Training",
    description: "Master HTML, CSS & JavaScript in 75 days. 6 projects, portfolio building, live deployment. Small batches of 15 students. ₹14,000",
    images: ["/logo.jpg"]
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
    canonical: "/course/web-development"
  }
};

export default function WebDevelopmentPage() {
  return <WebDevelopmentClient />;
}