import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-xl">Mercury Flow </span>
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
          className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary/50"
          onClick={() => {
            const element = document.getElementById("waitlist");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Join Waitlist
        </Button>
      </div>
    </header>
  );
};

export default Header;
