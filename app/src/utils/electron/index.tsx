import electron from './shim';
import { IStoreState } from 'modules';

export const isElectron = !!electron;

export function closeApp() {
  if (!isElectron) {
    return null;
  }

  electron.remote.getCurrentWindow().close();
}

export function hideApp() {
  if (!isElectron) {
    return null;
  }

  electron.remote.getCurrentWindow().hide();
}

export function resizeBasedOnContent() {
  if (!isElectron) {
    return;
  }

  const bodyStyle = window.getComputedStyle(document.body) as any;
  const padding =
    parseInt(bodyStyle['margin-top'], 10) +
    parseInt(bodyStyle['margin-bottom'], 10) +
    parseInt(bodyStyle['padding-top'], 10) +
    parseInt(bodyStyle['padding-bottom'], 10);

  const observer = new ResizeObserver(() => {
    const height = Math.min(900, document.body.offsetHeight + padding);

    const bounds = electron.remote
      .getCurrentWindow()
      .webContents.getOwnerBrowserWindow()
      .getBounds();

    if (bounds.height === height) {
      return;
    }

    electron.ipcRenderer.send('resize', bounds.width, height);
  });
  observer.observe(document.body);
}

const fs = window.require && window.require('fs').promises;

const FILE_VERSION = 1;

export async function writeStoreToFile(store: IStoreState) {
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

type IMenuItem =
  | {
      label: string;
      click: () => void;
    }
  | { type: 'separator' };

export function openMenu(items: IMenuItem[]) {
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

export function openURI(uri: string) {
  if (!isElectron) {
    return;
  }

  if (!uri) {
    return;
  }

  electron.remote.shell.openExternal(uri);
}

export async function confirm({
  message,
  detail,
  fn,
}: {
  message: string;
  detail?: string;
  fn: () => void;
}) {
  if (!isElectron) {
    return;
  }

  const { response } = await electron.remote.dialog.showMessageBox({
    buttons: ['Yes', 'No', 'Cancel'],
    message,
    detail,
  });

  if (response === 0) {
    fn();
  }
}

export function getGlobalShortcutKey() {
  if (!isElectron) {
    return;
  }
  console.log('call');

  return electron.remote.getGlobal('globalShortcutKey');
}

export function updateGlobalShortcutKey(key: string) {
  if (!isElectron) {
    return;
  }

  if (key.length !== 1) {
    return;
  }

  electron.ipcRenderer.send('updateGlobalShortcutKey', key);
}
