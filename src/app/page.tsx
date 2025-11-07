import Hero from "@/components/Hero";
import About from "@/components/About";
import TestInfo from "@/components/TestInfo";
import WhyChoose from "@/components/WhyChoose";
import Courses from "@/components/Courses";
// import SuccessStories from "@/components/SuccessStories";
import VisitUs from "@/components/VisitUs";
import CallToAction from "@/components/CallToAction";
import AIModal from "@/components/AiModal";
import Footer from "@/components/Footer";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exameets Skillverse Academy | Best Tech Training in Kadapa',
  description: `Transform your career with Exameets Skillverse Academy in Kadapa.
    Expert-led courses in Java, MERN, Web Development, Digital Marketing, Python, and more. 
    Hands-on labs, mock interviews, and career support included.`,
  keywords: 'Exameets, Exameets Skillverse, Exameets Skillverse Academy, Skillverse Academy, Computer Coaching, Software Training in Kadapa, IT course in Kadapa, Best Computer Training in Kadapa, Java Full Stack in Kadapa, AI & ML Course in Kadapa, Data Science Course in Kadapa, Python Full Stack in Kadapa, MERN Full Stack in Kadapa, Digital Marketing Course in Kadapa, Advanced MS Office in Kadapa, Career Guidance in Kadapa',
  authors: [{ name: 'Exameets Skillverse Academy' }],
  publisher: 'Exameets Skillverse Academy',
  robots: 'index, follow',
  openGraph: {
    title: 'Exameets Skillverse Academy - Your Path to Tech Dream',
    description: 'Comprehensive exam preparation courses and practice tests',
    url: 'https://skillverse.exameets.in',
    siteName: 'Exameets Skillverse Academy',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://skillverse.exameets.in/'
  }
};

export default function Home() {
  return (
    <>
    <h1>Best Tech and Software Training in Kadapa</h1>

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
        <section id="test-info">
          <TestInfo />
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