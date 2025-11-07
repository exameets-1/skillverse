'use client';
import Link from 'next/link';

import { Code2, Database, Globe, FileSpreadsheet, TrendingUp } from 'lucide-react';

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Java Full Stack",
      slug : "java-full-stack",
      icon: Code2,
      description: "Master enterprise-level development with Java backend and modern frontend technologies.",
      duration: "90 Days",
      level: "Intermediate to Advanced",
      highlights: ["Spring Boot", "Microservices", "React Integration", "Database Design"]
    },
    {
      id: 2,
      title: "MERN Full Stack",
      slug : "mern-full-stack",
      icon: Database,
      description: "Build modern web applications using MongoDB, Express.js, React, and Node.js.",
      duration: "60 Days",
      level: "Beginner to Advanced",
      highlights: ["React.js", "Node.js", "MongoDB", "RESTful APIs"]
    },
    {
      id: 3,
      title: "Web Development",
      slug : "web-development",
      icon: Globe,
      description: "Create responsive, interactive websites with HTML, CSS, JavaScript, and modern frameworks.",
      duration: "45 days",
      level: "Beginner to Intermediate",
      highlights: ["HTML5 & CSS3", "JavaScript ES6+", "Responsive Design", "Version Control"]
    },
    {
      id: 4,
      title: "MS Office",
      slug : "ms-office",
      icon: FileSpreadsheet,
      description: "Master essential productivity tools for professional workplace efficiency.",
      duration: "45 Days",
      level: "Beginner to Advanced",
      highlights: ["Excel Advanced", "PowerPoint Design", "Word Processing", "Data Analysis"]
    },
    {
      id: 5,
      title: "Digital Marketing",
      slug : "digital-marketing",
      icon: TrendingUp,
      description: "Learn comprehensive digital marketing strategies to grow businesses online.",
      duration: "45 Days",
      level: "Beginner to Intermediate",
      highlights: ["SEO & SEM", "Social Media Marketing", "Analytics", "Content Strategy"]
    },
    {
      id: 6,
      title: "JAVA CORE + OOPS",
      slug : "java-core-oops",
      icon: TrendingUp,
      description: "Master the fundamentals of Java programming and object-oriented design.",
      duration: "45 Days",
      level: "Beginner to Intermediate",
      highlights: ["Java Basics", "OOP Principles", "Collections Framework"]
    },
    {
      id: 7,
      title: "Python CORE + OOPS",
      slug : "python-core-oops",
      icon: TrendingUp,
      description: "Master the fundamentals of Python programming and object-oriented design.",
      duration: "45 Days",
      level: "Beginner to Intermediate",
      highlights: ["Python Basics", "OOP Principles"]
    },
    {
      id: 8,
      title : "Career Guidance",
      slug : "career-guidance",
      icon : TrendingUp,
      description : "Get advice and strategies to navigate your career path successfully.",
      duration : "7 Days",
      level : "All Levels",
      highlights : ["Resume Building", "Interview Preparation", "Job Search Strategies"]
    }
  ]

  return (
    <>
      {/* Desktop Version */}
      <section id="courses" className="hidden lg:block py-20 lg:py-32 bg-white" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Courses{' '}
              <span className="font-medium text-black">
                Offered
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-light max-w-3xl mx-auto py-2">
              Choose from our comprehensive range of industry-focused programs designed to transform 
              your career and equip you with cutting-edge skills.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
              Our courses range from Rs. 500 to Rs. 25000, providing affordable options for quality education.
            </p>

          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const IconComponent = course.icon;
              return (
                <Link 
                  key={course.id}
                  title={`Explore ${course.title} at Exameets Skillverse Academy - Kadapa`}
                  href={`/course/${course.slug}`}
                  className="group border border-gray-100 p-8 transition-all duration-300 hover:border-gray-200 hover:shadow-lg cursor-pointer block"
                >
                  {/* Icon and Title */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-medium text-black tracking-tight mb-0">{course.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Course Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-light">Duration</span>
                      <span className="text-black font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-light">Level</span>
                      <span className="text-black font-medium">{course.level}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="pt-6 border-t border-gray-50">
                    <div className="space-y-2">
                      {course.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mr-3 shrink-0"></div>
                          <span className="font-light">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section id="courses" className="block lg:hidden py-16 bg-white" style={{ scrollMarginTop: '80px' }}>
        <div className="px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 tracking-tight">
              Courses{' '}
              <span className="font-medium text-black">
                Offered
              </span>
            </h1>
            <p className="text-base text-gray-600 leading-relaxed font-light mb-2">
              Choose from our comprehensive range of industry-focused programs designed to transform 
              your career and equip you with cutting-edge skills.
            </p>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Our courses range from Rs. 500 to Rs. 25000, providing affordable options for quality education.
            </p>
          </div>

          {/* Courses List */}
          <div className="space-y-6">
            {courses.map((course) => {
              const IconComponent = course.icon;
              return (
                <Link 
                  key={course.id}
                  title={`Explore ${course.title} at Exameets Skillverse Academy - Kadapa`}
                  href={`/course/${course.slug}`}
                  className="border border-gray-100 p-6 block hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4 shrink-0">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-black tracking-tight mb-0">{course.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 font-light text-sm leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* Details */}
                  <div className="flex items-center justify-between mb-4 text-xs">
                    <div>
                      <span className="text-gray-500 font-light">Duration: </span>
                      <span className="text-black font-medium">{course.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-light">Level: </span>
                      <span className="text-black font-medium">{course.level}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="border-t border-gray-50 pt-4">
                    <div className="grid grid-cols-2 gap-2">
                      {course.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-700">
                          <div className="w-1 h-1 bg-black rounded-full mr-2 shrink-0"></div>
                          <span className="font-light">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}