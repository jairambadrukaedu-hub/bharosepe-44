import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const AnimatedButton = ({ 
  children, 
  variant = "primary", 
  size = "md",
  className,
  ...props 
}: AnimatedButtonProps) => {
  const variants = {
    primary: "gradient-premium text-white shadow-glow",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(
        "relative rounded-full font-semibold overflow-hidden group",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      {...props}
    >
      {/* Ripple effect on hover */}
      <motion.span
        className="absolute inset-0 bg-white/10"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 2, opacity: [0, 0.2, 0] }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 1 }}
      />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default AnimatedButton;

