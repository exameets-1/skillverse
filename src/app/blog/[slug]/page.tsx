// app/blog/[slug]/page.tsx
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  if (!/^[a-zA-Z0-9\-_]+$/.test(slug)) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found."
    };
  }

  const filePath = path.join(process.cwd(), "public", "blog", slug, "index.html");
  
  try {
    const html = await fs.readFile(filePath, "utf8");
    
    // Extract title from HTML
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : `${slug} | Exameets Skillverse`;
    
    // Extract description from meta tag
    const descMatch = html.match(/<meta name="description" content="(.*?)"/i);
    const description = descMatch ? descMatch[1] : "Industry-ready tech education in Kadapa. Transform your career without leaving your city.";
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `/blog/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      }
    };
  } catch {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found."
    };
  }
}

// Ensure Next.js statically generates one page per folder under public/blog
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "public", "blog");
  try {
    const dirents = await fs.readdir(blogDir, { withFileTypes: true });
    const slugs = dirents.filter(d => d.isDirectory()).map(d => d.name);
    return slugs.map(slug => ({ slug }));
  } catch (err) {
    // If blog folder missing, return empty -> no pages generated
    return [];
  }
}

// Optional: make these pages static at build time
export const dynamic = "force-static";

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  // sanitize slug a bit (avoid path traversal)
  if (!/^[a-zA-Z0-9\-_]+$/.test(slug)) return notFound();

  const filePath = path.join(process.cwd(), "public", "blog", slug, "index.html");
  
  let html: string;
  try {
    html = await fs.readFile(filePath, "utf8");
  } catch {
    return notFound();
  }

  // Return server component rendering raw HTML
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
