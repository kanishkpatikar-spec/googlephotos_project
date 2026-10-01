"use client";
import React, { useState } from 'react';

const TESTS = [
    { name: "1. Beach", payload: { query: "beach" } },
    { name: "2. Medicine", payload: { query: "medicine" } },
    { name: "3. Restaurant at night", payload: { query: "restaurant at night" } },
    { name: "4. Dog outside", payload: { query: "dog outside" } },
    { name: "5. Documents", payload: { query: "documents" } },
    { name: "6. Red car", payload: { query: "red car" } },
    { name: "7. Food with friends", payload: { query: "food with friends" } },
    { name: "8. Not indoors", payload: { query: "", notConstraints: ["indoors", "indoor", "inside"] } },
    { name: "9. Restaurant but not outdoors", payload: { query: "restaurant", notConstraints: ["outdoors", "outdoor", "outside"] } },
    { name: "10. Memory Interval (Beach -> Dinner)", payload: { query: "", before: "beach", after: "dinner" } },
    { name: "11. Memory Interval (Airport -> Hotel)", payload: { query: "", before: "airport", after: "hotel" } },
    { name: "12. Combined Ultimate", payload: { query: "cafe", before: "beach", after: "hotel", notConstraints: ["outdoors", "daytime"] } }
];

type TestResult = {
    error?: string;
    results?: Record<string, unknown>[];
    boundaries?: { before?: string; after?: string };
};

export default function QATests() {
    const [results, setResults] = useState<Record<number, TestResult>>({});
    const [running, setRunning] = useState(false);

    const runTests = async () => {
        setRunning(true);
        const newRes: Record<number, TestResult> = {};
        for (let i = 0; i < TESTS.length; i++) {
            try {
                const r = await fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(TESTS[i].payload)
                });
                const data = await r.json();
                newRes[i] = data;
            } catch (e) {
                newRes[i] = { error: String(e) };
            }
        }
        setResults(newRes);
        setRunning(false);
    };

    if (process.env.NODE_ENV !== 'development') {
        return <div className="p-8 text-white">403 Forbidden. Developer mode only.</div>;
    }

    return (
        <div className="min-h-screen bg-[#090710] p-8 text-white font-mono text-sm">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h1 className="text-2xl font-bold">Search Test Suite (Phase 38)</h1>
                <button 
                    onClick={runTests} 
                    disabled={running}
                    className="px-6 py-2 bg-primary text-white font-bold rounded hover:bg-primary-container disabled:opacity-50"
                >
                    {running ? "Running..." : "Run All Tests"}
                </button>
            </div>

            <div className="flex flex-col gap-8">
                {TESTS.map((test, idx) => {
                    const res = results[idx];
                    return (
                        <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                            <h2 className="text-lg font-bold text-tertiary mb-2">{test.name}</h2>
                            <div className="text-white/50 mb-4 bg-black/30 p-2 rounded">
                                {JSON.stringify(test.payload)}
                            </div>
                            
                            {!res ? (
                                <div className="text-white/30 italic">Not run yet</div>
                            ) : res.error ? (
                                <div className="text-red-500">{res.error as string}</div>
                            ) : (
                                <div>
                                    <div className="flex gap-4 mb-4 font-bold text-green-400">
                                        <span>Found: {res.results?.length || 0}</span>
                                        {res.boundaries?.before && <span>Before: {res.boundaries.before}</span>}
                                        {res.boundaries?.after && <span>After: {res.boundaries.after}</span>}
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                                        {res.results?.slice(0, 6).map((img: Record<string, unknown>) => (
                                            <div key={img.id as string} className="relative group overflow-hidden rounded bg-black">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={(img.filepath || img.imageUrl) as string} alt={(img.scene as Record<string, string>)?.primary || ''} className="w-full aspect-square object-cover opacity-80 group-hover:opacity-100" />
                                                <div className="absolute top-1 right-1 bg-black/80 px-2 rounded text-xs">
                                                    {(img.debugScore as number)?.toFixed(2)}
                                                </div>
                                                <div className="absolute bottom-0 w-full bg-black/80 p-1 text-[10px] truncate">
                                                    {(img.scene as Record<string, string>)?.primary || (img.sceneType as string)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
