import { useState } from 'react';
import { ScreenId } from '../types.ts';
import { sound } from '../utils/audio.ts';

interface HeroScreenProps {
  onNavigate: (screen: ScreenId, label: string) => void;
}

// 8x8 pixel bitmap for letter "A"
const PIXEL_A = [
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1]
];

export function HeroScreen({ onNavigate }: HeroScreenProps) {
  // Modes: 'pixel' (initial screen in video) or 'editorial' (transformed headline)
  const [mode, setMode] = useState<'editorial' | 'pixel'>('editorial');
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [hoverPixel, setHoverPixel] = useState<{ r: number; c: number } | null>(null);

  const triggerWordHover = (word: string) => {
    setHoveredWord(word);
    sound.play('pop');
  };

  const clearWordHover = () => {
    setHoveredWord(null);
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center items-center px-4 sm:px-8 py-16 overflow-hidden select-none">
      {/* Floating brutalist micro-particles (from video) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[22%] left-[14%] w-2.5 h-2.5 bg-[#ff007f] opacity-80 animate-pulse"></div>
        <div className="absolute top-[48%] left-[8%] w-1.5 h-1.5 bg-[#f5f5f5] opacity-50"></div>
        <div className="absolute top-[70%] left-[28%] w-2 h-2 bg-[#d4ff00] opacity-90"></div>
        <div className="absolute top-[28%] right-[18%] w-2 h-2 bg-[#00f0ff] opacity-80"></div>
        <div className="absolute top-[65%] right-[12%] w-3 h-3 bg-[#f5f5f5] opacity-60"></div>
        <div className="absolute top-[82%] right-[32%] w-1.5 h-1.5 bg-[#ff007f] opacity-70"></div>
      </div>

      {/* Mode switcher banner at top of workspace */}
      <div className="mb-8 z-20 flex items-center gap-3">
        <button
          onClick={() => {
            sound.play('switch');
            setMode(mode === 'pixel' ? 'editorial' : 'pixel');
          }}
          className="border border-[#2a2a2a] hover:border-[#d4ff00] bg-[#121212] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#8e8e8e] hover:text-[#f5f5f5] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="w-2 h-2 bg-[#d4ff00]"></span>
          <span>View: {mode === 'pixel' ? '8-Bit Monogram' : 'Editorial Kinetic Headline'}</span>
          <span className="text-[#d4ff00]">[Toggle]</span>
        </button>
      </div>

      {mode === 'pixel' ? (
        /* PIXEL MONOGRAM SCREEN (00:00 - 00:02 in video) */
        <div className="flex flex-col items-center justify-center py-12 z-10">
          <div
            className="grid grid-cols-8 gap-1.5 sm:gap-2.5 p-6 bg-[#0a0a0a] border-2 border-[#1c1c1c] hover:border-[#2a2a2a] transition-colors cursor-pointer"
            onClick={() => {
              sound.play('glitch');
              setMode('editorial');
            }}
            title="Click to explode into editorial headline"
          >
            {PIXEL_A.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                const isHovered = hoverPixel?.r === rIdx && hoverPixel?.c === cIdx;
                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    onMouseEnter={() => {
                      setHoverPixel({ r: rIdx, c: cIdx });
                      sound.play('click');
                    }}
                    className={`w-6 h-6 sm:w-11 sm:h-11 transition-all ${
                      cell === 1
                        ? isHovered
                          ? 'bg-[#d4ff00] scale-90'
                          : 'bg-[#f5f5f5]'
                        : 'bg-transparent'
                    }`}
                  />
                );
              })
            )}
          </div>

          {/* Single dot below 'A' as in video */}
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#f5f5f5] mt-6"></div>

          <p className="mt-8 font-mono text-xs text-[#8e8e8e] tracking-widest uppercase">
            [Click letter to expand typographic narrative]
          </p>
        </div>
      ) : (
        /* EDITORIAL HEADLINE WITH DYNAMIC HOVER CARDS (00:03 - 00:10 in video) */
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-7xl leading-tight sm:leading-tight text-[#f5f5f5] tracking-tight">
            <span>A </span>
            <span
              onMouseEnter={() => triggerWordHover('mind')}
              onMouseLeave={clearWordHover}
              className="relative inline-block cursor-pointer px-1 text-[#f5f5f5] hover:text-[#d4ff00] hover:underline decoration-4 underline-offset-8 transition-colors"
            >
              mind
            </span>
            <span> full of </span>
            <span
              onMouseEnter={() => triggerWordHover('dreams')}
              onMouseLeave={clearWordHover}
              className="relative inline-block cursor-pointer px-1 text-[#f5f5f5] hover:text-[#ff007f] hover:underline decoration-4 underline-offset-8 transition-colors"
            >
              dreams
            </span>
            <span> and </span>
            <span
              onMouseEnter={() => triggerWordHover('designs')}
              onMouseLeave={clearWordHover}
              className="relative inline-block cursor-pointer px-1 text-[#f5f5f5] hover:text-[#d4ff00] hover:underline decoration-4 underline-offset-8 transition-colors"
            >
              designs
            </span>
            <span>, </span>
            <br />
            <span
              onMouseEnter={() => triggerWordHover('reality')}
              onMouseLeave={clearWordHover}
              className="relative inline-block cursor-pointer px-2 py-0.5 bg-[#f5f5f5] text-[#0a0a0a] font-serif font-black hover:bg-[#d4ff00] transition-colors"
            >
              built into reality.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 max-w-xl mx-auto font-mono text-xs sm:text-sm text-[#8e8e8e] leading-relaxed tracking-wide">
            Arvind is a Computer Science student chasing the space where art meets engineering. He tells stories through design, bending code into color, motion and meaning.
          </p>

          {/* Center navigation shortcuts to other screens in the video */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('alphabet', 'THE ALPHABET DRUM')}
              className="brutal-btn-primary px-6 py-3 text-xs tracking-wider cursor-pointer"
            >
              Explore Alphabet Drum (00:12) ↗
            </button>
            <button
              onClick={() => onNavigate('split', 'ABOUT ME')}
              className="brutal-btn-outline px-6 py-3 text-xs tracking-wider cursor-pointer"
            >
              About Me (00:22) ↗
            </button>
            <button
              onClick={() => onNavigate('work', 'SELECTED ENGINES')}
              className="brutal-btn-cyber px-6 py-3 text-xs tracking-wider cursor-pointer"
            >
              CSE Projects ↗
            </button>
          </div>
        </div>
      )}

      {/* DYNAMIC HOVER PREVIEW CARDS (using user-provided project assets) */}
      {/* 1. "mind" hover: College IMS ERP architecture */}
      {hoveredWord === 'mind' && (
        <div 
          className="fixed top-24 left-1/2 -translate-x-[280px] sm:-translate-x-[360px] z-30 pointer-events-none w-60 sm:w-72 bg-[#0a0a0a] p-2 border-2 border-[#d4ff00] shadow-[6px_6px_0px_#d4ff00] animate-jitter"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
            <img
              src="/assets/aistudio/image_923a47e4.png"
              alt="College IMS Architecture"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[#d4ff00] font-mono text-[10px] font-bold uppercase">
            <span>[MIND / ARCHITECTURE]</span>
            <span>COLLEGE IMS</span>
          </div>
        </div>
      )}

      {/* 2. "dreams" hover: Dungeon Dash 2D Godot 4 combat engine */}
      {hoveredWord === 'dreams' && (
        <div 
          className="fixed top-20 right-1/2 translate-x-[260px] sm:translate-x-[340px] z-30 pointer-events-none w-60 sm:w-72 bg-[#ff007f] p-2 border-2 border-[#f5f5f5] shadow-[6px_6px_0px_#0a0a0a] animate-jitter"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
            <img
              src="/assets/aistudio/image_77cc04cf.png"
              alt="Dungeon Dash Godot 4 Game"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[#0a0a0a] font-mono text-[10px] font-bold uppercase">
            <span>[DREAMS / GAME ENGINE]</span>
            <span>GODOT 4 DASH</span>
          </div>
        </div>
      )}

      {/* 3. "designs" hover: Agentic AI video assembly swarm */}
      {hoveredWord === 'designs' && (
        <div 
          className="fixed bottom-24 right-8 sm:right-24 z-30 pointer-events-none w-60 sm:w-72 bg-[#0a0a0a] p-2 border-2 border-[#00f0ff] shadow-[6px_6px_0px_#00f0ff]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[#1c1c1c]">
            <img
              src="/assets/aistudio/image_7c07a1c5.png"
              alt="Agentic AI Video Assembly"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[#00f0ff] font-mono text-[10px] font-bold uppercase">
            <span>[DESIGNS / VIDEO AGENTS]</span>
            <span>AUTONOMOUS SWARM</span>
          </div>
        </div>
      )}

      {/* 4. "reality" hover: Edit Style Finder + Chennai station */}
      {hoveredWord === 'reality' && (
        <div 
          className="fixed bottom-20 left-8 sm:left-24 z-30 pointer-events-none w-64 sm:w-72 bg-[#121212] p-2.5 border-2 border-[#1a803b] shadow-[6px_6px_0px_#1a803b] animate-jitter"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a] mb-2 border border-[#2a2a2a]">
            <img
              src="/assets/aistudio/image_37f2195e.png"
              alt="Edit Style Finder"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between text-[#1a803b] font-mono text-[10px] font-bold uppercase mb-1">
            <span>[REALITY / MULTIMODAL]</span>
            <span>STYLE FINDER</span>
          </div>
          <div className="font-syne font-bold text-xs text-[#f5f5f5] uppercase">
            Chennai Engineering Station
          </div>
          <div className="font-mono text-[10px] text-[#8e8e8e] mt-0.5">
            Lat 13.0827° N · Lon 80.2707° E
          </div>
        </div>
      )}
    </div>
  );
}
