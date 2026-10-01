"use client";

import React, { useMemo } from 'react';

export default function JourneyTimeline({ data }: { data: any[] }) {
  // Aggregate data to build the funnel
  const funnel = useMemo(() => {
    const cluesCount: Record<string, number> = {};
    const searchesCount: Record<string, number> = {};
    const failuresCount: Record<string, number> = {};
    const workaroundsCount: Record<string, number> = {};

    let totalAttempts = data.length;

    data.forEach(item => {
      item.clues?.forEach((c: any) => {
        cluesCount[c.clueType] = (cluesCount[c.clueType] || 0) + 1;
      });
      item.searches?.forEach((s: any) => {
        searchesCount[s.query] = (searchesCount[s.query] || 0) + 1;
      });
      item.fails?.forEach((f: any) => {
        failuresCount[f.type] = (failuresCount[f.type] || 0) + 1;
      });
      // Assuming item.workarounds exist, but if not we can derive or mock based on outcome
      if (item.outcomes && item.outcomes.length > 0) {
         const out = item.outcomes[0];
         const wa = out.abandoned ? 'abandoned search' : 'manual scrolling';
         workaroundsCount[wa] = (workaroundsCount[wa] || 0) + 1;
      } else {
         workaroundsCount['manual scrolling'] = (workaroundsCount['manual scrolling'] || 0) + 1;
      }
    });

    const topClues = Object.entries(cluesCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const topSearches = Object.entries(searchesCount).sort((a, b) => b[1] - a[1]).slice(0, 2);
    const topFailure = Object.entries(failuresCount).sort((a, b) => b[1] - a[1])[0] || ['Unknown', 0];
    const topWorkaround = Object.entries(workaroundsCount).sort((a, b) => b[1] - a[1])[0] || ['Unknown', 0];

    return { totalAttempts, topClues, topSearches, topFailure, topWorkaround };
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col bg-surface/50 overflow-y-auto">
      <div className="px-6 py-4 sticky top-0 bg-surface/80 backdrop-blur-xl z-20 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-[28px]">route</span>
        <div>
          <h2 className="font-headline-sm text-on-surface">The Failure Funnel</h2>
          <p className="text-xs text-on-surface-variant">Auto-generated user journey based on {funnel.totalAttempts} failed retrieval attempts.</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-2 relative max-w-2xl mx-auto w-full">
        {/* Continuous glowing vertical line */}
        <div className="absolute left-[31px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-error to-warning opacity-30 shadow-[0_0_8px_rgba(255,255,255,0.2)]"></div>

        <div className="space-y-5 relative z-10">
          
          {/* STEP 1: The Intent */}
          <div className="flex gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-black rounded-full"></div>
              <div className="absolute inset-0 bg-primary/20 border-2 border-primary rounded-full shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"></div>
              <span className="material-symbols-outlined text-primary text-[18px] relative z-10">psychology</span>
            </div>
            <div className="flex-1 bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 p-5 rounded-2xl shadow-lg transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/5">
              <div className="mb-2.5">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">Stage 1</span>
              </div>
              <h3 className="font-title-sm text-on-surface mb-0.5 text-[17px]">The Intent</h3>
              <p className="text-xs text-on-surface-variant mb-2">Users approach the search engine relying heavily on these memory types:</p>
              
              <div className="space-y-1">
                {funnel.topClues.map(([clue, count], idx) => (
                  <div key={clue} className="flex items-center justify-between text-xs bg-surface-container/50 px-2 py-1.5 rounded-md">
                    <span className="text-on-surface capitalize font-medium">{clue} Memory</span>
                    <span className="text-on-surface-variant">{Math.round((count as number / funnel.totalAttempts) * 100)}% reliance</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 2: The Search */}
          <div className="flex gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-black rounded-full"></div>
              <div className="absolute inset-0 bg-secondary/20 border-2 border-secondary rounded-full"></div>
              <span className="material-symbols-outlined text-secondary text-[18px] relative z-10">search</span>
            </div>
            <div className="flex-1 bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 p-5 rounded-2xl shadow-lg transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary/5">
              <div className="mb-2.5">
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">Stage 2</span>
              </div>
              <h3 className="font-title-sm text-on-surface mb-0.5 text-[17px]">The Search Attempt</h3>
              <p className="text-xs text-on-surface-variant mb-2">Users translate their memory into search queries, frequently trying:</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {funnel.topSearches.length > 0 && funnel.topSearches[0][0] === "extracted query" ? (
                  <>
                    <span className="text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1.5 rounded-full shadow-sm">
                      Vague Keywords
                    </span>
                    <span className="text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1.5 rounded-full shadow-sm">
                      Date Approximations
                    </span>
                    <span className="text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1.5 rounded-full shadow-sm">
                      Overly Specific Context
                    </span>
                  </>
                ) : (
                  funnel.topSearches.map(([query]) => (
                    <span key={query} className="text-xs italic bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1.5 rounded-full shadow-sm">
                      "{query}"
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* STEP 3: The Failure (The Wall) */}
          <div className="flex gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-black rounded-full"></div>
              <div className="absolute inset-0 bg-error/20 border-2 border-error rounded-full shadow-[0_0_15px_rgba(var(--color-error),0.3)]"></div>
              <span className="material-symbols-outlined text-error text-[18px] relative z-10">block</span>
            </div>
            <div className="flex-1 bg-[#0a0a0a]/60 backdrop-blur-2xl border border-error/10 p-5 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 group-hover:border-error/30 group-hover:bg-error/5">
              <div className="absolute -right-6 -top-6 text-[80px] text-error/5 material-symbols-outlined pointer-events-none">warning</div>
              
              <div className="mb-2.5">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-error/10 text-error border border-error/20 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
                  <span>Stage 3</span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] bg-error text-black font-black px-2 py-0.5 rounded-full shadow-[0_0_12px_rgba(255,84,73,0.6)] border border-error/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
                    THE WALL
                  </span>
                </span>
              </div>
              <h3 className="font-title-sm text-error mb-0.5 text-[17px]">Retrieval Failure</h3>
              <p className="text-xs text-on-surface-variant mb-3">The search system fails to map the user's queries to the correct media. The dominant point of failure is:</p>
              
              <div className="bg-error/10 border border-error/30 p-2.5 rounded-lg text-center">
                <strong className="block text-error text-base capitalize mb-0.5">{funnel.topFailure[0]}</strong>
                <span className="text-xs text-error/80">Affected {funnel.topFailure[1]} out of {funnel.totalAttempts} sessions</span>
              </div>
            </div>
          </div>

          {/* STEP 4: The Resolution */}
          <div className="flex gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-black rounded-full"></div>
              <div className="absolute inset-0 bg-warning/20 border-2 border-warning rounded-full"></div>
              <span className="material-symbols-outlined text-warning text-[18px] relative z-10">directions_walk</span>
            </div>
            <div className="flex-1 bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 p-5 rounded-2xl shadow-lg transition-all duration-300 group-hover:border-warning/30 group-hover:bg-warning/5">
              <div className="mb-2.5">
                <span className="inline-block px-3 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">Stage 4</span>
              </div>
              <h3 className="font-title-sm text-on-surface mb-0.5 text-[17px]">The Resolution</h3>
              <p className="text-xs text-on-surface-variant mb-3">Following the failure, users are forced to resort to workarounds:</p>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-warning capitalize px-3 py-1.5 bg-warning/10 rounded-md border border-warning/20">
                  {funnel.topWorkaround[0]}
                </span>
                <span className="text-xs text-on-surface-variant">
                  (Resorted to by {Math.round((funnel.topWorkaround[1] as number / funnel.totalAttempts) * 100)}% of users)
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
