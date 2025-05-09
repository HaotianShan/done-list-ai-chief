
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mail, clock, users, inbox, fileText, alertCircle, dollarSign, messageSquare, checkCircle } from "lucide-react";

// Email interface
interface Email {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  category: "billing" | "clients" | "spam" | "updates" | "meetings";
  urgent: boolean;
  zone: "unassigned" | "my" | "ai";
}

// Demo email data
const initialEmails: Email[] = [
  {
    id: "email1",
    subject: "Urgent: Invoice #3921 Due",
    sender: "billing@acmeservices.com",
    preview: "This is a reminder that your invoice #3921 for $299 is due in 3 days...",
    category: "billing",
    urgent: true,
    zone: "unassigned",
  },
  {
    id: "email2",
    subject: "Project Timeline Update",
    sender: "sarah@clientcompany.com",
    preview: "Hi there! Just checking in on the timeline for the Q3 deliverables we discussed...",
    category: "clients",
    urgent: false,
    zone: "unassigned",
  },
  {
    id: "email3",
    subject: "Limited Time Offer - 50% Off!",
    sender: "marketing@specialdeals.net",
    preview: "EXCLUSIVE DEAL inside! Don't miss this opportunity to save big on premium services...",
    category: "spam",
    urgent: false,
    zone: "unassigned",
  },
  {
    id: "email4",
    subject: "Meeting Agenda: Strategy Session",
    sender: "team-calendar@company.com",
    preview: "The strategy session is scheduled for tomorrow at 2pm. Please find the agenda attached...",
    category: "meetings",
    urgent: true,
    zone: "unassigned",
  },
  {
    id: "email5",
    subject: "Weekly Analytics Report",
    sender: "analytics@dashboardapp.com",
    preview: "Your weekly analytics report is ready. Traffic is up 12% from last week...",
    category: "updates",
    urgent: false,
    zone: "unassigned",
  },
  {
    id: "email6",
    subject: "New Comment on Your Document",
    sender: "notifications@collaborationtool.com",
    preview: "Alex left a comment on your 'Q4 Strategy' document: 'Great insights on market expansion...'",
    category: "updates",
    urgent: false,
    zone: "unassigned",
  },
];

// Rules that get generated as the user assigns emails
interface Rule {
  id: string;
  description: string;
  type: "sender" | "category" | "urgent";
  value: string;
  zone: "my" | "ai";
}

