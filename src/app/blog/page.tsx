import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import Image from "next/image";

type Blog = {
  title: string;
  slug: string;
  postedAt: string;
  tags: string[];
  hook?: string;
  imageUrl?: string;
};

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.blogs || [];
}

export default async function BlogListPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-linear-to-brrom-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Skillverse Explains
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Insights, stories, and knowledge to help you grow
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Tag className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No blogs posted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: Blog) => (
              <article
                key={blog.slug}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                {/* Image Container */}
                <Link href={`/blog/${blog.slug}`}>
                  <div className="relative h-48 bg-linear-to-br from-blue-400 to-indigo-600 overflow-hidden">
                    {blog.imageUrl ? (
                      <Image
                        src={blog.imageUrl}
                        alt={`${blog.title} + Best Software Training in Kadapa Exameets Skillverse Academy`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Tag className="w-16 h-16 text-white opacity-40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <Link href={`/blog/${blog.slug}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                      {blog.title}
                    </h2>
                  </Link>

                  {blog.hook && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {blog.hook}
                    </p>
                  )}

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(blog.postedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>

                  {/* Tags */}
                  {blog.tags?.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-4">
                      {blog.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Link */}
                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}