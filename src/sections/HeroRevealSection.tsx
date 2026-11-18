import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import floralArchImg from '../assets/images/floral_botanical_arch_1795028059340.jpg';
import { ResilientImage } from '../components/ResilientImage';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

export const HeroRevealSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const nameMotion = (delay: number) =>
    shouldReduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 18, filter: 'blur(6px)', letterSpacing: '0.06em' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0.01em' },
          transition: { duration: 1.1, delay, ease: revealEase },
        };

  return (
    <section
      id="invitation-hero"
      aria-label="Nikkah Title and Couple Reveal"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-8 sm:py-16"
    >
      {/* Subtle top brand mark */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: revealEase }}
        className="relative z-20 mb-4 flex items-center gap-3 text-center"
      >
        <span className="font-arabic text-base text-[#8A6D3B] sm:text-lg" dir="rtl" lang="ur">
          {weddingData.brandUrdu}
        </span>
        <span aria-hidden="true" className="text-[#C8A96E]">
          ·
        </span>
        <span className="font-ui text-[10px] font-medium tracking-[0.26em] text-[#6B5B51] uppercase sm:text-[11px]">
          {weddingData.brandName}
        </span>
      </motion.div>

      {/* Main Framed Botanical Invitation Sheet */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.05, ease: revealEase }}
        className="luxury-card-surface relative z-20 mx-auto w-full max-w-[680px] overflow-hidden rounded-[28px] border border-[#C8A96E]/45 px-5 py-12 text-center sm:px-12 sm:py-16"
      >
        {/* Botanical Floral Arch Artwork Layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-55 sm:opacity-65"
        >
          <ResilientImage
            src={floralArchImg}
            alt=""
            className="h-full w-full object-cover object-center mix-blend-multiply select-none"
          />
        </div>

        {/* Soft center legibility veil so text always remains crisp against botanical details */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-6 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(255,253,249,0.92)_38%,rgba(255,253,249,0.55)_78%,transparent_100%)] sm:inset-10"
        />

        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center">
          {/* Bismillah Calligraphy */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: revealEase }}
          >
            <p
              className="font-arabic text-2xl leading-relaxed text-[#7E6235] sm:text-3xl"
              dir="rtl"
              lang="ar"
            >
              {weddingData.bismillahArabic}
            </p>
            <p className="mt-1 font-editorial text-xs italic tracking-wide text-[#6B5B51]">
              {weddingData.bismillahTranslation}
            </p>
          </motion.div>

          <OrnamentalDivider className="my-5" />

          {/* Cordial Intro */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: revealEase }}
            className="whitespace-pre-line font-editorial text-base leading-relaxed text-[#4B3F37] sm:text-lg"
          >
            {weddingData.introText}
          </motion.p>

          {/* Main Nikkah Title */}
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.45, ease: revealEase }}
            className="mt-3 font-editorial text-[26px] font-semibold tracking-[0.22em] text-[#2B231E] uppercase text-balance sm:text-4xl"
          >
            {weddingData.title}
          </motion.h1>

          {/* Bride & Groom Names */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
            <motion.div {...nameMotion(0.65)} className="flex flex-col items-center">
              <span className="font-ui text-[10px] font-medium tracking-[0.26em] text-[#8A6D3B] uppercase">
                {weddingData.brideRole}
              </span>
              <h2 className="mt-1 font-script text-[44px] leading-tight text-[#2B231E] sm:text-6xl">
                {weddingData.brideName}
              </h2>
            </motion.div>

            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.85, ease: revealEase }}
              className="font-editorial text-xl italic text-[#B69254] sm:text-2xl"
            >
              and
            </motion.span>

            <motion.div {...nameMotion(0.95)} className="flex flex-col items-center">
              <span className="font-ui text-[10px] font-medium tracking-[0.26em] text-[#8A6D3B] uppercase">
                {weddingData.groomRole}
              </span>
              <h2 className="mt-1 font-script text-[44px] leading-tight text-[#2B231E] sm:text-6xl">
                {weddingData.groomName}
              </h2>
            </motion.div>
          </div>

          <OrnamentalDivider className="my-6" />

          {/* Subtitle */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: revealEase }}
            className="max-w-xs font-editorial text-base italic leading-relaxed text-[#5A4B42] sm:max-w-sm sm:text-lg"
          >
            {weddingData.subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Down Cue */}
      <motion.a
        href="#invitation-message"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.45 }}
        aria-label="Scroll down to invitation message"
        className="relative z-20 mt-7 inline-flex min-h-[44px] flex-col items-center justify-center gap-1 px-4 text-[#6B5B51] transition-colors hover:text-[#2B231E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69254]"
      >
        <span className="font-ui text-[10px] font-medium tracking-[0.24em] uppercase">
          Scroll to Continue
        </span>
        <motion.span
          animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 text-[#B69254]" strokeWidth={1.6} />
        </motion.span>
      </motion.a>
    </section>
  );
};
