import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
}

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "" 
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    scale: { x: 0, y: 0 },
  };

  const initial = direction === "scale" 
    ? { opacity: 0, scale: 0.95 }
    : { opacity: 0, ...directions[direction] };

  const animate = direction === "scale"
    ? { opacity: 1, scale: 1 }
    : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

