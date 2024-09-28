export class GF {
    constructor() {
        this.characterContainer = document.createElement('div');
        this.characterContainer.style.position = 'absolute';
        this.characterContainer.style.right = '24em';
        this.characterContainer.style.top = '35%';
        this.characterContainer.style.transform = 'translateY(-50%)';
        this.characterContainer.style.zIndex = '9';

        this.gfImage = document.createElement('img');
        this.gfImage.src = '../../../../main/public/gameSprites/characters/gf/gf/gf.webp';
        this.gfImage.style.width = '550px';
        this.gfImage.style.height = 'auto';
        this.gfImage.alt = 'Girlfriend';

        this.characterContainer.appendChild(this.gfImage); // Corregido
    }

    addToDOM() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.appendChild(this.characterContainer);
    }
}
