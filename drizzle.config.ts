import { defineConfig } from "drizzle-kit";
const DB_url = process.env.DB_url as string;
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema/schema.ts",
  out: "./src/database/migration",
  dbCredentials: {
    url: DB_url,
  },
  verbose: true,
  strict: true,
});
