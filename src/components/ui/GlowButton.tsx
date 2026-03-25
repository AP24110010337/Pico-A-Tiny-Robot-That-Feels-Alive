"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function GlowButton({
  children,
  variant = "primary",
  onClick,
  className = "",
  href,
}: GlowButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm tracking-wide cursor-pointer overflow-hidden transition-shadow duration-300";

  const variants = {
    primary:
      "bg-pico-cyan text-pico-black hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]",
    secondary:
      "bg-transparent border border-pico-cyan/30 text-pico-cyan hover:border-pico-cyan/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent hover:translate-x-full transition-transform duration-700" />
      </span>
      <span className="relative z-10">{children}</span>
    </Component>
  );
}
