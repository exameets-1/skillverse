import { Metadata } from "next";
import PythonCoreOOPSClient from "@/components/PythonCoreOOPSClient";

export const metadata: Metadata = {
  title: "Python Core & OOPs Course - Exameets Skillverse Academy",
  description: "Master Python programming fundamentals and Object-Oriented Programming concepts. 60-day comprehensive course with 5 practical projects for ₹12,000. Perfect for beginners and CS students.",
  authors: [{ name: "Exameets Skillverse Academy" }],
  publisher: "Exameets Skillverse Academy",
  keywords: [
    "Python course",
    "Python programming",
    "OOPs concepts",
    "Python training",
    "Python fundamentals",
    "Object-oriented programming",
    "Python basics",
    "Python development",
    "Python certification",
    "Python projects",
    "Python tutorial",
    "Kadapa Python course",
    "programming basics",
    "Python developer",
    "Python OOPs",
    "Python foundation",
    "beginner Python course"
  ],
  openGraph: {
    title: "Python Core & OOPs - Master Programming Fundamentals",
    description: "Comprehensive 60-day Python programming course with OOPs concepts. 5 practical projects, hands-on learning, career guidance. Small batches of 12 students.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Python Core & OOPs Course"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Python Core & OOPs - Programming Fundamentals Training",
    description: "Master Python & OOPs in 60 days. 5 projects, career guidance, hands-on learning. Small batches of 12 students. ₹12,000",
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
    canonical: "/course/python-core-oops"
  }
};

export default function PythonCoreOOPSPage() {
  return <PythonCoreOOPSClient />;
}
