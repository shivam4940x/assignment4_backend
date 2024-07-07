import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema/schema";
const sql = neon(process.env.DB_url!);
const db = drizzle(sql, { schema });

export default db;
