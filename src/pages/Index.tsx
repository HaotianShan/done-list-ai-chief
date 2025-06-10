import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
// import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import StickyBar from "@/components/landing/StickyBar";
import AICustomization from "@/components/landing/AICustomization";
import Pricing from "@/components/landing/Pricing";
import Security from "@/components/landing/Security";
import AIHandleEverything from "@/components/landing/AIHandleEverything";
import InteractiveDemo from "@/components/landing/InteractiveDemo";
import CategoriesAILeavesToYou from "@/components/landing/CategoriesAILeavesToYou";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <Hero />
    <AICustomization />
    <AIHandleEverything />
    <InteractiveDemo />
    <CategoriesAILeavesToYou />
    <Pricing />
    <Security />
    {/* <Testimonials /> */}
    <FAQ />
    <CTA />
    <Footer />
    <StickyBar />
  </div>
);

export default Index;
