'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useRef, useState, useEffect, useCallback } from 'react';

export const SpotlightBackground = ({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const animationRef = useRef<number | null>(null);

  const animatePosition = useCallback(() => {
    setPosition(current => {
      const dx = targetPosition.x - current.x;
      const dy = targetPosition.y - current.y;

      // Lerp factor - smaller values create more elastic feel (0.1 = 10% per frame)
      const lerpFactor = 0.025;

      const newX = current.x + dx * lerpFactor;
      const newY = current.y + dy * lerpFactor;

      return { x: newX, y: newY };
    });

    // eslint-disable-next-line react-hooks/immutability
    animationRef.current = requestAnimationFrame(animatePosition);
  }, [targetPosition.x, targetPosition.y]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animatePosition);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animatePosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setTargetPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'bg-umber text-ivory relative w-full overflow-hidden',
        className
      )}
    >
      <div
        className='pointer-events-none absolute -inset-px opacity-0 blur-3xl transition duration-300'
        style={{
          opacity,
          background: `radial-gradient(70vmin circle at ${position.x}px ${position.y}px, rgba(255,255,255,.2), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};
