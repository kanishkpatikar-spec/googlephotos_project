import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// This will default to localhost if not provided, allowing local dev
const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/googlepics";

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });
