import { pgTable, text, integer, real, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ────────────────────────────────────────────────
// Photo Indexing Tables
// ────────────────────────────────────────────────
export const photoAssets = pgTable("photo_assets", {
  id: text("id").primaryKey(),
  filepath: text("filepath").notNull(),
});

export const photoMetadata = pgTable("photo_metadata", {
  id: text("id").primaryKey(),
  assetId: text("asset_id").references(() => photoAssets.id),
});

export const photoEmbeddings = pgTable("photo_embeddings", {
  id: text("id").primaryKey(),
  assetId: text("asset_id").references(() => photoAssets.id),
});

export const evidenceItems = pgTable("evidence_items", {
  id: text("id").primaryKey(),
  sourceId: text("source_id"),
});

// ────────────────────────────────────────────────
// Core Discovery Tables
// ────────────────────────────────────────────────

export const sources = pgTable("sources", {
  id: text("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rawEvidence = pgTable("raw_evidence", {
  id: uuid("id").primaryKey().defaultRandom(),
  sourcePlatform: text("source_platform"),
  author: text("author"),
  sourceUrl: text("source_url"),
  rawStatement: text("raw_statement").notNull(),
  publishedAt: timestamp("published_at"),
  processed: boolean("processed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const evidenceRecords = pgTable("evidence_records", {
  id: text("id").primaryKey(),
  sourceId: text("source_id").references(() => sources.id, { onDelete: "cascade" }),
  originalText: text("original_text").notNull(),
  relevance: text("relevance").notNull().default("relevant"), // relevant, possibly relevant, irrelevant
  confidence: real("confidence"),
  dataMode: text("data_mode").notNull().default("demo"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const retrievalTargets = pgTable("retrieval_targets", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id, { onDelete: "cascade" }),
  mediaType: text("media_type"), // photo, video, document, screenshot
  category: text("category"), // travel, medical, pet, etc.
  description: text("description"),
});

export const memoryClues = pgTable("memory_clues", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id, { onDelete: "cascade" }),
  clueType: text("clue_type").notNull(), // explicit, visual, episodic, relational, fuzzy, purpose, emotional
  clueValue: text("clue_value").notNull(),
  isInferred: boolean("is_inferred").default(false),
  confidence: real("confidence"),
});

export const forgottenInformation = pgTable("forgotten_information", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id, { onDelete: "cascade" }),
  informationType: text("information_type").notNull(), // exact date, exact location, name, etc.
});

export const searchAttempts = pgTable("search_attempts", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id, { onDelete: "cascade" }),
  stepNumber: integer("step_number").notNull(),
  query: text("query"),
  action: text("action"), // e.g. "search", "scroll", "filter"
  result: text("result"),
});

export const failureModes = pgTable("failure_modes", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 15-category taxonomy
  confidence: real("confidence"),
});

export const workarounds = pgTable("workarounds", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // e.g., "manual scroll", "give up"
});

export const outcomes = pgTable("outcomes", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id, { onDelete: "cascade" }),
  status: text("status").notNull(), // success, partial, fail, unknown
  abandoned: boolean("abandoned").default(false),
  timeIfKnown: text("time_if_known"),
});

// ────────────────────────────────────────────────
// Analysis Tables
// ────────────────────────────────────────────────

export const clusters = pgTable("clusters", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  severity: text("severity"),
  evidenceCount: integer("evidence_count").default(0),
});

export const clusterMemberships = pgTable("cluster_memberships", {
  id: text("id").primaryKey(),
  clusterId: text("cluster_id").notNull().references(() => clusters.id, { onDelete: "cascade" }),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id, { onDelete: "cascade" }),
});

export const savedInsights = pgTable("saved_insights", {
  id: text("id").primaryKey(),
  statement: text("statement").notNull(),
  confidence: text("confidence"), // High, Medium, Low
  notes: text("notes"),
  evidenceIds: text("evidence_ids"), // comma separated string for simplicity in MVP
  contradictoryEvidenceIds: text("contradictory_evidence_ids"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// We can safely add embeddings via raw SQL if pgvector is enabled, but for MVP we will keep it simple.
// export const embeddings = pgTable("embeddings", {
//   recordId: text("record_id").references(() => evidenceRecords.id),
//   vector: ... (requires pgvector)
// });

// ────────────────────────────────────────────────
// Relations
// ────────────────────────────────────────────────

export const sourcesRelations = relations(sources, ({ many }) => ({
  records: many(evidenceRecords),
}));

export const evidenceRecordsRelations = relations(evidenceRecords, ({ one, many }) => ({
  source: one(sources, { fields: [evidenceRecords.sourceId], references: [sources.id] }),
  targets: many(retrievalTargets),
  memoryClues: many(memoryClues),
  forgottenInfo: many(forgottenInformation),
  searchAttempts: many(searchAttempts),
  failureModes: many(failureModes),
  workarounds: many(workarounds),
  outcomes: many(outcomes),
  clusterMemberships: many(clusterMemberships),
}));

export const clustersRelations = relations(clusters, ({ many }) => ({
  memberships: many(clusterMemberships),
}));
