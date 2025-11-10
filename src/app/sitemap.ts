import { MetadataRoute } from 'next';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/lib/course-models/Blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://skillverse.exameets.in';

  // Static routes from your old sitemap
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/test/register`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/test/setup`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Course routes
  const courses = [
    'java-full-stack',
    'mern-full-stack',
    'web-development',
    'ms-office',
    'digital-marketing',
    'java-core-oops',
    'python-core-oops',
    'career-guidance',
  ];

  const courseRoutes = courses.map((slug) => ({
    url: `${baseUrl}/course/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic blog routes
  await dbConnect();
  const blogs = await Blog.find({}).select('slug updatedAt').lean();

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Blog index page
  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  };

  return [
    ...staticRoutes,
    ...courseRoutes,
    blogIndex,
    ...blogRoutes,
  ];
}