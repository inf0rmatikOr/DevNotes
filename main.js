import { app, BrowserWindow } from 'electron/main'
import { ipcMain } from 'electron'

function createWindow () {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true,
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})