window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const main = document.getElementById("main-content");

 
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 600);

 
  setTimeout(() => {
    loader.remove();
    main.classList.add("visible");
  }, 1200);
});


const buttons = document.querySelectorAll("[data-menu]");
const panels = document.querySelectorAll(".mega-panel");

buttons.forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();

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


document.addEventListener("click", e => {
  if (!e.target.closest(".nav-center") && !e.target.closest(".mega-menu")) {
    panels.forEach(p => p.classList.remove("active"));
    buttons.forEach(b => b.classList.remove("active"));
  }
});
