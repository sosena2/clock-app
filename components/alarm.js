export function initAlarm() {
  const addAlarmBtn = document.querySelector('.add-alarm');
  const alarmList = document.querySelector('.alarm-list');
  const MAX_ALARMS = 2; 
  
  // Initialize alarms (limit to 2 on load)
  let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
  alarms = alarms.slice(0, MAX_ALARMS).map(alarm => {
    if (!alarm.displayTime) {
      const [hours, minutes] = alarm.time.split(':');
      let h = parseInt(hours);
      const period = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      alarm.displayTime = `${h}:${minutes} ${period}`;
    }
    return alarm;
  });

  let lastTriggeredAlarm = null;

  function speakAlarm(time) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Alarm! The time is ${time}`;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`ALARM: ${time}`);
    }
  }

  function renderAlarms() {
    alarmList.innerHTML = '';
    alarms.forEach((alarm, index) => {
      const alarmItem = document.createElement('div');
      alarmItem.className = 'alarm-item';
      alarmItem.innerHTML = `
        <div class="alarm-time">${alarm.displayTime}</div>
        <div class="alarm-actions">
          <button class="toggle-alarm" data-index="${index}">
            ${alarm.active ? 'Disable' : 'Enable'}
          </button>
          <button class="delete-alarm" data-index="${index}">Delete</button>
        </div>
      `;
      alarmList.appendChild(alarmItem);
    });

    // Add event listeners
    document.querySelectorAll('.toggle-alarm').forEach(btn => {
      btn.addEventListener('click', toggleAlarm);
    });
    document.querySelectorAll('.delete-alarm').forEach(btn => {
      btn.addEventListener('click', deleteAlarm);
    });
  }

  function addAlarm() {
    if (alarms.length >= MAX_ALARMS) {
      alert(`Maximum ${MAX_ALARMS} alarms allowed. Delete one to add another.`);
      return;
    }

    let time = prompt('Enter alarm time in HH:MM AM/PM format (e.g., 02:30 PM)');
    if (!time || !/^(1[0-2]|0?[1-9]):([0-5][0-9]) ([AP]M)$/i.test(time)) {
      alert('Please enter a valid time in HH:MM AM/PM format (e.g., 09:30 AM or 02:45 PM)');
      return;
    }

    // Convert to 24-hour format
    const [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
    
    hours = parseInt(hours);
    if (period.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }

    alarms.push({
      time: `${String(hours).padStart(2, '0')}:${minutes}`,
      displayTime: time,
      active: true
    });
    saveAlarms();
    renderAlarms();
  }

  function toggleAlarm(e) {
    const index = e.target.getAttribute('data-index');
    alarms[index].active = !alarms[index].active;
    saveAlarms();
    renderAlarms();
  }

  function deleteAlarm(e) {
    const index = e.target.getAttribute('data-index');
    alarms.splice(index, 1);
    saveAlarms();
    renderAlarms();
  }

  function saveAlarms() {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }

  function checkAlarms() {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    alarms.forEach(alarm => {
      if (alarm.active && alarm.time === currentTime && lastTriggeredAlarm !== alarm.time) {
        speakAlarm(alarm.displayTime);
        lastTriggeredAlarm = alarm.time;
        
        // Visual feedback
        const activeAlarm = [...document.querySelectorAll('.alarm-time')]
          .find(el => el.textContent === alarm.displayTime);
        if (activeAlarm) {
          activeAlarm.parentElement.classList.add('alarm-ringing');
          setTimeout(() => activeAlarm.parentElement.classList.remove('alarm-ringing'), 3000);
        }
      }
    });
  }

  // Initialize
  addAlarmBtn.addEventListener('click', addAlarm);
  renderAlarms();
  setInterval(checkAlarms, 1000);
}