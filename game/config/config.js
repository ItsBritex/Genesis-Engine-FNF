// Volumen global
let currentVolume = 1.0; // Volumen inicial (100%)

// Sonidos para cambios de volumen
const soundPaths = {
    up: '../../../../main/public/sounds/sfx/soundtray/Volup.ogg',
    down: '../../../../main/public/sounds/sfx/soundtray/Voldown.ogg',
    max: '../../../../main/public/sounds/sfx/soundtray/VolMAX.ogg'
};

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundBuffers = {};

// Cargar los sonidos
function loadSound(key, url) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            soundBuffers[key] = audioBuffer;
        })
        .catch(error => console.error('Error loading sound:', error));
}

// Cargar todos los sonidos
Promise.all([
    loadSound('up', soundPaths.up),
    loadSound('down', soundPaths.down),
    loadSound('max', soundPaths.max)
]).then(() => console.log('All sounds loaded')).catch(error => console.error('Error loading sounds:', error));

function initializeVolumeControl() {
    document.addEventListener('keydown', function(event) {
        if (event.key === '+') {
            event.preventDefault();
            adjustVolume(0.1); // Aumentar volumen en 10%
        } else if (event.key === '-') {
            event.preventDefault();
            adjustVolume(-0.1); // Reducir volumen en 10%
        } else if (event.key === '0') {
            event.preventDefault();
            muteVolume(); // Silenciar
        }
    });

    // Aplicar el volumen inicial a todos los audios existentes
    setVolumeToAllAudios(currentVolume);

    // Observar cambios en el DOM para aplicar el volumen a nuevos audios
    observeAudioElements();
}

function adjustVolume(change) {
    const previousVolume = currentVolume;
    currentVolume = Math.min(Math.max(currentVolume + change, 0), 1); // Asegura que el volumen esté entre 0 y 1
    
    if (currentVolume !== previousVolume) {
        setVolumeToAllAudios(currentVolume);
        
        if (currentVolume === 1 && change > 0) {
            playSound('max');
        } else {
            playSound(change > 0 ? 'up' : 'down');
        }
    }
}

function setVolumeToAllAudios(volume) {
    document.querySelectorAll('audio').forEach(audio => {
        audio.volume = volume;
    });
}

function muteVolume() {
    if (currentVolume > 0) {
        currentVolume = 0;
        setVolumeToAllAudios(0);
        playSound('down');
    }
}

function playSound(key) {
    if (soundBuffers[key]) {
        const source = audioContext.createBufferSource();
        source.buffer = soundBuffers[key];
        source.connect(audioContext.destination);
        source.start(0);
    } else {
        console.error('Sound not loaded:', key);
    }
}

function observeAudioElements() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.tagName.toLowerCase() === 'audio') {
                        node.volume = currentVolume;
                    } else {
                        node.querySelectorAll('audio').forEach(audio => {
                            audio.volume = currentVolume;
                        });
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Llamada para inicializar el control de volumen
initializeVolumeControl();

// FPS COUNTER
document.addEventListener('DOMContentLoaded', function() {
    const fpsCounter = document.getElementById('fps-counter');
    const memoryCounter = document.getElementById('memory-counter');
    
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 0;
    
    function updateCounters() {
        // FPS Calculation
        const now = performance.now();
        frameCount++;
        if (now - lastTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = now;
            fpsCounter.textContent = 'FPS: ' + fps;
        }
        
        // Memory Usage Calculation
        const memory = window.performance.memory;
        if (memory) {
            const usedMemory = (memory.usedJSHeapSize / (1024 * 1024)).toFixed(2);
            memoryCounter.textContent = 'Memory: ' + usedMemory + ' MB';
        }
        
        requestAnimationFrame(updateCounters);
    }
    
    updateCounters();
});

// Ocultar el cursor
document.body.style.cursor = 'none';

// Crear el elemento para el texto de la versión
const versionElement = document.createElement('div');

// Estilos del elemento de texto
versionElement.style.position = 'fixed';
versionElement.style.bottom = '0px';
versionElement.style.left = '0px';
versionElement.style.color = '#ffffff';
versionElement.style.fontSize = '1em';
versionElement.style.fontFamily = 'Arial, sans-serif';
versionElement.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
versionElement.style.padding = '2px';
versionElement.style.borderRadius = '5px';
versionElement.style.zIndex = '9999';

// Contenido del elemento
versionElement.textContent = 'Preview FNF Genesis Alpha (0.0.2PA)';

// Añadir el elemento al cuerpo del documento
document.body.appendChild(versionElement);