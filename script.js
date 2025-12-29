

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const main = document.getElementById("main-content");

  if (!loader || !main) return;

  // Stage 1: loader exit
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 500);

  // Stage 2: content visible
  setTimeout(() => {
    loader.remove();
    main.classList.add("visible");
    startHeroReveal();
  }, 1100);
});



function startHeroReveal() {
  const typeEls = document.querySelectorAll(".typewriter");

  typeEls.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.6}s`;
  });
}



const navItems = document.querySelectorAll(".nav-item[data-menu]");
const panels = document.querySelectorAll(".mega-panel");
let activePanel = null;

navItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    const target = item.dataset.menu;
    const panel = document.querySelector(`[data-panel="${target}"]`);

    if (!panel || panel === activePanel) return;

    closeAllPanels();

    activePanel = panel;
    item.classList.add("active");
    panel.classList.add("active");

    animatePanelIn(panel);
  });
});

/* Close menu on mouse leave */
document.querySelector(".header-frame")?.addEventListener("mouseleave", () => {
  closeAllPanels();
});

/* Click outside closes everything */
document.addEventListener("click", e => {
  if (!e.target.closest(".nav-center") && !e.target.closest(".mega-menu")) {
    closeAllPanels();
  }
});

function closeAllPanels() {
  panels.forEach(p => {
    p.classList.remove("active");
    p.style.transform = "";
    p.style.opacity = "";
  });

  navItems.forEach(i => i.classList.remove("active"));
  activePanel = null;
}



function animatePanelIn(panel) {
  panel.style.opacity = "0";
  panel.style.transform = "translateY(-6px)";

  requestAnimationFrame(() => {
    panel.style.transition =
      "opacity 220ms ease-out, transform 260ms cubic-bezier(.22,.61,.36,1)";
    panel.style.opacity = "1";
    panel.style.transform = "translateY(0)";
  });

  staggerLinks(panel);
}



function staggerLinks(panel) {
  const links = panel.querySelectorAll("a");
  links.forEach((link, i) => {
    link.style.opacity = "0";
    link.style.transform = "translateX(-4px)";
    link.style.transition = "none";

    setTimeout(() => {
      link.style.transition =
        "opacity 180ms ease-out, transform 220ms ease-out";
      link.style.opacity = "1";
      link.style.transform = "translateX(0)";
    }, 40 + i * 35);
  });
}



(function markActivePage() {
  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-item[href]").forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    }
  });
})();
