"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const productImages = [
  { src: "/images/pico-hero.jpg", alt: "Pico robot with glowing cyan eyes in dark lighting" },
  { src: "/images/pico-detail.jpg", alt: "Pico robot close-up showing 3D-printed body and glowing screen" },
  { src: "/images/pico-front.jpg", alt: "Pico robot front view with headphones and glowing eyes" },
];

export default function ProductShowcase() {
  return (
    <section id="product" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-pico-cyan mb-4">
            Design
          </p>
          <h2 className="text-3xl md:text-[40px] font-semibold text-pico-white mb-4">
            Crafted with care
          </h2>
          <p className="text-pico-gray max-w-lg mx-auto">
            Every curve, every detail, every glow — designed to make you feel something.
          </p>
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productImages.map((img, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-pico-dark group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-pico-black/60 via-transparent to-transparent" />
              
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at center, rgba(0,229,255,0.08) 0%, transparent 60%)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
