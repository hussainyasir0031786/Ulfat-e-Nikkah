import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle, Phone } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from '../components/OrnamentalDivider';
import { buildTelHref, buildWhatsAppRsvpUrl } from '../utils/links';

export const RsvpSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const telHref = buildTelHref(weddingData.phone);
  const whatsappUrl = buildWhatsAppRsvpUrl(
    weddingData.whatsappNumber,
    weddingData.whatsappPrefillText
  );

  return (
    <section
      id="rsvp-section"
      aria-label="RSVP and Family Contact"
      className="relative z-20 px-4 py-14 sm:px-8 sm:py-20"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="luxury-card-surface mx-auto max-w-2xl rounded-[28px] border border-[#C8A96E]/45 px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <p className="font-ui text-[11px] font-medium tracking-[0.28em] text-[#8A6D3B] uppercase">
          {weddingData.rsvpLabel}
        </p>

        <h2 className="mt-2 font-editorial text-3xl font-medium text-[#2B231E] sm:text-4xl">
          {weddingData.rsvpName}
        </h2>

        <a
          href={telHref}
          className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 font-ui text-lg font-medium tracking-[0.12em] text-[#4B3F37] tabular-nums transition-colors hover:text-[#8A6D3B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69254]"
        >
          <Phone className="h-4 w-4 text-[#8A6D3B]" strokeWidth={1.6} />
          <span>{weddingData.phone}</span>
        </a>

        <OrnamentalDivider className="my-6" />

        <p className="mx-auto max-w-sm font-editorial text-base italic text-[#6B5B51] sm:text-lg">
          Kindly confirm your presence or reach out to the host family directly.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a
            href={telHref}
            aria-label={`Call ${weddingData.rsvpName} at ${weddingData.phone}`}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-[#2B231E] px-7 py-3 font-ui text-xs font-medium tracking-[0.18em] text-[#FAF6EF] uppercase shadow-[0_10px_24px_-8px_rgba(43,35,30,0.3)] transition-all duration-200 hover:bg-[#3F342D] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69254] sm:w-auto"
          >
            <Phone className="h-4 w-4 text-[#E7D5C4]" strokeWidth={1.6} />
            <span className="whitespace-nowrap">CONTACT / RSVP</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Send WhatsApp RSVP to ${weddingData.rsvpName}`}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full border border-[#6E7F6B]/60 bg-[#FFFDF9] px-7 py-3 font-ui text-xs font-medium tracking-[0.18em] text-[#42523F] uppercase transition-all duration-200 hover:border-[#6E7F6B] hover:bg-[#F3F6F2] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E7F6B] sm:w-auto"
          >
            <MessageCircle className="h-4 w-4 text-[#6E7F6B]" strokeWidth={1.7} />
            <span className="whitespace-nowrap">WhatsApp RSVP</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
