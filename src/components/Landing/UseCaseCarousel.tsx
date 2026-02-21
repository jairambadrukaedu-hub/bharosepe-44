import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Laptop, ShoppingBag, Wrench, Package, Home, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Button } from "./ui/button";

const useCases = [
  {
    icon: ShoppingBag,
    title: "Creator–Brand Collaborations",
    description: "Secure milestone-based payments for influencer and D2C brand partnerships.",
  },
  {
    icon: Wrench,
    title: "Startup–Agency Agreements",
    description: "Protect advance payments and structure high-value service contracts with confidence.",
  },
  {
    icon: Laptop,
    title: "High-Skill Freelancers",
    description: "Get paid securely for development, design, consulting, and growth projects.",
  },
  {
    icon: Package,
    title: "High-Value Service Contracts",
    description: "Structure large milestone-based projects with secure escrow-backed payments.",
  },
  {
    icon: Home,
    title: "Significant Remote Transactions",
    description: "Protect high-value digital or cross-city deals with a neutral escrow layer.",
  },
];

export const UseCaseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % useCases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % useCases.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Who Uses Bharose Pe?
          </h2>
          <p className="text-muted-foreground text-center mb-16 text-lg">
            For everyone who deals with trust in payments
          </p>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-3xl p-12 md:p-16 text-center shadow-xl"
            >
              {(() => {
                const CurrentIcon = useCases[currentIndex].icon;
                return (
                  <motion.div
                    className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-8 bg-primary/10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <CurrentIcon
                      className="w-12 h-12 text-primary"
                    />
                  </motion.div>
                );
              })()}
              <h3 className="text-3xl font-bold mb-4">{useCases[currentIndex].title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {useCases[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {useCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="text-lg px-8">
            Join Early Access <ArrowRight className="ml-2 w-5 h-5 inline" />
          </Button>
        </div>
      </div>
    </section>
  );
};

