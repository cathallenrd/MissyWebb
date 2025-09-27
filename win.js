/**
 * WIN CELEBRATION PAGE JAVASCRIPT
 * Celebration effects and interactions for the win page
 */

// Wait for the DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const confettiContainer = document.getElementById('confettiContainer');
    const moreConfettiBtn = document.getElementById('moreConfetti');
    const toggleMusicBtn = document.getElementById('toggleMusic');
    const celebrationMusic = document.getElementById('celebrationMusic');
    
    // Music state
    let musicPlaying = false;
    
    // Start celebration immediately when page loads
    startCelebration();
    
    /**
     * Starts the celebration effects
     */
    function startCelebration() {
        // Create initial confetti
        createConfettiBurst(150);
        
        // Add floating animation to trophy
        const trophyIcon = document.querySelector('.trophy-icon');
        trophyIcon.style.animation = 'float 3s ease-in-out infinite';
        
        // Add vibration if supported
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 100]);
        }
    }
    
    /**
     * Creates a burst of confetti
     * @param {number} count - Number of confetti pieces to create
     */
    function createConfettiBurst(count) {
        for (let i = 0; i < count; i++) {
            createConfetti();
        }
    }
    
    /**
     * Creates a single confetti piece
     */
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties - using pink and red theme colors
        const colors = ['#FF4D6D', '#FF8FA3', '#FFCCD5', '#DC143C', '#FF69B4', '#FF1493', '#E91E63'];
        const size = Math.random() * 10 + 5;
        
        // Set random styles
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // Random position at top of screen
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '-20px';
        
        // Add to container
        confettiContainer.appendChild(confetti);
        
        // Animate falling
        const duration = Math.random() * 3 + 2;
        const horizontalMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { 
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translate(${horizontalMovement}px, 100vh) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.1, 1)'
        });
        
        // Remove after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, duration * 1000);
    }
    
    /**
     * Toggles celebration music
     */
    function toggleMusic() {
        if (musicPlaying) {
            celebrationMusic.pause();
            toggleMusicBtn.textContent = 'Play Celebration Music 🎵';
            musicPlaying = false;
        } else {
            celebrationMusic.play().catch(e => {
                console.log('Audio play failed:', e);
                // Fallback: Show message about interaction requirement
                showMessage('Click the button again to play music! 🎵');
            });
            toggleMusicBtn.textContent = 'Pause Music 🔇';
            musicPlaying = true;
        }
    }
    
    /**
     * Shows a temporary message
     * @param {string} text - The message to display
     */
    function showMessage(text) {
        const message = document.createElement('div');
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 1000;
            font-size: 1.2rem;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                document.body.removeChild(message);
            }
        }, 2000);
    }
    
    // Event listeners
    moreConfettiBtn.addEventListener('click', function() {
        createConfettiBurst(100);
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
    
    toggleMusicBtn.addEventListener('click', toggleMusic);
    
    // Add keyboard support for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ') { // Space bar
            createConfettiBurst(50);
        } else if (e.key === 'm' || e.key === 'M') {
            toggleMusic();
        }
    });
    
    // Handle iOS viewport height issue
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Prevent elastic scroll on iOS
    document.body.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
});