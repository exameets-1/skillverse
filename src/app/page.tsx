import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import Courses from "@/components/Courses";
import SuccessStories from "@/components/SuccessStories";
import VisitUs from "@/components/VisitUs";
import CallToAction from "@/components/CallToAction";
export default function Home() {
  return (
    <>
    <section id="home">
      <Hero />
    </section>
    <section id="about">
      <About />
    </section>
    <section id="why-choose">
      <WhyChoose />
    </section>    
    <section id="courses">
      <Courses />
    </section>
    <section id="success-stories">
      <SuccessStories />
    </section>
    <section id="visit-us">
      <VisitUs />
    </section>
    <section id="call-to-action">
      <CallToAction />
    </section>
    </>
  );
}