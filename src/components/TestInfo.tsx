'use client';

import { Trophy, Award, Sparkles, Star, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

const prizes = [
  { rank: "Top 3", discount: "75%", icon: Trophy, gradient: "from-yellow-400 to-orange-500" },
  { rank: "Rank 4-5", discount: "50%", icon: Award, gradient: "from-violet-400 to-purple-500" },
  { rank: "All", discount: "15%", icon: Sparkles, gradient: "from-blue-400 to-indigo-500" },
  { rank: "Join", discount: "Now", icon: Star, gradient: "from-pink-400 to-rose-500" }
];

export default function TestInfo() {
  return (
    <>
      {/* Desktop Version */}
      <section className="hidden lg:block bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-8 py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Title & Description */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
                <Zap className="w-4 h-4 text-white animate-pulse" />
                <span className="text-xs text-white font-medium tracking-wide">LIVE NOW</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Exameets Skillverse
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-orange-400 to-pink-500">
                  Talent Hunt 2025
                </span>
              </h2>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Compete with the best, showcase your skills, and win exclusive course discounts up to <span className="text-yellow-400 font-semibold">75% off</span>
              </p>

              <div className="flex gap-4">
                <Link
                  href="/test/register"
                  title="Register for Exameets Skillverse Talent Hunt - 1 conducted by Exameets Skillverse Academy - Kadapa"
                  className="group bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 text-base font-semibold rounded-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 flex items-center"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/test"
                  title="View All Tests at Exameets Skillverse Talent Hunt - 1 conducted by Exameets Skillverse Academy - Kadapa"
                  className="group border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-base font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  View All Tests
                </Link>
              </div>
            </div>

            {/* Right: Prizes Grid */}
            <div className="grid grid-cols-2 gap-4">
              {prizes.map((prize, idx) => {
                const IconComponent = prize.icon;
                return (
                  <div 
                    key={idx} 
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  >
                    <div className={`absolute inset-0 bg-linear-to-br ${prize.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                    
                    <div className={`w-12 h-12 bg-linear-to-br ${prize.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="text-sm text-slate-400 mb-1">{prize.rank}</div>
                    <div className={`text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br ${prize.gradient}`}>
                      {prize.discount}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Course Discount</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section className="block lg:hidden bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        
        <div className="px-4 py-10 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg">
              <Zap className="w-4 h-4 text-white animate-pulse" />
              <span className="text-xs text-white font-medium tracking-wide">LIVE NOW</span>
            </div>
          </div>
          
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
              Talent Hunt 2025
            </h2>
            <p className="text-sm text-slate-300">
              Win up to <span className="text-yellow-400 font-semibold">75% off</span> on courses
            </p>
          </div>

          {/* Prizes Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {prizes.map((prize, idx) => {
              const IconComponent = prize.icon;
              return (
                <div 
                  key={idx} 
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                >
                  <div className={`w-10 h-10 bg-linear-to-br ${prize.gradient} rounded-lg flex items-center justify-center mb-3 shadow-lg`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="text-xs text-slate-400 mb-1">{prize.rank}</div>
                  <div className={`text-2xl font-bold text-transparent bg-clip-text bg-linear-to-br ${prize.gradient}`}>
                    {prize.discount}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link
              href="/test/register"
              title="Register for Exameets Skillverse Talent Hunt - 1 conducted by Exameets Skillverse Academy - Kadapa"
              className="block w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 text-base font-semibold text-center rounded-lg shadow-xl shadow-indigo-500/30"
            >
              Register Now
            </Link>
            <Link
              href="/test"
              title="View All Tests at Exameets Skillverse Talent Hunt - 1 conducted by Exameets Skillverse Academy - Kadapa"
              className="block w-full border-2 border-white/30 text-white px-6 py-4 text-base font-semibold text-center rounded-lg backdrop-blur-sm"
            >
              View All Tests
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}