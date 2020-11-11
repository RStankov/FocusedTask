const electron = require('electron');

const accelerator = 'CommandOrControl+`';

module.exports = {
  register(mb) {
    mb.on('after-show', () => {
      electron.globalShortcut.register(accelerator, () => {
        const win = mb.window;
        if (win) {
          win.send('switchTaskShortcut');
        }
      });
    });

    mb.on('after-hide', () => {
      electron.globalShortcut.unregister(accelerator);
    });
  },
};
