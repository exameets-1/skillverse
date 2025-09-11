// 'use client';

// export default function Hero() {
//   return (
//     <>
//       {/* Desktop Version */}
//       <div className="hidden lg:block relative bg-white overflow-hidden h-screen">
//         {/* Background Video */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           src="/videos/landing.mp4"
//           poster="/images/land.png"  // 👈 fallback image
//           autoPlay
//           muted
//           loop
//           playsInline
//         />

//         {/* Black Gradient Overlay - Half Screen */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent w-1/2" />
        
//         {/* Content Container */}
//         <div className="relative z-10 h-full flex items-center">
//           <div className="px-6 lg:px-12 xl:px-16">
//             <div className="max-w-xl">
//               <h1 className="text-4xl lg:text-6xl font-light text-white mb-8 leading-tight tracking-tight animate-fade-in-up">
//                 <span className="block">Empower Your</span>
//                 <span className="block font-medium">Future</span>
//                 <span className="block">with Industry-Ready</span>
//                 <span className="block font-medium">Skills</span>
//               </h1>
              
//               <p className="text-lg lg:text-xl text-gray-200 mb-10 font-light animate-fade-in-up delay-300">
//                 Learn Python, Data Science, AI & more – Now in Kadapa!
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
//                 <a href="#courses" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-100 tracking-wide text-center cursor-pointer">
//                   Explore Courses
//                 </a>
//                 <a href="#visit-us" className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium transition-all duration-300 tracking-wide cursor-pointer">
//                   Join Now
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Version - Buttons at Bottom, Larger Text */}
//       <div className="block lg:hidden relative bg-white overflow-hidden min-h-screen">
//         {/* Background Video */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover object-center"
//           src="/videos/landing-mobile.mp4"
//           autoPlay
//           poster="/images/land.png"  // 👈 fallback image
//           muted
//           loop
//           playsInline
//         />

//         {/* Gradient overlay for text readability */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        
//         {/* Content Container - Text from 2/8 of screen */}
//         <div className="relative z-10 min-h-screen flex flex-col px-6">
//           {/* Text Content - Starting from 2/8 of screen height */}
//           <div className="flex-1 flex flex-col justify-center pt-16 pb-24" style={{ minHeight: '75vh' }}>
//             <div className="max-w-lg">
//             <h1
//               className={`
//                 text-4xl sm:text-5xl md:text-6xl 
//                 font-bold sm:font-extrabold 
//                 text-white 
//                 mb-8 
//                 leading-tight 
//                 tracking-tight 
//                 animate-fade-in-up
//               `}
//               style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
//               >
//               <span className="block">Master</span>
//               <span className="block text-primary-300">Future-Ready</span>
//               <span className="block">Skills</span>
//             </h1>

              
//               <p className="text-xl sm:text-2xl md:text-3xl text-gray-100 mb-12 font-extralight leading-relaxed tracking-wide animate-fade-in-up delay-300" 
//                  style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
//                 Learn Python, Data Science, AI & more – Now in Kadapa!
//               </p>
//             </div>
//           </div>
          
//           {/* Buttons Container - Fixed at Bottom */}
//           <div className="pb-8 animate-fade-in-up delay-500">
//             <div className="flex flex-col gap-4">
//               <a href="#courses" 
//                  className="bg-white text-black px-8 py-5 text-xl font-medium transition-all duration-300 hover:bg-gray-100 tracking-wide rounded-none"
//                  style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
//                 Explore Courses
//               </a>
//               <a  href="#visit-us" type="button" 
//                       className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-5 text-xl font-medium transition-all duration-300 tracking-wide rounded-none"
//                       style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
//                 Join Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for Animations */}
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out forwards;
//           opacity: 0;
//         }
        
//         .delay-300 {
//           animation-delay: 0.2s;
//         }
        
//         .delay-500 {
//           animation-delay: 0.4s;
//         }
//       `}</style>
//     </>
//   );
// }

// 'use client';

// import Galaxy from "@/Galaxy/Galaxy";

// export default function Hero() {
//   return (
//     <>
//       {/* Desktop Version */}
//       <div className="hidden lg:block relative bg-white overflow-hidden h-screen">
//         {/* Fixed Galaxy Background */}
//         <div className="fixed inset-0 z-0">
//           <Galaxy />
//         </div>

//         {/* Background Video */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover z-10"
//           src="/videos/landing.mp4"
//           poster="/images/land.png"
//           autoPlay
//           muted
//           loop
//           playsInline
//         />

//         {/* Black Gradient Overlay - Half Screen */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent w-1/2 z-20" />
        
//         {/* Content Container */}
//         <div className="relative z-30 h-full flex items-center">
//           <div className="px-6 lg:px-12 xl:px-16">
//             <div className="max-w-xl">
//               <h1 className="text-4xl lg:text-6xl font-light text-white mb-8 leading-tight tracking-tight animate-fade-in-up">
//                 <span className="block">Empower Your</span>
//                 <span className="block font-medium">Future</span>
//                 <span className="block">with Industry-Ready</span>
//                 <span className="block font-medium">Skills</span>
//               </h1>
              
