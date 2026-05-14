'use client';

import { motion } from 'framer-motion';

const promoText = 'Free local delivery in Hillingdon & Uxbridge · Same-day dispatch on orders before 2pm · 2,700+ authentic products';

export default function PromoBanner() {
  return (
    <section className="bg-accent overflow-hidden py-4">
      <div className="relative w-full">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="text-text-primary font-semibold text-lg md:text-xl px-8"
            >
              {promoText}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
