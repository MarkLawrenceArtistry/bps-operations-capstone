const { app, BrowserWindow } = require('electron');
const path = require('path');

// 1. Setup Database Path for Production
// We set this ENV variable so src/database.js knows where to write the file
const userDataPath = app.getPath('userData');
process.env.DB_PATH = path.join(userDataPath, 'bps.db');

// 2. Start the Express Server
// We require the server file so it starts running on localhost:3000
require('./src/server.js');

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        // icon: path.join(__dirname, 'public/icons/logo.png'), // Ensure you have an icon here or remove this line
        webPreferences: {
            nodeIntegration: false, // Security best practice
            contextIsolation: true
        }
    });

    // 3. Load the Express App
    // We use a timeout to give Express a second to start up
    setTimeout(() => {
        win.loadURL('http://localhost:3000/index.html');
    }, 1000);

    win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});