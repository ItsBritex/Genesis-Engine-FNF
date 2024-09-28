// Crear el contenedor principal y agregarlo al cuerpo del documento
const container = document.createElement('div');
container.style.display = 'flex';
container.style.justifyContent = 'space-around';
container.style.width = '1117px';  
container.style.position = 'absolute';
container.style.bottom = '1%';  
container.style.left = '50%';
container.style.transform = 'translateX(-50%)';  
document.body.appendChild(container);

// Crear el contenedor para el fondo
const backgroundContainer = document.createElement('div');
backgroundContainer.style.position = 'absolute';
backgroundContainer.style.top = '5%';
backgroundContainer.style.left = '10%';
backgroundContainer.style.width = '81%';
backgroundContainer.style.height = '45%'; // Ajusta la altura según lo necesario
backgroundContainer.style.backgroundSize = 'cover';
backgroundContainer.style.backgroundPosition = 'center';
backgroundContainer.style.zIndex = '1';

// Insertar el fondo antes del container principal
document.body.insertBefore(backgroundContainer, container);

// Definir las imágenes de fondo para cada semana
const backgrounds = {
    'TUTORIAL': "url('../../../public/gameSprites/Escenes/storySprites/storyStages/TUTORIAL.png')",
    'WEEK 1': "url('../../../public/gameSprites/Escenes/storySprites/storyStages/menu_stage.png')",
    'WEEK 2': "url('../../../public/gameSprites/Escenes/storySprites/storyStages/menu_halloween.png')",
    'WEEK 3': "url('../../../public/gameSprites/Escenes/storySprites/storyStages/menu_philly.png')",
    'WEEK 4': "url('../../../public/gameSprites/Escenes/storySprites/storyStages/menu_limo.png')",
    'WEEK 5': "url('../../../public/gameSprites/Escenes/storySprites/storyStages/menu_christmas.png')",
    'WEEK 6': "url('../../../public/gameSprites/Escenes/storySprites/storyStages/menu_school.png')",
    'WEEK 7': "url('../../../public/gameSprites/Escenes/storySprites/storyStages/menu_tank.png')",
    'WEEK END 1': "url('../../../public/gameSprites/Escenes/storySprites/storyStages/menu_phillystreets.png')"
};

const tracksByWeek = {
    'TUTORIAL': ['Track 1A', 'Track 2A', 'Track 3A'],
    'WEEK 1': ['Track 1B', 'Track 2B', 'Track 3B'],
    'WEEK 2': ['Track 1C', 'Track 2C', 'Track 3C'],
    'WEEK 3': ['Track 1D', 'Track 2D', 'Track 3D'],
    'WEEK 4': ['Track 1E', 'Track 2E', 'Track 3E'],
    'WEEK 5': ['Track 1F', 'Track 2F', 'Track 3F'],
    'WEEK 6': ['Track 1G', 'Track 2G', 'Track 3G'],
    'WEEK 7': ['Track 1H', 'Track 2H', 'Track 3H'],
    'WEEK END 1': ['Track 1I', 'Track 2I', 'Track 3I'],
};

// Inicializar el fondo con la primera semana
backgroundContainer.style.backgroundImage = backgrounds['TUTORIAL'];

// Crear el contenedor para las semanas
const weeksContainer = document.createElement('div');
weeksContainer.style.maxHeight = '300px';
weeksContainer.style.overflow = 'hidden'; // Ocultar el overflow de semanas
weeksContainer.style.padding = '20px'; 
weeksContainer.style.backgroundColor = 'black';
weeksContainer.style.width = 'auto'; 
weeksContainer.style.color = 'white';
weeksContainer.style.fontSize = '40px'; // Aumentar el tamaño de la fuente
weeksContainer.style.marginRight = '30px'; 
weeksContainer.style.textAlign = 'center'; 
container.appendChild(weeksContainer);

// Crear el contenedor para "Tracks"
const tracksContainer = document.createElement('div');
tracksContainer.style.padding = '20px'; 
tracksContainer.style.backgroundColor = 'black';
tracksContainer.style.width = '220px'; 
tracksContainer.style.color = 'white';
tracksContainer.style.fontSize = '30px'; // Aumentar el tamaño de la fuente
tracksContainer.style.marginRight = '15px'; 
container.insertBefore(tracksContainer, weeksContainer);

const tracksTitle = document.createElement('img');
tracksTitle.style.fontSize = '60px'; 
tracksTitle.style.fontWeight = 'bold';
tracksTitle.style.textAlign = 'center';
tracksTitle.src = '../../../public/gameSprites/Escenes/storySprites/titleTracks.png';
tracksContainer.appendChild(tracksTitle);

// Agregar las opciones de tracks
const tracks = ['Track 1', 'Track 2', 'Track 3', 'Track 4'];
tracks.forEach(track => {

    
    const trackDiv = document.createElement('div');
    trackDiv.style.fontSize = '30px'; // Tamaño de letra para tracks
    trackDiv.style.fontWeight = 'bold';
    trackDiv.style.margin = '10px 0';
    trackDiv.style.textAlign = 'center';
    trackDiv.style.fontFamily = 'FridayNightFunkin'
    trackDiv.textContent = track;
    tracksContainer.appendChild(trackDiv);
});



// Crear el contenedor para la dificultad
const difficultyContainer = document.createElement('div');
difficultyContainer.style.padding = '20px'; 
difficultyContainer.style.backgroundColor = 'black';
difficultyContainer.style.width = '220px'; 
difficultyContainer.style.color = 'white';
difficultyContainer.style.fontSize = '24px'; 
difficultyContainer.style.marginLeft = '30px'; 
difficultyContainer.style.textAlign = 'bottom'; 
difficultyContainer.style.position = 'relative'; 
container.appendChild(difficultyContainer);

// Crear un div para cada dificultad con su respectiva imagen
const difficultyLevels = [
    '../../../public/gameSprites/Escenes/storySprites/difficulties/EASY0.png',
    '../../../public/gameSprites/Escenes/storySprites/difficulties/NORMAL0.png',
    '../../../public/gameSprites/Escenes/storySprites/difficulties/HARD0.png'
];

let currentDifficultyIndex = 1; // NORMAL por defecto

// Función para crear el div con la imagen y aplicarle la animación
function createDifficultyDiv(src) {
    const difficultyDiv = document.createElement('div');
    const difficultyImg = document.createElement('img');
    difficultyImg.src = src;
    difficultyImg.style.width = '100%';
    difficultyImg.style.position = 'absolute';
    difficultyImg.style.top = '40%'; // Inicia la imagen un poco fuera de su div
    difficultyImg.style.left = '36%';
    difficultyImg.style.transform = 'translateX(-36%)';

    // Añadir animación de entrada desde arriba
    difficultyImg.animate([
        { transform: 'translateY(-36%)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateX(-36%)', opacity: 1}
    ], {
        duration: 200, // Duración rápida de la animación
        easing: 'ease-out'
    });

    difficultyDiv.appendChild(difficultyImg);
    return difficultyDiv;
}

// Inicializar el contenedor con la dificultad actual
difficultyContainer.appendChild(createDifficultyDiv(difficultyLevels[currentDifficultyIndex]));

// Agregar las semanas al contenedor
const weeks = ['TUTORIAL', 'WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5', 'WEEK 6', 'WEEK 7', 'WEEK END 1'];
weeks.forEach(week => {
    const weekDiv = document.createElement('div');
    weekDiv.style.fontSize = '40px'; // Tamaño de letra grande
    weekDiv.style.fontWeight = 'bold';
    weekDiv.style.margin = '10px 0';
    weekDiv.style.textAlign = 'center';
    weekDiv.textContent = week;
    weeksContainer.appendChild(weekDiv);
});

// Manejar la selección de semanas y dificultades
let currentWeekIndex = 0;

document.addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'ArrowUp') {
        if (currentWeekIndex > 0) {
            currentWeekIndex--;
        }
    } else if (event.key === 's' || event.key === 'ArrowDown') {
        if (currentWeekIndex < weeks.length - 1) {
            currentWeekIndex++;
        }
    }
    // Resaltar la semana seleccionada
    Array.from(weeksContainer.children).forEach((child, index) => {
        child.style.color = index === currentWeekIndex ? '#FFFF00' : 'white'; // Resaltar la semana seleccionada
    });

    // Desplazar automáticamente el scroll en el contenedor de weeks
    const selectedWeek = weeksContainer.children[currentWeekIndex];
    selectedWeek.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Cambiar el fondo según la semana seleccionada
    const selectedWeekName = weeks[currentWeekIndex];
    backgroundContainer.style.backgroundImage = backgrounds[selectedWeekName];

    // Cambiar los textos de los tracks según la semana seleccionada
    const trackTexts = tracksByWeek[selectedWeekName];
    const trackDivs = Array.from(tracksContainer.children).slice(1); // Ignorar el primer hijo que es tracksTitle

    trackDivs.forEach((trackDiv, index) => {
        if (trackTexts[index]) {
            trackDiv.textContent = trackTexts[index];
        } else {
            trackDiv.textContent = ''; // Limpiar los divs adicionales
        }
    });

    // Mover la dificultad arriba o abajo con A/D y flechas
    if (event.key === 'a' || event.key === 'ArrowLeft') {
        currentDifficultyIndex = (currentDifficultyIndex > 0) ? currentDifficultyIndex - 1 : difficultyLevels.length - 1;
    } else if (event.key === 'd' || event.key === 'ArrowRight') {
        currentDifficultyIndex = (currentDifficultyIndex < difficultyLevels.length - 1) ? currentDifficultyIndex + 1 : 0;
    }

    // Eliminar la dificultad anterior y añadir la nueva con la animación
    difficultyContainer.innerHTML = '';
    difficultyContainer.appendChild(createDifficultyDiv(difficultyLevels[currentDifficultyIndex]));

    // Redirigir a la URL correspondiente al presionar "Enter"
    if (event.key === 'Enter') {
        const weekName = weeks[currentWeekIndex].replace(' ', '').toLowerCase();
        const difficultyName = difficultyLevels[currentDifficultyIndex].match(/\/(\w+)\.png$/)[1].toLowerCase();

        const url = `./../../../../../game/playstate/${weekName}/${weekName}${difficultyName}/${weekName}${difficultyName}.html`;

        window.location.href = url;
    }

    if (event.key === 'Backspace') {
        // Previene la acción predeterminada para evitar problemas con formularios o elementos enfocados
        event.preventDefault();
        // Redirige a la raíz del proyecto (index.html)
        window.location.href = '../../../index.html';
    }
});
