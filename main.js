const { app, BrowserWindow } = require('electron')
const log = require('electron-log');
const { autoUpdater } = require("electron-updater")
const windowStateKeeper = require('electron-window-state');
const debug = require('electron-debug');
const unhandled = require('electron-unhandled');
const { openNewGitHubIssue, debugInfo } = require('electron-util');
const { ElectronAuthProvider } = require('twitch-electron-auth-provider');

unhandled({
  reportButton: error => {
    openNewGitHubIssue({
      user: 'acouvreur',
      repo: 'twitch-channel-points-hackathon',
      body: `\`\`\`\n${error.stack}\n\`\`\`\n\n---\n\n${debugInfo()}`
    });
  }
});

debug();

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')

function createWindow() {

  let mainWindowState = windowStateKeeper({
    defaultWidth: 1280,
    defaultHeight: 720
  });

  // Create the browser window.
  const win = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height
  });

  mainWindowState.manage(win);

  // and load the index.html of the app.
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
  } else {
    win.loadFile('frontend/build/index.html')
  }

  win.webContents.on('did-finish-load', () => {
    const version = require('./package.json').version

    win.setTitle(`Awesome Channel Points Manager - v${version}`)
  })

  win.on('closed', () => {
    app.quit()
  })
}

function createServer() {
  const { createServer, config} = require('backend');
  const electronProvider = new ElectronAuthProvider({
    clientId: config.CLIENT_ID,
    redirectUri: config.REDIRECT_URI
  });

  const Store = require('electron-store');
  const electronStore = new Store();
  if (electronStore.get("rewards") === undefined) {
    electronStore.set("rewards", []);
  }

  
  createServer({
    customAuthProvider: electronProvider,
    customStorageProvider: electronStore
  })
}

autoUpdater.on('checking-for-update', () => {
  log.info('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  log.info('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  log.info('Update not available.');
})
autoUpdater.on('error', (err) => {
  log.info('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  log.info(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded');
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  const name = require('./package.json').name
  const version = require('./package.json').version
  console.log(`[LOG] ${name} - version ${version}`)

  autoUpdater.checkForUpdatesAndNotify();

  createServer()

  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.