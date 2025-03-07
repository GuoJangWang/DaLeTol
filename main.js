const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;
let round = 1;
let results = [];
let maxNumber = 1000;
let drawCount = 6;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('generate-numbers', () => {
  const numbers = [];
  while (numbers.length < drawCount) {
    const num = Math.floor(Math.random() * maxNumber) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  numbers.sort((a, b) => a - b);
  const result = `第${round}期 選號區間: 0-${maxNumber} 開獎號碼: ${numbers.join(', ')}`;
  results.push(result);
  win.webContents.send('draw-result', { numbers, round, results });
  round++;
});

ipcMain.handle('clear-now', () => {
  win.webContents.send('clear-result');  // 通知渲染進程清空結果
});

ipcMain.handle('update-settings', (event, { maxNum, drawCnt }) => {
  maxNumber = maxNum;
  drawCount = drawCnt;
  win.webContents.send('settings-updated', { maxNumber, drawCount });
});
