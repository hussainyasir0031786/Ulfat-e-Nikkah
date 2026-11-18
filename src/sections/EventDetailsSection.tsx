import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Calendar,
  CalendarPlus,
  Check,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  UtensilsCrossed,
} from 'lucide-react';
import { weddingData } from '../data/weddingData';
import gardenPavilionImg from '../assets/images/nikkah_garden_pavilion_1795028060323.jpg';
import { ResilientImage } from '../components/ResilientImage';
import { OrnamentalDivider } from '../components/OrnamentalDivider';
import { buildGoogleMapsUrl, downloadNikkahCalendarEvent } from '../utils/links';

export const EventDetailsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const mapsUrl = buildGoogleMapsUrl(weddingData.mapQuery);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${weddingData.venue}, ${weddingData.address}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard blocked on insecure context; fail silently
    }
  };

  const scheduleItems = [
    {
      label: 'DATE',
      value: weddingData.date,
      sub: `${weddingData.day} · ${weddingData.formattedDate}`,
      Icon: Calendar,
    },
    {
      label: 'NIKKAH',
      value: weddingData.nikkahTime,
      sub: 'Sacred Ceremony & Dua',
      Icon: Clock,
    },
    {
      label: 'DINNER',
      value: weddingData.dinnerTime,
      sub: 'Celebration Banquet',
      Icon: UtensilsCrossed,
    },
  ];

  return (
    <section
      id="event-details"
      aria-label="Ceremony Timings and Venue Details"
      className="relative z-20 px-4 py-14 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Section Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-ui text-[11px] font-medium tracking-[0.26em] text-[#8A6D3B] uppercase">
            Schedule &amp; Venue
          </p>
          <h2 className="mt-2 font-editorial text-3xl font-medium text-[#2B231E] text-balance sm:text-4xl">
            Gathering Details
          </h2>
          <OrnamentalDivider className="mt-4 mb-0" />
        </motion.div>

        {/* Date, Nikkah, Dinner Schedule Strip */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 divide-y divide-[#C8A96E]/30 overflow-hidden rounded-3xl border border-[#C8A96E]/40 bg-[#FFFDF9]/90 shadow-[0_18px_42px_-20px_rgba(43,35,30,0.1)] md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {scheduleItems.map(({ label, value, sub, Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center px-6 py-8 text-center sm:py-10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C8A96E]/45 bg-[#FAF6EF] text-[#8A6D3B]">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.45} />
              </span>
              <span className="mt-4 font-ui text-[11px] font-medium tracking-[0.24em] text-[#6B5B51] uppercase">
                {label}
              </span>
              <p className="mt-1.5 font-editorial text-2xl font-semibold text-[#2B231E] tabular-nums sm:text-[28px]">
                {value}
              </p>
              <p className="mt-1 font-ui text-xs text-[#6B5B51]">{sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Venue & Google Maps Architectural Feature */}
        <motion.div
          id="venue-section"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="luxury-card-surface grid grid-cols-1 items-stretch overflow-hidden rounded-[28px] border border-[#C8A96E]/45 lg:grid-cols-12"
        >
          {/* Left Pavilion Imagery */}
          <div className="relative min-h-[240px] bg-[#EFE6D5] lg:col-span-6 lg:min-h-[380px]">
            <ResilientImage
              src={gardenPavilionImg}
              alt={`${weddingData.venue} floral wedding pavilion`}
              fallbackLabel={weddingData.venue}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2B231E]/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#FAF5EC]/20"
            />
          </div>

          {/* Right Venue Details & Maps CTA */}
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center sm:px-10 sm:py-12 lg:col-span-6 lg:items-start lg:text-left">
            <div className="inline-flex items-center gap-2 text-[#8A6D3B]">
              <MapPin className="h-4 w-4" strokeWidth={1.6} />
              <span className="font-ui text-[11px] font-medium tracking-[0.26em] uppercase">
                VENUE
              </span>
            </div>

            <h3 className="mt-3 font-editorial text-2xl font-semibold tracking-wide text-[#2B231E] text-balance sm:text-3xl">
              {weddingData.venue}
            </h3>

            <div className="mt-3 space-y-0.5 font-ui text-sm leading-relaxed text-[#5A4B42] sm:text-base">
              {weddingData.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${weddingData.venue} in Google Maps`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-[#2B231E] px-7 py-3 font-ui text-xs font-medium tracking-[0.18em] text-[#FAF6EF] uppercase shadow-[0_10px_24px_-8px_rgba(43,35,30,0.35)] transition-all duration-200 hover:bg-[#3F342D] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69254]"
              >
                <MapPin className="h-4 w-4 text-[#E7D5C4]" strokeWidth={1.7} />
                <span className="whitespace-nowrap">OPEN IN MAPS</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-75" strokeWidth={1.6} />
              </a>

              <button
                type="button"
                onClick={() => void handleCopyAddress()}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#C8A96E]/60 bg-[#FFFDF9] px-5 py-3 font-ui text-xs font-medium tracking-[0.14em] text-[#4B3F37] uppercase transition-colors hover:border-[#8A6D3B] hover:text-[#2B231E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69254]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#6E7F6B]" strokeWidth={2} />
                    <span className="whitespace-nowrap">Address Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#8A6D3B]" strokeWidth={1.6} />
                    <span className="whitespace-nowrap">Copy Address</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={downloadNikkahCalendarEvent}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#6E7F6B]/45 bg-transparent px-5 py-3 font-ui text-xs font-medium tracking-[0.14em] text-[#4B5B49] uppercase transition-colors hover:bg-[#6E7F6B]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E7F6B]"
              >
                <CalendarPlus className="h-3.5 w-3.5" strokeWidth={1.6} />
                <span className="whitespace-nowrap">Save Date (.ics)</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
