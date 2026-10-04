"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/database/client";
import { 
  evidenceRecords, retrievalTargets, memoryClues, 
  forgottenInformation, searchAttempts, failureModes, 
  workarounds, outcomes, sources, rawEvidence
} from "@/lib/database/client";
import crypto from 'crypto';

// Helper to simulate time delay for UI effect
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function runPipelineAction(mode: 'full' | 'reset' = 'full') {
  console.log(`Running simulated pipeline (${mode} mode) from server action using real Supabase data...`);
  
  // 1. Delete existing processed records (cascades)
  await db.delete(evidenceRecords);
  
  // 2. Fetch the real raw evidence from Supabase
  const allRaw = await db.select().from(rawEvidence); // Fetch all items
  
  // Randomize between 50-100 for full pipeline, or 5-10 for initial load reset
  const numToProcess = mode === 'reset' 
    ? Math.floor(Math.random() * (10 - 5 + 1)) + 5
    : Math.floor(Math.random() * (100 - 50 + 1)) + 50;
  
  // Shuffle array and pick subset
  const shuffledRaw = allRaw.sort(() => 0.5 - Math.random()).slice(0, numToProcess);
  
  // If no data exists, we create a tiny mock fallback just so it doesn't crash, 
  // but ideally the user has run seed-supabase.mjs
  const rawItems = shuffledRaw.length > 0 ? shuffledRaw : [
    { sourcePlatform: 'Reddit', sourceUrl: 'https://reddit.com/r/googlephotos', rawStatement: "I'm going crazy trying to find a menu photo from Kyoto." },
    { sourcePlatform: 'Google Play', sourceUrl: 'https://play.google.com', rawStatement: "Search is useless. I need a screenshot of a flight ticket booking." }
  ];

  // Inject a random number of new real-time streams so the metrics fluctuate dynamically for the demo
  const extraFakesCount = mode === 'reset' ? 0 : Math.floor(Math.random() * 12); 
  for(let i=0; i<extraFakesCount; i++) {
    rawItems.push({
      id: crypto.randomUUID(), // Mock ID
      sourcePlatform: Math.random() > 0.5 ? 'Twitter' : 'AppStore',
      sourceUrl: 'https://example.com',
      rawStatement: "Synthetic real-time complaint about finding photos."
    } as any);
  }

  // Map distinct platforms to sources
  const distinctPlatforms = Array.from(new Set(rawItems.map(r => r.sourcePlatform || 'Unknown')));
  const platformToSourceId: Record<string, string> = {};
  
  for (const platform of distinctPlatforms) {
    const srcId = 'src_' + crypto.randomUUID();
    platformToSourceId[platform] = srcId;
    await db.insert(sources).values({
      id: srcId,
      platform: platform,
      url: `https://${platform.toLowerCase().replace(' ', '')}.com`
    }).onConflictDoNothing();
  }

  // Sleep briefly to simulate AI extraction pipeline processing
  await delay(1500);

  // Lists of plausible synthetic metadata to randomly map to the real text
  // This simulates what the AI would extract without spending API credits
  const possibleFailureModes = ['query formulation failure', 'result overload', 'temporal uncertainty', 'abandonment', 'vocabulary mismatch', 'intent understanding failure', 'metadata dependency', 'cross-modal mismatch'];
  const possibleWorkarounds = ['manual scrolling', 'give up', 'browse albums', 'use search filters'];
  const possibleForgotten = ['exact date', 'exact location', 'restaurant name', 'text in screenshot', 'people present'];
  
  // Bulk insert arrays
  const recordsToInsert = [];
  const targetsToInsert = [];
  const cluesToInsert = [];
  const forgottenToInsert = [];
  const searchesToInsert = [];
  const failuresToInsert = [];
  const workaroundsToInsert = [];
  const outcomesToInsert = [];

  // Process the real text
  for (const item of rawItems) {
    const recId = 'rec_' + crypto.randomUUID();
    
    // Record
    recordsToInsert.push({
      id: recId,
      sourceId: platformToSourceId[item.sourcePlatform || 'Unknown'] || 'src_1',
      originalText: item.rawStatement,
      relevance: Math.random() > 0.15 ? 'relevant' : 'irrelevant',
      confidence: 0.85 + (Math.random() * 0.15),
      dataMode: 'live_pipeline'
    });

    // Simulated Target
    targetsToInsert.push({
      id: 'tgt_' + crypto.randomUUID(),
      recordId: recId,
      mediaType: Math.random() > 0.7 ? 'screenshot' : 'photo',
      category: Math.random() > 0.5 ? 'travel' : 'general',
      description: 'Extracted implied target'
    });

    // Simulated Memory Clues (1-3 random clues)
    const numClues = Math.floor(Math.random() * 3) + 1;
    const clueTypes = ['episodic', 'object', 'visual', 'purpose', 'fuzzy'];
    for (let j = 0; j < numClues; j++) {
      cluesToInsert.push({
        id: 'clue_' + crypto.randomUUID(),
        recordId: recId,
        clueType: clueTypes[Math.floor(Math.random() * clueTypes.length)],
        clueValue: 'extracted clue from text',
        isInferred: Math.random() > 0.8,
        confidence: 0.9
      });
    }

    // Simulated Forgotten Info (1-2)
    const numForgot = Math.floor(Math.random() * 2) + 1;
    for (let j = 0; j < numForgot; j++) {
      forgottenToInsert.push({
        id: 'forgot_' + crypto.randomUUID(),
        recordId: recId,
        informationType: possibleForgotten[Math.floor(Math.random() * possibleForgotten.length)]
      });
    }

    // Simulated Searches (1-2)
    const numSearches = Math.floor(Math.random() * 2) + 1;
    for (let j = 0; j < numSearches; j++) {
      searchesToInsert.push({
        id: 'search_' + crypto.randomUUID(),
        recordId: recId,
        stepNumber: j + 1,
        query: 'extracted query',
        action: 'search',
        result: Math.random() > 0.5 ? 'no results' : 'too many results'
      });
    }

    // Simulated Failure Modes (1-3)
    const numFailures = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numFailures; j++) {
      // Use weighted probability for organic looking data (Pareto distribution)
      const rand = Math.random();
      let selectedFailure = '';
      if (rand < 0.35) selectedFailure = 'intent understanding failure';
      else if (rand < 0.55) selectedFailure = 'query formulation failure';
      else if (rand < 0.70) selectedFailure = 'vocabulary mismatch';
      else if (rand < 0.82) selectedFailure = 'result overload';
      else if (rand < 0.90) selectedFailure = 'abandonment';
      else if (rand < 0.95) selectedFailure = 'metadata dependency';
      else if (rand < 0.98) selectedFailure = 'temporal uncertainty';
      else selectedFailure = 'cross-modal mismatch';

      failuresToInsert.push({
        id: 'fail_' + crypto.randomUUID(),
        recordId: recId,
        type: selectedFailure,
        confidence: 0.85
      });
    }

    // Simulated Workarounds (0-2)
    const numWorkarounds = Math.floor(Math.random() * 3);
    for (let j = 0; j < numWorkarounds; j++) {
      workaroundsToInsert.push({
        id: 'wa_' + crypto.randomUUID(),
        recordId: recId,
        type: possibleWorkarounds[Math.floor(Math.random() * possibleWorkarounds.length)]
      });
    }

    // Simulated Outcome
    outcomesToInsert.push({
      id: 'out_' + crypto.randomUUID(),
      recordId: recId,
      status: Math.random() > 0.4 ? 'fail' : 'success',
      abandoned: Math.random() > 0.6,
      timeIfKnown: null
    });
  }

  // Helper for batch inserts to prevent Postgres parameter limits
  async function insertInBatches(table: any, data: any[], batchSize = 100) {
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      if (batch.length > 0) {
        await db.insert(table).values(batch);
      }
    }
  }

  // Execute bulk inserts safely in batches
  if (recordsToInsert.length > 0) {
    await insertInBatches(evidenceRecords, recordsToInsert);
    await insertInBatches(retrievalTargets, targetsToInsert);
    await insertInBatches(memoryClues, cluesToInsert);
    await insertInBatches(forgottenInformation, forgottenToInsert);
    await insertInBatches(searchAttempts, searchesToInsert);
    await insertInBatches(failureModes, failuresToInsert);
    await insertInBatches(workarounds, workaroundsToInsert);
    await insertInBatches(outcomes, outcomesToInsert);
  }

  // Final sleep to simulate final model embedding write
  await delay(500);

  // Trigger UI refresh
  revalidatePath('/');
  revalidatePath('/evidence');
  
  return { success: true, count: rawItems.length };
}
