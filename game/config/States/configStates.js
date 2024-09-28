document.addEventListener('DOMContentLoaded', function() {
    // Detectar el título del documento o la URL
    const pageTitle = document.title;  // Toma el título, ej: "WEEK 1 - NORMAL"
    
    // Extraer la semana y la dificultad del título
    const [week, difficulty] = pageTitle.split(' - ');

    // Cargar las configuraciones según la semana y dificultad
    loadUIConfig(week, difficulty);
    loadSongs(week, difficulty);
});

function loadUIConfig(week, difficulty) {
    // Dependiendo de la semana, carga las configuraciones adecuadas de la UI
    switch (week) {
        case 'WEEK 1':
                import('./UI/lifebar.js').then(module => module.initializeLifeBar());
                import('./UI/arrows.js').then(module => module.initializeArrows());
                import('./UI/characters.js').then(module => module.loadCharacters());
            break;
        // Cargar otras semanas según corresponda
    }
}

function loadSongs(week, difficulty) {
    const baseMusicPath = '../../../main/public/sounds/soundtrack/';  // Ruta relativa a la música

    const songs = {
        'WEEK 1': {
            'EASY': [`${baseMusicPath}song1_easy.mp3`, `${baseMusicPath}song2_easy.mp3`, `${baseMusicPath}song3_easy.mp3`],
            'NORMAL': [`${baseMusicPath}song1_normal.mp3`, `${baseMusicPath}song2_normal.mp3`, `${baseMusicPath}song3_normal.mp3`],
            'HARD': [`${baseMusicPath}song1_hard.mp3`, `${baseMusicPath}song2_hard.mp3`, `${baseMusicPath}song3_hard.mp3`]
        },
        // Otras semanas y dificultades...
    };

    const tracks = songs[week][difficulty.toUpperCase()];
    playSongs(tracks);
}

function playSongs(tracks) {
    // Aquí puedes agregar la lógica para reproducir las canciones
    tracks.forEach(track => {
        console.log(`Playing: ${track}`);
        const audio = new Audio(track);
        audio.play();
    });
}
