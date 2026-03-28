"use client";

import { useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Pico3D = dynamic(() => import("@/components/Pico3D"), { ssr: false });

interface Pico3DViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Pico3DViewer({ isOpen, onClose }: Pico3DViewerProps) {
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
        /* Full-screen overlay */
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />

          {/* Modal card — constrained so it never overflows any screen */}
          <motion.div
            className="relative z-10 flex flex-col w-full max-w-3xl rounded-2xl sm:rounded-3xl overflow-hidden border border-[#00E5FF]/20"
            style={{
              /* Cap height so the model always fits inside the viewport */
              height: "min(90svh, 700px)",
              background:
                "radial-gradient(ellipse at center, rgba(10,10,18,0.97) 0%, rgba(5,5,12,0.99) 100%)",
            }}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors duration-200 cursor-pointer shadow-lg"
              aria-label="Close 3D viewer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 4L12 12M12 4L4 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Title */}
            <div className="absolute top-3 left-4 z-20">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Pico <span className="text-[#00E5FF]">3D</span>
              </h3>
            </div>

            {/* 3D Canvas — fills the card */}
            <div className="flex-1 w-full h-full min-h-0">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <motion.div
                        className="w-10 h-10 rounded-full border-[3px] border-[#00E5FF]/20 border-t-[#00E5FF]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="text-sm text-white/50">Loading 3D model…</span>
                    </div>
                  </div>
                }
              >
                <Pico3D />
              </Suspense>
            </div>

            {/* Interaction hint */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm whitespace-nowrap">
              <span className="text-[10px] sm:text-xs font-medium text-white/75">Drag to rotate</span>
              <span className="text-white/30">·</span>
              <span className="text-[10px] sm:text-xs font-medium text-white/75">Pinch to zoom</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
