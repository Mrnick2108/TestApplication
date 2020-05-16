const electron = require('electron');
const url = require('url');
const path = require('path');
const update = require('update-electron-app');

const {app, BrowserWindow, Menu, autoUpdater } = electron;

const server = `https://hazel-five-gules.now.sh`;
const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.setFeedURL(feed)

let mainWindow

app.on('ready', function() {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    setInterval(() => {
      autoUpdater.checkForUpdates()
    }, 60000);

    setInterval(() => {
      autoUpdater.checkForUpdatesAndNotify()
    }, 60000);

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //Menu.setApplicationMenu(mainMenu);
});



autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }
  
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  });

  autoUpdater.on('error', message => {
    console.error('There was a problem updating the application')
    console.error(message)
  });


//Create menu template
const mainMenuTemplate = [];