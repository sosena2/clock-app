export function initClock() {
  const digitalTime = document.querySelector('.time');
  const digitalDate = document.querySelector('.date');
  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const secondHand = document.querySelector('.second-hand');

  function updateClock() {
    const now = new Date();
    
    // Digital clock
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' });
    digitalTime.textContent = time;
    digitalDate.textContent = date;
    
    // Analog clock
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;
    
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
  }
  
  updateClock();
  setInterval(updateClock, 1000);
}