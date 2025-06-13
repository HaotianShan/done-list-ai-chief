import React, { useState, useRef, useEffect } from "react";

const VideoSection = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setOffset({
      x: (x - 0.5) * 40, // -20px to +20px range
      y: (y - 0.5) * 20, // -10px to +10px range
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 transition-all duration-300"
      style={{
        backgroundImage:
          "url(https://storage.googleapis.com/pinhole-about-assets-prod-us/video-section/background.webp)",
      }}
    >
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Viro AI makes video Ads creation simple for small businesses.
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Effortlessly create high-converting social media Ads to attract
          traffic and grow your business—powered by AI Agents.
        </p>

        <div className="aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/A0VttaLy4sU?si=rtRuDi6lKIhEj1PD"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
