import React from 'react';

interface Props {
  before: string | null;
  after: string | null;
  resultCount: number;
}

export function MemoryTimeline({ before, after, resultCount }: Props) {
  if (!before && !after) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center w-full">
        
        {before && (
          <>
            <div className="flex flex-col items-center">
              <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-xl font-medium shadow-[0_0_15px_rgba(168,199,250,0.15)]">
                {before}
              </span>
              <span className="text-xs text-on-surface-variant mt-2 font-mono">BEFORE</span>
            </div>
            
            <div className="hidden md:flex flex-col items-center px-4">
               <span className="material-symbols-outlined text-white/30 text-[24px]">arrow_right_alt</span>
            </div>
            <div className="flex md:hidden flex-col items-center py-2">
               <span className="material-symbols-outlined text-white/30 text-[24px]">arrow_downward</span>
            </div>
          </>
        )}

        <div className="flex flex-col items-center">
          <span className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-semibold tracking-wide shadow-inner">
            POSSIBLE MEMORY
          </span>
          <span className="text-xs text-tertiary mt-2 font-mono">{resultCount} candidates found</span>
        </div>

        {after && (
          <>
            <div className="hidden md:flex flex-col items-center px-4">
               <span className="material-symbols-outlined text-white/30 text-[24px]">arrow_right_alt</span>
            </div>
            <div className="flex md:hidden flex-col items-center py-2">
               <span className="material-symbols-outlined text-white/30 text-[24px]">arrow_downward</span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="px-4 py-2 bg-secondary/20 text-secondary border border-secondary/30 rounded-xl font-medium shadow-[0_0_15px_rgba(204,250,168,0.15)]">
                {after}
              </span>
              <span className="text-xs text-on-surface-variant mt-2 font-mono">AFTER</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
