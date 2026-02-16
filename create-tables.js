const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({ 
  connectionString: 'postgresql://neondb_owner:npg_kCtm3eRA8zMP@ep-super-bar-ai5tr1bx-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

// Read SQLite schema and convert to Postgres
const sqliteSchema = fs.readFileSync('/tmp/schema.sql', 'utf8');

// Basic conversions: SQLite -> Postgres
const pgSchema = sqliteSchema
  .replace(/`/g, '"')  // backticks to double quotes
  .replace(/integer PRIMARY KEY/gi, 'serial PRIMARY KEY')
  .replace(/integer NOT NULL/gi, 'integer NOT NULL')
  .replace(/\binteger\b/gi, 'integer')
  .replace(/\btext\b/gi, 'text')
  .replace(/\bnumeric\b/gi, 'numeric')
  .replace(/strftime\('%Y-%m-%dT%H:%M:%fZ', 'now'\)/g, "now()")
  .replace(/DEFAULT \(now\(\)\)/g, 'DEFAULT now()')
  .replace(/ON UPDATE no action/gi, 'ON UPDATE NO ACTION')
  .replace(/ON DELETE cascade/gi, 'ON DELETE CASCADE')
  .replace(/ON DELETE set null/gi, 'ON DELETE SET NULL');

console.log('Creating Postgres schema...');
console.log('Schema length:', pgSchema.length, 'chars');

(async () => {
  try {
    await pool.query(pgSchema);
    console.log('✅ All tables created successfully!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('\nTrying table-by-table approach...');
    
    // Split into individual CREATE statements and run one by one
    const statements = pgSchema.split(';').filter(s => s.trim());
    let created = 0;
    for (const stmt of statements) {
      if (!stmt.trim()) continue;
      try {
        await pool.query(stmt);
        created++;
      } catch (e) {
        if (!e.message.includes('already exists')) {
          console.error('Failed:', stmt.substring(0, 80) + '...', e.message);
        }
      }
    }
    console.log(`Created ${created}/${statements.length} objects`);
  } finally {
    await pool.end();
  }
})();
