
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Success! You've been added to our waitlist.", {
        description: "We'll notify you when early access becomes available.",
      });
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-24 px-4 relative" id="waitlist">
      <div className="hero-blur opacity-10"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Be among the first to experience 
          <br />
          <span className="gradient-text">your AI Chief of Staff</span>
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Join the waitlist today and get priority access when we launch. 
          The earlier you join, the sooner you'll be able to delegate your busywork.
        </p>
        
        <div className="bg-secondary/30 p-8 md:p-12 rounded-2xl border border-white/10 max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your professional email..."
              className="h-12 bg-background/50 border-white/10 focus-visible:ring-2 focus-visible:ring-primary"
              required
            />
            <Button 
              type="submit" 
              className="h-12 bg-button-gradient hover:opacity-90 transition-opacity"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Joining..." : "Join the Waitlist →"}
            </Button>
          </form>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
            </svg>
            <span>We respect your privacy. Unsubscribe at any time.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
