import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface StatsCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const StatsCounter = ({ value, suffix = "", prefix = "", duration = 2 }: StatsCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { 
        duration,
        ease: [0.25, 0.1, 0.25, 1]
      });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export default StatsCounter;

