'use client';

import { 
  Clock, 
  Target, 
  Users, 
  Award, 
  CheckCircle, 
  Code2, 
  Palette, 
  Layers, 
  Globe,
  Star,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react';
import { useState } from 'react';
import AIModal from '@/components/AiModal';
import EnrollButton from '@/components/EnrollButton';

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

export default function WebDevelopmentPage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  // Course-specific data for AI modal - properly typed
  const courseData: CourseData = {
    name: "Web Development Fundamentals",
    duration: "75 Days",
    fee: "₹14,000",
    level: "Beginner to Intermediate",
    description: "Master web development fundamentals with HTML, CSS, JavaScript, and responsive design. Build modern, interactive websites and web applications through 6 hands-on projects.",
    curriculum: [
      "Level 0: HTML Fundamentals (12 Days) - Structure, Elements, Forms, Semantic HTML, Personal Portfolio Website",
      "Level 1: CSS Mastery (15 Days) - Styling, Layouts, Flexbox, Grid, Responsive Business Website", 
      "Level 2: JavaScript Essentials (18 Days) - Programming basics, DOM manipulation, Events, Interactive Web Apps",
      "Level 3: Advanced CSS & Frameworks (15 Days) - Animations, Bootstrap, Sass, Modern Landing Pages",
      "Level 4: JavaScript Projects (12 Days) - API integration, Local storage, Dynamic Web Applications",
      "Level 5: Final Project & Deployment (3 Days) - Complete website, Domain & hosting, Portfolio showcase"
    ],
    highlights: [
      "6 complete website projects",
      "Max 15 students for hands-on learning", 
      "Industry-standard web development practices",
      "Responsive design certification",
      "100% placement assistance",
      "Live website deployment"
    ],
    prerequisites: "Basic computer knowledge required - perfect for beginners wanting to become web developers",
    careerOutcomes: "Frontend Developer, Web Designer, UI Developer, Junior Web Developer, Freelance Web Developer",
    salaryRange: "₹3-8 LPA for Web Developers",
    tools: "VS Code, HTML, CSS, JavaScript, Bootstrap, Git, Netlify, GitHub"
  };

  const quickQuestions: string[] = [
    "What will I learn in web development?",
    "What websites will I build?", 
    "Is this good for complete beginners?",
    "What's the batch timing?",
    "Do I get portfolio websites?",
    "What tools and frameworks?",
    "Can I become a freelancer?"
  ];

  const curriculum = [
    {
      level: "Level 0",
      title: "HTML Fundamentals",
      duration: "12 Days",
      icon: Code2,
      topics: ["HTML structure & elements", "Forms & input validation", "Semantic HTML5", "Personal Portfolio Website"]
    },
    {
      level: "Level 1", 
      title: "CSS Mastery",
      duration: "15 Days",
      icon: Palette,
      topics: ["CSS styling & selectors", "Flexbox & Grid layouts", "Responsive design", "Business Website project"]
    },
    {
      level: "Level 2",
      title: "JavaScript Essentials",
      duration: "18 Days", 
      icon: Code2,
      topics: ["JavaScript fundamentals", "DOM manipulation", "Event handling", "Interactive Web Applications"]
    },
    {
      level: "Level 3",
      title: "Advanced CSS & Frameworks",
      duration: "15 Days",
      icon: Layers,
      topics: ["CSS animations & transitions", "Bootstrap framework", "Sass preprocessing", "Modern Landing Pages"]
    },
    {
      level: "Level 4",
      title: "JavaScript Projects",
      duration: "12 Days",
      icon: Globe,
      topics: ["API integration", "Local storage", "Advanced DOM", "Dynamic Web Applications"]
    },
    {
      level: "Level 5",
      title: "Final Project & Deployment",
      duration: "3 Days",
      icon: Award,
      topics: ["Complete website development", "Domain & hosting setup", "Portfolio showcase", "Deployment strategies"]
    }
  ];

  const highlights = [
    { icon: Award, title: "Complete Websites", desc: "6 fully functional website projects" },
    { icon: Users, title: "Hands-on Learning", desc: "Max 15 students for practical sessions" },
    { icon: Globe, title: "Live Deployment", desc: "Deploy websites with custom domains" },
    { icon: CheckCircle, title: "Portfolio Ready", desc: "Professional portfolio for job applications" }
  ];

  const faqs = [
    {
      q: "Do I need any prior coding experience?",
      a: "No! This course is designed for complete beginners. We start from HTML basics and gradually build up to advanced web development concepts."
    },
    {
      q: "What kind of websites will I build?",
      a: "Personal Portfolio, Business Website, Interactive Web Apps, Landing Pages, Dynamic Applications, and a comprehensive final project."
    },
    {
      q: "Will I be able to freelance after this course?",
      a: "Absolutely! You'll have a strong portfolio of websites and the skills needed to start freelancing or apply for web developer positions."
    },
    {
      q: "What's the class schedule like?",
      a: "2 hours daily classes with hands-on coding practice. Weekend batches available for working professionals and students."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Web Development <span className="font-medium text-black">Fundamentals</span>
          </h1>
          <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Master web development fundamentals and build modern, responsive websites
          </p>
          
          {/* Quick Info */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Duration:</span>
              <span className="font-medium text-black">75 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Level:</span>
              <span className="font-medium text-black">Beginner to Intermediate</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Fee:</span>
              <span className="font-medium text-black">₹14,000</span>
            </div>
          </div>

          {/* CTA Button */}
          <EnrollButton 
            amount={14000}
            courseName="Web Development Fundamentals"
          />
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl text-black font-light text-center mb-12 tracking-tight">
            Why Choose Our <span className="font-medium">Web Development</span> Course
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
            Comprehensive curriculum from HTML basics to advanced web development
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
              "Complete beginners wanting to learn web development",
              "Students looking to build portfolio websites", 
              "Professionals wanting to start freelancing"
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
            Ready to Master <span className="font-medium">Web Development</span>?
          </h2>
          <p className="text-gray-300 font-light mb-8">
            Join aspiring developers who have built amazing websites and launched their web dev careers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <EnrollButton 
              amount={14000}
              courseName="Web Development Fundamentals"
              className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wide hover:bg-gray-100 transition-all duration-300"
            >
              Book Free Demo
            </EnrollButton>
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
        <EnrollButton 
          amount={14000}
          courseName="Web Development Fundamentals"
          className="w-full py-3 text-sm font-medium tracking-wide"
        >
          Enroll Now - ₹14,000
        </EnrollButton>
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