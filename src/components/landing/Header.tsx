import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 bg-background/80 backdrop-blur-lg border-b border-white/10 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="ml-2 font-bold text-xl">Viro AI </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            How it works
          </a>
          <a
            href="#faq"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Common Questions
          </a>
          <a
            href="#waitlist"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Waitlist
          </a>
        </nav>

        <Button
          variant="outline"
          className="flex items-center space-x-2 px-4 py-2 rounded-full border bg-[#201c1c] border-[#201c1c] text-gray-400 hover:bg-[#282424] hover:text-gray-40"
          onClick={() => {
            const element = document.getElementById("waitlist");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Join Waitlist</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
