import React from 'react';
import { motion } from 'motion/react';

interface OrnamentalDividerProps {
  className?: string;
}

export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.88 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
      className={`flex items-center justify-center gap-4 my-6 ${className}`}
    >
      <span className="h-px w-14 sm:w-24 bg-gradient-to-r from-transparent via-[#C8A96E]/60 to-[#C8A96E]" />
      <svg width="26" height="16" viewBox="0 0 26 16" fill="none" className="text-[#B69254] shrink-0">
        <path
          d="M13 2L15.2 6.4L20 8L15.2 9.6L13 14L10.8 9.6L6 8L10.8 6.4L13 2Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="#FAF6EF"
        />
        <circle cx="3" cy="8" r="1.2" fill="#C48B8E" />
        <circle cx="23" cy="8" r="1.2" fill="#C48B8E" />
      </svg>
      <span className="h-px w-14 sm:w-24 bg-gradient-to-l from-transparent via-[#C8A96E]/60 to-[#C8A96E]" />
    </motion.div>
  );
};
