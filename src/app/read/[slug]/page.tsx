import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { marked } from "marked";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

// Generate static params for all markdown files
export async function generateStaticParams() {
  const markdownDir = path.join(process.cwd(), "public", "markdown-blogs");
  try {
    const files = await fs.readdir(markdownDir);
    const slugs = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
    return slugs.map(slug => ({ slug }));
  } catch {
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  if (!/^[a-zA-Z0-9\-_]+$/.test(slug)) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found."
    };
  }

  const filePath = path.join(process.cwd(), "public", "markdown-blogs", `${slug}.md`);
  
  try {
    const content = await fs.readFile(filePath, "utf8");
    
    // Extract title (first # heading)
    const titleMatch = content.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : `${slug} | Exameets Skillverse Blog`;
    
    // Extract description (first paragraph or italic text)
    const descMatch = content.match(/^\*(.+)\*$/m) || content.match(/^(?!#)(.{50,200})\./m);
    const description = descMatch ? descMatch[1].trim() : "Industry insights and educational content from Exameets Skillverse Academy.";
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `/read/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      }
    };
  } catch {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found."
    };
  }
}

export const dynamic = "force-static";

export default async function ReadPage({ params }: Props) {
  const { slug } = await params;
  
  // Sanitize slug
  if (!/^[a-zA-Z0-9\-_]+$/.test(slug)) return notFound();

  const filePath = path.join(process.cwd(), "public", "markdown-blogs", `${slug}.md`);
  
  let content: string;
  try {
    content = await fs.readFile(filePath, "utf8");
  } catch {
    return notFound();
  }

  // Parse markdown to HTML
  const html = await marked.parse(content);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            background: #fafafa;
            font-family: 'Georgia', 'Times New Roman', serif;
            margin: 0;
            padding: 0;
          }
          
          .markdown-blog {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: white;
            min-height: 100vh;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          
          .markdown-blog h1 {
            font-size: 2.5rem;
            font-weight: 400;
            margin-bottom: 20px;
            color: #2c3e50;
            font-family: 'Georgia', serif;
            line-height: 1.2;
          }
          
          .markdown-blog h2 {
            font-size: 1.8rem;
            font-weight: 400;
            margin: 40px 0 20px 0;
            color: #2c3e50;
            border-bottom: 1px solid #ecf0f1;
            padding-bottom: 10px;
          }
          
          .markdown-blog h3 {
            font-size: 1.4rem;
            font-weight: 500;
            margin: 30px 0 15px 0;
            color: #34495e;
          }
          
          .markdown-blog p {
            font-size: 18px;
            line-height: 1.8;
            margin-bottom: 20px;
            color: #2c3e50;
            text-align: justify;
            font-family: 'Georgia', 'Times New Roman', serif;
          }
          
          .markdown-blog em {
            font-style: italic;
            color: #666;
            font-size: 16px;
            display: block;
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ecf0f1;
          }
          
          .markdown-blog ul, .markdown-blog ol {
            margin: 20px 0;
            padding-left: 30px;
            color: #2c3e50;
          }
          
          .markdown-blog ul {
            list-style-type: disc;
            list-style-position: outside;
          }
          
          .markdown-blog ol {
            list-style-type: decimal;
            list-style-position: outside;
          }
          
          .markdown-blog li {
            margin-bottom: 8px;
            line-height: 1.6;
            font-size: 18px;
            display: list-item;
            color: #2c3e50;
          }
          
          .markdown-blog strong {
            font-weight: 600;
            color: #2c3e50;
          }
          
          .markdown-blog a {
            color: #3498db;
            text-decoration: none;
            border-bottom: 1px dotted #3498db;
          }
          
          .markdown-blog a:hover {
            border-bottom: 1px solid #3498db;
          }
          
          @media (max-width: 768px) {
            .markdown-blog {
              padding: 20px 15px;
            }
            
            .markdown-blog h1 {
              font-size: 2rem;
            }
            
            .markdown-blog h2 {
              font-size: 1.5rem;
            }
            
            .markdown-blog p, .markdown-blog li {
              font-size: 16px;
            }
          }
        `
      }} />
      <div className="markdown-blog">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  );
}
