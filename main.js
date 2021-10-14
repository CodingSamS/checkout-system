const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");



let win;
function createWindow() {

  win = new BrowserWindow({
    width: 1400,
    height: 1000,
    autoHideMenuBar: true,
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

const basePath = path.join(app.getPath('appData'), 'sams-checkout-system');

ipcMain.on('getDatabase', (event, _) => {
  let database = {};
  fs.readdir(basePath, (err, files) => {
    if (err) {
      // file does not exist, create path and return an empty database
      fs.mkdir(basePath, err => {
        console.log(err);
      });
    } else {
      for (let i = 0; i < files.length; i++) {
        // check if the file is a valid database file
        if (files[i].endsWith(".json")) {
          // add the event to the database
          let filePath = path.join(basePath, files[i]);
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let eventName = files[i].slice(0, -5);
              database[eventName] = data;
            }
          })
        }
      }
    }
  })
  event.returnValue = JSON.stringify(database);
});

ipcMain.on('writeEvent', (event, arg) => {
  let filePath = path.join(basePath, arg["eventName"].concat(".json"));
  fs.writeFile(filePath, arg["eventData"], (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("file written successfully")
    }
  })
})
