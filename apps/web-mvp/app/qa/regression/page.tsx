"use client";
import React, { useState, useCallback } from 'react';

interface TestCase {
    name: string;
    before: string;
    target: string;
    after: string;
    notConstraints: string[];
    expectedEpisode?: string;
    expectedEvent?: string;
}

interface TestResult {
    test: TestCase;
    status: 'pending' | 'running' | 'pass' | 'fail' | 'error';
    results: Record<string, unknown>[];
    boundaries: { before: string | null; after: string | null } | null;
    topEventId: string | null;
    topEpisodeId: string | null;
    topScore: number | null;
    message: string;
    duration: number;
}

const OFFICIAL_DEMOS: TestCase[] = [
    { name: "DEMO 1: Beach → Café → Dinner", before: "We were at the beach", target: "small café", after: "We went to dinner", notConstraints: [], expectedEpisode: "ep01_coastal", expectedEvent: "ep01_coastal_ev05" },
    { name: "DEMO 2: City walk → Buildings → Museum", before: "We were walking through the city", target: "buildings", after: "We visited a museum", notConstraints: [], expectedEpisode: "ep02_city", expectedEvent: "ep02_city_ev03" },
    { name: "DEMO 3: Doctor → Medicine → Home", before: "We visited the doctor", target: "medicine", after: "We went back home", notConstraints: [], expectedEpisode: "ep03_medical", expectedEvent: "ep03_medical_ev05" },
    { name: "DEMO 4: Airport → Ride → Hotel", before: "We arrived at the airport", target: "the ride to our hotel", after: "We checked into the hotel", notConstraints: [], expectedEpisode: "ep04_airport", expectedEvent: "ep04_airport_ev05" },
    { name: "DEMO 5: Class → Library → Coffee", before: "We were in class", target: "studying in the library", after: "We went for coffee", notConstraints: [], expectedEpisode: "ep05_campus", expectedEvent: "ep05_campus_ev04" },
    { name: "DEMO 6: Hiking → Viewpoint → Dinner", before: "We started hiking", target: "mountain viewpoint", after: "We went to dinner", notConstraints: [], expectedEpisode: "ep06_hiking", expectedEvent: "ep06_hiking_ev04" },
];

const TARGET_ONLY: TestCase[] = [
    { name: "TARGET: buildings", before: "", target: "buildings", after: "", notConstraints: [] },
    { name: "TARGET: medicine", before: "", target: "medicine", after: "", notConstraints: [] },
    { name: "TARGET: cafe", before: "", target: "cafe", after: "", notConstraints: [] },
    { name: "TARGET: mountain", before: "", target: "mountain", after: "", notConstraints: [] },
    { name: "TARGET: airport", before: "", target: "airport", after: "", notConstraints: [] },
    { name: "TARGET: library", before: "", target: "library", after: "", notConstraints: [] },
    { name: "TARGET: birthday cake", before: "", target: "birthday cake", after: "", notConstraints: [] },
    { name: "TARGET: museum", before: "", target: "museum", after: "", notConstraints: [] },
    { name: "TARGET: hotel room", before: "", target: "hotel room", after: "", notConstraints: [] },
    { name: "TARGET: coffee", before: "", target: "coffee", after: "", notConstraints: [] },
    { name: "TARGET: restaurant", before: "", target: "restaurant", after: "", notConstraints: [] },
    { name: "TARGET: park", before: "", target: "park", after: "", notConstraints: [] },
    { name: "TARGET: shopping mall", before: "", target: "shopping mall", after: "", notConstraints: [] },
    { name: "TARGET: night market", before: "", target: "night market", after: "", notConstraints: [] },
    { name: "TARGET: crowd", before: "", target: "crowd", after: "", notConstraints: [] },
    { name: "TARGET: architecture", before: "", target: "architecture", after: "", notConstraints: [] },
    { name: "TARGET: beach", before: "", target: "beach", after: "", notConstraints: [] },
    { name: "TARGET: mountains", before: "", target: "mountains", after: "", notConstraints: [] },
    { name: "TARGET: documents", before: "", target: "documents", after: "", notConstraints: [] },
    { name: "TARGET: friends at dinner", before: "", target: "friends at dinner", after: "", notConstraints: [] },
];

const NEGATIVE_TESTS: TestCase[] = [
    { name: "NEG: cafe NOT outdoors", before: "", target: "cafe", after: "", notConstraints: ["outdoors"] },
    { name: "NEG: gathering NOT night", before: "", target: "gathering", after: "", notConstraints: ["night"] },
    { name: "NEG: architecture NOT indoors", before: "", target: "architecture", after: "", notConstraints: ["indoors"] },
    { name: "NEG: food NOT restaurant", before: "", target: "food", after: "", notConstraints: ["restaurant"] },
];

