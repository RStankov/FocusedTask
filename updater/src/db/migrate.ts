import { db } from '../config';
import { sql } from '@databases/pg';

const MIGRATIONS = [
  () =>
    db.query(sql`
      ALTER TABLE download_logs ADD COLUMN referer VARCHAR(255);
    `),
  () =>
    db.query(sql`
      ALTER TABLE download_logs ALTER COLUMN requested_at TYPE TIMESTAMP USING requested_at::timestamp;
    `),
];

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

  await db.query(
    sql`
      CREATE TABLE IF NOT EXISTS database_migrations (
        id SERIAL PRIMARY KEY,
        version INT NOT NULL UNIQUE
      );
    `,
  );

  const result = await db.query(
    sql`SELECT MAX(version) FROM database_migrations`,
  );

  const currentVersion = result[0].max || 0;

  if (currentVersion !== MIGRATIONS.length) {
    for (let i = currentVersion; i < MIGRATIONS.length; i++) {
      await MIGRATIONS[i]();
      console.log(`🚧 Migrate: ${i + 1}/${MIGRATIONS.length}`);
    }

    if (currentVersion === 0) {
      await db.query(
        sql`INSERT INTO database_migrations(version) values(${MIGRATIONS.length})`,
      );
    } else {
      await db.query(
        sql`UPDATE database_migrations SET version=${MIGRATIONS.length}`,
      );
    }
  }

  console.log('✅  DB MIGRATE');
}

migrate()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
