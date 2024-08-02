document.getElementById('generate').addEventListener('click', () => {
  window.electron.generateNumbers();
});

window.addEventListener('draw-result', (event) => {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `本期開獎號碼: ${event.detail.join(', ')}`;
});
