// import Hero from "@/components/Hero";
// import About from "@/components/About";
// import WhyChoose from "@/components/WhyChoose";
// import Courses from "@/components/Courses";
// // import SuccessStories from "@/components/SuccessStories";
// import VisitUs from "@/components/VisitUs";
// import CallToAction from "@/components/CallToAction";
// import AIModal from "@/components/AiModal";
// import Footer from "@/components/Footer";

// export default function Home() {
//   return (
//     <>
//       <section id="home">
//         <Hero />
//       </section>
//       <section id="about">
//         <About />
//       </section>
//       <section id="why-choose">
//         <WhyChoose />
//       </section>    
//       <section id="courses">
//         <Courses />
//       </section>
//       {/* <section id="features">
//         <Features />
//       </section> */}
//       <section id="visit-us">
//         <VisitUs />
//       </section>
//       <section id="call-to-action">
//         <CallToAction />
//       </section>
//       <Footer />
//       <AIModal courseData={undefined} quickQuestions={undefined} />
//     </>
//   );
// }

import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import Courses from "@/components/Courses";
// import SuccessStories from "@/components/SuccessStories";
import VisitUs from "@/components/VisitUs";
import CallToAction from "@/components/CallToAction";
import AIModal from "@/components/AiModal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Hero is now fixed/absolute positioned via internal styling */}
      <section id="home">
        <Hero />
      </section>
      
      {/* Spacer to account for the fixed hero */}
      <div className="h-screen" />
      
      {/* Content sections with proper z-index layering */}
      <div className="relative z-10 bg-white">
        <section id="about">
          <About />
        </section>
        <section id="why-choose">
          <WhyChoose />
        </section>    
        <section id="courses">
          <Courses />
        </section>
        {/* <section id="features">
          <Features />
        </section> */}
        <section id="visit-us">
          <VisitUs />
        </section>
        <section id="call-to-action">
          <CallToAction />
        </section>
        <Footer />
      </div>
      
      <AIModal courseData={undefined} quickQuestions={undefined} />
    </>
  );
}