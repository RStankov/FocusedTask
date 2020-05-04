const settings = require('electron-settings');
const _ = require('lodash');

const BOUNDS_KEY = 'windowBounds';

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
};
