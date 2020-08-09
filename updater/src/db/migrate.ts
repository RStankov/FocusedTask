import { db } from '../config';
import { sql } from '@databases/pg';

async function migrate() {
  await db.query(
    sql`
      CREATE TABLE IF NOT EXISTS update_logs (
        id SERIAL PRIMARY KEY,
        installation_id VARCHAR (255) UNIQUE NOT NULL,
        version VARCHAR (255) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        last_request_at TIMESTAMP NOT NULL
      );
    `,
  );

  await db.query(
    sql`
      CREATE TABLE IF NOT EXISTS download_logs (
        id SERIAL PRIMARY KEY,
        version VARCHAR (255) NOT NULL,
        requested_at VARCHAR (255) UNIQUE NOT NULL
      );
    `,
  );

  console.log('✅  DB MIGRATE');
}

migrate().then(() => process.exit(0));
