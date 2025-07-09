export function initTimer() {
  const display = document.querySelector('.timer-display');
  const startBtn = document.getElementById('start-timer');
  const pauseBtn = document.getElementById('pause-timer');
  const resetBtn = document.getElementById('reset-timer');
  const hoursInput = document.getElementById('hours');
  const minutesInput = document.getElementById('minutes');
  const secondsInput = document.getElementById('seconds');

  let timer;
  let totalSeconds = 0;
  let isRunning = false;

  function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function startTimer() {
    if (isRunning) return;
    
    if (totalSeconds <= 0) {
      const hours = parseInt(hoursInput.value) || 0;
      const minutes = parseInt(minutesInput.value) || 0;
      const seconds = parseInt(secondsInput.value) || 0;
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      if (totalSeconds <= 0) return;
    }
    
    isRunning = true;
    timer = setInterval(() => {
      totalSeconds--;
      updateDisplay();
      
      if (totalSeconds <= 0) {
        clearInterval(timer);
        isRunning = false;
        alert('Timer finished!');
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {
    pauseTimer();
    totalSeconds = 0;
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    updateDisplay();
  }

  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  // Input validation
  [hoursInput, minutesInput, secondsInput].forEach(input => {
    input.addEventListener('change', function() {
      let value = parseInt(this.value) || 0;
      if (this === hoursInput) {
        value = Math.min(23, Math.max(0, value));
      } else {
        value = Math.min(59, Math.max(0, value));
      }
      this.value = value === 0 ? '' : value;
    });
  });
}