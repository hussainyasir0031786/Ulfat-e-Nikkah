import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

export const InvitationMessageSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="invitation-message"
      aria-label="Invitation Message"
      className="relative z-20 px-4 py-14 sm:px-8 sm:py-20"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl rounded-3xl border border-[#C8A96E]/35 bg-[#FFFDF9]/85 px-6 py-12 text-center shadow-[0_18px_45px_-20px_rgba(43,35,30,0.1)] backdrop-blur-sm sm:px-14 sm:py-16"
      >
        <p className="font-ui text-[11px] font-medium tracking-[0.26em] text-[#8A6D3B] uppercase">
          Cordial Invitation
        </p>

        <OrnamentalDivider className="my-5" />

        <blockquote className="whitespace-pre-line font-editorial text-2xl leading-relaxed text-[#2B231E] text-balance sm:text-[30px] sm:leading-relaxed">
          “{weddingData.invitationMessage}”
        </blockquote>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-ui text-xs tracking-[0.14em] text-[#6B5B51]">
          <span>{weddingData.date}</span>
          <span aria-hidden="true" className="text-[#C8A96E]">
            ·
          </span>
          <span>Nikkah {weddingData.nikkahTime}</span>
          <span aria-hidden="true" className="text-[#C8A96E]">
            ·
          </span>
          <span>Quaid-Abad</span>
        </div>
      </motion.div>
    </section>
  );
};
