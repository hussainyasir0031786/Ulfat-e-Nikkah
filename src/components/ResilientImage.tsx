import React, { useState } from 'react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel || 'Botanical decorative illustration'}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F4EDE2] via-[#FAF6EF] to-[#EFE6D5] text-[#6B5B51] border border-[#C8A96E]/30 ${className}`}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
          className="text-[#B69254]/70 mb-2"
        >
          <path
            d="M18 6C13 11 10 16.5 10 21.5C10 25.9 13.6 29.5 18 29.5C22.4 29.5 26 25.9 26 21.5C26 16.5 23 11 18 6Z"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <path d="M18 12V28" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M18 19L22 15.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M18 22.5L14 19" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        {fallbackLabel && (
          <span className="font-editorial text-xs tracking-wider uppercase text-[#6B5B51]/80 px-4 text-center">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
};
