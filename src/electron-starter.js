const { menubar } = require('menubar');
const electron = require('electron');
const url = require('url');
const path = require('path');

const mb = menubar({
  index:
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  browserWindow: {
    width: 400,
    height: 500,
    maxHeight: 900,
    webPreferences: {
      nodeIntegration: true,
      scrollBounce: true,
    },
  },
});

mb.on('ready', () => {
  console.log('app is ready');
});

mb.app.allowRendererProcessReuse = false;

mb.app.on('web-contents-created', (e, contents) => {
  const openExternal = (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  };

  contents.on('new-window', openExternal);
  contents.on('will-navigate', (e, url) => {
    if (url !== contents.getURL()) {
      openExternal(e, url);
    }
  });
});

electron.ipcMain.on('resize', function(_e, width, height) {
  mb.window.setSize(width, height);
});
