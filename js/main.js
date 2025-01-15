document.addEventListener('DOMContentLoaded', () => {
    // Nether Portal Particle Effect
    function createNetherParticle() {
        const particle = document.createElement('div');
        particle.classList.add('nether-particle');
        
        // Randomize particle properties
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.opacity = Math.random();
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 5000);
    }

    // Create particles periodically
    function startNetherParticleEffect() {
        setInterval(createNetherParticle, 200);
    }

    // Start particle effect
    startNetherParticleEffect();

    // Dynamic Player Count
    function updatePlayerCount() {
        const playerCountElement = document.querySelector('.player-count');
        
        fetch('https://api.mcsrvstat.us/3/play.rexkraft.com')
            .then(response => response.json())
            .then(data => {
                // Check if server is online and players data exists
                if (data.online && data.players) {
                    const currentPlayers = data.players.online || 0;
                    const maxPlayers = data.players.max || 100;
                    playerCountElement.textContent = `(${currentPlayers}/${maxPlayers} Online)`;
                } else {
                    playerCountElement.textContent = '(0/100 Online)';
                }
            })
            .catch(() => {
                playerCountElement.textContent = '(0/100 Online)';
            });
    }

    // Minecraft-style button hover effects
    const buttons = document.querySelectorAll('.minecraft-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const clickSound = new Audio('../assets/minecraft-click.mp3');
            clickSound.volume = 0.5;
            clickSound.play();
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Parallax background effect
    window.addEventListener('mousemove', (e) => {
        const background = document.querySelector('.minecraft-background');
        const moveX = e.clientX / -50;
        const moveY = e.clientY / -50;
        background.style.backgroundPosition = `${moveX}px ${moveY}px`;
    });

    // Server card hover animations
    const serverCards = document.querySelectorAll('.server-card');
    serverCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'rotate(2deg) scale(1.05)';
            card.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotate(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });

    // Update player count on page load and every minute
    updatePlayerCount();
    setInterval(updatePlayerCount, 60000);

    // Play Now button interaction
    const playNowButton = document.querySelector('.cta-buttons .large-button');
    playNowButton.addEventListener('click', () => {
        // Future: Add server connection logic
        alert('Connecting to RexKraft server...');
    });
});
