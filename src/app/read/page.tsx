import fs from "fs/promises";
import path from "path";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const markdownDir = path.join(process.cwd(), "public", "markdown-blogs");
  
  try {
    const files = await fs.readdir(markdownDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    const posts = await Promise.all(
      markdownFiles.map(async (file) => {
        const slug = file.replace('.md', '');
        const filePath = path.join(markdownDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        // Extract title (first # heading)
        const titleMatch = content.match(/^# (.+)$/m);
        const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        
        // Extract description (first paragraph after title)
        const descMatch = content.match(/^(?!#|!\[)(.{50,200})\./m);
        const description = descMatch ? descMatch[1].trim() : "Discover insights and tips for your tech career journey.";
        
        // Extract publish date from italic text
        const dateMatch = content.match(/\*Published on (.+?) •/);
        const publishDate = dateMatch ? dateMatch[1] : "Recently";
        
        // Extract read time
        const timeMatch = content.match(/• (.+? read)/);
        const readTime = timeMatch ? timeMatch[1] : "5 min read";
        
        return {
          slug,
          title,
          description,
          publishDate,
          readTime
        };
      })
    );
    
    return posts.sort((a, b) => a.title.localeCompare(b.title));
  } catch {
    return [];
  }
}

export default async function ReadPage() {
  const posts = await getBlogPosts();

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
          
          .blog-listing {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          
          .page-header {
            text-align: center;
            margin-bottom: 60px;
          }
          
          .page-header h1 {
            font-size: 3rem;
            font-weight: 400;
            color: #2c3e50;
            margin-bottom: 15px;
          }
          
          .page-header p {
            font-size: 1.2rem;
            color: #666;
            font-style: italic;
          }
          
          .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 40px;
          }
          
          .post-card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            border-left: 4px solid #3498db;
          }
          
          .post-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(52, 152, 219, 0.2);
            border-left-color: #2980b9;
          }
          
          .post-card h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
            line-height: 1.3;
          }
          
          .post-card p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
            font-size: 1rem;
          }
          
          .post-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            font-size: 0.9rem;
            color: #888;
          }
          
          .post-meta span {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .read-more {
            display: inline-flex;
            align-items: center;
            color: #3498db;
            text-decoration: none;
            font-weight: 500;
            gap: 8px;
            transition: color 0.3s ease;
          }
          
          .read-more:hover {
            color: #2980b9;
          }
          
          .read-more::after {
            content: "→";
            transition: transform 0.3s ease;
          }
          
          .read-more:hover::after {
            transform: translateX(4px);
          }
          
          .empty-state {
            text-align: center;
            color: #666;
            font-style: italic;
            margin-top: 60px;
          }
          
          @media (max-width: 768px) {
            .blog-listing {
              padding: 20px 15px;
            }
            
            .page-header h1 {
              font-size: 2.2rem;
            }
            
            .posts-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            
            .post-card {
              padding: 25px;
            }
            
            .post-meta {
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }
          }
        `
      }} />
      
      <div className="blog-listing">
        <div className="page-header">
          <h1>Knowledge Hub</h1>
          <p>Insights, guides, and stories to accelerate your tech journey</p>
        </div>

        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post.slug} className="post-card">
                <div className="post-meta">
                  <span>📅 {post.publishDate}</span>
                  <span>⏱️ {post.readTime}</span>
                </div>
                
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                
                <Link href={`/read/${post.slug}`} className="read-more">
                  Read Full Article
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No blog posts available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
}