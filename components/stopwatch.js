export function initStopwatch() {
  const display = document.querySelector('.stopwatch-display');
  const startBtn = document.getElementById('start-stopwatch');
  const pauseBtn = document.getElementById('pause-stopwatch');
  const resetBtn = document.getElementById('reset-stopwatch');
  const lapBtn = document.getElementById('lap-stopwatch');
  const lapsList = document.querySelector('.laps-list');
  const MAX_LAPS = 3; 

  let timer;
  let startTime;
  let elapsedTime = 0;
  let isRunning = false;
  let lapCount = 1;

  function updateDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function startStopwatch() {
    if (isRunning) return;
    
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }

  function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetStopwatch() {
    pauseStopwatch();
    elapsedTime = 0;
    lapCount = 1;
    lapsList.innerHTML = '';
    updateDisplay();
  }

  function recordLap() {
    if (!isRunning) return;
    
    const lapTime = display.textContent;
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
      <span class="lap-number">Lap ${lapCount}</span>
      <span class="lap-time">${lapTime}</span>
    `;
    
    // Add new lap at the top
    lapsList.prepend(lapItem);
    lapCount++;
    
    if (lapsList.children.length > MAX_LAPS) {
      lapsList.removeChild(lapsList.lastChild);
    }
  }

  startBtn.addEventListener('click', startStopwatch);
  pauseBtn.addEventListener('click', pauseStopwatch);
  resetBtn.addEventListener('click', resetStopwatch);
  lapBtn.addEventListener('click', recordLap);
}