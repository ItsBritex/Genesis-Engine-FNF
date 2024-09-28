export class Boyfriend {
    constructor() {
        this.characterContainer = document.createElement('div');
        this.characterContainer.style.position = 'absolute';
        this.characterContainer.style.right = '6em';
        this.characterContainer.style.top = '58%';
        this.characterContainer.style.transform = 'translateY(-50%)';
        this.characterContainer.style.zIndex = '10';

        this.bfImage = document.createElement('img');
        this.bfImage.src = '../../../../main/public/gameSprites/characters/player/bf/bf_Idle.gif';
        this.bfImage.style.width = '300px';
        this.bfImage.style.height = 'auto';
        this.bfImage.alt = 'Boyfriend';

        this.characterContainer.appendChild(this.bfImage);

        // Map for key directions and corresponding animation
        this.keyMap = {
            'a': '../../../../main/public/gameSprites/characters/player/bf/bf_left.gif', // Left
            's': '../../../../main/public/gameSprites/characters/player/bf/bf_down.gif', // Down
            'k': '../../../../main/public/gameSprites/characters/player/bf/bf_up.gif', // Up
            'l': '../../../../main/public/gameSprites/characters/player/bf/bf_right.gif' // Right
        };

        this.idleImage = '../../../../main/public/gameSprites/characters/player/bf/bf_Idle.gif'; // Idle animation

        this.timeoutId = null; // Variable para almacenar el temporizador

        // Event listeners for key presses and releases
        this.initKeyListeners();
    }

    initKeyListeners() {
        // Change animation when key is pressed
        window.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase(); // Get key in lowercase
            if (this.keyMap[key]) {
                this.changeAnimation(this.keyMap[key]); // Change to corresponding animation
                
                // Si una tecla es presionada, cancelamos cualquier temporizador activo
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null;
                }
            }
        });

        // Return to idle after 1 second when key is released
        window.addEventListener('keyup', (event) => {
            const key = event.key.toLowerCase();
            if (this.keyMap[key]) {
                // Inicia el temporizador para volver a la animación idle
                this.timeoutId = setTimeout(() => {
                    this.changeAnimation(this.idleImage); // Return to idle animation after 1 second
                }, 500); // 1 segundo de retraso antes de volver a idle
            }
        });
    }

    changeAnimation(animationSrc) {
        this.bfImage.src = animationSrc;
    }

    addToDOM() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.appendChild(this.characterContainer);
    }
}
