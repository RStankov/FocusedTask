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
    webPreferences: {
      nodeIntegration: true,
    },
  },
});

mb.on('ready', () => {
  console.log('app is ready');
  // your app code here
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
