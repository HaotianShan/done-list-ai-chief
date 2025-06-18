import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  FileText,
  MessageSquare,
  Upload,
  RotateCcw,
  Send,
  Brain,
  Zap,
  Shield
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface Message {
  content: string;
  isUser: boolean;
  confidence?: number;
}

const demoCompanies = [
  { id: "company1", name: "Acme Corp" },
  { id: "company2", name: "Beta Industries" },
  { id: "company3", name: "Gamma Solutions" }
];

const suggestedQuestions = [
  "What is your return policy?",
  "How do I track my order?",
  "What payment methods do you accept?"
];

const InteractiveDemo: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState(demoCompanies[0].id);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi, I'm your AI assistant. How can I help you today?",
      isUser: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedFiles(Array.from(event.target.files));
    }
  };

  const handleFileUpload = async () => {
    if (uploadedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    setIsUploading(true);
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);
  };

  const handleSendMessage = async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    const newMessage: Message = { content: trimmedMessage, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");

    setIsTyping(true);
    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsTyping(false);

    const aiResponse: Message = {
      content: `Thanks for your question! Based on the uploaded documents, the answer is... [AI Generated Response].`,
      isUser: false,
      confidence: 92
    };
    setMessages((prevMessages) => [...prevMessages, aiResponse]);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const resetDemo = () => {
    setUploadedFiles([]);
    setMessages([
      {
        content: "Hi, I'm your AI assistant. How can I help you today?",
        isUser: false
      }
    ]);
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <Badge
              variant="outline"
              className="bg-purple-500/10 border-purple-500/30 text-purple-400 px-3"
            >
              Interactive Demo
            </Badge>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 px-4">
            Experience Your{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Assistant
            </span>{" "}
            in Action
          </h2>
          <p className="text-sm md:text-lg text-gray-400 max-w-3xl mx-auto px-4">
            Upload your documents and see how our AI instantly becomes an expert on your business
          </p>
        </div>

        {/* Demo Controls - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 mb-6 md:mb-8 px-4">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select demo company" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {demoCompanies.map((company) => (
                <SelectItem key={company.id} value={company.id} className="text-white hover:bg-gray-700">
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleFileUpload}
            disabled={isUploading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>

          <Button
            onClick={resetDemo}
            variant="outline"
            className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Upload Section - Mobile First */}
          <div className="order-1 lg:order-1">
            <Card className="bg-gray-800/50 border-gray-700 h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Knowledge Base
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-4 md:p-6 text-center transition-colors ${
                    isUploading
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                  />
                  <FileText className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs md:text-sm text-gray-400 mb-2">
                    Upload your documents or try our demo
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs md:text-sm"
                  >
                    Choose Files
                  </Button>
                </div>

                {/* Uploaded Files */}
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 md:p-3 bg-gray-700/50 rounded-lg"
                    >
                      <FileText className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-300 truncate">{file.name}</span>
                      <div className="ml-auto flex items-center gap-1">
                        <div className="h-1.5 w-1.5 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-400">Ready</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Processing...</span>
                      <span className="text-blue-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-4/5 transition-all"></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface - Mobile Optimized */}
          <div className="order-2 lg:order-2 lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700 h-96 md:h-[500px] flex flex-col">
              <CardHeader className="pb-3 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-400" />
                    AI Assistant
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Online</span>
                  </div>
                </div>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[80%] p-2 md:p-3 rounded-lg text-sm md:text-base ${
                        message.isUser
                          ? "bg-blue-600 text-white ml-4"
                          : "bg-gray-700 text-gray-100 mr-4"
                      }`}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                      {message.confidence && (
                        <div className="mt-2 pt-2 border-t border-gray-600/50">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="h-1.5 w-1.5 bg-green-400 rounded-full"></div>
                            <span className="text-green-400">{message.confidence}% confident</span>
                            <span className="text-gray-400">• Source: policy.pdf</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-100 p-2 md:p-3 rounded-lg mr-4 max-w-[80%]">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="p-3 md:p-4 border-t border-gray-700">
                {/* Suggested Questions - Mobile Responsive */}
                {messages.length === 1 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        size="sm"
                        variant="outline"
                        className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700 h-8"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about your business policies..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm md:text-base"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Grid - Mobile Responsive */}
        <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {[
            {
              icon: <Brain className="h-8 w-8 text-purple-400" />,
              title: "Smart Context",
              description: "AI understands your business context from uploaded documents"
            },
            {
              icon: <Zap className="h-8 w-8 text-yellow-400" />,
              title: "Instant Responses",
              description: "Get immediate answers with source attribution and confidence scores"
            },
            {
              icon: <Shield className="h-8 w-8 text-green-400" />,
              title: "Secure & Private",
              description: "Your data stays private with enterprise-grade security"
            }
          ].map((feature, index) => (
            <Card key={index} className="bg-gray-800/30 border-gray-700 p-4 md:p-6 text-center">
              <div className="mb-3 md:mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
