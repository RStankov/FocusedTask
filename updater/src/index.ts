import express from 'express';
import isBot from 'isbot';
import { port, siteURL } from './config';
import { fetchCurrentRelease, fetchAllReleases } from './releases';
import { logDownload, logUpdate } from './db';

const app = express();

app.use('/status', (_req, res) => {
  res.send('running');
});

app.use('/download', async (req, res) => {
  const release = await fetchCurrentRelease();
  res.redirect(release.updateTo.url);

  if (!(req.headers['user-agent'] && isBot(req.headers['user-agent']))) {
    logDownload(release.version, req.query.ref || req.header('Referer'));
  }
});

app.use('/releases', async (req, res) => {
  const releases = await fetchAllReleases();

  const installationId = (req.headers['x-installation'] || 'unknown') as string;

  logUpdate(releases.currentRelease, installationId);

  res.send(releases);
});

app.use('/', (_req, res) => res.redirect(301, siteURL));

app.listen(port, () => console.log(`Server listing on port ${port}`));
