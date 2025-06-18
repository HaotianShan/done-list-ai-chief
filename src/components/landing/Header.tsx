
import { Button } from "@/components/ui/button";
import { Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { useScrollContext } from "@/lib/scroll-context";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setDisableAutoScroll } = useScrollContext();
  const isMobile = useIsMobile();

  const handleNavigationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href") || "";
    const element = document.querySelector(targetId);
    setDisableAutoScroll(true);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 bg-background/80 backdrop-blur-lg border-b border-white/10 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="ml-2 font-bold text-lg md:text-xl">Viro AI</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            onClick={handleNavigationClick}
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            How it works
          </a>
          <a
            href="#faq"
            onClick={handleNavigationClick}
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Common Questions
          </a>
          <a
            href="#pricing"
            onClick={handleNavigationClick}
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#waitlist"
            onClick={handleNavigationClick}
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Waitlist
          </a>
        </nav>

        {/* Desktop Contact Button */}
        <Button
          asChild
          variant="outline"
          className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-full border bg-[#201c1c] border-[#201c1c] text-gray-400 hover:bg-[#282424] hover:text-gray-40"
        >
          <a
            href="mailto:service.viro@outlook.com"
            onClick={() => setDisableAutoScroll(true)}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </a>
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-white/10">
          <nav className="flex flex-col p-4 space-y-4">
            <a
              href="#features"
              onClick={handleNavigationClick}
              className="text-sm text-muted-foreground hover:text-white transition-colors py-2"
            >
              How it works
            </a>
            <a
              href="#faq"
              onClick={handleNavigationClick}
              className="text-sm text-muted-foreground hover:text-white transition-colors py-2"
            >
              Common Questions
            </a>
            <a
              href="#pricing"
              onClick={handleNavigationClick}
              className="text-sm text-muted-foreground hover:text-white transition-colors py-2"
            >
              Pricing
            </a>
            <a
              href="#waitlist"
              onClick={handleNavigationClick}
              className="text-sm text-muted-foreground hover:text-white transition-colors py-2"
            >
              Waitlist
            </a>
            <Button
              asChild
              variant="outline"
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full border bg-[#201c1c] border-[#201c1c] text-gray-400 hover:bg-[#282424] hover:text-gray-40 mt-4"
            >
              <a
                href="mailto:service.viro@outlook.com"
                onClick={() => {
                  setDisableAutoScroll(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                <Mail className="w-4 h-4" />
                <span>Contact Us</span>
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
