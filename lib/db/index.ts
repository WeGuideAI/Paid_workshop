import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export const getConnectionString = () =>
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.STORAGE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  "";

let cachedClient: NeonQueryFunction<false, false> | null = null;

function getClient(): NeonQueryFunction<false, false> {
  const connStr = getConnectionString();
  if (!connStr) {
    throw new Error(
      "No database connection string provided. Please set DATABASE_URL, POSTGRES_URL, or STORAGE_URL."
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
