import { app, BrowserWindow } from 'electron/main'
import { ipcMain } from 'electron'
import fetch from 'node-fetch'

const __dirname = import.meta.dirname

function createWindow () {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
      preload: __dirname + '/preload.js',
    }
  })

  win.webContents.openDevTools()

  win.loadURL("http://localhost:5173")
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// ipcMain.handle("api-fetch", async (event, url, opts) => {
//   const response = await fetch(url, opts)

//   // TODO: make right

//   return response
// })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})