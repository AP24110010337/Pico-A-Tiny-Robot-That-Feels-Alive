"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import PicoRobot from "@/components/PicoRobot";

type Expression = "normal" | "happy" | "sleepy" | "curious" | "surprised" | "playful";

interface UseCase {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  color: string;
  bgGlow: string;
  picoExpression: Expression;
}

const useCases: UseCase[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 24 L20 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 21 L14 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="13" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    title: "Desk Companion",
    tagline: "Always there. Never intrusive.",
    description:
      "Pico sits on your desk and keeps you company throughout the day. It reacts to your presence, responds to ambient sounds, and creates a warm atmosphere in your workspace.",
    details: ["Ambient awareness", "Sound response", "Presence detection", "Mood lighting"],
    color: "#00E5FF",
    bgGlow: "rgba(0, 229, 255, 0.1)",
    picoExpression: "happy",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 7 L5 23 Q5 25 7 25 L15 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 3 L9 19 Q9 21 11 21 L23 21 Q25 21 25 19 L25 7 Q25 5 23 5 L13 5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 10 L20 10 M14 14 L18 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Study Buddy",
    tagline: "Focus deeper. Break smarter.",
    description:
      "Pomodoro timers, gentle break reminders, and a quiet companion that understands when you're in deep work. Pico celebrates your milestones with you.",
    details: ["Pomodoro timer", "Break nudges", "Progress tracking", "Silent focus mode"],
    color: "#A78BFA",
    bgGlow: "rgba(167, 139, 250, 0.1)",
    picoExpression: "curious",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
        <path d="M14 3 L14 6 M14 22 L14 25 M3 14 L6 14 M22 14 L25 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Focus Assistant",
    tagline: "Zone in. Tune out.",
    description:
      "Pico helps you stay in flow — it learns your productive hours, minimizes distractions, and gently guides you back on track when you drift.",
    details: ["Flow detection", "Distraction shield", "Pattern learning", "Gentle redirects"],
    color: "#34D399",
    bgGlow: "rgba(52, 211, 153, 0.1)",
    picoExpression: "normal",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 20 Q4 16 6 12 Q8 8 14 6 Q20 8 22 12 Q24 16 21 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M10 20 Q14 24 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="11" cy="14" r="1.5" fill="currentColor" />
        <circle cx="17" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: "Stress Relief",
    tagline: "Breathe. Play. Reset.",
    description:
      "Soothing breathing animations, playful interactions, and calming light patterns help you decompress after a long day. Pico becomes your moment of calm.",
    details: ["Breathing exercises", "Calming lights", "Playful games", "Quiet mode"],
    color: "#F472B6",
    bgGlow: "rgba(244, 114, 182, 0.1)",
    picoExpression: "sleepy",
  },
];

function UseCaseCard({
  useCase,
  index,
  activeIndex,
  onSelect,
}: {
  useCase: UseCase;
  index: number;
  activeIndex: number | null;
  onSelect: (i: number | null) => void;
}) {
  const isActive = activeIndex === index;

  return (
    <motion.button
      className="relative w-full text-left rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => onSelect(isActive ? null : index)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ willChange: "transform" }}
    >
      {/* Card background */}
      <div
        className="relative h-full rounded-2xl border overflow-hidden transition-colors duration-300"
        style={{
          background: isActive
            ? `linear-gradient(145deg, rgba(15,23,42,0.85), rgba(15,23,42,0.5))`
            : "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(12px)",
          borderColor: isActive ? `${useCase.color}40` : "rgba(255,255,255,0.06)",
          willChange: "border-color",
        }}
      >
        {/* Background glow — opacity only, no blur repaints */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
          style={{
            opacity: isActive ? 1 : 0,
            background: `radial-gradient(circle at top right, ${useCase.bgGlow} 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            {/* Icon */}
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: `${useCase.color}15`,
                color: useCase.color,
                boxShadow: isActive ? `0 0 24px ${useCase.color}15` : "none",
              }}
              animate={{
                scale: isActive ? 1.1 : 1,
                rotate: isActive ? [0, -8, 8, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              {useCase.icon}
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.h3
                className="text-lg font-semibold text-pico-white"
                layout="position"
              >
                {useCase.title}
              </motion.h3>
              <AnimatePresence mode="wait">
                {!isActive && (
                  <motion.p
                    key="tagline"
                    className="text-sm mt-0.5"
                    style={{ color: useCase.color }}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {useCase.tagline}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Active indicator */}
            <motion.div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: `${useCase.color}10` }}
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 5 L6 8 L9 5"
                  stroke={useCase.color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isActive && (
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
                    background: `linear-gradient(to right, transparent, ${useCase.color}30, transparent)`,
                  }}
                />

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Text content */}
                  <div className="flex-1 space-y-4">
                    <p className="text-sm text-pico-gray/90 leading-relaxed">
                      {useCase.description}
                    </p>

                    {/* Detail chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {useCase.details.map((detail, di) => (
                        <motion.span
                          key={di}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                          style={{
                            color: useCase.color,
                            borderColor: `${useCase.color}25`,
                            background: `${useCase.color}08`,
                          }}
                          initial={{ opacity: 0, scale: 0.8, x: -8 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: 0.35 + di * 0.08,
                            ease: [0.2, 0.8, 0.2, 1],
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: useCase.color }}
                          />
                          {detail}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Pico robot for this use case */}
                  <motion.div
                    className="shrink-0 hidden md:flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.7, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  >
                    <PicoRobot
                      size={100}
                      expression={useCase.picoExpression}
                      enableTracking={false}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${useCase.color}, transparent)`,
          }}
          animate={{
            opacity: isActive ? 0.7 : 0,
            scaleX: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.button>
  );
}

export default function UseCasesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="use-cases" className="section-padding relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Designed for your life"
          subtitle="Whether you're working, studying, or simply resting — Pico adapts to your rhythm."
        />

        {/* Cards grid — 2 top, 2 bottom, accordion: one open at a time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {useCases.map((uc, i) => (
            <UseCaseCard
              key={i}
              useCase={uc}
              index={i}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
