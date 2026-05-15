document.addEventListener('DOMContentLoaded', () => {
    const flowers = document.querySelectorAll('.flower');
    const container = document.body;

    // Parallax effect for flowers based on mouse movement
    container.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        flowers.forEach((flower, index) => {
            const speed = (index + 1) * 0.02;
            const x = (clientX - centerX) * speed;
            const y = (clientY - centerY) * speed;
            
            // Adding to the existing float animation
            flower.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Scroll down interaction
    const scrollBtn = document.querySelector('.scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        });
    }

    // Micro-interactions for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
    });

    console.log('Deepstyle loaded - Pixel Perfect Fashion UI');
});
