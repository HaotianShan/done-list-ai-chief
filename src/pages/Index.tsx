import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
// import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import StickyBar from "@/components/landing/StickyBar";
import Pricing from "@/components/landing/Pricing";
import LiveViewComponent from "@/components/landing/LiveUserGlobe";
import VideoSection from "@/components/landing/VideoDemo";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <Hero />
    <VideoSection />
    {/* <LiveViewComponent /> */}

    <Pricing />
    <FAQ />
    <CTA />
    <Footer />
    <StickyBar />
  </div>
);

export default Index;
