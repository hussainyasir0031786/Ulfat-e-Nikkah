import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ScratchHeart } from '../components/ScratchHeart';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

export const ScratchRevealSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="special-reveal"
      aria-label="Special Wedding Date Scratch Reveal"
      className="relative z-20 px-4 py-14 sm:px-8 sm:py-20"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="luxury-card-surface relative mx-auto max-w-2xl overflow-hidden rounded-[28px] border border-[#C8A96E]/40 px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        {/* Subtle botanical corner petals SVG */}
        <svg
          aria-hidden="true"
          viewBox="0 0 120 120"
          className="animate-botanical-sway pointer-events-none absolute -top-3 -left-3 h-24 w-24 text-[#6E7F6B]/30 sm:h-28 sm:w-28"
          fill="none"
        >
          <path d="M16 14C34 24 44 46 40 72" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <ellipse cx="44" cy="34" rx="8" ry="4" transform="rotate(-28 44 34)" fill="#EBD6D4" fillOpacity="0.65" />
          <ellipse cx="26" cy="48" rx="7" ry="3.5" transform="rotate(24 26 48)" fill="#6E7F6B" fillOpacity="0.22" />
          <ellipse cx="52" cy="56" rx="7" ry="3.5" transform="rotate(-14 52 56)" fill="#6E7F6B" fillOpacity="0.2" />
        </svg>

        <svg
          aria-hidden="true"
          viewBox="0 0 120 120"
          className="animate-botanical-sway pointer-events-none absolute -right-3 -bottom-3 h-24 w-24 rotate-180 text-[#6E7F6B]/30 sm:h-28 sm:w-28"
          fill="none"
        >
          <path d="M16 14C34 24 44 46 40 72" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <ellipse cx="44" cy="34" rx="8" ry="4" transform="rotate(-28 44 34)" fill="#EBD6D4" fillOpacity="0.65" />
          <ellipse cx="26" cy="48" rx="7" ry="3.5" transform="rotate(24 26 48)" fill="#6E7F6B" fillOpacity="0.22" />
          <ellipse cx="52" cy="56" rx="7" ry="3.5" transform="rotate(-14 52 56)" fill="#6E7F6B" fillOpacity="0.2" />
        </svg>

        <p className="font-ui text-[11px] font-medium tracking-[0.28em] text-[#8A6D3B] uppercase">
          A Special Reveal
        </p>

        <h2 className="mt-2 font-editorial text-3xl font-medium text-[#2B231E] text-balance sm:text-4xl">
          Uncover Our Nikkah Date
        </h2>

        <p className="mx-auto mt-2 max-w-sm font-editorial text-base italic text-[#6B5B51] sm:text-lg">
          Gently scratch the blush foil heart below to unveil the day we begin forever.
        </p>

        <OrnamentalDivider className="my-6" />

        <div className="relative z-10 flex justify-center">
          <ScratchHeart />
        </div>
      </motion.div>
    </section>
  );
};
