import { db, evidenceRecords, memoryClues, forgottenInformation, failureModes, searchAttempts, workarounds } from "@/lib/database/client";
import { sql, eq } from "drizzle-orm";
import { Suspense } from "react";
import { RunPipelineButton } from "@/components/RunPipelineButton";

// Server Action to fetch metrics
async function fetchMetrics() {
  const [totalRes, relevantRes, sourcesRes, modesRes] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(evidenceRecords),
    db.select({ count: sql<number>`count(*)::int` }).from(evidenceRecords).where(eq(evidenceRecords.relevance, 'relevant')),
    db.select({ count: sql<number>`count(distinct ${evidenceRecords.sourceId})::int` }).from(evidenceRecords),
    db.select({ count: sql<number>`count(distinct ${failureModes.type})::int` }).from(failureModes)
  ]);
  
  return {
    total: totalRes[0]?.count || 0,
    relevant: relevantRes[0]?.count || 0,
    sources: sourcesRes[0]?.count || 0,
    distinctProblems: modesRes[0]?.count || 0
  };
}

async function fetchMemoryMatrix() {
  const allClues = await db.select().from(memoryClues);
  
  const clueMap = new Map();
  allClues.forEach(c => {
    if (!clueMap.has(c.clueType)) clueMap.set(c.clueType, { type: c.clueType, count: 0, examples: new Set() });
    const entry = clueMap.get(c.clueType);
    entry.count++;
    if (c.clueValue && entry.examples.size < 3) {
      entry.examples.add(c.clueValue);
    }
  });
  
  const remembered = Array.from(clueMap.values())
    .map(e => ({ ...e, examples: Array.from(e.examples) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const allForgot = await db.select().from(forgottenInformation);
  const forgotMap = new Map();
  allForgot.forEach(f => {
    if (!forgotMap.has(f.informationType)) forgotMap.set(f.informationType, { type: f.informationType, count: 0 });
    forgotMap.get(f.informationType).count++;
  });
  
  const forgotten = Array.from(forgotMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return { remembered, forgotten };
}

async function fetchFailureFunnel() {
  const modes = await db.select({ type: failureModes.type, count: sql<number>`count(*)::int` })
    .from(failureModes)
    .groupBy(failureModes.type)
    .orderBy(sql`count(*) DESC`);
  return modes;
}

async function fetchWorkarounds() {
  const wa = await db.select({ type: workarounds.type, count: sql<number>`count(*)::int` })
    .from(workarounds)
    .groupBy(workarounds.type)
    .orderBy(sql`count(*) DESC`)
    .limit(5);
  return wa;
}

const getRememberedDescription = (type: string) => {
  switch (type.toLowerCase()) {
    case 'fuzzy': return 'Abstract concepts, feelings, or vague visual vibes';
    case 'visual': return 'Colors, shapes, lighting, or overall aesthetics';
    case 'object': return 'Specific physical items or animals in the frame';
    case 'episodic': return 'Events, actions, or the story behind the photo';
    case 'purpose': return 'The reason the photo was originally taken';
    case 'relational': return 'Spatial or social relationships between subjects';
    case 'emotional': return 'The mood or emotion conveyed in the photo';
    case 'explicit': return 'Exact text, labels, or recognizable signs';
    default: return 'Details remembered about the photo';
  }
}

const getForgottenDescription = (type: string) => {
  switch (type.toLowerCase()) {
    case 'exact date': return 'The specific day, month, or year of capture';
    case 'exact location': return 'The specific city, venue, or address';
    case 'text in screenshot': return 'The exact wording contained in a screenshot';
    case 'people present': return 'Identities or names of people in the frame';
    case 'restaurant name': return 'The specific name of a dining establishment';
    case 'file type': return 'Whether the file was a photo, video, or document';
    default: return 'Information that users typically fail to recall';
  }
}

export default async function DiscoveryDashboard() {
  const [metrics, memory, failures, workaroundsData] = await Promise.all([
    fetchMetrics(),
    fetchMemoryMatrix(),
    fetchFailureFunnel(),
    fetchWorkarounds()
  ]);

  return (
    <div className="max-w-[1200px] mx-auto px-gutter py-8 space-y-12 pb-32">
      
      {/* SECTION 1 - Header */}
      <section className="text-center space-y-2">
        <h1 className="font-display-md text-display-md text-on-surface">Photo Retrieval Discovery Engine</h1>
        <p className="font-headline-sm text-headline-sm text-on-surface-variant font-normal">
          Understand why people fail to find photos they remember.
        </p>
        <p className="text-on-surface-variant/70 text-sm mt-4">
          AI analysis of public conversations about remembered-but-hard-to-find photos.
          <br/>
          Sources: Reddit · Google Play · Forums · Twitter (X) · YouTube · App Store
        </p>
        <div className="pt-4">
          <RunPipelineButton />
        </div>
      </section>

      {/* SECTION 2 - Dataset Summary */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Conversations Analyzed", value: metrics.total, color: "cyan" },
          { label: "Relevant Attempts", value: metrics.relevant, color: "emerald" },
          { label: "Data Sources", value: metrics.sources, color: "fuchsia" },
          { label: "Distinct Problems", value: metrics.distinctProblems, color: "amber" }
        ].map(m => {
          const styles = {
            cyan: { 
              border: "border-white/5 border-l-cyan-400/50", 
              text: "text-cyan-400", 
              shadow: "shadow-[inset_15px_0_30px_-15px_rgba(34,211,238,0.15),0_15px_30px_-15px_rgba(34,211,238,0.2)]",
              hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(34,211,238,0.25),0_25px_40px_-20px_rgba(34,211,238,0.4)] border-l-cyan-400"
            },
            emerald: { 
              border: "border-white/5 border-l-emerald-400/50", 
              text: "text-emerald-400", 
              shadow: "shadow-[inset_15px_0_30px_-15px_rgba(52,211,153,0.15),0_15px_30px_-15px_rgba(52,211,153,0.2)]",
              hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(52,211,153,0.25),0_25px_40px_-20px_rgba(52,211,153,0.4)] border-l-emerald-400"
            },
            fuchsia: { 
              border: "border-white/5 border-l-fuchsia-400/50", 
              text: "text-fuchsia-400", 
              shadow: "shadow-[inset_15px_0_30px_-15px_rgba(232,121,249,0.15),0_15px_30px_-15px_rgba(232,121,249,0.2)]",
              hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(232,121,249,0.25),0_25px_40px_-20px_rgba(232,121,249,0.4)] border-l-fuchsia-400"
            },
            amber: { 
              border: "border-white/5 border-l-amber-400/50", 
              text: "text-amber-400", 
              shadow: "shadow-[inset_15px_0_30px_-15px_rgba(251,191,36,0.15),0_15px_30px_-15px_rgba(251,191,36,0.2)]",
              hover: "hover:shadow-[inset_25px_0_40px_-20px_rgba(251,191,36,0.25),0_25px_40px_-20px_rgba(251,191,36,0.4)] border-l-amber-400"
            }
          }[m.color as "cyan" | "emerald" | "fuchsia" | "amber"];

          return (
            <div key={m.label} className={`relative bg-black/40 backdrop-blur-2xl p-6 rounded-2xl border-y border-r border-l-2 ${styles.border} ${styles.shadow} ${styles.hover} flex flex-col items-center justify-center text-center group transition-all duration-500 hover:-translate-y-1`}>
              <span className={`text-4xl font-light mb-2 relative z-10 ${styles.text}`}>{m.value}</span>
              <span className="font-label-sm uppercase tracking-wider text-on-surface-variant relative z-10">{m.label}</span>
            </div>
          )
        })}
      </section>

      {/* SECTION 3 - What Users Remember vs Forget */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="font-headline-md text-headline-md text-on-surface">What Users Remember vs Forget</h2>
          <p className="text-on-surface-variant mt-2 max-w-2xl mx-auto">
            When standard search fails, what information actually remains in human memory compared to what is missing?
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">psychology</span>
              <h3 className="font-headline-sm text-headline-sm">Users Remember</h3>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {memory.remembered.map((item) => (
                <div key={item.type} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 group hover:bg-white/10 transition-colors items-center">
                  <div className="flex-shrink-0">
                    <span className="material-symbols-outlined text-primary/60 text-[24px]">psychology</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-headline-sm text-primary capitalize tracking-tight text-[15px]">{item.type}</h4>
                      <span className="text-xs text-on-surface-variant/90 px-2 py-0.5 bg-white/5 border border-white/10 rounded-md font-medium tracking-wide">
                        {Math.round((item.count / Math.max(1, metrics.relevant))*100)}%
                      </span>
                    </div>
                    <p className="text-[13px] text-on-surface-variant/90 leading-snug mb-2">{getRememberedDescription(item.type)}</p>
                    <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary/50 rounded-full" style={{ width: `${Math.round((item.count / Math.max(1, metrics.relevant))*100)}%` }}></div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-2xl font-mono text-white font-light pl-4 border-l border-white/10">
                    {String(item.count).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="material-symbols-outlined text-error">cloud_off</span>
              <h3 className="font-headline-sm text-headline-sm">Users Forget</h3>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {memory.forgotten.map((item) => (
                <div key={item.type} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 group hover:bg-white/10 transition-colors items-center">
                  <div className="flex-shrink-0">
                    <span className="material-symbols-outlined text-error/60 text-[24px]">cloud_off</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-headline-sm text-error capitalize tracking-tight text-[15px]">{item.type}</h4>
                      <span className="text-xs text-on-surface-variant/90 px-2 py-0.5 bg-white/5 border border-white/10 rounded-md font-medium tracking-wide">
                        {Math.round((item.count / Math.max(1, metrics.relevant))*100)}%
                      </span>
                    </div>
                    <p className="text-[13px] text-on-surface-variant/90 leading-snug mb-2">{getForgottenDescription(item.type)}</p>
                    <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-error/50 rounded-full" style={{ width: `${Math.round((item.count / Math.max(1, metrics.relevant))*100)}%` }}></div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-2xl font-mono text-white font-light pl-4 border-l border-white/10">
                    {String(item.count).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - Retrieval Journey Breakdown (Funnel) */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="font-headline-md text-headline-md text-on-surface">Where Retrieval Fails</h2>
          <p className="text-on-surface-variant mt-2 max-w-2xl mx-auto">
            The distribution of failure modes across the retrieval journey.
          </p>
        </div>
        <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl p-10 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.6)] relative overflow-hidden">
           {/* Subtle background glow */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none"></div>
           
           <div className="space-y-6 relative z-10">
              {failures.map((f, i) => (
                <div key={f.type} className="flex items-center gap-6 group">
                  <div className="w-[200px] text-right font-title-sm capitalize text-white/70 group-hover:text-white transition-colors duration-300 tracking-wide text-sm">
                    {f.type}
                  </div>
                  <div className="flex-1 flex items-center gap-5">
                    {/* Track Background */}
                    <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      {/* Gradient Fill with Glow */}
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full relative transition-all duration-1000 group-hover:brightness-125" 
                        style={{ 
                          width: `${Math.max(2, (f.count / Math.max(1, metrics.relevant)) * 100)}%`,
                          boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)'
                        }}
                      >
                         {/* Shimmer effect for top items */}
                         {i < 3 && (
                           <div className="absolute inset-0 w-full animate-[pulse_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                         )}
                      </div>
                    </div>
                    {/* Metrics */}
                    <div className="w-24 flex items-baseline gap-1.5">
                       <span className="text-2xl font-mono font-light text-white group-hover:text-indigo-400 transition-colors duration-300">{String(f.count).padStart(2, '0')}</span>
                       <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Sessions</span>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* SECTION 5 - Top Retrieval Problems (Clusters) */}
      <section className="space-y-6">
         <div className="text-center">
          <h2 className="font-headline-md text-headline-md text-on-surface">Top Retrieval Problems</h2>
          <p className="text-on-surface-variant mt-2">Emergent patterns identified by AI across all conversations.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative bg-black/40 backdrop-blur-2xl p-6 rounded-2xl border-y border-r border-l-2 border-white/5 border-l-error/50 shadow-[inset_15px_0_30px_-15px_rgba(244,63,94,0.15),0_15px_30px_-15px_rgba(244,63,94,0.2)] hover:shadow-[inset_25px_0_40px_-20px_rgba(244,63,94,0.25),0_25px_40px_-20px_rgba(244,63,94,0.4)] hover:border-l-error group transition-all duration-500 hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-start mb-2 relative z-10">
              <h3 className="font-headline-sm">Context without exact metadata</h3>
              <span className="bg-error/10 text-error px-2 py-1 rounded-md text-xs font-mono">Top Issue</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-4 relative z-10">Users remember the event or surrounding situation but not exact searchable details like date or place name.</p>
            <div className="flex gap-4 text-xs relative z-10">
              <div><strong className="text-on-surface">Common Remembered:</strong> <span className="text-on-surface-variant">Trip, Purpose</span></div>
              <div><strong className="text-on-surface">Common Forgotten:</strong> <span className="text-on-surface-variant">Date, Place Name</span></div>
            </div>
          </div>
          
          <div className="relative bg-black/40 backdrop-blur-2xl p-6 rounded-2xl border-y border-r border-l-2 border-white/5 border-l-amber-400/50 shadow-[inset_15px_0_30px_-15px_rgba(251,191,36,0.15),0_15px_30px_-15px_rgba(251,191,36,0.2)] hover:shadow-[inset_25px_0_40px_-20px_rgba(251,191,36,0.25),0_25px_40px_-20px_rgba(251,191,36,0.4)] hover:border-l-amber-400 group transition-all duration-500 hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-start mb-2 relative z-10">
              <h3 className="font-headline-sm">Vocabulary Mismatch</h3>
              <span className="bg-amber-400/10 text-amber-400 px-2 py-1 rounded-md text-xs font-mono">Frequent</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-4 relative z-10">Search expects literal terms (e.g., airplane) but user queries by purpose (e.g., ticket booking reference).</p>
            <div className="flex gap-4 text-xs relative z-10">
              <div><strong className="text-on-surface">Common Remembered:</strong> <span className="text-on-surface-variant">Purpose, Object</span></div>
              <div><strong className="text-on-surface">Common Forgotten:</strong> <span className="text-on-surface-variant">Literal Visual text</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7 - User Search Behaviour & Workarounds */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-4">
          <h2 className="font-headline-md text-on-surface text-center">Post-Failure Behaviour</h2>
          <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-sm flex flex-col items-center justify-center flex-1">
            <div className="flex flex-col items-center space-y-2 w-full">
              <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-label-md border border-primary/20 w-3/4 text-center">Initial Search Fails</div>
              <span className="material-symbols-outlined text-on-surface-variant">arrow_downward</span>
              <div className="px-4 py-2 bg-surface-container text-on-surface rounded-lg font-label-md w-3/4 text-center">Refine Query (Usually fails again)</div>
              <span className="material-symbols-outlined text-on-surface-variant">arrow_downward</span>
              <div className="px-4 py-2 bg-surface-container-high text-on-surface rounded-lg font-label-md w-3/4 text-center">Resort to Workarounds</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <h2 className="font-headline-md text-on-surface text-center">Common Workarounds</h2>
          <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-sm space-y-4 flex-1">
             {workaroundsData.map(w => (
               <div key={w.type} className="flex items-center gap-4 border-b border-white/5 py-3 first:pt-0 last:border-0 last:pb-0">
                 <span className="font-label-md capitalize text-on-surface w-40 shrink-0">{w.type}</span>
                 <div className="flex-1 h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                   <div className="h-full bg-secondary/80 rounded-full" style={{ width: `${(w.count / Math.max(1, metrics.relevant)) * 100}%` }}/>
                 </div>
                 <span className="text-2xl text-white font-mono font-light w-10 text-right shrink-0">{String(w.count).padStart(2, '0')}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - Opportunity Areas & Findings */}
      <section className="flex flex-col">
        <div className="text-center mb-10">
          <h2 className="font-headline-md text-on-surface">Opportunity Areas</h2>
        </div>
        
        <div className="overflow-x-auto rounded-xl border border-white/10 shadow-sm mb-10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 backdrop-blur-2xl text-on-surface-variant font-label-md uppercase">
              <tr>
                <th className="px-4 py-3">Opportunity</th>
                <th className="px-4 py-3">Evidence</th>
                <th className="px-4 py-3">Failure Severity</th>
                <th className="px-4 py-3">AI Leverage</th>
              </tr>
            </thead>
            <tbody className="bg-white/5 backdrop-blur-2xl divide-y divide-surface-container text-on-surface">
              <tr className="hover:bg-surface-container/30">
                <td className="px-4 py-4 font-medium">Translating episodic context into searchable clues</td>
                <td className="px-4 py-4"><span className="bg-surface-container-high px-2 py-1 rounded">High</span></td>
                <td className="px-4 py-4">High (Leads to abandonment)</td>
                <td className="px-4 py-4 text-primary">Very High (AI excels at language context)</td>
              </tr>
              <tr className="hover:bg-surface-container/30">
                <td className="px-4 py-4 font-medium">Fuzzy temporal resolution</td>
                <td className="px-4 py-4"><span className="bg-surface-container-high px-2 py-1 rounded">Medium</span></td>
                <td className="px-4 py-4">Medium (Workaround is scrolling)</td>
                <td className="px-4 py-4 text-primary">High (AI handles fuzzy timelines well)</td>
              </tr>
              <tr className="hover:bg-surface-container/30">
                <td className="px-4 py-4 font-medium">Bridging literal objects to abstract purposes</td>
                <td className="px-4 py-4"><span className="bg-surface-container-high px-2 py-1 rounded">High</span></td>
                <td className="px-4 py-4">High</td>
                <td className="px-4 py-4 text-primary">High (AI is great at analyzing images)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
            <h2 className="font-headline-md text-primary mb-6">What the evidence is telling us</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-label-lg font-semibold text-on-surface mb-2">1. Episodic over Explicit</h3>
                <p className="text-sm text-on-surface-variant mb-3">Users often remember the situation surrounding a photo more clearly than the exact searchable metadata.</p>
                <div className="bg-white/5 backdrop-blur-2xl p-4 rounded-lg border border-surface-container text-xs italic text-on-surface-variant">
                  "I remember taking it while I was sick last winter, but I don't remember the medicine name..."
                </div>
              </div>
              <div>
                <h3 className="font-label-lg font-semibold text-on-surface mb-2">2. Purpose vs Content</h3>
                <p className="text-sm text-on-surface-variant mb-2">Users search for the *reason* a photo was taken (e.g. 'booking reference'), but systems index the literal content (e.g. 'text', 'barcode').</p>
              </div>
            </div>
          </div>

          <div className="relative bg-tertiary/5 p-8 rounded-3xl border border-tertiary/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <h2 className="font-headline-md text-tertiary mb-4 relative z-10">The Solution: Lumina AI</h2>
            <p className="text-sm text-on-surface-variant mb-6 relative z-10 leading-relaxed">
              The data proves that standard search fails when we forget literal keywords. 
              <strong> Lumina MVP</strong> is built to solve this exact problem, bridging the gap between how human memory works and how our photos are actually searched.
            </p>
            
            <div className="space-y-4 relative z-10">
               <div className="bg-white/5 backdrop-blur-2xl p-4 rounded-xl border border-surface-container">
                <h3 className="font-label-lg font-semibold text-on-surface mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">psychology</span>
                  Episodic Timeline Bounding
                </h3>
                <p className="text-xs text-on-surface-variant">Can't remember the date? Lumina reconstructs your chronological memory. Find photos by what happened around them—e.g., <em>"After the beach, but before dinner."</em></p>
              </div>
              <div className="bg-white/5 backdrop-blur-2xl p-4 rounded-xl border border-surface-container">
                <h3 className="font-label-lg font-semibold text-on-surface mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">auto_awesome</span>
                  False Memory Tolerance
                </h3>
                <p className="text-xs text-on-surface-variant">Human memory is flawed. When you misremember a detail, Lumina doesn't give you zero results. It detects conflicting clues and gracefully surfaces the best partial matches.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
