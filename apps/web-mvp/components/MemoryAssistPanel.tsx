"use client";
import React, { useState } from 'react';
import { NegativeConstraintInput } from './NegativeConstraintInput';

interface Props {
  onSearch: (payload: { before: string; after: string; query: string; notConstraints: string[] }) => Promise<void>;
  isLoading: boolean;
}

export function MemoryAssistPanel({ onSearch, isLoading }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [before, setBefore] = useState("");
  const [target, setTarget] = useState("");
  const [after, setAfter] = useState("");
  const [notConstraints, setNotConstraints] = useState<string[]>([]);

  const handleSearch = async () => {
    await onSearch({ before, after, query: target, notConstraints });
    setIsExpanded(false);
  };

  const EXAMPLES = [
    { label: "Beach → Café → Dinner", before: "We were at the beach", target: "small café", after: "We went to dinner" },
    { label: "City walk → Buildings → Museum", before: "We were walking through the city", target: "buildings", after: "We visited a museum" },
    { label: "Doctor → Medicine → Home", before: "We visited the doctor", target: "medicine", after: "We went back home" },
    { label: "Airport → Ride → Hotel", before: "We arrived at the airport", target: "the ride to our hotel", after: "We checked into the hotel" },
    { label: "Class → Library → Coffee", before: "We were in class", target: "studying in the library", after: "We went for coffee" },
    { label: "Hiking → Viewpoint → Dinner", before: "We started hiking", target: "mountain viewpoint", after: "We went to dinner" },
  ];

  const applyExample = (ex: typeof EXAMPLES[0]) => {
      setBefore(ex.before);
      setTarget(ex.target);
      setAfter(ex.after);
      setNotConstraints([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <div className={`grid transition-all duration-500 ease-in-out ${!isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
        <div className="overflow-hidden flex justify-center w-full">
            <button 
              onClick={() => setIsExpanded(true)}
              className="group relative px-6 py-2.5 rounded-full font-medium tracking-wide transition-all duration-300 active:scale-95 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_24px_rgba(168,199,250,0.15)] mb-2"
              type="button"
            >
              {/* Glassmorphic Backing */}
              <div className="absolute inset-0 bg-surface-container-low/80 backdrop-blur-xl border border-white/10 rounded-full group-hover:bg-surface-container/90 transition-all duration-300"></div>
              
              {/* Subtle Glowing Border on Hover */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Content */}
              <div className="relative z-10 flex items-center gap-2.5 text-primary group-hover:text-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-[20px] group-hover:animate-pulse">psychology</span>
                <span className="text-[14px]">Help me remember</span>
              </div>
            </button>
        </div>
      </div>

      <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
        <div className="overflow-hidden rounded-[2rem]">
          <div className="relative bg-[#0a0a0f]/95 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/10 transform transition-transform duration-500">
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
             <div className="flex items-center gap-3">
                 <span className="material-symbols-outlined text-primary text-[28px]">psychology</span>
                 <div>
                    <h3 className="text-xl font-headline-sm text-white">Memory Reconstruction</h3>
                    <p className="text-sm text-on-surface-variant">Find photos by describing surrounding events</p>
                 </div>
             </div>
             <button onClick={() => setIsExpanded(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                 <span className="material-symbols-outlined text-[20px]">close</span>
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {/* Before */}
              <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-primary text-center">What happened before?</label>
                  <input 
                      type="text"
                      value={before}
                      onChange={(e) => setBefore(e.target.value)}
                      placeholder="e.g. We were at the beach"
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors shadow-inner w-full"
                  />
              </div>

              {/* Target */}
              <div className="flex flex-col gap-2 relative">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/90 text-center">What are you trying to find?</label>
                  <div className="relative w-full">
                      <div className="hidden md:block absolute top-1/2 -left-6 w-6 -translate-y-1/2 border-t-2 border-dashed border-white/20"></div>
                      <input 
                          type="text"
                          value={target}
                          onChange={(e) => setTarget(e.target.value)}
                          placeholder="e.g. Some small cafe"
                          className="bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/80 transition-colors shadow-[0_0_15px_rgba(168,199,250,0.1)] w-full relative z-10"
                      />
                      <div className="hidden md:block absolute top-1/2 -right-6 w-6 -translate-y-1/2 border-t-2 border-dashed border-white/20"></div>
                  </div>
              </div>

              {/* After */}
              <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-secondary text-center">What happened after?</label>
                  <input 
                      type="text"
                      value={after}
                      onChange={(e) => setAfter(e.target.value)}
                      placeholder="e.g. We went back to the hotel"
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-secondary/50 transition-colors shadow-inner w-full"
                  />
              </div>
          </div>

          <div className="mt-6 mb-2 relative z-10">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-3 block">Try an example sequence</label>
              <div className="flex flex-wrap gap-2">
                  {EXAMPLES.map((ex, i) => (
                      <button 
                          key={i} 
                          onClick={() => applyExample(ex)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-white/70 hover:text-white transition-colors"
                      >
                          {ex.label}
                      </button>
                  ))}
              </div>
          </div>

          <div className="relative z-10 border-t border-white/10 mt-6 pt-6">
             <NegativeConstraintInput constraints={notConstraints} onChange={setNotConstraints} />
          </div>

          <div className="mt-6 flex justify-between items-center relative z-10">
              <button 
                  onClick={() => { setBefore(''); setTarget(''); setAfter(''); setNotConstraints([]); }}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
              >
                  <span className="material-symbols-outlined text-[18px]">clear_all</span>
                  Clear Fields
              </button>
              <button 
                  onClick={handleSearch}
                  disabled={isLoading || (!before && !after && !target && notConstraints.length === 0)}
                  className="group relative px-8 py-3.5 rounded-2xl font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-95"
              >
                  {/* Glassmorphic Backing */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl group-hover:bg-white/10 group-active:bg-white/5 group-active:backdrop-blur-3xl transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"></div>
                  
                  {/* Subtle Glowing Border on Hover */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-3 text-white/90 group-hover:text-white transition-colors">
                      {isLoading ? (
                          <>
                              <span className="material-symbols-outlined animate-spin text-[20px] text-primary">sync</span>
                              <span className="text-[14px]">Reconstructing Timeline...</span>
                          </>
                      ) : (
                          <>
                              <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform duration-300">flare</span>
                              <span className="text-[14px]">Reconstruct Memory</span>
                          </>
                      )}
                  </div>
              </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
