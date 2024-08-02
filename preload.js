const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  generateNumbers: () => ipcRenderer.invoke('generate-numbers')
});

ipcRenderer.on('draw-result', (event, { numbers, round }) => {
  window.dispatchEvent(new CustomEvent('draw-result', { detail: { numbers, round } }));
});
