import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { joinWaitlist } from "@/services/waitlist";
import { Loader2, Lock } from "lucide-react";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const result = await joinWaitlist(email);

      if (result.success) {
        if (result.alreadyJoined) {
          toast.success("You're already on our waitlist!", {
            description:
              "We'll be in touch when early access becomes available.",
          });
        } else {
          toast.success("Success! You've been added to our waitlist.", {
            description: "Stay tuned for launch news, perks, and surprises!",
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
    <section className="py-28 px-4 relative overflow-hidden" id="waitlist">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-primary/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-primary/10 rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
            Get Early Access to
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
              Viro AI
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join the First Wave of Founders Revolutionizing Their Social Media
            Growth. Professional Ads at Your Fingertips.
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary/30 to-card/50 backdrop-blur-sm p-10 md:p-12 rounded-3xl border border-white/10 shadow-xl max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your professional email..."
                className="h-14 bg-background/80 border-white/15 focus-visible:ring-2 focus-visible:ring-primary flex-grow text-base rounded-xl"
                required
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="h-14 bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 transition-all duration-300 shadow-lg shadow-primary/20 rounded-xl"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join Waitlist →"
                )}
              </Button>
            </div>

            {/* Restructured social proof section */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground opacity-80">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500">
                  ✓
                </div>
                <span>Early access benefits</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {/* Added profile images with professional avatars */}
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  />
                </div>
                <span>Join 1,200+ professionals</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;
