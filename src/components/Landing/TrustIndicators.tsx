import { motion } from "framer-motion";
import { Shield, Award, Users, TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const stats = [
  {
    icon: Shield,
    value: "₹50Cr+",
    label: "Secured in Escrow",
    color: "hsl(230 60% 25%)",
  },
  {
    icon: Users,
    value: "10,000+",
    label: "Trusted Users",
    color: "hsl(270 60% 65%)",
  },
  {
    icon: Award,
    value: "99.9%",
    label: "Success Rate",
    color: "hsl(230 60% 35%)",
  },
  {
    icon: TrendingUp,
    value: "24/7",
    label: "Active Protection",
    color: "hsl(270 55% 50%)",
  },
];

const platforms = [
  "Instagram", "Facebook", "LinkedIn", "WhatsApp", 
  "OLX", "Quikr", "Freelancing Sites", "Ticket Resale"
];

const TrustIndicators = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-background">
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1} direction="scale">
              <motion.div
                className="bg-card border border-border p-6 rounded-2xl text-center hover-lift"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-primary" strokeWidth={2.5} />
                  </div>
                </div>
                <motion.div
                  className="text-3xl md:text-4xl font-bold mb-2 text-foreground"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Built for platforms */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg font-semibold text-muted-foreground mb-6">
              Built for buyers and sellers on:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {platforms.map((platform, index) => (
                <motion.span
                  key={platform}
                  className="bg-card border border-border px-5 py-2.5 rounded-full text-sm font-medium text-foreground hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {platform}
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustIndicators;

