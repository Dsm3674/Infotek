window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("main-content").classList.add("visible");
  }, 800);
});

const buttons = document.querySelectorAll("[data-menu]");
const panels = document.querySelectorAll(".mega-panel");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.menu;
    const panel = document.querySelector(`[data-panel="${target}"]`);
    const isOpen = panel.classList.contains("active");

    panels.forEach(p => p.classList.remove("active"));
    buttons.forEach(b => b.classList.remove("active"));

    if (!isOpen) {
      panel.classList.add("active");
      btn.classList.add("active");
    }
  });
});

// Close mega menu when clicking outside
document.addEventListener("click", e => {
  if (!e.target.closest(".nav-center") && !e.target.closest(".mega-menu")) {
    panels.forEach(p => p.classList.remove("active"));
    buttons.forEach(b => b.classList.remove("active"));
  }
});
