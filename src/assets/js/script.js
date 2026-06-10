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

function updateThemeLabel() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  toggleButton.textContent = isDark ? "Light Mode" : "Dark Mode";
}

updateThemeLabel();

toggleButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeLabel();
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

// Doom Bandname Generator
// const bandContainer = document.querySelector('[data-names]');
// const bandNames = JSON.parse(bandContainer.dataset.names);

// document.getElementById('generate-btn').addEventListener('click', () => {
//   if (bandNames.length === 0) return;
//   const first = bandNames[Math.floor(Math.random() * bandNames.length)];
//   const rest = bandNames.filter(n => n !== first);
//   const second = rest[Math.floor(Math.random() * rest.length)];
//   document.getElementById('band-name-1').textContent = first;
//   document.getElementById('band-name-2').textContent = second;
// });

// MTG Random Card
// document.getElementById("mtg-card-btn").addEventListener("click", async () => {
//   const img = document.getElementById("mtg-card-img");
//   const errorEl = document.getElementById("mtg-card-error");
//   try {
//     const res = await fetch("/api/mtg-random-card");
//     const data = await res.json();
//     if (data.imageUrl) {
//       img.src = data.imageUrl;
//       img.alt = "Random MTG card";
//       img.hidden = false;
//       errorEl.hidden = true;
//     } else {
//       throw new Error("No image returned");
//     }
//   } catch {
//     errorEl.textContent = "Could not load card. Try again.";
//     errorEl.hidden = false;
//     img.hidden = true;
//   }
// });

// Parallax background: moves at 30% of scroll speed for a depth effect.
// Skipped entirely for users who prefer reduced motion.
const parallaxBg = document.getElementById("parallax-bg");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener(
    "scroll",
    () => {
      parallaxBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    },
    { passive: true },
  );
}
