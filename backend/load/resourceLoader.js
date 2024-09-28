class ResourceLoader {
    constructor() {
        this.resources = {
            images: {},
            audio: {}
        };
        this.totalResources = 0;
        this.loadedResources = 0;
    }

    addImage(key, src) {
        this.totalResources++;
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.resources.images[key] = img;
                this.loadedResources++;
                resolve(img);
            };
            img.onerror = reject;
            img.src = src;
        });
    }

    addAudio(key, src) {
        this.totalResources++;
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => {
                this.resources.audio[key] = audio;
                this.loadedResources++;
                resolve(audio);
            };
            audio.onerror = reject;
            audio.src = src;
        });
    }

    async loadAll() {
        const imagePromises = Object.entries(this.imageSources).map(([key, src]) => this.addImage(key, src));
        const audioPromises = Object.entries(this.audioSources).map(([key, src]) => this.addAudio(key, src));
        await Promise.all([...imagePromises, ...audioPromises]);
    }

    getProgress() {
        return this.totalResources > 0 ? (this.loadedResources / this.totalResources) * 100 : 0;
    }

    getResource(type, key) {
        return this.resources[type][key];
    }

    // Definir aquí todas las fuentes de recursos
    imageSources = {
        'storyModeIdle': 'main/public/gameSprites/start/subMainSprites/Storymode_idle.webp',
        'storyModeSelected': 'main/public/gameSprites/start/subMainSprites/Storymode_selected.webp',
        // ... añade todas las demás imágenes aquí
    };

    audioSources = {
        'confirmMenu': 'main/public/sounds/sfx/confirmMenu.ogg',
        'freakyMenu': 'main/public/sounds/music/freakyMenu.ogg',
        // ... añade todos los demás audios aquí
    };
}

export const loader = new ResourceLoader();