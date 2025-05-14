
import React, { useState } from "react";
import { Inbox, User, Settings, Users, Lock, Clock, AlertTriangle, CheckCircle, MailOpen, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define types for our categories and emails
type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  active: boolean;
};

type Email = {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  category: string;
  flagReason?: string;
  time: string;
  read: boolean;
};

const AICustomization = () => {
  // Initial state for categories
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: "vip", 
      name: "VIP Clients", 
      icon: <User size={16} className="text-amber-400" />, 
      description: "High-value client communications that need your personal touch",
      active: true
    },
    { 
      id: "legal", 
      name: "Legal Issues", 
      icon: <Lock size={16} className="text-red-400" />, 
      description: "Contracts, agreements, and legal matters requiring your review",
      active: true
    },
    { 
      id: "personal", 
      name: "Personal Emails", 
      icon: <Users size={16} className="text-blue-400" />, 
      description: "Communications from family, friends, and personal contacts",
      active: true
    },
    { 
      id: "urgent", 
      name: "Urgent Requests", 
      icon: <Clock size={16} className="text-purple-400" />, 
      description: "Time-sensitive matters needing immediate attention",
      active: false
    },
    { 
      id: "financial", 
      name: "Financial Matters", 
      icon: <AlertTriangle size={16} className="text-green-400" />, 
      description: "Invoices, payments, and financial discussions",
      active: false
    },
  ]);

  // Sample emails for demonstration
  const [emails] = useState<Email[]>([
    {
      id: "1",
      subject: "Partnership Opportunity Discussion",
      sender: "John Smith (Acme Corp)",
      preview: "I'd like to discuss a potential strategic partnership opportunity that could...",
      category: "vip",
      flagReason: "Detected VIP client based on contact history",
      time: "10:23 AM",
      read: false,
    },
    {
      id: "2",
      subject: "Contract Review Required",
      sender: "Legal Team",
      preview: "Please review the attached contract amendments before our meeting tomorrow...",
      category: "legal",
      flagReason: "Contains legal terminology and contract references",
      time: "Yesterday",
      read: true,
    },
    {
      id: "3",
      subject: "Family Vacation Plans",
      sender: "spouse@personal.com",
      preview: "Hey, I've been looking at options for our summer vacation and found some...",
      category: "personal",
      flagReason: "Recognized personal email domain",
      time: "May 10",
      read: true,
    },
    {
      id: "4",
      subject: "Monthly Newsletter",
      sender: "newsletter@updates.com",
      preview: "Check out this month's company updates and industry news...",
      category: "ai-handled",
      time: "May 9",
      read: false,
    },
    {
      id: "5",
      subject: "Your subscription has been renewed",
      sender: "billing@saas-product.com",
      preview: "Your annual subscription has been successfully renewed. Your next billing date...",
      category: "ai-handled",
      time: "May 8",
      read: true,
    },
    {
      id: "6",
      subject: "Follow-up from yesterday's meeting",
      sender: "team@internal.com",
      preview: "Here are the action items we discussed during yesterday's product review...",
      category: "ai-handled",
      time: "May 7",
      read: true,
    },
  ]);

  // New state for adding custom categories
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

  // Calculate the percentage of automated emails
  const automatedPercentage = Math.round((emails.filter(e => e.category === "ai-handled").length / emails.length) * 100);
  
  // Toggle a category's active state
  const toggleCategory = (id: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, active: !cat.active } : cat
    ));
  };

  // Role-based personas
  const [activePersona, setActivePersona] = useState("founder");
  
  const personas = {
    founder: {
      title: "Founder/CEO",
      categories: ["Investor Communications", "Strategic Partnerships", "Board Matters"],
      example: "AI will flag emails from potential investors or strategic partners that require your direct attention."
    },
    sales: {
      title: "Sales Representative",
      categories: ["Demo Requests", "Pricing Negotiations", "Customer Objections"],
      example: "AI will identify when a prospect is asking detailed pricing questions that need your expert negotiation skills."
    },
    manager: {
      title: "Project Manager",
      categories: ["Resource Allocation", "Escalations", "Client Feedback"],
      example: "AI will highlight client feedback that indicates potential project risks or scope changes."
    }
  };

  // Function to add a new category
  const addNewCategory = () => {
    if (newCategoryName.trim() === "") return;
    
    const newId = `custom-${Date.now()}`;
    const newCategory: Category = {
      id: newId,
      name: newCategoryName,
      icon: <User size={16} className="text-indigo-400" />,
      description: newCategoryDescription || "Custom category for specific email filtering",
      active: true
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setNewCategoryDescription("");
    setShowNewCategoryForm(false);
  };

  // Function to remove a category
  const removeCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <section className="py-20 px-4 border-t border-gray-800 relative overflow-hidden">
      <div className="hero-blur opacity-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Settings className="h-5 w-5 text-[#6cacfc]" />
            <Badge variant="outline" className="bg-[#6cacfc]/10 border-[#6cacfc]/30 text-[#6cacfc] px-3">
              Customization
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Categories AI Leaves to You</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Maintain complete control by customizing which emails you want to handle personally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-white/5 shadow-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#6cacfc]" /> Customizable Categories
            </h3>
            
            <p className="text-sm text-gray-400 mb-4">
              Select which email categories you want the AI to flag for your personal attention.
            </p>
            
            <div className="space-y-3 mb-6">
              {categories.map(category => (
                <div
                  key={category.id}
                  className={`p-4 rounded-md border cursor-pointer transition-all ${
                    category.active 
                      ? 'bg-blue-900/20 border-blue-500/30' 
                      : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                          category.active 
                            ? 'bg-blue-500 border-blue-600' 
                            : 'bg-transparent border border-gray-600'
                        }`}
                        onClick={() => toggleCategory(category.id)}
                      >
                        {category.active && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      
                      {/* Only show remove button for custom categories */}
                      {category.id.startsWith('custom-') && (
                        <button 
                          className="text-gray-400 hover:text-red-400 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCategory(category.id);
                          }}
                          aria-label="Remove category"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 ml-7">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
            
            {showNewCategoryForm ? (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-md border border-gray-700 p-4 mb-6 animate-fade-in">
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Plus size={14} />
                  Add New Category
                </h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="categoryName" className="text-xs text-gray-400 mb-1 block">
                      Category Name
                    </label>
                    <Input
                      id="categoryName"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="e.g., Client Projects"
                      className="bg-black/30 border-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="categoryDesc" className="text-xs text-gray-400 mb-1 block">
                      Description (Optional)
                    </label>
                    <Input
                      id="categoryDesc"
                      value={newCategoryDescription}
                      onChange={(e) => setNewCategoryDescription(e.target.value)}
                      placeholder="e.g., Emails related to active client projects"
                      className="bg-black/30 border-gray-700"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowNewCategoryForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={addNewCategory}
                      disabled={!newCategoryName.trim()}
                    >
                      Add Category
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-6 w-full flex items-center gap-2 border-dashed border-gray-700"
                onClick={() => setShowNewCategoryForm(true)}
              >
                <Plus size={16} />
                Add Custom Category
              </Button>
            )}
            
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-md border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Inbox Automation</span>
                <span className="text-sm font-medium">{automatedPercentage}%</span>
              </div>
              <Progress value={automatedPercentage} className="h-2" />
              <p className="text-xs text-gray-400 mt-3">
                Based on your current settings, our AI will handle approximately {automatedPercentage}% of your inbox automatically.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-white/5 shadow-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Inbox className="h-5 w-5 text-[#6cacfc]" /> Filtered Inbox Preview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card className="bg-black/30 backdrop-blur-sm border-gray-800">
                <div className="p-3 bg-gray-800/50 border-b border-gray-700/80 flex items-center justify-between">
                  <h4 className="font-medium flex items-center gap-2">
                    <User size={16} /> Your Attention Needed
                  </h4>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/30">
                    {emails.filter(e => e.category !== "ai-handled").length} emails
                  </Badge>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="divide-y divide-gray-800/60">
                    {emails
                      .filter(email => email.category !== "ai-handled")
                      .map((email) => (
                        <div
                          key={email.id}
                          className="p-4 cursor-pointer transition-colors hover:bg-gray-800/30"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm ${email.read ? 'text-gray-400' : 'font-medium'}`}>
                              {email.sender}
                            </span>
                            <span className="text-xs text-gray-500">{email.time}</span>
                          </div>
                          <div className="text-sm font-medium mb-1">{email.subject}</div>
                          <div className="text-xs text-gray-400 truncate mb-2">{email.preview}</div>
                          {email.flagReason && (
                            <div className="flex items-center gap-1">
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
                                {categories.find(c => c.id === email.category)?.name || "Custom"}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {email.flagReason}
                              </span>
                            </div>
                          )}
                        </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="bg-black/30 backdrop-blur-sm border-gray-800">
                <div className="p-3 bg-gray-800/50 border-b border-gray-700/80 flex items-center justify-between">
                  <h4 className="font-medium flex items-center gap-2">
                    <MailOpen size={16} /> AI-Handled
                  </h4>
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                    {emails.filter(e => e.category === "ai-handled").length} emails
                  </Badge>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="divide-y divide-gray-800/60">
                    {emails
                      .filter(email => email.category === "ai-handled")
                      .map((email) => (
                        <div
                          key={email.id}
                          className="p-4 cursor-pointer transition-colors hover:bg-gray-800/30"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm ${email.read ? 'text-gray-400' : 'font-medium'}`}>
                              {email.sender}
                            </span>
                            <span className="text-xs text-gray-500">{email.time}</span>
                          </div>
                          <div className="text-sm font-medium mb-1">{email.subject}</div>
                          <div className="text-xs text-gray-400 truncate mb-1">{email.preview}</div>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                              Auto-processed
                            </Badge>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-md border border-gray-800 p-4">
              <h4 className="font-medium mb-4">Role-Based Examples</h4>
              
              <Tabs defaultValue="founder" value={activePersona} onValueChange={setActivePersona}>
                <TabsList className="mb-4 bg-gray-800/50">
                  <TabsTrigger value="founder">Founder/CEO</TabsTrigger>
                  <TabsTrigger value="sales">Sales Rep</TabsTrigger>
                  <TabsTrigger value="manager">Project Manager</TabsTrigger>
                </TabsList>
                
                <div className="p-4 bg-gray-900/50 rounded-md border border-gray-800">
                  <div className="flex items-center gap-2 mb-1">
                    <User size={14} className="text-blue-400" />
                    <h5 className="font-medium">{personas[activePersona as keyof typeof personas].title} Focus</h5>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="mb-3">
                    <h6 className="text-sm font-medium mb-2">Priority Categories:</h6>
                    <div className="flex flex-wrap gap-2">
                      {personas[activePersona as keyof typeof personas].categories.map((category, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-sm font-medium mb-1">Example:</h6>
                    <p className="text-xs text-gray-400">{personas[activePersona as keyof typeof personas].example}</p>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICustomization;
