import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";

interface FloatingParticlesProps {
  count?: number;
}

const FloatingParticles = ({ count = 15 }: FloatingParticlesProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/10"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50 + "%"],
            scale: [0, 1, 1, 0],
            opacity: [0, 0.3, 0.3, 0],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          <IndianRupee className="w-6 h-6" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;

