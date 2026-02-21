import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Lock, Package, CheckCircle2, Banknote, ArrowDown } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Funds Secured",
    description: "Buyer deposits funds into Bharose Pe's secure escrow vault",
    icon: Lock,
    accent: "primary",
  },
  {
    number: 2,
    title: "Delivery Made",
    description: "Seller delivers the product or service to buyer",
    icon: Package,
    accent: "secondary",
  },
  {
    number: 3,
    title: "Confirmation",
    description: "Buyer confirms satisfaction or raises concerns",
    icon: CheckCircle2,
    accent: "accent",
  },
  {
    number: 4,
    title: "Payment Released",
    description: "Bharose Pe instantly releases funds to seller",
    icon: Banknote,
    accent: "primary",
  },
];

const HowItWorksSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-background">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            The Bharose Pe Solution
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Secure, Simple, and Fair — protecting both buyers and sellers through digital escrow
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40"
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-16 md:gap-20">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-center gap-8 md:gap-12 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                  onMouseEnter={() => setActiveStep(step.number)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg"
                      animate={activeStep === step.number ? {
                        scale: [1, 1.5, 1],
                        boxShadow: [
                          "0 0 0 0 hsl(var(--primary) / 0.4)",
                          "0 0 0 12px hsl(var(--primary) / 0)",
                          "0 0 0 0 hsl(var(--primary) / 0)",
                        ],
                      } : {}}
                      transition={{ duration: 1.5, repeat: activeStep === step.number ? Infinity : 0 }}
                    />
                  </div>

                  {/* Card */}
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? "" : ""}`}>
                    <motion.div
                      className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors duration-300 cursor-pointer"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Hover glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />

                      <div className="relative z-10 flex items-start gap-5">
                        {/* Icon */}
                        <motion.div
                          className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center"
                          animate={activeStep === step.number ? {
                            backgroundColor: ["hsl(var(--primary) / 0.1)", "hsl(var(--primary) / 0.2)", "hsl(var(--primary) / 0.1)"],
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <step.icon className="w-8 h-8 text-primary" strokeWidth={2} />
                        </motion.div>

                        <div className="flex-1">
                          {/* Step number */}
                          <span className="inline-block text-xs font-semibold text-primary/60 uppercase tracking-wider mb-1">
                            Step {step.number}
                          </span>
                          <h3 className="font-outfit text-xl md:text-2xl font-bold text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="font-inter text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress bar on hover */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20 rounded-b-2xl overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={activeStep === step.number ? { opacity: 1 } : { opacity: 0 }}
                      >
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: "0%" }}
                          animate={activeStep === step.number ? { width: "100%" } : { width: "0%" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>

          {/* Animated arrow between steps (mobile) */}
          {isInView && (
            <motion.div
              className="absolute left-8 -translate-x-1/2 bottom-[-30px] md:left-1/2"
              animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-primary" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

