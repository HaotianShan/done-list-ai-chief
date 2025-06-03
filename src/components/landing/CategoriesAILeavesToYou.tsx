
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Settings, UserCheck, Shield, Mail } from "lucide-react";

const CategoriesAILeavesToYou = () => {
  const [selectedRole, setSelectedRole] = useState("Founder");
  const [customCategories, setCustomCategories] = useState([
    "VIP Clients",
    "Legal Issues", 
    "Personal Emails"
  ]);
  const [newCategory, setNewCategory] = useState("");

  const roleCategories = {
    "Founder": [
      "Investor emails",
      "Partnership requests",
      "Board communications",
      "Strategic decisions"
    ],
    "Sales Rep": [
      "Demo follow-ups",
      "Pricing negotiations",
      "Contract discussions",
      "Lead qualification"
    ],
    "Project Manager": [
      "Team conflicts",
      "Budget approvals",
      "Client escalations",
      "Resource allocation"
    ]
  };

  const mockEmails = [
    {
      type: "flagged",
      subject: "Investment Term Sheet Review",
      sender: "investor@vccapital.com",
      reason: "Contains sensitive financial terms",
      category: "Investor emails"
    },
    {
      type: "handled",
      subject: "Meeting Confirmation",
      sender: "client@techcorp.com",
      reason: "Standard scheduling request"
    },
    {
      type: "flagged", 
      subject: "Legal Compliance Question",
      sender: "legal@company.com",
      reason: "Requires legal expertise",
      category: "Legal Issues"
    }
  ];

  const addCustomCategory = () => {
    if (newCategory.trim() && !customCategories.includes(newCategory.trim())) {
      setCustomCategories([...customCategories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const removeCategory = (category) => {
    setCustomCategories(customCategories.filter(cat => cat !== category));
  };

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 hero-blur top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Settings className="h-5 w-5 text-orange-400" />
            <Badge variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-400 px-3">
              Control & Customization
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Categories AI <span className="gradient-text">Leaves to You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Maintain complete control over sensitive communications. Define which emails require your personal attention.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customizable Categories Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-400" />
                Protected Categories
              </h3>
              
              {/* Role Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Your Role</label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-background border border-white/20 rounded-md px-3 py-2 text-sm"
                >
                  <option value="Founder">Founder</option>
                  <option value="Sales Rep">Sales Rep</option>
                  <option value="Project Manager">Project Manager</option>
                </select>
              </div>

              {/* Role-based Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Role-Based Categories</h4>
                <div className="space-y-2">
                  {roleCategories[selectedRole].map((category, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                      <UserCheck className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Categories */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Custom Categories</h4>
                <div className="space-y-2 mb-3">
                  {customCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-orange-500/10 rounded border border-orange-500/30">
                      <span className="text-sm">{category}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCategory(category)}
                        className="h-6 w-6 p-0 hover:bg-red-500/20"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {/* Add New Category */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom category..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomCategory()}
                    className="text-xs bg-background/50 border-white/20"
                  />
                  <Button
                    onClick={addCustomCategory}
                    size="sm"
                    className="px-3"
                    disabled={!newCategory.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Filtered Inbox Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 bg-primary/5">
                <h3 className="font-semibold flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Intelligent Email Filtering
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  AI automatically routes emails based on your preferences
                </p>
              </div>

              <div className="grid md:grid-cols-2 h-96">
                {/* AI-Handled Column */}
                <div className="p-4 border-r border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h4 className="font-medium text-green-400">AI-Handled</h4>
                    <Badge variant="outline" className="ml-auto bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                      Auto-replied
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {mockEmails.filter(email => email.type === 'handled').map((email, index) => (
                      <div key={index} className="p-3 bg-green-500/5 border border-green-500/20 rounded">
                        <div className="font-medium text-sm">{email.subject}</div>
                        <div className="text-xs text-muted-foreground">{email.sender}</div>
                        <div className="text-xs text-green-400 mt-1">{email.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Your Attention Column */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <h4 className="font-medium text-orange-400">Your Attention Needed</h4>
                    <Badge variant="outline" className="ml-auto bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs">
                      {mockEmails.filter(email => email.type === 'flagged').length} flagged
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {mockEmails.filter(email => email.type === 'flagged').map((email, index) => (
                      <div key={index} className="p-3 bg-orange-500/5 border border-orange-500/20 rounded hover:bg-orange-500/10 transition-colors cursor-pointer">
                        <div className="font-medium text-sm">{email.subject}</div>
                        <div className="text-xs text-muted-foreground">{email.sender}</div>
                        <div className="text-xs text-orange-400 mt-1">{email.reason}</div>
                        {email.category && (
                          <Badge variant="outline" className="mt-2 bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs">
                            {email.category}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/10 bg-muted/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    AI processed 47 emails today • 3 require your attention
                  </span>
                  <Button variant="outline" size="sm" className="border-primary/30">
                    Configure Rules
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesAILeavesToYou;
