"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";

import { VISUAL_POOLS } from "../lib/visual-pools";
import { mockDatabase } from "../lib/mock-database";
import { MemoryAssistPanel } from "../components/MemoryAssistPanel";
import { MemoryTimeline } from "../components/MemoryTimeline";
import { CandidateExplanation } from "../components/CandidateExplanation";




// Generate 200 deterministic pseudo-random favorites for the demo to prevent hydration mismatch
const INITIAL_FAVORITES = new Set<string>();
mockDatabase.images.forEach((img, idx) => {
    if (idx % 3 === 0 && INITIAL_FAVORITES.size < 200) {
        INITIAL_FAVORITES.add(img.id);
    }
});

// Generate 50 extra dynamic photos directly into the mockDatabase so the Trash has content to review
const INITIAL_TRASH = new Set<string>();
const EXTRA_TRASH_PICS = Array.from({ length: 50 }).map((_, i) => ({
    id: `trash_mock_img_${i}`,
    filename: `IMG_TRASH_${i}.jpg`,
    filepath: `https://picsum.photos/seed/trash${i}/400/300`,
    highResUrl: `https://picsum.photos/seed/trash${i}/1200/900`,
    visual: {
        description: "Deleted photo",
        primaryScene: "deleted",
        secondaryScenes: [],
        indoorOutdoor: "unknown",
        timeOfDay: "unknown",
        peopleCount: 0,
        gatheringType: "unknown",
        objects: [],
        activities: []
    },
    search: { canonicalConcepts: [], synonyms: [] },
    episode: { episodeId: "none", episodeName: "none", episodeOrder: 0 },
    event: { eventId: "none", eventName: "none", eventOrder: 0 },
    sequence: { imageOrderInEvent: 0, globalSequenceIndex: 0 },
    timestamp: { value: "2026-05-15T12:00:00", source: "demo-curated" },
    relationships: { previousImageId: null, nextImageId: null, previousEventId: null, nextEventId: null },
    quality: { groundTruthValidated: false, visualMetadataMatch: false },
    scene: { primary: "deleted", secondary: [] },
    objects: [],
    environment: { indoorOutdoor: "unknown", timeOfDay: "unknown", weather: "unknown" },
    semanticConcepts: [],
    groundTruthConcepts: [],
    inferredConcepts: [],
    description: "Deleted photo",
    timestampFlat: "2026-05-15T12:00:00",
    confidence: { visual: 1, metadata: 1 },
    boundary: { previousEventId: null, nextEventId: null }
}));

if (!mockDatabase.images.some(img => img.id === 'trash_mock_img_0')) {
    // @ts-expect-error Ignoring type mismatch for demo purposes
    mockDatabase.images.push(...EXTRA_TRASH_PICS);
}

EXTRA_TRASH_PICS.forEach(img => INITIAL_TRASH.add(img.id));

// Extract all possible years from the database to keep the scrubber static
const ALL_YEARS = Array.from(new Set(mockDatabase.images.map(img => 
    (img.timestampFlat || img.timestamp?.value || "2026").substring(0, 4)
))).sort((a, b) => Number(b) - Number(a));

export default function MVPSearch() {
  const [localQuery, setLocalQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [displayMode, setDisplayMode] = useState<string>("grid");
  const [narratives, setNarratives] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeGallery, setActiveGallery] = useState<{ images: any[], currentIndex: number } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeStory, setActiveStory] = useState<{ title: string, images: any[], currentIndex: number, isPaused: boolean, isMuted: boolean } | null>(null);
  const [isTopSearchActive, setIsTopSearchActive] = useState(false);
  const [boundaries, setBoundaries] = useState<{before: string | null, after: string | null} | null>(null);
  const [wrongMemoryMsg, setWrongMemoryMsg] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [debugData, setDebugData] = useState<any | null>(null);
