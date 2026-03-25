"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

type Expression = "normal" | "happy" | "sleepy" | "curious" | "surprised" | "playful";

interface PicoRobotProps {
  expression?: Expression;
  size?: number;
  enableTracking?: boolean;
  className?: string;
  onClick?: () => void;
}

const eyeShapes: Record<Expression, { left: { rx: number; ry: number }; right: { rx: number; ry: number }; yOffset: number }> = {
  normal: { left: { rx: 8, ry: 9 }, right: { rx: 8, ry: 9 }, yOffset: 0 },
  happy: { left: { rx: 9, ry: 5 }, right: { rx: 9, ry: 5 }, yOffset: 2 },
  sleepy: { left: { rx: 9, ry: 3 }, right: { rx: 9, ry: 3 }, yOffset: 2 },
  curious: { left: { rx: 10, ry: 11 }, right: { rx: 7, ry: 8 }, yOffset: -2 },
  surprised: { left: { rx: 11, ry: 12 }, right: { rx: 11, ry: 12 }, yOffset: -3 },
  playful: { left: { rx: 8, ry: 5 }, right: { rx: 10, ry: 10 }, yOffset: 1 },
};

export default function PicoRobot({
  expression = "normal",
  size = 280,
  enableTracking = true,
  className = "",
  onClick,
}: PicoRobotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const controls = useAnimation();
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  // Smooth eye tracking with lerp
  const animateEyes = useCallback(() => {
    const lerp = 0.08;
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
    setEyeOffset({ x: currentRef.current.x, y: currentRef.current.y });
    rafRef.current = requestAnimationFrame(animateEyes);
  }, []);

  useEffect(() => {
    if (!enableTracking) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const maxOffset = 6;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clampedDist = Math.min(dist, 300);
      const ratio = clampedDist / 300;
      targetRef.current = {
        x: (dx / (dist || 1)) * maxOffset * ratio,
        y: (dy / (dist || 1)) * maxOffset * ratio,
      };
    };

    rafRef.current = requestAnimationFrame(animateEyes);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enableTracking, animateEyes]);

  const handleClick = () => {
    setIsClicked(true);
    controls.start({
      scale: [1, 1.1, 0.95, 1.05, 1],
      rotate: [0, -3, 3, -2, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    setTimeout(() => setIsClicked(false), 600);
    onClick?.();
  };

  const currentExpression = isClicked ? "surprised" : expression;
  const eyes = eyeShapes[currentExpression];
  const scale = size / 280;

  return (
    <div ref={containerRef} className={`relative inline-block cursor-pointer ${className}`} onClick={handleClick}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-glow-pulse pointer-events-none"
        style={{
          width: size * 1.6,
          height: size * 1.6,
          background: `radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)`,
        }}
      />

      <motion.svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 280 322"
        fill="none"
        className="relative z-10"
        animate={controls}
      >
        {/* ─── Headphone band ─── */}
        <motion.path
          d="M70 105 Q70 50 140 45 Q210 50 210 105"
          stroke="#1a1a2e"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* ─── Left ear/headphone ─── */}
        <motion.rect
          x="50" y="88" width="32" height="44" rx="14"
          fill="#111118"
          stroke="#1a1a2e"
          strokeWidth="2"
        />
        <motion.rect
          x="54" y="95" width="24" height="30" rx="10"
          fill="#0d0d14"
        />

        {/* ─── Right ear/headphone ─── */}
        <motion.rect
          x="198" y="88" width="32" height="44" rx="14"
          fill="#111118"
          stroke="#1a1a2e"
          strokeWidth="2"
        />
        <motion.rect
          x="202" y="95" width="24" height="30" rx="10"
          fill="#0d0d14"
        />

        {/* ─── Head ─── */}
        <motion.rect
          x="72" y="60" width="136" height="110" rx="36"
          fill="#111118"
          stroke="#1a1a2e"
          strokeWidth="1.5"
        />

        {/* ─── Face screen area ─── */}
        <motion.rect
          x="88" y="78" width="104" height="72" rx="18"
          fill="#0a0a12"
          stroke="#151525"
          strokeWidth="1"
        />

        {/* ─── Left eye ─── */}
        <motion.ellipse
          cx={120 + eyeOffset.x}
          cy={114 + eyeOffset.y + eyes.yOffset}
          rx={eyes.left.rx}
          ry={eyes.left.ry}
          fill="#00E5FF"
          className="animate-blink"
          animate={{
            rx: eyes.left.rx,
            ry: eyes.left.ry,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
        </motion.ellipse>

        {/* ─── Right eye ─── */}
        <motion.ellipse
          cx={160 + eyeOffset.x}
          cy={114 + eyeOffset.y + eyes.yOffset}
          rx={eyes.right.rx}
          ry={eyes.right.ry}
          fill="#00E5FF"
          className="animate-blink"
          animate={{
            rx: eyes.right.rx,
            ry: eyes.right.ry,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
        </motion.ellipse>

        {/* ─── Eye glow filters ─── */}
        <defs>
          <filter id="eye-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ─── Left eye glow ─── */}
        <ellipse
          cx={120 + eyeOffset.x}
          cy={114 + eyeOffset.y + eyes.yOffset}
          rx={eyes.left.rx + 4}
          ry={eyes.left.ry + 4}
          fill="#00E5FF"
          opacity="0.2"
          filter="url(#eye-glow)"
        />

        {/* ─── Right eye glow ─── */}
        <ellipse
          cx={160 + eyeOffset.x}
          cy={114 + eyeOffset.y + eyes.yOffset}
          rx={eyes.right.rx + 4}
          ry={eyes.right.ry + 4}
          fill="#00E5FF"
          opacity="0.2"
          filter="url(#eye-glow)"
        />

        {/* ─── Body (shorter, rounder) ─── */}
        <motion.rect
          x="95" y="170" width="90" height="80" rx="30"
          fill="#111118"
          stroke="#1a1a2e"
          strokeWidth="1.5"
        />

        {/* ─── Neck ─── */}
        <rect x="125" y="163" width="30" height="16" rx="6" fill="#0d0d14" />

        {/* ─── Left arm ─── */}
        <motion.ellipse
          cx="82" cy="210" rx="16" ry="22"
          fill="#111118"
          stroke="#1a1a2e"
          strokeWidth="1.5"
          animate={
            currentExpression === "happy"
              ? { rotate: [0, -15, 0], y: [0, -10, 0] }
              : currentExpression === "surprised"
              ? { rotate: [0, -25, 0], y: [0, -15, 0] }
              : { rotate: 0, y: 0 }
          }
          transition={{ duration: 0.5, repeat: currentExpression === "happy" ? Infinity : 0, repeatDelay: 1 }}
        />

        {/* ─── Right arm ─── */}
        <motion.ellipse
          cx="198" cy="210" rx="16" ry="22"
          fill="#111118"
          stroke="#1a1a2e"
          strokeWidth="1.5"
          animate={
            currentExpression === "happy"
              ? { rotate: [0, 15, 0], y: [0, -10, 0] }
              : currentExpression === "surprised"
              ? { rotate: [0, 25, 0], y: [0, -15, 0] }
              : { rotate: 0, y: 0 }
          }
          transition={{ duration: 0.5, repeat: currentExpression === "happy" ? Infinity : 0, repeatDelay: 1 }}
        />

        {/* ─── Left leg/foot ─── */}
        <motion.ellipse
          cx="118" cy="256" rx="16" ry="12"
          fill="#111118"
          stroke="#1a1a2e"
          strokeWidth="1.5"
        />

        {/* ─── Right leg/foot ─── */}
        <motion.ellipse
          cx="162" cy="256" rx="16" ry="12"
          fill="#111118"
          stroke="#1a1a2e"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
}
