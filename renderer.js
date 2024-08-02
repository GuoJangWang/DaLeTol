document.getElementById('generate').addEventListener('click', () => {
  window.electron.generateNumbers();
});

window.addEventListener('draw-result', (event) => {
  const { numbers, round } = event.detail;
  const resultDiv = document.getElementById('result');
  const roundDiv = document.getElementById('round');
  resultDiv.textContent = `本期開獎號碼: ${numbers.join(', ')}`;
  roundDiv.textContent = `第 ${round} 期`;
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    
    tab.classList.add('active');
    document.querySelector(`.content.${tab.dataset.tab}`).classList.add('active');
  });
});
