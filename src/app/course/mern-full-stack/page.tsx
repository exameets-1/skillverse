import { Metadata } from "next";
import MernFullStackClient from "@/components/MernFullStackClient";

export const metadata: Metadata = {
  title: "MERN Full Stack Development Course - Exameets Skillverse Academy",
  description: "Master modern web development with MongoDB, Express.js, React, and Node.js. 90-day comprehensive course with 6 real-world projects for ₹15,000. Perfect for beginners and career switchers.",
  authors: [{ name: "Exameets Skillverse Academy" }],
  publisher: "Exameets Skillverse Academy",
  keywords: [
    "MERN stack course",
    "full stack development",
    "React development",
    "Node.js training",
    "MongoDB course",
    "Express.js development",
    "JavaScript engineering",
    "web development course",
    "MERN certification",
    "full stack JavaScript",
    "React Node.js course",
    "Kadapa MERN stack",
    "web developer training",
    "MERN stack developer",
    "full stack engineer course",
    "JavaScript bootcamp",
    "MERN placement training"
  ],
  openGraph: {
    title: "MERN Full Stack Development - Master Modern Web Development",
    description: "Comprehensive 90-day MERN Stack course with MongoDB, Express.js, React, Node.js. 6 real-world projects, placement guarantee, modern deployment. Small batches of 8 students.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "MERN Full Stack Development Course"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MERN Full Stack Development - Modern Web Development Training",
    description: "Master MongoDB, Express.js, React & Node.js in 90 days. 6 projects, placement guarantee, modern deployment. Small batches of 8 students. ₹15,000",
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
    canonical: "/course/mern-full-stack"
  }
};

export default function MernFullStackPage() {
  return <MernFullStackClient />;
}