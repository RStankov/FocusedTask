import electron from './shim';

export const isElectron = !!electron;

export function closeApp() {
  if (!isElectron) {
    return null;
  }

  electron.remote.getCurrentWindow().close();
}

export function resizeBasedOnContent(height) {
  if (!isElectron) {
    return;
  }

  const bodyStyle = window.getComputedStyle(document.body);
  const padding =
    parseInt(bodyStyle['margin-top'], 10) +
    parseInt(bodyStyle['margin-bottom'], 10) +
    parseInt(bodyStyle['padding-top'], 10) +
    parseInt(bodyStyle['padding-bottom'], 10);

  const observer = new ResizeObserver(() => {
    const height = document.body.offsetHeight + padding;

    const bounds = electron.remote
      .getCurrentWindow()
      .webContents.getOwnerBrowserWindow()
      .getBounds();

    if (height > 900 || bounds.height === height) {
      return;
    }

    electron.ipcRenderer.send('resize', bounds.width, height);
  });
  observer.observe(document.body);
}
