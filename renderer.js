const correctPassword = "0625";

document.getElementById('generate').addEventListener('click', () => {
  window.electron.generateNumbers();
});

window.addEventListener('draw-result', (event) => {
  const { numbers, round, results } = event.detail;
  const resultDiv = document.getElementById('result');
  const roundDiv = document.getElementById('round');
  const historyDiv = document.getElementById('history');
  
  resultDiv.textContent = `本期開獎號碼: ${numbers.join(', ')}`;
  roundDiv.textContent = `第 ${round} 期`;

  historyDiv.innerHTML = results.map(result => `<p>${result}</p>`).join('');
});

document.getElementById('apply-settings').addEventListener('click', () => {
  const maxNum = parseInt(document.getElementById('max-number').value);
  const drawCnt = parseInt(document.getElementById('draw-count').value);
  window.electron.updateSettings(maxNum, drawCnt);
});

window.addEventListener('settings-updated', (event) => {
  const { maxNumber, drawCount } = event.detail;
  document.getElementById('current-settings').textContent = `選號區間: 0-${maxNumber}，開獎碼數: ${drawCount}`;
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', (event) => {
    if (tab.dataset.tab === "settings") {
      event.preventDefault();
      document.getElementById('password-modal').style.display = "block";
    } else {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.querySelector(`.content.${tab.dataset.tab}`).classList.add('active');
    }
  });
});

document.getElementById('submit-password').addEventListener('click', () => {
  const passwordInput = document.getElementById('password-input').value;
  if (passwordInput === correctPassword) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));

    document.querySelector('.tab[data-tab="settings"]').classList.add('active');
    document.querySelector('.content.settings').classList.add('active');

    document.getElementById('password-modal').style.display = "none";
  } else {
    alert("密碼錯誤");
  }
});

document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('password-modal').style.display = "none";
});