export default function RegressionPage() {
    const [results, setResults] = useState<Record<string, TestResult>>({});
    const [isRunning, setIsRunning] = useState(false);
    const [expandedTest, setExpandedTest] = useState<string | null>(null);

    const runTest = useCallback(async (test: TestCase): Promise<TestResult> => {
        const start = Date.now();
        try {
            const res = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: test.target,
                    before: test.before || undefined,
                    after: test.after || undefined,
                    notConstraints: test.notConstraints.length > 0 ? test.notConstraints : undefined,
                }),
            });
            const data = await res.json();
            const duration = Date.now() - start;

            const topResult = data.results?.[0];
            const topEventId = topResult?.event?.eventId || null;
            const topEpisodeId = topResult?.episode?.episodeId || null;
            const topScore = topResult?.debugScore || null;

            let status: TestResult['status'] = 'pass';
            let message = `Found ${data.results?.length || 0} results in ${duration}ms`;

            if (!data.results || data.results.length === 0) {
                status = 'fail';
                message = 'No results returned';
            } else if (test.expectedEpisode && topEpisodeId !== test.expectedEpisode) {
                status = 'fail';
                message = `Expected episode ${test.expectedEpisode}, got ${topEpisodeId}`;
            } else if (test.expectedEvent && topEventId !== test.expectedEvent) {
                // Check if any of top 5 contain the expected event
                const top5Events = data.results.slice(0, 5).map((r: Record<string, unknown>) => (r.event as Record<string, unknown>)?.eventId);
                if (top5Events.includes(test.expectedEvent)) {
                    message += ` (expected event in top 5 but not #1)`;
                } else {
                    status = 'fail';
                    message = `Expected event ${test.expectedEvent}, got ${topEventId}`;
                }
            }

            // For negative tests, verify constraints are respected
            if (test.notConstraints.length > 0 && data.results?.length > 0) {
                const violating = data.results.filter((r: Record<string, unknown>) => (r.conflictReasons as string[])?.length > 0);
                if (violating.length > 0) {
                    message += ` (${violating.length} results have conflicts)`;
                }
            }

            return {
                test, status, results: data.results || [], boundaries: data.boundaries,
                topEventId, topEpisodeId, topScore, message, duration,
            };
        } catch (err) {
            return {
                test, status: 'error', results: [], boundaries: null,
                topEventId: null, topEpisodeId: null, topScore: null,
                message: `Error: ${(err as Error).message}`, duration: Date.now() - start,
            };
        }
    }, []);

    const runAllTests = useCallback(async () => {
        setIsRunning(true);
        const allTests = [...OFFICIAL_DEMOS, ...TARGET_ONLY, ...NEGATIVE_TESTS];

        for (const test of allTests) {
            setResults(prev => ({ ...prev, [test.name]: { test, status: 'running', results: [], boundaries: null, topEventId: null, topEpisodeId: null, topScore: null, message: 'Running...', duration: 0 } }));
            const result = await runTest(test);
            setResults(prev => ({ ...prev, [test.name]: result }));
        }
        setIsRunning(false);
    }, [runTest]);

    const allTestsList = [...OFFICIAL_DEMOS, ...TARGET_ONLY, ...NEGATIVE_TESTS];
    const passCount = Object.values(results).filter(r => r.status === 'pass').length;
    const failCount = Object.values(results).filter(r => r.status === 'fail').length;
    const errorCount = Object.values(results).filter(r => r.status === 'error').length;

    const statusColor = (s: string) => {
        switch(s) {
            case 'pass': return 'text-green-400 bg-green-900/30 border-green-500/50';
            case 'fail': return 'text-red-400 bg-red-900/30 border-red-500/50';
            case 'error': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
            case 'running': return 'text-blue-400 bg-blue-900/30 border-blue-500/50';
            default: return 'text-white/40 bg-white/5 border-white/10';
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <h1 className="text-3xl font-bold mb-2">Regression Test Dashboard</h1>
            <p className="text-white/50 mb-6 text-sm">Tests the 6 official Memory Reconstruction demos + target-only + negative searches</p>

            {/* ── RUN BUTTON & SUMMARY ── */}
            <div className="flex items-center gap-6 mb-8">
                <button
                    onClick={runAllTests}
                    disabled={isRunning}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 rounded-xl font-medium flex items-center gap-2 transition-colors"
                >
                    {isRunning ? '⏳ Running...' : '▶ Run All Tests'}
                </button>
                {Object.keys(results).length > 0 && (
                    <div className="flex gap-4 text-sm">
                        <span className="text-green-400 font-bold">✓ {passCount} PASS</span>
                        <span className="text-red-400 font-bold">✗ {failCount} FAIL</span>
                        {errorCount > 0 && <span className="text-yellow-400 font-bold">⚠ {errorCount} ERROR</span>}
                        <span className="text-white/40">/ {allTestsList.length} total</span>
                    </div>
                )}
            </div>

            {/* ── OFFICIAL DEMO TESTS ── */}
            <h2 className="text-xl font-bold mb-4 text-blue-400">Official Demo Tests (6)</h2>
            <div className="space-y-3 mb-8">
                {OFFICIAL_DEMOS.map(test => {
                    const r = results[test.name];
                    return (
                        <div key={test.name}>
                            <button
                                onClick={() => setExpandedTest(expandedTest === test.name ? null : test.name)}
                                className={`w-full text-left rounded-xl p-4 border transition-all ${r ? statusColor(r.status) : 'bg-white/5 border-white/10'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold">{test.name}</div>
                                        <div className="text-xs text-white/50 mt-1">
                                            Before: &quot;{test.before}&quot; → Target: &quot;{test.target}&quot; → After: &quot;{test.after}&quot;
                                        </div>
                                    </div>
                                    <div className="text-right text-sm">
                                        {r && (
                                            <>
                                                <div className="font-bold uppercase">{r.status}</div>
                                                <div className="text-xs text-white/40">{r.duration}ms</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {r && <div className="text-xs mt-2 text-white/60">{r.message}</div>}
                            </button>
                            {/* Expanded: show top 5 images */}
                            {expandedTest === test.name && r && r.results.length > 0 && (
                                <div className="ml-4 mt-2 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm text-white/50 mb-3">
                                        Boundaries detected: Before=&quot;{r.boundaries?.before || 'none'}&quot; After=&quot;{r.boundaries?.after || 'none'}&quot;
                                    </div>
                                    <div className="grid grid-cols-5 gap-3">
                                        {r.results.slice(0, 5).map((img: Record<string, unknown>, i: number) => (
                                            <div key={i} className="rounded-lg overflow-hidden border border-white/10">
                                                <div className="aspect-square relative">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={img.filepath as string} alt={img.description as string || ''} className="w-full h-full object-cover" loading="lazy" />
                                                    <div className="absolute top-1 left-1 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono">
                                                        #{i + 1}
                                                    </div>
                                                    <div className="absolute bottom-1 right-1 bg-black/80 px-2 py-0.5 rounded text-[10px]">
                                                        {img.confidence as string}
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <div className="text-[10px] text-white/60 truncate">{img.description as string}</div>
                                                    <div className="text-[10px] text-white/40 font-mono">{(img.event as Record<string, string>)?.eventId}</div>
                                                    <div className="text-[10px] text-white/40">{((img.debugScore as number) * 100).toFixed(0)}%</div>
                                                    {(img.matchReasons as string[])?.map((reason: string, j: number) => (
                                                        <div key={j} className="text-[10px] text-green-400/70">{reason}</div>
                                                    ))}
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

            {/* ── TARGET-ONLY TESTS ── */}
            <h2 className="text-xl font-bold mb-4 text-purple-400">Target-Only Tests ({TARGET_ONLY.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {TARGET_ONLY.map(test => {
                    const r = results[test.name];
                    return (
                        <button
                            key={test.name}
                            onClick={() => setExpandedTest(expandedTest === test.name ? null : test.name)}
                            className={`text-left rounded-lg p-3 border transition-all ${r ? statusColor(r.status) : 'bg-white/5 border-white/10'}`}
                        >
                            <div className="font-medium text-sm">{test.target}</div>
                            {r && (
                                <div className="text-xs mt-1 text-white/50">
                                    {r.results.length} results • {r.duration}ms • {r.status.toUpperCase()}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Show expanded target-only result */}
            {expandedTest && TARGET_ONLY.find(t => t.name === expandedTest) && results[expandedTest] && (
                <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="font-bold mb-3">{expandedTest} — Top 5 Results</h3>
                    <div className="grid grid-cols-5 gap-3">
                        {results[expandedTest].results.slice(0, 5).map((img: Record<string, unknown>, i: number) => (
                            <div key={i} className="rounded-lg overflow-hidden border border-white/10">
                                <div className="aspect-square">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img.filepath as string} alt={img.description as string || ""} className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div className="p-2">
                                    <div className="text-[10px] text-white/60 truncate">{img.description as string}</div>
                                    <div className="text-[10px] text-white/40 font-mono">{(img.event as Record<string, unknown>)?.eventId as string}</div>
                                    <div className="text-[10px] text-white/40">{((img.debugScore as number) * 100).toFixed(0)}%</div>
                                    {(img.matchReasons as string[])?.slice(0, 2).map((r: string, j: number) => (
                                        <div key={j} className="text-[10px] text-green-400/70">{r}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── NEGATIVE TESTS ── */}
            <h2 className="text-xl font-bold mb-4 text-orange-400">Negative Constraint Tests ({NEGATIVE_TESTS.length})</h2>
            <div className="space-y-3 mb-8">
                {NEGATIVE_TESTS.map(test => {
                    const r = results[test.name];
                    return (
                        <div key={test.name} className={`rounded-lg p-3 border transition-all ${r ? statusColor(r.status) : 'bg-white/5 border-white/10'}`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium text-sm">{test.name}</div>
                                    <div className="text-[10px] text-white/40">
                                        Target: &quot;{test.target}&quot; | NOT: {test.notConstraints.join(', ')}
                                    </div>
                                </div>
                                {r && <div className="text-xs font-bold uppercase">{r.status} • {r.results.length} results • {r.duration}ms</div>}
                            </div>
                            {r && <div className="text-xs mt-1 text-white/50">{r.message}</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
