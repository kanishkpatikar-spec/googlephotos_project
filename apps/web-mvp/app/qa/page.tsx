"use client";
import React, { useState, useMemo } from 'react';
import { mockDatabase } from '../../lib/mock-database';

export default function QAPage() {
    const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    const db = useMemo(() => mockDatabase, []);

    // ── Stats ──
    const totalImages = db.images.length;
    const totalEpisodes = db.episodes.length;
    const totalEvents = db.events.length;
    const indoorCount = db.images.filter(i => i.visual.indoorOutdoor === 'indoor').length;
    const outdoorCount = db.images.filter(i => i.visual.indoorOutdoor === 'outdoor').length;
    const morningCount = db.images.filter(i => i.visual.timeOfDay === 'morning').length;
    const afternoonCount = db.images.filter(i => i.visual.timeOfDay === 'afternoon').length;
    const eveningCount = db.images.filter(i => i.visual.timeOfDay === 'evening').length;
    const nightCount = db.images.filter(i => i.visual.timeOfDay === 'night').length;
    const withPeople = db.images.filter(i => i.visual.peopleCount > 0).length;

    // ── Duplicate checks ──
    const idSet = new Set(db.images.map(i => i.id));
    const duplicateIds = totalImages - idSet.size;
    const urlSet = new Set(db.images.map(i => i.filepath));
    const duplicateUrls = totalImages - urlSet.size;

    // ── Sequence checks ──
    const globalIndices = db.images.map(i => i.sequence.globalSequenceIndex).sort((a, b) => a - b);
    const sequenceGaps = globalIndices.filter((v, i) => i > 0 && v !== globalIndices[i - 1] + 1).length;

    // ── Broken paths ──
    const brokenPaths = db.images.filter(i => !i.filepath || i.filepath.length < 5).length;

    // ── Per-event images ──
    const eventImages = useMemo(() => {
        const map: Record<string, typeof db.images> = {};
        for (const img of db.images) {
            const eid = img.event.eventId;
            if (!map[eid]) map[eid] = [];
            map[eid].push(img);
        }
        return map;
    }, [db]);

    // ── Event consistency ──
    const eventConsistencyErrors = db.events.filter(ev => {
        const imgs = eventImages[ev.eventId] || [];
        return imgs.length !== 10;
    }).length;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <h1 className="text-3xl font-bold mb-2">Dataset QA Dashboard</h1>
            <p className="text-white/50 mb-6 text-sm font-mono">Dataset Version: {db.datasetVersion}</p>

            {/* ── SUMMARY STATS ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {[
                    { label: 'Total Images', value: totalImages, expected: 720 },
                    { label: 'Episodes', value: totalEpisodes, expected: 12 },
                    { label: 'Events', value: totalEvents, expected: 72 },
                    { label: 'Avg/Event', value: (totalImages / totalEvents).toFixed(1), expected: '10.0' },
                    { label: 'Duplicate IDs', value: duplicateIds, expected: 0 },
                    { label: 'Duplicate URLs', value: duplicateUrls, expected: null },
                    { label: 'Sequence Gaps', value: sequenceGaps, expected: 0 },
                    { label: 'Broken Paths', value: brokenPaths, expected: 0 },
                    { label: 'Event Size Errors', value: eventConsistencyErrors, expected: 0 },
                    { label: 'Indoor', value: indoorCount },
                    { label: 'Outdoor', value: outdoorCount },
                    { label: 'With People', value: withPeople },
                    { label: 'Morning', value: morningCount },
                    { label: 'Afternoon', value: afternoonCount },
                    { label: 'Evening', value: eveningCount },
                    { label: 'Night', value: nightCount },
                ].map((stat, i) => (
                    <div key={i} className={`rounded-xl p-4 border ${
                        stat.expected !== undefined && stat.expected !== null && String(stat.value) !== String(stat.expected)
                            ? 'bg-red-900/30 border-red-500/50'
                            : 'bg-white/5 border-white/10'
                    }`}>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-white/50 mt-1">{stat.label}</div>
                        {stat.expected !== undefined && stat.expected !== null && (
                            <div className={`text-xs mt-1 ${String(stat.value) === String(stat.expected) ? 'text-green-400' : 'text-red-400'}`}>
                                {String(stat.value) === String(stat.expected) ? '✓ PASS' : `✗ Expected ${stat.expected}`}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* ── EPISODE LIST ── */}
            <h2 className="text-xl font-bold mb-4">Episodes ({totalEpisodes})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {db.episodes.map(ep => (
                    <button
                        key={ep.episodeId}
                        onClick={() => { setSelectedEpisode(ep.episodeId === selectedEpisode ? null : ep.episodeId); setSelectedEvent(null); }}
                        className={`text-left rounded-xl p-4 border transition-all ${
                            selectedEpisode === ep.episodeId
                                ? 'bg-blue-900/30 border-blue-500/50'
                                : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                    >
                        <div className="font-bold text-lg">{ep.title}</div>
                        <div className="text-xs text-white/40 font-mono">{ep.episodeId}</div>
                        <div className="text-sm text-white/60 mt-1">{ep.startTime.split('T')[0]}</div>
                        <div className="text-xs text-white/40 mt-1">{ep.eventIds.length} events</div>
                    </button>
                ))}
            </div>

            {/* ── EVENTS FOR SELECTED EPISODE ── */}
            {selectedEpisode && (
                <>
                    <h2 className="text-xl font-bold mb-4">
                        Events in: {db.episodes.find(e => e.episodeId === selectedEpisode)?.title}
                    </h2>
                    <div className="flex flex-wrap gap-3 mb-6">
                        {db.events
                            .filter(ev => ev.episodeId === selectedEpisode)
                            .sort((a, b) => a.order - b.order)
                            .map(ev => (
                                <button
                                    key={ev.eventId}
                                    onClick={() => setSelectedEvent(ev.eventId === selectedEvent ? null : ev.eventId)}
                                    className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                                        selectedEvent === ev.eventId
                                            ? 'bg-blue-900/40 border-blue-400/60'
                                            : 'bg-white/5 border-white/10 hover:border-white/30'
                                    }`}
                                >
                                    <div className="font-medium">{ev.title}</div>
                                    <div className="text-xs text-white/40">
                                        {(eventImages[ev.eventId] || []).length} images • {ev.concepts.slice(0, 3).join(', ')}
                                    </div>
                                </button>
                            ))}
                    </div>
                </>
            )}

            {/* ── IMAGE GRID FOR SELECTED EVENT ── */}
            {selectedEvent && (
                <>
                    <h2 className="text-lg font-bold mb-4">
                        Images: {db.events.find(e => e.eventId === selectedEvent)?.title}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                        {(eventImages[selectedEvent] || []).map(img => (
                            <div key={img.id} className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
                                <div className="aspect-square relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={img.filepath}
                                        alt={img.visual.description}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs font-mono">
                                        #{img.sequence.imageOrderInEvent}
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className="text-xs text-white/80 leading-snug mb-2">{img.visual.description}</p>
                                    <div className="text-[10px] text-white/40 space-y-1">
                                        <div>🏷️ {img.visual.primaryScene} | {img.visual.indoorOutdoor} | {img.visual.timeOfDay}</div>
                                        <div>👥 {img.visual.peopleCount} people ({img.visual.gatheringType})</div>
                                        <div>📦 {img.visual.objects.slice(0, 4).join(', ')}</div>
                                        <div>🔍 {img.search.canonicalConcepts.slice(0, 4).join(', ')}</div>
                                        <div className="font-mono">{img.timestamp.value}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ── ALL EVENTS OVERVIEW ── */}
            {!selectedEpisode && (
                <>
                    <h2 className="text-xl font-bold mb-4">All Events Overview ({totalEvents})</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-white/50 text-left">
                                    <th className="py-2 px-3">Episode</th>
                                    <th className="py-2 px-3">Event</th>
                                    <th className="py-2 px-3">Images</th>
                                    <th className="py-2 px-3">Concepts</th>
                                    <th className="py-2 px-3">Time</th>
                                    <th className="py-2 px-3">Prev</th>
                                    <th className="py-2 px-3">Next</th>
                                </tr>
                            </thead>
                            <tbody>
                                {db.events.map(ev => (
                                    <tr key={ev.eventId} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-2 px-3 text-white/40 font-mono text-xs">{ev.episodeId}</td>
                                        <td className="py-2 px-3 font-medium">{ev.title}</td>
                                        <td className="py-2 px-3">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                (eventImages[ev.eventId] || []).length === 10
                                                    ? 'bg-green-900/30 text-green-400'
                                                    : 'bg-red-900/30 text-red-400'
                                            }`}>
                                                {(eventImages[ev.eventId] || []).length}
                                            </span>
                                        </td>
                                        <td className="py-2 px-3 text-xs text-white/50">{ev.concepts.slice(0, 5).join(', ')}</td>
                                        <td className="py-2 px-3 font-mono text-xs text-white/40">{ev.startTime.split('T')[1]}</td>
                                        <td className="py-2 px-3 font-mono text-[10px] text-white/30">{ev.previousEventId || '—'}</td>
                                        <td className="py-2 px-3 font-mono text-[10px] text-white/30">{ev.nextEventId || '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
