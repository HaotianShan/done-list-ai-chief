
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Clock, 
  Inbox, 
  Mail, 
  Star, 
  Calendar as CalendarIcon,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

type EmailType = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  priority: "high" | "medium" | "low";
  category: string;
  read: boolean;
};

const sampleEmails = [
  {
    id: "1",
    sender: "Alex Chen (Client)",
    subject: "Urgent: Need to Reschedule Deadline",
    preview: "Hi there, I just realized that we need to move the project deadline due to some unforeseen circumstances...",
    time: "10:23 AM",
    priority: "high" as const,
    category: "client",
    read: false,
  },
  {
    id: "2",
    sender: "Marketing Team",
    subject: "Weekly Analytics Report",
    preview: "The latest metrics show a 15% increase in conversion rates...",
    time: "Yesterday",
    priority: "medium" as const,
    category: "internal",
    read: true,
  },
  {
    id: "3",
    sender: "Newsletter@industry.com",
    subject: "Latest Industry Updates",
    preview: "Check out the latest trends in the industry...",
    time: "May 10",
    priority: "low" as const,
    category: "newsletter",
    read: true,
  },
];

const timelineData = [
  { name: "Mon", emails: 12, meetings: 3 },
  { name: "Tue", emails: 19, meetings: 2 },
  { name: "Wed", emails: 15, meetings: 4 },
  { name: "Thu", emails: 22, meetings: 1 },
  { name: "Fri", emails: 14, meetings: 5 },
  { name: "Sat", emails: 3, meetings: 0 },
  { name: "Sun", emails: 5, meetings: 0 },
];

