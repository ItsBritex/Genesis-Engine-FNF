export class BackgroundStage {
    constructor() {
        // Crear contenedor del fondo
        this.bgContainer = this.createBackgroundContainer(
            '../../../../main/public/gameSprites/Escenes/game/playState/stage/stageback.png',
            1,
            '100%', // Ancho del fondo
            '70vh'  // Alto del fondo
        );

        // Crear contenedor del piso
        this.floorContainer = this.createFloorContainer(
            '../../../../main/public/gameSprites/Escenes/game/playState/stage/stagefront.png',
            2,
            '100%', // Ancho del piso
            '30vh'  // Alto del piso
        );

        // Crear contenedor de las cortinas
        this.curtainsContainer = this.createCurtainsContainer(
            '../../../../main/public/gameSprites/Escenes/game/playState/stage/stagecurtains.png',
            11,
            '100%', // Ancho de las cortinas
            '70vh'  // Alto de las cortinas
        );

        this.zoomLevel = 1; // Nivel de zoom inicial
    }

    createBackgroundContainer(imageSrc, zIndex, width, height) {
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.width = width; 
        container.style.height = height; 
        container.style.zIndex = zIndex;
        container.style.transformOrigin = 'center'; // Centro de la imagen como punto de referencia para el zoom

        const image = document.createElement('img');
        image.src = imageSrc;
        image.alt = 'Background Image';
        image.style.width = '100%'; 
        image.style.height = '100%'; 
        image.style.position = 'absolute'; 
        image.style.top = '0'; 
        image.style.left = '0'; 

        container.appendChild(image); 
        return container;
    }

    createFloorContainer(imageSrc, zIndex, width, height) {
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.width = width; 
        container.style.height = height; 
        container.style.zIndex = zIndex;
        container.style.bottom = '0'; // Asegura que el piso esté en la parte inferior

        const image = document.createElement('img');
        image.src = imageSrc;
        image.alt = 'Floor Image';
        image.style.width = '100%'; 
        image.style.height = '100%'; 
        image.style.position = 'absolute'; 
        image.style.top = '0'; 
        image.style.left = '0'; 

        container.appendChild(image); 
        return container;
    }

    createCurtainsContainer(imageSrc, zIndex, width, height) {
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.width = width; 
        container.style.height = height; 
        container.style.zIndex = zIndex;
        container.style.transformOrigin = 'center'; // Centro de la imagen como punto de referencia para el zoom

        const image = document.createElement('img');
        image.src = imageSrc;
        image.alt = 'Curtains Image';
        image.style.width = '70%'; 
        image.style.height = '70%'; 
        image.style.position = 'absolute'; 
        image.style.top = '4em'; 
        image.style.left = '12.5em'; 

        container.appendChild(image); 
        return container;
    }

    addToDOM() {
        const gameContainer = document.getElementById('game-container');
        console.log('Adding background, floor, and curtains to DOM');
        gameContainer.appendChild(this.bgContainer); 
        gameContainer.appendChild(this.floorContainer); 
        gameContainer.appendChild(this.curtainsContainer); // Agregar cortinas
    }

    zoomIn(factor) {
        this.zoomLevel *= factor; // Aumentar el nivel de zoom
        this.bgContainer.style.transform = `scale(${this.zoomLevel})`;
        this.floorContainer.style.transform = `scale(${this.zoomLevel})`;
        this.curtainsContainer.style.transform = `scale(${this.zoomLevel})`; // Aplicar zoom a las cortinas
    }

    zoomOut(factor) {
        this.zoomLevel /= factor; // Disminuir el nivel de zoom
        this.bgContainer.style.transform = `scale(${this.zoomLevel})`;
        this.floorContainer.style.transform = `scale(${this.zoomLevel})`;
        this.curtainsContainer.style.transform = `scale(${this.zoomLevel})`; // Aplicar zoom a las cortinas
    }
}
