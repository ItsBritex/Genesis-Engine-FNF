import { Boyfriend } from '../../../main/src/characters/bf.js';
import { GF } from '../../../main/src/characters/gf.js';
import { BackgroundStage } from '../../../main/src/playState/backgrounds/week1.js';
import { Arrows } from '../../../game/config/UI/arrows.js';
import { PauseMenu } from '../../../game/config/UI/pause.js';
import { Countdown } from '../../config/States/count.js';

class PlayState {
    constructor() {
        this.pause = new PauseMenu();
        this.bg = new BackgroundStage();
        this.boyfriend = new Boyfriend();
        this.girlfriend = new GF();
        this.arrows = new Arrows();
        this.count = new Countdown();
    }

    async start() {
        this.bg.addToDOM();
        this.boyfriend.addToDOM();
        this.girlfriend.addToDOM();
        this.bg.zoomIn(1.7);

        this.arrows.addToDOM();
        this.count.addToDOM();
        
        // Iniciar la cuenta regresiva
        await this.count.start();
        
        // Cargar el JSON y crear las flechas después de la cuenta regresiva
        this.loadArrowsFromJSON();
    }

    loadArrowsFromJSON() {
        fetch('../../../../game/data/tutorial.json')
            .then(response => response.json())
            .then(jsonData => {
                console.log('JSON data loaded:', jsonData);
                this.arrows.spawnArrowFromJSON(jsonData);
            })
            .catch(error => console.error('Error al cargar el archivo JSON:', error));
    }
}

// Instanciar el PlayState y empezarlo
const playState = new PlayState();
playState.start();