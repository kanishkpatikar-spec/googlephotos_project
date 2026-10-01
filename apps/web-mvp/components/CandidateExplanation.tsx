"use client";
import React, { useState } from 'react';

interface Props {
  matchReasons: string[];
  conflictReasons: string[];
  confidence: "Strong" | "Good" | "Possible" | "Weak" | string;
}

export function CandidateExplanation({ matchReasons, conflictReasons, confidence }: Props) {
  const [expanded, setExpanded] = useState(false);

  let confidenceColor = "text-primary bg-black/70 border-primary/30";
  if (confidence === "Good") confidenceColor = "text-[#ffba40] bg-black/70 border-[#ffba40]/30";
  if (confidence === "Possible" || confidence === "Poor") confidenceColor = "text-error bg-black/70 border-error/30";
  if (confidence === "Weak" || confidence === "Bad") confidenceColor = "text-error bg-red-950/70 border-red-500/50";

  return (
    <div className="absolute top-2 left-2 right-2 z-10 flex flex-col gap-1 pointer-events-auto">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
        className={`px-2.5 py-1 rounded-lg border backdrop-blur-md shadow-lg text-[10px] font-bold tracking-widest uppercase flex items-center justify-between w-full transition-colors ${confidenceColor}`}
      >
        <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
            {confidence} Match
        </span>
        <span className="material-symbols-outlined text-[14px]">
            {expanded ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {expanded && (
        <div className="p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
          
          {matchReasons.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase text-white/50 mb-1 block">Matched Details</span>
              <ul className="flex flex-col gap-1">
                {matchReasons.map((r, i) => (
                  <li key={i} className="text-xs text-green-400 flex items-start gap-1">
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {conflictReasons.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase text-white/50 mb-1 block">Conflicts</span>
              <ul className="flex flex-col gap-1">
                {conflictReasons.map((r, i) => (
                  <li key={i} className="text-xs text-rose-400 flex items-start gap-1">
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
