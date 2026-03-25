"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-10 sm:mb-16 ${align === "center" ? "text-center" : "text-left"} ${className} px-2 sm:px-0`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold leading-tight text-pico-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-pico-gray max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
