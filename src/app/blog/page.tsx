// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Calendar, Tag, ArrowRight } from "lucide-react";
// import Image from "next/image";

// type Blog = {
//   title: string;
//   slug: string;
//   postedAt: string;
//   tags: string[];
//   type: string;
//   hook?: string;
//   imageUrl?: string;
// };

// const categories = [
//   "All",
//   "company",
//   "research",
//   "product",
//   "safety",
//   "engineering",
//   "security",
//   "global-affairs",
// ];

// export default function BlogListPage() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchBlogs() {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
//           cache: "no-store",
//         });
//         const data = await res.json();
//         setBlogs(data.blogs || []);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBlogs();
//   }, []);

//   const filteredBlogs =
//     selectedCategory === "All"
//       ? blogs
//       : blogs.filter((blog) => blog.type === selectedCategory);

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header Section */}
//       <div className="relative overflow-hidden bg-black text-white">
//         <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-4">
//             Skillverse Explains
//           </h1>
//           <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//             Insights, stories, and knowledge to help you grow
//           </p>
//         </div>
//       </div>

//       {/* Filter Tabs */}
//       {/* <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
//                   selectedCategory === category
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category === "global-affairs" ? "Global Affairs" : category.charAt(0).toUpperCase() + category.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div> */}

//       <div className="bg-linear-to-r from-slate-50 via-blue-50 to-indigo-50 border-b border-gray-200 sticky top-0 z-10 shadow-sm backdrop-blur-sm">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide justify-center">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
//                   selectedCategory === category
//                     ? "text-white opacity-100"
//                     : "text-white opacity-60 hover:opacity-80"
//                 }`}
//               >
//                 {category === "global-affairs" ? "Global Affairs" : category.charAt(0).toUpperCase() + category.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Blog Grid */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         {loading ? (
//           <div className="text-center py-20">
//             <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-500 mt-4">Loading blogs...</p>
//           </div>
//         ) : filteredBlogs.length === 0 ? (
//           <div className="text-center py-20">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
//               <Tag className="w-10 h-10 text-gray-400" />
//             </div>
//             <p className="text-gray-500 text-lg">
//               {selectedCategory === "All"
//                 ? "No blogs posted yet."
//                 : `No blogs found in "${selectedCategory}" category.`}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredBlogs.map((blog: Blog) => (
//               <article
//                 key={blog.slug}
//                 className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
//               >
//                 {/* Image Container */}
//                 <Link href={`/blog/${blog.slug}`}>
//                   <div className="relative h-48 bg-linear-to-br from-blue-400 to-indigo-600 overflow-hidden">
//                     {blog.imageUrl ? (
//                       <Image
//                         src={blog.imageUrl}
//                         alt={`${blog.title} + Best Software Training in Kadapa Exameets Skillverse Academy`}
//                         fill
//                         className="object-cover transition-transform duration-500 group-hover:scale-110"
//                       />
//                     ) : (
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <Tag className="w-16 h-16 text-white opacity-40" />
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>
//                 </Link>

//                 {/* Content */}
//                 <div className="p-6">
//                   {/* Category Badge */}
//                   <div className="mb-3">
//                     <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-semibold uppercase tracking-wide">
//                       {blog.type}
//                     </span>
//                   </div>

//                   <Link href={`/blog/${blog.slug}`}>
//                     <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
//                       {blog.title}
//                     </h2>
//                   </Link>

//                   {blog.hook && (
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {blog.hook}
//                     </p>
//                   )}

//                   {/* Date */}
//                   <div className="flex items-center text-sm text-gray-500 mb-4">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     {new Date(blog.postedAt).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                       year: "numeric",
//                     })}
//                   </div>

//                   {/* Tags */}
//                   {blog.tags?.length > 0 && (
//                     <div className="flex gap-2 flex-wrap mb-4">
//                       {blog.tags.slice(0, 3).map((tag: string) => (
//                         <span
//                           key={tag}
//                           className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition-colors"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* Read More Link */}
//                   <Link
//                     href={`/blog/${blog.slug}`}
//                     className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors"
//                   >
//                     Read More
//                     <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
//                   </Link>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
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

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
          cache: "no-store",
        });
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.type === selectedCategory);

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
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
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
                <Link href={`/blog/${blog.slug}`}>
                  <div className="relative h-48 bg-linear-to-br from-blue-400 to-indigo-600 overflow-hidden">
                    {blog.imageUrl ? (
                      <Image
                        src={blog.imageUrl}
                        alt={`${blog.title} + Best Software Training in Kadapa Exameets Skillverse Academy`}
                        fill
                        loading={index < 3 ? "eager" : "lazy"} // Eager load first 3 images
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