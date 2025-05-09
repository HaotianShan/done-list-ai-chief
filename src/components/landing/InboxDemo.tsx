
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Mail,
  Clock,
  Users,
  Inbox,
  FileText,
  AlertCircle,
  DollarSign,
  MessageSquare,
  CheckCircle,
  Ban,
  Shield,
  Lock,
  Plus,
} from "lucide-react";

interface Email {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  category: "billing" | "clients" | "investors" | "updates" | "meetings";
  urgent: boolean;
}

const initialEmails: Email[] = [
  {
    id: "email1",
    subject: "Confidential: Q4 Investor Meeting",
    sender: "investors@acme.com",
    preview:
      "Attached please find the confidential investor briefing documents...",
    category: "investors",
    urgent: true,
  },
  {
    id: "email2",
    subject: "Project Timeline Update",
    sender: "sarah@clientco.com",
    preview: "Revised project deliverables for the upcoming quarter...",
    category: "clients",
    urgent: false,
  },
  {
    id: "email3",
    subject: "Executive Compensation Discussion",
    sender: "board@acme.com",
    preview: "Sensitive material regarding executive compensation packages...",
    category: "meetings",
    urgent: true,
  },
  {
    id: "email4",
    subject: "Weekly Analytics Report",
    sender: "reports@metrics.com",
    preview: "Automated system report - no action required...",
    category: "updates",
    urgent: false,
  },
];

interface Rule {
  id: string;
  label: string;
  type: "category" | "custom";
  value: string;
  active: boolean;
}

const defaultRules: Rule[] = [
  {
    id: "rule1",
    label: "Sensitive Financial Information",
    type: "category",
    value: "investors",
    active: true,
  },
  {
    id: "rule2",
    label: "Executive Meetings & Discussions",
    type: "category",
    value: "meetings",
    active: true,
  },
  {
    id: "rule3",
    label: "Client Contract Negotiations",
    type: "category",
    value: "clients",
    active: false,
  },
  {
    id: "rule4",
    label: "Billing & Payment Processing",
    type: "category",
    value: "billing",
    active: false,
  },
];

const InboxDemo = () => {
  const [emails] = useState<Email[]>(initialEmails);
  const [rules, setRules] = useState<Rule[]>(defaultRules);
  const [customRuleInput, setCustomRuleInput] = useState("");

  const isEmailRestricted = (email: Email) => {
    return rules.some(
      (rule) =>
        rule.active &&
        (rule.type === "category"
          ? email.category === rule.value
          : email.sender.toLowerCase().includes(rule.value.toLowerCase()))
    );
  };

  const toggleRule = (ruleId: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === ruleId ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const addCustomRule = () => {
    if (!customRuleInput) return;

    const newRule: Rule = {
      id: `custom-${Date.now()}`,
      label: `Contains "${customRuleInput}"`,
      type: "custom",
      value: customRuleInput,
      active: true,
    };

    setRules([...rules, newRule]);
    setCustomRuleInput("");
  };

  const automationPercentage = Math.round(
    ((emails.length - emails.filter(isEmailRestricted).length) /
      emails.length) *
      100
  );

  return (
    <section
      id="features"
      className="py-24 px-4 bg-gradient-to-b from-background to-background/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            AI Access Governance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Define protection boundaries by selecting sensitive communication
            types. AI will automatically handle non-protected emails.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Rules Configuration */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 border border-white/10 bg-secondary/20">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Protection Rules</h3>
              </div>

              <div className="space-y-4">
                {rules.map((rule) => (
                  <motion.div
                    key={rule.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all ${
                        rule.active
                          ? "border-primary/30 bg-primary/10"
                          : "border-transparent hover:border-white/5"
                      }`}
                      onClick={() => toggleRule(rule.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {rule.label}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {rule.type === "category"
                              ? "Email category"
                              : "Custom pattern"}
                          </span>
                        </div>
                        <Switch checked={rule.active} />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 bg-background rounded p-2 text-sm"
                    placeholder="Add custom pattern (e.g. @legal.com)"
                    value={customRuleInput}
                    onChange={(e) => setCustomRuleInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCustomRule()}
                  />
                  <button
                    onClick={addCustomRule}
                    className="bg-primary/80 hover:bg-primary text-white rounded p-2"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>

            {/* Automation Status */}
            <Card className="p-6 border border-white/10 bg-secondary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Automation Coverage</h3>
                <Badge variant="outline" className="font-mono">
                  {automationPercentage}% Automated
                </Badge>
              </div>
              <Progress value={automationPercentage} className="h-2" />
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-green-400">
                  {emails.length - emails.filter(isEmailRestricted).length}{" "}
                  AI-Handled
                </span>
                <span className="text-red-400">
                  {emails.filter(isEmailRestricted).length} Protected
                </span>
              </div>
            </Card>
          </div>

          {/* Protected Communications */}
          <div className="lg:col-span-8">
            <Card className="p-6 border border-red-500/30 bg-red-900/10 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Ban className="text-red-400 h-5 w-5" />
                <h3 className="font-semibold text-red-400">
                  Protected Communications
                </h3>
              </div>

              <AnimatePresence mode="popLayout">
                {emails.filter(isEmailRestricted).map((email) => (
                  <motion.div
                    key={email.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ type: "spring", duration: 0.4 }}
                  >
                    <Card className="p-4 border-red-500/20 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="text-red-400">
                          {getCategoryIcon(email.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{email.subject}</h4>
                            {email.urgent && (
                              <Badge variant="destructive">Urgent</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {email.sender}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {email.preview}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {emails.filter(isEmailRestricted).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No protected communications - AI can handle all emails
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const getCategoryIcon = (category: Email["category"]) => {
  switch (category) {
    case "billing":
      return <DollarSign className="h-4 w-4" />;
    case "clients":
      return <Users className="h-4 w-4" />;
    case "investors":
      return <Shield className="h-4 w-4" />;
    case "meetings":
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

export default InboxDemo;
