'use client';

import { Code2, Users2, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function WhyChoose() {
  return (
    <>
      {/* Desktop Version */}
      <section className="hidden lg:block py-20 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content Section - Left Side */}
            <div className="space-y-12">
              {/* Header */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
                  What Makes Us{' '}
                  <span className="font-medium text-black">
                    the Best?
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  We deliver practical, project-based learning that goes beyond theory. 
                  Our students gain real-world coding experience through live projects, 
                  internship opportunities, and industry mentorship.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-8">
                {/* Feature 1 */}
                <div className="flex items-start space-x-6 group">
                  <div className="shrink-0">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm group-hover:scale-105 transition-transform duration-300">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <Code2 className="w-5 h-5 text-black mr-3" />
                      <h3 className="text-xl font-medium text-black tracking-tight">Modern Computer Labs</h3>
                    </div>
                    <p className="text-gray-600 font-light">
                      Practice coding on industry-standard development tools and software used by leading tech companies.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start space-x-6 group">
                  <div className="shrink-0">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm group-hover:scale-105 transition-transform duration-300">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <Users2 className="w-5 h-5 text-black mr-3" />
                      <h3 className="text-xl font-medium text-black tracking-tight">Mock Interview Training</h3>
                    </div>
                    <p className="text-gray-600 font-light">
                      Prepare for technical interviews with realistic coding challenges, HR rounds, and feedback from industry experts.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start space-x-6 group">
                  <div className="shrink-0">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm group-hover:scale-105 transition-transform duration-300">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <Briefcase className="w-5 h-5 text-black mr-3" />
                      <h3 className="text-xl font-medium text-black tracking-tight">Personal Mentorship</h3>
                    </div>
                    <p className="text-gray-600 font-light">
                      Dedicated career counseling, resume optimization, and job referrals to help you land your first tech job or switch careers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Section - Right Side */}
            <div className="relative">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/Vertical.webp"
                  alt="Team Meeting at Exameets Skillverse"
                  title='Exameets Skillverse Academy - Kadapa'
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '3/4' }}
                  width={896}
                  height={1192}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section className="block lg:hidden py-16 bg-white">
        <div className="px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 tracking-tight">
              What Makes Us{' '}
              <span className="font-medium text-black">
                the Best?
              </span>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto font-light">
              We deliver practical, project-based learning that goes beyond theory. 
              Our students gain real-world coding experience through live projects, 
              internship opportunities, and industry mentorship.
            </p>
          </div>

          {/* Image */}
          <div className="mb-12">
            <div className="relative overflow-hidden mx-auto max-w-sm">
              <Image
                src="/images/Vertical.webp"
                alt="Team Meeting at Exameets Skillverse"
                title='Exameets Skillverse Academy - Kadapa'
                className="w-full h-auto object-cover"
                width={896}
                height={1192}
                style={{ aspectRatio: '3/4' }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="border border-gray-100 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0">
                  1
                </div>
                <div>
                  <div className="flex items-center mb-2 flex-wrap">
                    <h3 className="text-lg font-medium text-black tracking-tight">Modern Computer Labs</h3>
                  </div>
                  <p className="text-gray-600 font-light text-sm">
                    Practice coding on industry-standard development tools and software used by leading tech companies.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="border border-gray-100 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0">
                  2
                </div>
                <div>
                  <div className="flex items-center mb-2 flex-wrap">
                    <h3 className="text-lg font-medium text-black tracking-tight">Mock Interview Training</h3>
                  </div>
                  <p className="text-gray-600 font-light text-sm">
                    Prepare for technical interviews with realistic coding challenges, HR rounds, and feedback from industry experts.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="border border-gray-100 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0">
                  3
                </div>
                <div>
                  <div className="flex items-center mb-2 flex-wrap">
                    <h3 className="text-lg font-medium text-black tracking-tight">Personal Mentorship</h3>
                  </div>
                  <p className="text-gray-600 font-light text-sm">
                    Dedicated career counseling, resume optimization, and job referrals to help you land your first tech job or switch careers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// 'use client';

// import { Code2, Users2, Briefcase } from 'lucide-react';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';

// export default function WhyChoose() {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       {
//         threshold: 0.1,
//         rootMargin: '100px'
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <>
//       {/* Desktop Version */}
//       <div ref={sectionRef} className="hidden lg:block relative">
//         <section 
//           className={`py-20 lg:py-32 bg-white transition-all duration-1000 ease-out ${
//             isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
//           }`}
//           style={{
//             willChange: 'transform, opacity'
//           }}
//         >
//           <div className="max-w-6xl mx-auto px-6 lg:px-8">
//             <div className="grid lg:grid-cols-2 gap-20 items-center">
//               {/* Content Section - Left Side */}
//               <div className="space-y-12">
//                 {/* Header */}
//                 <div>
//                   <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
//                     What Makes Us{' '}
//                     <span className="font-medium text-black">
//                       the Best?
//                     </span>
//                   </h2>
//                   <p className="text-lg text-gray-600 leading-relaxed font-light">
//                     We deliver practical, project-based learning that goes beyond theory. 
//                     Our students gain real-world coding experience through live projects, 
//                     internship opportunities, and industry mentorship.
//                   </p>
//                 </div>

//                 {/* Features List */}
//                 <div className="space-y-8">
//                   {/* Feature 1 */}
//                   <div className="flex items-start space-x-6 group">
//                     <div className="shrink-0">
//                       <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm group-hover:scale-105 transition-transform duration-300">
//                         1
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center mb-3">
//                         <Code2 className="w-5 h-5 text-black mr-3" />
//                         <h3 className="text-xl font-medium text-black tracking-tight">Modern Computer Labs</h3>
//                       </div>
//                       <p className="text-gray-600 font-light">
//                         Practice coding on industry-standard development tools and software used by leading tech companies.
//                       </p>
//                     </div>
//                   </div>

//                   {/* Feature 2 */}
//                   <div className="flex items-start space-x-6 group">
//                     <div className="shrink-0">
//                       <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm group-hover:scale-105 transition-transform duration-300">
//                         2
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center mb-3">
//                         <Users2 className="w-5 h-5 text-black mr-3" />
//                         <h3 className="text-xl font-medium text-black tracking-tight">Mock Interview Training</h3>
//                       </div>
//                       <p className="text-gray-600 font-light">
//                         Prepare for technical interviews with realistic coding challenges, HR rounds, and feedback from industry experts.
//                       </p>
//                     </div>
//                   </div>

//                   {/* Feature 3 */}
//                   <div className="flex items-start space-x-6 group">
//                     <div className="shrink-0">
//                       <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm group-hover:scale-105 transition-transform duration-300">
//                         3
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center mb-3">
//                         <Briefcase className="w-5 h-5 text-black mr-3" />
//                         <h3 className="text-xl font-medium text-black tracking-tight">Personal Mentorship</h3>
//                       </div>
//                       <p className="text-gray-600 font-light">
//                         Dedicated career counseling, resume optimization, and job referrals to help you land your first tech job or switch careers.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Image Section - Right Side */}
//               <div className="relative">
//                 <div className="relative overflow-hidden">
//                   <Image
//                     src="/images/Vertical.webp"
//                     alt="Team Meeting at Exameets Skillverse"
//                     className="w-full h-auto object-cover"
//                     style={{ aspectRatio: '3/4' }}
//                     width={896}
//                     height={1192}
//                   />
//                   <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* Mobile Version */}
//       <section className="block lg:hidden py-16 bg-white">
//         <div className="px-6">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 tracking-tight">
//               What Makes Us{' '}
//               <span className="font-medium text-black">
//                 the Best?
//               </span>
//             </h2>
//             <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto font-light">
//               We deliver practical, project-based learning that goes beyond theory. 
//               Our students gain real-world coding experience through live projects, 
//               internship opportunities, and industry mentorship.
//             </p>
//           </div>

//           {/* Image */}
//           <div className="mb-12">
//             <div className="relative overflow-hidden mx-auto max-w-sm">
//               <Image
//                 src="/images/Vertical.webp"
//                 alt="Team Meeting at Exameets Skillverse"
//                 className="w-full h-auto object-cover"
//                 width={896}
//                 height={1192}
//                 style={{ aspectRatio: '3/4' }}
//               />
//               <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
//             </div>
//           </div>

//           {/* Features */}
//           <div className="space-y-6">
//             {/* Feature 1 */}
//             <div className="border border-gray-100 p-6">
//               <div className="flex items-start space-x-4">
//                 <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0">
//                   1
//                 </div>
//                 <div>
//                   <div className="flex items-center mb-2 flex-wrap">
//                     <h3 className="text-lg font-medium text-black tracking-tight">Modern Computer Labs</h3>
//                   </div>
//                   <p className="text-gray-600 font-light text-sm">
//                     Practice coding on industry-standard development tools and software used by leading tech companies.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Feature 2 */}
//             <div className="border border-gray-100 p-6">
//               <div className="flex items-start space-x-4">
//                 <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0">
//                   2
//                 </div>
//                 <div>
//                   <div className="flex items-center mb-2 flex-wrap">
//                     <h3 className="text-lg font-medium text-black tracking-tight">Mock Interview Training</h3>
//                   </div>
//                   <p className="text-gray-600 font-light text-sm">
//                     Prepare for technical interviews with realistic coding challenges, HR rounds, and feedback from industry experts.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Feature 3 */}
//             <div className="border border-gray-100 p-6">
//               <div className="flex items-start space-x-4">
//                 <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0">
//                   3
//                 </div>
//                 <div>
//                   <div className="flex items-center mb-2 flex-wrap">
//                     <h3 className="text-lg font-medium text-black tracking-tight">Personal Mentorship</h3>
//                   </div>
//                   <p className="text-gray-600 font-light text-sm">
//                     Dedicated career counseling, resume optimization, and job referrals to help you land your first tech job or switch careers.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }