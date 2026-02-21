import { motion } from "framer-motion";
import { Shield, FileCheck, Bot, IndianRupee } from "lucide-react";

const AnimatedVault = () => {
  return (
    <div className="relative w-full max-w-lg aspect-square">
      {/* Central Vault Core */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 2,
          ease: [0.22, 0.9, 0.35, 1],
        }}
      >
        {/* Vault Glow */}
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-[60px]"
          style={{
            background: "radial-gradient(circle, #C7AEFF 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.22, 0.9, 0.35, 1],
          }}
        />

        {/* Vault Container - Glassmorphism */}
        <motion.div
          className="relative w-56 h-56 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center"
          style={{
            boxShadow: "0 8px 32px rgba(199, 174, 255, 0.2)",
          }}
          animate={{
            boxShadow: [
              "0 8px 32px rgba(199, 174, 255, 0.2)",
              "0 8px 42px rgba(199, 174, 255, 0.35)",
              "0 8px 32px rgba(199, 174, 255, 0.2)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Vault Icon/Symbol */}
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <Shield className="w-24 h-24 text-white/80" strokeWidth={1.5} />
            
            {/* Central Rupee Symbol */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 3,
                ease: [0.22, 0.9, 0.35, 1],
              }}
            >
              <IndianRupee className="w-10 h-10 text-[#C7AEFF]" strokeWidth={2.5} />
            </motion.div>
          </motion.div>

          {/* Inner Glow Ring */}
          <motion.div
            className="absolute inset-4 rounded-2xl border-2 border-white/10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          />
        </motion.div>
      </motion.div>

      {/* Light Ray Expansion */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.8, 2.2] }}
        transition={{
          duration: 2.5,
          delay: 4,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div
          className="w-64 h-64 rounded-full border-2 border-white/20"
          style={{
            boxShadow: "0 0 40px rgba(199, 174, 255, 0.4)",
          }}
        />
      </motion.div>

      {/* Floating Rupee Particles - Flow into Vault */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        const startRadius = 280;
        const startX = Math.cos((angle * Math.PI) / 180) * startRadius;
        const startY = Math.sin((angle * Math.PI) / 180) * startRadius;

        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4"
            initial={{
              x: startX,
              y: startY,
              opacity: 0,
            }}
            animate={{
              x: [startX, startX * 0.7, 0],
              y: [startY, startY * 0.7, 0],
              opacity: [0, 1, 0],
              scale: [1, 0.8, 0.3],
            }}
            transition={{
              duration: 3.5,
              delay: 2 + i * 0.35,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <IndianRupee
                className="w-6 h-6 text-[#C7AEFF]"
                strokeWidth={2}
              />
              {/* Particle Trail */}
              <motion.div
                className="absolute inset-0 rounded-full blur-md"
                style={{
                  background:
                    "radial-gradient(circle, #C7AEFF 0%, transparent 70%)",
                }}
                animate={{
                  opacity: [0.6, 0.2, 0],
                }}
                transition={{
                  duration: 1.8,
                  delay: 2 + i * 0.35,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Orbiting Trust Icons */}
      {[
        { Icon: Shield, label: "PAN", color: "#C7AEFF", delay: 0 },
        { Icon: FileCheck, label: "Aadhaar", color: "#A1E4FF", delay: 2 },
        { Icon: Bot, label: "AI Dispute", color: "#FFB4E6", delay: 4 },
      ].map(({ Icon, label, color, delay }, i) => {
        const orbitRadius = 180;
        const orbitDuration = 25;

        return (
          <motion.div
            key={label}
            className="absolute top-1/2 left-1/2 w-20 h-20 -ml-10 -mt-10"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              rotate: 360,
            }}
            transition={{
              opacity: { duration: 1, delay: 5 + delay },
              rotate: {
                duration: orbitDuration,
                delay: 5 + delay,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            style={{
              transformOrigin: `${orbitRadius}px ${orbitRadius}px`,
            }}
          >
            <motion.div
              className="relative"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: orbitDuration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Icon Container - Glassmorphism */}
              <motion.div
                className="w-16 h-16 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center relative"
                style={{
                  boxShadow: `0 4px 16px ${color}40`,
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: `0 8px 20px ${color}50`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
              >
                <Icon className="w-7 h-7" style={{ color }} strokeWidth={2} />
                
                {/* Tooltip Label */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-xs text-white font-medium"
                  initial={{ opacity: 0, y: -5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {label}
                </motion.div>
              </motion.div>

              {/* Icon Glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl blur-xl"
                style={{
                  background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnimatedVault;

