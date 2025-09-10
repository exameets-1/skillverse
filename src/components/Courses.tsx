'use client';

import { Code2, Database, Globe, FileSpreadsheet, TrendingUp } from 'lucide-react';

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Java Full Stack",
      icon: Code2,
      description: "Master enterprise-level development with Java backend and modern frontend technologies.",
      duration: "6 months",
      level: "Intermediate to Advanced",
      highlights: ["Spring Boot", "Microservices", "React Integration", "Database Design"]
    },
    {
      id: 2,
      title: "MERN Full Stack",
      icon: Database,
      description: "Build modern web applications using MongoDB, Express.js, React, and Node.js.",
      duration: "5 months",
      level: "Beginner to Advanced",
      highlights: ["React.js", "Node.js", "MongoDB", "RESTful APIs"]
    },
    {
      id: 3,
      title: "Web Development",
      icon: Globe,
      description: "Create responsive, interactive websites with HTML, CSS, JavaScript, and modern frameworks.",
      duration: "4 months",
      level: "Beginner to Intermediate",
      highlights: ["HTML5 & CSS3", "JavaScript ES6+", "Responsive Design", "Version Control"]
    },
    {
      id: 4,
      title: "MS Office",
      icon: FileSpreadsheet,
      description: "Master essential productivity tools for professional workplace efficiency.",
      duration: "2 months",
      level: "Beginner to Advanced",
      highlights: ["Excel Advanced", "PowerPoint Design", "Word Processing", "Data Analysis"]
    },
    {
      id: 5,
      title: "Digital Marketing",
      icon: TrendingUp,
      description: "Learn comprehensive digital marketing strategies to grow businesses online.",
      duration: "3 months",
      level: "Beginner to Intermediate",
      highlights: ["SEO & SEM", "Social Media Marketing", "Analytics", "Content Strategy"]
    }
  ];

  return (
    <>
      {/* Desktop Version */}
      <section id="courses" className="hidden lg:block py-20 lg:py-32 bg-white" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Courses{' '}
              <span className="font-medium text-black">
                Offered
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
              Choose from our comprehensive range of industry-focused programs designed to transform 
              your career and equip you with cutting-edge skills.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <div 
                  key={course.id}
                  className={`group border border-gray-100 p-8 transition-all duration-300 hover:border-gray-200 hover:shadow-sm animate-fade-in-up ${
                    index === 0 ? 'delay-300' : 
                    index === 1 ? 'delay-500' : 
                    index === 2 ? 'delay-700' : 
                    index === 3 ? 'delay-900' : 'delay-1100'
                  }`}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-medium text-black mb-3 tracking-tight">{course.title}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                      {course.description}
                    </p>
                  </div>

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
                          <div className="w-1.5 h-1.5 bg-black rounded-full mr-3 flex-shrink-0"></div>
                          <span className="font-light">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <button className="w-full border border-black text-black hover:bg-black hover:text-white py-3 text-sm font-medium transition-all duration-300 tracking-wide">
                      Learn More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section id="courses" className="block lg:hidden py-16 bg-white" style={{ scrollMarginTop: '80px' }}>
        <div className="px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 tracking-tight">
              Courses{' '}
              <span className="font-medium text-black">
                Offered
              </span>
            </h1>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Choose from our comprehensive range of industry-focused programs designed to transform 
              your career and equip you with cutting-edge skills.
            </p>
          </div>

          {/* Courses List */}
          <div className="space-y-6">
            {courses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <div 
                  key={course.id}
                  className={`border border-gray-100 p-6 animate-fade-in-up ${
                    index === 0 ? 'delay-300' : 
                    index === 1 ? 'delay-500' : 
                    index === 2 ? 'delay-700' : 
                    index === 3 ? 'delay-900' : 'delay-1100'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-black tracking-tight">{course.title}</h3>
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
                  <div className="border-t border-gray-50 pt-4 mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {course.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-700">
                          <div className="w-1 h-1 bg-black rounded-full mr-2 flex-shrink-0"></div>
                          <span className="font-light">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full border border-black text-black hover:bg-black hover:text-white py-2.5 text-sm font-medium transition-all duration-300 tracking-wide">
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-300 { animation-delay: 0.2s; }
        .delay-500 { animation-delay: 0.4s; }
        .delay-700 { animation-delay: 0.6s; }
        .delay-900 { animation-delay: 0.8s; }
        .delay-1100 { animation-delay: 1s; }
      `}</style>

      {/* Global CSS for Smooth Scrolling */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}