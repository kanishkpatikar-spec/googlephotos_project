"use client";

import { useState, useTransition } from "react";
import { runPipelineAction } from "@/app/actions/pipeline";

const progressMessages = [
  "Extracting conversation data...",
  "Running NLP intent analysis...",
  "Clustering failure modes...",
  "Generating outcome embeddings...",
  "Finalizing dashboard...",
];

export function RunPipelineButton() {
  const [isPending, startTransition] = useTransition();
  const [messageIndex, setMessageIndex] = useState(0);

  const handleRunPipeline = () => {
    setMessageIndex(0);
    
    // Cycle messages every 600ms
    const interval = setInterval(() => {
      setMessageIndex(prev => {
        if (prev >= progressMessages.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    startTransition(async () => {
      try {
        await runPipelineAction();
      } catch (err) {
        console.error(err);
      } finally {
        clearInterval(interval);
        setMessageIndex(0);
      }
    });
  };

  if (isPending) {
    return (
      <div className="relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full overflow-hidden shadow-[0_0_20px_rgba(209,216,31,0.2)]">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-50 animate-pulse"></div>
        <div className="absolute inset-[1px] bg-black/80 backdrop-blur-3xl rounded-full"></div>
        
        <span className="material-symbols-outlined text-primary animate-spin text-[20px] relative z-10 drop-shadow-[0_0_8px_rgba(209,216,31,0.8)]">
          autorenew
        </span>
        <span className="text-sm font-title-sm text-primary relative z-10 font-bold tracking-wide animate-pulse drop-shadow-md">
          {progressMessages[messageIndex]}
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={handleRunPipeline}
      className="relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full group cursor-pointer overflow-hidden transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(209,216,31,0.3)]"
    >
      {/* Animated glowing border background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"></div>
      
      {/* Inner dark container to create the 1px border effect */}
      <div className="absolute inset-[1px] bg-[#0a0a0a]/95 backdrop-blur-3xl rounded-full transition-all duration-500 group-hover:bg-[#0a0a0a]/80"></div>
      
      {/* Subtle glow behind text */}
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full blur-xl"></div>

      <span className="material-symbols-outlined text-primary text-[20px] relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(209,216,31,0.8)]">
        auto_awesome
      </span>
      <span className="text-sm font-title-sm text-white relative z-10 font-bold tracking-wide group-hover:text-primary transition-colors duration-300 drop-shadow-md">
        RUN ANALYSIS PIPELINE
      </span>
    </button>
  );
}
