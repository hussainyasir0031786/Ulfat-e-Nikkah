import React, { useEffect, useState } from 'react';
import { ArrowUp, MapPin, Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

interface FloatingControlsProps {
  visible: boolean;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ visible }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe(setIsPlaying);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 360);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToVenue = () => {
    const el = document.getElementById('venue-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="Invitation quick controls"
      className="fixed bottom-4 right-4 z-40 flex flex-col gap-2.5 sm:bottom-6 sm:right-6"
    >
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top of invitation"
          title="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C8A96E]/45 bg-[#FFFDF9]/90 text-[#2B231E] shadow-sm backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69254]"
        >
          <ArrowUp className="h-4 w-4 text-[#6B5B51]" strokeWidth={1.6} />
        </button>
      )}

      <button
        type="button"
        onClick={scrollToVenue}
        aria-label="Jump to venue location"
        title="Venue & Directions"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C8A96E]/45 bg-[#FFFDF9]/90 text-[#2B231E] shadow-sm backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69254]"
      >
        <MapPin className="h-4 w-4 text-[#6E7F6B]" strokeWidth={1.6} />
      </button>

      <button
        type="button"
        onClick={() => void audioManager.toggle()}
        aria-label={isPlaying ? 'Mute invitation music' : 'Play invitation music'}
        aria-pressed={isPlaying}
        title={isPlaying ? 'Sound On — Tap to Mute' : 'Sound Muted — Tap to Play'}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C8A96E]/60 bg-[#FFFDF9]/95 text-[#2B231E] shadow-md backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69254]"
      >
        {isPlaying ? (
          <Volume2 className="h-4 w-4 text-[#B69254]" strokeWidth={1.7} />
        ) : (
          <VolumeX className="h-4 w-4 text-[#6B5B51]" strokeWidth={1.6} />
        )}
      </button>
    </aside>
  );
};
