// 'use client';

// import { useState } from 'react';
// import { Clock, CheckCircle, AlertCircle, Trophy, Users } from 'lucide-react';
// import StudentRegistrationModal from '@/components/modals/StudentRegistrationModal';

// const instructionsArray = [
//   "Read each question carefully before answering",
//   "You have 60 minutes to complete the entire test",
//   "No external help or resources are allowed during the test",
//   "Ensure stable internet connection throughout the test",
//   "Click 'Submit Test' only after reviewing all your answers"
// ];

// const testHighlights = [
//   { icon: Clock, label: "Duration", value: "60 Minutes" },
//   { icon: Users, label: "Participants", value: "Limited Seats" },
//   { icon: Trophy, label: "Prizes", value: "Top Performers" },
//   { icon: CheckCircle, label: "Certificate", value: "All Participants" }
// ];

// export default function TestPage() {
//   const [showRegistrationModal, setShowRegistrationModal] = useState(false);

//   const handleRegisterClick = () => {
//     setShowRegistrationModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowRegistrationModal(false);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section with Gradient */}
//       <section className="relative pt-24 pb-16 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
//         {/* Decorative Elements */}
//         <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
//         <div className="max-w-4xl mx-auto text-center relative z-10">
//           <div className="inline-block px-4 py-1.5 bg-white bg-opacity-10 backdrop-blur-sm rounded-full mb-6">
//             <span className="text-sm text-black font-light tracking-wide">TALENT HUNT 2025</span>
//           </div>
          
//           <h1 className="text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
//             Exameets Skillverse <span className="font-medium">Talent Hunt - 1</span>
//           </h1>
//           <p className="text-xl text-gray-300 font-light mb-8 leading-relaxed max-w-2xl mx-auto">
//             Showcase your skills and compete with the best talent across the nation
//           </p>
//         </div>
//       </section>

//       {/* Test Highlights */}
//       <section className="py-12 bg-gray-50 border-b border-gray-100">
//         <div className="max-w-5xl mx-auto px-6">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {testHighlights.map((highlight, index) => {
//               const IconComponent = highlight.icon;
//               return (
//                 <div key={index} className="text-center">
//                   <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
//                     <IconComponent className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="text-xs text-gray-500 font-light mb-1">{highlight.label}</div>
//                   <div className="font-medium text-black">{highlight.value}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Instructions Section */}
//       <section className="py-16">
//         <div className="max-w-3xl mx-auto px-6">
//           <h2 className="text-2xl text-black font-light mb-3 tracking-tight">
//             Test <span className="font-medium">Instructions</span>
//           </h2>
//           <p className="text-gray-600 font-light mb-8">
//             Please read the following instructions carefully before starting the test
//           </p>

//           <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
//             {instructionsArray.map((instruction, index) => (
//               <div 
//                 key={index} 
//                 className={`flex items-start gap-4 p-5 ${
//                   index !== instructionsArray.length - 1 ? 'border-b border-gray-100' : ''
//                 }`}
//               >
//                 <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center mt-0.5">
//                   <span className="text-white text-sm font-medium">{index + 1}</span>
//                 </div>
//                 <p className="text-gray-700 font-light leading-relaxed pt-1">{instruction}</p>
//               </div>
//             ))}
//           </div>

//           {/* Important Note */}
//           <div className="mt-8 p-5 bg-gray-50 border-l-4 border-black">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
//               <div>
//                 <h3 className="font-medium text-black mb-1">Important Note</h3>
//                 <p className="text-sm text-gray-600 font-light leading-relaxed">
//                   Once you start the test, the timer will begin automatically. Make sure you&apos;re ready before clicking the Register button. The test cannot be paused once started.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What to Expect Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-3xl mx-auto px-6">
//           <h2 className="text-2xl text-black font-light text-center mb-12 tracking-tight">
//             What to <span className="font-medium">Expect</span>
//           </h2>
          
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { title: "MCQ Questions", desc: "Multiple choice questions covering various topics" },
//               { title: "Instant Results", desc: "Get your scores immediately after submission" },
//               { title: "Performance Analysis", desc: "Detailed breakdown of your performance" }
//             ].map((item, index) => (
//               <div key={index} className="bg-white p-6 border border-gray-100 text-center">
//                 <CheckCircle className="w-8 h-8 text-black mx-auto mb-3" />
//                 <h3 className="font-medium text-black mb-2">{item.title}</h3>
//                 <p className="text-sm text-gray-600 font-light">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16">
//         <div className="max-w-3xl mx-auto px-6 text-center">
//           <h2 className="text-2xl text-black font-light mb-4 tracking-tight">
//             Ready to <span className="font-medium">Begin</span>?
//           </h2>
//           <p className="text-gray-600 font-light mb-8">
//             Click the button below to register and start your test
//           </p>
          
//           <button
//             type="button"
//             onClick={handleRegisterClick}
//             className="bg-black text-white px-12 py-4 text-sm font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-2"
//           >
//             Register for Test
//             <CheckCircle className="w-4 h-4" />
//           </button>
//         </div>
//       </section>

//       {/* Sticky Register Button - Mobile */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50">
//         <button
//           type="button"
//           onClick={handleRegisterClick}
//           className="w-full bg-black text-white py-3.5 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
//         >
//           Register for Test
//         </button>
//       </div>

//       {/* Bottom padding for mobile sticky button */}
//       <div className="h-20 lg:hidden"></div>

