const { menubar } = require('menubar');
const electron = require('electron');

const mb = menubar({
  index: 'http://localhost:3000',
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
