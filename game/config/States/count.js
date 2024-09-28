export class Countdown {
    constructor() {
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.top = '50%';
        this.container.style.left = '50%';
        this.container.style.transform = 'translate(-50%, -50%)';
        this.container.style.zIndex = '1000';

        this.currentImage = null;
        this.audio = null;
        this.images = [
            '../../../../main/public/gameSprites/Escenes/game/playState/count/ready.png',
            '../../../../main/public/gameSprites/Escenes/game/playState/count/set.png',
            '../../../../main/public/gameSprites/Escenes/game/playState/count/go.png'
        ];
        this.sounds = [
            '../../../../main/public/sounds/sfx/count/3.ogg',
            '../../../../main/public/sounds/sfx/count/2.ogg',
            '../../../../main/public/sounds/sfx/count/1.ogg',
            '../../../../main/public/sounds/sfx/count/go.ogg'
        ];
        this.currentStep = 0;
    }

    addToDOM() {
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.appendChild(this.container);
        }
    }

    start() {
        return new Promise((resolve) => {
            this.playNextSound();
            const interval = setInterval(() => {
                this.currentStep++;
                if (this.currentStep < this.sounds.length) {
                    this.playNextSound();
                    if (this.currentStep > 0) {
                        this.showNextImage();
                    }
                } else {
                    clearInterval(interval);
                    if (this.currentImage) {
                        this.fadeOutAndRemove(this.currentImage, () => {
                            this.container.remove();
                            resolve();
                        });
                    } else {
                        this.container.remove();
                        resolve();
                    }
                }
            }, 500);
        });
    }

    playNextSound() {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }

        this.audio = new Audio(this.sounds[this.currentStep]);
        this.audio.play();
    }

    showNextImage() {
        if (this.currentImage) {
            this.fadeOutAndRemove(this.currentImage, () => {
                this.displayImage();
            });
        } else {
            this.displayImage();
        }
    }

    displayImage() {
        this.currentImage = new Image();
        this.currentImage.src = this.images[this.currentStep - 1];
        this.currentImage.style.maxWidth = '100%';
        this.currentImage.style.maxHeight = '100%';
        this.currentImage.style.opacity = '1';
        this.currentImage.style.transition = 'opacity 0.3s ease-out';
        this.container.appendChild(this.currentImage);
    }

    fadeOutAndRemove(element, callback) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.remove();
            if (callback) callback();
        }, 100);
    }
}