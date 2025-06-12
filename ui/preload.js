const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  fetch: (url, opts) => ipcRenderer.invoke('api-fetch', url, opts)
});