type UserAlbum = {
  id: string;
  title: string;
  photoIds: Set<string>;
};

  const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'trash' | 'albums' | string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(INITIAL_FAVORITES);
  const [deleted, setDeleted] = useState<Set<string>>(INITIAL_TRASH);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  
  const [userAlbums, setUserAlbums] = useState<UserAlbum[]>([]);
  const [isCreateAlbumModalOpen, setIsCreateAlbumModalOpen] = useState(false);
  const [albumNameToCreate, setAlbumNameToCreate] = useState('');
  const [photoToAddAfterAlbumCreation, setPhotoToAddAfterAlbumCreation] = useState<string | null>(null);
  const [isSelectAlbumModalOpen, setIsSelectAlbumModalOpen] = useState(false);
  const [photoToAddToAlbum, setPhotoToAddToAlbum] = useState<string | null>(null);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPhotos(new Set());
  }, [activeFilter]);

  const toggleSelection = (id: string) => {
    setSelectedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkAction = (action: 'delete' | 'restore' | 'favorite' | 'unfavorite') => {
    if (action === 'delete') {
      setDeleted(prev => { const next = new Set(prev); selectedPhotos.forEach(id => next.add(id)); return next; });
    } else if (action === 'restore') {
      setDeleted(prev => { const next = new Set(prev); selectedPhotos.forEach(id => next.delete(id)); return next; });
    } else if (action === 'favorite') {
      setFavorites(prev => { const next = new Set(prev); selectedPhotos.forEach(id => next.add(id)); return next; });
    } else if (action === 'unfavorite') {
      setFavorites(prev => { const next = new Set(prev); selectedPhotos.forEach(id => next.delete(id)); return next; });
    }
    setSelectedPhotos(new Set());
  };

  const toggleDelete = (id: string) => {
    setDeleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const { grouped: groupedPhotos, flatPhotos } = useMemo(() => {
    const photos = mockDatabase.images.map(img => ({
      ...img,
      dateObj: new Date(img.timestampFlat || img.timestamp?.value || "2026-03-01T12:00:00"),
      title: `${img.scene?.primary?.charAt(0).toUpperCase() + img.scene?.primary?.slice(1) || 'Memory'} Capture`,
      url: img.filepath,
      category: img.scene?.primary || 'unknown'
    }));

    let activePhotos = photos;
    
    // First, handle trash filter vs normal views
    if (activeFilter === 'trash') {
        activePhotos = photos.filter(p => deleted.has(p.id));
    } else {
        // Hide deleted photos in all other views
        activePhotos = photos.filter(p => !deleted.has(p.id));

        if (activeFilter === 'favorites') {
            activePhotos = activePhotos.filter(p => favorites.has(p.id));
        } else if (activeFilter.startsWith('album_')) {
            const currentAlbum = userAlbums.find(a => a.id === activeFilter);
            if (currentAlbum) {
                activePhotos = activePhotos.filter(p => currentAlbum.photoIds.has(p.id));
            }
        }
    }

    const filteredPhotos = localQuery.trim()
        ? activePhotos.filter(p => p.title.toLowerCase().includes(localQuery.toLowerCase()) || p.category.toLowerCase().includes(localQuery.toLowerCase()))
        : activePhotos;

    const grouped: Record<string, Record<string, Record<string, typeof photos>>> = {};
    for (const photo of filteredPhotos) {
        const year = photo.dateObj.getUTCFullYear().toString();
        const month = photo.dateObj.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
        const dateStr = photo.dateObj.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
        
        if (!grouped[year]) grouped[year] = {};
        if (!grouped[year][month]) grouped[year][month] = {};
        if (!grouped[year][month][dateStr]) grouped[year][month][dateStr] = [];
        grouped[year][month][dateStr].push(photo);
    }

    return { grouped, flatPhotos: activePhotos };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localQuery, activeFilter, favorites]);



  const handleMemorySearch = async (payload: { before: string; after: string; query: string; notConstraints: string[] }) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      if (data.type === "results") {
        setResults(data.results);
        setDisplayMode(data.displayMode || "grid");
        setNarratives(data.narratives || []);
        setIsTopSearchActive(true);
        setBoundaries(data.boundaries);
        setWrongMemoryMsg(data.wrongMemoryMessage);
        if (data.debug) {
            setDebugData(data.debug);
        }
      }
    } catch (error) {
      console.error("Memory Search Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const launchStory = (title: string, categoryKey: string, thumbnailPicId: number) => {
    // Generate up to 6 slides for this story using the visual pool
    const ids = VISUAL_POOLS[categoryKey] || VISUAL_POOLS['landscape'];
    const startIndex = ids.indexOf(thumbnailPicId);
    const startIdx = startIndex !== -1 ? startIndex : 0;
    
    // Circular wrap to grab 6 images starting exactly from the thumbnail they clicked
    const storyIds = [...ids, ...ids].slice(startIdx, startIdx + 6);
    
    const storyImages = storyIds.map((id, idx) => ({
      url: typeof id === 'string' ? id : `https://picsum.photos/id/${id}/800/1200`,
      title: `${title} - Memory ${idx + 1}`
    }));
    setActiveStory({ title, images: storyImages, currentIndex: 0, isPaused: false, isMuted: true });
  };

  // Story Auto-advance Timer (3 seconds)
  useEffect(() => {
    if (!activeStory || activeStory.isPaused) return;
    const timer = setInterval(() => {
      setActiveStory(prev => {
        if (!prev) return null;
        if (prev.currentIndex < prev.images.length - 1) {
          return { ...prev, currentIndex: prev.currentIndex + 1 };
        } else {
          return null; // Close story when done
        }
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [activeStory]);

  return (
    <>
      {/*  AI Sight Inspired Dark Purple/Teal Ambient Mesh  */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#090710]">
        {/* Top center deep purple/magenta glow */}
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1100px] h-[800px] bg-[#3d195e] rounded-full blur-[160px] opacity-70"></div>
        
        {/* Bottom right subtle teal glow */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[900px] h-[700px] bg-[#123640] rounded-full blur-[180px] opacity-60"></div>
        
        {/* Left side subtle dark blue glow */}
        <div className="absolute top-[20%] -left-[10%] w-[700px] h-[700px] bg-[#0c162c] rounded-full blur-[180px] opacity-50"></div>
      </div>
      
      {/*  Main Layout with Sidebar  */}
      <div className="max-w-[1800px] mx-auto w-full h-[calc(100vh-4rem)] overflow-hidden flex">
          
        {/* Sidebar */}
        <aside className="w-[220px] shrink-0 h-full border-r border-white/5 py-8 flex flex-col gap-8 hidden md:flex overflow-y-auto px-4 z-50">
            <div className="flex flex-col gap-2">
                <button onClick={() => setActiveFilter('all')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeFilter === 'all' ? 'bg-primary/15 text-primary font-medium' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px]">photo_library</span>
                    Photos
                </button>
                <button onClick={() => setActiveFilter('favorites')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeFilter === 'favorites' ? 'bg-primary/15 text-primary font-medium' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px]">star</span>
                    Favorites
                </button>
                <button onClick={() => setActiveFilter('albums')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeFilter === 'albums' || activeFilter.startsWith('album_') ? 'bg-primary/15 text-primary font-medium' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px]">photo_album</span>
                    Albums
                </button>
                <button onClick={() => setActiveFilter('trash')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeFilter === 'trash' ? 'bg-error/15 text-error font-medium' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                    Trash
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center pt-8 pb-8 pl-6 pr-[100px] overflow-hidden relative">

        {/* Floating Multi-Selection Action Bar */}
        {selectedPhotos.size > 0 && (
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] flex items-center justify-between gap-8 px-6 py-3 bg-[#1a1b26]/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full animate-in slide-in-from-bottom-10">
                <div className="flex items-center gap-4 pl-2">
                    <button onClick={() => setSelectedPhotos(new Set())} className="p-1.5 rounded-full hover:bg-white/10 text-on-surface transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                    <span className="text-white font-medium whitespace-nowrap">{selectedPhotos.size} selected</span>
                </div>
                <div className="flex items-center gap-1 bg-black/20 rounded-full px-2 py-1">
                    {activeFilter === 'trash' ? (
                        <button onClick={() => handleBulkAction('restore')} className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 text-white transition-colors text-sm font-medium">
                            <span className="material-symbols-outlined text-[18px]">restore_from_trash</span> Restore
                        </button>
                    ) : (
                        <>
                            <button onClick={() => handleBulkAction('favorite')} className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 text-white transition-colors text-sm font-medium" title="Favorite">
                                <span className="material-symbols-outlined text-[18px]">star</span> Add
                            </button>
                            <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
                            <button onClick={() => handleBulkAction('delete')} className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-error/20 text-error transition-colors text-sm font-medium">
                                <span className="material-symbols-outlined text-[18px]">delete</span> Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        )}
        
        {/*  Static Search Header  */}
        <div className="w-full flex flex-col items-center z-[70] flex-shrink-0 mb-6">
            {/*  Oversized Omnibar Glassmorphic Search Experience  */}
            <div className="w-full max-w-4xl relative mb-2">
                {/*  Outer subtle glow halo  */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/25 via-secondary/20 to-tertiary/20 blur-xl opacity-60"></div>
                <div className="relative bg-surface-container-high/85 backdrop-blur-2xl rounded-full shadow-2xl p-space-xs flex items-center justify-between gap-space-sm">
                    {/*  Search Leading Icon & Primary Input Field  */}
                    <div className="flex items-center gap-space-sm pl-space-md flex-1 min-w-0">
                        <span className="material-symbols-outlined text-primary text-[28px] shrink-0">travel_explore</span>
                        <input 
                            className="bg-transparent text-on-surface placeholder:text-on-surface-variant/60 font-body-lg text-body-lg focus:outline-none w-full truncate py-space-xs" 
                            placeholder="Search moments, e.g. 'medicine' or 'pet'" 
                            type="text" 
                            value={localQuery} 
                            onChange={(e) => setLocalQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleMemorySearch({ query: localQuery, before: "", after: "", notConstraints: [] });
                                }
                            }}
                        />
                        <button onClick={() => handleMemorySearch({ query: localQuery, before: "", after: "", notConstraints: [] })} className="flex items-center justify-center text-primary hover:text-primary-container transition-colors shrink-0 pr-4">
                            <span className="material-symbols-outlined text-[28px]">search</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* The new expandable Memory Boundary search UI */}
            <div className="w-full max-w-4xl relative">
                <MemoryAssistPanel onSearch={handleMemorySearch} isLoading={isLoading} />
            </div>
        </div>

        {activeFilter === 'trash' && (
            <div className="w-full max-w-[1400px] flex items-center justify-between mb-8 px-6 py-5 bg-error/10 border border-error/20 rounded-2xl shrink-0 shadow-lg">
                <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-error text-[40px]">delete</span>
                    <div>
                        <h2 className="text-xl font-headline-md text-error mb-1">Trash</h2>
                        <p className="text-sm text-error/70 font-medium">{deleted.size} items • Items will be permanently deleted after 60 days</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setDeleted(new Set())} className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">restore_from_trash</span>
                        Restore All
                    </button>
                </div>
            </div>
        )}
        



        {/* Scrollable Image Library Container */}
        <div className="w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden border border-white/10 rounded-3xl bg-white/[0.02] shadow-inner px-8 py-6 custom-scrollbar relative">
            {/* Results OR Massive Default Library Grid */}
            {results.length > 0 ? (
            <div className="w-full mt-8">
                <div className="grid grid-cols-3 items-center pb-space-sm mb-space-md border-b border-outline-variant/30 relative">
                    <div className="flex justify-start">
                        <button 
                            onClick={() => { setResults([]); setDisplayMode("grid"); setNarratives([]); setIsTopSearchActive(false); setBoundaries(null); setWrongMemoryMsg(null); setDebugData(null); }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-colors border border-outline-variant/30 shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            <span className="font-label-md">Back to Library</span>
                        </button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center w-full whitespace-nowrap">
                        <span className="font-headline-sm text-headline-sm text-on-surface">Search Results</span>
                        <span className="text-on-surface-variant font-body-sm text-body-sm hidden sm:inline">— Found in your library</span>
                    </div>

                    <div className="flex justify-end">
                        {/* Empty for balance */}
                    </div>
                </div>
                {displayMode === 'storyboard' ? (
                    <div className="w-full max-w-3xl mx-auto py-12 flex flex-col gap-16">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-light tracking-tight text-white mb-4">Memory Storyboard</h2>
                            <p className="text-primary/80 font-mono uppercase tracking-widest text-sm">AI Generated Narrative</p>
                        </div>
                        {results.map((result, idx) => (
                            <div key={result.id} className="flex flex-col gap-6">
                                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                                    <Image 
                                        alt="" 
                                        src={result.highResUrl || result.filepath} 
                                        fill 
                                        unoptimized
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                                        className="object-cover transition-transform duration-700 hover:scale-105" 
                                    />
                                </div>
                                <div className="pl-6 border-l-2 border-primary/30 py-2">
                                    <p className="text-xl text-white/90 font-serif leading-relaxed italic">&quot;{narratives[idx] || (result.semanticCaption as string)}&quot;</p>
                                    <p className="text-sm text-white/40 mt-3 font-mono">{result.exifDate || result.timestamp?.split('T')[0]} • {result.locationName || result.scene?.primary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-6 mb-space-xl relative z-[50]">
                        
                        {boundaries && (boundaries.before || boundaries.after) && (
                            <MemoryTimeline 
                                before={boundaries.before} 
                                after={boundaries.after} 
                                resultCount={results.length} 
                            />
                        )}

                        {wrongMemoryMsg && (
                            <div className="w-full max-w-4xl mx-auto p-4 mb-4 bg-error/10 border border-error/30 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3 text-error">
                                    <span className="material-symbols-outlined text-[24px]">warning</span>
                                    <p className="font-medium text-sm">{wrongMemoryMsg}</p>
                                </div>
                                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors border border-white/10">
                                    Show them anyway
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-space-lg">
                            {results.map((result, idx) => (
                                <article 
                                    key={result.id} 
                                    onClick={() => setActiveGallery({ images: results.map(r => ({ url: r.highResUrl || r.filepath, title: r.semanticCaption })), currentIndex: idx })}
                                    className="group bg-surface-container-low rounded-xl p-space-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 shadow-2xl flex flex-col justify-between cursor-pointer border border-outline-variant/20 hover:border-primary/50 relative"
                                >
                                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-lowest">
                                        <Image 
                                            fetchPriority="high" 
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                                            data-alt={result.semanticCaption as string} 
                                            src={result.filepath as string} 
                                            alt={result.semanticCaption as string || "Memory"} 
                                            fill 
                                            unoptimized
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                                        />
                                        
                                        {isTopSearchActive && result.matchReasons && (
                                            <CandidateExplanation 
                                                matchReasons={result.matchReasons} 
                                                conflictReasons={result.conflictReasons || []} 
                                                confidence={result.confidence || 'Medium'} 
                                            />
                                        )}

                                        {!isTopSearchActive && !result.matchReasons && (
                                            <div className="absolute top-2 left-2 flex items-center gap-1 z-20">
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase shadow-md backdrop-blur-md">
                                                    <span className="material-symbols-outlined text-[13px]">verified</span>
                                                    <span>{99 - (idx * 2)}% Match</span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="pt-3 px-1 pb-1 flex flex-col gap-2">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="font-headline-sm text-sm text-on-surface truncate flex-1 min-w-0" title={result.filename}>{result.filename}</h3>
                                            <span className="font-mono text-[11px] text-on-surface-variant bg-white/5 px-2 py-0.5 rounded-md border border-white/5 shrink-0">{result.timestamp?.split('T')[0]}</span>
                                        </div>
                                        <p className="text-[13px] text-on-surface-variant/80 line-clamp-2 leading-relaxed">
                                            {result.semanticCaption || result.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        ) : activeFilter === 'albums' ? (
            <div className="w-full mt-8 h-full flex flex-col items-center">
                {userAlbums.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 w-full h-[70vh] translate-x-[38px]">
                        <div className="flex flex-col items-center justify-center p-12 rounded-[40px] bg-surface-container-high/40 backdrop-blur-3xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)] max-w-lg w-full text-center relative overflow-hidden group">
                            {/* Decorative ambient glow inside the card */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-colors duration-700"></div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-secondary/30 transition-colors duration-700"></div>
                            
                            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-white/5 to-white/10 flex items-center justify-center mb-8 shadow-inner border border-white/10 relative z-10 backdrop-blur-md">
                                <span className="material-symbols-outlined text-[56px] text-white/80 drop-shadow-md">photo_album</span>
                            </div>
                            <h2 className="text-3xl font-light text-white mb-4 relative z-10 tracking-wide">No albums yet</h2>
                            <p className="text-on-surface-variant/80 mb-10 text-center max-w-sm text-[15px] leading-relaxed relative z-10 font-medium">Curate your favorite memories, organize trips, and group special events together in beautiful collections.</p>
                            <button onClick={() => setIsCreateAlbumModalOpen(true)} className="px-8 py-3.5 rounded-full bg-primary/90 hover:bg-primary text-on-primary font-medium text-lg flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-primary/40 hover:scale-105 transition-all duration-300 relative z-10">
                                <span className="material-symbols-outlined text-[24px]">add</span>
                                Create Album
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-headline-lg text-white">Albums</h2>
                            <button onClick={() => setIsCreateAlbumModalOpen(true)} className="px-5 py-2 rounded-full bg-primary/20 hover:bg-primary/30 text-primary font-medium flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                New Album
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {userAlbums.map(album => {
                                const coverId = Array.from(album.photoIds)[0];
                                const coverImg = flatPhotos.find(p => p.id === coverId);
                                return (
                                    <div key={album.id} onClick={() => setActiveFilter(album.id)} className="cursor-pointer group relative">
                                        <div className="w-full aspect-square rounded-2xl bg-surface-container overflow-hidden mb-3 border border-white/10 group-hover:border-primary/50 transition-colors shadow-md relative">
                                            
                                            {/* Delete button (visible on hover) */}
                                            <button 
                                                onClick={(e) => { 
                                                    e.stopPropagation(); 
                                                    setUserAlbums(prev => prev.filter(a => a.id !== album.id));
                                                }}
                                                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-error/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-md shadow-lg scale-90 group-hover:scale-100 flex items-center justify-center"
                                                title="Delete Album"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>

                                            {coverImg ? (
                                                <img src={coverImg.url as string} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
                                                    <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">photo_library</span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-medium text-white group-hover:text-primary transition-colors truncate">{album.title}</h3>
                                        <p className="text-sm text-on-surface-variant">{album.photoIds.size} items</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div className="w-full mt-8">
                {activeFilter.startsWith('album_') && (
                    <div className="w-full mb-8 flex items-center justify-between bg-surface-container-low px-6 py-4 rounded-2xl border border-white/5 shadow-md">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setActiveFilter('albums')} className="p-2.5 rounded-full hover:bg-white/10 text-white transition-colors bg-white/5">
                                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                            </button>
                            <h2 className="text-3xl font-headline-lg text-white tracking-tight">{userAlbums.find(a => a.id === activeFilter)?.title}</h2>
                        </div>
                        <button 
                            onClick={() => {
                                setUserAlbums(prev => prev.filter(a => a.id !== activeFilter));
                                setActiveFilter('albums');
                            }} 
                            className="px-5 py-2 flex items-center gap-2 rounded-full text-error hover:bg-error/10 border border-transparent hover:border-error/20 transition-all font-medium bg-error/5"
                        >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                            Delete Album
                        </button>
                    </div>
                )}
                {/* Header removed as requested */}
                {Object.entries(groupedPhotos).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, monthsObj]) => (
                    <div key={year} id={`year-${year}`} className={`relative ${activeFilter === 'trash' ? 'mb-4' : 'mb-16 pt-8'}`}>
                        {/* Giant background text for Year to look cool & help scrolling */}
                        {activeFilter !== 'trash' && (
                            <div className="absolute -right-[60px] top-0 text-[140px] font-bold text-white/10 z-0 pointer-events-none select-none tracking-tighter">
                                {year}
                            </div>
                        )}
                        
                        <div className={`relative z-10 ${activeFilter === 'trash' ? '' : 'mt-4'}`}>
                            {Object.entries(monthsObj).map(([month, datesObj], mIdx) => {
                                const highlightThemes = [
                                    { title: "Architecture Wonders", picId: 1040, categoryKey: 'buildings' },
                                    { title: "City Streets", picId: 1044, categoryKey: 'city_street' },
                                    { title: "Historic Landmarks", picId: 1057, categoryKey: 'landmark' },
                                    { title: "Delicious Eats", picId: 431, categoryKey: 'food' },
                                    { title: "Cafe Hopping", picId: 225, categoryKey: 'cafe' },
                                    { title: "Candid Portraits", picId: 1011, categoryKey: 'friends_group' },
                                    { title: "Faces & People", picId: 1012, categoryKey: 'friends_group' },
                                    { title: "People We Met", picId: 1027, categoryKey: 'gathering_formal' },
                                    { title: "Beach Day", picId: 564, categoryKey: 'beach' },
                                    { title: "Mountain Views", picId: 1018, categoryKey: 'mountain' },
                                    { title: "Hiking Trails", picId: 1036, categoryKey: 'hiking_trail' },
                                    { title: "Road Trip", picId: 33, categoryKey: 'highway' },
                                    { title: "Park Days", picId: 10, categoryKey: 'park_outdoor' },
                                    { title: "Sunset Magic", picId: 334, categoryKey: 'sunset' },
                                    { title: "Night Lights", picId: 1047, categoryKey: 'night_lights' },
                                    { title: "Hotel Stays", picId: 164, categoryKey: 'hotel_room' },
                                    { title: "Shopping", picId: 457, categoryKey: 'mall' },
                                    { title: "Pet Moments", picId: 237, categoryKey: 'pets' },
                                    { title: "Study Sessions", picId: 0, categoryKey: 'laptop_study' },
                                    { title: "Documents", picId: 363, categoryKey: 'documents' }
                                ];
                                const bestOfMonthData = [
                                    { picId: 1040, categoryKey: 'buildings' },
                                    { picId: 225, categoryKey: 'cafe' },
                                    { picId: 237, categoryKey: 'pets' },
                                    { picId: 1011, categoryKey: 'friends_group' },
                                    { picId: 564, categoryKey: 'beach' },
                                    { picId: 1018, categoryKey: 'mountain' },
                                    { picId: 363, categoryKey: 'documents' },
                                    { picId: 1027, categoryKey: 'gathering_formal' },
                                    { picId: 431, categoryKey: 'food' },
                                    { picId: 33, categoryKey: 'car_road' },
                                    { picId: 10, categoryKey: 'park_outdoor' },
                                    { picId: 1044, categoryKey: 'city_street' }
                                ];
                                const bom = bestOfMonthData[mIdx % 12];
                                const theme1 = highlightThemes[(parseInt(year) + mIdx) % highlightThemes.length];
                                const theme2 = highlightThemes[(parseInt(year) + mIdx + 7) % highlightThemes.length];
                                
                                return (
                                <div key={month} className={activeFilter === 'trash' ? '' : 'mb-12'}>
                                    {/* Month Header */}
                                    {activeFilter !== 'trash' && (
                                        <h2 className="font-headline-lg text-[32px] font-medium text-on-surface mb-4 tracking-tight">{month}</h2>
                                    )}
                                    
                                    {/* Highlights Carousel (at least 2 distinct items) */}
                                    {activeFilter === 'all' && (
                                        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide mb-4">
                                            {[
                                                { title: `Best of ${month}`, img: `https://picsum.photos/id/${bom.picId}/400/280`, picId: bom.picId, categoryKey: bom.categoryKey, count: (mIdx * 3 + 15) % 20 + 15 },
                                                { title: theme1.title, img: `https://picsum.photos/id/${theme1.picId}/400/280`, picId: theme1.picId, categoryKey: theme1.categoryKey, count: (mIdx * 5 + 7) % 15 + 5 },
                                                { title: theme2.title, img: `https://picsum.photos/id/${theme2.picId}/400/280`, picId: theme2.picId, categoryKey: theme2.categoryKey, count: (mIdx * 7 + 11) % 10 + 5 }
                                            ].map((highlight, i) => (
                                                <div key={i} onClick={() => launchStory(highlight.title, highlight.categoryKey, highlight.picId)} className="min-w-[280px] md:min-w-[340px] h-[220px] rounded-2xl relative overflow-hidden group cursor-pointer shrink-0 border border-outline-variant/20 shadow-sm">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={highlight.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={highlight.title}/>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"></div>
                                                    <div className="absolute bottom-5 left-5 right-5">
                                                        <h4 className="text-white font-medium text-[20px] leading-tight drop-shadow-lg truncate mb-1">{highlight.title}</h4>
                                                        <p className="text-white/80 font-medium text-sm drop-shadow-md">{highlight.count} highlights</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Dates within the Month */}
                                    {Object.entries(datesObj).map(([dateStr, photos]) => (
                                        <div key={dateStr} className={activeFilter === 'trash' ? 'mb-2' : 'mb-8 mt-2'}>
                                            {activeFilter !== 'trash' && (
                                                <h3 className="font-headline-sm text-[15px] text-on-surface-variant mb-3 font-medium">{dateStr}</h3>
                                            )}
                                            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 sm:gap-3">
                                                {photos.map((photo) => (
                                                    <div 
                                                        key={photo.id} 
                                                        onClick={() => {
                                                            if (selectedPhotos.size > 0) {
                                                                toggleSelection(photo.id);
                                                            } else {
                                                                setActiveGallery({ images: flatPhotos, currentIndex: flatPhotos.findIndex(p => p.id === photo.id) });
                                                            }
                                                        }}
                                                        className="aspect-square relative group overflow-hidden rounded-md bg-surface-container cursor-pointer border border-outline-variant/20"
                                                    >
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img loading="lazy" src={photo.url as string} alt={photo.title as string} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100 ${selectedPhotos.has(photo.id) ? 'scale-90 rounded-md border-2 border-primary opacity-100' : ''}`} />
                                                        
                                                        {/* Selection Checkbox */}
                                                        <div className={`absolute top-2 left-2 z-10 transition-opacity ${selectedPhotos.has(photo.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); toggleSelection(photo.id); }}
                                                                className="text-white hover:scale-110 transition-transform bg-black/20 hover:bg-black/40 rounded-full p-1 flex items-center justify-center backdrop-blur-sm"
                                                            >
                                                                <span className={`material-symbols-outlined text-[22px] ${selectedPhotos.has(photo.id) ? 'text-primary' : 'text-white/80'}`}>
                                                                    {selectedPhotos.has(photo.id) ? 'check_circle' : 'radio_button_unchecked'}
                                                                </span>
                                                            </button>
                                                        </div>

                                                        <div className={`absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity flex items-end justify-between p-2 ${activeFilter === 'trash' || selectedPhotos.has(photo.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                            {activeFilter !== 'trash' && <span className="text-white font-label-sm text-label-sm truncate pointer-events-auto">{photo.title}</span>}
                                                            <div className="flex items-center gap-1 pointer-events-auto">
                                                                {activeFilter !== 'trash' && (
                                                                    <button 
                                                                        onClick={(e) => { e.stopPropagation(); toggleFavorite(photo.id); }}
                                                                        className="text-white hover:scale-110 transition-transform"
                                                                        title={favorites.has(photo.id) ? "Unstar" : "Star"}
                                                                    >
                                                                        <span className={`material-symbols-outlined text-[20px] ${favorites.has(photo.id) ? 'text-primary' : ''}`}>
                                                                            {favorites.has(photo.id) ? 'star' : 'star_border'}
                                                                        </span>
                                                                    </button>
                                                                )}
                                                                <button 
                                                                    onClick={(e) => { e.stopPropagation(); toggleDelete(photo.id); }}
                                                                    className="text-white hover:scale-110 transition-transform"
                                                                    title={deleted.has(photo.id) ? "Restore" : "Delete"}
                                                                >
                                                                    <span className="material-symbols-outlined text-[20px] text-error">
                                                                        {deleted.has(photo.id) ? 'restore_from_trash' : 'delete'}
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )})}
                        </div>
                    </div>
                ))}
            </div>
        )}
        </div>
      </div>
      </div>
      
      {/* Fast Scroll Year Scrubber UI */}
      {results.length === 0 && (
          <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 px-2 py-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(168,199,250,0.15)] rounded-l-3xl transition-all duration-300 z-50">
              {ALL_YEARS.map(year => (
                  <button 
                      key={year}
                      onClick={() => document.getElementById(`year-${year}`)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-[13px] font-semibold text-white/60 hover:text-white px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.3] origin-right hover:-translate-x-2"
                  >
                      {year}
                  </button>
              ))}
          </div>
      )}

      {/* Fullscreen Photo Lightbox with Next/Back Navigation */}
      {activeGallery && (
          <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-200">
              {/* Top Controls Bar */}
              <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between text-[#e8eaed] bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none">
                  <div className="pointer-events-auto flex items-center gap-4">
                      <button 
                          onClick={() => setActiveGallery(null)} 
                          className="p-2 rounded-full hover:bg-white/10 transition-colors"
                      >
                          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                      </button>
                      {activeGallery.images[activeGallery.currentIndex].title && (
                          <span className="text-white/80 font-medium text-sm hidden md:block truncate max-w-sm">{activeGallery.images[activeGallery.currentIndex].title}</span>
                      )}
                  </div>
                  <div className="pointer-events-auto flex items-center gap-2">
                      {activeFilter !== 'trash' && (
                          <>
                              <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Share"><span className="material-symbols-outlined text-[20px]">share</span></button>
                              <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Edit"><span className="material-symbols-outlined text-[20px]">tune</span></button>
                              <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Zoom"><span className="material-symbols-outlined text-[20px]">zoom_in</span></button>
                              <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Info"><span className="material-symbols-outlined text-[20px]">info</span></button>
                              <button onClick={() => {
                                  if (userAlbums.length === 0) {
                                      setPhotoToAddAfterAlbumCreation(activeGallery.images[activeGallery.currentIndex].id);
                                      setIsCreateAlbumModalOpen(true);
                                  } else {
                                      setPhotoToAddToAlbum(activeGallery.images[activeGallery.currentIndex].id);
                                      setIsSelectAlbumModalOpen(true);
                                  }
                              }} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Add to Album">
                                  <span className="material-symbols-outlined text-[20px]">library_add</span>
                              </button>
                              <button 
                                  onClick={() => toggleFavorite(activeGallery.images[activeGallery.currentIndex].id)}
                                  className="p-2 rounded-full hover:bg-white/10 transition-colors" 
                                  title={favorites.has(activeGallery.images[activeGallery.currentIndex].id) ? "Unstar" : "Star"}
                              >
                                  <span className={`material-symbols-outlined text-[20px] ${favorites.has(activeGallery.images[activeGallery.currentIndex].id) ? 'text-primary' : ''}`}>
                                      {favorites.has(activeGallery.images[activeGallery.currentIndex].id) ? 'star' : 'star_border'}
                                  </span>
                              </button>
                          </>
                      )}
                      <button 
                          onClick={() => toggleDelete(activeGallery.images[activeGallery.currentIndex].id)}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors" 
                          title={deleted.has(activeGallery.images[activeGallery.currentIndex].id) ? "Restore" : "Delete"}
                      >
                          <span className={`material-symbols-outlined text-[20px] ${deleted.has(activeGallery.images[activeGallery.currentIndex].id) ? 'text-error' : ''}`}>
                              {deleted.has(activeGallery.images[activeGallery.currentIndex].id) ? 'restore_from_trash' : 'delete'}
                          </span>
                      </button>
                  </div>
              </div>
              
              {/* Invisible Click Zones for Navigation & Chevrons */}
              <div className="absolute inset-y-0 left-0 w-1/4 z-10 flex items-center justify-start px-4 cursor-pointer" onClick={() => setActiveGallery(prev => prev && prev.currentIndex > 0 ? { ...prev, currentIndex: prev.currentIndex - 1 } : prev)}>
                  <button className={`w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center transition-opacity backdrop-blur-md ${activeGallery.currentIndex > 0 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="material-symbols-outlined">navigate_before</span>
                  </button>
              </div>
              <div className="absolute inset-y-0 right-0 w-1/4 z-10 flex items-center justify-end px-4 cursor-pointer" onClick={() => setActiveGallery(prev => prev && prev.currentIndex < prev.images.length - 1 ? { ...prev, currentIndex: prev.currentIndex + 1 } : prev)}>
                  <button className={`w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center transition-opacity backdrop-blur-md ${activeGallery.currentIndex < activeGallery.images.length - 1 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="material-symbols-outlined">navigate_next</span>
                  </button>
              </div>

              {/* The Image (Forced to scale via flex-1 and object-contain) */}
              <div className="flex-1 w-full h-full flex items-center justify-center pt-16 pb-4 px-12 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                      key={activeGallery.currentIndex}
                      src={activeGallery.images[activeGallery.currentIndex].url} 
                      alt={activeGallery.images[activeGallery.currentIndex].title || "Fullscreen view"} 
                      className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in duration-300" 
                  />
              </div>
          </div>
      )}

      {/* Stories UI for Highlights */}
      {activeStory && (
          <div className="fixed inset-0 z-[110] bg-black flex flex-col animate-in slide-in-from-bottom-8 duration-300">
              {/* Top Segmented Progress Bars & Header */}
              <div className="absolute top-0 left-0 right-0 p-4 pt-6 bg-gradient-to-b from-black/80 to-transparent z-20 flex flex-col gap-3 pointer-events-none">
                  <div className="flex items-center gap-1.5 w-full max-w-3xl mx-auto">
                      {activeStory.images.map((_, i) => (
                          <div key={i} className="h-1 rounded-full flex-1 bg-white/30 overflow-hidden relative">
                              <div className={`absolute inset-y-0 left-0 bg-white ${i < activeStory.currentIndex ? 'w-full' : i === activeStory.currentIndex ? (!activeStory.isPaused ? 'w-full animate-[progress_3s_linear]' : 'w-[50%]') : 'w-0'}`}></div>
                          </div>
                      ))}
                  </div>
                  <div className="flex items-center justify-between w-full max-w-3xl mx-auto text-white pointer-events-auto">
                      <div className="flex items-center gap-3">
                          <button onClick={() => setActiveStory(null)} className="p-1 rounded-full hover:bg-white/20 transition-colors">
                              <span className="material-symbols-outlined">close</span>
                          </button>
                          <h2 className="font-headline-sm text-headline-sm font-medium drop-shadow-md">{activeStory.title}</h2>
                      </div>
                      <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); setActiveStory(prev => prev ? { ...prev, isPaused: !prev.isPaused } : null); }} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                              <span className="material-symbols-outlined">{activeStory.isPaused ? 'play_arrow' : 'pause'}</span>
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setActiveStory(prev => prev ? { ...prev, isMuted: !prev.isMuted } : null); }} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                              <span className="material-symbols-outlined">{activeStory.isMuted ? 'volume_off' : 'volume_up'}</span>
                          </button>
                      </div>
                  </div>
              </div>
              
              {/* Tap Zones for Navigation with Visual Arrows */}
              <div className="absolute inset-y-0 left-0 w-1/3 z-10 flex items-center justify-start px-6 cursor-pointer" onClick={() => setActiveStory(prev => prev && prev.currentIndex > 0 ? { ...prev, currentIndex: prev.currentIndex - 1 } : prev)}>
                  <button className={`w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center transition-opacity backdrop-blur-md ${activeStory.currentIndex > 0 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="material-symbols-outlined">navigate_before</span>
                  </button>
              </div>
              <div className="absolute inset-y-0 right-0 w-1/3 z-10 flex items-center justify-end px-6 cursor-pointer" onClick={() => setActiveStory(prev => prev && prev.currentIndex < prev.images.length - 1 ? { ...prev, currentIndex: prev.currentIndex + 1 } : null)}>
                  <button className={`w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center transition-opacity backdrop-blur-md ${activeStory.currentIndex < activeStory.images.length - 1 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="material-symbols-outlined">navigate_next</span>
                  </button>
              </div>

              <div className="flex-1 w-full h-full bg-black relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                      key={activeStory.currentIndex}
                      src={activeStory.images[activeStory.currentIndex].url} 
                      className="absolute inset-0 w-full h-full object-cover sm:object-contain animate-in fade-in duration-300" 
                      alt="Story content"
                  />
              </div>
          </div>
      )}

      {/* Inline styles for the progress animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}} />

      {/* Developer Debug Panel */}


      {/* Create Album Modal */}
      {isCreateAlbumModalOpen && (
          <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-surface-container-high w-full max-w-md rounded-3xl p-6 shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200">
                  <h3 className="text-2xl font-headline-sm text-white mb-4">Create New Album</h3>
                  <input
                      autoFocus
                      type="text"
                      placeholder="Album title"
                      className="w-full bg-surface-container border border-outline-variant/30 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary mb-6 text-lg"
                      value={albumNameToCreate}
                      onChange={e => setAlbumNameToCreate(e.target.value)}
                  />
                  <div className="flex justify-end gap-3">
                      <button onClick={() => { setIsCreateAlbumModalOpen(false); setPhotoToAddAfterAlbumCreation(null); setAlbumNameToCreate(''); }} className="px-5 py-2.5 rounded-full hover:bg-white/10 text-white font-medium transition-colors">Cancel</button>
                      <button onClick={() => {
                          if (!albumNameToCreate.trim()) return;
                          const newAlbumId = `album_${Date.now()}`;
                          const initialPhotos = new Set<string>();
                          if (photoToAddAfterAlbumCreation) initialPhotos.add(photoToAddAfterAlbumCreation);
                          setUserAlbums(prev => [...prev, { id: newAlbumId, title: albumNameToCreate.trim(), photoIds: initialPhotos }]);
                          setIsCreateAlbumModalOpen(false);
                          setAlbumNameToCreate('');
                          setPhotoToAddAfterAlbumCreation(null);
                      }} className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-medium transition-colors disabled:opacity-50" disabled={!albumNameToCreate.trim()}>
                          Create
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Select Album Modal */}
      {isSelectAlbumModalOpen && (
          <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-surface-container-high w-full max-w-md rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-headline-sm text-white">Add to Album</h3>
                      <button onClick={() => { setIsSelectAlbumModalOpen(false); setPhotoToAddToAlbum(null); }} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                          <span className="material-symbols-outlined text-[20px]">close</span>
                      </button>
                  </div>
                  <div className="overflow-y-auto flex-1 flex flex-col gap-2 mb-4">
                      {userAlbums.map(album => (
                          <button key={album.id} onClick={() => {
                              if (photoToAddToAlbum) {
                                  setUserAlbums(prev => prev.map(a => a.id === album.id ? { ...a, photoIds: new Set([...a.photoIds, photoToAddToAlbum]) } : a));
                              }
                              setIsSelectAlbumModalOpen(false);
                              setPhotoToAddToAlbum(null);
                          }} className="w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group">
                              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">photo_library</span>
                              <span className="text-white font-medium">{album.title}</span>
                          </button>
                      ))}
                  </div>
                  <button onClick={() => {
                      setIsSelectAlbumModalOpen(false);
                      setPhotoToAddAfterAlbumCreation(photoToAddToAlbum);
                      setIsCreateAlbumModalOpen(true);
                  }} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors">
                      <span className="material-symbols-outlined text-[20px]">add</span>
                      New Album
                  </button>
              </div>
          </div>
      )}
    </>
  );
}
