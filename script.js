document.addEventListener('DOMContentLoaded', () => {

    // A. Header Sticky (Glassmorphism on scroll)
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // B. Parallax Effect for Hero
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;
        if(parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });

    // Scroll Reveal (Fade In Up)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        fadeElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // =========================================================================
    // TESTIMONIAL HORIZONTAL SLIDER
    // =========================================================================
    const slidesTrack = document.querySelector('.slides-track');
    const bullets = document.querySelectorAll('.glass-bullet');
    let currentSlide = 0;
    let autoSlideInterval;
    const totalSlides = document.querySelectorAll('.slide').length;

    function goToSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;
        currentSlide = index;
        
        // Slide horizontally
        if (slidesTrack) {
            slidesTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Update bullets
        bullets.forEach(b => b.classList.remove('active'));
        if (bullets[currentSlide]) {
            bullets[currentSlide].classList.add('active');
        }
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 6000);
    }

    // Bullet click navigation
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Start auto-slide
    if (totalSlides > 1) {
        startAutoSlide();
    }

});

// =========================================================================
// EXPAND / COLLAPSE IMAGE CONTAINERS
// =========================================================================
function toggleExpand(id) {
    const container = document.getElementById(id);
    if (!container) return;
    
    const isCollapsed = container.classList.contains('collapsed');
    const btn = container.querySelector('.expand-text');
    
    if (isCollapsed) {
        // Get the full height of the inner content
        const inner = container.querySelector('.expandable-inner');
        const img = inner.querySelector('img');
        
        // Wait a frame for the image to adjust
        container.classList.remove('collapsed');
        
        requestAnimationFrame(() => {
            const fullHeight = inner.scrollHeight + 60;
            container.style.maxHeight = fullHeight + 'px';
        });
        
        if (btn) btn.textContent = 'VER MENOS';
    } else {
        container.style.maxHeight = '350px';
        container.classList.add('collapsed');
        if (btn) btn.textContent = 'VER MAIS';
        
        // Scroll back to the container if it's out of view
        setTimeout(() => {
            const rect = container.getBoundingClientRect();
            if (rect.top < 0) {
                container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    }
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}