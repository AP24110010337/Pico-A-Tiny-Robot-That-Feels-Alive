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
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content container — Floating Box on all screens */}
          <motion.div
            className="relative z-10 w-full h-full max-h-[85vh] sm:w-[90vw] sm:h-[80vh] sm:max-w-6xl rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-[#00E5FF]/20 sm:border-white/15 shadow-[0_0_40px_rgba(0,229,255,0.05)]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(10,10,18,0.97) 0%, rgba(5,5,12,0.99) 100%)",
            }}
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-white hover:bg-white/20 active:bg-white/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
              aria-label="Close 3D viewer"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 4L12 12M12 4L4 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Title */}
            <motion.div
              className="absolute top-5 left-5 sm:top-6 sm:left-6 z-20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Pico <span className="text-[#00E5FF]">3D</span>
              </h3>
            </motion.div>

            {/* Interaction hint */}
            <motion.div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 md:gap-4 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <span className="text-[10px] sm:text-[11px] md:text-sm font-medium text-white/80 whitespace-nowrap">Drag to rotate</span>
              <span className="text-white/30">·</span>
              <span className="text-[10px] sm:text-[11px] md:text-sm font-medium text-white/80 whitespace-nowrap">Pinch to zoom</span>
            </motion.div>

            {/* Loading state */}
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-full border-[3px] border-[#00E5FF]/20 border-t-[#00E5FF]"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="text-sm font-medium text-white/50 tracking-wide">
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

