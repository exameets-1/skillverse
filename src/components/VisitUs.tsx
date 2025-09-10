// 'use client';

// import { MapPin, Phone, Mail, Clock } from 'lucide-react';

// export default function VisitUs() {
//   return (
//     <>
//       {/* Desktop Version */}
//       <section className="hidden lg:block py-20 lg:py-32 bg-white">
//         <div className="max-w-6xl mx-auto px-6 lg:px-8">
//           {/* Header */}
//           <div className="text-center mb-20 animate-fade-in-up">
//             <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
//               Visit Us in{' '}
//               <span className="font-medium text-black">
//                 Kadapa
//               </span>
//             </h2>
//             <p className="text-lg text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
//               We&apos;re conveniently located in the heart of Kadapa, making it easy for you to access quality education. 
//               Stop by for a consultation or connect with us directly.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-16 items-start">
//             {/* Contact Information - Left Side */}
//             <div className="space-y-12 animate-fade-in-up delay-300">
//               {/* Our Location */}
//               <div>
//                 <div className="flex items-center mb-6">
//                   <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4">
//                     <MapPin className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="text-xl font-medium text-black tracking-tight">Our Location</h3>
//                 </div>
//                 <div className="ml-14 space-y-2">
//                   <p className="font-medium text-black text-lg">Exameets Skillverse Academy</p>
//                   <p className="text-gray-600 font-light">3rd Floor, Vasavee Towers,</p>
//                   <p className="text-gray-600 font-light">Near Apsara Circle, Sankarapuram,</p>
//                   <p className="text-gray-600 font-light">Kadapa 516002</p>
//                 </div>
//               </div>

//               {/* Contact Us */}
//               <div>
//                 <h3 className="text-xl font-medium text-black mb-6 tracking-tight">Contact Us</h3>
//                 <div className="space-y-4">
//                   {/* Phone */}
//                   <div className="flex items-center">
//                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
//                       <Phone className="w-3 h-3 text-black" />
//                     </div>
//                     <div>
//                       <p className="text-gray-500 font-light text-sm">Phone/WhatsApp</p>
//                       <p className="font-medium text-black">6302189118</p>
//                     </div>
//                   </div>

//                   {/* Email */}
//                   <div className="flex items-center">
//                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
//                       <Mail className="w-3 h-3 text-black" />
//                     </div>
//                     <div>
//                       <p className="text-gray-500 font-light text-sm">Email</p>
//                       <p className="font-medium text-black">info@exameets.com</p>
//                     </div>
//                   </div>

//                   {/* Hours */}
//                   <div className="flex items-center">
//                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
//                       <Clock className="w-3 h-3 text-black" />
//                     </div>
//                     <div>
//                       <p className="text-gray-500 font-light text-sm">Open Hours</p>
//                       <p className="font-medium text-black">Monday - Saturday, 9 AM - 6 PM</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Call to Action */}
//               <div className="pt-8">
//                 <button className="bg-black text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-800 tracking-wide">
//                   Schedule a Visit
//                 </button>
//               </div>
//             </div>

//             {/* Map - Right Side */}
//             <div className="animate-fade-in-up delay-500">
//               <div className="border border-gray-200 overflow-hidden h-96 lg:h-[500px]">
//                 <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3863.146624041391!2d78.8368227!3d14.476268699999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb37307ead7322f%3A0x82ddc10c9183ddd0!2sExameets%20Skillverse%20Academy%20-%20Software%20Training%20in%20Kadapa!5e0!3m2!1sen!2sin!4v1757446303130!5m2!1sen!2sin"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen={true}
//                   // loading="lazy" // Removed for browser compatibility
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="Exameets Skillverse Academy Location"
//                 ></iframe>
//               </div>
//               <div className="mt-4 text-center">
//                 <p className="text-gray-500 font-light text-sm">
//                   Click on the map to open in Google Maps for directions
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mobile Version */}
//       <section className="block lg:hidden py-16 bg-white">
//         <div className="px-6">
//           {/* Header */}
//           <div className="text-center mb-12 animate-fade-in-up">
//             <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 tracking-tight">
//               Visit Us in{' '}
//               <span className="font-medium text-black">
//                 Kadapa
//               </span>
//             </h2>
//             <p className="text-base text-gray-600 leading-relaxed font-light">
//               We&apos;re conveniently located in the heart of Kadapa, making it easy for you to access quality education. 
//               Stop by for a consultation or connect with us directly.
//             </p>
//           </div>

