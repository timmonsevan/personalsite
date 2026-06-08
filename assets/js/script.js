

const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

dropdownBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = dropdownMenu.classList.toggle('open');
  dropdownBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', () => {
  dropdownMenu.classList.remove('open');
  dropdownBtn.setAttribute('aria-expanded', 'false');
});

const toggleButton = document.getElementById('theme-toggle');

toggleButton.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
