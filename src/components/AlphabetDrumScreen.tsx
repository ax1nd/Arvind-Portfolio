import { useEffect, useRef, useState } from 'react';
import { ScreenId } from '../types.ts';
import { sound } from '../utils/audio.ts';

interface AlphabetDrumScreenProps {
  onNavigate: (screen: ScreenId, label: string) => void;
}

interface LetterParticle {
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  size: number;
  color: string;
}

export function AlphabetDrumScreen({ onNavigate }: AlphabetDrumScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isArcMode, setIsArcMode] = useState(false);
  const [gravityDirection, setGravityDirection] = useState<1 | -1>(1);
  const [particleCount, setParticleCount] = useState(38);
  const particlesRef = useRef<LetterParticle[]>([]);
  const isMouseDownRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Initialize particles
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789§¶#&@%!?';
    const colors = ['#f5f5f5', '#f5f5f5', '#f5f5f5', '#d4ff00', '#ff007f'];
    const particles: LetterParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        char,
        x: (Math.random() - 0.5) * 160,
        y: Math.random() * 80 + 40,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.1,
        size: Math.floor(Math.random() * 12) + 22,
        color
      });
    }
    particlesRef.current = particles;
  }, [particleCount]);

  // Canvas render & physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastBounceTime = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.42;
      const centerX = width / 2;
      const centerY = isArcMode ? height * 0.85 : height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw the circular boundary drum (video 00:11)
      ctx.beginPath();
      if (isArcMode) {
        // Arc mode from video 00:18
        ctx.arc(centerX, centerY, radius * 1.2, Math.PI, 0, false);
      } else {
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      }
      ctx.strokeStyle = '#f5f5f5';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Physics constants
      const gravity = 0.28 * gravityDirection;
      const friction = 0.985;
      const bounce = 0.72;

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply forces
        p.vy += gravity;
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.vAngle;

        // Mouse interaction: push letters away when hovered/dragged
        const dxMouse = (p.x + centerX) - mousePosRef.current.x;
        const dyMouse = (p.y + centerY) - mousePosRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 90 && distMouse > 0) {
          const force = (90 - distMouse) * 0.08;
          p.vx += (dxMouse / distMouse) * force;
          p.vy += (dyMouse / distMouse) * force;
          p.vAngle += (Math.random() - 0.5) * 0.2;
        }

        // Circular boundary collision
        const distFromCenter = Math.sqrt(p.x * p.x + p.y * p.y);
        const maxDist = radius - p.size * 0.6;

        if (distFromCenter > maxDist) {
          // Normal vector
          const nx = p.x / distFromCenter;
          const ny = p.y / distFromCenter;

          // Position clamping
          p.x = nx * maxDist;
          p.y = ny * maxDist;

          // Reflect velocity along normal
          const dot = p.vx * nx + p.vy * ny;
          p.vx = (p.vx - 2 * dot * nx) * bounce;
          p.vy = (p.vy - 2 * dot * ny) * bounce;
          p.vAngle = -p.vAngle * 0.8 + (Math.random() - 0.5) * 0.05;

          // Sound effect throttled
          const now = Date.now();
          if (now - lastBounceTime > 90 && (Math.abs(p.vx) > 3 || Math.abs(p.vy) > 3)) {
            sound.play('bounce');
            lastBounceTime = now;
          }
        }

        // Draw letter
        ctx.save();
        ctx.translate(centerX + p.x, centerY + p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.font = `800 ${p.size}px 'Syne', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isArcMode, gravityDirection]);

  // Handle shake / impulse
  const handleShake = () => {
    sound.play('heavy');
    particlesRef.current.forEach((p) => {
      p.vx += (Math.random() - 0.5) * 24;
      p.vy -= Math.random() * 18 + 6;
      p.vAngle += (Math.random() - 0.5) * 0.4;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const addMoreLetters = () => {
    sound.play('pop');
    setParticleCount((prev) => Math.min(prev + 12, 80));
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 py-8 select-none">
      {/* Top Telemetry & Controls */}
      <div className="z-10 mb-4 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
        <span className="text-[#8e8e8e] uppercase tracking-wider">
          EXPERIMENT 01 // KINETIC LETTER DRUM
        </span>
        <span className="text-[#2a2a2a]">|</span>
        <button
          onClick={handleShake}
          className="border border-[#2a2a2a] hover:border-[#d4ff00] bg-[#121212] px-3 py-1 text-[#f5f5f5] hover:text-[#d4ff00] uppercase transition-colors cursor-pointer"
        >
          Shake Drum
        </button>
        <button
          onClick={() => {
            sound.play('switch');
            setGravityDirection((prev) => (prev === 1 ? -1 : 1));
          }}
          className="border border-[#2a2a2a] hover:border-[#ff007f] bg-[#121212] px-3 py-1 text-[#f5f5f5] hover:text-[#ff007f] uppercase transition-colors cursor-pointer"
        >
          Gravity: {gravityDirection === 1 ? 'DOWN' : 'INVERTED'}
        </button>
        <button
          onClick={addMoreLetters}
          className="border border-[#2a2a2a] hover:border-[#00f0ff] bg-[#121212] px-3 py-1 text-[#f5f5f5] hover:text-[#00f0ff] uppercase transition-colors cursor-pointer"
        >
          + Add Glyphs ({particleCount})
        </button>
        <button
          onClick={() => {
            sound.play('glitch');
            setIsArcMode(!isArcMode);
          }}
          className="border border-[#2a2a2a] hover:border-[#f5f5f5] bg-[#121212] px-3 py-1 text-[#8e8e8e] hover:text-[#f5f5f5] uppercase transition-colors cursor-pointer"
        >
          {isArcMode ? 'Reset Drum' : 'Collapse to Arc (00:18)'}
        </button>
      </div>

      {/* Physics Canvas */}
      <div className="relative w-full max-w-[560px] aspect-square flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={560}
          height={560}
          onMouseMove={handleMouseMove}
          onMouseDown={() => {
            isMouseDownRef.current = true;
            handleShake();
          }}
          onMouseUp={() => {
            isMouseDownRef.current = false;
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          title="Stir with mouse or click to shake letters"
        />

        {/* Center arrow icon button */}
        <button
          onClick={() => onNavigate('split', 'ABOUT ME')}
          className="absolute z-20 w-12 h-12 bg-[#0a0a0a] hover:bg-[#d4ff00] text-[#f5f5f5] hover:text-[#0a0a0a] border-2 border-[#f5f5f5] hover:border-[#d4ff00] flex items-center justify-center font-syne font-black text-xl transition-all cursor-pointer shadow-[4px_4px_0px_#0a0a0a]"
          title="Proceed to About Me Screen"
        >
          ↗
        </button>
      </div>

      {/* Bottom descriptor */}
      <div className="mt-4 text-center font-mono text-xs text-[#8e8e8e] tracking-widest uppercase">
        [Move cursor across circle to displace letter particles · Click center ↗ to advance]
      </div>
    </div>
  );
}
