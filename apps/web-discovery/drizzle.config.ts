import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./lib/database/migrations",
  schema: "./lib/database/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "file:./data/app.db",
  },
});
