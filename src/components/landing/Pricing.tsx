
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Video, BarChart2, Rocket, Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individuals getting started",
    price: "$O",
    billing: "per month",
    features: ["3 videos per month", "720p resolution", "AI Agents included"],
    exclusions: ["Add Logo/Branding", "Edit Specific Scenes", "Analytics"],
    highlight: false,
  },
  {
    name: "Creator",
    description: "For content creators needing more volume",
    price: "$29",
    billing: "per month",
    features: [
      "20 videos per month",
      "1080p resolution",
      "Add Logo/Branding",
      "No watermark",
      "Basic analytics",
    ],
    exclusions: ["Edit Specific Scenes", "Priority Support"],
    highlight: false,
  },
  {
    name: "Growth",
    description: "For businesses scaling social presence",
    price: "$59",
    billing: "per month",
    features: [
      "40 videos per month",
      "1080p resolution",
      "Add Logo/Branding",
      "Full Branding Kit",
      "Edit Specific Scenes",
      "No watermark",
      "AI Agents included",
      "Advanced analytics",
    ],
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Scale",
    description: "Advanced needs with premium support",
    price: "Custom",
    features: [
      "Custom Video Production",
      "1080p resolution",
      "Add Logo/Branding",
      "Full Branding Kit",
      "Edit Specific Scenes",
      "No watermark",
      "AI Agents included",
      "Advanced analytics",
      "Dedicated Account Manager",
      "Priority Support",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-12 md:py-20 px-4 relative overflow-hidden bg-[rgba(0,0,0)]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <Badge
              variant="outline"
              className="bg-purple-500/10 border-purple-500/30 text-purple-400 px-3"
            >
              Pricing
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 px-4">
            Simple Pricing for{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Every Business
            </span>
          </h2>

          <div className="mb-8 md:mb-12 text-center">
            <div className="bg-transparent rounded-lg max-w-3xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-green-500/20 p-1.5 rounded-full">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-muted-foreground">
                    7-day free trial on all plans
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-green-500/20 p-1.5 rounded-full">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-muted-foreground">
                    Full-refund guarantee
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 opacity-80">
                Not satisfied? Email us the video for a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: Stack cards vertically, Desktop: Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col h-full bg-black/20 border rounded-xl overflow-hidden transition-all ${
                plan.highlight
                  ? "border-purple-500/50 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/30"
                  : "border-gray-800"
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0">
                  <Badge className="m-3 bg-purple-500 hover:bg-purple-600 text-xs">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="p-4 md:p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  {plan.name === "Starter" && (
                    <Sparkles size={20} className="text-purple-400 flex-shrink-0" />
                  )}
                  {plan.name === "Creator" && (
                    <Video size={20} className="text-blue-400 flex-shrink-0" />
                  )}
                  {plan.name === "Growth" && (
                    <BarChart2 size={20} className="text-green-400 flex-shrink-0" />
                  )}
                  {plan.name === "Scale" && (
                    <Rocket size={20} className="text-orange-400 flex-shrink-0" />
                  )}
                  <h3 className="text-lg md:text-xl font-bold">{plan.name}</h3>
                </div>

                <p className="text-gray-400 text-sm mb-4 md:mb-5">{plan.description}</p>

                <div className="mb-4 md:mb-5">
                  <div className="flex items-baseline">
                    <span className="text-2xl md:text-3xl font-bold">{plan.price}</span>
                    {plan.billing && (
                      <span className="text-gray-400 text-sm ml-1">
                        {plan.billing}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-grow mb-4 md:mb-5 space-y-3">
                  <h4 className="font-medium text-gray-300 text-sm">Includes:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check
                          size={16}
                          className="text-green-400 mt-0.5 shrink-0"
                        />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.exclusions && plan.exclusions.length > 0 && (
                    <>
                      <h4 className="font-medium text-gray-300 mt-4 text-sm">
                        Not included:
                      </h4>
                      <ul className="space-y-2">
                        {plan.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-sm text-gray-500">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
