document.addEventListener('DOMContentLoaded', () => {
    // Gallery Switcher
    const mainImg = document.getElementById('main-product-img');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active state
            galleryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update main image with animation
            const newSrc = item.getAttribute('data-src');
            
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = newSrc;
                mainImg.style.opacity = '1';
            }, 300);
        });
    });

    // Color Selector
    const colors = document.querySelectorAll('.color');
    colors.forEach(color => {
        color.addEventListener('click', () => {
            colors.forEach(c => c.classList.remove('active'));
            color.classList.add('active');
            
            // Log selected color (simulating selection logic)
            console.log(`Selected color: ${color.getAttribute('data-color')}`);
        });
    });

    // Add to Bag Interaction
    const addToBagBtn = document.querySelector('.add-to-bag');
    const cartBadge = document.querySelector('.cart-icon .badge');

    addToBagBtn.addEventListener('click', () => {
        // Animation
        addToBagBtn.innerHTML = '<i data-lucide="check"></i><span>Added!</span>';
        lucide.createIcons();
        
        let currentCount = parseInt(cartBadge.innerText);
        cartBadge.innerText = currentCount + 1;

        // Feedback scale effect
        cartBadge.style.transform = 'scale(1.5)';
        setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
        }, 300);

        // Reset button
        setTimeout(() => {
            addToBagBtn.innerHTML = '<i data-lucide="shopping-bag"></i><span>Add to bag</span>';
            lucide.createIcons();
        }, 2000);
    });

    // Simple scroll reveal simulation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hero > div, .info-bar').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
});
