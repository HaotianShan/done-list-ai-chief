import { Button } from "@/components/ui/button";

const ValueProposition = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="hero-blur opacity-10"></div>

      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Your AI that <span className="gradient-text">acts with purpose</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-secondary/30 p-8 rounded-xl border border-white/5 text-left">
            <h3 className="text-xl font-semibold mb-4">
              Proactive, not passive
            </h3>
            <p className="text-muted-foreground">
              Learns your habits, preferences, and workflows to act
              autonomously. No more reminders that you ignore - just results
              you'll appreciate.
            </p>
          </div>

          <div className="bg-secondary/30 p-8 rounded-xl border border-white/5 text-left">
            <h3 className="text-xl font-semibold mb-4">
              Permission-based autonomy
            </h3>
            <p className="text-muted-foreground">
              It works like you would—always seeking approval before taking
              major actions. You stay in control while saving countless hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
