import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const StickyBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("waitlist");
      const scrollPosition = window.scrollY;

      if (heroSection) {
        const heroTop = heroSection.offsetTop;
        setIsVisible(scrollPosition > 500 && scrollPosition < heroTop - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-white/10 p-4 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm sm:text-base">
          Get early access to the Viro AI
        </div>
        <Button
          className="bg-button-gradient hover:opacity-90 transition-opacity"
          size="sm"
          onClick={() => {
            const element = document.getElementById("waitlist");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Join Waitlist →
        </Button>
      </div>
    </div>
  );
};

export default StickyBar;
