const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  generateNumbers: () => ipcRenderer.invoke('generate-numbers'),
  updateSettings: (maxNum, drawCnt) => ipcRenderer.invoke('update-settings', { maxNum, drawCnt }),
  clearNow: () => ipcRenderer.invoke('clear-now')
});

ipcRenderer.on('draw-result', (event, { numbers, round, results }) => {
  window.dispatchEvent(new CustomEvent('draw-result', { detail: { numbers, round, results } }));
});

ipcRenderer.on('clear-result', (event) => {
  window.dispatchEvent(new CustomEvent('clear-result'));
});

ipcRenderer.on('settings-updated', (event, { maxNumber, drawCount }) => {
  window.dispatchEvent(new CustomEvent('settings-updated', { detail: { maxNumber, drawCount } }));
});
