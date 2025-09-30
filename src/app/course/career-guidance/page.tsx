'use client';

import { 
  Clock, 
  Target, 
  Users, 
  Award, 
  CheckCircle, 
  Compass, 
  TrendingUp, 
  Users2, 
  BrainCircuit,
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

export default function CareerGuidancePage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  // Course-specific data for AI modal - properly typed
  const courseData: CourseData = {
    name: "Career Guidance & Counseling",
    duration: "7 Days",
    fee: "₹500",
    level: "All Levels",
    description: "Get personalized career guidance and counseling to make informed decisions about your professional future. Discover your strengths, explore career options, and create a strategic roadmap for success through expert mentorship and practical assessments.",
    curriculum: [
      "Day 1: Self-Assessment & Strengths Discovery - Personality tests, Skills assessment, Interest mapping, Personal SWOT analysis",
      "Day 2: Career Exploration & Market Trends - Industry overview, Emerging careers, Job market analysis, Salary benchmarking", 
      "Day 3: Skill Gap Analysis & Development Plan - Current vs required skills, Learning pathways, Certification recommendations, Timeline planning",
      "Day 4: Resume Building & Personal Branding - Professional resume creation, LinkedIn optimization, Portfolio development, Personal brand strategy",
      "Day 5: Interview Preparation & Networking - Mock interviews, Communication skills, Networking strategies, Professional etiquette",
      "Day 6: Career Planning & Goal Setting - Short & long-term goals, Career roadmap, Action plan creation, Success metrics",
      "Day 7: Mentorship & Follow-up Strategy - One-on-one mentoring, Resource sharing, Continuous support plan, Success tracking"
    ],
    highlights: [
      "Personalized career assessment and analysis",
      "One-on-one mentoring sessions", 
      "Industry expert guidance and insights",
      "Customized career roadmap creation",
      "Resume and LinkedIn profile optimization",
      "Interview preparation and mock sessions"
    ],
    prerequisites: "No prerequisites - suitable for students, professionals, and career changers at any stage",
    careerOutcomes: "Clear career direction, Enhanced job prospects, Better salary negotiation skills, Professional network building",
    salaryRange: "Career guidance leads to 20-50% salary improvement on average",
    tools: "Career assessment tools, LinkedIn, Resume builders, Interview platforms"
  };

  const quickQuestions: string[] = [
    "What will I learn in career guidance?",
    "How will this help my career?", 
    "Is this good for career changers?",
    "What's included in the mentoring?",
    "Do I get personalized advice?",
    "What assessments are included?",
    "Can this help me get a better job?"
  ];

  const curriculum = [
    {
      level: "Day 1",
      title: "Self-Assessment & Strengths Discovery",
      duration: "1 Day",
      icon: BrainCircuit,
      topics: ["Personality and aptitude tests", "Skills and competency assessment", "Interest and values mapping", "Personal SWOT analysis"]
    },
    {
      level: "Day 2", 
      title: "Career Exploration & Market Trends",
      duration: "1 Day",
      icon: Compass,
      topics: ["Industry landscape overview", "Emerging career opportunities", "Job market trends analysis", "Salary benchmarking research"]
    },
    {
      level: "Day 3",
      title: "Skill Gap Analysis & Development",
      duration: "1 Day", 
      icon: TrendingUp,
      topics: ["Current vs required skills mapping", "Learning pathway recommendations", "Certification and course suggestions", "Development timeline planning"]
    },
    {
      level: "Day 4",
      title: "Resume Building & Personal Branding",
      duration: "1 Day",
      icon: Users,
      topics: ["Professional resume creation", "LinkedIn profile optimization", "Portfolio development guidance", "Personal brand strategy"]
    },
    {
      level: "Day 5",
      title: "Interview Preparation & Networking",
      duration: "1 Day",
      icon: Users2,
      topics: ["Mock interview sessions", "Communication skills enhancement", "Networking strategies", "Professional etiquette training"]
    },
    {
      level: "Day 6",
      title: "Career Planning & Goal Setting",
      duration: "1 Day",
      icon: Target,
      topics: ["Short and long-term goal setting", "Career roadmap creation", "Action plan development", "Success metrics definition"]
    },
    {
      level: "Day 7",
      title: "Mentorship & Follow-up Strategy",
      duration: "1 Day",
      icon: Award,
      topics: ["One-on-one mentoring session", "Resource and tool sharing", "Continuous support planning", "Progress tracking setup"]
    }
  ];

  const highlights = [
    { icon: Award, title: "Personalized Assessment", desc: "Comprehensive career and personality analysis" },
    { icon: Users, title: "Expert Mentoring", desc: "One-on-one guidance from industry experts" },
    { icon: Compass, title: "Career Roadmap", desc: "Customized career path and action plan" },
    { icon: CheckCircle, title: "Complete Package", desc: "Resume, LinkedIn, and interview preparation" }
  ];

  const faqs = [
    {
      q: "Who can benefit from career guidance?",
      a: "Anyone at any career stage - students choosing careers, professionals seeking growth, or individuals considering career changes can benefit from personalized guidance."
    },
    {
      q: "What kind of assessment is included?",
      a: "Comprehensive personality tests, skills assessment, interest mapping, aptitude evaluation, and personal SWOT analysis to understand your career preferences and strengths."
    },
    {
      q: "Do I get ongoing support after the program?",
      a: "Yes! You get a continuous support plan, resource access, and follow-up sessions to track your progress and address any career-related questions."
    },
    {
      q: "How is this different from free career advice?",
      a: "Our program offers personalized assessments, expert one-on-one mentoring, customized roadmaps, and comprehensive support that generic advice cannot provide."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Career Guidance & <span className="font-medium text-black">Counseling</span>
          </h1>
          <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Get personalized career guidance and create a strategic roadmap for professional success
          </p>
          
          {/* Quick Info */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Duration:</span>
              <span className="font-medium text-black">7 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Level:</span>
              <span className="font-medium text-black">All Levels</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Fee:</span>
              <span className="font-medium text-black">₹500</span>
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
            Why Choose Our <span className="font-medium">Career Guidance</span> Program
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
            What You&apos;ll <span className="font-medium">Experience</span>
          </h2>
          <p className="text-gray-600 text-center mb-12 font-light">
            Comprehensive 7-day program covering all aspects of career planning and development
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
              "Students unsure about career choices and future paths",
              "Professionals seeking career growth and advancement",
              "Career changers looking for new opportunities and direction"
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
            Ready to Transform Your <span className="font-medium">Career Journey</span>?
          </h2>
          <p className="text-gray-300 font-light mb-8">
            Join professionals who have found clarity and direction in their careers with expert guidance
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
          Enroll Now - ₹500
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
