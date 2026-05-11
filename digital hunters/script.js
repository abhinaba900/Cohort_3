// Digital Hunters - AAA Studio Master Script

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- Optimized Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smoothing for large cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Faster follow for dot
        dotX += (mouseX - dotX) * 0.8;
        dotY += (mouseY - dotY) * 0.8;

        cursor.style.transform = `translate(${cursorX - 16}px, ${cursorY - 16}px)`;
        dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // --- Magnetic Effect ---
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.6,
                ease: "power3.out"
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // --- Cursor Hover Effects ---
    const interactiveItems = document.querySelectorAll('a, button, .project-card, .process-card');
    interactiveItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            gsap.to(dot, { scale: 0, duration: 0.2 });
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            gsap.to(dot, { scale: 1, duration: 0.2 });
        });
    });

    // --- Particle System ---
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = 'rgba(0, 245, 212, ' + (Math.random() * 0.3) + ')';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 150; i++) {
            particlesArray.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- Vanilla Tilt ---
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // --- Hero Character Mouse Parallax ---
    document.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 50;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 50;
        
        gsap.to("#hero-character", {
            x: xPos,
            y: yPos,
            duration: 2,
            ease: "power2.out"
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            gsap.fromTo(mobileMenuLinks, 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }
            );
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            });
        });
    }
});
