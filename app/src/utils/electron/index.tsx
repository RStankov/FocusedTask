import electron from './shim';
import { IStoreState } from 'modules';
import { exportStore, importStore } from 'utils/stateRestore';
import isURI, { isFilePathUri } from 'utils/isURI';
import { getTitle } from 'modules/selectors';

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

export async function writeStoreToFile(store: IStoreState) {
  if (!isElectron) {
    return;
  }

  const { filePath } = await electron.remote.dialog.showSaveDialog({
    defaultPath:
      '~/Desktop/' +
      getTitle(store)
        .toLocaleLowerCase()
        .replace(/\W+/g, '_') +
      '.json',
  });

  if (!filePath) {
    return;
  }

  try {
    await fs.writeFile(filePath, exportStore(store));
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

    importStore(data);

    window.location.reload();
  } catch (e) {
    alert(`An error occurred while reading the file: ${e.message}`);
  }
}

type IMenuItem =
  | {
      label: string;
      click: () => void;
      accelerator?: any;
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

  if (!isURI(uri)) {
    return;
  }

  if (isFilePathUri(uri)) {
    electron.remote.shell.openItem(uri);
  } else {
    electron.remote.shell.openExternal(uri);
  }
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
