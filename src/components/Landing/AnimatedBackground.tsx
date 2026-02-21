import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs - slower, more subtle */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(270 60% 65%) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(230 60% 45%) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Floating particles - reduced count, slower */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-accent/15 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(230 60% 25%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(230 60% 25%) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;

