import { useState } from 'react';
import { Project, ScreenId } from '../types.ts';
import { PROJECTS } from '../data/projects.ts';
import { sound } from '../utils/audio.ts';

interface SplitScreenShowcaseProps {
  onNavigate: (screen: ScreenId, label: string) => void;
  onOpenCaseStudy: (project: Project) => void;
}

export function SplitScreenShowcase({ onOpenCaseStudy }: SplitScreenShowcaseProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  const currentProject = PROJECTS[selectedIdx];

  const handleNextProject = () => {
    sound.play('switch');
    setSelectedIdx((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrevProject = () => {
    sound.play('switch');
    setSelectedIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <div className="relative min-h-[calc(100vh-115px)] flex flex-col justify-between overflow-hidden select-none">
      {/* Main Split Screen Container */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 relative">
        {/* LEFT HALF: Colored field with inverted mirrored typography (Video 00:21) */}
        <div
          className="relative min-h-[380px] md:min-h-full p-6 sm:p-12 flex flex-col justify-between transition-colors duration-200 border-b md:border-b-0 md:border-r border-[#2a2a2a]"
          style={{ backgroundColor: currentProject.accentColor }}
        >
          {/* Top banner */}
          <div className="flex items-center justify-between text-[#0a0a0a] font-mono text-xs uppercase tracking-widest font-bold">
            <span className="bg-[#0a0a0a] text-[#f5f5f5] px-2 py-0.5">
              [{currentProject.index} / 0{PROJECTS.length}]
            </span>
            <span className="hidden sm:inline">INVERTED PLANE</span>
            <span>{currentProject.year}</span>
          </div>

          {/* Center inverted / upside down mirrored typography (as in video 00:21) */}
          <div className="my-auto py-8">
            <div
              className="transform rotate-180 scale-x-[-1] text-right font-syne font-black text-4xl sm:text-6xl lg:text-7xl leading-none text-[#0a0a0a] uppercase tracking-tighter"
              title="Mirrored Typography"
            >
              <span>({currentProject.index}) </span>
              <br />
              <span>Change the</span>
              <br />
              <span>rules</span>
              <div className="font-mono text-xs font-bold text-[#0a0a0a] uppercase tracking-widest mt-3">
                // {currentProject.title}
              </div>
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="flex items-center justify-between text-[#0a0a0a] font-mono text-xs uppercase font-bold">
            <span>{currentProject.client}</span>
            <button
              onClick={handlePrevProject}
              className="border-2 border-[#0a0a0a] bg-transparent hover:bg-[#0a0a0a] hover:text-[#f5f5f5] px-3 py-1 transition-colors cursor-pointer"
            >
              ← PREV
            </button>
          </div>
        </div>

        {/* RIGHT HALF: Pitch black void with stark typography and circular manifesto (Video 00:22) */}
        <div className="relative min-h-[380px] md:min-h-full bg-[#0a0a0a] p-6 sm:p-12 flex flex-col justify-between">
          {/* Top banner */}
          <div className="flex items-center justify-between text-[#8e8e8e] font-mono text-xs uppercase tracking-widest">
            <span className="text-[#f5f5f5]">
              DISCIPLINE: {currentProject.discipline.toUpperCase()}
            </span>
            <button
              onClick={handleNextProject}
              className="border border-[#2a2a2a] hover:border-[#d4ff00] text-[#f5f5f5] hover:text-[#d4ff00] px-3 py-1 transition-colors cursor-pointer"
            >
              NEXT [0{(selectedIdx + 1) % PROJECTS.length + 1}] →
            </button>
          </div>

          {/* Main upright typography */}
          <div className="my-auto py-8">
            <div className="font-syne font-black text-4xl sm:text-6xl lg:text-7xl leading-none text-[#f5f5f5] uppercase tracking-tighter">
              <span className="text-[#d4ff00]">({currentProject.index}) </span>
              <br />
              <span>Change the</span>
            </div>

            {/* Circular text manifesto block from video 00:23 */}
            <div className="my-8 max-w-sm ml-auto p-4 border border-[#2a2a2a] bg-[#121212] relative">
              <div className="font-mono text-[10px] text-[#d4ff00] uppercase mb-1 flex items-center justify-between">
                <span>[MANIFESTO EXCERPT]</span>
                <span>CHENNAI STUDIO</span>
              </div>
              <p className="font-mono text-xs text-[#c5c9ac] leading-relaxed text-justify">
                {currentProject.manifesto}
              </p>
            </div>

            <div className="font-syne font-black text-4xl sm:text-6xl lg:text-7xl leading-none text-[#f5f5f5] uppercase tracking-tighter">
              <span>rules</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="text-[#d4ff00] font-bold">// {currentProject.title}</span>
              {currentProject.stack && (
                <span className="text-[#8e8e8e]">
                  [{currentProject.stack.slice(0, 3).join(' · ')}]
                </span>
              )}
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
            <button
              onClick={() => {
                sound.play('click');
                onOpenCaseStudy(currentProject);
              }}
              className="brutal-btn-primary px-5 py-2.5 text-xs tracking-wider cursor-pointer flex items-center gap-2"
            >
              <span>View Full Case Study</span>
              <span className="font-mono">↗</span>
            </button>

            <button
              onClick={() => {
                sound.play('switch');
                setIsRotating(!isRotating);
              }}
              className="font-mono text-xs text-[#8e8e8e] hover:text-[#d4ff00] transition-colors uppercase"
            >
              Turntable: {isRotating ? 'ACTIVE' : 'PAUSED'}
            </button>
          </div>
        </div>

        {/* CENTER INTERACTIVE TURNTABLE DISC (Video 00:23) */}
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
              <text className="font-mono text-[7px] font-bold uppercase tracking-[0.2em] fill-[#0a0a0a]">
                <textPath href="#circlePath" startOffset="0%">
                  CHANGE THE RULES · ARVIND STUDIO · CHENNAI · 2026 ·
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
