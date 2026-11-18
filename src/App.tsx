import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { EnvelopeCover } from './components/EnvelopeCover';
import { FloatingControls } from './components/FloatingControls';
import { FloatingPetals } from './animations/FloatingPetals';
import { HeroRevealSection } from './sections/HeroRevealSection';
import { InvitationMessageSection } from './sections/InvitationMessageSection';
import { ScratchRevealSection } from './sections/ScratchRevealSection';
import { EventDetailsSection } from './sections/EventDetailsSection';
import { RsvpSection } from './sections/RsvpSection';
import { ClosingSection } from './sections/ClosingSection';
import { audioManager } from './utils/audioManager';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  const handleStartOpening = () => {
    // Initiate gentle background music upon explicit user interaction
    void audioManager.play();
  };

  const handleOpened = () => {
    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleReplayOpening = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => {
      setIsOpened(false);
    }, 280);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="paper-texture relative min-h-[100dvh] w-full overflow-x-hidden bg-[#FAF6EF] text-[#2B231E]">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <EnvelopeCover
              key="envelope-cover"
              onStartOpening={handleStartOpening}
              onOpened={handleOpened}
            />
          ) : (
            <motion.main
              key="invitation-journey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full"
            >
              <FloatingPetals density="light" />
              <HeroRevealSection />
              <InvitationMessageSection />
              <ScratchRevealSection />
              <EventDetailsSection />
              <RsvpSection />
              <ClosingSection onReplayOpening={handleReplayOpening} />
            </motion.main>
          )}
        </AnimatePresence>

        <FloatingControls visible={isOpened} />
      </div>
    </MotionConfig>
  );
}