//       {/* Registration Modal */}
//       <StudentRegistrationModal 
//         isOpen={showRegistrationModal}
//         onClose={handleCloseModal}
//       />
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Trophy, Gift, Award, Sparkles, ChevronRight, BookOpen, Star } from 'lucide-react';
import StudentRegistrationModal from '@/components/modals/StudentRegistrationModal';

const instructionsArray = [
  "Read each question carefully before answering",
  "Test duration varies by exam - check your specific test details",
  "No external help or resources are allowed during the test",
  "Ensure stable internet connection throughout the test",
  "Click 'Submit Test' only after reviewing all your answers"
];

const prizes = [
  {
    rank: "Top 3 Performers",
    discount: "75% Off",
    gradient: "from-yellow-400 via-amber-500 to-yellow-600",
    icon: Trophy
  },
  {
    rank: "Rank 4 & 5",
    discount: "50% Off",
    gradient: "from-violet-300 via-violet-400 to-violet-500",
    icon: Award
  },
  {
    rank: "All Participants",
    discount: "15% Off",
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    icon: Sparkles
  },
  {
    rank: "Show Your Skills!",
    discount: "Join now !",
    gradient: "from-pink-400 via-rose-500 to-red-600",
    icon: Star
  }
];


export default function TestPage() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRegisterClick = () => {
    setShowRegistrationModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section with Dynamic Gradient */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15) 0%, transparent 50%)`
          }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-8 shadow-lg shadow-indigo-500/30 animate-fade-in">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span className="text-sm text-white font-medium tracking-wide">TALENT HUNT 2025</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 mb-6 tracking-tight leading-tight">
            Exameets Skillverse
            <br />
            <span className="text-4xl lg:text-6xl">Talent Hunt - 1</span>
          </h1>
          <p className="text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Showcase your skills, compete with the best, and unlock exclusive rewards
          </p>
          
          <button
            onClick={handleRegisterClick}
            className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-lg font-semibold shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3">
              Register Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </section>

      {/* Prizes Section - Hero Treatment */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Exciting <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Prizes</span>
            </h2>
            <p className="text-xl text-slate-300 font-light">Win course discounts based on your performance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {prizes.map((prize, index) => {
              const IconComponent = prize.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${prize.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${prize.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-shadow`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-white text-lg font-semibold mb-2 text-center">{prize.rank}</h3>
                  <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${prize.gradient} text-center mb-2`}>
                    {prize.discount}
                  </div>
                  <p className="text-slate-400 text-sm text-center">Course Discount</p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Trophy className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Win the course you excel in!</h3>
                <p className="text-slate-300 leading-relaxed">
                  Secure the top position in any test to receive a <span className="text-yellow-400 font-semibold">75% discount</span> on that specific course. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
              <Gift className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Referral Rewards</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Invite & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Earn</span>
            </h2>
            <p className="text-xl text-slate-600 font-light">Share your referral code and win exciting gifts</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">How It Works</h3>
              <p className="text-purple-100 leading-relaxed">
                Share your unique referral code with friends. When they register using your code, you earn a referral point!
              </p>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {[
                  { step: "1", title: "Share Code", desc: "Share your unique referral code with students" },
                  { step: "2", title: "They Register", desc: "Students register for tests using your code" },
                  { step: "3", title: "You Win", desc: "Accumulate referrals and win exciting prizes" }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                      {item.step}
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 text-lg">Top 3 Referrers Win Big!</h4>
                    <p className="text-slate-700 leading-relaxed mb-3">
                      The top three students with the most valid referrals by the end of the test will receive exciting gifts. 
                    </p>
                    <p className="text-sm text-amber-800 font-medium">
                      ⚡ Only valid registrations count — we verify every participant to ensure fairness!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Test <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Guidelines</span>
            </h2>
            <p className="text-lg text-slate-600">Please review these important instructions before starting</p>
          </div>

          <div className="space-y-4 mb-10">
            {instructionsArray.map((instruction, index) => (
              <div 
                key={index} 
                className="group flex items-start gap-5 p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg font-bold">{index + 1}</span>
                </div>
                <p className="text-slate-700 leading-relaxed pt-2 text-lg">{instruction}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-7 h-7 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 mb-3 text-xl">Critical: Test Timer</h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  Once you start the test, the timer begins automatically and cannot be paused. Each test has its own specific duration. 
                  Ensure you&apos;re in a distraction-free environment before clicking Register.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Expect</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, title: "MCQ Format", desc: "Multiple choice questions covering various topics and difficulty levels", color: "from-green-500 to-emerald-600" },
              { icon: Trophy, title: "Compete & Win", desc: "Register for multiple tests and maximize your chances of winning prizes", color: "from-purple-500 to-pink-600" },
              { icon: BookOpen, title: "Multiple Subjects", desc: "Choose from various tests covering different domains and topics", color: "from-blue-500 to-cyan-600" },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3 text-xl text-center">{item.title}</h3>
                  <p className="text-slate-600 text-center leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
            Register now for unlimited active tests and start your path to success
          </p>
          
          <button
            onClick={handleRegisterClick}
            className="group relative px-12 py-6 bg-white text-purple-600 rounded-full text-lg font-bold shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Your Test Journey
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 lg:hidden z-50 shadow-2xl">
        <button
          onClick={handleRegisterClick}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-full text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          Register Now
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="h-20 lg:hidden" />

      {/* Registration Modal */}
      <StudentRegistrationModal 
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  );
}