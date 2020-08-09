import connect from '@databases/pg';

export const db = connect(
  process.env.DATABASE_URL ||
    'postgresql://focusedtask:focusedtask@127.0.0.1:5432/focusedtask',
);

export const port = process.env.PORT || 3000;

export const releasesURL =
  'https://focused-tasks.s3.eu-central-1.amazonaws.com/releases.json';

export const siteURL = 'https://github.com/RStankov/FocusedTask';
