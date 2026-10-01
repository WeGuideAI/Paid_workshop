import { Client } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

// Load .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.STORAGE_URL ||
  process.env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  console.error("❌ Error: No DATABASE_URL, POSTGRES_URL, or STORAGE_URL found in environment or .env.local");
  process.exit(1);
}

const sqlFile = path.resolve(process.cwd(), "neon_setup.sql");
const sqlContent = fs.readFileSync(sqlFile, "utf-8");

console.log("🚀 Connecting to Neon Postgres...");
const client = new Client(connectionString);

async function run() {
  try {
    await client.connect();
    console.log("⚡ Connected! Applying neon_setup.sql...");
    await client.query(sqlContent);
    await client.end();
    console.log("✅ Neon database tables, enums, functions, and seed data created successfully!");
  } catch (err) {
    console.error("❌ Migration error:", err);
    try {
      await client.end();
    } catch {}
    process.exit(1);
  }
}

run();
