// 'use client'

// import { Lightbulb, TrendingUp, Users } from 'lucide-react';

// export default function About() {
//   return (
//     <section className="py-20 lg:py-32 bg-white">
//       <div className="max-w-6xl mx-auto px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="text-center mb-20">
//           <h2 className="text-3xl lg:text-4xl font-light text-black-900 mb-8 tracking-tight">
//             Welcome to{' '}
//             <span className="font-medium text-black">
//               Exameets Skillverse Academy
//             </span>
//           </h2>
//           <div className="max-w-3xl mx-auto space-y-6">
//             <p className="text-lg lg:text-xl text-black-600 leading-relaxed font-light">
//               At Exameets Skillverse Academy, we transform aspirations into achievements. 
//               Located in Kadapa, we are dedicated to providing cutting-edge software and tech training 
//               that directly translates to real-world career success.
//             </p>
//             <p className="text-base lg:text-lg text-black-500 font-light">
//               Our programs are designed to equip you with the skills demanded by today&apos;s rapidly evolving tech industry.
//             </p>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
//           {/* Innovation Focused */}
//           <div className="group bg-white border border-black-100 p-8 transition-all duration-300 hover:border-black-200 hover:shadow-sm">
//             <div className="mb-8 flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                 <Lightbulb className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-medium text-black tracking-tight">Innovation Focused</h3>
//             </div>
//             <p className="text-black-600 leading-relaxed font-light">
//               Stay ahead with curricula updated for the latest industry trends.
//             </p>
//           </div>

//           {/* Career Driven */}
//           <div className="group bg-white border border-black-100 p-8 transition-all duration-300 hover:border-black-200 hover:shadow-sm">
//             <div className="mb-8 flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                 <TrendingUp className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-medium text-black tracking-tight">Career Driven</h3>
//             </div>
//             <p className="text-black-600 leading-relaxed font-light">
//               Programs built to accelerate your professional journey and job readiness.
//             </p>
//           </div>

//           {/* Supportive Community */}
//           <div className="group bg-white border border-black-100 p-8 transition-all duration-300 hover:border-black-200 hover:shadow-sm">
//             <div className="mb-8 flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                 <Users className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-medium text-black tracking-tight">Supportive Community</h3>
//             </div>
//             <p className="text-black-600 leading-relaxed font-light">
//               Join a network of peers and mentors for lifelong learning.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// 'use client'

// import { useEffect, useRef, useState } from 'react';
// import { Code2, Briefcase, Users2 } from 'lucide-react';

// export default function About() {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       {
//         threshold: 0.1,
//         rootMargin: '0px 0px -100px 0px',
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section 
//       ref={sectionRef}
//       className={`py-20 lg:py-32 bg-white transition-all duration-1000 ${
//         isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//       }`}
//     >
//       <div className="max-w-6xl mx-auto px-6 lg:px-8">
//         {/* Header Section */}
        
//         <div 
//           className={`text-center mb-20 transition-all duration-1000 delay-200 ${
//             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//           }`}
//         >
//           <h2 className={`text-3xl lg:text-4xl font-light text-black-900 mb-8 tracking-tight transition-all duration-1000 delay-300 ${
//             isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
//           }`}>
//             Welcome to{' '}
//             <span className="font-medium text-black">
//               Exameets Skillverse Academy
//             </span>
//           </h2>
//           <div className="max-w-3xl mx-auto space-y-6">
//             <p className="text-lg lg:text-xl text-black-600 leading-relaxed font-light">
//               Kadapa&apos;s premier software training institute offering industry-recognised certification courses in programming, web development, and digital marketing. Located near Apsara Circle, Sankarapuram, we provide hands-on coding classes with placement support for students and working professionals.
//             </p>
//             <p className="text-base lg:text-lg text-black-500 font-light">
//               Our comprehensive tech training programs are designed for career transformation with updated curricula aligned to 2025 industry standards and emerging technology trends.
//             </p>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
//           {/* Industry-Updated Curriculum */}
//           <div 
//             className={`group bg-white border border-black-100 p-8 transition-all duration-1000 delay-300 hover:border-black-200 hover:shadow-sm ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}
//           >
//             <div className="mb-8 flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                 <Code2 className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-medium text-black tracking-tight">Industry-Updated Curriculum</h3>
//             </div>
//             <p className="text-black-600 leading-relaxed font-light">
//               Stay competitive with courses covering the latest frameworks, tools, and programming languages demanded by top IT companies.
//             </p>
//           </div>

