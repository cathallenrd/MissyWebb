/**
 * CHRISTMAS SURPRISE PAGE JAVASCRIPT
 * Interactive Christmas page with snowfall, tree decoration, and countdown
 */

// Wait for the DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all Christmas features
    createSnowfall();
    initLoveList();     
    initWishJar();
    initChristmasTree();
    initWishSystem();
    setupAudio();

    
    // Add vibration feedback for interactions
    if (navigator.vibrate) {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('ornament-btn') || 
                e.target.classList.contains('wish-btn') ||
                e.target.classList.contains('reset-tree') ||
                e.target.classList.contains('reveal-btn') ||
                e.target.classList.contains('reset-wishes')) {
                navigator.vibrate(50);
            }
        });
    }
});

/**
 * Creates snowfall effect
 */
function createSnowfall() {
    const snowfall = document.querySelector('.snowfall');
    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake(snowfall);
    }
}

/**
 * Creates a single snowflake
 * @param {HTMLElement} container - Container to add snowflake to
 */
function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Random properties
    const size = Math.random() * 5 + 2;
    const startX = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.8 + 0.2;
    
    // Set styles
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${startX}vw`;
    snowflake.style.opacity = opacity;
    
    // Add to container
    container.appendChild(snowflake);
    
    // Animate snowflake
    const startTime = Date.now();
    
    function animateSnowflake() {
        const elapsedTime = Date.now() - startTime;
        const progress = (elapsedTime - delay * 1000) / (duration * 1000);
        
        if (progress < 0) {
            // Not started yet due to delay
            requestAnimationFrame(animateSnowflake);
            return;
        }
        
        if (progress <= 1) {
            // Calculate current position
            const x = startX + Math.sin(progress * Math.PI * 2) * 5; // Slight horizontal movement
            const y = progress * 100;
            
            snowflake.style.transform = `translate(${x}vw, ${y}vh)`;
            snowflake.style.opacity = opacity * (1 - progress * 0.5);
            
            requestAnimationFrame(animateSnowflake);
        } else {
            // Reset snowflake to top
            snowflake.style.transform = `translate(${startX}vw, 0)`;
            snowflake.style.opacity = opacity;
            
            // Restart animation
            setTimeout(() => {
                animateSnowflake();
            }, delay * 1000);
        }
    }
    
    // Start animation
    setTimeout(() => {
        animateSnowflake();
    }, delay * 1000);
}

/**
 * Initializes the "12 Things I Love About You" feature
 */
function initLoveList() {
    const loveListContainer = document.getElementById('loveListContainer');
    const revealButton = document.getElementById('revealLoveItem');
    const loveListMessage = document.getElementById('loveListMessage');
    
    const loveItems = [
        "How bright of a person you make me",
        "How your smile warms my soul",
        "How you make even the most normal moments feel special",
        "How amazing your body looks (mhmmmmmm 🤤)",
        "Your cute lil sneezes ",
        "Listening to you Yap about anything",
        "How motivated you make me to be the best me",
        "How relaxed and natural I feel being with you",
        "How you're such a lil weirdo (you match me too well)",
        "How intelligent of a person you are",
        "How you're becoming a mini me (ya lil gimp)",
        "How you've already given me the best gift I could ask for - Your Love"
    ];
    
    let revealedItems = 0;
    const maxItems = loveItems.length;
    
    function revealNextItem() {
        if (revealedItems >= maxItems) {
            loveListMessage.textContent = "That's some fo the things I love about you! (Which is actually everything!) 💕";
            revealButton.disabled = true;
            revealButton.textContent = "All Revealed! 🎉";
            return;
        }
        
        // Create new love item
        const loveItem = document.createElement('div');
        loveItem.classList.add('love-item');
        loveItem.style.animationDelay = `${revealedItems * 0.1}s`;
        
        const itemNumber = revealedItems + 1;
        loveItem.innerHTML = `
            <span class="love-item-number">${itemNumber}</span>
            <span class="love-item-text">${loveItems[revealedItems]}</span>
        `;
        
        // Add to container
        loveListContainer.appendChild(loveItem);
        
        // Update counter and message
        revealedItems++;
        
        // Update button text for last item
        if (revealedItems === maxItems) {
            revealButton.textContent = "Reveal Final Item 💖";
        }
        
        // Update message
        const messages = [
            "So much more to love!",
            "You're just getting more amazing!",
            "I could go on forever!",
            "Every little thing about you!",
            "My heart is so full!",
            "You're my Christmas miracle!",
            "I'm the luckiest person alive!",
            "You make every day special!",
            "My love grows every day!",
            "You're my dream come true!",
            "Almost everything I love!",
            "That's my beautiful girl!"
        ];
        
        loveListMessage.textContent = messages[revealedItems - 1];
        
        // Scroll to show new item
        loveItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Vibration feedback
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    }
    
    // Set up reveal button
    revealButton.addEventListener('click', revealNextItem);
    
    // Initial message
    loveListMessage.textContent = "";
}

/**
 * Initializes the Christmas Wish Jar
 */
function initWishJar() {
    const wishJar = document.getElementById('wishJar');
    const wishCount = document.getElementById('wishCount');
    const wishMessage = document.getElementById('wishMessage');
    const resetButton = document.getElementById('resetWishes');
    const wishSound = document.getElementById('ornamentSound');
    
    const wishes = [
        { emoji: "✨", message: "I wish for a lifetime of Christmases with you" },
        { emoji: "❤️", message: "I wish to fill your heart with love" },
        { emoji: "🔥", message: "I wish for cozy nights after being productive together" },
        { emoji: "🌟", message: "I wish for unlimited gym dates" },
        { emoji: "🎁", message: "I wish I can give you everything you deserve" },
        { emoji: "☃️", message: "I wish for library time together" },
        { emoji: "🕯️", message: "I wish for more late night talks in each others arms" },
        { emoji: "🎄", message: "I wish to live together (eventually ofc)" },
        { emoji: "🍪", message: "I wish to complete many life goals with you by my side" },
        { emoji: "🧦", message: "I wish for you to always know how loved you are" },
        { emoji: "🦌", message: "I wish for magical adventures together" },
        { emoji: "💝", message: "I wish for you to be mine forever" }
    ];
    
    let addedWishes = 0;
    const maxWishes = wishes.length;
    
    function addWishToJar() {
        if (addedWishes >= maxWishes) {
            wishMessage.textContent = "The jar is full of wishes for you! ❤️";
            wishJar.style.cursor = 'default';
            return;
        }
        
        const wish = wishes[addedWishes];
        
        // Create wish element
        const wishElement = document.createElement('div');
        wishElement.classList.add('wish');
        wishElement.textContent = wish.emoji;
        wishElement.style.animationDelay = `${addedWishes * 0.2}s`;
        
        // Create a 4x3 grid (4 rows, 3 columns) = 12 positions total
        const gridCols = 3; // 3 columns
        const gridRows = 4; // 4 rows
        
        // Calculate current position in grid
        const currentIndex = addedWishes;
        const row = Math.floor(currentIndex / gridCols); // 0-3
        const col = currentIndex % gridCols; // 0-2
        
        // Define grid spacing percentages
        // Start positions (from edges of jar)
        const startLeft = 15; // Start 15% from left edge
        const startBottom = 20; // Start 20% from bottom edge
        
        // Spacing between grid points
        const colSpacing = 25; // 25% between columns
        const rowSpacing = 15; // 15% between rows
        
        // Base position in grid
        let baseLeft = startLeft + (col * colSpacing);
        let baseBottom = startBottom + (row * rowSpacing);
        
        // Add slight random offsets for natural look
        // Max 10% random offset in any direction
        const maxOffset = 8;
        const randomOffsetX = (Math.random() * maxOffset * 2) - maxOffset;
        const randomOffsetY = (Math.random() * maxOffset * 2) - maxOffset;
        
        // Calculate final positions with constraints
        let finalLeft = baseLeft + randomOffsetX;
        let finalBottom = baseBottom + randomOffsetY;
        
        // Keep within jar bounds (5% to 95% to avoid edges)
        finalLeft = Math.max(10, Math.min(90, finalLeft));
        finalBottom = Math.max(10, Math.min(90, finalBottom));
        
        // Set positions
        wishElement.style.left = `${finalLeft}%`;
        wishElement.style.bottom = `${finalBottom}%`;
        
        // Add click to see message
        wishElement.addEventListener('click', function(e) {
            e.stopPropagation();
            showWishMessage(wish.message, wish.emoji);
        });
        
        // Add to jar
        wishJar.appendChild(wishElement);
        
        // Update counter
        addedWishes++;
        wishCount.textContent = addedWishes;
        
        // Update message
        const messages = [
            "First wish added! ✨",
            "Another wish for you! ❤️",
            "More wishes coming! 🔥",
            "Filling up with love! 🌟",
            "Halfway there! 🎁",
            "So many wishes! ☃️",
            "Almost full! 🕯️",
            "Just a few more! 🎄",
            "Nearly there! 🍪",
            "One more to go! 🧦",
            "Last wish added! 🦌",
            "Jar is overflowing! 💝"
        ];
        
        wishMessage.textContent = messages[addedWishes - 1];
        
        // Animation - scale from 0 to 1 with rotation
        wishElement.style.animation = 'wishReveal 0.5s ease forwards';
        
        // Play sound
        if (wishSound) {
            wishSound.currentTime = 0;
            wishSound.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Vibration feedback
        if (navigator.vibrate) {
            navigator.vibrate(20);
        }
    }
    
    function showWishMessage(message, emoji) {
        // Create message overlay
        const messageOverlay = document.createElement('div');
        messageOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            max-width: 80%;
            animation: slideUp 0.5s ease;
            border: 3px solid var(--christmas-red);
        `;
        
        messageBox.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 20px;">${emoji}</div>
            <p style="font-size: 1.3rem; color: var(--dark-color); margin-bottom: 20px;">${message}</p>
            <button style="
                background: var(--christmas-red);
                color: white;
                border: none;
                padding: 10px 25px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 1.1rem;
            ">Close</button>
        `;
        
        messageBox.querySelector('button').addEventListener('click', function() {
            document.body.removeChild(messageOverlay);
        });
        
        messageOverlay.appendChild(messageBox);
        document.body.appendChild(messageOverlay);
        
        // Close on overlay click
        messageOverlay.addEventListener('click', function(e) {
            if (e.target === messageOverlay) {
                document.body.removeChild(messageOverlay);
            }
        });
    }
    
    function resetWishes() {
        // Remove all wishes
        const wishElements = wishJar.querySelectorAll('.wish');
        wishElements.forEach(wish => wish.remove());
        
        // Reset counter
        addedWishes = 0;
        wishCount.textContent = '0';
        wishMessage.textContent = 'Start wishing! ✨';
        wishJar.style.cursor = 'pointer';
        
        // Reset button animation
        wishJar.style.transform = 'scale(1)';
    }
    
    // Set up jar click
    wishJar.addEventListener('click', addWishToJar);
    
    // Set up reset button
    resetButton.addEventListener('click', resetWishes);
    
    // Initial message
    wishMessage.textContent = 'Click the jar to add wishes!';
}

/**
 * Initializes interactive Christmas tree
 */
function initChristmasTree() {
    const tree = document.getElementById('christmasTree');
    const ornamentButtons = document.querySelectorAll('.ornament-btn');
    const resetButton = document.getElementById('resetTree');
    const treeMessage = document.getElementById('treeMessage');
    const bellSound = document.getElementById('christmasBell');
    const ornamentSound = document.getElementById('ornamentSound');
    
    let selectedOrnament = '❤️';
    let ornamentCount = 0;
    const maxOrnaments = 15;
    
    // Set up ornament buttons
    ornamentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            ornamentButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Set selected ornament
            selectedOrnament = this.getAttribute('data-ornament');
            
            // Play bell sound
            if (bellSound) {
                bellSound.currentTime = 0;
                bellSound.play().catch(e => console.log('Audio play failed:', e));
            }
        });
    });
    
    // Set up tree click event
    tree.addEventListener('click', function(e) {
        if (ornamentCount >= maxOrnaments) {
            treeMessage.textContent = "The tree is full! Reset to add more ornaments! 🎄";
            return;
        }
        
        // Get click position relative to tree
        const rect = tree.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Only add ornament if click is within tree bounds
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            addOrnamentToTree(x, y);
            
            // Play ornament sound
            if (ornamentSound) {
                ornamentSound.currentTime = 0;
                ornamentSound.play().catch(e => console.log('Audio play failed:', e));
            }
        }
    });
    
    // Set up reset button
    resetButton.addEventListener('click', function() {
        // Remove all ornaments
        const ornaments = tree.querySelectorAll('.tree-ornament');
        ornaments.forEach(ornament => ornament.remove());
        
        // Reset counter
        ornamentCount = 0;
        
        // Update message
        treeMessage.textContent = "Tree is ready for decoration! Add some love! ❤️";
        
        // Visual feedback
        tree.style.transform = 'scale(1.05)';
        setTimeout(() => {
            tree.style.transform = 'scale(1)';
        }, 300);
    });
    
    /**
     * Adds an ornament to the tree at specified position
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    function addOrnamentToTree(x, y) {
        const ornament = document.createElement('div');
        ornament.classList.add('tree-ornament');
        ornament.textContent = selectedOrnament;
        
        // Position ornament
        ornament.style.left = `${x}px`;
        ornament.style.top = `${y}px`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        ornament.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        // Add animation
        ornament.style.animation = 'float 3s ease-in-out infinite';
        
        // Add click to remove
        ornament.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent tree click event
            this.remove();
            ornamentCount--;
            updateTreeMessage();
        });
        
        // Add to tree
        tree.appendChild(ornament);
        ornamentCount++;
        updateTreeMessage();
    }
    
    /**
     * Updates the tree message based on ornament count
     */
    function updateTreeMessage() {
        const messages = [
            "Add some love to our tree! ❤️",
            "Great start! Keep going! 🎄",
            "Beautiful! Add more ornaments! ✨",
            "The tree is looking magical! 🌟",
            "Almost full! Just a few more spots! 🎅",
            "Perfect! Our tree is complete! 🎄❤️"
        ];
        
        let messageIndex = Math.floor(ornamentCount / (maxOrnaments / messages.length));
        messageIndex = Math.min(messageIndex, messages.length - 1);
        
        treeMessage.textContent = messages[messageIndex];
        
        // Special message when tree is full
        if (ornamentCount >= maxOrnaments) {
            treeMessage.textContent = "🎄 Our Christmas tree is perfect! Just like you! ❤️";
        }
    }
}

/**
 * Initializes the wish system
 */
function initWishSystem() {
    const wishTextarea = document.getElementById('christmasWish');
    const charCount = document.getElementById('charCount');
    const sendWishButton = document.getElementById('sendWish');
    const wishDisplay = document.getElementById('wishDisplay');
    
    // Update character count
    wishTextarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        // Change color when approaching limit
        if (length > 180) {
            charCount.style.color = 'var(--christmas-red)';
        } else if (length > 150) {
            charCount.style.color = 'orange';
        } else {
            charCount.style.color = 'inherit';
        }
    });
    
    // Send wish button
    sendWishButton.addEventListener('click', function() {
        const wish = wishTextarea.value.trim();
        
        if (!wish) {
            showWishMessage("Please write your Christmas wish first! 🎁", 'error');
            return;
        }
        
        if (wish.length > 200) {
            showWishMessage("Your wish is too long! Maximum 200 characters. ✨", 'error');
            return;
        }
        
        // Add wish to display
        addWishToDisplay(wish);
        
        // Clear textarea
        wishTextarea.value = '';
        charCount.textContent = '0';
        
        // Show success message
        showWishMessage("Your Christmas wish has been sent to Santa! 🎅", 'success');
        
        // Confetti effect
        createWishConfetti();
    });
    
    /**
     * Adds a wish to the display
     * @param {string} wish - The wish text
     */
    function addWishToDisplay(wish) {
        const wishItem = document.createElement('div');
        wishItem.classList.add('wish-item');
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        wishItem.innerHTML = `
            <strong>🎁 Christmas Wish:</strong>
            <p>${wish}</p>
            <small>Sent at ${timestamp}</small>
        `;
        
        // Add to display (at the top)
        wishDisplay.insertBefore(wishItem, wishDisplay.firstChild);
        
        // Limit to 5 wishes
        const wishes = wishDisplay.querySelectorAll('.wish-item');
        if (wishes.length > 5) {
            wishDisplay.removeChild(wishes[wishes.length - 1]);
        }
    }
    
    /**
     * Shows a temporary message
     * @param {string} text - Message text
     * @param {string} type - Message type (success/error)
     */
    function showWishMessage(text, type) {
        const message = document.createElement('div');
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? 'var(--christmas-red)' : 'var(--christmas-green)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1000;
            font-size: 1.1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'slideUpMessage 0.3s ease';
                setTimeout(() => {
                    if (message.parentNode) {
                        document.body.removeChild(message);
                    }
                }, 300);
            }
        }, 3000);
    }
    
    /**
     * Creates confetti effect for wish sending
     */
    function createWishConfetti() {
        const colors = ['#c41e3a', '#2d5a27', '#ffd700', '#ff4d6d'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                top: 50%;
                left: 50%;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            // Animate confetti
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 1000 + 1000;
            
            confetti.animate([
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
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, duration);
        }
    }
}

/**
 * Sets up audio elements
 */
function setupAudio() {
    // Preload audio
    const bellSound = document.getElementById('christmasBell');
    const ornamentSound = document.getElementById('ornamentSound');
    
    if (bellSound) {
        bellSound.volume = 0.3;
    }
    
    if (ornamentSound) {
        ornamentSound.volume = 0.2;
    }
    
    // Handle iOS audio restrictions
    document.body.addEventListener('touchstart', function initAudio() {
        if (bellSound) {
            bellSound.load();
        }
        if (ornamentSound) {
            ornamentSound.load();
        }
        document.body.removeEventListener('touchstart', initAudio);
    });
}

// Handle iOS viewport height issue
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideDown {
        from { transform: translate(-50%, -100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    @keyframes slideUpMessage {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
