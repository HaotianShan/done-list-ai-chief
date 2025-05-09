
const testimonials = [
  {
    quote: "This isn't Clippy 2.0—it's like hiring a COO for $0/month.",
    author: "CEO, Stealth Startup",
    avatar: "/placeholder.svg",
  },
  {
    quote: "Replied to 30+ emails flawlessly while I was offline. Game-changer.",
    author: "Beta Tester",
    avatar: "/placeholder.svg",
  },
  {
    quote: "My calendar is finally optimized for deep work. It blocked time exactly how I would.",
    author: "Product Leader, Fortune 500",
    avatar: "/placeholder.svg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4 bg-black/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Early Users Are Saying
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-secondary/20 p-8 rounded-xl border border-white/5 flex flex-col"
            >
              <blockquote className="flex-grow">
                <p className="text-lg italic text-muted-foreground mb-6">"{testimonial.quote}"</p>
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/50 overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
