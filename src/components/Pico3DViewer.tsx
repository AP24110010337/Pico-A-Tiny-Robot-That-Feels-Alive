"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Pico3D = dynamic(() => import("@/components/Pico3D"), { ssr: false });

interface Pico3DViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Pico3DViewer({ isOpen, onClose }: Pico3DViewerProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content container */}
          <motion.div
            className="relative z-10 w-full h-full sm:w-[90vw] sm:h-[80vh] sm:max-w-5xl sm:rounded-3xl overflow-hidden border-0 sm:border border-white/10"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(10,10,18,0.97) 0%, rgba(5,5,12,0.99) 100%)",
            }}
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              aria-label="Close 3D viewer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 4L12 12M12 4L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Title */}
            <motion.div
              className="absolute top-4 left-6 z-20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-white/90">
                Pico <span className="text-[#00E5FF]">3D</span>
              </h3>
            </motion.div>

            {/* Interaction hint */}
            <motion.div
              className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <span className="text-[10px] sm:text-xs text-white/50">Drag to rotate</span>
              <span className="text-white/20">·</span>
              <span className="text-[10px] sm:text-xs text-white/50">Pinch to zoom</span>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/50">Right-drag to pan</span>
            </motion.div>

            {/* Loading state */}
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-8 h-8 rounded-full border-2 border-[#00E5FF]/30 border-t-[#00E5FF]"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="text-xs text-white/40">
                      Loading 3D model…
                    </span>
                  </motion.div>
                </div>
              }
            >
              {/* 3D Canvas */}
              <Pico3D />
            </Suspense>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
