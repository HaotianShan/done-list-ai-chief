import { Mail, Calendar, Check, Clock } from "lucide-react";

const features = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Autopilot",
    description:
      "Drafts responses, filters priorities, and sends replies in your tone.",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Self-Optimizing Calendar",
    description:
      "Schedules meetings, blocks focus time, and avoids conflicts—no more back-and-forth.",
  },
  {
    icon: <Check className="h-6 w-6" />,
    title: "Task Execution",
    description:
      "Handles repetitive workflows (e.g., invoice approvals, report generation) so you don't have to.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Context-Aware Memory",
    description:
      "Remembers every project detail, past communication, and your preferences.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Most apps help you organize chaos.
            <br />
            <span className="gradient-text">Ours eliminates it.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Imagine an assistant that doesn't just remind you—it{" "}
            <em>handles</em> the work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary/30 p-8 rounded-xl border border-white/5 hover:border-primary/20 transition-all hover:bg-secondary/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground pl-16">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
