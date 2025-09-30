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

export default function JavaFullStackPage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  // Course-specific data for AI modal - properly typed
  const courseData: CourseData = {
    name: "Java Full Stack",
    duration: "90 Days",
    fee: "₹22,000",
    level: "Intermediate to Advanced",
    description: "Master enterprise-level development with Java backend and modern frontend technologies. Build scalable web applications using Spring Boot, Microservices, React, and database design through 6 real-world projects.",
    curriculum: [
      "Level 0: Java Fundamentals (15 Days) - Core Java, OOPs, Collections, Exception Handling, Library Management System",
      "Level 1: Database & SQL (12 Days) - MySQL, JDBC, Database Design, Employee Management System", 
      "Level 2: Spring Framework (18 Days) - Spring Core, Spring Boot, REST APIs, E-commerce Backend API",
      "Level 3: Frontend Integration (15 Days) - React basics, API integration, Full-stack E-commerce App",
      "Level 4: Advanced Topics (18 Days) - Microservices, Security, Testing, Banking Application",
      "Level 5: Capstone Project (12 Days) - Complete enterprise application, deployment, presentation"
    ],
    highlights: [
      "6 enterprise-level projects",
      "Max 10 students for intensive mentoring", 
      "Industry-standard Spring Boot practices",
      "Full-stack certification upon completion",
      "Guaranteed placement assistance",
      "Live deployment on AWS/Heroku"
    ],
    prerequisites: "Basic programming knowledge required - suitable for CS graduates and experienced developers",
    careerOutcomes: "Java Developer, Full-stack Developer, Backend Engineer, Software Engineer",
    salaryRange: "₹6-15 LPA for Java Full-stack developers",
    tools: "IntelliJ IDEA, Spring Boot, React, MySQL, Git, Docker, AWS"
  };

  const quickQuestions: string[] = [
    "What will I learn in Java Full Stack?",
    "What projects will I build?", 
    "Is this good for experienced developers?",
    "What's the batch timing?",
    "Do I get placement guarantee?",
    "What tools and frameworks?",
    "Can I become a senior developer?"
  ];

  const curriculum = [
    {
      level: "Level 0",
      title: "Java Fundamentals",
      duration: "15 Days",
      icon: Code2,
      topics: ["Core Java & OOPs concepts", "Collections Framework", "Exception Handling", "Library Management System project"]
    },
    {
      level: "Level 1", 
      title: "Database & SQL",
      duration: "12 Days",
      icon: Database,
      topics: ["MySQL database design", "JDBC connectivity", "SQL queries & optimization", "Employee Management System"]
    },
    {
      level: "Level 2",
      title: "Spring Framework",
      duration: "18 Days", 
      icon: Server,
      topics: ["Spring Core & Boot", "REST API development", "JPA & Hibernate", "E-commerce Backend API"]
    },
    {
      level: "Level 3",
      title: "Frontend Integration",
      duration: "15 Days",
      icon: Layers,
      topics: ["React fundamentals", "API integration", "State management", "Full-stack E-commerce App"]
    },
    {
      level: "Level 4",
      title: "Advanced Topics",
      duration: "18 Days",
      icon: Server,
      topics: ["Microservices architecture", "Spring Security", "Unit Testing", "Banking Application"]
    },
    {
      level: "Level 5",
      title: "Capstone Project",
      duration: "12 Days",
      icon: Award,
      topics: ["Enterprise application", "AWS deployment", "Code review", "Final presentation"]
    }
  ];

  const highlights = [
    { icon: Award, title: "Enterprise Projects", desc: "6 industry-standard applications" },
    { icon: Users, title: "Elite Batches", desc: "Max 10 students for intensive mentoring" },
    { icon: Server, title: "Spring Boot Mastery", desc: "Industry-standard framework expertise" },
    { icon: CheckCircle, title: "Placement Guarantee", desc: "100% placement assistance guaranteed" }
  ];

  const faqs = [
    {
      q: "Do I need prior Java experience?",
      a: "Yes, basic programming knowledge is required. This course is designed for CS graduates or developers with some coding experience."
    },
    {
      q: "What kind of projects will I build?",
      a: "Library Management System, Employee Management, E-commerce Backend API, Full-stack E-commerce App, Banking Application, and a capstone enterprise project."
    },
    {
      q: "Is placement assistance guaranteed?",
      a: "Yes! We provide 100% placement assistance with resume building, mock interviews, and direct referrals to top companies."
    },
    {
      q: "What's the class schedule?",
      a: "1.5 hours daily classes + 2-3 hours hands-on coding. Weekend intensive batches also available for working professionals."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Java <span className="font-medium text-black">Full Stack</span>
          </h1>
          <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Master enterprise-level development with Java backend and modern frontend technologies
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
              <span className="font-medium text-black">Intermediate to Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Fee:</span>
              <span className="font-medium text-black">₹22,000</span>
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
            Why Choose Our <span className="font-medium">Java Full Stack</span> Course
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
            Comprehensive curriculum from Java fundamentals to enterprise application development
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
              "CS graduates wanting enterprise-level skills",
              "Developers looking to master Java ecosystem", 
              "Professionals aiming for senior developer roles"
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
            Ready to Master <span className="font-medium">Java Full Stack</span> Development?
          </h2>
          <p className="text-gray-300 font-light mb-8">
            Join elite developers who have built their careers with enterprise Java skills
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
          Enroll Now - ₹15,000
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
