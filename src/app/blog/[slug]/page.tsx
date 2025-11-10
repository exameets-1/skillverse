import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/lib/course-models/Blog";

// Add interface for blog document
interface BlogDocument {
  _id: string;
  title: string;
  imageUrl: string;
  markdownText: string;
  hook?: string;
  author: string;
  postedAt: Date;
  updatedAt: Date;
  type: string;
  tags: string[];
  slug: string;
  __v: number;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const blog = (await Blog.findOne({ slug }).lean()) as BlogDocument | null;

  if (!blog) return { title: "Blog Not Found" };

  const description = blog.hook || blog.markdownText.substring(0, 150).replace(/\n/g, " ");
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`;

  return {
    title: blog.title,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.title,
      description: description,
      url: canonicalUrl,
      type: "article",
      images: blog.imageUrl,
      publishedTime: blog.postedAt?.toISOString(),
      authors: [blog.author],
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: description,
      images: [blog.imageUrl],
    },
    keywords: blog.tags?.join(", "),
    authors: [{ name: blog.author }],
  };
}

async function getBlog(slug: string): Promise<BlogDocument | null> {
  await dbConnect();
  const blog = (await Blog.findOne({ slug }).lean()) as BlogDocument | null;
  return blog;
}

export default async function BlogPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.hook || blog.markdownText.substring(0, 150),
    "image": blog.imageUrl,
    "datePublished": blog.postedAt.toISOString(),
    "dateModified": blog.updatedAt.toISOString(),
    "author": {
      "@type": "Person",
      "name": blog.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Exameets Skillverse Academy",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.jpg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`
    },
    "keywords": blog.tags?.join(", "),
    "articleSection": blog.type
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <article className="max-w-4xl mx-auto px-4 py-10">
        {/* <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          {blog.hook && (
            <p className="text-xl text-gray-700 font-medium mb-4">{blog.hook}</p>
          )}
          <div className="text-gray-500 text-sm mb-4">
            <time dateTime={blog.postedAt?.toISOString()}>
              {new Date(blog.postedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {" • "}
            <span>{blog.author}</span>
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {blog.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header> */}

        {/* ReactMarkdown with proper styling */}
        <div className="prose prose-lg">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {blog.markdownText}
          </ReactMarkdown>
        </div>

      </article>
    </>
  );
}