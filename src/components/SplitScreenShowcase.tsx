import { useState } from 'react';
import { Project, ScreenId } from '../types.ts';
import { sound } from '../utils/audio.ts';

interface SplitScreenShowcaseProps {
  onNavigate: (screen: ScreenId, label: string) => void;
  onOpenCaseStudy?: (project: Project) => void;
}

export function SplitScreenShowcase({ onNavigate }: SplitScreenShowcaseProps) {
  const [isRotating, setIsRotating] = useState(true);

  return (
    <div className="relative min-h-[calc(100vh-115px)] flex flex-col justify-between overflow-hidden select-none">
      {/* Main Split Screen Container */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 relative">
        {/* LEFT HALF: Lime field with inverted mirrored typography */}
        <div
          className="relative min-h-[380px] md:min-h-full p-6 sm:p-12 flex flex-col justify-between transition-colors duration-200 border-b md:border-b-0 md:border-r border-[#2a2a2a] bg-[#d4ff00]"
        >
          {/* Top banner */}
          <div className="flex items-center justify-between text-[#0a0a0a] font-mono text-xs uppercase tracking-widest font-bold">
            <span>ABOUT ME</span>
            <span>2026</span>
          </div>

          {/* Center inverted / upside-down typography matching attached reference image */}
          <div className="my-auto py-6 sm:py-10 flex items-center justify-center w-full">
            <img
              src="/assets/aistudio/image_60199aa8.png"
              alt="DREAM DESIGN DEPLOY"
              className="w-full max-w-lg max-h-[360px] sm:max-h-[440px] object-contain mix-blend-multiply select-none"
            />
          </div>

          {/* Bottom metadata */}
          <div className="flex items-center justify-between text-[#0a0a0a] font-mono text-xs uppercase font-bold">
            <span>VISUAL STORYTELLER / CS STUDENT</span>
          </div>
        </div>

        {/* RIGHT HALF: Pitch black void with stark typography and About Me box */}
        <div className="relative min-h-[380px] md:min-h-full bg-[#0a0a0a] p-6 sm:p-12 flex flex-col justify-between">
          {/* Top banner */}
          <div className="flex items-center justify-between text-[#8e8e8e] font-mono text-xs uppercase tracking-widest">
            <span className="text-[#f5f5f5]">
              DISCIPLINE: DESIGN x CODE x STORYTELLING
            </span>
          </div>

          {/* Main upright content */}
          <div className="my-auto py-6 sm:py-8 w-full max-w-xl">
            {/* Header with lime parenthesis accent */}
            <div className="font-syne font-black text-4xl sm:text-6xl lg:text-7xl leading-none text-[#f5f5f5] uppercase tracking-tighter">
              <span className="text-[#d4ff00] text-xl sm:text-3xl block mb-2 font-mono tracking-widest">
                (ARVIND)
              </span>
              <span>ABOUT ME</span>
            </div>

            {/* The Expanded About Me Box */}
            <div className="my-6 w-full p-6 sm:p-8 border border-[#2a2a2a] hover:border-[#d4ff00] bg-[#121212] transition-colors relative shadow-[4px_4px_0px_#000000]">
              <div className="font-mono text-[10px] text-[#d4ff00] uppercase mb-4 flex items-center justify-between tracking-wider">
                <span>[ABOUT ME]</span>
                <span>CHENNAI STUDIO</span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-[#c5c9ac] leading-relaxed text-left">
                Hi, I'm Arvind, a Computer Science student from Chennai who lives where code meets design. I'm a visual storyteller at heart, turning ideas into interfaces, motion and moments. I believe every project should feel like a story: it starts as a dream, takes shape as a design and ships as something real.
              </p>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#2a2a2a]">
            <button
              onClick={() => {
                sound.play('click');
                onNavigate('contact', 'CONTACT');
              }}
              className="brutal-btn-primary px-6 py-2.5 text-xs tracking-wider cursor-pointer flex items-center gap-2"
            >
              <span>SAY HELLO</span>
              <span className="font-mono">↗</span>
            </button>

            <button
              onClick={() => {
                sound.play('switch');
                setIsRotating(!isRotating);
              }}
              className="font-mono text-xs text-[#8e8e8e] hover:text-[#d4ff00] transition-colors uppercase cursor-pointer"
            >
              Turntable: {isRotating ? 'ACTIVE' : 'PAUSED'}
            </button>
          </div>
        </div>

        {/* CENTER INTERACTIVE TURNTABLE DISC */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <div
            onClick={() => {
              sound.play('pop');
              setIsRotating(!isRotating);
            }}
            className={`w-32 h-32 sm:w-44 sm:h-44 bg-[#f5f5f5] text-[#0a0a0a] rounded-full border-4 border-[#0a0a0a] flex items-center justify-center relative shadow-[0_0_24px_rgba(0,0,0,0.8)] cursor-pointer group ${
              isRotating ? 'animate-spin-turntable' : ''
            }`}
            title="Click to pause/spin turntable disc"
          >
            {/* Outer Circular Stamped Typography */}
            <svg
              className="absolute inset-0 w-full h-full p-1.5"
              viewBox="0 0 100 100"
            >
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="font-mono text-[6.8px] font-bold uppercase tracking-[0.22em] fill-[#0a0a0a]">
                <textPath href="#circlePath" startOffset="0%">
                  DREAM · DESIGN · DEPLOY · ARVIND · CHENNAI ·
                </textPath>
              </text>
            </svg>

            {/* Center square notch */}
            <div className="w-5 h-5 bg-[#0a0a0a] group-hover:bg-[#d4ff00] transition-colors flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#f5f5f5]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
