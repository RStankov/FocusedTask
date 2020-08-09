const autoUpdater = require('electron').autoUpdater;
const dialog = require('electron').dialog;
const settings = require('./settings');

module.exports = async function() {
  const installationId = await settings.getInstallationId();

  // NOTE(rstankov): More info here
  // https://www.electronjs.org/docs/api/auto-updater
  autoUpdater.setFeedURL({
    url: 'https://focused-task.herokuapp.com/releases',
    headers: {
      'X-INSTALLATION': installationId,
    },
    serverType: 'json',
  });

  autoUpdater.once('update-downloaded', () => {
    dialog
      .showMessageBox({
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: 'Application Update',
        detail:
          'A new version has been downloaded. Restart the application to apply the updates.',
      })
      .then(returnValue => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall();
      });
  });

  autoUpdater.checkForUpdates();

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 6 * 60 * 1000);
};
