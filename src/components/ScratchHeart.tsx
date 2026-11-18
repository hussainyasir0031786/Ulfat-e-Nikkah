import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

interface ScratchHeartProps {
  onRevealed?: () => void;
}

const HEART_VIEWBOX_SIZE = 320;

function drawHeartPath(ctx: CanvasRenderingContext2D, size: number): void {
  const s = size / HEART_VIEWBOX_SIZE;
  ctx.beginPath();
  ctx.moveTo(160 * s, 286 * s);
  ctx.bezierCurveTo(148 * s, 276 * s, 28 * s, 198 * s, 28 * s, 108 * s);
  ctx.bezierCurveTo(28 * s, 58 * s, 68 * s, 26 * s, 112 * s, 26 * s);
  ctx.bezierCurveTo(138 * s, 26 * s, 154 * s, 40 * s, 160 * s, 54 * s);
  ctx.bezierCurveTo(166 * s, 40 * s, 182 * s, 26 * s, 208 * s, 26 * s);
  ctx.bezierCurveTo(252 * s, 26 * s, 292 * s, 58 * s, 292 * s, 108 * s);
  ctx.bezierCurveTo(292 * s, 198 * s, 172 * s, 276 * s, 160 * s, 286 * s);
  ctx.closePath();
}

export const ScratchHeart: React.FC<ScratchHeartProps> = ({ onRevealed }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastCheckTimeRef = useRef(0);
  const [canvasReady, setCanvasReady] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  const paintScratchLayer = useCallback((canvas: HTMLCanvasElement, cssSize: number) => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      setCanvasReady(false);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssSize * dpr;
    canvas.height = cssSize * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, cssSize, cssSize);
    ctx.save();
    drawHeartPath(ctx, cssSize);
    ctx.clip();

    // Soft blush & champagne-foil textured gradient
    const foilGrad = ctx.createLinearGradient(0, 0, cssSize, cssSize);
    foilGrad.addColorStop(0, '#E9D3D0');
    foilGrad.addColorStop(0.35, '#DFC3BE');
    foilGrad.addColorStop(0.65, '#E7D5C4');
    foilGrad.addColorStop(1, '#D7B7B2');
    ctx.fillStyle = foilGrad;
    ctx.fillRect(0, 0, cssSize, cssSize);

    // Subtle satin shimmer highlights
    const shimmerGrad = ctx.createRadialGradient(
      cssSize * 0.35,
      cssSize * 0.28,
      10,
      cssSize * 0.5,
      cssSize * 0.5,
      cssSize * 0.65
    );
    shimmerGrad.addColorStop(0, 'rgba(255, 253, 249, 0.42)');
    shimmerGrad.addColorStop(0.6, 'rgba(255, 253, 249, 0.08)');
    shimmerGrad.addColorStop(1, 'rgba(182, 146, 84, 0.14)');
    ctx.fillStyle = shimmerGrad;
    ctx.fillRect(0, 0, cssSize, cssSize);

    // Subtle linen speckles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    for (let i = 0; i < 90; i += 1) {
      const rx = ((i * 73) % 97) * (cssSize / 97);
      const ry = ((i * 41) % 89) * (cssSize / 89);
      ctx.fillRect(rx, ry, 1.5, 1.5);
    }

    // Center prompt: SCRATCH ME
    ctx.fillStyle = '#4B3A33';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `600 ${Math.round(cssSize * 0.072)}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText('SCRATCH ME', cssSize / 2, cssSize * 0.45);

    ctx.fillStyle = '#6B5B51';
    ctx.font = `500 ${Math.round(cssSize * 0.036)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText('Reveal our Nikkah date', cssSize / 2, cssSize * 0.545);

    ctx.restore();

    // Fine champagne-gold border stroke around heart
    ctx.save();
    drawHeartPath(ctx, cssSize);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(182, 146, 84, 0.72)';
    ctx.stroke();
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const size = Math.min(container.clientWidth || 300, 320);
    paintScratchLayer(canvas, size);
  }, [paintScratchLayer]);

  const computeClearedRatio = useCallback((canvas: HTMLCanvasElement): number => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return 0;
    const { width, height } = canvas;
    if (width === 0 || height === 0) return 0;

    // Sample a bounding interior square inside the heart for fast, accurate estimation
    const startX = Math.floor(width * 0.22);
    const startY = Math.floor(height * 0.22);
    const sampleW = Math.floor(width * 0.56);
    const sampleH = Math.floor(height * 0.54);

    try {
      const imageData = ctx.getImageData(startX, startY, sampleW, sampleH);
      const data = imageData.data;
      let transparentCount = 0;
      let totalSampled = 0;

      // Stride by 8 pixels for smooth mobile performance
      for (let i = 3; i < data.length; i += 32) {
        totalSampled += 1;
        if (data[i] < 45) {
          transparentCount += 1;
        }
      }

      return totalSampled > 0 ? transparentCount / totalSampled : 0;
    } catch {
      return 0;
    }
  }, []);

  const triggerReveal = useCallback(() => {
    if (isRevealed) return;
    setIsRevealed(true);
    setScratchProgress(100);
    onRevealed?.();
  }, [isRevealed, onRevealed]);

  const eraseAt = useCallback(
    (clientX: number, clientY: number) => {
      if (isRevealed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.save();
      drawHeartPath(ctx, rect.width);
      ctx.clip();

      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = Math.max(30, rect.width * 0.115);

      ctx.beginPath();
      if (lastPointRef.current) {
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
      } else {
        ctx.moveTo(x - 0.1, y);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      lastPointRef.current = { x, y };

      const now = performance.now();
      if (now - lastCheckTimeRef.current > 110) {
        lastCheckTimeRef.current = now;
        const ratio = computeClearedRatio(canvas);
        setScratchProgress(Math.min(100, Math.round((ratio / 0.46) * 100)));
        if (ratio >= 0.46) {
          triggerReveal();
        }
      }
    },
    [computeClearedRatio, isRevealed, triggerReveal]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    lastPointRef.current = null;
    eraseAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealed) return;
    eraseAt(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative flex h-[288px] w-[288px] items-center justify-center sm:h-[320px] sm:w-[320px]"
      >
        {/* Subtle celebration shimmer sparkles upon reveal */}
        {isRevealed && (
          <div aria-hidden="true" className="pointer-events-none absolute -inset-6 z-20">
            {[
              { top: '8%', left: '16%', delay: 0 },
              { top: '12%', right: '14%', delay: 0.15 },
              { bottom: '18%', left: '12%', delay: 0.25 },
              { bottom: '14%', right: '16%', delay: 0.1 },
              { top: '48%', left: '2%', delay: 0.2 },
              { top: '46%', right: '2%', delay: 0.3 },
            ].map((pos, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.4, y: 6 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.15, 0.8], y: -12 }}
                transition={{ duration: 1.8, delay: pos.delay, ease: 'easeOut' }}
                style={pos}
                className="absolute text-[#C8A96E]"
              >
                <Sparkles className="h-4 w-4" strokeWidth={1.5} />
              </motion.span>
            ))}
          </div>
        )}

        {/* Revealed Underneath Heart Card */}
        <motion.div
          animate={isRevealed ? { scale: [1, 1.03, 1] } : { scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-full w-full items-center justify-center"
        >
          <svg
            viewBox="0 0 320 320"
            className="h-full w-full drop-shadow-[0_18px_36px_rgba(182,146,84,0.16)]"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="revealedHeartBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF9" />
                <stop offset="55%" stopColor="#FBF3EE" />
                <stop offset="100%" stopColor="#F4E7E4" />
              </linearGradient>
            </defs>
            <path
              d="M160 286 C148 276 28 198 28 108 C28 58 68 26 112 26 C138 26 154 40 160 54 C166 40 182 26 208 26 C252 26 292 58 292 108 C292 198 172 276 160 286 Z"
              fill="url(#revealedHeartBg)"
              stroke="#C8A96E"
              strokeWidth="1.75"
            />
            <path
              d="M160 277 C149 268 37 193 37 109 C37 64 73 35 112 35 C135 35 151 48 160 63 C169 48 185 35 208 35 C247 35 283 64 283 109 C283 193 171 268 160 277 Z"
              fill="none"
              stroke="#C8A96E"
              strokeOpacity="0.45"
              strokeWidth="0.9"
            />
          </svg>

          {/* Centered Revealed Wedding Date */}
          <div
            aria-live="polite"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-10 pb-4 text-center"
          >
            <span className="font-ui text-[10px] font-medium tracking-[0.26em] text-[#8A6D3B] uppercase">
              {weddingData.day}
            </span>
            <p className="mt-1.5 font-editorial text-2xl font-medium leading-tight text-[#2B231E] sm:text-[27px]">
              {weddingData.dateOrdinal}
            </p>
            <span className="mt-2 font-ui text-[11px] tracking-[0.18em] text-[#6B5B51] tabular-nums">
              {weddingData.formattedDate}
            </span>
          </div>
        </motion.div>

        {/* Scratchable Top Canvas Layer */}
        {canvasReady && (
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label="Interactive scratch heart. Scratch to reveal the wedding date."
            className={`absolute inset-0 z-10 h-full w-full cursor-pointer touch-none select-none transition-opacity duration-700 ${
              isRevealed ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          />
        )}
      </div>

      {/* Instructions & Accessible Fallback */}
      <div className="mt-4 flex flex-col items-center gap-2.5 text-center">
        {!isRevealed ? (
          <>
            <p className="font-ui text-xs tracking-[0.12em] text-[#6B5B51]">
              Scratch with your finger {scratchProgress > 5 ? `· ${scratchProgress}%` : ''}
            </p>
            <button
              type="button"
              onClick={triggerReveal}
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-[#C8A96E]/55 bg-[#FFFDF9] px-5 py-2 font-ui text-[11px] font-medium tracking-[0.16em] text-[#6B5B51] uppercase transition-colors hover:border-[#B69254] hover:text-[#2B231E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69254]"
            >
              Tap to Reveal Date
            </button>
          </>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-editorial text-lg italic text-[#6E7F6B]"
          >
            Save the date — {weddingData.date}
          </motion.p>
        )}
      </div>
    </div>
  );
};
