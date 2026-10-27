import { Project } from '../types.ts';
import { PROJECTS } from '../data/projects.ts';
import { sound } from '../utils/audio.ts';

interface WorkArchiveScreenProps {
  onOpenCaseStudy: (project: Project) => void;
}

export function WorkArchiveScreen({ onOpenCaseStudy }: WorkArchiveScreenProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 select-none">
      {/* Header Banner */}
      <div className="border-b-2 border-[#2a2a2a] pb-6 mb-8">
        <div>
          <div className="font-mono text-xs text-[#d4ff00] tracking-widest uppercase mb-2">
            [COMPUTER SCIENCE ENGINEERING // CODEBASE REPOSITORIES]
          </div>
          <h1 className="font-syne font-black text-4xl sm:text-6xl text-[#f5f5f5] uppercase tracking-tighter">
            Selected Works
          </h1>
          <p className="mt-2 font-mono text-xs text-[#8e8e8e]">
            Smart Campus Platforms · Godot 4 Combat Engines · Agentic Video AI · Multimodal LLMs
          </p>
        </div>
      </div>

      {/* WORKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              sound.play('click');
              onOpenCaseStudy(project);
            }}
            className="brutal-card cursor-pointer group flex flex-col justify-between"
          >
            {/* Top metadata strip */}
            <div className="p-4 border-b border-[#2a2a2a] flex items-center justify-between font-mono text-xs text-[#8e8e8e]">
              <span className="text-[#d4ff00] font-bold">[{project.index}/04]</span>
              <span className="uppercase text-[#f5f5f5]">{project.client}</span>
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.play('switch');
                    }}
                    className="border border-[#d4ff00] bg-[#d4ff00] text-[#0a0a0a] hover:bg-transparent hover:text-[#d4ff00] px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Visit Site</span>
                    <span>↗</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.play('switch');
                    }}
                    className="border border-[#d4ff00] bg-[#d4ff00] text-[#0a0a0a] hover:bg-transparent hover:text-[#d4ff00] px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Project</span>
                    <span>↗</span>
                  </a>
                )}
                <span>{project.year}</span>
              </div>
            </div>

            {/* High-contrast image container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a] border-b border-[#2a2a2a]">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#0a0a0a] border border-[#f5f5f5] px-2 py-0.5 font-mono text-[10px] text-[#f5f5f5] uppercase">
                {project.discipline}
              </div>

              {/* Tech Stack Chips in top right */}
              {project.stack && (
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  {project.stack.slice(0, 3).map((st, i) => (
                    <span
                      key={i}
                      className="bg-[#0a0a0a]/90 border border-[#2a2a2a] px-1.5 py-0.5 font-mono text-[9px] text-[#d4ff00]"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom content */}
            <div className="p-6">
              <h3 className="font-syne font-black text-2xl text-[#f5f5f5] group-hover:text-[#d4ff00] uppercase transition-colors tracking-tight">
                {project.title}
              </h3>
              <p className="mt-2 font-mono text-xs text-[#8e8e8e] line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Benchmark Metrics Strip */}
              {project.metrics && (
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#1c1c1c] pt-3 font-mono text-[10px]">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] p-1.5 border border-[#2a2a2a]">
                      <div className="text-[#8e8e8e] uppercase">{m.label}</div>
                      <div className="font-bold text-[#f5f5f5] text-xs mt-0.5 tabular-nums">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 pt-3 border-t border-[#1c1c1c] flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="text-[#c5c9ac]">{project.subtitle}</span>
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.play('switch');
                      }}
                      className="px-2.5 py-1 bg-[#d4ff00] text-[#0a0a0a] hover:bg-[#f5f5f5] font-bold text-[11px] uppercase transition-colors flex items-center gap-1 shadow-[2px_2px_0px_#f5f5f5] cursor-pointer"
                    >
                      <span>Visit Site</span>
                      <span>↗</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.play('switch');
                      }}
                      className="px-2.5 py-1 bg-[#d4ff00] text-[#0a0a0a] hover:bg-[#f5f5f5] font-bold text-[11px] uppercase transition-colors flex items-center gap-1 shadow-[2px_2px_0px_#f5f5f5] cursor-pointer"
                    >
                      <span>View Project</span>
                      <span>↗</span>
                    </a>
                  )}
                  <span className="text-[#d4ff00] group-hover:translate-x-1 transition-transform">
                    Inspect Architecture ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
