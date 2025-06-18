
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, Brain, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const AgentSystemVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useIsMobile();

  const steps = [
    {
      id: 1,
      title: "AI Content Analysis",
      description: "Our AI analyzes your brand, audience, and objectives to understand your unique needs",
      icon: Brain,
      color: "bg-blue-500",
      details: ["Brand voice analysis", "Audience profiling", "Goal optimization"]
    },
    {
      id: 2,
      title: "Smart Script Generation",
      description: "Generates compelling scripts tailored to your brand voice and target audience",
      icon: Zap,
      color: "bg-green-500",
      details: ["Persuasive copywriting", "Brand consistency", "A/B test variants"]
    },
    {
      id: 3,
      title: "Visual Optimization",
      description: "Creates stunning visuals that align with your brand and capture attention",
      icon: Target,
      color: "bg-purple-500",
      details: ["Brand-aligned design", "Attention optimization", "Visual storytelling"]
    },
    {
      id: 4,
      title: "Performance Tracking",
      description: "Monitors performance and automatically optimizes for better results",
      icon: TrendingUp,
      color: "bg-orange-500",
      details: ["Real-time analytics", "Auto-optimization", "ROI tracking"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs sm:text-sm">
            How it works
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            AI Agents Working
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block sm:inline sm:ml-3">
              For You
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Our intelligent system combines multiple AI agents to create, optimize, 
            and manage your video advertising campaigns automatically.
          </p>
        </div>

        <div className={`grid gap-4 sm:gap-6 lg:gap-8 ${
          isMobile 
            ? "grid-cols-1 sm:grid-cols-2" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        }`}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            
            return (
              <Card
                key={step.id}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-lg border-2 ${
                  isActive 
                    ? "border-primary shadow-lg scale-105 bg-white dark:bg-slate-800" 
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${step.color} transition-all duration-300 ${
                        isActive ? "scale-110 shadow-lg" : "group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {isActive && (
                      <div className="w-full pt-3 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                        <ul className="space-y-1.5">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === activeStep 
                    ? "bg-primary scale-125" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border max-w-2xl mx-auto">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">
              Why Choose AI Agents?
            </h4>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Traditional advertising requires constant manual optimization. Our AI agents work 24/7, 
              continuously learning and improving your campaigns while you focus on growing your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSystemVisualization;
