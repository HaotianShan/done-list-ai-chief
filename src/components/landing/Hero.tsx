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
            description:
              "We'll be in touch when early access becomes available.",
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
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
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
            <span className="block text-sm md:text-base font-medium text-gray-400 mb-4 tracking-wider uppercase">
              Enterprise Email Automation
            </span>
            <div className="relative pl-6 md:pl-10">
              <span className="absolute left-0 top-0 bottom-0  w-[2.5px] bg-gradient-to-b from-blue-400/80 to-transparent" />
              <div className="flex flex-col gap-y-3 text-left">
                <span className="text-gray-200 font-medium tracking-tight">
                  AI Handles Your Inbox,
                </span>
                <span className="text-white font-bold pb-1">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                    You Own
                  </span>{" "}
                  <span className="inline-block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent leading-[1.2]">
                    the High-Stakes
                  </span>
                </span>
              </div>
            </div>
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Let AI Agents Automate Email Follow-Ups, Prioritize Tasks, and
          Visualize Deadlines—So You Focus on What Truly Moves the Needle.
        </p>
        {/* Waitlist Form */}
        <div className="relative max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 mb-4"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter professional email..."
              className="h-14 bg-gray-800/50 border-gray-700 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 text-gray-200 placeholder:text-gray-500 flex-grow text-lg rounded-xl backdrop-blur-sm"
              required
            />
            <Button
              type="submit"
              className="h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-lg rounded-xl px-8 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Securing Access...
                </>
              ) : (
                "Join Priority Waitlist"
              )}
            </Button>
          </form>
          <p className="text-sm text-gray-500">
            Trusted by executives from Fortune 500 companies. Zero spam, strict
            confidentiality.
          </p>
        </div>

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
