import { useState, useEffect } from 'react';
import { ScreenId, Project } from './types.ts';
import { Header } from './components/Header.tsx';
import { HeroScreen } from './components/HeroScreen.tsx';
import { AlphabetDrumScreen } from './components/AlphabetDrumScreen.tsx';
import { SplitScreenShowcase } from './components/SplitScreenShowcase.tsx';
import { WorkArchiveScreen } from './components/WorkArchiveScreen.tsx';
import { ContactScreen } from './components/ContactScreen.tsx';
import { BrutalistTransition } from './components/BrutalistTransition.tsx';
import { CaseStudyModal } from './components/CaseStudyModal.tsx';
import { sound } from './utils/audio.ts';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('hero');
  const [nextScreen, setNextScreen] = useState<ScreenId | null>(null);
  const [transitionLabel, setTransitionLabel] = useState<string>('SYSTEM SHIFT');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scanlinesActive, setScanlinesActive] = useState<boolean>(false);

  // Track coordinates for viewport telemetry
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavigate = (screen: ScreenId, label: string) => {
    if (screen === currentScreen && !isTransitioning) return;
    setNextScreen(screen);
    setTransitionLabel(label);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    if (nextScreen) {
      setCurrentScreen(nextScreen);
      setNextScreen(null);
    }
    setIsTransitioning(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex flex-col justify-between relative selection:bg-[#d4ff00] selection:text-[#0a0a0a]">
      {/* Scanline CRT overlay */}
      {scanlinesActive && (
        <div className="fixed inset-0 z-30 scanlines-overlay pointer-events-none" />
      )}

      {/* Viewport Frame Edge Coordinates (from Kinetic Neo-Brutalist Architecture spec) */}
      <div className="fixed top-1 left-2 z-50 pointer-events-none hidden xl:block font-mono text-[9px] text-[#8e8e8e] tracking-widest uppercase">
        LOC [X: {String(mouseCoords.x).padStart(4, '0')}, Y: {String(mouseCoords.y).padStart(4, '0')}]
      </div>
      <div className="fixed top-1 right-2 z-50 pointer-events-auto hidden xl:flex items-center gap-2 font-mono text-[9px] text-[#8e8e8e]">
        <button
          onClick={() => {
            sound.play('click');
            setScanlinesActive(!scanlinesActive);
          }}
          className="border border-[#2a2a2a] hover:border-[#d4ff00] px-1.5 py-0.5 text-[#8e8e8e] hover:text-[#d4ff00] uppercase transition-colors"
        >
          CRT SCANLINES: {scanlinesActive ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Header */}
      <Header currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Brutalist Jitter Transition Overlay */}
      <BrutalistTransition
        isTransitioning={isTransitioning}
        destinationLabel={transitionLabel}
        onTransitionComplete={handleTransitionComplete}
      />

      {/* Main Screen Content */}
      <main className="flex-1 pb-16">
        {currentScreen === 'hero' && (
          <HeroScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'alphabet' && (
          <AlphabetDrumScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'split' && (
          <SplitScreenShowcase
            onNavigate={handleNavigate}
            onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
          />
        )}

        {currentScreen === 'work' && (
          <WorkArchiveScreen
            onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
          />
        )}


        {currentScreen === 'contact' && (
          <ContactScreen />
        )}
      </main>

      {/* Infinite Brutalist Marquee Tape */}
      <div className="border-t border-[#2a2a2a] bg-[#0e0e0e] py-2 overflow-hidden select-none">
        <div className="animate-marquee font-syne font-black text-xs text-[#8e8e8e] uppercase tracking-wider flex items-center gap-8">
          <span>ARVIND // CSE SYSTEMS ARCHITECT CHENNAI</span>
          <span className="text-[#d4ff00]">■</span>
          <span>DISTRIBUTED CONSENSUS KERNEL</span>
          <span className="text-[#ff007f]">■</span>
          <span>GPU SPATIAL RADIANCE PIPELINE</span>
          <span className="text-[#00f0ff]">■</span>
          <span>SSA JIT COMPILER RUNTIME</span>
          <span className="text-[#d4ff00]">■</span>
          <span>RAW CONTRAST & ZERO ROUNDED RADIUS</span>
          <span className="text-[#ff007f]">■</span>
          <span>EXPOSING THE STRUCTURAL MATRIX</span>
          <span className="text-[#00f0ff]">■</span>
          <span>ARVIND // CSE SYSTEMS ARCHITECT CHENNAI</span>
          <span className="text-[#d4ff00]">■</span>
          <span>DISTRIBUTED CONSENSUS KERNEL</span>
          <span className="text-[#ff007f]">■</span>
          <span>GPU SPATIAL RADIANCE PIPELINE</span>
          <span className="text-[#00f0ff]">■</span>
          <span>SSA JIT COMPILER RUNTIME</span>
          <span className="text-[#d4ff00]">■</span>
          <span>RAW CONTRAST & ZERO ROUNDED RADIUS</span>
          <span className="text-[#ff007f]">■</span>
        </div>
      </div>

      {/* Case Study Fullscreen Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  );
}
