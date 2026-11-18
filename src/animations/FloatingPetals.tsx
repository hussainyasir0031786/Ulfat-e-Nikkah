import React, { useMemo } from 'react';

interface FloatingPetalsProps {
  density?: 'light' | 'medium';
  className?: string;
}

interface PetalSpec {
  id: number;
  leftPercent: number;
  size: number;
  durationSec: number;
  delaySec: number;
  driftX: number;
  driftRot: number;
  variant: 'blush' | 'ivory' | 'gold' | 'lavender';
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  density = 'light',
  className = '',
}) => {
  const petals = useMemo<PetalSpec[]>(() => {
    const count = density === 'medium' ? 12 : 7;
    const variants: PetalSpec['variant'][] = ['blush', 'ivory', 'gold', 'lavender'];

    return Array.from({ length: count }, (_, idx) => {
      // Keep petals mostly near outer horizontal margins so center text stays unobstructed
      const isLeft = idx % 2 === 0;
      const laneOffset = ((idx * 17) % 24) + 2;
      const leftPercent = isLeft ? laneOffset : 100 - laneOffset;

      return {
        id: idx,
        leftPercent,
        size: 10 + (idx % 4) * 3,
        durationSec: 15 + (idx % 5) * 3.5,
        delaySec: -(idx * 2.4),
        driftX: isLeft ? 22 + (idx % 3) * 14 : -22 - (idx % 3) * 14,
        driftRot: (idx % 2 === 0 ? 1 : -1) * (160 + (idx % 4) * 45),
        variant: variants[idx % variants.length],
      };
    });
  }, [density]);

  const colorMap: Record<PetalSpec['variant'], string> = {
    blush: 'rgba(229, 192, 192, 0.55)',
    ivory: 'rgba(255, 252, 245, 0.72)',
    gold: 'rgba(200, 169, 110, 0.35)',
    lavender: 'rgba(216, 208, 226, 0.45)',
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-10 overflow-hidden ${className}`}
    >
      {petals.map((petal) => {
        const style = {
          left: `${petal.leftPercent}%`,
          width: `${petal.size}px`,
          height: `${petal.size * 1.25}px`,
          '--drift-x': `${petal.driftX}px`,
          '--drift-rot': `${petal.driftRot}deg`,
          '--drift-duration': `${petal.durationSec}s`,
          '--drift-delay': `${petal.delaySec}s`,
        } as React.CSSProperties;

        if (petal.variant === 'gold') {
          return (
            <span
              key={petal.id}
              style={{
                ...style,
                width: '5px',
                height: '5px',
                backgroundColor: colorMap.gold,
              }}
              className="animate-petal-drift absolute top-0 rounded-full"
            />
          );
        }

        return (
          <svg
            key={petal.id}
            style={style}
            viewBox="0 0 24 30"
            fill="none"
            className="animate-petal-drift absolute top-0"
          >
            <path
              d="M12 2C17.5 6.5 21 13.5 19.5 20.5C18.2 26 14.5 28.5 12 28.5C9.5 28.5 5.8 26 4.5 20.5C3 13.5 6.5 6.5 12 2Z"
              fill={colorMap[petal.variant]}
            />
          </svg>
        );
      })}
    </div>
  );
};
