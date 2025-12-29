/**
 * INFOTEK SYSTEMS CORE LOGIC
 * v4.0.2 - STABLE
 */

document.addEventListener("DOMContentLoaded", () => {
    initSystem();
});

function initSystem() {
    initLoader();
    initMegaMenu();
    initTypewriters();
    initTicker();
    initNetworkBackground(); // Canvas animation
    highlightActivePage();
    initScrollObserver();
}

/* =========================================
   1. LOADER SEQUENCE
   ========================================= */
function initLoader() {
    const loader = document.getElementById('loader');
    const scanLine = document.querySelector('.scan-line');
    const loaderText = document.querySelector('.loader-text-status');
    
    if (!loader) return;

    // Sequence of loading states
    const states = [
        "INITIALIZING KERNEL...",
        "LOADING ONTOLOGY...",
        "ESTABLISHING SECURE HANDSHAKE...",
        "SYSTEM ONLINE"
    ];

    let step = 0;
    
    // Text update interval
    const textInterval = setInterval(() => {
        if (step < states.length) {
            if(loaderText) loaderText.innerText = states[step];
            step++;
        }
    }, 400);

    // Remove loader
    setTimeout(() => {
        clearInterval(textInterval);
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        
        setTimeout(() => {
            loader.remove();
            document.body.classList.add('system-ready');
        }, 800);
    }, 2200);
}

/* =========================================
   2. MEGA MENU & NAVIGATION
   ========================================= */
function initMegaMenu() {
    const navItems = document.querySelectorAll('[data-menu-target]');
    const menuContainer = document.querySelector('.mega-menu-container');
    const panels = document.querySelectorAll('.mega-panel');
    let hoverTimeout;
    let closeTimeout;

    if (!menuContainer) return;

    // Open logic
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            clearTimeout(closeTimeout);
            
            // Remove active state from all items
            navItems.forEach(i => i.classList.remove('active-state'));
            item.classList.add('active-state');

            const targetId = item.getAttribute('data-menu-target');
            
            // Switch panels
            panels.forEach(panel => {
                if(panel.id === targetId) {
                    panel.style.display = 'grid';
                    // Trigger reflow for animation
                    void panel.offsetWidth; 
                    panel.classList.add('active');
                } else {
                    panel.style.display = 'none';
                    panel.classList.remove('active');
                }
            });

            menuContainer.classList.add('visible');
        });
    });

    // Keep open when hovering the menu itself
    menuContainer.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);
    });

    // Close logic (Header)
    document.querySelector('.nav-bar').addEventListener('mouseleave', () => {
        closeTimeout = setTimeout(() => {
            menuContainer.classList.remove('visible');
            navItems.forEach(i => i.classList.remove('active-state'));
        }, 150);
    });

    // Close logic (Menu Container)
    menuContainer.addEventListener('mouseleave', () => {
        closeTimeout = setTimeout(() => {
            menuContainer.classList.remove('visible');
            navItems.forEach(i => i.classList.remove('active-state'));
        }, 150);
    });
}

/* =========================================
   3. TYPEWRITER ENGINE
   ========================================= */
function initTypewriters() {
    const elements = document.querySelectorAll('.js-typewrite');
    
    elements.forEach((el) => {
        const rawData = el.getAttribute('data-text');
        if(!rawData) return;
        
        const phrases = rawData.split('|');
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 50;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleting
                el.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 30; // Faster delete
            } else {
                // Typing
                el.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 50 + Math.random() * 50; // Humanize typing
            }

            // Logic for switching states
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Finished typing phrase
                isDeleting = true;
                typeSpeed = 2500; // Wait before deleting
                el.classList.add('blink-caret'); // Blink while waiting
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before next phrase
                el.classList.remove('blink-caret');
            } else {
                el.classList.remove('blink-caret');
            }

            setTimeout(type, typeSpeed);
        }

        // Initial Start Delay
        setTimeout(type, 1500);
    });
}

/* =========================================
   4. INFINITE TICKER CLONING
   ========================================= */
function initTicker() {
    const track = document.querySelector('.ticker-track');
    if (!track) return;
    
    // Clone contents to ensure seamless loop
    const content = track.innerHTML;
    track.innerHTML = content + content + content + content;
}

/* =========================================
   5. CANVAS NETWORK BACKGROUND
   ========================================= */
function initNetworkBackground() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Configuration
    const particleCount = 40;
    const connectionDistance = 150;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = 1.5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw() {
            ctx.fillStyle = '#333';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        resize();
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            
            // Draw connections
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < connectionDistance) {
                    ctx.strokeStyle = `rgba(50, 50, 50, ${1 - dist/connectionDistance})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resize);
    init();
    animate();
}

/* =========================================
   6. UTILITIES
   ========================================= */
function highlightActivePage() {
    const path = window.location.pathname.split("/").pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        if(link.getAttribute('href') === path) {
            link.closest('.nav-item').classList.add('active');
        }
    });
}

function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .stat-box, .hero h1').forEach(el => {
        el.classList.add('fade-in-section'); // CSS class for opacity 0
        observer.observe(el);
    });
}