const AIHandleEverything = () => {
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(sampleEmails[0]);
  const [emailStep, setEmailStep] = useState(0);
  const [emailViewMode, setEmailViewMode] = useState("after"); // "before" or "after"
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(100), 500);
    return () => clearTimeout(timer);
  }, []);

  const priorityMatrix = [
    { 
      id: "1", 
      title: "Client Project Deadline", 
      quadrant: "urgent-important", 
      category: "Work",
      reasoning: "Marked urgent due to approaching deadline (24h) and sender is a VIP client" 
    },
    { 
      id: "2", 
      title: "Team Meeting", 
      quadrant: "not-urgent-important", 
      category: "Work",
      reasoning: "Important for project coordination but scheduled for next week" 
    },
    { 
      id: "3", 
      title: "Server Update Notification", 
      quadrant: "urgent-not-important", 
      category: "Technical",
      reasoning: "Time-sensitive but delegated to IT team automatically" 
    },
    { 
      id: "4", 
      title: "Industry Newsletter", 
      quadrant: "not-urgent-not-important", 
      category: "Information",
      reasoning: "Non-critical information for later review" 
    },
  ];

  const handleNextStep = () => {
    setEmailStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setEmailStep(prev => Math.max(prev - 1, 0));
  };

  const steps = [
    {
      title: "AI Detects Schedule Conflict",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-amber-400" size={18} />
                <p className="text-amber-400 font-medium">Scheduling Conflict Detected</p>
              </div>
              <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                Auto-analyzing
              </Badge>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              The requested deadline change conflicts with two other project timelines already in your calendar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400">
              <Mail size={16} />
            </div>
            <div>
              <p className="font-medium text-gray-200">Original Request</p>
              <p className="text-sm text-gray-400">Client wants to move Project X deadline from June 15 to June 10</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-red-500/20 text-red-400">
              <CalendarIcon size={16} />
            </div>
            <div>
              <p className="font-medium text-gray-200">Calendar Conflict</p>
              <p className="text-sm text-gray-400">
                You have Project Y due on June 11 and Project Z meetings on June 8-9
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Proposes Alternative Times",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={18} />
                <p className="text-green-400 font-medium">Solutions Generated</p>
              </div>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                3 options found
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 border border-blue-500/30 bg-blue-500/10 rounded-md flex items-center justify-between">
              <div>
                <p className="font-medium">Option 1: June 13 (Thursday)</p>
                <p className="text-sm text-gray-400">After Project Y completion, before weekend</p>
              </div>
              <Badge variant="outline" className="bg-blue-500/20 border-blue-500/30">
                Recommended
              </Badge>
            </div>
            
            <div className="p-3 border border-gray-700 bg-gray-800/30 rounded-md">
              <p className="font-medium">Option 2: June 17 (Monday)</p>
              <p className="text-sm text-gray-400">Original date + 2 business days</p>
            </div>
            
            <div className="p-3 border border-gray-700 bg-gray-800/30 rounded-md">
              <p className="font-medium">Option 3: June 20 (Thursday)</p>
              <p className="text-sm text-gray-400">One week extension from original</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Drafts Response Email",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-400" size={18} />
                <p className="text-blue-400 font-medium">Email Response Draft</p>
              </div>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                Ready to send
              </Badge>
            </div>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-md border border-gray-800 text-sm">
            <p className="font-medium mb-2">Subject: Re: Urgent: Need to Reschedule Deadline</p>
            <div className="space-y-3 text-gray-300">
              <p>Hi Alex,</p>
              <p>Thank you for reaching out about the project deadline change. I understand the urgency of the situation.</p>
              <p>After reviewing my schedule, I can offer the following alternatives to the June 10 date you requested:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li className="text-blue-400">Thursday, June 13 (recommended)</li>
                <li>Monday, June 17</li>
                <li>Thursday, June 20</li>
              </ul>
              <p>The June 13 date would work best with my current project schedule while still meeting your needs. Would this work for you?</p>
              <p>Best regards,<br />Your Name</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Updates Calendar & Tasks",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={18} />
                <p className="text-green-400 font-medium">All Systems Updated</p>
              </div>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                Complete
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-md border border-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <CalendarIcon size={16} className="text-blue-400" />
                <h3 className="font-medium">Calendar Updated</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                  <span>Project X Deadline</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-400 line-through">Jun 15</span>
                    <span className="text-blue-400">→</span>
                    <span>Jun 13</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-800/40 border border-gray-700 rounded">
                  <span>Project Y Deadline</span>
                  <span>Jun 11</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-800/40 border border-gray-700 rounded">
                  <span>Project Z Meetings</span>
                  <span>Jun 8-9</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded-md border border-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-purple-400" />
                <h3 className="font-medium">Task List Reorganized</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                  <span>Project X: Final Deliverable</span>
                  <span className="font-medium text-purple-400">Moved up</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-800/40 border border-gray-700 rounded">
                  <span>Send Project X Draft for Review</span>
                  <span>Jun 9</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-800/40 border border-gray-700 rounded">
                  <span>Schedule Client Update Call</span>
                  <span>Jun 12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let AI Handle Everything</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From email management to schedule coordination, our AI assistant works autonomously to keep your workflow efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
          <div className="lg:col-span-2 bg-secondary/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Inbox className="h-5 w-5" /> Email Workflow
            </h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Toggle View Mode</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={emailViewMode === "before" ? "secondary" : "outline"} 
                    size="sm"
                    onClick={() => setEmailViewMode("before")}
                    className="h-8"
                  >
                    Before AI
                  </Button>
                  <Button 
                    variant={emailViewMode === "after" ? "secondary" : "outline"} 
                    size="sm"
                    onClick={() => setEmailViewMode("after")}
                    className="h-8"
                  >
                    After AI
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-md border border-gray-800 bg-black/20">
              <div className="p-3 bg-gray-800/50 border-b border-gray-800 flex items-center justify-between">
                <h4 className="font-medium">Inbox</h4>
                {emailViewMode === "after" && (
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/30">
                    AI Managed
                  </Badge>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {emailViewMode === "after" ? (
                  <div className="divide-y divide-gray-800/60">
                    {sampleEmails.map((email) => (
                      <div
                        key={email.id}
                        className={`p-3 cursor-pointer hover:bg-gray-800/30 ${selectedEmail?.id === email.id ? 'bg-gray-800/40' : ''}`}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            {email.priority === "high" && <AlertCircle className="h-3 w-3 text-amber-500 mr-1" />}
                            <span className={`text-sm ${email.read ? 'text-gray-400' : 'font-medium'}`}>{email.sender}</span>
                          </div>
                          <span className="text-xs text-gray-500">{email.time}</span>
                        </div>
                        <div className="text-sm font-medium mb-1">{email.subject}</div>
                        <div className="text-xs text-gray-400 truncate">{email.preview}</div>
                        {email.id === "1" && (
                          <div className="mt-2 flex items-center gap-1">
                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-400/30 text-xs">
                              Automatically handled
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center h-40 flex flex-col items-center justify-center">
                    <div className="bg-gray-800/70 p-4 rounded-md w-full">
                      <div className="mb-4 text-amber-400 font-medium flex items-center justify-center gap-2">
                        <AlertCircle size={16} />
                        <span>Overflowing Inbox</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">48 unprocessed emails</p>
                      <p className="text-xs text-gray-500">3 schedule conflicts</p>
                      <p className="text-xs text-gray-500">7 urgent responses needed</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-secondary/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-semibold mb-4">AI Response & Resolution</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Step {emailStep + 1} of 4</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePrevStep}
                    disabled={emailStep === 0}
                    className="h-8"
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleNextStep}
                    disabled={emailStep === 3}
                    className="h-8"
                  >
                    Next
                  </Button>
                </div>
              </div>
              <Progress value={(emailStep + 1) * 25} className="h-1 mt-2" />
            </div>

            <div className="mb-3">
              <h4 className="font-medium text-lg">{steps[emailStep].title}</h4>
            </div>

            <div className="bg-black/20 rounded-md p-4 border border-gray-800 min-h-[300px]">
              {steps[emailStep].content}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-secondary/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5" /> Task Prioritization Matrix
            </h3>

            <div className="grid grid-cols-2 gap-3 h-[320px] relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-700 transform -translate-y-1/2"></div>
              <div className="absolute top-0 left-1/2 w-px h-full bg-gray-700 transform -translate-x-1/2"></div>
              
              <div className="absolute top-1 left-1 text-xs text-amber-400">Urgent</div>
              <div className="absolute top-1 right-1 text-xs text-green-400">Not Urgent</div>
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-blue-400 font-medium">Important</div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium">Less Important</div>

              <div className="p-2">
                {priorityMatrix
                  .filter(task => task.quadrant === "urgent-important")
                  .map(task => (
                    <div 
                      key={task.id} 
                      className={`p-3 bg-amber-500/10 border border-amber-500/30 rounded-md mb-2 cursor-pointer ${selectedTask === task.id ? 'ring-1 ring-amber-500' : ''}`}
                      onClick={() => setSelectedTask(task.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{task.title}</span>
                        <Badge variant="outline" className="text-xs bg-gray-800/60">{task.category}</Badge>
                      </div>
                      {selectedTask === task.id && (
                        <div className="mt-2 text-xs text-gray-400">{task.reasoning}</div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="p-2">
                {priorityMatrix
                  .filter(task => task.quadrant === "not-urgent-important")
                  .map(task => (
                    <div 
                      key={task.id} 
                      className={`p-3 bg-blue-500/10 border border-blue-500/30 rounded-md mb-2 cursor-pointer ${selectedTask === task.id ? 'ring-1 ring-blue-500' : ''}`}
                      onClick={() => setSelectedTask(task.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{task.title}</span>
                        <Badge variant="outline" className="text-xs bg-gray-800/60">{task.category}</Badge>
                      </div>
                      {selectedTask === task.id && (
                        <div className="mt-2 text-xs text-gray-400">{task.reasoning}</div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="p-2">
                {priorityMatrix
                  .filter(task => task.quadrant === "urgent-not-important")
                  .map(task => (
                    <div 
                      key={task.id} 
                      className={`p-3 bg-orange-500/10 border border-orange-500/30 rounded-md mb-2 cursor-pointer ${selectedTask === task.id ? 'ring-1 ring-orange-500' : ''}`}
                      onClick={() => setSelectedTask(task.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{task.title}</span>
                        <Badge variant="outline" className="text-xs bg-gray-800/60">{task.category}</Badge>
                      </div>
                      {selectedTask === task.id && (
                        <div className="mt-2 text-xs text-gray-400">{task.reasoning}</div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="p-2">
                {priorityMatrix
                  .filter(task => task.quadrant === "not-urgent-not-important")
                  .map(task => (
                    <div 
                      key={task.id} 
                      className={`p-3 bg-gray-700/30 border border-gray-700 rounded-md mb-2 cursor-pointer ${selectedTask === task.id ? 'ring-1 ring-gray-600' : ''}`}
                      onClick={() => setSelectedTask(task.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{task.title}</span>
                        <Badge variant="outline" className="text-xs bg-gray-800/60">{task.category}</Badge>
                      </div>
                      {selectedTask === task.id && (
                        <div className="mt-2 text-xs text-gray-400">{task.reasoning}</div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-secondary/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" /> Deadline Management
            </h3>
            
            <div className="h-[320px]">
              <ChartContainer
                className="h-full"
                config={{
                  emails: {
                    label: "Emails Managed",
                    color: "#818cf8",
                  },
                  meetings: {
                    label: "Meetings Scheduled",
                    color: "#22c55e",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="emailsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="meetingsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        borderColor: '#374151',
                        color: '#e5e7eb'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="emails"
                      stroke="#818cf8"
                      fillOpacity={1}
                      fill="url(#emailsGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="meetings"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#meetingsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 p-6 rounded-xl border border-white/5">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5" /> AI Response Generator
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <h4 className="text-sm font-medium mb-2">Select a Template</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={14} className="text-blue-400" />
                    <span className="font-medium">Meeting Reschedule</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-800/40 border border-gray-700 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-yellow-400" />
                    <span>Client Follow-up</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-800/40 border border-gray-700 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-purple-400" />
                    <span>Deadline Extension</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-black/20 rounded-md border border-gray-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">AI Generated Response</h4>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/30">
                  Meeting Reschedule
                </Badge>
              </div>
              <Separator className="mb-3" />
              <div className="space-y-3 text-sm text-gray-300">
                <p>Dear [Recipient],</p>
                <p>Thank you for your email regarding our meeting scheduled for Thursday. I understand scheduling changes happen, and I'm happy to find an alternative time that works for both of us.</p>
                <p>Based on my calendar availability, I can offer these alternative times:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Monday, May 20 between 2-4 PM</li>
                  <li>Tuesday, May 21 between 10 AM-12 PM</li>
                  <li>Wednesday, May 22 between 3-5 PM</li>
                </ul>
                <p>Please let me know which of these options works best for you, or if you need additional alternatives.</p>
                <div className="border-t border-gray-800 pt-3 mt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-xs text-green-400">
                      Using professional tone, offering multiple alternatives
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIHandleEverything;
