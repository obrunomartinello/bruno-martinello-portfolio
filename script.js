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
    
    // We removed the manual javascript hover follow for service items since it is now
    // replaced with a much cleaner two-column glass layout via purely CSS.

});
