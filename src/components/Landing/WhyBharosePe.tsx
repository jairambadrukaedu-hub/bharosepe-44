import { motion } from "framer-motion";
import { Shield, Eye, Handshake, Ban } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Shield,
    title: "Your Money is Protected",
    description: "Funds are held safely until both buyer and seller are satisfied with the deal.",
  },
  {
    icon: Eye,
    title: "Fully Transparent",
    description: "Both parties can see the deal status at every step. No surprises, no hidden fees.",
  },
  {
    icon: Handshake,
    title: "Fair for Everyone",
    description: "Buyer gets what they paid for. Seller gets paid on time. Simple as that.",
  },
  {
    icon: Ban,
    title: "No More Scams",
    description: "Stop worrying about fraud on Instagram, OLX, or freelancing deals. We've got you covered.",
  },
];

export const WhyBharosePe = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-muted/20">
      <div className="relative z-10 container mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-center mb-4">
            Why <span className="text-primary">Bharose Pe</span>?
          </h2>
          <p className="text-muted-foreground text-center mb-16 text-lg max-w-2xl mx-auto">
            Secure payments, zero complexity, complete peace of mind
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                className="glass-card p-8 rounded-2xl relative overflow-hidden group hover-glow"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-outfit font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

