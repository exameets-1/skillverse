'use client';

import { 
  Clock, 
  Target, 
  Users, 
  Award, 
  CheckCircle, 
  Code2, 
  Database, 
  Cpu, 
  BookOpen,
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

export default function PythonCoreOOPSPage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  // Course-specific data for AI modal - properly typed
  const courseData: CourseData = {
    name: "Python Core + OOPS",
    duration: "45 Days",
    fee: "₹6,000",
    level: "Beginner to Intermediate",
    description: "Master Python programming fundamentals and object-oriented design. Learn Python syntax, data structures, functions, and OOP concepts through hands-on projects including calculator, file manager, and mini games.",
    curriculum: [
      "Level 0: Python Basics (8 Days) - Syntax, variables, data types, input/output, calculator project",
      "Level 1: Control Structures (8 Days) - Loops, conditions, functions, number guessing game", 
      "Level 2: Data Structures (12 Days) - Lists, dictionaries, sets, tuples, contact manager project",
      "Level 3: Object-Oriented Programming (10 Days) - Classes, objects, inheritance, polymorphism, library management system",
      "Level 4: Final Project (7 Days) - File handling, error handling, complete Python application"
    ],
    highlights: [
      "4 hands-on Python projects",
      "Max 12 students for personalized guidance", 
      "Industry-standard coding practices",
      "Python certification upon completion",
      "Career counseling and job assistance",
      "Weekend and evening batches available"
    ],
    prerequisites: "No programming experience required - perfect for absolute beginners",
    careerOutcomes: "Python Developer, Backend Developer, Data Analyst, Automation Engineer",
    salaryRange: "₹4-10 LPA for Python developers",
    tools: "Python 3.x, PyCharm/VS Code, Git, GitHub"
  };

  const quickQuestions: string[] = [
    "What will I learn in Python?",
    "What projects will I build?", 
    "Is this good for beginners?",
    "What's the batch timing?",
    "Do I get job support?",
    "What software do I need?",
    "Can I become a data scientist?"
  ];

  const curriculum = [
    {
      level: "Level 0",
      title: "Python Basics",
      duration: "8 Days",
      icon: Code2,
      topics: ["Python installation & setup", "Variables & data types", "Input/output operations", "Simple calculator project"]
    },
    {
      level: "Level 1", 
      title: "Control Structures",
      duration: "8 Days",
      icon: Cpu,
      topics: ["If-else conditions", "Loops (for, while)", "Functions & modules", "Number guessing game"]
    },
    {
      level: "Level 2",
      title: "Data Structures",
      duration: "12 Days", 
      icon: Database,
      topics: ["Lists & list methods", "Dictionaries & sets", "Tuples & strings", "Contact manager project"]
    },
    {
      level: "Level 3",
      title: "Object-Oriented Programming",
      duration: "10 Days",
      icon: BookOpen,
      topics: ["Classes & objects", "Inheritance & polymorphism", "Encapsulation & abstraction", "Library management system"]
    },
    {
      level: "Level 4",
      title: "Final Project",
      duration: "7 Days",
      icon: Award,
      topics: ["File handling", "Error handling", "Code organization", "Complete Python application"]
    }
  ];

  const highlights = [
    { icon: Award, title: "Python Projects", desc: "4 hands-on Python applications" },
    { icon: Users, title: "Small Batches", desc: "Max 12 students for personal attention" },
    { icon: Code2, title: "Best Practices", desc: "Industry-standard coding practices" },
    { icon: CheckCircle, title: "Certificate", desc: "Python certification upon completion" }
  ];

  const faqs = [
    {
      q: "Do I need any programming background?",
      a: "No! This course is designed for complete beginners. We start from installing Python and cover everything step by step."
    },
    {
      q: "What kind of projects will I build?",
      a: "Calculator app, number guessing game, contact manager, library management system, and a final project of your choice."
    },
    {
      q: "Can I get a job after this course?",
      a: "Yes! We provide resume building, interview preparation, and job referrals to companies looking for Python developers."
    },
    {
      q: "What's the class schedule?",
      a: "1 hour daily classes + practice assignments. Weekend batches and evening batches also available."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Python Core + <span className="font-medium text-black">OOPS</span>
          </h1>
          <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Master the fundamentals of Python programming and object-oriented design
          </p>
          
          {/* Quick Info */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Duration:</span>
              <span className="font-medium text-black">45 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Level:</span>
              <span className="font-medium text-black">Beginner to Intermediate</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Fee:</span>
              <span className="font-medium text-black">₹6,000</span>
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
            Why Choose Our <span className="font-medium">Python Core + OOPS</span> Course
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
            Structured learning path from Python basics to advanced OOP concepts
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
            { [
              "Complete beginners wanting to learn programming",
              "Students interested in data science or AI",
              "Professionals looking to automate tasks"
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
            Ready to Start Your <span className="font-medium">Python</span> Journey?
          </h2>
          <p className="text-gray-300 font-light mb-8">
            Join thousands of students who started their programming career with Python
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
          Enroll Now - ₹6,000
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
