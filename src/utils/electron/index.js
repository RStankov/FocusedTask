import electron from './shim';

export const isElectron = !!electron;

export function closeApp() {
  if (!isElectron) {
    return null;
  }

  electron.remote.getCurrentWindow().close();
}
