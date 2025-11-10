"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import Image from "next/image";

type Blog = {
  title: string;
  slug: string;
  postedAt: string;
  tags: string[];
  type: string;
  hook?: string;
  imageUrl?: string;
};

type BlogListProps = {
  initialBlogs: Blog[];
};

const categories = [
  "All",
  "company",
  "research",
  "product",
  "safety",
  "engineering",
  "security",
  "global-affairs",
];

export default function BlogList({ initialBlogs }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs =
    selectedCategory === "All"
      ? initialBlogs
      : initialBlogs.filter((blog) => blog.type === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-black text-white">
        <div className="relative max-w-6xl mx-auto px-4 py-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-[Times_New_Roman] mb-4">
            Exameets Explains
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Insights, stories, and knowledge to help you grow
          </p>
          
          {/* Filter Tabs */}
          <div className="w-full max-w-full px-4 mx-auto">
            <div className="flex flex-wrap gap-3 justify-center items-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 lg:text-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "text-white opacity-100"
                      : "text-white opacity-60 hover:opacity-80"
                  }`}
                >
                  {category === "global-affairs" 
                    ? "Global" 
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Tag className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">
              {selectedCategory === "All"
                ? "No blogs posted yet."
                : `No blogs found in "${selectedCategory}" category.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog: Blog, index: number) => (
              <article
                key={blog.slug}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                {/* Image Container */}
                <Link 
                  href={`/blog/${blog.slug}`}
                  title={`Read full article: ${blog.title}`}
                  aria-label={`View full article about ${blog.title}`}
                >
                  <div className="relative h-48 bg-linear-to-br from-blue-400 to-indigo-600 overflow-hidden">
                    {blog.imageUrl ? (
                      <Image
                        src={blog.imageUrl}
                        title={blog.title}
                        alt="Best Software Training in Kadapa Exameets Skillverse Academy"
                        fill
                        loading={index < 3 ? "eager" : "lazy"}
                        priority={index < 3}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Tag className="w-16 h-16 text-white opacity-40" />
                      </div>
                    )}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-semibold uppercase tracking-wide">
                      {blog.type}
                    </span>
                  </div>

                  <Link 
                    href={`/blog/${blog.slug}`}
                    title={`Read article: ${blog.title}`}
                    className="block"
                  >
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
                    {new Date(blog.postedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
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
                    title={`Continue reading ${blog.title}`}
                    aria-label={`Continue reading article about ${blog.title}`}
                  >
                    Read full article
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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