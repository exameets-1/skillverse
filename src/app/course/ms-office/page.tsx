'use client';

import { 
  Clock, 
  Target, 
  Users, 
  Award, 
  CheckCircle, 
  FileText, 
  BarChart3, 
  Presentation, 
  Calculator,
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

export default function MsOfficePage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  // Course-specific data for AI modal - properly typed
  const courseData: CourseData = {
    name: "MS Office Mastery",
    duration: "45 Days",
    fee: "₹8,000",
    level: "Beginner to Advanced",
    description: "Master Microsoft Office Suite including Word, Excel, PowerPoint, and Outlook. Learn professional document creation, advanced data analysis, compelling presentations, and office productivity through hands-on projects.",
    curriculum: [
      "Level 0: MS Word Fundamentals (10 Days) - Document creation, formatting, templates, mail merge, Professional Resume & Report",
      "Level 1: Excel Essentials (12 Days) - Formulas, functions, charts, pivot tables, Budget Tracker & Sales Dashboard", 
      "Level 2: PowerPoint Mastery (8 Days) - Design principles, animations, templates, Business Presentation & Pitch Deck",
      "Level 3: Advanced Excel (10 Days) - Advanced functions, macros, data analysis, Financial Model & Inventory System",
      "Level 4: Integration & Automation (5 Days) - Cross-application workflows, productivity tips, Complete Office Suite Project"
    ],
    highlights: [
      "5 practical office projects",
      "Max 12 students for hands-on practice", 
      "Industry-standard templates and workflows",
      "Microsoft Office certification preparation",
      "Career enhancement guaranteed",
      "Real-world business scenarios"
    ],
    prerequisites: "Basic computer knowledge required - perfect for office workers, students, and professionals",
    careerOutcomes: "Administrative Assistant, Data Analyst, Office Manager, Executive Assistant, Business Analyst",
    salaryRange: "₹3-8 LPA for MS Office skilled professionals",
    tools: "MS Word, Excel, PowerPoint, Outlook, OneDrive, SharePoint"
  };

  const quickQuestions: string[] = [
    "What MS Office applications will I learn?",
    "What projects will I create?", 
    "Is this good for office workers?",
    "What's the batch timing?",
    "Do I get certification?",
    "What templates are included?",
    "Can I become more productive at work?"
  ];

  const curriculum = [
    {
      level: "Level 0",
      title: "MS Word Fundamentals",
      duration: "10 Days",
      icon: FileText,
      topics: ["Professional document creation", "Advanced formatting & styles", "Mail merge & templates", "Resume & Report projects"]
    },
    {
      level: "Level 1", 
      title: "Excel Essentials",
      duration: "12 Days",
      icon: BarChart3,
      topics: ["Formulas & functions mastery", "Charts & data visualization", "Pivot tables & analysis", "Budget Tracker project"]
    },
    {
      level: "Level 2",
      title: "PowerPoint Mastery",
      duration: "8 Days", 
      icon: Presentation,
      topics: ["Professional slide design", "Animations & transitions", "Template creation", "Business Presentation project"]
    },
    {
      level: "Level 3",
      title: "Advanced Excel",
      duration: "10 Days",
      icon: Calculator,
      topics: ["Advanced functions & formulas", "Macros & automation", "Data analysis tools", "Financial Model project"]
    },
    {
      level: "Level 4",
      title: "Integration & Automation",
      duration: "5 Days",
      icon: Award,
      topics: ["Cross-application workflows", "Productivity optimization", "Best practices", "Complete Office Suite project"]
    }
  ];

  const highlights = [
    { icon: Award, title: "Practical Projects", desc: "5 real-world office applications" },
    { icon: Users, title: "Small Classes", desc: "Max 12 students for individual attention" },
    { icon: FileText, title: "Professional Templates", desc: "Industry-standard document templates" },
    { icon: CheckCircle, title: "Career Enhancement", desc: "Boost your workplace productivity" }
  ];

  const faqs = [
    {
      q: "Do I need any prior MS Office experience?",
      a: "No prior experience required! We start from basics and gradually progress to advanced features. Perfect for beginners and those wanting to enhance their skills."
    },
    {
      q: "What kind of projects will I create?",
      a: "Professional Resume, Business Report, Budget Tracker, Sales Dashboard, Business Presentation, Pitch Deck, Financial Model, and Inventory Management System."
    },
    {
      q: "Will this help me get a better job?",
      a: "Absolutely! MS Office skills are essential in most office jobs. Our certification and practical projects will significantly boost your employability."
    },
    {
      q: "What's the class schedule like?",
      a: "1.5 hours daily classes focused on hands-on practice. Evening and weekend batches available for working professionals."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            MS Office <span className="font-medium text-black">Mastery</span>
          </h1>
          <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Master Microsoft Office Suite for professional productivity and career advancement
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
              <span className="font-medium text-black">Beginner to Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Fee:</span>
              <span className="font-medium text-black">₹8,000</span>
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
            Why Choose Our <span className="font-medium">MS Office Mastery</span> Course
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
            Comprehensive curriculum covering all essential MS Office applications and advanced features
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
              "Office workers wanting to boost productivity",
              "Students preparing for professional careers",
              "Business owners needing document management skills"
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
            Ready to Master <span className="font-medium">MS Office</span> Applications?
          </h2>
          <p className="text-gray-300 font-light mb-8">
            Join professionals who have enhanced their career prospects with advanced Office skills
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
          Enroll Now - ₹8,000
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
