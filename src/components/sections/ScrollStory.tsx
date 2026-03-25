"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PicoRobot from "@/components/PicoRobot";

type Expression = "normal" | "happy" | "sleepy" | "curious" | "surprised" | "playful";

interface StoryScene {
  text: string;
  subtext: string;
  expression: Expression;
  glowColor: string;
}

const scenes: StoryScene[] = [
  {
    text: "It doesn't just sit there.",
    subtext: "It notices.",
    expression: "curious",
    glowColor: "rgba(0, 229, 255, 0.12)",
  },
  {
    text: "Touch changes everything.",
    subtext: "Every interaction matters.",
    expression: "happy",
    glowColor: "rgba(124, 58, 237, 0.12)",
  },
  {
    text: "Curious. Calm.",
    subtext: "A little attitude.",
    expression: "playful",
    glowColor: "rgba(0, 229, 255, 0.1)",
  },
  {
    text: "It rests when you do.",
    subtext: "Quietly present.",
    expression: "sleepy",
    glowColor: "rgba(124, 58, 237, 0.08)",
  },
  {
    text: "It helps without asking.",
    subtext: "Smart. Subtle. Always ready.",
    expression: "normal",
    glowColor: "rgba(0, 229, 255, 0.1)",
  },
  {
    text: "And sometimes…",
    subtext: "it plays.",
    expression: "playful",
    glowColor: "rgba(124, 58, 237, 0.15)",
  },
];

function SceneBlock({ scene, index }: { scene: StoryScene; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6 });

  return (
    <div
      ref={ref}
      className="min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center relative snap-start py-12 sm:py-0"
      id={index === 0 ? "story" : undefined}
    >
      {/* Background glow for this scene */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${scene.glowColor} 0%, transparent 60%)`,
          }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-24 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Robot */}
        <motion.div
          animate={{
            opacity: isInView ? 1 : 0,
            scale: isInView ? 1 : 0.9,
            x: isInView ? 0 : (index % 2 === 0 ? -30 : 30),
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
        >
          <PicoRobot
            size={140}
            expression={isInView ? scene.expression : "normal"}
            enableTracking={isInView}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className={`text-center lg:text-left ${index % 2 === 1 ? "lg:order-1" : ""}`}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 40,
          }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-[44px] font-semibold leading-tight text-pico-white mb-2 sm:mb-3">
            {scene.text}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-pico-cyan font-medium">
            {scene.subtext}
          </p>

          {/* Scene indicator */}
          <div className="mt-8 flex items-center gap-2 justify-center lg:justify-start">
            {scenes.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-8 bg-pico-cyan"
                    : "w-2 bg-pico-gray/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ScrollStory() {
  return (
    <section className="relative">
      {/* Section intro */}
      <motion.div
        className="text-center py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm uppercase tracking-[0.3em] text-pico-cyan mb-4">
          The Story
        </p>
        <h2 className="text-3xl md:text-[40px] font-semibold text-pico-white">
          More than a machine
        </h2>
      </motion.div>

      {/* Scenes */}
      {scenes.map((scene, i) => (
        <SceneBlock key={i} scene={scene} index={i} />
      ))}
    </section>
  );
}
