import { db } from '../config';
import { sql } from '@databases/pg';

export async function logDownload(version: string, ref: any) {
  await db.query(sql`
    INSERT INTO download_logs
      (version, requested_at, referer)
    VALUES
      (${version}, ${new Date()}, ${ref})
  `);

  db.query(sql`SELECT * FROM download_logs`).then((r) => console.log(r));
}

export async function logUpdate(version: string, installationId: string) {
  const time = new Date();

  const results = await db.query(
    sql`
      SELECT id
      FROM update_logs
      WHERE installation_id=${installationId}`,
  );

  const id = results[0] && results[0].id;

  if (id) {
    await db.query(
      sql`
        UPDATE update_logs
        SET version=${version},
            last_request_at=${time}
        WHERE id=${id}`,
    );
  } else {
    try {
      await db.query(sql`
        INSERT INTO update_logs
          (version, installation_id, created_at, last_request_at)
        VALUES
          (${version}, ${installationId}, ${time}, ${time})
      `);
    } catch (e) {
      // NOTE(rstankov): Handle race-condition
      if (
        !e.toString().includes('duplicate key value violates unique constraint')
      ) {
        throw e;
      }
    }
  }
}
