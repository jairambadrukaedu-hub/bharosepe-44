import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Shield, Bot, Scale, Lock } from "lucide-react";

const EscrowFlowAnimation = () => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await controls.start("flow");
        await controls.start("settle");
      }
    };
    sequence();
  }, [controls]);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#040B16] via-[#081C2E] to-[#0C2845]">
      {/* ✨ Animated light beams for depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-transparent via-[#A1E4FF33] to-transparent blur-xl animate-pulse-slow" />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-[#C7AEFF33] to-transparent blur-xl animate-pulse-slow delay-700" />
      </div>

      {/* 🌐 Core Container */}
      <div className="relative flex flex-col items-center justify-center text-center z-10">
        {/* 🔒 Escrow Vault */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 30px #C7AEFF55",
              "0 0 70px #A1E4FF99",
              "0 0 30px #C7AEFF55",
            ],
            scale: [1, 1.03, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          className="relative w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-[#0F2A4F] to-[#153F72] backdrop-blur-3xl border border-white/10 flex items-center justify-center"
        >
          <Lock className="w-14 h-14 text-[#C7AEFF]" strokeWidth={1.5} />
          {/* Inner pulse ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-[#A1E4FF77] opacity-80 blur-sm"
          />
        </motion.div>

        {/* ⚡ Flowing energy ring */}
        <motion.div
          variants={{
            flow: { opacity: [0.4, 1, 0.4], x: [0, 10, 0] },
            settle: { opacity: 1, x: 0 },
          }}
          animate={controls}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          className="absolute w-[420px] h-[420px] border border-white/5 rounded-full blur-2xl bg-gradient-to-r from-[#C7AEFF22] to-[#A1E4FF22]"
        />

        {/* 🛡️ Floating trust icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="absolute top-[15%] left-[20%] flex flex-col items-center text-center"
        >
          <div className="bg-[#A1E4FF22] p-4 rounded-2xl backdrop-blur-xl border border-white/10">
            <Shield className="text-[#A1E4FF] w-10 h-10 mb-2" />
          </div>
          <p className="text-xs text-white/60 mt-1">Buyer Secured</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-[15%] right-[20%] flex flex-col items-center text-center"
        >
          <div className="bg-[#C7AEFF22] p-4 rounded-2xl backdrop-blur-xl border border-white/10">
            <Scale className="text-[#C7AEFF] w-10 h-10 mb-2" />
          </div>
          <p className="text-xs text-white/60 mt-1">Escrow Protected</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute top-[55%] right-[10%] flex flex-col items-center text-center"
        >
          <div className="bg-[#A1E4FF22] p-4 rounded-2xl backdrop-blur-xl border border-white/10">
            <Bot className="text-[#A1E4FF] w-10 h-10 mb-2" />
          </div>
          <p className="text-xs text-white/60 mt-1">AI Verified</p>
        </motion.div>

        {/* 🪩 Caption */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-semibold mt-12 text-transparent bg-clip-text bg-gradient-to-r from-[#C7AEFF] to-[#A1E4FF]"
        >
          The Escrow Flow
        </motion.h3>
        <p className="text-white/60 mt-2 text-sm max-w-md">
          Every transaction passes through Bharose Pe’s escrow vault —
          verified, AI-monitored, and protected before release.
        </p>
      </div>

      {/* 🫧 Floating particles for motion depth */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C7AEFF55]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default EscrowFlowAnimation;

