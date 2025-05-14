
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, DollarSign, ShieldCheck, Users } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small teams getting started.",
    price: "$9",
    billing: "per user / month",
    features: [
      "500 email processes per month",
      "5 custom categories",
      "Basic email analytics",
      "Standard support",
    ],
    highlight: false,
    cta: "Start Free Trial",
  },
  {
    name: "Business",
    description: "For growing businesses that need more power and flexibility.",
    price: "$29",
    billing: "per user / month",
    features: [
      "Unlimited email processes",
      "20 custom categories",
      "Advanced email analytics",
      "Priority support",
      "Custom integrations",
      "Team collaboration",
    ],
    highlight: true,
    cta: "Start Free Trial",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced security and scaling needs.",
    price: "Custom",
    billing: "contact for pricing",
    features: [
      "Unlimited everything",
      "Dedicated account manager",
      "Custom AI training",
      "Enterprise-grade security",
      "On-premise deployment option",
      "SLA guarantees",
    ],
    highlight: false,
    cta: "Contact Sales",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden border-t border-gray-800">
      <div className="hero-blur opacity-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <DollarSign className="h-5 w-5 text-blue-400" />
            <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400 px-3">
              Pricing
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Businesses. <span className="gradient-text">Scale with Pricing.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing that scales with your needs. Start free, upgrade as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-black/20 border ${
                plan.highlight 
                  ? "border-blue-500/50 shadow-lg shadow-blue-500/10" 
                  : "border-gray-800"
              } rounded-xl overflow-hidden`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0">
                  <Badge className="m-3 bg-blue-500 hover:bg-blue-600">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  {plan.name === "Starter" && <Users size={20} />}
                  {plan.name === "Business" && <CreditCard size={20} />}
                  {plan.name === "Enterprise" && <ShieldCheck size={20} />}
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-400 text-sm ml-1">{plan.billing}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={18} className="text-green-400 mt-0.5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.highlight 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      : ""
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            All plans include a 14-day free trial. No credit card required.
            <br />
            Need a custom solution? <a href="#" className="text-blue-400 hover:underline">Contact our sales team</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
