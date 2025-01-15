document.addEventListener('DOMContentLoaded', () => {
    // Select all Store buttons across different pages
    const storeButtons = document.querySelectorAll('a.minecraft-button:contains("Store")');
    
    console.log('Store buttons found:', storeButtons.length);

    storeButtons.forEach(storeButton => {
        storeButton.addEventListener('mouseenter', (e) => {
            console.log('Store button hovered!');
            e.preventDefault(); // Prevent default link behavior
            triggerFireworks();
        });
    });

    function triggerFireworks() {
        console.log('Triggering fireworks!');
        // Create fireworks container
        const fireworksContainer = document.createElement('div');
        fireworksContainer.classList.add('fireworks-container');
        document.body.appendChild(fireworksContainer);

        // Create multiple fireworks
        for (let i = 0; i < 20; i++) {
            createFirework(fireworksContainer);
        }

        // Remove fireworks after animation
        setTimeout(() => {
            fireworksContainer.remove();
        }, 3000);
    }

    function createFirework(container) {
        const firework = document.createElement('div');
        firework.classList.add('firework');

        // Random position
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;

        // Random colors
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(firework);

        // Remove individual firework after animation
        firework.addEventListener('animationend', () => {
            firework.remove();
        });
    }

    // Polyfill for :contains selector
    jQuery.expr[':'].contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
    };
});
