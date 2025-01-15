document.addEventListener('DOMContentLoaded', () => {
    const storeButton = document.querySelector('a.minecraft-button[href="#"]');
    
    if (storeButton) {
        storeButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            triggerFireworks();
        });
    }

    function triggerFireworks() {
        // Create fireworks container
        const fireworksContainer = document.createElement('div');
        fireworksContainer.classList.add('fireworks-container');
        document.body.appendChild(fireworksContainer);

        // Create multiple fireworks
        for (let i = 0; i < 10; i++) {
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
});
