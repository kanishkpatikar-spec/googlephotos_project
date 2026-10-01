"use client";
import React, { useState } from 'react';

interface Props {
  constraints: string[];
  onChange: (constraints: string[]) => void;
}

export function NegativeConstraintInput({ constraints, onChange }: Props) {
  const [inputValue, setInputValue] = useState("");


  const suggestedExclusions = [
    "Not outdoors",
    "Not nighttime",
    "Not at hospital",
    "No other people",
    "Not a screenshot"
  ];

  const handleAdd = (value: string) => {
    if (value.trim() && !constraints.includes(value.trim())) {
      onChange([...constraints, value.trim()]);
    }
    setInputValue("");
  };

  const handleRemove = (value: string) => {
    onChange(constraints.filter(c => c !== value));
  };

  return (
    <div className="w-full mt-4">
      <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium mb-3">
        <span className="material-symbols-outlined text-[18px]">rule</span>
        Anything you&apos;re sure was NOT true?
      </div>

      <div className="p-4 bg-error/5 border border-error/10 rounded-xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {constraints.map(c => (
              <div key={c} className="flex items-center gap-1 bg-error/20 border border-error/30 text-error-container px-3 py-1 rounded-full text-sm">
                <span className="font-medium text-error">NOT:</span> {c}
                <button 
                  onClick={() => handleRemove(c)}
                  className="ml-1 rounded-full hover:bg-error/20 w-4 h-4 flex items-center justify-center transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd(inputValue)}
              placeholder="e.g., 'indoors', 'John was there'"
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-error/50"
            />
            <button 
              onClick={() => handleAdd(inputValue)}
              type="button"
              className="px-4 py-2 bg-error/20 text-error hover:bg-error/30 rounded-lg text-sm font-medium transition-colors"
            >
              + Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-on-surface-variant/60 w-full mb-1">Suggested exclusions:</span>
            {suggestedExclusions.filter(s => !constraints.includes(s)).map(s => (
              <button
                key={s}
                onClick={() => handleAdd(s)}
                type="button"
                className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-on-surface-variant transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
    </div>
  );
}
