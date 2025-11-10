import { Metadata } from "next";
import MsOfficeClient from "@/components/MsOfficeClient";

export const metadata: Metadata = {
  title: "MS Office Mastery Course - Exameets Skillverse Academy",
  description: "Master Microsoft Office Suite including Word, Excel, PowerPoint, and Outlook. 45-day comprehensive course with hands-on projects for ₹8,000. Perfect for office workers and professionals.",
  authors: [{ name: "Exameets Skillverse Academy" }],
  publisher: "Exameets Skillverse Academy",
  keywords: [
    "MS Office course",
    "Microsoft Office training",
    "Excel course",
    "Word training",
    "PowerPoint mastery",
    "Office productivity",
    "MS Office certification",
    "Excel data analysis",
    "Word document design",
    "PowerPoint presentations",
    "Office automation",
    "Kadapa MS Office",
    "office skills training",
    "MS Office mastery",
    "professional office course",
    "Excel formulas course",
    "office software training"
  ],
  openGraph: {
    title: "MS Office Mastery - Professional Office Skills Training",
    description: "Comprehensive 45-day MS Office course covering Word, Excel, PowerPoint. Real-world projects, certification preparation, career enhancement. Small batches of 12 students.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "MS Office Mastery Course"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MS Office Mastery - Professional Productivity Training",
    description: "Master Word, Excel & PowerPoint in 45 days. Industry projects, certification prep, career enhancement. Small batches of 12 students. ₹8,000",
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
    canonical: "/course/ms-office"
  }
};

export default function MsOfficePage() {
  return <MsOfficeClient />;
}
