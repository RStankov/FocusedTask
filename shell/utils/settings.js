const settings = require('electron-settings');
const electron = require('electron');
const _ = require('lodash');
const uuid = require('uuid');

const BOUNDS_KEY = 'windowBounds';
const SHORTCUT_KEY = 'globalShortcut';
const INSTALLATION_ID_KEY = 'installationId';

module.exports = {
  async setWindowBounds(menubar) {
    const storedSettings = (await settings.get(BOUNDS_KEY)) || {};

    menubar.setOption('browserWindow', {
      ...menubar.getOption('browserWindow'),
      ...(storedSettings || {}),
    });
  },

  trackWindowBounds(menubar) {
    const win = menubar.window;

    const handler = _.debounce(() => {
      menubar.setOption('browserWindow', {
        ...menubar.getOption('browserWindow'),
        ...win.getBounds(),
      });

      settings.set(BOUNDS_KEY, win.getBounds());
    }, 500);

    win.on('resize', handler);
    win.on('move', handler);
  },

  async setGlobalShortcut(menubar) {
    const key = (await settings.get(SHORTCUT_KEY)) || "'";

    global.globalShortcutKey = key;

    electron.globalShortcut.register(`CommandOrControl+${key}`, () => {
      if (menubar.window && menubar.window.isVisible()) {
        menubar.hideWindow();
      } else {
        menubar.showWindow();
      }
    });
  },

  updateGlobalShortcutKey(menubar, key) {
    settings.set(SHORTCUT_KEY, key);
    electron.globalShortcut.unregisterAll();
    this.setGlobalShortcut(menubar);
  },

  async getInstallationId() {
    let id = await settings.get(INSTALLATION_ID_KEY);
    if (!id) {
      id = uuid.v1();
      settings.set(INSTALLATION_ID_KEY, id);
    }

    return id;
  },
};
