const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()
  win.on("closed", () => {
    win = null;
  });
}
app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const databasePath = path.join(app.getPath('appData'), 'sams-checkout-system', 'database.json');

ipcMain.on('getDatabase', (event, _) => {
  fs.readFile(databasePath, 'utf8', (err, data) => {
    if (err) {
      // file does not exist, return null (service will handle this case)
      event.returnValue = null;
    } else {
      event.returnValue = data;
    }
  })
});

ipcMain.on('writeDatabase', (event, arg) => {
  fs.mkdir(path.dirname(databasePath), err => {
    console.log(err);
  });
  fs.writeFile(databasePath, arg, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("file written successfully")
    }
  })
})
