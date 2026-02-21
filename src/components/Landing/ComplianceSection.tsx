import { Shield, Scale, Search, Lock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const compliance = [
  {
    icon: Shield,
    title: "RBI Escrow Compliance Ready",
    description: "Following RBI guidelines for secure escrow operations",
  },
  {
    icon: Scale,
    title: "Mediation Act, 2023 Integration",
    description: "Legal framework for fair dispute resolution",
  },
  {
    icon: Search,
    title: "PAN + KYC Mandatory",
    description: "Complete verification for all transactions",
  },
  {
    icon: Lock,
    title: "ISO-Grade Data Security",
    description: "Bank-level encryption and data protection",
  },
];

export const ComplianceSection = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Legal Trust & Compliance
          </h2>
          <p className="text-muted-foreground text-center mb-16 text-lg">
            Transparent, secure, and fully compliant
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {compliance.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl transition-all"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

