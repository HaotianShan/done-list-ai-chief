
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { joinWaitlist } from "@/services/waitlist";
import { Loader2 } from "lucide-react";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await joinWaitlist(email);
      
      if (result.success) {
        if (result.alreadyJoined) {
          toast.success("You're already on our waitlist!", {
            description: "We'll be in touch when early access becomes available.",
          });
        } else {
          toast.success("Success! You've been added to our waitlist.", {
            description: "Check your inbox for a confirmation email.",
          });
        }
        setEmail("");
      } else {
        toast.error("Something went wrong", {
          description: result.error || "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("Failed to join the waitlist", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-24 overflow-hidden">
      <div className="hero-blur"></div>
      
      <div className="max-w-5xl mx-auto text-center z-10 animate-fade-in">
        <span className="inline-block text-primary font-semibold mb-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Coming Soon — Join the Waitlist
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6">
          From To-Do Lists to <span className="gradient-text">Done</span> Lists: Meet Your AI Chief of Staff
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          The world's first AI assistant that <em>acts</em> on your behalf—managing emails, tasks, and schedules with human-like intuition.
        </p>
        
        <div className="relative max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your professional email..."
              className="h-12 bg-secondary border-0 focus-visible:ring-2 focus-visible:ring-primary flex-grow"
              required
            />
            <Button 
              type="submit" 
              className="h-12 bg-button-gradient hover:opacity-90 transition-opacity"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join the Waitlist →"
              )}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            Be first to delegate your busywork. Exclusive perks for early users.
          </p>
        </div>
        
        <div className="flex justify-center gap-8 pt-12">
          <div className="flex items-center gap-2">
            <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-sm">Enterprise-grade security</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-sm">GDPR/CCPA Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
