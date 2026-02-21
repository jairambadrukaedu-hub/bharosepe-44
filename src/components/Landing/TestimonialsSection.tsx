import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Priya Sharma",
    profession: "Freelance Designer",
    quote: "I finally received payments without stress — thanks to Bharose Pe. No more chasing clients!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    profession: "Instagram Seller",
    quote: "My customers trust me more now. Bharose Pe handles everything professionally.",
    rating: 5,
  },
  {
    name: "Anjali Mehta",
    profession: "Tutor",
    quote: "Perfect for my coaching business. Parents pay confidently, I receive on time.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 px-4 bg-muted/50">
      <div className="container mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Trusted by thousands
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <motion.div
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-shadow"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.profession}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

