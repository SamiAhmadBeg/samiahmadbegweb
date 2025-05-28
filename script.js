// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Update scroll progress bar
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollable) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// Add a subtle animation to the hero section
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    setTimeout(() => {
        hero.style.transition = 'opacity 1s ease';
        hero.style.opacity = '1';
    }, 100);

    // Animate skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        setTimeout(() => {
            tag.style.transition = 'all 0.5s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });

    // Mode toggle logic
    const modeToggle = document.querySelector('.mode-toggle');
    if (!modeToggle) return;
    const modeIcon = modeToggle.querySelector('i');
    const body = document.body;
    // Load saved mode
    const savedMode = localStorage.getItem('colorMode');
    if (savedMode === 'light') {
        body.classList.add('light-mode');
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    } else {
        body.classList.remove('light-mode');
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
    }
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        if (isLight) {
            modeIcon.classList.remove('fa-moon');
            modeIcon.classList.add('fa-sun');
            localStorage.setItem('colorMode', 'light');
        } else {
            modeIcon.classList.remove('fa-sun');
            modeIcon.classList.add('fa-moon');
            localStorage.setItem('colorMode', 'dark');
        }
    });
});

// Add hover effect to skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseover', () => {
        tag.style.transform = 'translateY(-5px)';
    });
    tag.addEventListener('mouseout', () => {
        tag.style.transform = 'translateY(0)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Easter Egg: Party Mode + Matrix Code Rain on 5 mode toggles in a row
let modeToggleCount = 0;
let modeToggleTimeout;
let matrixActive = false;
let matrixCanvas, matrixInterval;

function triggerPartyMode() {
    const body = document.body;
    let partyInterval;
    let i = 0;
    const partyColors = [
        '#ff4b1f', '#1fddff', '#f9d423', '#a1ffce', '#fbc2eb', '#fad0c4', '#a18cd1', '#fbc2eb', '#f7797d', '#cfd9df', '#e2d1c3'
    ];
    const allTextEls = document.querySelectorAll('body, body *');
    partyInterval = setInterval(() => {
        body.style.background = partyColors[i % partyColors.length];
        allTextEls.forEach(el => {
            el.style.color = partyColors[(i + 5) % partyColors.length];
        });
        i++;
    }, 100);
    setTimeout(() => {
        clearInterval(partyInterval);
        body.style.background = '';
        allTextEls.forEach(el => {
            el.style.color = '';
        });
    }, 7000); // 7 seconds
}

function startMatrixRain() {
    if (matrixActive) return;
    matrixActive = true;
    matrixCanvas = document.createElement('canvas');
    matrixCanvas.className = 'matrix-canvas';
    document.body.appendChild(matrixCanvas);
    const ctx = matrixCanvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    matrixCanvas.width = width;
    matrixCanvas.height = height;
    let fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = fontSize + 'px monospace';
        ctx.fillStyle = '#00ff41';
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    matrixInterval = setInterval(drawMatrix, 50);
    window.addEventListener('resize', resizeMatrixCanvas);
    function resizeMatrixCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        matrixCanvas.width = width;
        matrixCanvas.height = height;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1);
    }
    setTimeout(() => {
        stopMatrixRain();
    }, 5000); // 5 seconds
}

function stopMatrixRain() {
    if (!matrixActive) return;
    matrixActive = false;
    if (matrixInterval) clearInterval(matrixInterval);
    if (matrixCanvas) matrixCanvas.remove();
    window.removeEventListener('resize', null);
}

const modeToggleBtn = document.querySelector('.mode-toggle');
if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', () => {
        if (matrixActive) stopMatrixRain();
        modeToggleCount++;
        clearTimeout(modeToggleTimeout);
        modeToggleTimeout = setTimeout(() => {
            modeToggleCount = 0;
        }, 2000); // Reset after 2 seconds of inactivity
        if (modeToggleCount === 5) {
            triggerPartyMode();
            startMatrixRain();
            modeToggleCount = 0;
        }
    });
}

// Hamburger menu toggle for mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    });
    // Keyboard accessibility
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            navLinks.classList.toggle('open');
        }
    });
} 
