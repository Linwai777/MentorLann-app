import { existsSync } from "node:fs";
import { defineConfig, env } from "prisma/config";

// Settings for the Prisma CLI (migrate, generate, studio).
//
// Load the secrets from .env.local with Node's built-in loader (Node 21+),
// so we do not need the "dotenv" package. On a host like Vercel the file
// does not exist; the variables come from the host settings instead.
if (existsSync(".env.local")) process.loadEnvFile(".env.local");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    // DIRECT_URL = Supabase Session pooler (port 5432). Migrations need one
    // steady connection; the Transaction pooler (6543) cannot do that.
    url: env("DIRECT_URL"),
  },
});
