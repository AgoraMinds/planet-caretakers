// Push Payload schema to remote Postgres using drizzle-kit push
// Usage: DATABASE_URL=... node scripts/push-schema.mjs

import pg from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: DATABASE_URL });

// Payload 3.x with postgres creates these core tables via Drizzle
// We need to create the schema that matches our collections and globals
// The easiest way: just start Payload in a minimal way

// Actually, let's just try hitting the production /admin endpoint 
// multiple times - on Vercel, Payload with push:true should create tables
// on cold start in production too.

// But since that's not working, let's create the migration tables
// and trigger the migration through the build process.

console.log('Checking database connection...');
const result = await pool.query('SELECT 1 as ok');
console.log('Connected:', result.rows[0]);

// Check existing tables
const tables = await pool.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
console.log('Existing tables:', tables.rows.length ? tables.rows.map(r => r.tablename).join(', ') : 'NONE');

// Create the payload_migrations table that Payload needs
await pool.query(`
  CREATE TABLE IF NOT EXISTS payload_migrations (
    id serial PRIMARY KEY,
    name varchar,
    batch integer,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  )
`);
console.log('Created payload_migrations table');

await pool.end();
console.log('Done. Now redeploy to Vercel - Payload should create remaining tables via push mode.');
