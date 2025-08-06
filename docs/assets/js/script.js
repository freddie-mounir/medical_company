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

    // Mouse Follower using GSAP QuickSetter for better performance
    const mouseFollower = document.getElementById('mouse-follower');
    
    // Only initialize if the element exists
    if (mouseFollower && typeof gsap !== 'undefined') {
        // Hide the follower by default
        gsap.set(mouseFollower, { 
            x: -100, 
            y: -100,
            opacity: 0
        });
        
        // Create QuickSetter for optimal performance
        const setMouseFollower = gsap.quickSetter(mouseFollower, 'x,y', 'px');
        
        // Variables to store mouse coordinates
        let mouseX = -100;
        let mouseY = -100;
        let followerX = -100;
        let followerY = -100;
        
        // Follow speed (0 = no follow, 1 = instant follow)
        const followSpeed = 0.12;
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show follower when mouse moves
            if (parseFloat(mouseFollower.style.opacity) < 1) {
                gsap.to(mouseFollower, {
                    opacity: 1,
                    duration: 0.3,
                    overwrite: true
                });
            }
        });
        
        // Animation loop with QuickSetter
        function animateFollower() {
            // Calculate the distance between mouse and follower
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            // Move follower towards mouse position with easing
            followerX += dx * followSpeed;
            followerY += dy * followSpeed;
            
            // Use QuickSetter for high-performance updates
            setMouseFollower(followerX, followerY);
            
            requestAnimationFrame(animateFollower);
        }
        
        // Start animation loop
        animateFollower();
        
        // Hide follower when mouse leaves window
        document.addEventListener('mouseleave', () => {
            gsap.to(mouseFollower, {
                opacity: 0,
                duration: 0.3
            });
        });
        
        // Show follower when mouse enters window
        document.addEventListener('mouseenter', () => {
            gsap.to(mouseFollower, {
                opacity: 1,
                duration: 0.3
            });
        });
    }
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
// Create a small blue circle cursor follower
const cursor = document.createElement('div');
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    background: #3b82f6;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
`;
document.body.appendChild(cursor);

// Track mouse position and update circle position
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 5 + 'px';
    cursor.style.top = e.clientY - 5 + 'px';
    
    if (parseFloat(cursor.style.opacity) === 0) {
        cursor.style.opacity = '1';
    }
});

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Show cursor when mouse enters window
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

