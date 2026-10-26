const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeMeta = document.querySelector('meta[name="theme-color"]');
if (localStorage.getItem('portfolio-theme') === 'dark') document.body.classList.add('dark');

function syncThemeControl() {
  const darkMode = document.body.classList.contains('dark');
  themeIcon.textContent = darkMode ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
  themeMeta.content = darkMode ? '#181b18' : '#f7f7f2';
}

syncThemeControl();
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  syncThemeControl();
});
