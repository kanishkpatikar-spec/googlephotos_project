import { db } from "./client";
import { 
  evidenceItems, 
  evidenceSources, 
  interviews, 
  participants, 
  retrievalTasks, 
  risks, 
  metricTreeNodes 
} from "./schema";
import fs from "fs/promises";
import path from "path";
import { generateId, nowISO } from "../utils/ids";
import { MetricNode } from "@/app/metrics/page";

// Helper to read JSON
async function readJson(filename: string) {
  const filePath = path.join(process.cwd(), "data", "seed", filename);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

// Flatten tree logic matching the API route
function flattenTree(node: MetricNode, parentId: string | null = null, sortOrder: number = 0): any[] {
  const flattenedNode = {
    id: node.id,
    parentId,
    label: node.label,
    description: node.description || null,
    sortOrder,
    isExpanded: node.isExpanded,
    isValidated: node.isValidated,
  };
  const children = node.children.flatMap((child, index) =>
    flattenTree(child, node.id, index)
  );
  return [flattenedNode, ...children];
}

export async function runSeed() {
  console.log("🌱 Starting database seed...");

  try {
    const evidenceData = await readJson("evidence.json");
    const interviewsData = await readJson("interviews.json");
    const tasksData = await readJson("tasks.json");
    const risksData = await readJson("risks.json");
    const treeData = await readJson("metric-tree.json");

    await db.transaction(async (tx) => {
      // 1. Evidence
      // Create a dummy source first
      const sourceId = "demo_source_1";
      await tx.insert(evidenceSources).values({
        id: sourceId,
        platform: "unknown",
        name: "Demo Seed Import",
        createdAt: new Date().toISOString(),
      }).onConflictDoNothing();

      const evidenceToInsert = evidenceData.map((item: any) => ({
        id: item.id,
        sourceId,
        rawStatement: item.rawStatement,
        isRetrievalRelated: item.isRetrievalRelated,
        dataMode: item.dataMode,
        createdAt: new Date().toISOString(),
      }));

      for (const ev of evidenceToInsert) {
        await tx.insert(evidenceItems).values(ev).onConflictDoNothing();
      }

      // 2. Interviews & Participants
      const participantId = "demo_participant_1";
      await tx.insert(participants).values({
        id: participantId,
        alias: "Demo Participants",
        dataMode: "demo",
        createdAt: new Date().toISOString(),
      }).onConflictDoNothing();

      const interviewsToInsert = interviewsData.map((item: any) => ({
        id: item.id,
        participantId,
        retrievalIncident: item.retrievalIncident,
        initialMemory: item.initialMemory,
        outcome: item.outcome,
        dataMode: item.dataMode,
        createdAt: new Date().toISOString(),
      }));

      for (const iv of interviewsToInsert) {
        await tx.insert(interviews).values(iv).onConflictDoNothing();
      }

      // 3. Tasks
      const tasksToInsert = tasksData.map((item: any) => ({
        id: item.id,
        description: item.description,
        difficulty: item.difficulty,
        dataMode: item.dataMode,
      }));

      for (const task of tasksToInsert) {
        await tx.insert(retrievalTasks).values(task).onConflictDoNothing();
      }

      // 4. Risks
      for (const risk of risksData) {
        await tx.insert(risks).values(risk).onConflictDoNothing();
      }

      // 5. Metric Tree (delete existing and replace)
      const flattenedNodes = flattenTree(treeData);
      await tx.delete(metricTreeNodes);
      await tx.insert(metricTreeNodes).values(flattenedNodes);
    });

    console.log("✅ Seed completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  runSeed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
