"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';

function CategoryCarousel({ category, items, color }: { category: string, items: any[], color: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length, nextSlide, currentIndex]);

  if (!items || items.length === 0) return null;

  const item = items[currentIndex];

  const styles = {
    cyan: { 
      border: "border-white/5 border-l-cyan-400/50", 
      shadow: "shadow-[inset_15px_0_30px_-15px_rgba(34,211,238,0.15),0_15px_30px_-15px_rgba(34,211,238,0.2)]",
      hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(34,211,238,0.25),0_25px_40px_-20px_rgba(34,211,238,0.4)] border-l-cyan-400"
    },
    emerald: { 
      border: "border-white/5 border-l-emerald-400/50", 
      shadow: "shadow-[inset_15px_0_30px_-15px_rgba(52,211,153,0.15),0_15px_30px_-15px_rgba(52,211,153,0.2)]",
      hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(52,211,153,0.25),0_25px_40px_-20px_rgba(52,211,153,0.4)] border-l-emerald-400"
    },
    fuchsia: { 
      border: "border-white/5 border-l-fuchsia-400/50", 
      shadow: "shadow-[inset_15px_0_30px_-15px_rgba(232,121,249,0.15),0_15px_30px_-15px_rgba(232,121,249,0.2)]",
      hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(232,121,249,0.25),0_25px_40px_-20px_rgba(232,121,249,0.4)] border-l-fuchsia-400"
    },
    amber: { 
      border: "border-white/5 border-l-amber-400/50", 
      shadow: "shadow-[inset_15px_0_30px_-15px_rgba(251,191,36,0.15),0_15px_30px_-15px_rgba(251,191,36,0.2)]",
      hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(251,191,36,0.25),0_25px_40px_-20px_rgba(251,191,36,0.4)] border-l-amber-400"
    },
    rose: { 
      border: "border-white/5 border-l-rose-400/50", 
      shadow: "shadow-[inset_15px_0_30px_-15px_rgba(251,113,133,0.15),0_15px_30px_-15px_rgba(251,113,133,0.2)]",
      hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(251,113,133,0.25),0_25px_40px_-20px_rgba(251,113,133,0.4)] border-l-rose-400"
    },
    blue: { 
      border: "border-white/5 border-l-blue-400/50", 
      shadow: "shadow-[inset_15px_0_30px_-15px_rgba(96,165,250,0.15),0_15px_30px_-15px_rgba(96,165,250,0.2)]",
      hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(96,165,250,0.25),0_25px_40px_-20px_rgba(96,165,250,0.4)] border-l-blue-400"
    },
    violet: { 
      border: "border-white/5 border-l-violet-400/50", 
      shadow: "shadow-[inset_15px_0_30px_-15px_rgba(167,139,250,0.15),0_15px_30px_-15px_rgba(167,139,250,0.2)]",
      hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(167,139,250,0.25),0_25px_40px_-20px_rgba(167,139,250,0.4)] border-l-violet-400"
    }
  }[color as "cyan" | "emerald" | "fuchsia" | "amber" | "rose" | "blue" | "violet"];

  return (
    <div className={`mb-8 relative bg-black/40 backdrop-blur-2xl rounded-2xl border-y border-r border-l-2 ${styles.border} ${styles.shadow} ${styles.hover} overflow-hidden group transition-all duration-500`}>
      {/* Header */}
      <div className="px-5 py-3 flex justify-between items-center border-b border-white/5 bg-white/[0.02]">
        <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface">{category}</h3>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-on-surface-variant font-mono">{currentIndex + 1} / {items.length}</span>
          {items.length > 1 && (
            <div className="flex gap-1">
              <button onClick={prevSlide} className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface-variant transition-colors border border-white/10">
                <span className="material-symbols-outlined text-[14px]">chevron_left</span>
              </button>
              <button onClick={nextSlide} className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface-variant transition-colors border border-white/10">
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative h-[200px] overflow-hidden">
        <div 
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, idx) => (
            <div key={item.id || idx} className="w-full shrink-0 px-5 py-5 h-full overflow-y-auto flex flex-col">
              <blockquote className="border-l-2 border-primary/40 pl-4 italic text-on-surface font-body-md text-[17px] leading-relaxed">
                "{item.originalText}"
              </blockquote>
              
              <div className="grid grid-cols-2 gap-6 text-sm mt-auto pt-6">
                <div>
                  <strong className="block text-on-surface-variant text-[11px] font-semibold tracking-wider uppercase mb-3">Remembered Clues</strong>
                  <div className="flex flex-wrap gap-2">
                    {item.clues.map((c: any) => (
                      <span key={c.id} className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs capitalize">{c.clueType}</span>
                    ))}
                    {item.clues.length === 0 && <span className="text-on-surface-variant/50 italic text-xs">None recorded</span>}
                  </div>
                </div>
                <div>
                  <strong className="block text-on-surface-variant text-[11px] font-semibold tracking-wider uppercase mb-3">Forgotten Info</strong>
                  <div className="flex flex-wrap gap-2">
                    {item.forgot.map((f: any) => (
                      <span key={f.id} className="bg-error/10 text-error px-3 py-1.5 rounded-lg text-xs">{f.informationType}</span>
                    ))}
                    {item.forgot.length === 0 && <span className="text-on-surface-variant/50 italic text-xs">None recorded</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EvidenceBrowser({ data }: { data: any[] }) {
  // Group data by failure type
  const groupedData = useMemo(() => {
    const groups: Record<string, any[]> = {};
    data.forEach(item => {
      const type = item.fails && item.fails.length > 0 ? item.fails[0].type : 'Uncategorized';
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(item);
    });
    return groups;
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col bg-surface md:border-r border-surface-container/30">
      <div className="px-6 md:px-10 py-6 md:py-8 bg-surface/80 backdrop-blur-xl flex flex-col justify-center border-b border-white/5 relative overflow-hidden shrink-0 z-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex items-start gap-3 md:gap-5">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-primary text-[20px] md:text-[24px]">dataset</span>
          </div>
          <div className="pt-0 md:pt-1.5">
            <h2 className="font-headline-sm text-base md:text-xl text-on-surface tracking-tight leading-none mb-1 md:mb-2">Categorized Evidence Logs</h2>
            <p className="text-xs md:text-sm text-on-surface-variant leading-tight">Reviewing {data.length} documented retrieval failure sessions across {Object.keys(groupedData).length} categories</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 md:px-10 py-4 md:py-8">
        {data.length === 0 ? (
          <div className="text-center text-on-surface-variant p-8 italic">
            No evidence available.
          </div>
        ) : (
          Object.entries(groupedData).map(([category, items], index) => {
            const COLORS = ["cyan", "emerald", "fuchsia", "amber", "rose", "blue", "violet"];
            const color = COLORS[index % COLORS.length];
            return <CategoryCarousel key={category} category={category} items={items} color={color} />;
          })
        )}
      </div>
    </div>
  );
}
