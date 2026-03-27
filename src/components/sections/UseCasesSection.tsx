"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
      className={`relative w-full text-left rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isActive ? "col-span-1 md:col-span-2" : "col-span-1"
      }`}
      onClick={() => onSelect(isActive ? null : index)}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      }}
      whileHover={!isActive ? { y: -4, transition: { duration: 0.25 } } : undefined}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card background */}
      <motion.div
        className="relative h-full rounded-2xl border overflow-hidden"
        style={{
          background: isActive
            ? `linear-gradient(145deg, rgba(15,23,42,0.85), rgba(15,23,42,0.5))`
            : "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(16px)",
        }}
        animate={{
          borderColor: isActive ? `${useCase.color}40` : "rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Background glow blobs */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl"
            style={{ background: useCase.bgGlow }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full blur-2xl"
            style={{ background: useCase.bgGlow, opacity: 0.4 }}
          />
        </motion.div>

        <div className="relative z-10 p-6 md:p-8">
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
                  height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.35, delay: 0.1 },
                }}
                className="overflow-hidden"
              >
                {/* Divider */}
                <motion.div
                  className="h-px mb-5"
                  style={{
                    background: `linear-gradient(to right, transparent, ${useCase.color}30, transparent)`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Text content */}
                  <div className="flex-1 space-y-4">
                    {/* Description with word-by-word reveal */}
                    <motion.p className="text-sm text-pico-gray/90 leading-relaxed">
                      {useCase.description.split(" ").map((word, wi) => (
                        <motion.span
                          key={wi}
                          className="inline-block mr-[0.3em]"
                          initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{
                            duration: 0.25,
                            delay: 0.15 + wi * 0.018,
                            ease: "easeOut",
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>

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
      </motion.div>
    </motion.button>
  );
}

export default function UseCasesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="use-cases" className="section-padding relative" ref={sectionRef}>
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${activeIndex !== null ? useCases[activeIndex].bgGlow : 'transparent'} 0%, transparent 60%)`,
          }}
          animate={{
            background: `radial-gradient(circle, ${activeIndex !== null ? useCases[activeIndex].bgGlow : 'transparent'} 0%, transparent 60%)`,
          }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Designed for your life"
          subtitle="Whether you're working, studying, or simply resting — Pico adapts to your rhythm."
        />

        {/* Use-case selector dots */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {useCases.map((uc, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className="group flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: activeIndex === i ? `${uc.color}15` : "transparent",
                border: `1px solid ${activeIndex === i ? `${uc.color}30` : "transparent"}`,
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: uc.color }}
                animate={{
                  scale: activeIndex === i ? 1.3 : 1,
                  opacity: activeIndex === i ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="text-xs font-medium overflow-hidden whitespace-nowrap"
                style={{ color: uc.color }}
                animate={{
                  width: activeIndex === i ? "auto" : 0,
                  opacity: activeIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {uc.title}
              </motion.span>
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5" layout>
          {useCases.map((uc, i) => (
            <UseCaseCard
              key={i}
              useCase={uc}
              index={i}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
