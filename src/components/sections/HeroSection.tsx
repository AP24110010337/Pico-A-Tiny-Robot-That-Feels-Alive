"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import PicoRobot from "@/components/PicoRobot";
import GlowButton from "@/components/ui/GlowButton";

const Pico3DViewer = dynamic(() => import("@/components/Pico3DViewer"), {
  ssr: false,
});

export default function HeroSection() {
  const [show3D, setShow3D] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-between overflow-x-hidden"
    >
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.08) 0%, rgba(124,58,237,0.05) 30%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 60%)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] w-[300px] h-[300px] rounded-full animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 60%)",
            animationDelay: "0.8s",
          }}
        />
      </div>

      {/* Top spacer to balance the flex-between layout */}
      <div className="w-full h-24 sm:h-32 shrink-0 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 shrink-0 my-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Robot */}
        <motion.div
          className="mb-6 sm:mb-8 animate-float"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <PicoRobot size={160} expression="normal" enableTracking />
          {/* Desktop gets larger robot */}
          <style>{`@media(min-width:640px){.animate-float svg{width:240px!important;height:276px!important}}`}</style>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-[64px] font-bold leading-[1.1] text-pico-white mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Meet{" "}
          <span className="text-gradient-cyan">Pico</span>.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-pico-gray max-w-md leading-relaxed mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          A tiny robot that feels alive.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <GlowButton href="#story" variant="primary">
            Experience Pico
          </GlowButton>
          <GlowButton href="#pricing" variant="secondary">
            Pre-order
          </GlowButton>
        </motion.div>

        {/* View in 3D button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={() => setShow3D(true)}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-pico-cyan/80 border border-pico-cyan/20 bg-pico-cyan/5 cursor-pointer overflow-hidden transition-all duration-300 hover:border-pico-cyan/40 hover:text-pico-cyan hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* 3D icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3L2 8L12 13L22 8L12 3Z" />
              <path d="M2 16L12 21L22 16" />
              <path d="M2 12L12 17L22 12" />
            </svg>
            View in 3D
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 3D Viewer Modal */}
      <Pico3DViewer isOpen={show3D} onClose={() => setShow3D(false)} />

      {/* Scroll indicator container */}
      <div className="w-full pb-8 pt-4 flex flex-col items-center justify-end shrink-0 pointer-events-none">
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-xs text-pico-gray/60 tracking-widest uppercase pointer-events-none">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-pico-gray/30 flex items-start justify-center p-1 pointer-events-none"
            animate={{ borderColor: ["rgba(156,163,175,0.3)", "rgba(0,229,255,0.3)", "rgba(156,163,175,0.3)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-pico-cyan"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
