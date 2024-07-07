import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema/schema.ts",
  out: "./src/database/migration",
  dbCredentials: {
    url: process.env.DB_url as string,
  },
  verbose: true,
  strict: true,
});