//           {/* Map */}
//           <div className="mb-12 animate-fade-in-up delay-300">
//             <div className="border border-gray-200 overflow-hidden h-64">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3863.146624041391!2d78.8368227!3d14.476268699999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb37307ead7322f%3A0x82ddc10c9183ddd0!2sExameets%20Skillverse%20Academy%20-%20Software%20Training%20in%20Kadapa!5e0!3m2!1sen!2sin!4v1757446303130!5m2!1sen!2sin"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen={true}
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Exameets Skillverse Academy Location"
//               ></iframe>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="space-y-8 animate-fade-in-up delay-500">
//             {/* Our Location */}
//             <div className="border border-gray-100 p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3">
//                   <MapPin className="w-3 h-3 text-white" />
//                 </div>
//                 <h3 className="text-lg font-medium text-black tracking-tight">Our Location</h3>
//               </div>
//               <div className="ml-11 space-y-1">
//                 <p className="font-medium text-black">Exameets Skillverse Academy</p>
//                 <p className="text-gray-600 font-light text-sm">3rd Floor, Vasavee Towers,</p>
//                 <p className="text-gray-600 font-light text-sm">Near Apsara Circle, Sankarapuram,</p>
//                 <p className="text-gray-600 font-light text-sm">Kadapa 516002</p>
//               </div>
//             </div>

//             {/* Contact Details */}
//             <div className="border border-gray-100 p-6">
//               <h3 className="text-lg font-medium text-black mb-4 tracking-tight">Contact Us</h3>
//               <div className="space-y-3">
//                 {/* Phone */}
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
//                     <Phone className="w-2.5 h-2.5 text-black" />
//                   </div>
//                   <div>
//                     <p className="text-gray-500 font-light text-xs">Phone/WhatsApp</p>
//                     <p className="font-medium text-black text-sm">6302189118</p>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
//                     <Mail className="w-2.5 h-2.5 text-black" />
//                   </div>
//                   <div>
//                     <p className="text-gray-500 font-light text-xs">Email</p>
//                     <p className="font-medium text-black text-sm">info@exameets.com</p>
//                   </div>
//                 </div>

//                 {/* Hours */}
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
//                     <Clock className="w-2.5 h-2.5 text-black" />
//                   </div>
//                   <div>
//                     <p className="text-gray-500 font-light text-xs">Open Hours</p>
//                     <p className="font-medium text-black text-sm">Monday - Saturday, 9 AM - 6 PM</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Call to Action */}
//             <div className="text-center">
//               <button className="w-full bg-black text-white px-6 py-3 text-base font-medium transition-all duration-300 hover:bg-gray-800 tracking-wide">
//                 Schedule a Visit
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Custom CSS for Animations */}
//       <style jsx>{`
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
        
//         .delay-300 { animation-delay: 0.2s; }
//         .delay-500 { animation-delay: 0.4s; }
//       `}</style>
//     </>
//   );
// }

