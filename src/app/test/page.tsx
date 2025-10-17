'use client';

import { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Trophy, Users } from 'lucide-react';
import StudentRegistrationModal from '@/components/modals/StudentRegistrationModal';

const instructionsArray = [
  "Read each question carefully before answering",
  "You have 60 minutes to complete the entire test",
  "No external help or resources are allowed during the test",
  "Ensure stable internet connection throughout the test",
  "Click 'Submit Test' only after reviewing all your answers"
];

const testHighlights = [
  { icon: Clock, label: "Duration", value: "60 Minutes" },
  { icon: Users, label: "Participants", value: "Limited Seats" },
  { icon: Trophy, label: "Prizes", value: "Top Performers" },
  { icon: CheckCircle, label: "Certificate", value: "All Participants" }
];

export default function TestPage() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleRegisterClick = () => {
    setShowRegistrationModal(true);
  };

  const handleCloseModal = () => {
    setShowRegistrationModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient */}
      <section className="relative pt-24 pb-16 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-white bg-opacity-10 backdrop-blur-sm rounded-full mb-6">
            <span className="text-sm text-black font-light tracking-wide">TALENT HUNT 2025</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
            Exameets Skillverse <span className="font-medium">Talent Hunt - 1</span>
          </h1>
          <p className="text-xl text-gray-300 font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Showcase your skills and compete with the best talent across the nation
          </p>
        </div>
      </section>

      {/* Test Highlights */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {testHighlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs text-gray-500 font-light mb-1">{highlight.label}</div>
                  <div className="font-medium text-black">{highlight.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl text-black font-light mb-3 tracking-tight">
            Test <span className="font-medium">Instructions</span>
          </h2>
          <p className="text-gray-600 font-light mb-8">
            Please read the following instructions carefully before starting the test
          </p>

          <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
            {instructionsArray.map((instruction, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-4 p-5 ${
                  index !== instructionsArray.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-sm font-medium">{index + 1}</span>
                </div>
                <p className="text-gray-700 font-light leading-relaxed pt-1">{instruction}</p>
              </div>
            ))}
          </div>

          {/* Important Note */}
          <div className="mt-8 p-5 bg-gray-50 border-l-4 border-black">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-black mb-1">Important Note</h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  Once you start the test, the timer will begin automatically. Make sure you&apos;re ready before clicking the Register button. The test cannot be paused once started.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl text-black font-light text-center mb-12 tracking-tight">
            What to <span className="font-medium">Expect</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "MCQ Questions", desc: "Multiple choice questions covering various topics" },
              { title: "Instant Results", desc: "Get your scores immediately after submission" },
              { title: "Performance Analysis", desc: "Detailed breakdown of your performance" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-100 text-center">
                <CheckCircle className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-medium text-black mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl text-black font-light mb-4 tracking-tight">
            Ready to <span className="font-medium">Begin</span>?
          </h2>
          <p className="text-gray-600 font-light mb-8">
            Click the button below to register and start your test
          </p>
          
          <button
            type="button"
            onClick={handleRegisterClick}
            className="bg-black text-white px-12 py-4 text-sm font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-2"
          >
            Register for Test
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Sticky Register Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50">
        <button
          type="button"
          onClick={handleRegisterClick}
          className="w-full bg-black text-white py-3.5 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
        >
          Register for Test
        </button>
      </div>

      {/* Bottom padding for mobile sticky button */}
      <div className="h-20 lg:hidden"></div>

      {/* Registration Modal */}
      <StudentRegistrationModal 
        isOpen={showRegistrationModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}