document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal Animation for Timeline & Letters
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Triggers when element is 100px into view

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Trigger once on load in case elements are already in view
    revealOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);

    // 2. Interactive Polaroids for Mobile/Touch
    // This allows iPhone users to tap a polaroid to bring it to the front and straighten it
    const polaroids = document.querySelectorAll('.polaroid');

    polaroids.forEach(polaroid => {
        polaroid.addEventListener('click', () => {
            // Remove active class from all other polaroids
            polaroids.forEach(p => {
                if (p !== polaroid) p.classList.remove('active');
            });
            
            // Toggle active class on the clicked one
            polaroid.classList.toggle('active');
        });
    });

    // 3. Timeline Dot Pulse
    // Makes the dots on the timeline pulse slightly when hovered
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.parentElement.addEventListener('mouseenter', () => {
            dot.style.transform = 'scale(1.3)';
            dot.style.backgroundColor = 'var(--secondary-color)';
        });
        
        dot.parentElement.addEventListener('mouseleave', () => {
            dot.style.transform = 'scale(1)';
            dot.style.backgroundColor = 'var(--light-color)';
        });
    });
});