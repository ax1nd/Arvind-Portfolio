import { useEffect, useState } from 'react';
import { sound } from '../utils/audio.ts';

interface BrutalistTransitionProps {
  isTransitioning: boolean;
  destinationLabel: string;
  onTransitionComplete: () => void;
}

export function BrutalistTransition({
  isTransitioning,
  destinationLabel,
  onTransitionComplete
}: BrutalistTransitionProps) {
  const [frame, setFrame] = useState<number>(0);

  useEffect(() => {
    if (!isTransitioning) {
      setFrame(0);
      return;
    }

    sound.play('glitch');
    setFrame(1);

    const timer1 = setTimeout(() => {
      setFrame(2);
      sound.play('switch');
    }, 60);

    const timer2 = setTimeout(() => {
      setFrame(3);
    }, 120);

    const timer3 = setTimeout(() => {
      setFrame(4);
      onTransitionComplete();
    }, 180);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isTransitioning, onTransitionComplete]);

  if (!isTransitioning || frame === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between overflow-hidden"
      aria-hidden="true"
    >
      {/* Top brutalist flash slice */}
      <div 
        className={`w-full h-1/4 transition-none flex items-center px-8 border-b-2 ${
          frame === 1 
            ? 'bg-[#d4ff00] text-[#0a0a0a] border-[#0a0a0a] translate-x-2' 
            : frame === 2 
            ? 'bg-[#f5f5f5] text-[#0a0a0a] border-[#0a0a0a] -translate-x-3' 
            : 'bg-[#ff007f] text-[#0a0a0a] border-[#f5f5f5] translate-x-1'
        }`}
      >
        <span className="font-mono text-xs tracking-widest uppercase">
          SYSTEM SHIFT // FRAME_0{frame} // DEST: {destinationLabel}
        </span>
      </div>

      {/* Middle high-contrast typography banner with rapid jitter */}
      <div 
        className={`w-full h-2/4 transition-none flex items-center justify-center border-y-4 px-6 ${
          frame === 1 
            ? 'bg-[#0a0a0a] text-[#d4ff00] border-[#d4ff00] translate-x-3 -translate-y-1' 
            : frame === 2 
            ? 'bg-[#f5f5f5] text-[#0a0a0a] border-[#0a0a0a] -translate-x-4 translate-y-1' 
            : 'bg-[#0a0a0a] text-[#f5f5f5] border-[#f5f5f5] translate-x-1'
        }`}
      >
        <div className="text-center font-syne font-black text-4xl sm:text-7xl lg:text-9xl uppercase tracking-tighter select-none">
          {destinationLabel}
        </div>
      </div>

      {/* Bottom coordinate flash slice */}
      <div 
        className={`w-full h-1/4 transition-none flex items-center justify-between px-8 border-t-2 ${
          frame === 1 
            ? 'bg-[#0a0a0a] text-[#d4ff00] border-[#d4ff00] -translate-x-2' 
            : frame === 2 
            ? 'bg-[#d4ff00] text-[#0a0a0a] border-[#0a0a0a] translate-x-4' 
            : 'bg-[#121212] text-[#8e8e8e] border-[#2a2a2a]'
        }`}
      >
        <span className="font-mono text-xs tracking-widest uppercase">
          [COORDS: 40.7135° N, 73.9877° W]
        </span>
        <span className="font-mono text-xs tracking-widest uppercase">
          [KINETIC NEO-BRUTALIST ARCHITECTURE]
        </span>
      </div>
    </div>
  );
}
