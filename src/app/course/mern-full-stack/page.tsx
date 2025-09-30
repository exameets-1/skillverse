'use client';

import { 
  Clock, 
  Target, 
  Users, 
  Award, 
  CheckCircle, 
  Code2, 
  Database, 
  Layers, 
  Server,
  Star,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react';
import { useState } from 'react';
import AIModal from '@/components/AiModal';

// Define the course data type to match AIModal expectations
interface CourseData {
  name: string;
  duration: string;
  fee: string;
  level: string;
  description: string;
  curriculum: string[];
  highlights: string[];
  prerequisites: string;
  careerOutcomes: string;
  salaryRange: string;
  tools: string;
}

export default function MernFullStackPage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  // Course-specific data for AI modal - properly typed
  const courseData: CourseData = {
    name: "MERN Full Stack",
    duration: "90 Days",
    fee: "₹15,000",
    level: "Beginner to Advanced",
    description: "Master modern web development with MongoDB, Express.js, React, and Node.js. Build scalable full-stack applications with real-time features through 6 industry-standard projects.",
    curriculum: [
      "Level 0: JavaScript Fundamentals (15 Days) - Modern JS, ES6+, Async/Await, DOM Manipulation, Interactive Web App",
      "Level 1: Node.js & Express (15 Days) - Server-side development, REST APIs, Middleware, Task Manager API", 
      "Level 2: MongoDB & Database Design (12 Days) - NoSQL concepts, Mongoose ODM, Database modeling, Blog Backend",
      "Level 3: React Development (18 Days) - Components, Hooks, State management, E-commerce Frontend",
      "Level 4: Full Stack Integration (18 Days) - MERN app development, Authentication, Real-time Chat App",
      "Level 5: Advanced & Deployment (12 Days) - Performance optimization, Testing, DevOps, Social Media Platform"
    ],
    highlights: [
      "6 full-stack projects with modern features",
      "Max 8 students for personalized attention", 
      "Industry-standard React & Node.js practices",
      "Full-stack MERN certification",
      "100% placement assistance guarantee",
      "Live deployment on Vercel/Netlify/Heroku"
    ],
    prerequisites: "Basic HTML/CSS knowledge helpful but not required - perfect for beginners and career switchers",
    careerOutcomes: "MERN Stack Developer, Full-stack Developer, React Developer, Node.js Developer, JavaScript Engineer",
    salaryRange: "₹5-12 LPA for MERN Full-stack developers",
    tools: "VS Code, React, Node.js, MongoDB, Express.js, Git, Postman, Vercel"
  };

  const quickQuestions: string[] = [
    "What will I learn in MERN Stack?",
    "What projects will I build?", 
    "Is this good for beginners?",
    "What's the batch timing?",
    "Do I get placement guarantee?",
    "What tools and frameworks?",
    "Can I become a full-stack developer?"
  ];

  const curriculum = [
    {
      level: "Level 0",
      title: "JavaScript Fundamentals",
      duration: "15 Days",
      icon: Code2,
      topics: ["Modern JavaScript & ES6+", "Async/Await & Promises", "DOM Manipulation", "Interactive Web Application project"]
    },
    {
      level: "Level 1", 
      title: "Node.js & Express",
      duration: "15 Days",
      icon: Server,
      topics: ["Node.js runtime environment", "Express.js framework", "REST API development", "Task Manager API project"]
    },
    {
      level: "Level 2",
      title: "MongoDB & Database",
      duration: "12 Days", 
      icon: Database,
      topics: ["NoSQL database concepts", "MongoDB operations", "Mongoose ODM", "Blog Backend API"]
    },
    {
      level: "Level 3",
      title: "React Development",
      duration: "18 Days",
      icon: Layers,
      topics: ["React components & JSX", "Hooks & State management", "React Router", "E-commerce Frontend App"]
    },
    {
      level: "Level 4",
      title: "Full Stack Integration",
      duration: "18 Days",
      icon: Server,
      topics: ["MERN stack architecture", "JWT Authentication", "Real-time features", "Chat Application"]
    },
    {
      level: "Level 5",
      title: "Advanced & Deployment",
      duration: "12 Days",
      icon: Award,
      topics: ["Performance optimization", "Testing strategies", "CI/CD pipeline", "Social Media Platform"]
    }
  ];

  const highlights = [
    { icon: Award, title: "Modern Projects", desc: "6 real-world full-stack applications" },
    { icon: Users, title: "Small Batches", desc: "Max 8 students for personalized guidance" },
    { icon: Layers, title: "Latest Tech Stack", desc: "Modern MERN with latest versions" },
    { icon: CheckCircle, title: "Career Support", desc: "100% placement assistance included" }
  ];

  const faqs = [
    {
      q: "Do I need prior programming experience?",
      a: "No! This course is designed for complete beginners. We start from JavaScript fundamentals and gradually build up to advanced full-stack development."
    },
    {
      q: "What kind of projects will I build?",
      a: "Interactive Web App, Task Manager API, Blog Backend, E-commerce Frontend, Real-time Chat App, and a comprehensive Social Media Platform."
    },
    {
      q: "Is placement assistance really guaranteed?",
      a: "Yes! We provide 100% placement assistance including portfolio building, interview preparation, and direct company referrals."
    },
    {
      q: "What's the class schedule like?",
      a: "2 hours daily classes + 2-3 hours hands-on coding practice. Weekend batches available for working professionals."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            MERN <span className="font-medium text-black">Full Stack</span>
          </h1>
          <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Master modern web development with MongoDB, Express.js, React, and Node.js
          </p>
          
          {/* Quick Info */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Duration:</span>
              <span className="font-medium text-black">90 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Level:</span>
              <span className="font-medium text-black">Beginner to Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Fee:</span>
              <span className="font-medium text-black">₹15,000</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-black text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-gray-900 transition-all duration-300 group">
            Enroll Now
            <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl text-black font-light text-center mb-12 tracking-tight">
            Why Choose Our <span className="font-medium">MERN Full Stack</span> Course
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-black mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-600 font-light">{highlight.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl text-black font-light text-center mb-4 tracking-tight">
            What You&apos;ll <span className="font-medium">Learn</span>
          </h2>
          <p className="text-gray-600 text-center mb-12 font-light">
            Comprehensive curriculum from JavaScript basics to full-stack MERN development
          </p>

          <div className="space-y-4">
            {curriculum.map((module, index) => {
              const IconComponent = module.icon;
              const isActive = activeModule === index;
              
              return (
                <div 
                  key={index}
                  className="border border-gray-200 transition-all duration-300 hover:border-gray-300"
                >
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveModule(isActive ? null : index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-light mb-1">{module.level}</div>
                        <h3 className="font-medium text-black">{module.title}</h3>
                        <div className="text-sm text-gray-600 font-light">{module.duration}</div>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {isActive && (
                    <div className="px-6 pb-6">
                      <div className="pl-16">
                        <div className="grid gap-2">
                          {module.topics.map((topic, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-700">
                              <div className="w-1.5 h-1.5 bg-black rounded-full mr-3"></div>
                              <span className="font-light">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl text-black font-light mb-12 tracking-tight">
            Perfect For <span className="font-medium">You</span> If
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Complete beginners wanting to become developers",
              "Career switchers looking for modern tech skills",
              "Students aiming for full-stack development roles"
            ].map((text, index) => (
              <div key={index} className="p-6 bg-white border border-gray-100">
                <CheckCircle className="w-8 h-8 text-black mx-auto mb-4" />
                <p className="text-gray-700 font-light">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16" id="faqs">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl text-black font-light text-center mb-12 tracking-tight">
            Frequently Asked <span className="font-medium">Questions</span>
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-6">
                <h3 className="font-medium text-black mb-3">{faq.q}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-light mb-4 tracking-tight">
            Ready to Master <span className="font-medium">MERN Full Stack</span> Development?
          </h2>
          <p className="text-gray-300 font-light mb-8">
            Join thousands who have launched their tech careers with modern web development skills
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wide hover:bg-gray-100 transition-all duration-300">
              Book Free Demo
            </button>
            <div className="flex items-center gap-6 text-sm">
              <a href="tel:+91" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a href="mailto:" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 lg:hidden z-50">
        <button className="w-full py-3 text-sm font-medium tracking-wide">
          Enroll Now - ₹18,000
        </button>
      </div>

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-16 lg:hidden"></div>

      {/* AI Modal with course-specific data */}
      <AIModal 
        courseData={courseData}
        quickQuestions={quickQuestions}
      />
    </div>
  );
}