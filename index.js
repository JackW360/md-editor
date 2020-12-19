const { app, BrowserWindow, screen } = require('electron');
require('electron-reload')(__dirname);

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    window = new BrowserWindow({
        width: width / 1.1,
        height: height / 1.1,
        webPreferences: {
            nodeIntegration: true
        }
    });

    window.loadFile('public/index.html');
};

let window = null;

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit());