'use client';

export default function Hero() {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block relative bg-white overflow-hidden h-screen">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/landing-2.mp4"
          poster="/images/land.png"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Black Gradient Overlay - Half Screen */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent w-1/2" />
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="px-6 lg:px-12 xl:px-16">
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-6xl font-light text-white mb-8 leading-tight tracking-tight animate-fade-in-up">
                <span className="block">Empower Your</span>
                <span className="block font-medium">Future</span>
                <span className="block">with Industry-Ready</span>
                <span className="block font-medium">Skills</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-200 mb-10 font-light animate-fade-in-up delay-300">
                Learn Java, Web Development, Digital Marketing & more – Now in Kadapa!
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

      {/* Mobile Version - Buttons at Bottom, Larger Text */}
      <div className="block lg:hidden relative bg-white overflow-hidden min-h-screen">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="/videos/landing-mobile-2.mp4"
          autoPlay
          poster="/images/land.png"
          muted
          loop
          playsInline
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        
        {/* Content Container - Text from 2/8 of screen */}
        <div className="relative z-10 min-h-screen flex flex-col px-6">
          {/* Text Content - Starting from 2/8 of screen height */}
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
              
              <p 
                className="text-xl sm:text-2xl md:text-3xl text-gray-100 mb-12 font-extralight leading-relaxed tracking-wide animate-fade-in-up delay-300" 
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              >
                Learn Java, Web Development, Digital Marketing & more – Now in Kadapa!
              </p>
            </div>
          </div>
          
          {/* Buttons Container - Fixed at Bottom */}
          <div className="pb-8 animate-fade-in-up delay-500">
            <div className="flex flex-col gap-4">
              <a 
                href="#courses" 
                className="bg-white text-black px-8 py-5 text-xl font-medium transition-all duration-300 hover:bg-gray-100 tracking-wide rounded-none"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              >
                Explore Courses
              </a>
              <a  
                href="#visit-us" 
                type="button" 
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-5 text-xl font-medium transition-all duration-300 tracking-wide rounded-none"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}