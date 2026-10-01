import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export const getConnectionString = (): string => {
  // Explicit common names from Vercel Neon integrations
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.POSTGRES_URL) return process.env.POSTGRES_URL;
  if (process.env.STORAGE_DATABASE_URL) return process.env.STORAGE_DATABASE_URL;
  if (process.env.storage_DATABASE_URL) return process.env.storage_DATABASE_URL;
  if (process.env.STORAGE_POSTGRES_URL) return process.env.STORAGE_POSTGRES_URL;
  if (process.env.storage_POSTGRES_URL) return process.env.storage_POSTGRES_URL;
  if (process.env.STORAGE_URL) return process.env.STORAGE_URL;
  if (process.env.storage_URL) return process.env.storage_URL;
  if (process.env.POSTGRES_PRISMA_URL) return process.env.POSTGRES_PRISMA_URL;

  // Fallback: search all env vars for any postgres connection string
  for (const [key, val] of Object.entries(process.env)) {
    if (
      typeof val === "string" &&
      (val.startsWith("postgres://") || val.startsWith("postgresql://")) &&
      !key.includes("UNPOOLED")
    ) {
      return val;
    }
  }

  return "";
};

let cachedClient: NeonQueryFunction<false, false> | null = null;

function getClient(): NeonQueryFunction<false, false> {
  const connStr = getConnectionString();
  if (!connStr) {
    throw new Error(
      "No database connection string provided. Please set DATABASE_URL, POSTGRES_URL, or STORAGE_DATABASE_URL in Vercel."
    );
  }
  if (!cachedClient) {
    cachedClient = neon(connStr);
  }
  return cachedClient;
}

// Lazy tagged template sql query function
export const sql: NeonQueryFunction<false, false> = ((
  strings: TemplateStringsArray,
  ...values: unknown[]
) => {
  const client = getClient();
  return client(strings, ...values);
}) as unknown as NeonQueryFunction<false, false>;
