const settings = require('electron-settings');
const electron = require('electron');
const _ = require('lodash');

const BOUNDS_KEY = 'windowBounds';
const SHORTCUT_KEY = 'globalShortcut';

module.exports = {
  setWindowBounds(menubar) {
    menubar.setOption('browserWindow', {
      ...menubar.getOption('browserWindow'),
      ...(settings.get(BOUNDS_KEY) || {}),
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

  setGlobalShortcut(menubar) {
    const key = settings.get(SHORTCUT_KEY) || "'";

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
};
