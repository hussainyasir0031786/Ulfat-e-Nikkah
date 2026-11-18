import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import floralArchImg from '../assets/images/floral_botanical_arch_1795028059340.jpg';
import { ResilientImage } from '../components/ResilientImage';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

interface ClosingSectionProps {
  onReplayOpening: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onReplayOpening }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer
      aria-label="Closing Invitation Message and Finale"
      className="relative z-20 overflow-hidden px-4 pt-14 pb-24 sm:px-8 sm:pt-20 sm:pb-28"
    >
      {/* Closing Prose Section */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="whitespace-pre-line font-editorial text-xl leading-relaxed text-[#2B231E] text-balance sm:text-2xl sm:leading-relaxed">
          {weddingData.closingProse}
        </p>

        <p className="mt-5 font-editorial text-lg italic text-[#6B5B51] sm:text-xl">
          {weddingData.closingWish}
        </p>

        <p className="mt-6 font-editorial text-lg text-[#8A6D3B]">
          With love,
          <span className="mt-1 block font-script text-3xl text-[#2B231E] sm:text-4xl">
            {weddingData.closingSignature}
          </span>
        </p>
      </motion.div>

      <OrnamentalDivider className="my-12 sm:my-16" />

      {/* Final Floral Closing Screen */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="luxury-card-surface relative mx-auto max-w-[600px] overflow-hidden rounded-[28px] border border-[#C8A96E]/45 px-6 py-14 text-center sm:px-12 sm:py-16"
      >
        {/* Botanical Floral Border Artwork */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50"
        >
          <ResilientImage
            src={floralArchImg}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-center mix-blend-multiply select-none"
          />
        </div>

        {/* Soft Ivory Center Veil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-6 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(255,253,249,0.94)_42%,rgba(255,253,249,0.6)_80%,transparent_100%)] sm:inset-10"
        />

        <div className="relative z-10 flex flex-col items-center">
          <p className="font-ui text-[11px] font-medium tracking-[0.26em] text-[#8A6D3B] uppercase">
            {weddingData.finaleHeading}
          </p>

          <div className="mt-6 flex flex-col items-center gap-1.5">
            <p className="font-script text-4xl text-[#2B231E] sm:text-5xl">
              {weddingData.brideName}
            </p>
            <span className="font-editorial text-xl italic text-[#B69254]">&amp;</span>
            <p className="font-script text-4xl text-[#2B231E] sm:text-5xl">
              {weddingData.groomName}
            </p>
          </div>

          <p className="mt-6 font-ui text-xs tracking-[0.18em] text-[#6B5B51] uppercase">
            Nikkah <span aria-hidden="true">·</span> {weddingData.date}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={onReplayOpening}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#C8A96E]/55 bg-[#FFFDF9]/90 px-5 py-2 font-ui text-[11px] font-medium tracking-[0.18em] text-[#6B5B51] uppercase transition-colors hover:border-[#8A6D3B] hover:text-[#2B231E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69254]"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#8A6D3B]" strokeWidth={1.6} />
              <span>Replay Envelope</span>
            </button>

            <p className="mt-2 font-arabic text-base text-[#8A6D3B]/85" dir="rtl" lang="ur">
              {weddingData.brandUrdu}
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
