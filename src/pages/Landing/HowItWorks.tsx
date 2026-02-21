import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedButton from "@/components/Landing/ui/animated-button";
import AnimatedBackground from "@/components/Landing/AnimatedBackground";
import ScrollReveal from "@/components/Landing/ScrollReveal";
import { FileText, CreditCard, Package, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Create Agreement",
    description: "Buyer and seller finalize terms, price, and delivery timeline. Both parties digitally sign the agreement.",
    color: "primary",
  },
  {
    icon: CreditCard,
    title: "Deposit Funds in Escrow",
    description: "Buyer sends payment to Bharose Pe's secure escrow. Funds are protected until work is confirmed.",
    color: "accent",
  },
  {
    icon: Package,
    title: "Seller Delivers Work",
    description: "Seller completes the product or service. Buyer verifies it meets the agreed terms.",
    color: "primary",
  },
  {
    icon: CheckCircle,
    title: "Automatic Payment Release",
    description: "Once confirmed, escrow funds are released instantly. Disputes are resolved quickly via AI mediation.",
    color: "accent",
  },
];

const HowItWorks = () => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 20%", "end 80%"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTopPct = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const dotTop = useMotionTemplate`${dotTopPct}%`;

  return (
    <div className="min-h-screen relative bg-background text-foreground overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-muted/20">
        <AnimatedBackground />
        <motion.div
          className="text-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How{" "}
            <span className="text-primary">
              Bharose Pe
            </span>{" "}
            Works
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Our simple 4-step process ensures safe, secure, and instant transactions.
          </p>
        </motion.div>
      </section>

      {/* Steps Section — Vertical zigzag timeline with motion (no color changes) */}
      <section ref={timelineRef} className="relative py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-border origin-top"
            style={{ scaleY: lineScaleY }}
          />

          {/* Traveling dot following scroll progress */}
          <motion.div
            className="hidden md:block absolute left-1/2 h-3 w-3 rounded-full bg-foreground shadow -translate-x-1/2"
            style={{ top: dotTop }}
          />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={step.title} className="relative grid md:grid-cols-2 items-center min-h-[160px]">
                  {/* Connector from center line to card */}
                  {isLeft ? (
                    <div className="hidden md:block absolute left-1/2 top-1/2 w-8 h-px bg-border -translate-y-1/2 -translate-x-full" />
                  ) : (
                    <div className="hidden md:block absolute left-1/2 top-1/2 w-8 h-px bg-border -translate-y-1/2" />
                  )}

                  <div className={isLeft ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10"}>
                    <motion.div
                      initial={{ opacity: 0, y: 24, x: isLeft ? -24 : 24 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, amount: 0.4 }}
                      whileHover={{ scale: 1.02, translateY: -4 }}
                      className="rounded-2xl border border-border/60 bg-background/60 backdrop-blur p-6 md:p-8"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          animate={{ y: [-4, 4, -4] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                          className="shrink-0 grid place-items-center size-14 md:size-16 rounded-xl border border-border bg-background/50 backdrop-blur"
                        >
                          <step.icon className="h-6 w-6 md:h-7 md:w-7 text-foreground" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold">{step.title}</h3>
                          <p className="text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty spacer column to maintain grid structure */}
                  <div className={isLeft ? "hidden md:block md:col-start-2" : "hidden md:block md:col-start-1"} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Example Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-muted/30">
        <AnimatedBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="down">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Transaction Example</h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                See how Bharose Pe secures both parties in a typical scenario
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={0.2}>
            <Card className="p-6 md:p-8 glass-card hover:shadow-glow transition-smooth">
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Scenario",
                    description: "Sarah buys a custom dress from Priya on Instagram for ₹5,000",
                    color: "primary",
                  },
                  {
                    step: "2",
                    title: "Agreement",
                    description: 'Terms agreed: "Custom dress, size M, blue, delivery in 7 days"',
                    color: "primary",
                  },
                  {
                    step: "3",
                    title: "Payment Secured",
                    description: "Funds deposited in Bharose Pe escrow, guaranteed to Priya",
                    color: "accent",
                  },
                  {
                    step: "4",
                    title: "Delivery & Confirmation",
                    description: "Priya delivers the dress, Sarah confirms satisfaction",
                    color: "primary",
                  },
                  {
                    step: "✓",
                    title: "Payment Released",
                    description: "₹5,000 automatically transferred to Priya. Both happy!",
                    color: "accent",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`w-12 h-12 ${
                        item.color === "primary"
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary/20 text-secondary-foreground"
                      } rounded-full flex items-center justify-center font-bold shadow-depth flex-shrink-0`}
                    >
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative text-center overflow-hidden bg-muted/20">
        <AnimatedBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be the First to Experience Safe Transactions</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're building India's escrow infrastructure. Join our early access list.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AnimatedButton variant="primary" size="lg">
                Join Early Access <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg">
                See How It Works
              </AnimatedButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

