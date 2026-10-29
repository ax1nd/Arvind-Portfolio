import { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio.ts';

interface CyberpunkLoaderProps {
  onComplete: () => void;
}

export function CyberpunkLoader({ onComplete }: CyberpunkLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [logIndex, setLogIndex] = useState(0);
  const isSkippedRef = useRef(false);

  const BOOT_LOGS = [
    'MOUNTING FILE_SYSTEM // CHENNAI NODE',
    'ALLOCATING NEURAL HEAP [OK]',
    'COMPILING SHADERS & RUNTIME [OK]',
    'CALIBRATING SPATIAL RADIANCE MATRIX',
    'PRE-WARMING AUDIO ENGINE [OK]',
    'SYNCHRONIZING ZERO-ALLOCATION CONSENSUS',
    'PREPARING KINETIC BRUTALIST PORTFOLIO',
    'UNMASK SEQUENCE ARMED // READY'
  ];

  // Smooth loading progression
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (isSkippedRef.current) {
        clearInterval(interval);
        return;
      }

      // Smooth, natural increments
      const increment = current < 40 ? Math.floor(Math.random() * 8) + 4
        : current < 75 ? Math.floor(Math.random() * 10) + 5
        : current < 92 ? Math.floor(Math.random() * 6) + 3
        : Math.floor(Math.random() * 4) + 2;

      current = Math.min(current + increment, 100);
      setProgress(current);

      const targetLog = Math.min(
        Math.floor((current / 100) * BOOT_LOGS.length),
        BOOT_LOGS.length - 1
      );
      setLogIndex(targetLog);

      if (current % 20 === 0) {
        sound.play('click');
      }

      if (current >= 100) {
        clearInterval(interval);
        triggerZoomTransition();
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Trigger the clean letter 'A' zoom mask transition
  const triggerZoomTransition = () => {
    if (isZooming) return;
    setIsZooming(true);
    sound.play('glitch');

    // Mechanical unmask sound cue
    setTimeout(() => {
      sound.play('heavy');
      sound.startAmbience();
    }, 70);

    // Expand the exact same letter 'A'
    requestAnimationFrame(() => {
      setZoomScale(36);
    });

    // Fade dark overlay near the end of zoom for seamless handoff
    const fadeTimer = setTimeout(() => {
      setOverlayOpacity(0);
    }, 460);

    // Complete transition and unmount loader
    const finishTimer = setTimeout(() => {
      onComplete();
    }, 740);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  };

  const handleSkip = () => {
    if (isZooming) return;
    isSkippedRef.current = true;
    setProgress(100);
    triggerZoomTransition();
  };

  // Keyboard shortcut to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZooming]);

  const totalBlocks = 20;
  const activeBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden select-none pointer-events-auto bg-transparent">
      {/* 
        SVG MASK LAYER:
        The dark #0a0a0a overlay covers the screen.
        The exact letter 'A' in the center acts as the cut-out mask.
        When loading finishes, that same 'A' scales from 1 to 36,
        smoothly revealing the homepage through the opening of the 'A'.
      */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{
          opacity: overlayOpacity,
          transition: 'opacity 0.28s ease-out'
        }}
      >
        <defs>
          <mask id="clean-letter-a-mask">
            {/* White keeps the dark overlay solid */}
            <rect x="-500" y="-500" width="2000" height="2000" fill="white" />

            {/* 
              Black Letter 'A' cuts a transparent window revealing the homepage.
              Scales up from the exact center (500, 500).
            */}
            <g
              style={{
                transformOrigin: '500px 500px',
                transform: `scale(${zoomScale})`,
                transition: isZooming
                  ? 'transform 0.72s cubic-bezier(0.7, 0, 0.2, 1)'
                  : 'none'
              }}
            >
              <text
                x="500"
                y="500"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--font-syne), 'Syne', sans-serif"
                fontWeight="900"
                fontSize="96"
                fill={isZooming ? 'black' : 'white'}
              >
                A
              </text>
            </g>
          </mask>
        </defs>

        {/* Dark overlay masked by the letter 'A' */}
        <rect
          x="-500"
          y="-500"
          width="2000"
          height="2000"
          fill="#0a0a0a"
          mask="url(#clean-letter-a-mask)"
        />

        {/* 
          Visible Letter 'A':
          During booting: solid electric lime #d4ff00.
          During zoom: switches to a luminous lime laser outline as the home page is unveiled inside it.
        */}
        <g
          style={{
            transformOrigin: '500px 500px',
            transform: `scale(${zoomScale})`,
            transition: isZooming
              ? 'transform 0.72s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.35s ease-out'
              : 'none',
            opacity: isZooming && zoomScale > 14 ? 0 : 1
          }}
        >
          {isZooming ? (
            <text
              x="500"
              y="500"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="var(--font-syne), 'Syne', sans-serif"
              fontWeight="900"
              fontSize="96"
              fill="none"
              stroke="#d4ff00"
              strokeWidth="2.5"
              style={{ filter: 'drop-shadow(0 0 14px #d4ff00)' }}
            >
              A
            </text>
          ) : (
            <text
              x="500"
              y="500"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="var(--font-syne), 'Syne', sans-serif"
              fontWeight="900"
              fontSize="96"
              fill="#d4ff00"
              style={{ filter: 'drop-shadow(0 0 10px rgba(212,255,0,0.35))' }}
            >
              A
            </text>
          )}
        </g>
      </svg>

      {/* 
        CLEAN, AESTHETIC CYBERPUNK HUD
      */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
        {/* Top Minimal Telemetry Bar */}
        <div
          className={`flex items-center justify-between border-b border-[#1c1c1c] pb-4 font-mono text-xs text-[#8e8e8e] transition-opacity duration-200 pointer-events-auto ${
            isZooming ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#d4ff00] animate-pulse"></span>
            <span className="text-[#f5f5f5] font-bold tracking-widest uppercase">
              ARVIND.SYS // BOOTLOADER
            </span>
            <span className="hidden sm:inline text-[#3a3a3a]">|</span>
            <span className="hidden sm:inline text-[#8e8e8e] uppercase">
              CHENNAI [13.0827° N, 80.2707° E]
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="border border-[#2a2a2a] hover:border-[#d4ff00] bg-[#121212] px-3 py-1 font-mono text-[11px] text-[#f5f5f5] hover:text-[#d4ff00] uppercase transition-colors cursor-pointer"
          >
            SKIP [ESC ↗]
          </button>
        </div>

        {/* 
          Center Reticle framing that exact small 'A'
        */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 pointer-events-none transition-all duration-200 ${
            isZooming ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
        >
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#d4ff00]" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#d4ff00]" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#d4ff00]" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#d4ff00]" />
        </div>

        {/* 
          Loading metrics & progress bar directly below the small 'A'
        */}
        <div
          className={`absolute top-[calc(50%+64px)] left-1/2 -translate-x-1/2 w-full max-w-xs flex flex-col items-center transition-all duration-200 pointer-events-none ${
            isZooming ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Digital Percentage Numbers */}
          <div className="flex items-baseline justify-center gap-1.5 mb-2 font-mono">
            <span className="font-syne font-black text-3xl sm:text-4xl tracking-tighter text-[#f5f5f5] tabular-nums">
              {String(progress).padStart(3, '0')}
            </span>
            <span className="text-sm font-bold text-[#d4ff00]">%</span>
          </div>

          {/* Clean Segmented Progress Bar */}
          <div className="w-56 h-1.5 bg-[#121212] border border-[#2a2a2a] p-0.5 mb-3 flex gap-0.5">
            {Array.from({ length: totalBlocks }).map((_, idx) => (
              <div
                key={idx}
                className={`h-full flex-1 transition-colors duration-75 ${
                  idx < activeBlocks
                    ? 'bg-[#d4ff00]'
                    : 'bg-transparent'
                }`}
              />
            ))}
          </div>

          {/* Single Clean Terminal Log Line */}
          <div className="font-mono text-[10px] text-[#8e8e8e] tracking-widest uppercase truncate max-w-[280px]">
            <span className="text-[#d4ff00] mr-1.5">›</span>
            <span>{BOOT_LOGS[logIndex]}</span>
          </div>
        </div>

        {/* Bottom Status Line */}
        <div
          className={`flex items-center justify-between border-t border-[#1c1c1c] pt-4 font-mono text-[10px] text-[#8e8e8e] tracking-wider uppercase transition-opacity duration-200 ${
            isZooming ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span>MEM: 64TB // SPATIAL MATRIX</span>
          <span className="hidden sm:inline">ZERO-ALLOCATION CONSENSUS // READY</span>
        </div>
      </div>
    </div>
  );
}
