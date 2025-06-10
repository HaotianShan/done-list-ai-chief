import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { joinWaitlist } from "@/services/waitlist";
import { Loader2 } from "lucide-react";
import { Line } from "react-chartjs-2";
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
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Impressions",
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#3b82f6",
        pointBorderWidth: 2,
      },
      {
        label: "Clicks",
        data: [300, 700, 1200, 1800, 900, 1500, 2500],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#8b5cf6",
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#fff",
          font: {
            family: "Inter, sans-serif",
          },
          boxWidth: 12,
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9ca3af",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#9ca3af",
        },
      },
    },
  };

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
                  AI That Handles Your
                </span>
                <span className="text-white font-bold pb-1">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                    Entire Inbox
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
            Unlock premium features for free during beta period. Limited
            availability.
          </p>
        </div>

        {/* Mac Browser Mockup */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="mac-mockup rounded-lg overflow-hidden shadow-2xl shadow-blue-500/10 border border-gray-800/50">
            {/* Browser Chrome */}
            <div className="browser-chrome bg-gray-800/70 border-b border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center px-4 py-3">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex-1 bg-gray-700/50 rounded-md px-3 py-1.5 text-xs text-gray-400">
                  app.yourproduct.com/dashboard
                </div>
              </div>
            </div>

            {/* Browser Content */}
            <div className="browser-content bg-gray-900 p-6">
              {/* Chart */}
              <div className="h-64 w-full">
                <Line data={chartData} options={chartOptions} />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
                  <div className="text-gray-400 text-sm mb-1">Total Views</div>
                  <div className="text-2xl font-bold text-white">24,589</div>
                  <div className="text-blue-400 text-xs mt-1 flex items-center">
                    <span>↑ 12.4% from last month</span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
                  <div className="text-gray-400 text-sm mb-1">Total Clicks</div>
                  <div className="text-2xl font-bold text-white">8,742</div>
                  <div className="text-purple-400 text-xs mt-1 flex items-center">
                    <span>↑ 8.2% from last month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
