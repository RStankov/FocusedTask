import fetch from 'node-fetch';
import { releasesURL } from './config';

interface TRelease {
  version: string;
  updateTo: {
    version: string;
    name: string;
    pub_date: string;
    notes: string;
    url: string;
  };
}

interface TReleases {
  currentRelease: string;
  releases: TRelease[];
}

export async function fetchAllReleases(): Promise<TReleases> {
  const response = await fetch(releasesURL);
  const json = await response.json();

  return json;
}

export async function fetchCurrentRelease(): Promise<TRelease> {
  const releases = await fetchAllReleases();
  const currentRelease =
    releases.releases.find(r => r.version === releases.currentRelease) ||
    releases.releases[0];
  return currentRelease;
}