//           {/* Career-Focused Training */}
//           <div 
//             className={`group bg-white border border-black-100 p-8 transition-all duration-1000 delay-400 hover:border-black-200 hover:shadow-sm ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}
//           >
//             <div className="mb-8 flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                 <Briefcase className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-medium text-black tracking-tight">Career-Focused Training</h3>
//             </div>
//             <p className="text-black-600 leading-relaxed font-light">
//               Job-oriented courses with mock interviews, resume building, and placement assistance to accelerate your tech career.
//             </p>
//           </div>

//           {/* Peer Learning Community */}
//           <div 
//             className={`group bg-white border border-black-100 p-8 transition-all duration-1000 delay-500 hover:border-black-200 hover:shadow-sm ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}
//           >
//             <div className="mb-8 flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                 <Users2 className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-medium text-black tracking-tight">Peer Learning Community</h3>
//             </div>
//             <p className="text-black-600 leading-relaxed font-light">
//               Join Kadapa&apos;s fastest-growing network of developers, designers, and digital marketers for collaborative learning and mentorship.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// 'use client'

// import { useEffect, useRef, useState } from 'react';
// import { Code2, Briefcase, Users2 } from 'lucide-react';

// export default function About() {
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;

//       const rect = sectionRef.current.getBoundingClientRect();
//       const windowHeight = window.innerHeight;
      
//       // Calculate how much of the element is visible
//       // When element starts entering viewport (bottom edge), progress = 0
//       // When element is fully in view (top edge at top of viewport), progress = 1
//       const start = windowHeight;
//       const end = 0;
//       const current = rect.top;
      
//       // Calculate progress (0 to 1)
//       let progress = (start - current) / (start - end);
//       progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
      
//       setScrollProgress(progress);
//     };