//               <p className="text-lg lg:text-xl text-gray-200 mb-10 font-light animate-fade-in-up delay-300">
//                 Learn Python, Data Science, AI & more – Now in Kadapa!
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
//                 <a href="#courses" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-100 tracking-wide text-center cursor-pointer">
//                   Explore Courses
//                 </a>
//                 <a href="#visit-us" className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium transition-all duration-300 tracking-wide cursor-pointer">
//                   Join Now
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Version - Buttons at Bottom, Larger Text */}
//       <div className="block lg:hidden relative bg-white overflow-hidden min-h-screen">
//         {/* Fixed Galaxy Background */}
//         <div className="fixed inset-0 z-0">
//           <Galaxy />
//         </div>

//         {/* Background Video */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover object-center z-10"
//           src="/videos/landing-mobile.mp4"
//           autoPlay
//           poster="/images/land.png"
//           muted
//           loop
//           playsInline
//         />

//         {/* Gradient overlay for text readability */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-20" />
        
//         {/* Content Container - Text from 2/8 of screen */}
//         <div className="relative z-30 min-h-screen flex flex-col px-6">
//           {/* Text Content - Starting from 2/8 of screen height */}
//           <div className="flex-1 flex flex-col justify-center pt-16 pb-24" style={{ minHeight: '75vh' }}>
//             <div className="max-w-lg">
//             <h1
//               className={`
//                 text-4xl sm:text-5xl md:text-6xl 
//                 font-bold sm:font-extrabold 
//                 text-white 
//                 mb-8 
//                 leading-tight 
//                 tracking-tight 
//                 animate-fade-in-up
//               `}
//               style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
//               >
//               <span className="block">Master</span>
//               <span className="block text-primary-300">Future-Ready</span>
//               <span className="block">Skills</span>
//             </h1>

              
//               <p className="text-xl sm:text-2xl md:text-3xl text-gray-100 mb-12 font-extralight leading-relaxed tracking-wide animate-fade-in-up delay-300" 
//                  style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
//                 Learn Python, Data Science, AI & more – Now in Kadapa!
//               </p>
//             </div>
//           </div>
          
//           {/* Buttons Container - Fixed at Bottom */}
//           <div className="pb-8 animate-fade-in-up delay-500">
//             <div className="flex flex-col gap-4">
//               <a href="#courses" 
//                  className="bg-white text-black px-8 py-5 text-xl font-medium transition-all duration-300 hover:bg-gray-100 tracking-wide rounded-none"
//                  style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
//                 Explore Courses
//               </a>
//               <a  href="#visit-us" type="button" 
//                       className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-5 text-xl font-medium transition-all duration-300 tracking-wide rounded-none"
//                       style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
//                 Join Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for Animations */}
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out forwards;
//           opacity: 0;
//         }
        
//         .delay-300 {
//           animation-delay: 0.2s;
//         }
        
//         .delay-500 {
//           animation-delay: 0.4s;
//         }
//       `}</style>
//     </>
//   );
// }

'use client';

import Galaxy from "@/Galaxy/Galaxy";

export default function Hero() {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block relative bg-black overflow-hidden h-screen">
        {/* Galaxy Background - Only Background */}
        <div className="absolute inset-0 z-0">
          <Galaxy />
        </div>

        {/* Black Gradient Overlay - Half Screen for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent w-1/2 z-10" />
        
        {/* Content Container */}
        <div className="relative z-20 h-full flex items-center">
          <div className="px-6 lg:px-12 xl:px-16">
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-6xl font-light text-white mb-8 leading-tight tracking-tight animate-fade-in-up">
                <span className="block">Empower Your</span>
                <span className="block font-medium">Future</span>
                <span className="block">with Industry-Ready</span>
                <span className="block font-medium">Skills</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-200 mb-10 font-light animate-fade-in-up delay-300">
                Learn Python, Data Science, AI & more – Now in Kadapa!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
                <a href="#courses" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-100 tracking-wide text-center cursor-pointer">
                  Explore Courses
                </a>
                <a href="#visit-us" className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium transition-all duration-300 tracking-wide cursor-pointer">
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block lg:hidden relative bg-black overflow-hidden min-h-screen">
        {/* Galaxy Background - Only Background */}
        <div className="absolute inset-0 z-0">
          <Galaxy />
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
        
        {/* Content Container */}
        <div className="relative z-20 min-h-screen flex flex-col px-6">
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center pt-16 pb-24" style={{ minHeight: '75vh' }}>
            <div className="max-w-lg">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold sm:font-extrabold text-white mb-8 leading-tight tracking-tight animate-fade-in-up"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              >
                <span className="block">Master</span>
                <span className="block text-primary-300">Future-Ready</span>
                <span className="block">Skills</span>
              </h1>
              
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-100 mb-12 font-extralight leading-relaxed tracking-wide animate-fade-in-up delay-300" 
                 style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Learn Python, Data Science, AI & more – Now in Kadapa!
              </p>
            </div>
          </div>
          
          {/* Buttons Container */}
          <div className="pb-8 animate-fade-in-up delay-500">
            <div className="flex flex-col gap-4">
              <a href="#courses" 
                 className="bg-white text-black px-8 py-5 text-xl font-medium transition-all duration-300 hover:bg-gray-100 tracking-wide rounded-none"
                 style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Explore Courses
              </a>
              <a href="#visit-us"
                 className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-5 text-xl font-medium transition-all duration-300 tracking-wide rounded-none"
                 style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
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
        
        .delay-300 {
          animation-delay: 0.2s;
        }
        
        .delay-500 {
          animation-delay: 0.4s;
        }
      `}</style>
    </>
  );
}