const InboxDemo = () => {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [rules, setRules] = useState<Rule[]>([]);
  const [draggedEmail, setDraggedEmail] = useState<string | null>(null);
  const [automationPercentage, setAutomationPercentage] = useState(0);
  
  const myZoneRef = useRef<HTMLDivElement>(null);
  const aiZoneRef = useRef<HTMLDivElement>(null);

  // Helper function to get icon for email category
  const getCategoryIcon = (category: Email["category"]) => {
    switch (category) {
      case "billing":
        return <dollarSign className="h-4 w-4" />;
      case "clients":
        return <users className="h-4 w-4" />;
      case "spam":
        return <alertCircle className="h-4 w-4" />;
      case "meetings":
        return <clock className="h-4 w-4" />;
      default:
        return <fileText className="h-4 w-4" />;
    }
  };

  // Handle drag start
  const handleDragStart = (id: string) => {
    setDraggedEmail(id);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Create a new rule based on the assigned email
  const createRule = (email: Email, zone: "my" | "ai") => {
    // Create rules based on patterns (sender domain, category, urgency)
    const senderDomain = email.sender.split("@")[1];
    
    // Check if we already have a rule for this domain or category
    const existingDomainRule = rules.find(r => 
      r.type === "sender" && r.value === senderDomain && r.zone === zone
    );
    
    const existingCategoryRule = rules.find(r => 
      r.type === "category" && r.value === email.category && r.zone === zone
    );
    
    const existingUrgentRule = rules.find(r => 
      r.type === "urgent" && r.value === String(email.urgent) && r.zone === zone
    );
    
    const newRules: Rule[] = [];
    
    // Add domain rule if it doesn't exist
    if (!existingDomainRule) {
      newRules.push({
        id: `rule-${rules.length + newRules.length + 1}`,
        type: "sender",
        value: senderDomain,
        description: `Emails from *@${senderDomain} → ${zone === "my" ? "My" : "AI"} Zone`,
        zone
      });
    }
    
    // Sometimes add category rule
    if (!existingCategoryRule && Math.random() > 0.5) {
      newRules.push({
        id: `rule-${rules.length + newRules.length + 1}`,
        type: "category",
        value: email.category,
        description: `${email.category.charAt(0).toUpperCase() + email.category.slice(1)} emails → ${zone === "my" ? "My" : "AI"} Zone`,
        zone
      });
    }
    
    // Add urgent rule if it's urgent and doesn't exist
    if (email.urgent && !existingUrgentRule) {
      newRules.push({
        id: `rule-${rules.length + newRules.length + 1}`,
        type: "urgent",
        value: "true",
        description: `Urgent emails → ${zone === "my" ? "My" : "AI"} Zone`,
        zone
      });
    }
    
    if (newRules.length > 0) {
      setRules([...rules, ...newRules]);
    }
  };

  // Handle drop
  const handleDrop = (zone: "my" | "ai") => (e: React.DragEvent) => {
    e.preventDefault();
    
    if (draggedEmail) {
      // Update email zone
      const updatedEmails = emails.map(email => {
        if (email.id === draggedEmail) {
          const updatedEmail = { ...email, zone };
          
          // Create rule based on this assignment
          createRule(updatedEmail, zone);
          
          return updatedEmail;
        }
        return email;
      });
      
      setEmails(updatedEmails);
      setDraggedEmail(null);
      
      // Calculate automation percentage
      const assignedEmails = updatedEmails.filter(email => email.zone !== "unassigned");
      const aiEmails = updatedEmails.filter(email => email.zone === "ai");
      
      const newAutomationPercentage = Math.round((aiEmails.length / initialEmails.length) * 100);
      setAutomationPercentage(newAutomationPercentage);
    }
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Design Your <span className="gradient-text">Personal AI Assistant</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Drag emails between zones to teach our AI how you'd prefer to handle different messages.
            Watch as it learns your preferences and builds automation rules in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inbox and Email List */}
          <Card className="lg:col-span-5 p-5 border border-white/10 bg-secondary/20 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <inbox className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Incoming Messages</h3>
              </div>
              <Badge variant="secondary" className="font-mono">
                {emails.length} emails
              </Badge>
            </div>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {emails.map(email => (
                <Card 
                  key={email.id}
                  className={`p-3 cursor-grab border ${
                    email.zone === "unassigned" 
                      ? "border-white/10 hover:border-primary/50" 
                      : email.zone === "my" 
                        ? "border-blue-500/30 bg-blue-500/5" 
                        : "border-green-500/30 bg-green-500/5"
                  } ${email.urgent ? "ring-1 ring-red-500/30" : ""}`}
                  draggable={email.zone === "unassigned"}
                  onDragStart={() => handleDragStart(email.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      email.category === "billing" ? "bg-amber-500/20 text-amber-400" :
                      email.category === "clients" ? "bg-blue-500/20 text-blue-400" :
                      email.category === "spam" ? "bg-red-500/20 text-red-400" :
                      email.category === "meetings" ? "bg-purple-500/20 text-purple-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {getCategoryIcon(email.category)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{email.subject}</h4>
                        {email.urgent && (
                          <Badge variant="destructive" className="shrink-0 ml-2 text-xs">Urgent</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{email.sender}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{email.preview}</p>
                    </div>
                  </div>
                  
                  {email.zone !== "unassigned" && (
                    <div className="flex justify-end mt-2">
                      <Badge className={`${
                        email.zone === "my" ? "bg-blue-600" : "bg-green-600"
                      }`}>
                        {email.zone === "my" ? "My Zone" : "AI Zone"}
                      </Badge>
                    </div>
                  )}
                </Card>
              ))}
              {emails.filter(e => e.zone === "unassigned").length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <checkCircle className="mx-auto h-8 w-8 mb-3 text-green-500" />
                  <p>All emails have been assigned!</p>
                </div>
              )}
            </div>
          </Card>
          
          {/* Zones */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* My Zone */}
            <Card 
              className="p-5 border-dashed border-2 border-blue-500/30 bg-blue-500/5"
              ref={myZoneRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop("my")}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-full bg-blue-500/20">
                  <users className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-blue-400">My Zone</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Drag emails here that you want to handle personally. These won't be automated.
              </p>
              
              <div className="min-h-[100px] flex items-center justify-center border border-dashed border-blue-500/20 rounded-lg p-4 mb-4">
                {emails.filter(e => e.zone === "my").length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center">
                    Drop emails here that you'll handle manually
                  </p>
                ) : (
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{emails.filter(e => e.zone === "my").length} emails</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((emails.filter(e => e.zone === "my").length / initialEmails.length) * 100)}% of inbox
                      </span>
                    </div>
                    <Progress 
                      value={Math.round((emails.filter(e => e.zone === "my").length / initialEmails.length) * 100)} 
                      className="h-2 bg-blue-950" 
                    />
                  </div>
                )}
              </div>
              
              {emails.filter(e => e.zone === "my").length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">Your Rules</h4>
                  <div className="space-y-1.5">
                    {rules.filter(r => r.zone === "my").map(rule => (
                      <div key={rule.id} className="text-xs py-1 px-2 bg-blue-950/30 rounded border border-blue-500/20">
                        {rule.description}
                      </div>
                    ))}
                    {rules.filter(r => r.zone === "my").length === 0 && (
                      <p className="text-xs text-muted-foreground">Keep assigning emails to develop rules</p>
                    )}
                  </div>
                </div>
              )}
            </Card>
            
            {/* AI Zone */}
            <Card 
              className="p-5 border-dashed border-2 border-green-500/30 bg-green-500/5"
              ref={aiZoneRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop("ai")}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-full bg-green-500/20">
                  <messageSquare className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="font-semibold text-green-400">AI Zone</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Drag emails here that your AI assistant should handle. These will be automated.
              </p>
              
              <div className="min-h-[100px] flex items-center justify-center border border-dashed border-green-500/20 rounded-lg p-4 mb-4">
                {emails.filter(e => e.zone === "ai").length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center">
                    Drop emails here that the AI should handle
                  </p>
                ) : (
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{emails.filter(e => e.zone === "ai").length} emails</span>
                      <span className="text-xs text-muted-foreground">
                        {automationPercentage}% of inbox automated
                      </span>
                    </div>
                    <Progress 
                      value={automationPercentage} 
                      className="h-2 bg-green-950" 
                    />
                  </div>
                )}
              </div>
              
              {emails.filter(e => e.zone === "ai").length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">AI Rules</h4>
                  <div className="space-y-1.5">
                    {rules.filter(r => r.zone === "ai").map(rule => (
                      <div key={rule.id} className="text-xs py-1 px-2 bg-green-950/30 rounded border border-green-500/20">
                        {rule.description}
                      </div>
                    ))}
                    {rules.filter(r => r.zone === "ai").length === 0 && (
                      <p className="text-xs text-muted-foreground">Keep assigning emails to develop rules</p>
                    )}
                  </div>
                </div>
              )}
            </Card>
            
            {/* Analytics & Timeline */}
            <Card className="md:col-span-2 p-5 border border-white/10 bg-secondary/20 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold">Automation Analytics</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Current Automation Level</span>
                    <span className="text-sm font-mono">{automationPercentage}%</span>
                  </div>
                  <Progress 
                    value={automationPercentage} 
                    className="h-3" 
                  />
                </div>
                
                {automationPercentage > 0 && (
                  <Card className="p-3 border border-white/5 bg-background/70">
                    <h4 className="text-sm font-semibold mb-2">Estimated Time Savings</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span>Weekly:</span>
                      <span className="font-mono text-green-400">
                        ~{Math.round(automationPercentage * 0.4)} hours
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Monthly:</span>
                      <span className="font-mono text-green-400">
                        ~{Math.round(automationPercentage * 1.6)} hours
                      </span>
                    </div>
                  </Card>
                )}
                
                <div>
                  <p className="text-sm text-muted-foreground">
                    Based on your configuration, the AI Chief of Staff would save you
                    {automationPercentage > 0 
                      ? ` approximately ${Math.round(automationPercentage * 0.4)} hours every week` 
                      : ' time by automating routine email tasks'
                    }. Continue assigning emails to increase your productivity.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Example Email Preview */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6 text-center">Example Confirmation Email</h3>
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 border border-white/10 bg-secondary/20">
              <div className="bg-gradient-to-r from-primary/20 to-violet-500/20 h-1 mb-4"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-primary">You're on the List!</h4>
                  <p className="text-sm text-muted-foreground">From: AI Chief of Staff Team &lt;onboarding@resend.dev&gt;</p>
                </div>
                <div className="text-xs text-muted-foreground">Just now</div>
              </div>
              
              <div className="prose prose-sm prose-invert max-w-none">
                <p>Thanks for joining the AI Chief of Staff waitlist! You're officially in line for early access.</p>
                <p>We're building an AI assistant that truly <em>acts</em> on your behalf—managing emails, handling tasks, and optimizing your schedule with human-like intuition.</p>
                <div className="bg-secondary/40 border-l-4 border-primary p-3 my-4">
                  <p className="m-0"><strong>What's next?</strong> We'll keep you updated on our launch timeline and may reach out with opportunities to provide feedback as we refine the product.</p>
                </div>
                <p>Looking forward to helping you turn your to-do lists into <em>done</em> lists,</p>
                <p>The AI Chief of Staff Team</p>
              </div>
              
              <div className="border-t border-white/10 mt-6 pt-3 text-xs text-muted-foreground">
                <p>If you didn't sign up for the AI Chief of Staff waitlist, please disregard this email.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InboxDemo;
