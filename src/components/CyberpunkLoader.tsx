import { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio.ts';

interface CyberpunkLoaderProps {
  onComplete: () => void;
}

export function CyberpunkLoader({ onComplete }: CyberpunkLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'booting' | 'cutting' | 'done'>('booting');
  const [logIndex, setLogIndex] = useState(0);
  const [cutoutScale, setCutoutScale] = useState(0);
  const isSkippedRef = useRef(false);

  const BOOT_LOGS = [
    'INIT KERNEL 6.12 // ARVIND.SYS // CHENNAI NODE',
    'MOUNTING FILE_SYSTEM: /dev/nvme0n1p2 [OK]',
    'ALLOCATING NEURAL HEAP: 64TB QUANTUM REGS',
    'COMPILING SSA JIT RUNTIME & SHADERS [OK]',
    'CALIBRATING GPU SPATIAL RADIANCE PIPELINE',
    'SYNCHRONIZING ZERO-ALLOCATION CONSENSUS',
    'PRE-WARMING AUDIO SYNTHESIS ENGINE [OK]',
    'PREPARING KINETIC BRUTALIST ARCHITECTURE',
    'STENCIL LAYER MASK PREPARED // APERTURE ARMED',
    'SYSTEM READY // TRIGGERING UNMASK SEQUENCE'
  ];

  // Progress counter simulation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (isSkippedRef.current) {
        clearInterval(interval);
        return;
      }

      // Non-linear cyberpunk loading cadence
      const increment = current < 30 ? Math.floor(Math.random() * 8) + 4
        : current < 70 ? Math.floor(Math.random() * 12) + 6
        : current < 90 ? Math.floor(Math.random() * 6) + 3
        : Math.floor(Math.random() * 4) + 2;

      current = Math.min(current + increment, 100);
      setProgress(current);

      // Advance log entries in sync with progress
      const targetLog = Math.min(
        Math.floor((current / 100) * BOOT_LOGS.length),
        BOOT_LOGS.length - 1
      );
      setLogIndex(targetLog);

      if (current % 18 === 0) {
        sound.play('click');
      }

      if (current >= 100) {
        clearInterval(interval);
        triggerCutoutTransition();
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const triggerCutoutTransition = () => {
    if (phase !== 'booting') return;
    sound.play('glitch');
    setPhase('cutting');

    // Mechanical audio cue for the cut-out unmask
    setTimeout(() => {
      sound.play('heavy');
      sound.startAmbience();
    }, 100);

    // Expand the cut-out aperture layer mask
    const timer1 = setTimeout(() => {
      setCutoutScale(1);
    }, 40);

    const timer2 = setTimeout(() => {
      setCutoutScale(2);
    }, 280);

    const timer3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleSkip = () => {
    if (phase !== 'booting') return;
    isSkippedRef.current = true;
    setProgress(100);
    triggerCutoutTransition();
  };

  // Keyboard escape shortcut to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  if (phase === 'done') return null;

  const totalBlocks = 24;
  const activeBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden select-none pointer-events-auto bg-transparent">
      {/* 
        CUT-OUT LAYER MASK IMPLEMENTATION:
        The 4 corner blades slice outward from the central aperture cut-out,
        revealing the interactive portfolio website underneath.
      */}

      {/* TOP-LEFT BLADE */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-1/2 bg-[#080808] border-r border-b border-[#2a2a2a] transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          phase === 'cutting' && cutoutScale >= 1
            ? '-translate-x-full -translate-y-full opacity-0'
            : 'translate-x-0 translate-y-0 opacity-100'
        }`}
      />

      {/* TOP-RIGHT BLADE */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-1/2 bg-[#080808] border-l border-b border-[#2a2a2a] transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          phase === 'cutting' && cutoutScale >= 1
            ? 'translate-x-full -translate-y-full opacity-0'
            : 'translate-x-0 translate-y-0 opacity-100'
        }`}
      />

      {/* BOTTOM-LEFT BLADE */}
      <div
        className={`absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#080808] border-r border-t border-[#2a2a2a] transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          phase === 'cutting' && cutoutScale >= 1
            ? '-translate-x-full translate-y-full opacity-0'
            : 'translate-x-0 translate-y-0 opacity-100'
        }`}
      />

      {/* BOTTOM-RIGHT BLADE */}
      <div
        className={`absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#080808] border-l border-t border-[#2a2a2a] transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          phase === 'cutting' && cutoutScale >= 1
            ? 'translate-x-full translate-y-full opacity-0'
            : 'translate-x-0 translate-y-0 opacity-100'
        }`}
      />

      {/* CUT-OUT APERTURE FRAME (Expanding neon laser stencil boundary) */}
      {phase === 'cutting' && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ease-out z-30 ${
            cutoutScale === 1
              ? 'w-[85vw] h-[75vh] border-4 border-[#d4ff00] shadow-[0_0_60px_#d4ff00] opacity-100'
              : 'w-[180vw] h-[180vh] border-8 border-[#00f0ff] opacity-0'
          }`}
        >
          {/* Laser Cut Crosshairs at 4 corners */}
          <div className="absolute top-0 left-0 -translate-x-3 -translate-y-3 font-mono text-sm text-[#d4ff00] font-bold">
            [+]
          </div>
          <div className="absolute top-0 right-0 translate-x-3 -translate-y-3 font-mono text-sm text-[#d4ff00] font-bold">
            [+]
          </div>
          <div className="absolute bottom-0 left-0 -translate-x-3 translate-y-3 font-mono text-sm text-[#d4ff00] font-bold">
            [+]
          </div>
          <div className="absolute bottom-0 right-0 translate-x-3 translate-y-3 font-mono text-sm text-[#d4ff00] font-bold">
            [+]
          </div>
          <div className="absolute top-3 left-3 bg-[#0a0a0a] border border-[#d4ff00] px-2 py-0.5 font-mono text-[10px] text-[#d4ff00] uppercase tracking-widest">
            STENCIL UNMASK: 100% REVEAL
          </div>
        </div>
      )}

      {/* CYBERPUNK HUD OVERLAY CONTENT */}
      <div
        className={`relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10 transition-opacity duration-300 ${
          phase === 'cutting' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Top HUD Telemetry Toolbar */}
        <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-4 font-mono text-xs text-[#8e8e8e]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#d4ff00] animate-pulse"></span>
            <span className="text-[#f5f5f5] font-bold uppercase tracking-wider">
              ARVIND.SYS // BOOTLOADER v4.2
            </span>
            <span className="hidden md:inline text-[#2a2a2a]">|</span>
            <span className="hidden md:inline uppercase text-[#8e8e8e]">
              CHENNAI STATION [13.0827° N, 80.2707° E]
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-[#d4ff00] uppercase font-bold">
              STATUS: INITIALIZING
            </span>
            <button
              onClick={handleSkip}
              className="border border-[#2a2a2a] hover:border-[#d4ff00] bg-[#121212] px-3 py-1 font-mono text-xs text-[#f5f5f5] hover:text-[#d4ff00] uppercase transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>SKIP BOOT</span>
              <span>[ESC ↗]</span>
            </button>
          </div>
        </div>

        {/* Center Cyberpunk Reactor & Loading Matrix */}
        <div className="my-auto max-w-2xl mx-auto w-full flex flex-col items-center text-center px-4">
          {/* Animated Cyber Reactor Monogram */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-8 flex items-center justify-center">
            {/* Outer Rotating Segmented Dashed Ring */}
            <div className="absolute inset-0 border-2 border-dashed border-[#d4ff00] animate-spin-turntable opacity-80" />

            {/* Middle Inverted Rotating Ring */}
            <div
              className="absolute inset-2 border-2 border-dotted border-[#00f0ff] opacity-60"
              style={{ animation: 'spin-turntable 8s linear infinite reverse' }}
            />

            {/* Corner Crosshairs */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#ff007f]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#ff007f]" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#ff007f]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#ff007f]" />

            {/* Center Monogram / Reactor Core */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#121212] border-2 border-[#f5f5f5] flex items-center justify-center font-syne font-black text-2xl sm:text-3xl text-[#d4ff00] shadow-[0_0_20px_rgba(212,255,0,0.3)]">
              A
            </div>
          </div>

          {/* Large Digital Numerals */}
          <div className="flex items-baseline justify-center gap-2 mb-3">
            <span className="font-syne font-black text-6xl sm:text-8xl tracking-tighter text-[#f5f5f5] tabular-nums">
              {String(progress).padStart(3, '0')}
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#d4ff00]">
              %
            </span>
          </div>

          <div className="font-mono text-xs uppercase tracking-widest text-[#8e8e8e] mb-6 flex items-center gap-2">
            <span className="text-[#00f0ff]">[SYSTEM CHECK]</span>
            <span>CALIBRATING COMPUTER SCIENCE MATRIX</span>
          </div>

          {/* Segmented Brutalist Progress Bar */}
          <div className="w-full max-w-lg bg-[#0e0e0e] border-2 border-[#2a2a2a] p-1.5 shadow-[4px_4px_0px_#000000]">
            <div
              className="gap-1 h-5"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${totalBlocks}, minmax(0, 1fr))`
              }}
            >
              {Array.from({ length: totalBlocks }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-full transition-colors duration-75 ${
                    idx < activeBlocks
                      ? 'bg-[#d4ff00] shadow-[0_0_6px_#d4ff00]'
                      : 'bg-[#181818]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Live Terminal Log Stream */}
          <div className="w-full max-w-lg mt-6 bg-[#0e0e0e] border border-[#2a2a2a] p-3 text-left font-mono text-[11px] text-[#c5c9ac] flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden truncate">
              <span className="text-[#d4ff00] font-bold">›</span>
              <span className="truncate">{BOOT_LOGS[logIndex]}</span>
            </div>
            <span className="text-[#8e8e8e] shrink-0 text-[10px] ml-2">
              [{logIndex + 1}/{BOOT_LOGS.length}]
            </span>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="flex flex-wrap items-center justify-between border-t border-[#2a2a2a] pt-4 font-mono text-[11px] text-[#8e8e8e] gap-2">
          <div className="flex items-center gap-3">
            <span>MEM: 64TB ALLOCATED</span>
            <span>·</span>
            <span>GPU: VK_SPATIAL_RADIANCE</span>
            <span>·</span>
            <span>CONSENSUS: READY</span>
          </div>
          <div className="text-[#c5c9ac]">
            PRESS <kbd className="border border-[#3a3a3a] px-1 py-0.5 text-[#d4ff00]">ESC</kbd> TO SKIP
          </div>
        </div>
      </div>
    </div>
  );
}
