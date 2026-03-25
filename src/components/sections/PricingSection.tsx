"use client";

import { motion } from "framer-motion";
import GlowButton from "@/components/ui/GlowButton";
import PicoRobot from "@/components/PicoRobot";

const included = [
  "Pico Robot Unit",
  "USB-C Charging Cable",
  "Quick Start Guide",
  "1 Year Firmware Updates",
  "Community Access",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(124,58,237,0.04) 30%, transparent 60%)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-pico-cyan mb-4">
            Pre-order
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-pico-white mb-3 sm:mb-4">
            Bring Pico home
          </h2>
          <p className="text-sm sm:text-base text-pico-gray max-w-md mx-auto px-2 sm:px-0">
            Be among the first to own Pico. Limited early-bird pricing for the first 1,000 units.
          </p>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="glass glow-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center">
            {/* Mini robot */}
            <div className="flex justify-center mb-6">
              <PicoRobot size={100} expression="happy" enableTracking={false} />
            </div>

            {/* Badge */}
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-pico-cyan/10 text-pico-cyan border border-pico-cyan/20 mb-6">
              Early Bird — Limited
            </span>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-3">
                <span className="text-pico-gray line-through text-lg">$149</span>
                <span className="text-4xl sm:text-5xl font-bold text-pico-white">$99</span>
              </div>
              <p className="text-sm text-pico-gray mt-2">One-time purchase. No subscriptions.</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-pico-cyan/20 to-transparent mb-6" />

            {/* What's included */}
            <ul className="space-y-3 mb-8 text-left">
              {included.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-pico-gray">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#00E5FF" strokeWidth="1" />
                    <path d="M5 8 L7 10 L11 6" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <GlowButton variant="primary" className="w-full text-base">
              Pre-order Now
            </GlowButton>



          </div>
        </motion.div>
      </div>
    </section>
  );
}
