// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Mobile products menu toggle
    document.getElementById('products-toggle').addEventListener('click', function() {
        document.getElementById('products-menu').classList.toggle('hidden');
    });

    // Back to top button
    var backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'flex';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.display = 'none';
                backToTopButton.style.opacity = '0';
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Create animated border for product cards using GSAP
const cards = document.querySelectorAll('.product-card');

cards.forEach(card => {
    // Create border line elements
    const topLine = document.createElement('div');
    const rightLine = document.createElement('div');
    const bottomLine = document.createElement('div');
    const leftLine = document.createElement('div');

    // Add class and custom styles
    topLine.className = 'border-line';
    rightLine.className = 'border-line';
    bottomLine.className = 'border-line';
    leftLine.className = 'border-line';

    // Top border line
    topLine.style.top = '0';
    topLine.style.left = '0';

    // Right border line
    rightLine.style.top = '0';
    rightLine.style.right = '0';
    rightLine.style.width = '3px';
    rightLine.style.height = '40px';

    // Bottom border line
    bottomLine.style.bottom = '0';
    bottomLine.style.right = '0';

    // Left border line
    leftLine.style.bottom = '0';
    leftLine.style.left = '0';
    leftLine.style.width = '3px';
    leftLine.style.height = '40px';

    // Ensure the product card has position relative
    card.style.position = 'relative';
    card.style.overflow = 'visible';

    // Append to card
    card.appendChild(topLine);
    card.appendChild(rightLine);
    card.appendChild(bottomLine);
    card.appendChild(leftLine);

    // Create timeline
    const tl = gsap.timeline({
        repeat: -1,
        defaults: { duration: 0.8, ease: "power2.inOut" }
    });

    // Animate border lines in sequence
    tl.to(topLine, { opacity: 1, width: '100%', duration: 0.6 })
      .to(rightLine, { opacity: 1, height: '100%', duration: 0.6 })
      .to(bottomLine, { opacity: 1, width: '100%', duration: 0.6 })
      .to(leftLine, { opacity: 1, height: '100%', duration: 0.6 })
      .to([topLine, rightLine, bottomLine, leftLine], {
          opacity: 1,
          duration: 0.8,
          backgroundColor: '#2563eb' // Brighter blue for emphasis
      })
      .to(topLine, { opacity: 0, width: '40px', delay: 0.3 })
      .to(rightLine, { opacity: 0, height: '40px', delay: 0.1 })
      .to(bottomLine, { opacity: 0, width: '40px', delay: 0.1 })
      .to(leftLine, { opacity: 0, height: '40px', delay: 0.1 });

    // Pause animation on hover
    card.addEventListener('mouseenter', () => {
        tl.pause();
        gsap.to([topLine, rightLine, bottomLine, leftLine], {
            opacity: 1,
            backgroundColor: '#1e40af',
            width: function(i) { return i % 2 === 0 ? '100%' : '3px' },
            height: function(i) { return i % 2 === 1 ? '100%' : '3px' },
            duration: 0.3,
            boxShadow: '0 0 8px rgba(30, 64, 175, 0.9)'
        });
    });

    // Resume animation on mouse leave
    card.addEventListener('mouseleave', () => {
        tl.play();
    });
});