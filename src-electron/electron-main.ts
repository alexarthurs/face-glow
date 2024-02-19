import { app, BrowserWindow, globalShortcut } from 'electron';
import path from 'path';
import os from 'os';

import Store from 'electron-store';

const store = new Store({
  defaults: {
    width: 1000,
    height: 600,
    color: '#5d3fdd'
  }
});
// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  console.log('color', store.get('color'));
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: store.get('width'),
    height: store.get('height'),
    x: store.get('x'),
    y: store.get('y'),
    backgroundColor: '#5d3fdd',
    autoHideMenuBar: true,
    useContentSize: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      mainWindow?.show();
    }, 500); // Delay in milliseconds

    globalShortcut.register('Esc', () => {
      mainWindow?.close();
    });
  })

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('resize', () => {
    const bounds = mainWindow?.getBounds();
    if (bounds) {
      store.set('width', bounds.width);
      store.set('height', bounds.height);
    }
  });

  mainWindow.on('move', () => {
    const bounds = mainWindow?.getBounds();
    if (bounds) {
      store.set('x', bounds.x);
      store.set('y', bounds.y);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});