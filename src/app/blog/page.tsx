import { Metadata } from "next";
import BlogList from "@/components/BlogList";

type Blog = {
  title: string;
  slug: string;
  postedAt: string;
  tags: string[];
  type: string;
  hook?: string;
  imageUrl?: string;
};

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Exameets Explains - Insights & Knowledge Hub",
    description: "Explore insights, stories, and knowledge across company updates, research, product news, safety, engineering, security, and global affairs. Stay informed with Exameets Skillverse Academy.",
    keywords: [
      "Exameets blog",
      "software training",
      "tech insights",
      "research articles",
      "product updates",
      "engineering blog",
      "security news",
      "global affairs",
      "Kadapa training",
    ],
    alternates: {
      canonical: 'https://skillverse.exameets.in/blog'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ name: 'Exameets Skillverse Academy' }],
    publisher: 'Exameets Skillverse Academy',
    openGraph: {
      title: "Exameets Explains - Insights & Knowledge Hub",
      description: "Insights, stories, and knowledge to help you grow",
      type: "website",
      locale: "en_US",
      url: 'https://skillverse.exameets.in/blog',
      siteName: 'Exameets Skillverse Academy',
      images: [{
        url: 'https://skillverse.exameets.in/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Exameets Skillverse Academy Logo'
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Exameets Explains - Insights & Knowledge Hub",
      description: "Insights, stories, and knowledge to help you grow",
      images: ['https://skillverse.exameets.in/logo.jpg'],
    },
    // ...rest of existing metadata...
  };
}

// Fetch blogs server-side
async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
      cache: "no-store",
      //next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.status);
      return [];
    }

    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogListPage() {
  const blogs = await getBlogs();

  return <BlogList initialBlogs={blogs} />;
}