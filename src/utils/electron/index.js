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

const fs = window.require && window.require('fs').promises;

const FILE_VERSION = 1;

export async function writeStoreToFile(store) {
  if (!isElectron) {
    return;
  }

  const { filePath } = await electron.remote.dialog.showSaveDialog({
    defaultPath:
      '~/Desktop/' +
      store.task.title.toLocaleLowerCase().replace(/\W+/g, '_') +
      '.json',
  });

  if (!filePath) {
    return;
  }

  const content = JSON.stringify({
    version: FILE_VERSION,
    date: new Date(),
    store,
  });

  try {
    await fs.writeFile(filePath, content);
  } catch (e) {
    alert(`An error occurred while writing the file: ${e.message}`);
  }
}

export async function readStoreFromFile() {
  if (!isElectron) {
    return;
  }

  const { filePaths } = await electron.remote.dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'JSON', extensions: ['json'] }],
  });

  if (!filePaths || filePaths.length === 0) {
    return;
  }

  const [filePath] = filePaths;

  try {
    const data = await fs.readFile(filePath, 'utf-8');

    const restore = JSON.parse(data);

    if (restore.version !== FILE_VERSION) {
      alert(`Unsupported file version: ${restore.version}`);
      return;
    }

    return restore.store;
  } catch (e) {
    alert(`An error occurred while reading the file: ${e.message}`);
  }
}

export function openMenu(items) {
  if (!isElectron) {
    return;
  }

  const remote = electron.remote;
  const Menu = remote.Menu;
  const MenuItem = remote.MenuItem;

  const menu = new Menu();

  items.forEach(item => menu.append(new MenuItem(item)));

  menu.popup(remote.getCurrentWindow());
}

export function openURI(uri) {
  if (!isElectron) {
    return;
  }

  if (!uri) {
    return;
  }

  electron.remote.shell.openExternal(uri);
}
