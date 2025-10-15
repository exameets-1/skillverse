'use client'

import { Lightbulb, TrendingUp, Users } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
            Welcome to{' '}
            <span className="font-medium text-black">
              Exameets Skillverse Academy
            </span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
              At Exameets Skillverse Academy, we transform aspirations into achievements. 
              Located in Kadapa, we are dedicated to providing cutting-edge software and tech training 
              that directly translates to real-world career success.
            </p>
            <p className="text-base lg:text-lg text-gray-500 font-light">
              Our programs are designed to equip you with the skills demanded by today&apos;s rapidly evolving tech industry.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Innovation Focused */}
          <div className="group bg-white border border-gray-100 p-8 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-black tracking-tight">Innovation Focused</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-light">
              Stay ahead with curricula updated for the latest industry trends.
            </p>
          </div>

          {/* Career Driven */}
          <div className="group bg-white border border-gray-100 p-8 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-black tracking-tight">Career Driven</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-light">
              Programs built to accelerate your professional journey and job readiness.
            </p>
          </div>

          {/* Supportive Community */}
          <div className="group bg-white border border-gray-100 p-8 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-black tracking-tight">Supportive Community</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-light">
              Join a network of peers and mentors for lifelong learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}