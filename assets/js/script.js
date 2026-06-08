// Dropdown menu: toggles open state and keeps aria-expanded in sync for
// accessibility.
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownMenu = document.getElementById("dropdown-menu");

dropdownBtn.addEventListener("click", (e) => {
  // Stop propagation so this click isn't immediately caught by the
  // document listener below, which closes the menu.
  e.stopPropagation();
  const isOpen = dropdownMenu.classList.toggle("open");
  dropdownBtn.setAttribute("aria-expanded", isOpen);
});

// Clicking anywhere outside the dropdown closes it.
document.addEventListener("click", () => {
  dropdownMenu.classList.remove("open");
  dropdownBtn.setAttribute("aria-expanded", "false");
});

// Theme toggle: flips between light/dark and persists the choice so it
// survives page reloads.
const toggleButton = document.getElementById("theme-toggle");

toggleButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Mobile nav menu toggle, mirroring the dropdown's open/aria-expanded pattern.
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", (e) => {
  // Stop propagation for the same reason as the dropdown button above.
  e.stopPropagation();
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Parallax background: moves at 30% of scroll speed for a depth effect.
// Skipped entirely for users who prefer reduced motion.
const parallaxBg = document.getElementById("parallax-bg");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("scroll", () => {
    parallaxBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }, { passive: true });
}
