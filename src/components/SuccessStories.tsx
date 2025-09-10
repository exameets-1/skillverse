'use client';

import { Quote } from 'lucide-react';

export default function SuccessStories() {
  const testimonials = [
    {
      id: 1,
      quote: "Exameets Skillverse Academy transformed my career path. The practical approach and dedicated instructors truly prepared me for my role as a Data Scientist.",
      name: "Ananya Reddy",
      position: "Data Scientist",
      company: "Tech Innovate"
    },
    {
      id: 2,
      quote: "The MERN Full Stack course was comprehensive. I landed a great job as a Web Developer just weeks after completing the program. Highly recommended!",
      name: "Karthik Varma",
      position: "Web Developer",
      company: "Digital Solutions"
    },
    {
      id: 3,
      quote: "Thanks to the Digital Marketing course, I now manage successful online campaigns. The career guidance was invaluable for my job search.",
      name: "Pooja Sharma",
      position: "Digital Marketing Specialist",
      company: "Marketing Pro"
    }
  ];

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden lg:block py-20 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Success Stories from{' '}
              <span className="font-medium text-black">
                Our Alumni
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
              Hear directly from our graduates who have successfully launched their careers after training 
              at Exameets Skillverse Academy. Your success is our mission.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`bg-white border border-gray-100 p-8 transition-all duration-300 hover:border-gray-200 hover:shadow-sm animate-fade-in-up ${
                  index === 0 ? 'delay-300' : 
                  index === 1 ? 'delay-500' : 'delay-700'
                }`}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 font-light leading-relaxed mb-8 text-base">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Attribution */}
                <div className="pt-6 border-t border-gray-50">
                  <div className="space-y-1">
                    <h4 className="font-medium text-black text-lg tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 font-light text-sm">
                      {testimonial.position}
                    </p>
                    <p className="text-gray-500 font-light text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-fade-in-up delay-900">
            <p className="text-gray-600 font-light mb-8">
              Ready to write your own success story?
            </p>
            <a href="#visit-us" className="bg-black text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-800 tracking-wide">
              Start Your Journey
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section className="block lg:hidden py-16 bg-gray-50">
        <div className="px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 tracking-tight">
              Success Stories from{' '}
              <span className="font-medium text-black">
                Our Alumni
              </span>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Hear directly from our graduates who have successfully launched their careers after training 
              at Exameets Skillverse Academy. Your success is our mission.
            </p>
          </div>

          {/* Testimonials */}
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`bg-white border border-gray-100 p-6 animate-fade-in-up ${
                  index === 0 ? 'delay-300' : 
                  index === 1 ? 'delay-500' : 'delay-700'
                }`}
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <Quote className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 font-light leading-relaxed mb-6 text-sm">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Attribution */}
                <div className="pt-4 border-t border-gray-50">
                  <div className="space-y-1">
                    <h4 className="font-medium text-black text-base tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 font-light text-xs">
                      {testimonial.position}
                    </p>
                    <p className="text-gray-500 font-light text-xs">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
      `}</style>
    </>
  );
}