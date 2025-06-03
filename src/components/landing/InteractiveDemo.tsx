
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { FileText, Upload, RefreshCcw, Lightbulb, Pin, Send, Paperclip, X, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const InteractiveDemo = () => {
  const [selectedCompany, setSelectedCompany] = useState("E-Commerce Store");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tone, setTone] = useState("friendly");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedDoc, setHighlightedDoc] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const companyData = {
    "E-Commerce Store": {
      docs: ["returns.pdf", "shipping.pdf", "product_guide.pdf"],
      greeting: "Hi! I'm your support bot. Ask about returns, shipping, or products!",
      context: "You are a helpful customer support assistant for an e-commerce store. You have access to return policies, shipping information, and product guides."
    },
    "SaaS Startup": {
      docs: ["user_manual.pdf", "api_docs.pdf", "billing.pdf"],
      greeting: "Hello! I can help with account setup, billing, or technical questions.",
      context: "You are a technical support assistant for a SaaS platform. You help with user accounts, billing questions, and API documentation."
    },
    "Travel Agency": {
      docs: ["booking_terms.pdf", "cancellation.pdf", "destinations.pdf"],
      greeting: "Welcome! I can assist with bookings, cancellations, and travel info.",
      context: "You are a travel consultant assistant. You help with booking procedures, cancellation policies, and destination information."
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      const newFiles = files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        id: Date.now() + Math.random()
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
      toast({
        title: "Files uploaded successfully",
        description: `${files.length} file(s) processed and indexed`,
      });
    }, 2000);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const callLLM = async (message, context) => {
    try {
      const response = await fetch('https://api.suanli.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_QWEN3_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'free:Qwen3-30B-A3B',
          messages: [
            {
              role: 'system',
              content: `${context} Available documents: ${currentData.docs.join(', ')}. Tone: ${tone}. Respond helpfully and reference relevant documents when appropriate.`
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('LLM API Error:', error);
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      type: "user",
      content: userInput,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    // Simulate document highlighting
    const randomDoc = currentData.docs[Math.floor(Math.random() * currentData.docs.length)];
    setHighlightedDoc(randomDoc);

    try {
      const aiResponse = await callLLM(userInput, currentData.context);
      
      const botMessage = {
        type: "bot",
        content: aiResponse,
        source: randomDoc,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: "bot",
        content: "I apologize, but I'm experiencing technical difficulties. Please try again.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setTimeout(() => setHighlightedDoc(null), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
    setUserInput("");
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

        {/* Enhanced Top Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-card/60 backdrop-blur-md rounded-xl border border-white/20 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <select 
                value={selectedCompany}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className="bg-background/80 backdrop-blur border border-white/30 rounded-lg px-4 py-2 text-sm font-medium shadow-sm"
              >
                <option value="E-Commerce Store">🛍️ E-Commerce Store</option>
                <option value="SaaS Startup">💻 SaaS Startup</option>
                <option value="Travel Agency">✈️ Travel Agency</option>
              </select>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary/30 hover:bg-primary/10 shadow-sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Processing..." : "Upload Docs"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
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
          {/* Enhanced Context Visualizer */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/60 backdrop-blur-md border-white/20 shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Knowledge Base
              </h3>
              
              {isAnalyzing ? (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm text-muted-foreground">Analyzing knowledge base...</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-400 font-medium">Ready to assist!</span>
                  </div>
                </div>
              )}

              {/* Default Documents */}
              <div className="space-y-2 mb-6">
                <h4 className="text-sm font-medium text-muted-foreground">Default Documents</h4>
                {currentData.docs.map((doc, index) => (
                  <div 
                    key={doc}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      highlightedDoc === doc 
                        ? 'bg-primary/20 border border-primary/50 shadow-md' 
                        : 'bg-muted/40 hover:bg-muted/60'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm flex-1">{doc}</span>
                    {highlightedDoc === doc && (
                      <Pin className="w-3 h-3 text-primary animate-pulse" />
                    )}
                  </div>
                ))}
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground">Your Documents</h4>
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <Paperclip className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-blue-300 truncate block">{file.name}</span>
                        <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="h-6 w-6 p-0 hover:bg-red-500/20"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Enhanced Tone Selector */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Response Tone</span>
                  <Lightbulb className={`w-4 h-4 ${tone === 'friendly' ? 'text-yellow-400' : 'text-blue-400'}`} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={tone === 'professional' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTone('professional')}
                    className="text-xs h-8"
                  >
                    Professional
                  </Button>
                  <Button
                    variant={tone === 'friendly' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTone('friendly')}
                    className="text-xs h-8"
                  >
                    Friendly
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Interactive Chat Window */}
          <div className="lg:col-span-2">
            <Card className="bg-card/60 backdrop-blur-md border-white/20 shadow-lg overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedCompany} AI Assistant</h4>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Online • Ready to help
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background/50 to-background/30">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground ml-4' 
                        : 'bg-card/80 backdrop-blur border border-white/20 mr-4'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.source && (
                        <div className="mt-3 pt-2 border-t border-white/20">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-green-400 font-medium">
                              {message.confidence}% match • {message.source}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-card/80 backdrop-blur border border-white/20 p-4 rounded-2xl mr-4 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Area */}
              <div className="p-4 border-t border-white/10 bg-card/40 backdrop-blur">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Ask anything about our services..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-12 bg-background/80 border-white/30 focus:border-primary/50 rounded-xl"
                      disabled={isTyping}
                    />
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!userInput.trim() || isTyping}
                      className="absolute right-1 top-1 h-8 w-8 p-0 rounded-lg"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
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
