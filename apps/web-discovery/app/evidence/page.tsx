import { db, evidenceRecords, memoryClues, forgottenInformation, failureModes, searchAttempts } from "@/lib/database/client";
import { sql, eq } from "drizzle-orm";
import JourneyTimeline from "@/components/evidence/journey-timeline";
import EvidenceBrowser from "@/components/evidence/evidence-browser";

async function fetchEvidence() {
  const records = await db.select().from(evidenceRecords).limit(50);
  
  // For MVP: Fetch all related details in parallel and map them (or use relational queries if defined properly)
  // Let's use simple multiple queries for the UI
  const [clues, forgot, fails, searches] = await Promise.all([
    db.select().from(memoryClues),
    db.select().from(forgottenInformation),
    db.select().from(failureModes),
    db.select().from(searchAttempts)
  ]);

  return records.map(r => ({
    ...r,
    clues: clues.filter(c => c.recordId === r.id),
    forgot: forgot.filter(f => f.recordId === r.id),
    fails: fails.filter(f => f.recordId === r.id),
    searches: searches.filter(s => s.recordId === r.id)
  }));
}

export default async function EvidencePage() {
  const data = await fetchEvidence();

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-4rem)] max-w-[1600px] mx-auto overflow-y-auto md:overflow-hidden pb-16 md:pb-0">
      
      {/* LEFT SIDE: Evidence Browser (60%) */}
      <div className="w-full md:w-[60%] h-[60vh] md:h-full border-b md:border-b-0 border-white/10 shrink-0">
        <EvidenceBrowser data={data} />
      </div>
      
      {/* RIGHT SIDE: Interactive Journey Timeline (40%) */}
      <div className="w-full md:w-[40%] h-[70vh] md:h-full bg-surface flex flex-col relative overflow-hidden shrink-0">
        {data.length > 0 ? (
          <JourneyTimeline data={data} />
        ) : (
          <div className="flex items-center justify-center h-full text-on-surface-variant/50 italic">
            Run the analysis pipeline to generate the failure funnel...
          </div>
        )}
      </div>
      
    </div>
  );
}
