const electron = require('electron');
const settings = require('./settings');

module.exports = async function () {
  const installationId = await settings.getInstallationId();
  const autoUpdater = electron.autoUpdater;

  // NOTE(rstankov): More info here
  // https://www.electronjs.org/docs/api/auto-updater
  autoUpdater.setFeedURL({
    url: 'https://focused-task.herokuapp.com/releases',
    headers: {
      'X-INSTALLATION': installationId,
    },
    serverType: 'json',
  });

  autoUpdater.on('error', (error) => {
    autoUpdateEvent(`${error}`);
  });

  autoUpdater.on('checking-for-update', () => {
    autoUpdateEvent('Checking for new update...');
  });

  autoUpdater.on('update-available', (error) => {
    autoUpdateEvent('New version is downloading...');
  });

  autoUpdater.on('update-not-available', (error) => {
    autoUpdateEvent('Running on newest version.');
  });

  autoUpdater.once('update-downloaded', async () => {
    autoUpdateEvent('New version downloaded.');

    const returnValue = await electron.dialog.showMessageBox({
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: 'Application Update',
      detail:
        'A new version has been downloaded. Restart the application to apply the updates.',
    });

    if (returnValue.response === 0) {
      try {
        await autoUpdater.quitAndInstall();
      } catch (e) {
        // NOTE(rstankov): Handles:
        //   "Cannot update while running on a read-only volume"
        autoUpdateEvent(`Newest version cant be installed due to ${error}`);
      }
    }
  });

  function autoUpdateRequest() {
    autoUpdateEvent('Checking for new update..');

    try {
      autoUpdater.checkForUpdates();
    } catch (error) {
      // NOTE(rstankov): Handles:
      //   "Network errors"
      autoUpdateEvent(`Auto update error - ${error}`);
    }
  }

  electron.ipcMain.on('autoUpdateRequest', autoUpdateRequest);

  autoUpdateRequest();

  setInterval(autoUpdateRequest, 12 * 60 * 1000);
};

// NOTE(rstankov): Placeholder for the render process
//   Needed because we don't always have one
var renderIpc = null;

// NOTE(rstankov): Keep latest message, so when subscribe we can resend
var latestMessage = null;

function autoUpdateEvent(message) {
  latestMessage = message;

  if (!renderIpc) {
    return;
  }

  try {
    renderIpc.send('autoUpdateEvent', message || '');
  } catch (e) {
    console.log(e);
  }
}

electron.ipcMain.on('autoUpdateSubscribe', (e) => {
  renderIpc = e.sender;
  autoUpdateEvent(latestMessage);
});

electron.ipcMain.on('autoUpdateUnsubscribe', (e) => {
  renderIpc = null;
});
