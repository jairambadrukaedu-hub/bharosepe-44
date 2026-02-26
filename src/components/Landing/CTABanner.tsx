import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, IndianRupee, Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useNavigate } from "react-router-dom";

export const CTABanner = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-4 bg-primary/5 relative overflow-hidden">
      {/* Animated background rupees */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${(i * 25) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <IndianRupee className="w-12 h-12" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Be the First to Experience Trust
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              We're building India's escrow infrastructure. Join our early access list and be the first to know when we launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-10 py-6 h-auto group" onClick={() => navigate('/auth')}>
                <Play className="mr-2 w-5 h-5" />
                Try the App
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 h-auto" onClick={() => navigate('/how-it-works')}>
                See How It Works
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

