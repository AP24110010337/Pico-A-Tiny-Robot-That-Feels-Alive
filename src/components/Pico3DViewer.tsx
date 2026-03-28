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
      // Lock BOTH axes of scroll so dragging inside the modal
      // cannot shift the page horizontally or vertically
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        /*
         * Overlay — covers exactly the visible viewport.
         * We use INLINE styles (not Tailwind) for the critical
         * dimensions so nothing can override them on mobile.
         */
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            maxWidth: "100vw",
            maxHeight: "100dvh",
            overflow: "hidden",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // Safe padding: 12px on phones, 32px on tablets, 64px on desktop
            padding: "clamp(12px, 3vw, 64px)",
            boxSizing: "border-box",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop — closes modal on tap */}
          <div
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              cursor: "pointer",
            }}
          />

          {/*
           * Modal card — sized so it ALWAYS fits inside the viewport.
           * Width  = 100% of the padded overlay (never > viewport width)
           * Height = at most 88% of the dynamic viewport height (dvh)
           *          capped at 680px on large screens
           */}
          <motion.div
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              maxWidth: "720px",
              height: "min(88dvh, 680px)",
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(0,229,255,0.2)",
              background:
                "radial-gradient(ellipse at center, rgba(10,10,18,0.97) 0%, rgba(5,5,12,0.99) 100%)",
              boxSizing: "border-box",
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Header bar ── */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "52px",
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
                background:
                  "linear-gradient(to bottom, rgba(5,5,12,0.85) 0%, transparent 100%)",
                flexShrink: 0,
              }}
            >
              {/* Title */}
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.04em",
                }}
              >
                Pico <span style={{ color: "#00E5FF" }}>3D</span>
              </h3>

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close 3D viewer"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* ── 3D Canvas — fills all remaining space ── */}
            <div
              style={{
                flex: 1,
                width: "100%",
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              <Suspense
                fallback={
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <motion.div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: "3px solid rgba(0,229,255,0.2)",
                          borderTopColor: "#00E5FF",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span
                        style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}
                      >
                        Loading 3D model…
                      </span>
                    </div>
                  </div>
                }
              >
                <Pico3D />
              </Suspense>
            </div>

            {/* ── Interaction hint ── */}
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                Drag to rotate
              </span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                Pinch to zoom
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
