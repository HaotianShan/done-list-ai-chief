
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does it handle privacy?",
    answer: "We take privacy extremely seriously. Your data is end-to-end encrypted, and we follow strict data minimization principles. Your AI assistant only has access to the integrations you explicitly authorize, and you can revoke access at any time."
  },
  {
    question: "Can I review actions before they're sent?",
    answer: "Absolutely. Our AI operates on a permission-based model. For important actions like sending emails or scheduling meetings, you'll receive a notification to approve before anything is sent. You can set custom permission levels based on action types."
  },
  {
    question: "Which tools and platforms do you integrate with?",
    answer: "We integrate with all major productivity platforms including Gmail, Outlook, Google Calendar, Microsoft 365, Slack, Zoom, Notion, Asana, Trello, and 40+ others. Our API allows for custom integrations as well."
  },
  {
    question: "How is this different from ChatGPT or other AI assistants?",
    answer: "Unlike general AI assistants that simply respond to prompts, our AI takes initiative. It learns your workflows, tone, and preferences to proactively handle tasks. It's specifically designed for busy professionals to execute real work, not just answer questions."
  },
  {
    question: "When will early access be available?",
    answer: "We're rolling out early access invites in waves starting Q3 2023. Waitlist position determines your place in line, and referring others moves you up the queue. Join now to secure your spot!"
  },
];

const FAQ = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10">
              <AccordionTrigger className="text-lg font-medium py-5 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
