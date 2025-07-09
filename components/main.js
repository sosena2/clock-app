document.addEventListener('DOMContentLoaded', function() {
  // Get all page elements and nav items
  const pages = {
    clock: document.getElementById('clock'),
    alarm: document.getElementById('alarm'),
    timer: document.getElementById('timer'),
    stopwatch: document.getElementById('stopwatch')
  };
  
  const navItems = document.querySelectorAll('.nav-item');

  // Initialize all pages (import and init their respective JS)
//   import('./clock.js').then(module => module.initClock());
//   import('./alarm.js').then(module => module.initAlarm());
//   import('./timer.js').then(module => module.initTimer());
//   import('./stopwatch.js').then(module => module.initStopwatch());

  // Set up navigation
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const pageId = this.getAttribute('data-page');
      
      // Hide all pages
      Object.values(pages).forEach(page => page.classList.add('hidden'));
      
      // Show selected page
      pages[pageId].classList.remove('hidden');
      
      // Update active nav item
      navItems.forEach(navItem => navItem.classList.remove('active'));
      this.classList.add('active');
    });
  });
});