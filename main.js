const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    }
  })

  // Development mode options:
  // win.webContents.openDevTools()
  // win.loadURL('http://localhost:5173')

  // Production mode options:
  win.loadFile(path.join(__dirname, './ui/dist/index.html'))
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

ipcMain.handle("api-fetch", async (event, url, opts) => {
  const response = await fetch(url, opts)
  const data = await response.text()

  if (!response.ok) {
    return {
      status: response.status.toString(),
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: response.message || 'An error occurred.'
    }
  }

  return {
    status: response.status.toString(),
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    data: data
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})