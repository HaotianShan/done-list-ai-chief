
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, RefreshCcw, Lightbulb, Pin } from "lucide-react";

const InteractiveDemo = () => {
  const [selectedCompany, setSelectedCompany] = useState("E-Commerce Store");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tone, setTone] = useState("friendly");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedDoc, setHighlightedDoc] = useState(null);

  const companyData = {
    "E-Commerce Store": {
      docs: ["returns.pdf", "shipping.pdf", "product_guide.pdf"],
      greeting: "Hi! I'm your support bot. Ask about returns, shipping, or products!",
      suggestions: [
        "What's your return policy?",
        "How long does shipping take?",
        "Show me product warranties"
      ],
      responses: {
        "What's your return policy?": {
          text: "We offer a 30-day return policy for all items in original condition. Returns are free for defective items, while customer preference returns have a $5 processing fee.",
          source: "returns.pdf",
          confidence: 94
        }
      }
    },
    "SaaS Startup": {
      docs: ["user_manual.pdf", "api_docs.pdf", "billing.pdf"],
      greeting: "Hello! I can help with account setup, billing, or technical questions.",
      suggestions: [
        "How do I reset my password?",
        "What are your pricing tiers?",
        "API rate limits?"
      ],
      responses: {
        "How do I reset my password?": {
          text: "To reset your password, go to the login page and click 'Forgot Password'. Enter your email and follow the reset link sent to your inbox.",
          source: "user_manual.pdf",
          confidence: 98
        }
      }
    },
    "Travel Agency": {
      docs: ["booking_terms.pdf", "cancellation.pdf", "destinations.pdf"],
      greeting: "Welcome! I can assist with bookings, cancellations, and travel info.",
      suggestions: [
        "Cancellation policy?",
        "Best time to visit Paris?",
        "Group booking discounts?"
      ],
      responses: {
        "Cancellation policy?": {
          text: "Free cancellation up to 48 hours before departure. Cancellations within 48 hours incur a 20% fee, except for medical emergencies with documentation.",
          source: "cancellation.pdf",
          confidence: 96
        }
      }
    }
  };

  const currentData = companyData[selectedCompany];

  useEffect(() => {
    setMessages([
      {
        type: "bot",
        content: currentData.greeting,
        timestamp: Date.now()
      }
    ]);
  }, [selectedCompany]);

  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSuggestionClick = (suggestion) => {
    // Add user message
    const userMessage = {
      type: "user",
      content: suggestion,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = currentData.responses[suggestion];
      if (response) {
        setHighlightedDoc(response.source);
        const botMessage = {
          type: "bot",
          content: response.text,
          source: response.source,
          confidence: response.confidence,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        
        // Clear highlight after animation
        setTimeout(() => setHighlightedDoc(null), 2000);
      }
    }, 1500);
  };

  const resetDemo = () => {
    setMessages([
      {
        type: "bot",
        content: currentData.greeting,
        timestamp: Date.now()
      }
    ]);
    setHighlightedDoc(null);
    setIsTyping(false);
  };

  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 hero-blur top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience Your AI Assistant in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our AI instantly understands your business context and provides accurate, on-brand responses
          </p>
        </div>

        {/* Top Bar - Upload Simulator */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="flex items-center gap-4">
            <select 
              value={selectedCompany}
              onChange={(e) => handleCompanyChange(e.target.value)}
              className="bg-background border border-white/20 rounded-md px-3 py-2 text-sm"
            >
              <option value="E-Commerce Store">E-Commerce Store</option>
              <option value="SaaS Startup">SaaS Startup</option>
              <option value="Travel Agency">Travel Agency</option>
            </select>
            
            <Button variant="outline" size="sm" className="border-primary/30">
              <Upload className="w-4 h-4 mr-2" />
              Try with your docs
            </Button>
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetDemo}
            className="text-muted-foreground hover:text-primary"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reset Demo
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Context Visualizer - Side Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Knowledge Base
              </h3>
              
              {isAnalyzing ? (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm text-muted-foreground">Analyzing knowledge base...</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-green-400">Ready!</span>
                  </div>
                </div>
              )}

              <div className="space-y-2 mb-6">
                {currentData.docs.map((doc, index) => (
                  <div 
                    key={doc}
                    className={`flex items-center gap-2 p-2 rounded transition-all duration-300 ${
                      highlightedDoc === doc ? 'bg-primary/20 border border-primary/50' : 'bg-muted/30'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{doc}</span>
                    {highlightedDoc === doc && (
                      <Pin className="w-3 h-3 text-primary ml-auto animate-pulse" />
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Tone</span>
                  <Lightbulb className={`w-4 h-4 ${tone === 'friendly' ? 'text-yellow-400' : 'text-blue-400'}`} />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={tone === 'professional' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTone('professional')}
                    className="flex-1 text-xs"
                  >
                    Professional
                  </Button>
                  <Button
                    variant={tone === 'friendly' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTone('friendly')}
                    className="flex-1 text-xs"
                  >
                    Friendly
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Interactive Chat Window - Center Stage */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-white/10 overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedCompany} Support AI</h4>
                    <p className="text-xs text-muted-foreground">Always online</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted/50 text-foreground'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      {message.source && (
                        <div className="mt-2 pt-2 border-t border-white/20">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-green-400">{message.confidence}% match with {message.source}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggested Questions */}
              <div className="p-4 border-t border-white/10 bg-muted/10">
                <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {currentData.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs border-primary/30 hover:bg-primary/10"
                      disabled={isTyping}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
