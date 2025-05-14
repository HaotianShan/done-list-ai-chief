import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  Inbox,
  Mail,
  AlertCircle,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    sender: "Alex W (Client)",
    subject: "Urgent: Need to Reschedule Deadline",
    preview:
      "Hey Alex, I just realized that we need to move the project deadline due to some unforeseen circumstances...",
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

const AIHandleEverything = () => {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(
    sampleEmails[0]
  );
  const [progress, setProgress] = useState(0);
  const [autoProgressionActive, setAutoProgressionActive] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<
    "deadline" | "meeting" | "follow-up"
  >("deadline");

  const stages = [
    { id: 0, label: "Before AI" },
    { id: 1, label: "After AI" },
    { id: 2, label: "AI Responses" },
  ];

  const templates: {
    type: "deadline" | "meeting" | "follow-up";
    title: string;
    icon: JSX.Element;
    badgeColor: string;
    content: JSX.Element;
  }[] = [
    {
      type: "deadline",
      title: "Deadline Change",
      icon: <AlertCircle size={14} className="text-amber-400" />,
      badgeColor: "amber",
      content: (
        <div className="space-y-3 text-sm text-gray-300">
          <p>Dear Alex,</p>
          <p>
            Thank you for your email regarding the Project X deadline
            adjustment. I appreciate your proactive communication and have
            analyzed potential solutions that balance both our schedules:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-amber-400">
              <span className="font-medium">Recommended:</span> Thursday, June
              13 (post Project Y completion)
            </li>
            <li>Monday, June 17 (original + 2 business days)</li>
            <li>Thursday, June 20 (1-week extension)</li>
          </ul>
          <p>
            The June 13 date maintains project momentum while accommodating your
            needs. Please confirm if this works for your timeline, or we can
            discuss alternative arrangements.
          </p>
          <p className="pt-2">
            Best regards,
            <br />
            [Your Name]
          </p>
          <div className="border-t border-gray-800 pt-3 mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-xs text-green-400">
                Professional tone maintained • Multiple options provided •
                Calendar integration verified
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "meeting",
      title: "Meeting Reschedule",
      icon: <CalendarIcon size={14} className="text-blue-400" />,
      badgeColor: "blue",
      content: (
        <div className="space-y-3 text-sm text-gray-300">
          <p>Hi Team,</p>
          <p>
            Regarding our upcoming strategy meeting, I propose we reschedule to
            accommodate all participants' availability:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-blue-400">
              <span className="font-medium">New Time:</span> Thursday 2:00 PM
              (originally Tuesday 10:00 AM)
            </li>
            <li>Alternative Option: Friday 11:00 AM</li>
          </ul>
          <p>
            This adjustment ensures full team participation while maintaining
            our project timeline. Please confirm your availability at your
            earliest convenience.
          </p>
          <p className="pt-2">
            Best regards,
            <br />
            [Your Name]
          </p>
          <div className="border-t border-gray-800 pt-3 mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-xs text-green-400">
                Time zone verified • Conflict-free • Buffer time included
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "follow-up",
      title: "Follow-up Reminder",
      icon: <Clock size={14} className="text-purple-400" />,
      badgeColor: "purple",
      content: (
        <div className="space-y-3 text-sm text-gray-300">
          <p>Hi [Client Name],</p>
          <p>
            Just following up on our previous discussion regarding the project
            proposal. Here's a friendly reminder:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-purple-400">
              <span className="font-medium">Action Required:</span> Feedback
              submission by EOD Friday
            </li>
            <li>Next Steps: Finalize contract terms</li>
          </ul>
          <p>
            Please let me know if you need any additional information or require
            an extension for the feedback period.
          </p>
          <p className="pt-2">
            Best regards,
            <br />
            [Your Name]
          </p>
          <div className="border-t border-gray-800 pt-3 mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-xs text-green-400">
                Professional tone • Clear deadlines • Next steps outlined
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStage((prev) => Math.min(prev + 1, 2));
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentStage]);

  useEffect(() => {
    const progressValue = (currentStage / (stages.length - 1)) * 100;
    setProgress(progressValue);
  }, [currentStage]);

  useEffect(() => {
    if (!autoProgressionActive) return;

    const timer = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= stages.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [autoProgressionActive, stages.length]);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let AI Handle Everything
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From email management to schedule coordination, our AI assistant
            works autonomously to keep your workflow efficient.
          </p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="relative mb-12 px-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => {
                setCurrentStage(stage.id);
                setAutoProgressionActive(false);
                if (stage.id === 2) setSelectedTemplate("deadline");
              }}
              className="flex flex-col items-center group relative z-10 focus:outline-none"
              aria-label={`Go to ${stage.label} stage`}
            >
              {/* Stage indicator */}
              <div className="relative mb-3">
                <div className="absolute -inset-2 rounded-full bg-[#6cacfc]/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div
                  className={`relative flex items-center justify-center w-7 h-7 transition-all duration-300 ${
                    currentStage >= stage.id
                      ? "text-white bg-[#6cacfc] shadow-sm shadow-[#6cacfc]/30"
                      : "text-gray-400 bg-gray-800 border border-gray-600/60 group-hover:border-[#6cacfc]/30"
                  } ${currentStage === stage.id ? "scale-110" : "scale-100"} rounded-full`}
                >
                  {currentStage > stage.id ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-medium">{stage.id + 1}</span>
                  )}
                </div>
              </div>

              {/* Stage label */}
              <span
                className={`text-xs font-medium tracking-wide transition-all ${
                  currentStage >= stage.id
                    ? "text-[#6cacfc] opacity-100 translate-y-0"
                    : "text-gray-400 opacity-90 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100"
                }`}
              >
                {stage.label}
                {currentStage === stage.id && (
                  <span className="block h-px mt-0.5 bg-gradient-to-r from-[#6cacfc]/40 to-[#6cacfc]/10 transition-all" />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Progress track */}
        <div className="absolute top-3.5 left-0 right-0 h-[3px] bg-gray-800/80 backdrop-blur-sm rounded-full">
          {/* Progress line */}
          <div
            className="relative h-full bg-[#6cacfc] transition-all duration-500 ease-[cubic-bezier(0.83,0,0.17,1)]"
            style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
          >
            <div className="absolute right-0 -top-[2px] w-2 h-2 bg-[#6cacfc] rounded-full shadow-[0_0_8px_#6cacfc55]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] opacity-20 bg-[length:200%_100%] animate-shine" />
          </div>
        </div>
      </div>

      {/* Dynamic Content Section */}
      <div className="relative min-h-[500px]">
        {/* Before/After AI Content */}
        <div
          className={`transition-all duration-1000 ${
            currentStage === 2
              ? "opacity-0 blur-sm scale-95"
              : "opacity-100 blur-none scale-100"
          }`}
        >
          <div className="w-full lg:w-2/3 mx-auto bg-secondary/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 justify-center">
              <Inbox className="h-5 w-5" /> Email Workflow
            </h3>

            <div className="overflow-hidden rounded-md border border-gray-800 bg-black/20">
              <div className="p-3 bg-gray-800/50 border-b border-gray-800 flex items-center justify-between">
                <h4 className="font-medium">Inbox</h4>
                {currentStage >= 1 && (
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-400 border-blue-400/30"
                  >
                    AI Managed
                  </Badge>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {currentStage === 0 ? (
                  <div className="p-4 text-center h-40 flex flex-col items-center justify-center">
                    <div className="bg-gray-800/70 p-4 rounded-md w-full">
                      <div className="mb-2 text-amber-400 font-medium flex items-center justify-center gap-2">
                        <AlertCircle size={16} />
                        <span>48 unprocessed emails</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        3 schedule conflicts
                      </p>
                      <p className="text-xs text-gray-500">
                        7 urgent responses needed
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-800/60">
                    {sampleEmails.map((email) => (
                      <div
                        key={email.id}
                        className={`p-3 cursor-pointer hover:bg-gray-800/30 ${selectedEmail?.id === email.id ? "bg-gray-800/40" : ""}`}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            {email.priority === "high" && (
                              <AlertCircle className="h-3 w-3 text-amber-500 mr-1" />
                            )}
                            <span
                              className={`text-sm ${email.read ? "text-gray-400" : "font-medium"}`}
                            >
                              {email.sender}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {email.time}
                          </span>
                        </div>
                        <div className="text-sm font-medium mb-1">
                          {email.subject}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {email.preview}
                        </div>
                        {email.id === "1" && (
                          <div className="mt-2 flex items-center gap-1">
                            <Badge
                              variant="outline"
                              className="bg-green-500/10 text-green-400 border-green-400/30 text-xs"
                            >
                              Automatically handled
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Response Generator */}
        <div
          className={`absolute top-0 w-full transition-all duration-1000 ${
            currentStage === 2
              ? "opacity-100 blur-none scale-100"
              : "opacity-0 blur-sm scale-95"
          }`}
        >
          <div className="w-full lg:w-2/3 mx-auto bg-secondary/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" /> AI Response Generator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h4 className="text-sm font-medium mb-2">Select a Template</h4>
                <div className="space-y-2">
                  {templates.map((template) => (
                    <div
                      key={template.type}
                      onClick={() =>
                        setSelectedTemplate(
                          template.type as "deadline" | "meeting" | "follow-up"
                        )
                      }
                      className={`p-3 cursor-pointer transition-all ${
                        selectedTemplate === template.type
                          ? `bg-${template.badgeColor}-500/10 border-${template.badgeColor}-500/30`
                          : "bg-gray-800/40 border-gray-700 hover:border-gray-600"
                      } border rounded-md`}
                    >
                      <div className="flex items-center gap-2">
                        {template.icon}
                        <span
                          className={
                            selectedTemplate === template.type
                              ? "font-medium"
                              : ""
                          }
                        >
                          {template.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 bg-black/20 rounded-md border border-gray-800 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">AI Generated Response</h4>
                  <Badge
                    variant="outline"
                    className={`bg-${templates.find((t) => t.type === selectedTemplate)?.badgeColor}-500/10 text-${templates.find((t) => t.type === selectedTemplate)?.badgeColor}-400 border-${templates.find((t) => t.type === selectedTemplate)?.badgeColor}-400/30`}
                  >
                    {templates.find((t) => t.type === selectedTemplate)?.title}
                  </Badge>
                </div>
                <Separator className="mb-3" />
                {templates.find((t) => t.type === selectedTemplate)?.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIHandleEverything;
