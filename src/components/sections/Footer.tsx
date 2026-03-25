"use client";

import { motion } from "framer-motion";
import PicoRobot from "@/components/PicoRobot";



export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          {/* Mini Pico */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PicoRobot size={60} expression="happy" enableTracking={false} />
          </motion.div>

          {/* Brand */}
          <motion.h3
            className="text-2xl font-bold text-pico-white mt-4 mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Pico
          </motion.h3>
          <motion.p
            className="text-sm text-pico-gray mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A tiny robot that feels alive.
          </motion.p>



          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-pico-cyan/10 to-transparent mb-6" />

          {/* Copyright */}
          <p className="text-xs text-pico-gray/50">
            Made with <span className="text-red-400">❤</span> by BotBusters
          </p>
        </div>
      </div>
    </footer>
  );
}
