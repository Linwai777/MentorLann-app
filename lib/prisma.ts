import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

// One shared Prisma Client for the whole app (server code only).
//
// The driver adapter connects Prisma to Postgres through the "pg" driver.
// DATABASE_URL = Supabase Transaction pooler (port 6543, ?pgbouncer=true):
// many short requests share a few database connections.
function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaClient({ adapter });
}

// Why the globalThis trick: while developing, Next.js reloads changed files
// many times. Without it, every reload would create a NEW client with its
// own connections, and the database would soon run out of connections.
// So in development we keep one client on globalThis and reuse it.
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
