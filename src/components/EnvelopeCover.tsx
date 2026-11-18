import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import waxSealImg from '../assets/images/champagne_wax_seal_1795028059660.jpg';
import floralArchImg from '../assets/images/floral_botanical_arch_1795028059340.jpg';
import { ResilientImage } from './ResilientImage';
import { FloatingPetals } from '../animations/FloatingPetals';

interface EnvelopeCoverProps {
  onOpened: () => void;
  onStartOpening?: () => void;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({
  onOpened,
  onStartOpening,
}) => {
  const [stage, setStage] = useState<'idle' | 'unsealing' | 'opening' | 'done'>('idle');
  const shouldReduceMotion = useReducedMotion();

  const handleOpen = () => {
    if (stage !== 'idle') return;
    onStartOpening?.();

    if (shouldReduceMotion) {
      setStage('done');
      onOpened();
      return;
    }

    setStage('unsealing');
    window.setTimeout(() => setStage('opening'), 450);
    window.setTimeout(() => {
      setStage('done');
      onOpened();
    }, 2150);
  };

  const isOpening = stage === 'opening' || stage === 'done';
  const isUnsealing = stage !== 'idle';

  return (
    <motion.section
      aria-label="Nikkah Invitation Envelope"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'done' ? 0 : 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="paper-texture relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6"
    >
      <FloatingPetals density="light" />

      {/* Soft ambient botanical corner wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25"
      >
        <ResilientImage
          src={floralArchImg}
          alt=""
          className="h-[88vh] w-auto max-w-none object-contain mix-blend-multiply select-none"
        />
      </div>

      {/* Subtle brand header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -16 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 mb-6 text-center sm:mb-8"
      >
        <p className="font-arabic text-xl text-[#8A6D3B] sm:text-2xl" dir="rtl" lang="ur">
          {weddingData.brandUrdu}
        </p>
        <p className="mt-1 font-ui text-[11px] font-medium tracking-[0.28em] text-[#6B5B51] uppercase">
          {weddingData.brandName}
        </p>
      </motion.div>

      {/* 3D Interactive Luxury Envelope */}
      <div className="envelope-perspective relative z-20 w-full max-w-[360px] sm:max-w-[430px]">
        <motion.div
          animate={{
            scale: isOpening ? 1.04 : 1,
            y: isOpening ? 28 : 0,
          }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[4/3] w-full"
        >
          {/* Envelope Back Interior */}
          <div
            className="absolute inset-0 rounded-2xl border border-[#C8A96E]/45 bg-[#EDE2D0] shadow-[0_28px_60px_-15px_rgba(43,35,30,0.2)]"
            aria-hidden="true"
          />

          {/* Inner Invitation Card Sliding Upward */}
          <motion.div
            initial={{ y: 0, scale: 0.94, opacity: 0.96 }}
            animate={
              isOpening
                ? { y: -115, scale: 1.03, opacity: 1 }
                : { y: 0, scale: 0.94, opacity: 0.96 }
            }
            transition={{ duration: 1.25, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="luxury-card-surface absolute inset-x-3 top-3 bottom-3 z-10 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-[#C8A96E]/55 px-5 py-6 text-center"
          >
            {/* Light sweep when opening */}
            {isOpening && (
              <div
                aria-hidden="true"
                className="animate-light-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/75 to-transparent"
              />
            )}
            <span className="font-arabic text-base text-[#8A6D3B] sm:text-lg" dir="rtl" lang="ar">
              {weddingData.bismillahArabic}
            </span>
            <span className="mt-2 font-editorial text-xs tracking-[0.22em] text-[#6B5B51] uppercase">
              {weddingData.title}
            </span>
            <p className="mt-2 font-script text-3xl text-[#2B231E] sm:text-4xl">
              {weddingData.brideName.split(' ')[0]} &amp; {weddingData.groomName.split(' ')[1] || weddingData.groomName.split(' ')[0]}
            </p>
            <span className="mt-2 font-ui text-[11px] tracking-[0.18em] text-[#8A6D3B] uppercase">
              {weddingData.date}
            </span>
          </motion.div>

          {/* Envelope Bottom & Side Pocket Flaps (SVG crisp geometry) */}
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-2xl">
            <svg
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
              className="h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FAF6EF" />
                  <stop offset="55%" stopColor="#F3EBDC" />
                  <stop offset="100%" stopColor="#EAE0CE" />
                </linearGradient>
              </defs>
              {/* Left side fold */}
              <polygon points="0,0 200,158 0,300" fill="#F4EDE0" stroke="#C8A96E" strokeOpacity="0.32" strokeWidth="1" />
              {/* Right side fold */}
              <polygon points="400,0 200,158 400,300" fill="#EFE6D6" stroke="#C8A96E" strokeOpacity="0.32" strokeWidth="1" />
              {/* Bottom pocket fold */}
              <polygon
                points="0,300 200,140 400,300"
                fill="url(#pocketGrad)"
                stroke="#C8A96E"
                strokeOpacity="0.45"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Top 3D Rotating Envelope Flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpening ? { rotateX: -172 } : { rotateX: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top center', zIndex: isOpening ? 5 : 30 }}
            className="preserve-3d pointer-events-none absolute inset-x-0 top-0 h-[56%]"
          >
            <div className="backface-hidden absolute inset-0 overflow-hidden rounded-t-2xl">
              <svg viewBox="0 0 400 170" preserveAspectRatio="none" className="h-full w-full drop-shadow-sm">
                <defs>
                  <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFDF9" />
                    <stop offset="100%" stopColor="#F2E9D8" />
                  </linearGradient>
                </defs>
                <polygon
                  points="0,0 400,0 200,166"
                  fill="url(#flapGrad)"
                  stroke="#C8A96E"
                  strokeOpacity="0.5"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </motion.div>

          {/* Embossed Wax Seal Button on Envelope Center */}
          <motion.button
            type="button"
            onClick={handleOpen}
            disabled={isUnsealing}
            aria-label="Open Nikkah Invitation"
            animate={{
              scale: isUnsealing ? 0.72 : 1,
              opacity: isUnsealing ? 0 : 1,
              y: isUnsealing ? -16 : 0,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group absolute top-[46%] left-1/2 z-40 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-[#C8A96E]/70 bg-[#FAF6EF] p-0.5 shadow-[0_12px_28px_rgba(43,35,30,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B69254] sm:h-24 sm:w-24"
          >
            <ResilientImage
              src={waxSealImg}
              alt="Champagne wax seal"
              fallbackLabel="Open"
              className="h-full w-full rounded-full object-cover"
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Invitation Cover Call-to-Action */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: isUnsealing ? 0 : 1, y: isUnsealing ? 10 : 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 mt-8 flex flex-col items-center text-center sm:mt-10"
      >
        <p className="font-editorial text-lg italic text-[#4B3F37] sm:text-xl">
          An Invitation for {weddingData.brideName} &amp; {weddingData.groomName}
        </p>

        <button
          type="button"
          onClick={handleOpen}
          disabled={isUnsealing}
          className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full border border-[#B69254]/75 bg-[#FFFDF9] px-8 py-3 font-ui text-xs font-medium tracking-[0.22em] text-[#2B231E] uppercase shadow-[0_10px_28px_-8px_rgba(182,146,84,0.35)] transition-all duration-200 hover:border-[#8A6D3B] hover:bg-[#F7F1E5] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#B69254]"
        >
          <span>Open Invitation</span>
        </button>

        <span className="mt-3 font-ui text-[11px] tracking-[0.14em] text-[#6B5B51]/85">
          Tap the seal or button to open
        </span>
      </motion.div>
    </motion.section>
  );
};
