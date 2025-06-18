
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Pricing = () => {
  const isMobile = useIsMobile();

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses getting started",
      features: [
        "10 AI-generated video ads per month",
        "Basic templates library",
        "720p video quality",
        "Email support",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "50 AI-generated video ads per month",
        "Premium templates library",
        "1080p video quality",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "A/B testing",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large organizations",
      features: [
        "Unlimited AI-generated video ads",
        "Custom templates creation",
        "4K video quality",
        "Dedicated account manager",
        "White-label solution",
        "API access",
        "Advanced integrations",
        "Custom AI training",
      ],
      popular: false,
    },
    {
      name: "Agency",
      price: "$499",
      period: "/month",
      description: "For marketing agencies",
      features: [
        "Unlimited video ads for clients",
        "Multi-client dashboard",
        "White-label platform",
        "Custom AI models",
        "Dedicated support team",
        "Revenue sharing program",
        "Advanced reporting",
        "Client management tools",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Choose Your Plan
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Select the perfect plan for your business needs. Start creating
            professional video ads today.
          </p>
        </div>

        <div className={`grid gap-4 sm:gap-6 ${
          isMobile 
            ? "grid-cols-1 sm:grid-cols-2" 
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}>
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative h-full flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg sm:text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-2xl sm:text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 sm:space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "variant-outline"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <Button variant="link" className="text-primary">
            Compare all features →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
