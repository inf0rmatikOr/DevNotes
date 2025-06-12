const { app, BrowserWindow } = require('electron/main')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true
  })

  //win.webContents.openDevTools()

  // win.loadURL('http://localhost:5173')
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