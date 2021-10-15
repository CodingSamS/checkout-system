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
  if (fs.existsSync(basePath)) {
    const files = fs.readdirSync(basePath);
    for (const file of files) {
      // check if the file is a valid database file
      if (file.endsWith(".json")) {
        const filePath = path.join(basePath, file);
        const fileContent = fs.readFileSync(filePath);
        const eventName = file.slice(0, -5);
        database[eventName] = JSON.parse(fileContent.toString());
      }
    }
  } else {
    // path to database does not exists (and also no database files) -> create the directory and leave the empty database untouched
    fs.mkdir(basePath, err => {
      console.log(err);
    });
  }
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

ipcMain.on('deleteEvent', (event, arg) => {
  let filePath = path.join(basePath, arg.concat(".json"));
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File deleted successfully");
      }
    })
  } else {
    console.log("This file does not exist, cannot delete");
  }
})