//     handleScroll(); // Initial calculation
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     window.addEventListener('resize', handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('resize', handleScroll);
//     };
//   }, []);

//   // Calculate transform values based on scroll progress
//   const headingTranslateX = -100 + (scrollProgress * 100); // -100% to 0%
//   const contentOpacity = scrollProgress;
//   const contentTranslateY = 40 - (scrollProgress * 40); // 40px to 0px

//   return (
//     <section 
//       ref={sectionRef}
//       className="py-20 lg:py-32 bg-white"
//     >
//       <div className="max-w-6xl mx-auto px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="text-center mb-20">
//           <h2 
//             className="text-3xl lg:text-5xl font-light text-black-900 mb-8 tracking-tight"
//             style={{
//               transform: `translateX(${headingTranslateX}%)`,
//               opacity: scrollProgress,
//               transition: 'none' // Remove transition for smooth scroll-based animation
//             }}
//           >
//             Welcome to{' '}
//             <span className="font-medium text-black lg:text-5xl">
//               Exameets Skillverse Academy
//             </span>
//           </h2>
//           <div 
//             className="max-w-3xl mx-auto space-y-6"
//             style={{
//               opacity: contentOpacity,
//               transform: `translateY(${contentTranslateY}px)`,
//               transition: 'none'
//             }}
//           >
//             <p className="text-lg lg:text-xl text-black-900 leading-relaxed font-light">
//               Kadapa&apos;s premier software training institute offering industry-recognised certification courses in programming, web development, and digital marketing.
//               <br />
//               Located near Apsara Circle, Sankarapuram, we provide hands-on coding classes with placement support for students and working professionals.
//             </p>
//             <p className="text-base lg:text-lg text-black-900 font-light">
//               Our comprehensive tech training programs are designed for career transformation with updated curricula aligned to 2025 industry standards and emerging technology trends.
//             </p>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
//           {/* Industry-Updated Curriculum */}
//           <div 
//             className="group bg-white border border-black-100 p-8 hover:border-black-200 hover:shadow-sm"
//             style={{
//               opacity: scrollProgress,
//               transform: `translateY(${contentTranslateY}px)`,
//               transition: 'border-color 0.3s, box-shadow 0.3s'
//             }}
//           >
//             <div className="mb-8 flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                 <Code2 className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-medium text-black tracking-tight">Industry-Updated Curriculum</h3>
//             </div>
//             <p className="text-black-900 leading-relaxed font-light">
//               Stay competitive with courses covering the latest frameworks, tools, and programming languages demanded by top IT companies.
//             </p>
//           </div>

//           {/* Career-Focused Training */}
//           <div 
//             className="group bg-white border border-black-100 p-8 hover:border-black-200 hover:shadow-sm"
//             style={{
//               opacity: scrollProgress,
//               transform: `translateY(${contentTranslateY}px)`,
//               transition: 'border-color 0.3s, box-shadow 0.3s'
//             }}
//           >
//             <div className="mb-8 flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                 <Briefcase className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-medium text-black tracking-tight">Career-Focused Training</h3>
//             </div>
//             <p className="text-black-900 leading-relaxed font-light">
//               Job-oriented courses with mock interviews, resume building, and placement assistance to accelerate your tech career.
//             </p>
//           </div>

//           {/* Peer Learning Community */}
//           <div 
//             className="group bg-white border border-black-100 p-8 hover:border-black-200 hover:shadow-sm"
//             style={{
//               opacity: scrollProgress,
//               transform: `translateY(${contentTranslateY}px)`,
//               transition: 'border-color 0.3s, box-shadow 0.3s'
//             }}
//           >
//             <div className="mb-8 flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                 <Users2 className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-medium text-black tracking-tight">Peer Learning Community</h3>
//             </div>
//             <p className="text-black-900 leading-relaxed font-light">
//               Join Kadapa&apos;s fastest-growing network of developers, designers, and digital marketers for collaborative learning and mentorship.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client'

import { useEffect, useRef, useState } from 'react';
import { Code2, Briefcase, Users2 } from 'lucide-react';

export default function About() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) return;

          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Calculate how much of the element is visible
          // When element starts entering viewport (bottom edge), progress = 0
          // When element is fully in view (top edge at top of viewport), progress = 1
          const start = windowHeight;
          const end = 0;
          const current = rect.top;
          
          // Calculate progress (0 to 1)
          let progress = (start - current) / (start - end);
          progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
          
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Calculate transform values based on scroll progress
  const headingTranslateX = -100 + (scrollProgress * 100); // -100% to 0%
  const contentOpacity = scrollProgress;
  const contentTranslateY = 40 - (scrollProgress * 40); // 40px to 0px

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 
            className="text-3xl lg:text-5xl font-light text-black-900 mb-8 tracking-tight"
            style={{
              transform: `translateX(${headingTranslateX}%)`,
              opacity: scrollProgress,
              transition: 'none' // Remove transition for smooth scroll-based animation
            }}
          >
            Welcome to{' '}
            <span className="font-medium text-black lg:text-5xl">
              Exameets Skillverse Academy
            </span>
          </h2>
          <div 
            className="max-w-3xl mx-auto space-y-6"
            style={{
              opacity: contentOpacity,
              transform: `translateY(${contentTranslateY}px)`,
              transition: 'none'
            }}
          >
            <p className="text-lg lg:text-xl text-black-600 leading-relaxed font-light">
              Kadapa&apos;s premier software training institute offering industry-recognised certification courses in programming, web development, and digital marketing. 
              <br />Located near Apsara Circle, Sankarapuram, we provide hands-on coding classes with placement support for students and working professionals.
            </p>
            <p className="text-base lg:text-lg text-black-500 font-light">
              Our comprehensive tech training programs are designed for career transformation with updated curricula aligned to 2025 industry standards and emerging technology trends.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Industry-Updated Curriculum */}
          <div 
            className="group bg-white border border-black-100 p-8 hover:border-black-200 hover:shadow-sm"
            style={{
              opacity: scrollProgress,
              transform: `translateY(${contentTranslateY}px)`,
              transition: 'border-color 0.3s, box-shadow 0.3s'
            }}
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-black tracking-tight">Industry-Updated Curriculum</h3>
            </div>
            <p className="text-black-600 leading-relaxed font-light">
              Stay competitive with courses covering the latest frameworks, tools, and programming languages demanded by top IT companies.
            </p>
          </div>

          {/* Career-Focused Training */}
          <div 
            className="group bg-white border border-black-100 p-8 hover:border-black-200 hover:shadow-sm"
            style={{
              opacity: scrollProgress,
              transform: `translateY(${contentTranslateY}px)`,
              transition: 'border-color 0.3s, box-shadow 0.3s'
            }}
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-black tracking-tight">Career-Focused Training</h3>
            </div>
            <p className="text-black-600 leading-relaxed font-light">
              Job-oriented courses with mock interviews, resume building, and placement assistance to accelerate your tech career.
            </p>
          </div>

          {/* Peer Learning Community */}
          <div 
            className="group bg-white border border-black-100 p-8 hover:border-black-200 hover:shadow-sm"
            style={{
              opacity: scrollProgress,
              transform: `translateY(${contentTranslateY}px)`,
              transition: 'border-color 0.3s, box-shadow 0.3s'
            }}
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Users2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-black tracking-tight">Peer Learning Community</h3>
            </div>
            <p className="text-black-600 leading-relaxed font-light">
              Join Kadapa&apos;s fastest-growing network of developers, designers, and digital marketers for collaborative learning and mentorship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}