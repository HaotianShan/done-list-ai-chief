import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is this different from other AI video platforms?",
    answer:
      "Our AI agents handle everything. Just describe your product once, and we deliver professional 30-60 second ads with unique storylines—no prompt engineering or creative direction needed.",
  },
  {
    question: "When will early access be available?",
    answer:
      "Early access launches in the next few weeks! Join our waitlist for priority entry and a special founding-user discount.",
  },
  {
    question: "What if I’m unsatisfied with the video?",
    answer:
      "We guarantee quality. Email us within 30 days of receiving your video for a full refund—no questions asked.",
  },
  {
    question: "How do you protect my product information?",
    answer:
      "Your data is encrypted, never sold, and used solely for ad creation. You retain full ownership of all generated content. We prioritize your privacy and security.",
  },
  {
    question: "How long does ad creation take?",
    answer:
      "Most videos are ready in under 1 hour. Complex requests may take longer, but all are delivered significantly faster than manually created ads (which often take days).",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-white/10"
            >
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
