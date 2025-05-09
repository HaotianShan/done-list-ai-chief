import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ValueProposition from "@/components/landing/ValueProposition";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import StickyBar from "@/components/landing/StickyBar";
import InboxDemo from "@/components/landing/InboxDemo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <InboxDemo />
      <Features />
      <ValueProposition />

      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <StickyBar />
    </div>
  );
};

export default Index;
