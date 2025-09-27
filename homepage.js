/**
 * ROMANTIC PROPOSAL HOMEPAGE JAVASCRIPT
 * Mobile-optimized with iPhone 14 Pro support
 * Includes interactive slideshow for memories and shrinking No button
 */

// Wait for the DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the buttons
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    
    // Slideshow elements
    const slideshowOverlay = document.getElementById('slideshowOverlay');
    const slideshowSlides = document.getElementById('slideshowSlides');
    const slideshowCounter = document.getElementById('slideshowCounter');
    const slideshowClose = document.getElementById('slideshowClose');
    const slideshowPrev = document.getElementById('slideshowPrev');
    const slideshowNext = document.getElementById('slideshowNext');
    const slideshowExit = document.getElementById('slideshowExit');
    const memoryItems = document.querySelectorAll('.memory-item');
    
    // Slideshow state
    let currentSlideIndex = 0;
    let slideshowData = [];
    let startX = 0;
    let currentX = 0;
    let currentCategory = 0;
    let scrollPosition = 0; // Store scroll position
    
    // No button click counter and state
    let noButtonClicks = 0;
    let noButtonVisible = true;
    
    // Slideshow content for each category
    const slideshowContent = {
        0: [ // Our Dates
            {
                image: "pictures/IMG_1878.JPG"
            },
            {
                image: "pictures/IMG_2171.JPG"
            },
            {
                image: "pictures/IMG_2173.JPG"
            },
            {
                image: "pictures/IMG_2078.JPG"
            },
            {
                image: "pictures/IMG_2177.JPG"
            },
            {
                image: "pictures/IMG_2178.JPG"
            },
            {
                image: "pictures/IMG_2085.JPG"
            },
            {
                image: "pictures/IMG_2179.JPG"
            },
            {
                image: "pictures/IMG_2175.JPG"
            },
            {
                image: "pictures/IMG_2174.JPG"
            },
            {
                image: "pictures/IMG_2180.JPG"
            },
            {
                image: "pictures/IMG_2181.JPG"
            },
            {
                image: "pictures/IMG_2176.JPG"
            },
            {
                image: "pictures/IMG_1966.JPG"
            }
        ],
        1: [ // Fav Moments
            {
                image: "pictures/fire/IMG_2059.JPG"
            },
            {
                image: "pictures/fire/IMG_1965.JPG"
            },
            {
                image: "pictures/fire/IMG_1967.JPG"
            },
            {
                image: "pictures/fire/IMG_1968.JPG"
            },
            {
                image: "pictures/fire/IMG_2058.JPG"
            },
            {
                image: "pictures/fire/IMG_2082.JPG"
            },
            {
                image: "pictures/fire/IMG_2052.jpg"
            },
            {
                image: "pictures/fire/IMG_2083.JPG"
            },
            {
                image: "pictures/fire/IMG_2091.JPG"
            },
            {
                image: "pictures/fire/IMG_2192.JPG"
            },
            {
                image: "pictures/fire/IMG_2184.JPG"
            },
            {
                image: "pictures/fire/IMG_2185.JPG"
            },
            {
                image: "pictures/fire/IMG_2201.JPG"
            },
            {
                image: "pictures/fire/IMG_2186.JPG"
            },
            {
                image: "pictures/fire/IMG_2187.JPG"
            },
            {
                image: "pictures/fire/IMG_2190.JPG"
            },
            {
                image: "pictures/fire/IMG_2191.JPG"
            },
            {
                image: "pictures/fire/IMG_2194.JPG"
            },
            {
                image: "pictures/fire/IMG_2197.JPG"
            },
            {
                image: "pictures/fire/IMG_2199.JPG"
            },
            {
                image: "pictures/fire/IMG_2200.JPG"
            },
            {
                image: "pictures/fire/IMG_2209.JPG"
            },
            {
                image: "pictures/fire/IMG_2198.JPG"
            },
            {
                image: "pictures/fire/IMG_2193.JPG"
            },
            {
                image: "pictures/fire/IMG_2210.JPG"
            },
            {
                image: "pictures/fire/IMG_2089.JPG"
            }
        ],
        2: [ // Funny Photos
            {
                image: "pictures/funny/IMG_2069.jpg"
            },
            {
                image: "pictures/funny/IMG_2218.JPG"
            },
            {
                image: "pictures/funny/IMG_2227.JPG"
            },
            {
                image: "pictures/funny/IMG_2147.JPG"
            },
            {
                image: "pictures/funny/IMG_2129.JPG"
            },
            {
                image: "pictures/funny/IMG_2111.PNG"
            },
            {
                image: "pictures/funny/IMG_1974.jpg"
            },
            {
                image: "pictures/funny/IMG_1896.JPG"
            },
            {
                image: "pictures/funny/IMG_2221.JPG"
            },
            {
                image: "pictures/funny/IMG_2230.JPG"
            },
            {
                image: "pictures/funny/IMG_2141.JPG"
            },
            {
                image: "pictures/funny/IMG_2112.PNG"
            },
            {
                image: "pictures/funny/IMG_2219.JPG"
            },
            {
                image: "pictures/funny/IMG_2220.JPG"
            },
            {
                image: "pictures/funny/IMG_2222.JPG"
            },
            {
                image: "pictures/funny/IMG_2226.JPG"
            },
            {
                image: "pictures/funny/IMG_2225.JPG"
            },
            {
                image: "pictures/funny/IMG_2115.PNG"
            },
            {
                image: "pictures/funny/IMG_2228.JPG"
            },
            {
                image: "pictures/funny/IMG_2224.JPG"
            },
            {
                image: "pictures/funny/IMG_2229.JPG"
            },
            {
                image: "pictures/funny/IMG_2223.JPG"
            }
        ]
    };
    
    // Add event listener for the "Yes" button
    yesButton.addEventListener('click', function() {
        // Create celebration effect
        createCelebration();
        
        // Hide the buttons after selection
        document.querySelector('.buttons').style.display = 'none';
        
        // Vibrate on supported devices
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    });
    
    // Update the moveButton function to constrain movement within the buttons container
    function moveButton(button) {
        // Get the buttons container dimensions
        const buttonsContainer = document.querySelector('.buttons');
        const buttonsRect = buttonsContainer.getBoundingClientRect();
        
        // Calculate maximum positions within the container
        const maxX = buttonsRect.width - button.offsetWidth - 20;
        const maxY = buttonsRect.height - button.offsetHeight - 20;
        
        // Generate random positions within the container
        const randomX = Math.max(10, Math.min(maxX, Math.floor(Math.random() * maxX)));
        const randomY = Math.max(10, Math.min(maxY, Math.floor(Math.random() * maxY)));
        
        // Position the button absolutely within the container
        button.style.position = 'absolute';
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
        
        // Add a transition for smooth movement
        button.style.transition = 'left 0.3s ease, top 0.3s ease, transform 0.3s ease';
    }
    
    // Update the click event listener for the No button
    noButton.addEventListener('click', function(e) {
        // Prevent immediate click after touch
        if (e.clientX === 0 && e.clientY === 0) {
            return; // Likely a click triggered by touch event
        }
        
        // Move the button first
        moveButton(noButton);
        
        // Then handle the click counter and shrinking logic
        handleNoButtonClick();
        
        // Short vibration for feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Prevent default behavior
        e.preventDefault();
    });
    
    // Add touch event for mobile devices
    noButton.addEventListener('touchstart', function(e) {
        // Prevent default to avoid any scrolling issues
        e.preventDefault();
        
        // Move button on touch devices
        moveButton(noButton);
        
        // Then handle the click counter and shrinking logic
        handleNoButtonClick();
        
        // Short vibration for feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
    
    // Function to handle the click counter logic
    function handleNoButtonClick() {
        // Increment click counter
        noButtonClicks++;
        
        // Handle different click counts
        if (noButtonClicks === 1) {
            // First click - just show message
            showMessage("Are you sure? Maybe give it another thought? 💭");
        } else if (noButtonClicks >= 2 && noButtonClicks <= 4) {
            // Clicks 2-4 - shrink the button
            shrinkNoButton();
            
            // Show different messages for clicks 2-4
            if (noButtonClicks === 2) {
                showMessage("I'm not giving up that easily! ❤️");
            } else if (noButtonClicks === 3) {
                showMessage("You can't get rid of me that easily! 💕");
            } else if (noButtonClicks === 4) {
                showMessage("I'm persistent when it comes to you! 💖");
            }
        } else if (noButtonClicks >= 5) {
            // Fifth click and beyond - make button disappear with heart explosion
            explodeNoButton();
            
            if (noButtonClicks === 5) {
                showMessage("You can't say no forever! I'll keep asking! 💘");
            } else {
                showMessage("I'm not going anywhere! You're stuck with me! 💞");
            }
        }
    }
    
    /**
     * Shrinks the No button
     */
    function shrinkNoButton() {
        if (!noButtonVisible) return;
        
        // Calculate scale based on click count (smaller with each click)
        const scale = 1 - (noButtonClicks - 1) * 0.2;
        
        // Apply scaling transformation
        noButton.style.transform = `scale(${scale})`;
        noButton.style.transition = 'transform 0.3s ease';
    }
    
    /**
     * Makes the No button disappear with a heart explosion
     */
    function explodeNoButton() {
        if (!noButtonVisible) return;
        
        // Create heart explosion effect
        createHeartExplosion(noButton);
        
        // Hide the button
        noButton.style.opacity = '0';
        noButton.style.visibility = 'hidden';
        noButton.style.pointerEvents = 'none';
        noButtonVisible = false;
        
        // Add explosion class for any additional effects
        noButton.classList.add('button-exploded');
        
        // Remove the button from layout after animation
        setTimeout(() => {
            noButton.style.display = 'none';
        }, 500);
    }
    
    /**
     * Creates a heart explosion effect from an element
     * @param {HTMLElement} element - The element to explode from
     */
    function createHeartExplosion(element) {
        const rect = element.getBoundingClientRect();
        const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '💞'];
        
        // Create multiple hearts
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart heart-explosion';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = (rect.left + rect.width / 2) + 'px';
            heart.style.top = (rect.top + rect.height / 2) + 'px';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.zIndex = '1000';
            
            document.body.appendChild(heart);
            
            // Animate heart
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 1000 + 1000;
            
            heart.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'ease-out'
            });
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, duration);
        }
    }
    
    /**
     * Shows a message to the user
     * @param {string} text - The message to display
     */
    function showMessage(text) {
        // Get the proposal section to position the message
        const proposalSection = document.querySelector('.proposal');
        const proposalRect = proposalSection.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        
        // Create message element
        const message = document.createElement('div');
        message.textContent = text;
        message.classList.add('message-popup');
        message.classList.add('non-blocking');
        
        // Position message in the center of the proposal section
        message.style.position = 'absolute';
        message.style.top = `${proposalRect.top + scrollY + (proposalRect.height / 2) - 50}px`;
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.zIndex = '1001';
        
        // Add to document
        document.body.appendChild(message);
        
        // Update position on scroll
        const updatePosition = () => {
            const newProposalRect = proposalSection.getBoundingClientRect();
            const newScrollY = window.scrollY || window.pageYOffset;
            message.style.top = `${newProposalRect.top + newScrollY + (newProposalRect.height / 2) - 50}px`;
        };
        
        window.addEventListener('scroll', updatePosition);
        
        // Remove after 3 seconds
        setTimeout(() => {
            window.removeEventListener('scroll', updatePosition);
            if (message.parentNode) {
                document.body.removeChild(message);
            }
        }, 3000);
    }
    
    // Initialize slideshow functionality
    initSlideshow();
    
    /**
     * Initializes the slideshow functionality
     */
    function initSlideshow() {
        // Add click events to memory items
        memoryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Store current scroll position before opening slideshow
                scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                const categoryIndex = parseInt(this.getAttribute('data-slide-index'));
                openSlideshow(categoryIndex);
            });
        });
        
        // Add event listeners for slideshow controls
        slideshowClose.addEventListener('click', closeSlideshow);
        
        // Hide the exit button at the bottom since we're using other methods to exit
        slideshowExit.style.display = 'none';
        
        // Hide navigation buttons on mobile devices
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            slideshowPrev.style.display = 'none';
            slideshowNext.style.display = 'none';
        } else {
            // Show navigation buttons for desktop and add event listeners
            slideshowPrev.addEventListener('click', showPreviousSlide);
            slideshowNext.addEventListener('click', showNextSlide);
        }
        
        // Close slideshow when clicking on overlay background
        slideshowOverlay.addEventListener('click', function(e) {
            if (e.target === slideshowOverlay) {
                closeSlideshow();
            }
        });
        
        // Add keyboard support
        document.addEventListener('keydown', function(e) {
            if (slideshowOverlay.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeSlideshow();
                } else if (e.key === 'ArrowLeft') {
                    showPreviousSlide();
                } else if (e.key === 'ArrowRight') {
                    showNextSlide();
                }
            }
        });
        
        // Add touch swipe support to the entire slideshow container
        const slideshowContainer = document.querySelector('.slideshow-container');
        slideshowContainer.addEventListener('touchstart', handleTouchStart, false);
        slideshowContainer.addEventListener('touchmove', handleTouchMove, false);
        slideshowContainer.addEventListener('touchend', handleTouchEnd, false);
    }
    
    /**
     * Handles touch start event for swipe detection
     */
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        currentX = startX;
    }
    
    /**
     * Handles touch move event for swipe detection
     */
    function handleTouchMove(e) {
        if (!startX) return;
        currentX = e.touches[0].clientX;
        
        // Prevent scrolling while swiping
        e.preventDefault();
    }
    
    /**
     * Handles touch end event for swipe detection
     */
    function handleTouchEnd() {
        if (!startX) return;
        
        const diffX = currentX - startX;
        
        // Minimum swipe distance
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe right - previous slide
                showPreviousSlide();
            } else {
                // Swipe left - next slide
                showNextSlide();
            }
        }
        
        // Reset values
        startX = null;
        currentX = null;
    }
    
    /**
     * Opens the slideshow for a specific category
     * @param {number} categoryIndex - The category index to show
     */
    function openSlideshow(categoryIndex) {
        // Prevent body scrolling
        document.body.classList.add('no-scroll');
        
        // Set current category and reset slide index
        currentCategory = categoryIndex;
        currentSlideIndex = 0;
        
        // Load slideshow data for this category
        slideshowData = slideshowContent[categoryIndex];
        
        // Build slideshow HTML
        buildSlideshow();
        
        // Show the slideshow
        slideshowOverlay.classList.add('active');
        
        // Update counter
        updateSlideCounter();
        
        // Prevent background scrolling on iOS
        document.addEventListener('touchmove', preventScroll, { passive: false });
        
        // Fix for iOS to prevent bouncing
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
    
    /**
     * Prevents scrolling when slideshow is open
     */
    function preventScroll(e) {
        if (slideshowOverlay.classList.contains('active')) {
            e.preventDefault();
        }
    }
    
    /**
     * Closes the slideshow
     */
    function closeSlideshow() {
        // Hide the slideshow
        slideshowOverlay.classList.remove('active');
        
        // Allow body scrolling again
        document.body.classList.remove('no-scroll');
        
        // Re-enable scrolling on iOS and restore scroll position
        document.removeEventListener('touchmove', preventScroll);
        
        // Restore scroll position and body styles
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    }
    
    /**
     * Builds the slideshow HTML content
     */
    function buildSlideshow() {
        // Clear existing slides
        slideshowSlides.innerHTML = '';
        
        // Create slides
        slideshowData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slideshow-slide';
            if (index === currentSlideIndex) {
                slideElement.classList.add('active');
            }
            
            // Create image without caption
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="Memory photo">
            `;
            
            slideshowSlides.appendChild(slideElement);
        });
    }
    
    /**
     * Shows the next slide in the slideshow
     */
    function showNextSlide() {
        if (currentSlideIndex < slideshowData.length - 1) {
            currentSlideIndex++;
            updateSlideshow();
        } else {
            // Loop back to the first slide
            currentSlideIndex = 0;
            updateSlideshow();
        }
    }
    
    /**
     * Shows the previous slide in the slideshow
     */
    function showPreviousSlide() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlideshow();
        } else {
            // Loop to the last slide
            currentSlideIndex = slideshowData.length - 1;
            updateSlideshow();
        }
    }
    
    /**
     * Updates the slideshow display
     */
    function updateSlideshow() {
        // Update active slide
        const slides = document.querySelectorAll('.slideshow-slide');
                slides.forEach((slide, index) => {
            if (index === currentSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update counter
        updateSlideCounter();
    }
    
    /**
     * Updates the slide counter text
     */
    function updateSlideCounter() {
        slideshowCounter.textContent = `${currentSlideIndex + 1}/${slideshowData.length}`;
    }
    
    /**
     * Creates a celebration effect with confetti
     */
    function createCelebration() {
        // Create confetti container
        const confettiContainer = document.createElement('div');
        confettiContainer.classList.add('confetti-container');
        document.body.appendChild(confettiContainer);
        
        // Create multiple pieces of confetti
        for (let i = 0; i < 100; i++) {
            createConfetti(confettiContainer);
        }
        
        // Remove confetti after animation completes
        setTimeout(() => {
            if (confettiContainer.parentNode) {
                document.body.removeChild(confettiContainer);
            }
        }, 3000);
    }
    
    /**
     * Creates a single confetti piece
     * @param {HTMLElement} container - The container to add confetti to
     */
    function createConfetti(container) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties for each confetti piece
        const colors = ['#ff4d6d', '#ff8fa3', '#ffccd5', '#c9184a', '#ffb3c1'];
        const size = Math.random() * 10 + 5;
        
        // Set random styles
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // Position at the top of the screen
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '-10px';
        
        // Add to container
        container.appendChild(confetti);
        
        // Animate falling with random variations
        const animationDuration = Math.random() * 3 + 2;
        const horizontalMovement = (Math.random() - 0.5) * 100;
        
        // Use requestAnimationFrame for smoother animation on mobile
        const startTime = Date.now();
        
        function animate() {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / (animationDuration * 1000), 1);
            
            if (progress < 1) {
                const x = horizontalMovement * progress;
                const y = window.innerHeight * progress;
                const rotate = 360 * progress;
                const opacity = 1 - progress;
                
                confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
                confetti.style.opacity = opacity;
                
                requestAnimationFrame(animate);
            } else {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Add subtle animation to memory items when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe each memory item
    memoryItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
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
        // Allow scrolling in elements that have scrollable content
        if (e.touches.length > 1) {
            e.preventDefault(); // Prevent zooming
        }
    }, { passive: false });
});