'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function VisitUs() {
  return (
    <>
      {/* Desktop Version */}
      <section className="hidden lg:block py-20 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Visit Us in{' '}
              <span className="font-medium text-black">
                Kadapa
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
              We&apos;re conveniently located in the heart of Kadapa, making it easy for you to access quality education. 
              Stop by for a consultation or connect with us directly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Map - Left Side */}
            <div className="animate-fade-in-up delay-300">
              <div className="border border-gray-200 overflow-hidden h-96 lg:h-[500px]">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3863.146624041391!2d78.8368227!3d14.476268699999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb37307ead7322f%3A0x82ddc10c9183ddd0!2sExameets%20Skillverse%20Academy%20-%20Software%20Training%20in%20Kadapa!5e0!3m2!1sen!2sin!4v1757446303130!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Exameets Skillverse Academy Location"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-500 font-light text-sm">
                  Click on the map to open in Google Maps for directions
                </p>
              </div>
            </div>

            {/* Contact Information - Right Side */}
            <div className="space-y-12 animate-fade-in-up delay-500">
              {/* Our Location */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-black tracking-tight">Our Location</h3>
                </div>
                <div className="ml-14 space-y-2">
                  <p className="font-medium text-black text-lg">Exameets Skillverse Academy</p>
                  <p className="text-gray-600 font-light">3rd Floor, Vasavee Towers,</p>
                  <p className="text-gray-600 font-light">Near Apsara Circle, Sankarapuram,</p>
                  <p className="text-gray-600 font-light">Kadapa 516002</p>
                </div>
              </div>

              {/* Contact Us */}
              <div>
                <h3 className="text-xl font-medium text-black mb-6 tracking-tight">Contact Us</h3>
                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-3 h-3 text-black" />
                    </div>
                    <div>
                      <p className="text-gray-500 font-light text-sm">Phone/WhatsApp</p>
                      <p className="font-medium text-black">6302189118</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-3 h-3 text-black" />
                    </div>
                    <div>
                      <p className="text-gray-500 font-light text-sm">Email</p>
                      <p className="font-medium text-black">info@exameets.in</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="w-3 h-3 text-black" />
                    </div>
                    <div>
                      <p className="text-gray-500 font-light text-sm">Open Hours</p>
                      <p className="font-medium text-black">Monday - Saturday, 9 AM - 6 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              {/* <div className="pt-8">
                <button className="bg-black text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-800 tracking-wide">
                  Schedule a Visit
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section className="block lg:hidden py-16 bg-white">
        <div className="px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 tracking-tight">
              Visit Us in{' '}
              <span className="font-medium text-black">
                Kadapa
              </span>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              We&apos;re conveniently located in the heart of Kadapa, making it easy for you to access quality education. 
              Stop by for a consultation or connect with us directly.
            </p>
          </div>

          {/* Map */}
          <div className="mb-12 animate-fade-in-up delay-300">
            <div className="border border-gray-200 overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3863.146624041391!2d78.8368227!3d14.476218699999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb37307ead7322f%3A0x82ddc10c9183ddd0!2sExameets%20Skillverse%20Academy%20-%20Software%20Training%20in%20Kadapa!5e0!3m2!1sen!2sin!4v1757446303130!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
                title="Exameets Skillverse Academy Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up delay-500">
            {/* Our Location */}
            <div className="border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-lg font-medium text-black tracking-tight">Our Location</h3>
              </div>
              <div className="ml-11 space-y-1">
                <p className="font-medium text-black">Exameets Skillverse Academy</p>
                <p className="text-gray-600 font-light text-sm">3rd Floor, Vasavee Towers,</p>
                <p className="text-gray-600 font-light text-sm">Near Apsara Circle, Sankarapuram,</p>
                <p className="text-gray-600 font-light text-sm">Kadapa 516002</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="border border-gray-100 p-6">
              <h3 className="text-lg font-medium text-black mb-4 tracking-tight">Contact Us</h3>
              <div className="space-y-3">
                {/* Phone */}
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Phone className="w-2.5 h-2.5 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-500 font-light text-xs">Phone/WhatsApp</p>
                    <p className="font-medium text-black text-sm">6302189118</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Mail className="w-2.5 h-2.5 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-500 font-light text-xs">Email</p>
                    <p className="font-medium text-black text-sm">info@exameets.in</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Clock className="w-2.5 h-2.5 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-500 font-light text-xs">Open Hours</p>
                    <p className="font-medium text-black text-sm">Monday - Saturday, 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            {/* <div className="text-center">
              <button className="w-full bg-black text-white px-6 py-3 text-base font-medium transition-all duration-300 hover:bg-gray-800 tracking-wide">
                Schedule a Visit
              </button>
            </div> */}
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
      `}</style>
    </>
  );
}