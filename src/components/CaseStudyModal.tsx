import { useEffect } from 'react';
import { Project } from '../types.ts';
import { sound } from '../utils/audio.ts';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.play('click');
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]/95 p-4 sm:p-8 flex items-center justify-center select-none">
      <div className="relative w-full max-w-5xl bg-[#121212] border-4 border-[#f5f5f5] shadow-[8px_8px_0px_#d4ff00] my-8 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="border-b-2 border-[#2a2a2a] bg-[#1c1c1c] p-4 flex items-center justify-between font-mono text-xs text-[#8e8e8e]">
          <div className="flex items-center gap-3">
            <span className="text-[#d4ff00] font-bold">[{project.index}/04]</span>
            <span className="text-[#f5f5f5] uppercase font-bold">{project.title}</span>
            <span>·</span>
            <span>{project.client}</span>
          </div>

          <button
            onClick={() => {
              sound.play('click');
              onClose();
            }}
            className="border border-[#2a2a2a] hover:border-[#ff007f] hover:bg-[#ff007f] hover:text-[#0a0a0a] text-[#f5f5f5] px-3 py-1 font-mono uppercase text-xs transition-colors cursor-pointer"
          >
            Close [ESC ✕]
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Header Title */}
          <div>
            <div className="font-mono text-xs text-[#d4ff00] uppercase tracking-widest mb-2">
              DISCIPLINE: {project.discipline} · {project.year}
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl text-[#f5f5f5] uppercase tracking-tight">
              {project.title}
            </h2>
            <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#c5c9ac]">
              "{project.subtitle}"
            </p>

            {/* Tech Stack Chips */}
            {project.stack && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item, idx) => (
                  <span
                    key={idx}
                    className="border border-[#2a2a2a] bg-[#0a0a0a] px-2.5 py-1 font-mono text-xs text-[#d4ff00]"
                  >
                    #{item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Primary High-Res Showcase Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0a] border-2 border-[#2a2a2a]">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Metrics Strip */}
          {project.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-2 border-[#2a2a2a] bg-[#0e0e0e] p-4">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 border border-[#1c1c1c]">
                  <div className="font-mono text-[10px] text-[#8e8e8e] uppercase">
                    {m.label}
                  </div>
                  <div className="font-syne font-bold text-xl text-[#d4ff00] mt-1 tabular-nums">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Architecture Invariants & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-4 font-mono text-xs text-[#f5f5f5] leading-relaxed">
              <h4 className="font-syne font-black text-lg uppercase text-[#d4ff00]">
                Architecture Directive & Invariants
              </h4>
              <p>{project.manifesto}</p>
              <p className="text-[#8e8e8e]">{project.description}</p>
            </div>

            <div className="md:col-span-5 border-2 border-[#2a2a2a] bg-[#0a0a0a] p-4">
              <h4 className="font-mono text-xs uppercase text-[#ff007f] font-bold mb-3">
                [SYSTEM MODULES & DELIVERABLES]
              </h4>
              <ul className="space-y-2 font-mono text-xs text-[#c5c9ac]">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#d4ff00]"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Secondary Visual if present */}
          {project.secondaryImage && (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0a] border-2 border-[#2a2a2a]">
              <img
                src={project.secondaryImage}
                alt={`${project.title} secondary`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="border-t-2 border-[#2a2a2a] bg-[#1c1c1c] p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-4">
            <span className="text-[#8e8e8e]">CODEBASE REPOSITORY // ARVIND CHENNAI</span>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.play('pop')}
                className="border border-[#2a2a2a] hover:border-[#d4ff00] bg-[#0a0a0a] px-3 py-1 text-[#d4ff00] hover:bg-[#d4ff00] hover:text-[#0a0a0a] uppercase transition-colors flex items-center gap-1.5"
              >
                <span>View Source on GitHub</span>
                <span>↗</span>
              </a>
            )}
          </div>
          <button
            onClick={() => {
              sound.play('click');
              onClose();
            }}
            className="brutal-btn-primary px-6 py-2 text-xs uppercase cursor-pointer"
          >
            Dismiss [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
