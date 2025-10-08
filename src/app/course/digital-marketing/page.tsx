'use client';

import { 
  Clock, 
  Target, 
  Users, 
  Award, 
  CheckCircle, 
  Search, 
  TrendingUp, 
  MessageSquare, 
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

export default function DigitalMarketingPage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  // Course-specific data for AI modal - properly typed
  const courseData: CourseData = {
    name: "Digital Marketing Mastery",
    duration: "60 Days",
    fee: "₹25,000",
    level: "Beginner to Advanced",
    description: "Master comprehensive digital marketing strategies including SEO, SEM, Social Media Marketing, Content Marketing, Email Marketing, and Analytics. Build real campaigns and grow businesses through 6 hands-on marketing projects.",
    curriculum: [
      "Level 0: Digital Marketing Fundamentals (10 Days) - Marketing basics, Digital landscape, Customer journey, Brand Strategy Project",
      "Level 1: SEO & Content Marketing (12 Days) - Keyword research, On-page SEO, Content strategy, Blog & SEO Optimization Project", 
      "Level 2: Social Media Marketing (12 Days) - Platform strategies, Content creation, Community management, Social Media Campaign",
      "Level 3: Paid Advertising (12 Days) - Google Ads, Facebook Ads, Campaign optimization, PPC Campaign Management",
      "Level 4: Email & Analytics (10 Days) - Email marketing, Google Analytics, Conversion tracking, Email Marketing Campaign",
      "Level 5: Advanced Strategies (4 Days) - Marketing automation, Growth hacking, Complete Digital Marketing Strategy"
    ],
    highlights: [
      "6 real marketing campaigns with live results",
      "Max 15 students for practical workshops", 
      "Industry-standard marketing tools and platforms",
      "Google Analytics & Ads certification prep",
      "100% job placement assistance",
      "Live campaign management experience"
    ],
    prerequisites: "Basic internet knowledge required - perfect for entrepreneurs, marketing professionals, and career switchers",
    careerOutcomes: "Digital Marketing Manager, SEO Specialist, Social Media Manager, PPC Specialist, Content Marketing Manager",
    salaryRange: "₹4-10 LPA for Digital Marketing professionals",
    tools: "Google Analytics, Google Ads, Facebook Ads Manager, SEMrush, Mailchimp, Canva, WordPress"
  };

  const quickQuestions: string[] = [
    "What digital marketing channels will I learn?",
    "What campaigns will I create?", 
    "Is this good for business owners?",
    "What's the batch timing?",
    "Do I get Google certifications?",
    "What tools and platforms?",
    "Can I start my own marketing agency?"
  ];

  const curriculum = [
    {
      level: "Level 0",
      title: "Digital Marketing Fundamentals",
      duration: "10 Days",
      icon: Globe,
      topics: ["Digital marketing landscape", "Customer personas & journey", "Marketing funnel concepts", "Brand Strategy Project"]
    },
    {
      level: "Level 1", 
      title: "SEO & Content Marketing",
      duration: "12 Days",
      icon: Search,
      topics: ["Keyword research & analysis", "On-page & technical SEO", "Content strategy & creation", "Blog Optimization Project"]
    },
    {
      level: "Level 2",
      title: "Social Media Marketing",
      duration: "12 Days", 
      icon: MessageSquare,
      topics: ["Platform-specific strategies", "Content calendar planning", "Community management", "Social Media Campaign"]
    },
    {
      level: "Level 3",
      title: "Paid Advertising",
      duration: "12 Days",
      icon: TrendingUp,
      topics: ["Google Ads management", "Facebook & Instagram Ads", "Campaign optimization", "PPC Campaign Project"]
    },
    {
      level: "Level 4",
      title: "Email & Analytics",
      duration: "10 Days",
      icon: Target,
      topics: ["Email marketing automation", "Google Analytics setup", "Conversion tracking", "Email Campaign Project"]
    },
    {
      level: "Level 5",
      title: "Advanced Strategies",
      duration: "4 Days",
      icon: Award,
      topics: ["Marketing automation", "Growth hacking techniques", "ROI optimization", "Complete Marketing Strategy"]
    }
  ];

  const highlights = [
    { icon: Award, title: "Live Campaigns", desc: "6 real marketing projects with measurable results" },
    { icon: Users, title: "Workshop Style", desc: "Max 15 students for hands-on practice" },
    { icon: TrendingUp, title: "Industry Tools", desc: "Master professional marketing platforms" },
    { icon: CheckCircle, title: "Certification Ready", desc: "Google Analytics & Ads certification prep" }
  ];

  const faqs = [
    {
      q: "Do I need prior marketing experience?",
      a: "No prior experience required! We start from digital marketing basics and build up to advanced campaign management strategies."
    },
    {
      q: "What kind of campaigns will I create?",
      a: "Brand Strategy, Blog SEO Optimization, Social Media Campaign, PPC Campaign Management, Email Marketing Campaign, and a Complete Digital Marketing Strategy."
    },
    {
      q: "Will I get Google certifications?",
      a: "We prepare you for Google Analytics and Google Ads certifications with hands-on practice and exam preparation."
    },
    {
      q: "What's the class schedule like?",
      a: "2 hours daily classes with practical workshops. Evening batches available for working professionals and business owners."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Digital Marketing <span className="font-medium text-black">Mastery</span>
          </h1>
          <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Master comprehensive digital marketing strategies and grow businesses online
          </p>
          
          {/* Quick Info */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Duration:</span>
              <span className="font-medium text-black">60 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Level:</span>
              <span className="font-medium text-black">Beginner to Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Fee:</span>
              <span className="font-medium text-black">₹25,000</span>
            </div>
          </div>

          {/* CTA Button */}
          <EnrollButton 
            amount={25000}
            courseName="Digital Marketing Mastery"
          />
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl text-black font-light text-center mb-12 tracking-tight">
            Why Choose Our <span className="font-medium">Digital Marketing</span> Course
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
            Comprehensive curriculum covering all major digital marketing channels and strategies
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
              "Business owners wanting to grow online presence",
              "Marketing professionals seeking digital skills",
              "Entrepreneurs planning to start marketing agencies"
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
            Ready to Master <span className="font-medium">Digital Marketing</span> Strategies?
          </h2>
          <p className="text-gray-300 font-light mb-8">
            Join successful marketers who have grown businesses and launched careers in digital marketing
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <EnrollButton 
              amount={25000}
              courseName="Digital Marketing Mastery"
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
          amount={25000}
          courseName="Digital Marketing Mastery"
          className="w-full py-3 text-sm font-medium tracking-wide"
        >
          Enroll Now - ₹25,000
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
