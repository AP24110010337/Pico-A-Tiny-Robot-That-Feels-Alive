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
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-8"
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

          {/* Content container — Edge-to-edge on mobile, large rounded card on tablet/desktop */}
          <motion.div
            className="relative z-10 w-full h-full sm:w-full sm:h-full sm:max-w-7xl sm:rounded-[2rem] overflow-hidden border-y sm:border border-white/10 sm:border-white/15"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(10,10,18,0.97) 0%, rgba(5,5,12,0.99) 100%)",
            }}
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button — high contrast, safe-area aware */}
            <button
              onClick={onClose}
              className="absolute top-[max(1.2rem,env(safe-area-inset-top,1.2rem))] right-[max(1.2rem,env(safe-area-inset-right,1.2rem))] z-30 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-white hover:bg-white/20 active:bg-white/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
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

            {/* Title — safe-area aware */}
            <motion.div
              className="absolute top-[max(1.5rem,env(safe-area-inset-top,1.5rem))] left-[max(1.5rem,env(safe-area-inset-left,1.5rem))] z-20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h3 className="text-lg font-bold text-white tracking-wide">
                Pico <span className="text-[#00E5FF]">3D</span>
              </h3>
            </motion.div>

            {/* Interaction hint — mobile-optimized */}
            <motion.div
              className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))] left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 md:gap-4 px-4 py-2md:px-5 md:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <span className="text-[11px] md:text-sm font-medium text-white/80">Drag to rotate</span>
              <span className="text-white/30">·</span>
              <span className="text-[11px] md:text-sm font-medium text-white/80">Pinch to zoom</span>
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

