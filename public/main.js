const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window using specific properties such as size, max, min dimensions, icons and web preferences 
    const win = new BrowserWindow({
        title: 'tracker',
        frame: true,
        icon: path.join(__dirname, '..', 'build', 'icon.png'),

        width: 800,
        height: 600,

        maxWidth: 900,
        maxHeight: 700,
        minWidth: 700,
        minHeight: 500,

        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecution: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });


    // Remove menu options
    // win.removeMenu();

    // load the index.html from a url
    win.loadURL(
        true
            ? 'http://localhost:3000'
            : `file://${path.resolve(path.join(__dirname, '..', 'build', 'index.html'))}`
    );

    // Open the DevTools.
    //win.webContents.openDevTools()
}

//setting up event listeners 

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

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
        createWindow()
    }
})