import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import MacBrowser from "./MacBrowser";
import { useParallax } from "@/hooks/useParallax";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Hero: React.FC = () => {
  const offset = useParallax(0.2);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center px-4 py-24 overflow-hidden"
      style={{
        backgroundColor: "#0f172a",
        backgroundImage: `
          radial-gradient(at calc(70% + ${offset * 0.5}px) calc(0% + ${offset * 0.3}px), hsla(210, 100%, 65%, 0.3) 0px, transparent 50%),
          radial-gradient(at calc(30% - ${offset * 0.3}px) calc(100% - ${offset * 0.2}px), hsla(270, 100%, 65%, 0.2) 0px, transparent 50%)
        `,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="max-w-7xl mx-auto text-center z-10 animate-fade-in">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600/30 to-indigo-600/30 px-5 py-2.5 border border-blue-500/30 backdrop-blur-sm">
          <span className="text-sm font-medium tracking-wide bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
            Coming Soon — Join the Waitlist
          </span>
        </div>
        {/* Headline */}
        <div className="max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl md:text-[3.75rem] font-semibold text-white leading-tight md:leading-[1.1]">
            <div className="relative pl-6 md:pl-10">
              <span className="absolute left-0 top-0 bottom-0  w-[2.5px] bg-gradient-to-b from-blue-400/80 to-transparent" />
              <div className="flex flex-col gap-y-3 text-left">
                <span className="text-gray-200 font-medium tracking-tight">
                  Smarter Video Ads,
                </span>
                <span className="text-white font-bold pb-1">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                    {" "}
                    Higher Conversions.
                  </span>
                </span>
              </div>
            </div>
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-2 leading-relaxed">
          Grow Your Brand & Social Media with Production-Ready Video Ads.
          Powered by Agentic AI.
        </p>
      </div>

      <div className="mt-10 w-full max-w-[60rem] mx-auto px-4">
        {" "}
        <MacBrowser />
      </div>

      <div className="max-w-7xl mx-auto text-center z-10 animate-fade-in">
        {/* Compliance Badges */}
        <div className="flex justify-center gap-8 pt-16">
          {[
            {
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              text: "SOC 2 Type II Certified",
            },
            {
              icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              text: "GDPR/CCPA Compliant",
            },
            {
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              text: "256-bit Encryption",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-2.5 rounded-lg border border-gray-700/50 group-hover:border-blue-400/30 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={item.icon}
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
