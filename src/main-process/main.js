/* global __dirname:false, require:false */
// Modules to control application life and create native browser window
const { app, ipcMain, BrowserWindow, Menu } = require('electron');
const path = require('path');

ipcMain.on('pass-data-renderers', (window, eventArgs) => {
  console.log(eventArgs);
  if (windows[eventArgs.to]) {
    windows[eventArgs.to].webContents.send('pass-data-renderers', eventArgs);
  }
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const windows = {
};

function openModalDialog(top) {
  const childWindow = new BrowserWindow({
    parent: top,
    modal: true,
    show: false,
  });

  childWindow.loadFile(path.join(__dirname, '..', 'renderer-process', 'configuration-dialog', 'index.html'));

  childWindow.on('closed', function () {
    windows.childWindow = null;
  });

  childWindow.show();

  windows.childWindow = childWindow;
}



const templateMenu = [
  {
    label: 'Open',
    submenu: [
      {
        label: 'Dialog',
        click(item, focusedWindow) {
          openModalDialog(focusedWindow);
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '..', 'renderer-process', 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    windows.mainWindow = null;
  });

  windows.mainWindow = mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (windows.mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
