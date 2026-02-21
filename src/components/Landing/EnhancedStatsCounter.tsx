import { motion } from "framer-motion";
import { Shield, Users, TrendingUp, Clock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";

const EnhancedStatsCounter = () => {
  const stats = [
    { icon: Shield, value: 50, suffix: "Cr+", prefix: "₹", label: "Secured Transactions", color: "text-primary" },
    { icon: Users, value: 10000, suffix: "+", label: "Happy Users", color: "text-secondary" },
    { icon: TrendingUp, value: 99.9, suffix: "%", label: "Success Rate", color: "text-accent", decimals: 1 },
    { icon: Clock, value: 24, suffix: "/7", label: "Support Available", color: "text-primary" },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-muted/30">
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  className="text-center glass-card p-8 rounded-2xl hover-glow"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="flex justify-center mb-4"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="p-4 rounded-full bg-primary/10">
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </motion.div>
                  <div className={`text-4xl md:text-5xl font-outfit font-bold mb-2 ${stat.color}`}>
                    <AnimatedCounter 
                      end={stat.value} 
                      suffix={stat.suffix} 
                      prefix={stat.prefix}
                      decimals={stat.decimals || 0}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EnhancedStatsCounter;

