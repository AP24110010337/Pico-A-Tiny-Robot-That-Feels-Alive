"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const halfway = document.documentElement.scrollHeight / 2;
      setVisible(window.scrollY > halfway);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pico-cyan/10 border border-pico-cyan/30 text-pico-cyan backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-pico-cyan/20 hover:border-pico-cyan/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
          style={{ transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s" }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          aria-label="Scroll to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15L12 9L6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
