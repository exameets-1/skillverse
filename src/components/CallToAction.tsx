'use client';

import { useState } from 'react';
import { ArrowRight, Phone, X, Loader2 } from 'lucide-react';
import CardSwap, { Card } from "@/components/CardSwap/CardSwap";

export default function CallToAction() {
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [isEnrollLoading, setIsEnrollLoading] = useState(false);
  const [isCallbackLoading, setIsCallbackLoading] = useState(false);

  const [enrollData, setEnrollData] = useState({
    name: '',
    contact: '',
    course: '',
  });

  const [callbackData, setCallbackData] = useState({
    name: '',
    contact: '',
    time: '',
  });

  // Submit Enroll form
  const handleEnrollSubmit = async () => {
    setIsEnrollLoading(true);
    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrollData),
      });
      if (res.ok) {
        alert('Enrollment request sent');
        setShowEnrollModal(false);
        setEnrollData({ name: '', contact: '', course: '' });
      } else {
        alert('Failed to send enrollment request, kindly fill all the details!');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setIsEnrollLoading(false);
    }
  };

  // Submit Callback form
  const handleCallbackSubmit = async () => {
    setIsCallbackLoading(true);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(callbackData),
      });
      if (res.ok) {
        alert('Callback request sent');
        setShowCallbackModal(false);
        setCallbackData({ name: '', contact: '', time: '' });
      } else {
        alert('Failed to send callback request, kindly fill all the details!');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setIsCallbackLoading(false);
    }
  };

  return (
    <>
      {/* Desktop Section */}
      <section className="hidden lg:block bg-black overflow-hidden">
        <div className="mx-auto flex items-center justify-between relative">
          {/* Left Content */}
          <div className="px-20 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-8 tracking-tight">
              Start Your Learning <span className="font-medium">Journey Today!</span>
            </h2>

            <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed mb-12">
              Don&apos;t just learn, become a master. Exameets Skillverse Academy is your gateway
              to a rewarding career in technology. Take the first step towards a brighter future now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowEnrollModal(true)}
                className="group bg-white text-black px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-100 tracking-wide flex items-center justify-center"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => setShowCallbackModal(true)}
                className="group border border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium transition-all duration-300 tracking-wide flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Request a Call Back
              </button>
            </div>
          </div>

          {/* Right CardSwap */}
          <div className="relative h-[600px] w-[600px] overflow-hidden">
            <CardSwap
              width={500}
              height={400}
              cardDistance={60}     // Reduced for tighter stacking
              verticalDistance={70} // Reduced for better vertical alignment
              delay={4000}         // Faster transitions
              pauseOnHover={false}
              skewAmount={6}       // Increased skew for more dramatic effect
              easing="elastic"
              onCardClick={(idx) => {
                // Optional: Handle card clicks
                setShowEnrollModal(true);
              }}
            >
              <Card className='p-7' >
                <h3 className="text-2xl font-bold text-white mb-4">Live Classes</h3>
                <p className="text-zinc-300">Interactive sessions with industry experts</p>
                <div className="absolute bottom-4 right-4 text-white/50">01</div>
              </Card>
              <Card className='p-7'>
                <h3 className="text-2xl font-bold text-white mb-4">1:1 Mentoring</h3>
                <p className="text-zinc-300">Personalized guidance for your growth</p>
                <div className="absolute bottom-4 right-4 text-white/50">02</div>
              </Card>
              <Card className='p-7'>
                <h3 className="text-2xl font-bold text-white mb-4">Job Ready</h3>
                <p className="text-zinc-300">Industry aligned curriculum</p>
                <div className="absolute bottom-4 right-4 text-white/50">03</div>
              </Card>
            </CardSwap>

            {/* Add decorative elements */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Mobile Section */}
      <section className="block lg:hidden py-16 bg-black">
        <div className="px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-6 tracking-tight">
            Start Your Learning <span className="font-medium">Journey Today!</span>
          </h2>

          <p className="text-base text-gray-300 font-light leading-relaxed mb-10">
            Don&apos;t just learn, become a master. Exameets Skillverse Academy is your gateway to a
            rewarding career in technology. Take the first step towards a brighter future now!
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setShowEnrollModal(true)}
              className="group bg-white text-black px-6 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-100 tracking-wide flex items-center justify-center w-full"
            >
              Enroll Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={() => setShowCallbackModal(true)}
              className="group border border-white text-white hover:bg-white hover:text-black px-6 py-4 text-lg font-medium transition-all duration-300 tracking-wide flex items-center justify-center w-full"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Request a Call Back
            </button>
          </div>
        </div>
      </section>

      {/* Enroll Now Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-8 relative">
            {/* Loading Overlay */}
            {isEnrollLoading && (
              <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-black mx-auto mb-2" />
                  <p className="text-gray-600">Submitting...</p>
                </div>
              </div>
            )}

            <button
              title="Close Enroll Modal"
              onClick={() => setShowEnrollModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              disabled={isEnrollLoading}
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Enroll Now</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={enrollData.name}
                onChange={(e) => setEnrollData({ ...enrollData, name: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                disabled={isEnrollLoading}
              />
              <input
                type="tel"
                placeholder="Contact No (WhatsApp preferred)"
                value={enrollData.contact}
                onChange={(e) => setEnrollData({ ...enrollData, contact: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                disabled={isEnrollLoading}
              />
              <input
                type="text"
                placeholder="Course Interested"
                value={enrollData.course}
                onChange={(e) => setEnrollData({ ...enrollData, course: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                disabled={isEnrollLoading}
              />
              <button
                type="button"
                onClick={handleEnrollSubmit}
                disabled={isEnrollLoading}
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isEnrollLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Callback Modal */}
      {showCallbackModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-8 relative">
            {/* Loading Overlay */}
            {isCallbackLoading && (
              <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-black mx-auto mb-2" />
                  <p className="text-gray-600">Submitting...</p>
                </div>
              </div>
            )}

            <button
              title="Close Callback Modal"
              onClick={() => setShowCallbackModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              disabled={isCallbackLoading}
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Request a Call Back</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={callbackData.name}
                onChange={(e) => setCallbackData({ ...callbackData, name: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                disabled={isCallbackLoading}
              />
              <input
                type="tel"
                placeholder="Contact Number"
                value={callbackData.contact}
                onChange={(e) => setCallbackData({ ...callbackData, contact: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                disabled={isCallbackLoading}
              />
              <input
                type="text"
                placeholder="Preferred Time"
                value={callbackData.time}
                onChange={(e) => setCallbackData({ ...callbackData, time: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                disabled={isCallbackLoading}
              />
              <button
                type="button"
                onClick={handleCallbackSubmit}
                disabled={isCallbackLoading}
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isCallbackLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}