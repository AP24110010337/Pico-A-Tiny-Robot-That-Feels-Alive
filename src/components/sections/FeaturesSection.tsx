"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

interface Feature {
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  bgGlow: string;
}

const features: Feature[] = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="16" stroke="#00E5FF" strokeWidth="1.5" />
        <circle cx="13" cy="16" r="3" fill="#00E5FF" />
        <circle cx="23" cy="16" r="3" fill="#00E5FF" />
        <path d="M12 23 Q18 28 24 23" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    title: "Expressive AI",
    shortDesc: "Feels. Reacts. Connects.",
    fullDesc:
      "Pico shows emotion through dynamic eye animations, body sway, and color shifts. Over 30 unique expressions make every interaction feel genuine and alive.",
    color: "#00E5FF",
    bgGlow: "rgba(0, 229, 255, 0.12)",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4 L18 32 M4 18 L32 18" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="18" r="7" stroke="#A78BFA" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="2.5" fill="#A78BFA" />
        <circle cx="18" cy="18" r="12" stroke="#A78BFA" strokeWidth="0.5" strokeDasharray="3 3" />
      </svg>
    ),
    title: "Touch Interaction",
    shortDesc: "Tap. Hold. Stroke.",
    fullDesc:
      "Pico responds to every gesture with a unique, context-aware reaction. Capacitive sensors cover its entire body, creating an intuitive haptic language.",
    color: "#A78BFA",
    bgGlow: "rgba(167, 139, 250, 0.12)",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" stroke="#34D399" strokeWidth="1.5" />
        <path d="M18 8 L18 18 L25 23" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="2" fill="#34D399" />
      </svg>
    ),
    title: "Smart Reminders",
    shortDesc: "Nudges, not nags.",
    fullDesc:
      "Gentle reminders for hydration, posture, breaks, and focus sessions. Pico learns your rhythm and intervenes only when you need it — helpful without being intrusive.",
    color: "#34D399",
    bgGlow: "rgba(52, 211, 153, 0.12)",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="11" width="24" height="16" rx="4" stroke="#F472B6" strokeWidth="1.5" />
        <circle cx="14" cy="19" r="2.5" fill="#F472B6" />
        <circle cx="22" cy="19" r="2.5" fill="#F472B6" />
        <path d="M18 5 L18 11" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="4" r="2" fill="#F472B6" />
      </svg>
    ),
    title: "Mini Games",
    shortDesc: "Play. Unwind. Smile.",
    fullDesc:
      "Quick, delightful games built right in — reaction challenges, pattern memory, and collaborative puzzles. Play with Pico whenever you need a mental reset.",
    color: "#F472B6",
    bgGlow: "rgba(244, 114, 182, 0.12)",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="11" y="5" width="14" height="26" rx="5" stroke="#FBBF24" strokeWidth="1.5" />
        <rect x="14" y="9" width="8" height="14" rx="3" fill="#FBBF24" opacity="0.2" />
        <rect x="14" y="15" width="8" height="8" rx="3" fill="#FBBF24" />
        <path d="M16 30 L16 33 M20 30 L20 33" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "All-Day Battery",
    shortDesc: "Morning to midnight.",
    fullDesc:
      "18+ hours of active companion time on a single charge. Fast USB-C charging brings Pico from zero to full in just 45 minutes. Always ready when you are.",
    color: "#FBBF24",
    bgGlow: "rgba(251, 191, 36, 0.12)",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ willChange: "transform" }}
    >
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-2xl border transition-colors duration-300"
        style={{
          background: isExpanded
            ? `linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.5))`
            : "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(12px)",
          borderColor: isExpanded ? `${feature.color}44` : "rgba(255,255,255,0.06)",
        }}
      >
        {/* Animated background glow — opacity only, no blur repaints */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
          style={{
            opacity: isExpanded ? 1 : 0,
            background: `radial-gradient(circle at top right, ${feature.bgGlow} 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          {/* Icon + Title row */}
          <div className="flex items-start gap-4 mb-4">
            {/* Animated icon container */}
            <motion.div
              className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: `${feature.color}15`,
                boxShadow: isExpanded
                  ? `0 0 20px ${feature.color}20, inset 0 0 20px ${feature.color}10`
                  : "none",
              }}
              animate={{
                rotate: isExpanded ? [0, -10, 10, -5, 0] : 0,
                scale: isExpanded ? 1.05 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {feature.icon}
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.h3
                layout="position"
                className="text-lg font-semibold text-pico-white"
              >
                {feature.title}
              </motion.h3>

              {/* Short description - visible when collapsed */}
              <AnimatePresence mode="wait">
                {!isExpanded && (
                  <motion.p
                    key="short"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm mt-1"
                    style={{ color: feature.color }}
                  >
                    {feature.shortDesc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Expand indicator */}
            <motion.div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
              style={{ background: `${feature.color}10` }}
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7 2 L7 12 M2 7 L12 7"
                  stroke={feature.color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  height: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                  opacity: { duration: 0.4, delay: 0.12 },
                }}
                className="overflow-hidden"
                style={{ willChange: "height, opacity" }}
              >
                {/* Divider */}
                <div
                  className="h-px mb-5"
                  style={{
                    background: `linear-gradient(to right, transparent, ${feature.color}30, transparent)`,
                  }}
                />

                {/* Full description */}
                <div className="space-y-3">
                  <p className="text-sm text-pico-gray/90 leading-relaxed">
                    {feature.fullDesc}
                  </p>

                  {/* Animated stat bar */}
                  <motion.div
                    className="flex items-center gap-3 pt-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <div className="h-1 flex-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: feature.color }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 1.2,
                          delay: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      />
                    </div>
                    <motion.span
                      className="text-xs font-medium shrink-0"
                      style={{ color: feature.color }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      Learn more →
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom glow line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${feature.color}, transparent)`,
          }}
          animate={{ opacity: isExpanded ? 0.6 : 0, scaleX: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding relative">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-pico-cyan/20 to-transparent" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-pico-cyan/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Built to feel"
          subtitle="Every feature serves one purpose — making Pico feel less like a gadget and more like a companion."
        />

        {/* Bento-style layout: 2 top, 3 bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.slice(0, 2).map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {features.slice(2).map((f, i) => (
            <FeatureCard key={i + 2} feature={f} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
