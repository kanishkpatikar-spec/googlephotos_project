import { z } from "zod";

export const SourceMetadataSchema = z.object({
  sourceId: z.string().min(1, "Source is required"),
  url: z.string().url().optional().or(z.literal("")),
  date: z.string().optional(),
});

export type SourceMetadata = z.infer<typeof SourceMetadataSchema>;
