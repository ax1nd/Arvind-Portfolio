import { ScreenId } from '../types.ts';
import { sound } from '../utils/audio.ts';
import { useState } from 'react';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, label: string) => void;
}

export function Header({ currentScreen, onNavigate }: HeaderProps) {
  const [heartGlitch, setHeartGlitch] = useState(false);

  const handleHeartClick = () => {
    setHeartGlitch(true);
    sound.resume();
    sound.startAmbience();
    sound.play('glitch');
    setTimeout(() => setHeartGlitch(false), 300);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-[#2a2a2a] px-4 sm:px-8 py-3.5 transition-colors w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sound.play('click');
              onNavigate('hero', 'ARVIND');
            }}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-syne font-black text-sm sm:text-base tracking-tighter text-[#f5f5f5] group-hover:text-[#d4ff00] transition-colors uppercase whitespace-nowrap block">
              ARVIND
            </span>
            <span className="font-mono text-[10px] text-[#8e8e8e] tracking-widest uppercase block -mt-0.5">
              CHENNAI
            </span>
          </button>
        </div>

        {/* Center: Iconic Pixel Heart from the video */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleHeartClick}
            title="Interactive Studio Heart [Click for Ambience BGM & Easter Egg]"
            aria-label="Interactive studio heart"
            className={`cursor-pointer p-1 transition-transform ${
              heartGlitch ? 'scale-125 animate-jitter' : 'hover:scale-110 active:scale-95'
            }`}
          >
            {/* Crisp 8-bit Pixel Heart SVG matching video */}
            <svg
              width="24"
              height="22"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-colors ${
                heartGlitch ? 'fill-[#ff007f]' : 'fill-[#f5f5f5] hover:fill-[#d4ff00]'
              }`}
              style={{ shapeRendering: 'crispEdges' }}
            >
              {/* Row 1 */}
              <rect x="2" y="1" width="2" height="1" />
              <rect x="7" y="1" width="2" height="1" />
              {/* Row 2 */}
              <rect x="1" y="2" width="4" height="1" />
              <rect x="6" y="2" width="4" height="1" />
              {/* Row 3 */}
              <rect x="1" y="3" width="9" height="1" />
              {/* Row 4 */}
              <rect x="1" y="4" width="9" height="1" />
              {/* Row 5 */}
              <rect x="2" y="5" width="7" height="1" />
              {/* Row 6 */}
              <rect x="3" y="6" width="5" height="1" />
              {/* Row 7 */}
              <rect x="4" y="7" width="3" height="1" />
              {/* Row 8 */}
              <rect x="5" y="8" width="1" height="1" />
            </svg>
          </button>
        </div>

        {/* Zone 2 & 3: Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-wider overflow-x-auto">
          <button
            onClick={() => {
              sound.play('click');
              onNavigate('work', 'PROJECT INDEX');
            }}
            className={`whitespace-nowrap transition-colors uppercase cursor-pointer hover:text-[#d4ff00] ${
              currentScreen === 'work' ? 'text-[#d4ff00] font-bold underline underline-offset-4' : 'text-[#f5f5f5]'
            }`}
          >
            Work
          </button>

          <button
            onClick={() => {
              sound.play('click');
              onNavigate('alphabet', 'ALPHABET DRUM');
            }}
            className={`whitespace-nowrap transition-colors uppercase cursor-pointer hover:text-[#d4ff00] ${
              currentScreen === 'alphabet' ? 'text-[#d4ff00] font-bold underline underline-offset-4' : 'text-[#f5f5f5]'
            }`}
          >
            Drum
          </button>

          <button
            onClick={() => {
              sound.play('click');
              onNavigate('split', 'ABOUT ME');
            }}
            className={`whitespace-nowrap transition-colors uppercase cursor-pointer hover:text-[#d4ff00] ${
              currentScreen === 'split' ? 'text-[#d4ff00] font-bold underline underline-offset-4' : 'text-[#f5f5f5]'
            }`}
          >
            About Me
          </button>

          <button
            onClick={() => {
              sound.play('click');
              onNavigate('contact', 'CONTACT');
            }}
            className={`whitespace-nowrap transition-colors uppercase cursor-pointer hover:text-[#d4ff00] ${
              currentScreen === 'contact' ? 'text-[#d4ff00] font-bold underline underline-offset-4' : 'text-[#f5f5f5]'
            }`}
          >
            Contact
          </button>

          {/* Audio Ambience & FX Live Status Pulse */}
          <button
            onClick={() => {
              sound.resume();
              sound.startAmbience();
              sound.play('switch');
            }}
            title="Ambient BGM & FX Active [Click to trigger soundscape]"
            className="hidden sm:flex items-center gap-1.5 border border-[#2a2a2a] bg-[#121212] px-2 py-1 text-[10px] uppercase font-mono text-[#8e8e8e] hover:text-[#d4ff00] hover:border-[#d4ff00] transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 bg-[#d4ff00] animate-pulse"></span>
            <span>BGM ACTIVE</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
