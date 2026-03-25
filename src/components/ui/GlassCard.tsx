"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  glow = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        glass rounded-2xl p-6 md:p-8 
        ${hover ? "glass-hover transition-all duration-300" : ""} 
        ${glow ? "glow-border" : ""} 
        ${className}
      `}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={hover ? { y: -4, transition: { duration: 0.25 } } : undefined}
    >
      {children}
    </motion.div>
  );
}
