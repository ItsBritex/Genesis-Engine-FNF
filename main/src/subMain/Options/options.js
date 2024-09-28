// Esperar a que la ventana cargue completamente
window.addEventListener('load', function() {
    // Mostrar la pantalla de carga
    showLoadingScreen();

    // Cargar todos los elementos
    preloadAssets().then(() => {
        // Ocultar la pantalla de carga y mostrar el menú
        hideLoadingScreen().then(() => {
            // Iniciar el menú
            menu();
        });
    });
});

function showLoadingScreen() {
    // Crear la pantalla de carga
    let loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.backgroundImage = "url('../../../public/gameSprites/Loading_screen.webp')";
    loadingScreen.style.backgroundSize = 'cover';
    loadingScreen.style.backgroundPosition = 'center';
    loadingScreen.style.zIndex = '9999';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.flexDirection = 'column';
    loadingScreen.style.justifyContent = 'flex-end';
    loadingScreen.style.alignItems = 'center';

    // Crear la barra de progreso
    let progressBarContainer = document.createElement('div');
    progressBarContainer.style.width = '80%';
    progressBarContainer.style.height = '20px';
    progressBarContainer.style.backgroundColor = '#333';
    progressBarContainer.style.borderRadius = '10px';
    progressBarContainer.style.overflow = 'hidden';
    progressBarContainer.style.marginBottom = '50px';

    let progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    progressBar.style.width = '0%';
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = '#00FF00';
    progressBar.style.borderRadius = '10px';
    
    progressBarContainer.appendChild(progressBar);
    loadingScreen.appendChild(progressBarContainer);

    document.body.appendChild(loadingScreen);
}

function preloadAssets() {
    return new Promise((resolve) => {
        let progress = 0;
        let totalAssets = 100; // Número total de activos a cargar (ajusta según sea necesario)
        
        // Simulación de carga de activos con intervalos (debes reemplazar esto con la carga real de tus activos)
        let interval = setInterval(() => {
            progress += 1;
            let progressBar = document.getElementById('progress-bar');
            progressBar.style.width = `${progress}%`;

            if (progress >= totalAssets) {
                clearInterval(interval);
                resolve();
            }
        }, 30); // Simulación de tiempo de carga (ajusta según sea necesario)
    });
}

function hideLoadingScreen() {
    return new Promise((resolve) => {
        let loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.transition = 'opacity 1s ease-in-out';
        loadingScreen.style.opacity = '0';

        setTimeout(() => {
            document.body.removeChild(loadingScreen);
            resolve();
        }, 1000); // Duración de la transición
    });
}

function menu() {
    
    // Establecer el fondo de pantalla y estilos básicos del cuerpo
    document.body.style.backgroundImage = "url('../../../public/gameSprites/backgrounds/menuBGMagenta.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    
    let audio = new Audio('../../../public/sounds/music/freakyMenuOptions.mp3');
    audio.loop = true;
    let audioStarted = false;
    
    // Función para iniciar la reproducción del audio
    function startAudio() {
        if (!audioStarted) {
            audio.play().catch(function(error) {
                console.error('Error al reproducir el audio:', error);
            });
            audioStarted = true;
        }
    }
    
    // Escuchar eventos de teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            startAudio();
        }
    });
    
    // Escuchar eventos de movimiento del ratón
    document.addEventListener('mousemove', function() {
        startAudio();
    });
    

    

    // Crear una instancia de Audio
    const audioCheckBox = new Audio('../../../public/sounds/sfx/soundtray/checkboxChecked.ogg');
    const audioUncheckBox = new Audio('../../../public/sounds/sfx/soundtray/checkboxUnchecked.ogg');

    // Crear la caja principal del menú
    let menuBox = document.createElement('div');
    menuBox.style.position = 'fixed';
    menuBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    menuBox.style.width = '40%';
    menuBox.style.height = '64%';
    menuBox.style.top = '26.8%';
    menuBox.style.left = '5%';
    menuBox.style.overflowY = 'auto';
    menuBox.style.overflowY = 'hidden';
    menuBox.style.overflowX = 'hidden';
    menuBox.style.padding = '20px';
    menuBox.style.borderBottomLeftRadius = '10px';
    menuBox.style.borderBottomRightRadius = '10px';
    menuBox.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    menuBox.style.zIndex = '1000'; // Asegura que esté por encima de otros elementos
    document.body.appendChild(menuBox);

    // Añadir la imagen de encabezado dentro de la caja del menú
    let headerImage = document.createElement('img');
    headerImage.src = '../../../public/gameSprites/start/subMainSprites/options_idle.webp';
    headerImage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    headerImage.style.padding = '2px';
    headerImage.style.paddingLeft = '20px';
    headerImage.style.paddingRight = '20px';
    headerImage.style.borderTopLeftRadius = '10px';
    headerImage.style.borderTopRightRadius = '10px';
    headerImage.style.position = 'fixed'
    headerImage.style.top = '10%'; // Ajusta según necesidad
    headerImage.style.left = '5%'; // Ajusta según necesidad
    headerImage.style.width = '40%';
    headerImage.style.height = 'auto';
    headerImage.style.marginBottom = '20px';
    menuBox.appendChild(headerImage);

    // Contenedor para las opciones del menú
    let optionsContainer = document.createElement('div');
    menuBox.appendChild(optionsContainer);

    // Función para crear un título de sección
    function createTitle(name) {
        let title = document.createElement('div');
        title.style.color = '#ffffff';
        title.style.fontSize = '3.4em';
        title.style.fontWeight = 'bold';
        title.style.cursor = 'hidden';
        title.innerText = name;
        title.classList.add('title');
        title.style.padding = '10px';
        title.style.borderBottom = '1px solid rgba(255,255,255,0.3)';
        return title;
    }

    // Función para crear una opción dentro de una sección
    function createOption(name, type, isSubOption) {
        let option = document.createElement('div');
        option.style.color = '#ffffff';
        option.style.fontSize = '2em';
        option.style.cursor = 'hidden';
        option.style.padding = '8px 10px';
        option.style.display = 'flex';
        option.style.alignItems = 'center';
        option.classList.add('option');

        if (isSubOption) {
            option.style.paddingLeft = '30px';
        } else {
            option.style.paddingLeft = '20px';
        }

        let optionLabel = document.createElement('span');
        optionLabel.innerText = name;
        option.appendChild(optionLabel);

        // Añadir el componente de imagen en lugar del checkbox
        if (type === 'checkbox') {
            let imageContainer = document.createElement('div');
            imageContainer.style.marginLeft = 'auto';
            imageContainer.style.width = '28px';  // Tamaño de la imagen
            imageContainer.style.height = 'auto'; // Tamaño de la imagen
            imageContainer.classList.add('checkbox-image');

            let imgUnselected = document.createElement('img');
            imgUnselected.src = '../../../public/gameSprites/Escenes/optionsSprites/Check_Box_unselected0.webp';
            imgUnselected.style.width = '100%';
            imgUnselected.style.height = '100%';
            imgUnselected.classList.add('unselected');
            imageContainer.appendChild(imgUnselected);

            option.appendChild(imageContainer);
        } else if (type === 'slider') {
            let slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '0';
            slider.max = '100';
            slider.style.marginLeft = 'auto';
            option.appendChild(slider);
        }
        return option;
    }

    // Definición de las secciones y opciones del menú
    let sections = [
        {
            title: 'CONTROLS',
            options: [
                { title: 'Movement', subOptions: [
                    { name: 'Left', type: 'keybind' },
                    { name: 'Down', type: 'keybind' },
                    { name: 'Up', type: 'keybind' },
                    { name: 'Right', type: 'keybind' }
                ]},
                { title: 'UI', subOptions: [
                    { name: 'Accept', type: 'keybind' },
                    { name: 'Back', type: 'keybind' },
                    { name: 'Pause', type: 'keybind' }
                ]}
            ]
        },
        {
            title: 'OPTIMIZATION',
            options: [
                { name: 'Max Frames', type: 'checkbox' },
                { name: 'Low Quality', type: 'checkbox' },
                { name: 'GPU Caching', type: 'checkbox' }
            ]
        },
        {
            title: 'VISUALS',
            options: [
                {
                    title: 'HUD',
                    subOptions: [
                        { name: 'Hide HUD', type: 'checkbox' },
                        { name: 'Time Bar', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Game',
                    subOptions: [
                        { name: 'Flashing Lights', type: 'checkbox' },
                        { name: 'Camera Zooms', type: 'checkbox' },
                        { name: 'FPS Counter', type: 'checkbox' }
                    ]
                }
            ]
        },
        {
            title: 'GAMEPLAY',
            options: [
                {
                    title: 'HUD',
                    subOptions: [
                        { name: 'Down Scroll', type: 'checkbox' },
                        { name: 'Middle Scroll', type: 'checkbox' },
                        { name: 'Opponent Notes', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Game',
                    subOptions: [
                        { name: 'Ghost Tapping', type: 'checkbox' },
                        { name: 'Auto Pause', type: 'checkbox' },
                        { name: 'Disable Reset Button', type: 'checkbox' },
                        { name: 'Volume Hit Sound', type: 'slider' }
                    ]
                },
                {
                    title: 'Advanced',
                    subOptions: [
                        { name: 'Rating Offset', type: 'slider' },
                        { name: 'Sick! Hit', type: 'slider' },
                        { name: 'Good Hit', type: 'slider' },
                        { name: 'Bad Hit', type: 'slider' }
                    ]
                }
            ]
        }
    ];

    // Crear el menú dinámicamente basado en las secciones definidas
    sections.forEach(section => {
        let title = createTitle(section.title);
        optionsContainer.appendChild(title);

        section.options.forEach(option => {
            if (option.subOptions) {
                let subSectionTitle = createTitle(option.title);
                subSectionTitle.style.fontSize = '14px';
                subSectionTitle.style.paddingLeft = '25px';
                optionsContainer.appendChild(subSectionTitle);

                option.subOptions.forEach(subOption => {
                    let subOptionElement = createOption(subOption.name, subOption.type, true);
                    optionsContainer.appendChild(subOptionElement);
                });
            } else {
                let optionElement = createOption(option.name, option.type, false);
                optionsContainer.appendChild(optionElement);
            }
        });
    });

    // Selección actual para navegación con teclado
    let allOptions = Array.from(document.querySelectorAll('.title, .option'));
    let currentSelectionIndex = 0;
    allOptions[currentSelectionIndex].classList.add('selected');

    // Agregar estilo para la opción seleccionada
    const updateSelectionVisuals = () => {
        allOptions.forEach((option, index) => {
            if (index === currentSelectionIndex) {
                option.classList.add('selected');
                option.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                option.classList.remove('selected');
            }
        });
    };

    // Manejar la navegación con el teclado
    document.addEventListener('keydown', function(event) {
        let key = event.key;
        if (key === 'ArrowUp') {
            event.preventDefault();
            currentSelectionIndex = (currentSelectionIndex - 1 + allOptions.length) % allOptions.length;
            updateSelectionVisuals();
            updateExampleBox();
            playScrollSound();
        } else if (key === 'ArrowDown') {
            event.preventDefault();
            currentSelectionIndex = (currentSelectionIndex + 1) % allOptions.length;
            updateSelectionVisuals();
            updateExampleBox();
            playScrollSound();
        } else if (key === 'Enter') {
            event.preventDefault();
            let selectedElement = allOptions[currentSelectionIndex];
            if (selectedElement.classList.contains('title')) {
                toggleSubOptions(selectedElement);
                playSelectSound();
            } else if (selectedElement.classList.contains('option')) {
                let imageContainer = selectedElement.querySelector('.checkbox-image');
                if (imageContainer) {
                    let img = imageContainer.querySelector('img');
                    if (img.classList.contains('unselected')) {
                        img.src = '../../../public/gameSprites/Escenes/optionsSprites/CheckBoxSelect.webp';
                        img.classList.remove('unselected');
                        img.classList.add('select');
                        audioCheckBox.play();
                        setTimeout(() => {
                            img.src = '../../../public/gameSprites/Escenes/optionsSprites/checkBoxStatic.webp';
                            img.classList.remove('select');
                            img.classList.add('static');
                        }, 450); // 450 ms para 27 frames
                        setTimeout(200);
                    } else if (img.classList.contains('select')) {
                        img.src = '../../../public/gameSprites/Escenes/optionsSprites/checkBoxStatic.webp';
                        img.classList.remove('select');
                        img.classList.add('static');
                    } else if (img.classList.contains('static')) {
                        img.src = '../../../public/gameSprites/Escenes/optionsSprites/Check_Box_unselected0.webp';
                        img.classList.remove('static');
                        img.classList.add('unselected');
                        audioUncheckBox.play();
                    }
                }
            }
        }
        if (event.key === 'Backspace') {
            // Previene la acción predeterminada para evitar problemas con formularios o elementos enfocados
            event.preventDefault();
            // Redirige a la raíz del proyecto (index.html)
            window.location.href = '../../../index.html';
        }
    });

    // Función para mostrar u ocultar subopciones
    const toggleSubOptions = (titleElement) => {
        let nextSibling = titleElement.nextElementSibling;
        while (nextSibling && !nextSibling.classList.contains('title')) {
            nextSibling.style.display = nextSibling.style.display === 'none' ? 'flex' : 'none';
            nextSibling = nextSibling.nextElementSibling;
        }
    };

    // Función para reproducir sonido de scroll
    const playScrollSound = () => {
        let scrollSound = new Audio('../../../public/sounds/sfx/scroll.ogg');
        scrollSound.play();
    };

    // Inicializar la caja de ejemplo
    const exampleBox = createExampleBox();
    document.body.appendChild(exampleBox.container);

    // Función para actualizar la caja de ejemplo según la selección actual
    const updateExampleBox = () => {
        let selectedElement = allOptions[currentSelectionIndex];
        let selectedText = selectedElement.innerText.trim();

        exampleBox.description.innerText = descriptions[selectedText] || 'Default description for this option.';
        exampleBox.image.src = images[selectedText] || '../../../public/gameSprites/start/intro/LogoBumpin.webp';
    };

    // Llamar a la actualización inicial de la caja de ejemplo
    updateExampleBox();
}



// Función para crear la caja de ejemplo que contiene la imagen y la descripción
function createExampleBox() {
    // Contenedor principal de la caja de ejemplo
    let container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    container.style.width = '40%'; // Igual que la caja del menú
    container.style.height = '80%'; // Igual que la caja del menú
    container.style.bottom = '4%';
    container.style.right = '5%'; // Igual que la caja del menú
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.padding = '20px'; // Igual que la caja del menú
    container.style.borderRadius = '10px';
    container.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)'; // Igual que la caja del menú

    // Imagen que cambia según la opción seleccionada
    let imageContainer = document.createElement('div');
    imageContainer.style.flex = '1';
    imageContainer.style.display = 'flex';
    imageContainer.style.justifyContent = 'center';
    imageContainer.style.alignItems = 'center';
    imageContainer.style.marginBottom = '20px';
    
    let image = document.createElement('img');
    image.style.width = '100%';
    image.style.height = 'auto';
    imageContainer.appendChild(image);
    container.appendChild(imageContainer);

    let text = document.createElement('h1');
    text.style.width = '100%';
    text.style.height = 'auto';
    container.appendChild(text);

    // Texto de descripción que cambia según la opción seleccionada
    let description = document.createElement('div');
    description.style.color = '#ffffff';
    description.style.fontFamily = 'Arial, sans-serif';
    description.style.fontSize = '16px'; // Ajustar según necesidad
    description.style.textAlign = 'center';
    description.style.lineHeight = '1.5';
    description.style.marginTop = '10px'; // Añadir margen superior para separar de la imagen
    container.appendChild(description);

    return { container, image, description};
}


// Objeto que contiene las descripciones para cada opción
const descriptions = {
    'CONTROLS': 'Customize how you control the game.',
    'Movement': 'Set up your movement keys.',
    'Left': 'Default description for Left key.',
    'Down': 'Default description for Down key.',
    'Up': 'Default description for Up key.',
    'Right': 'Default description for Right key.',
    'UI': 'Set up your user interface keys.',
    'Accept': 'Default description for Accept key.',
    'Back': 'Default description for Back key.',
    'Pause': 'Default description for Pause key.',
    'OPTIMIZATION': 'Adjust settings for better performance.',
    'Max Frames': 'Default description for Max Frames.',
    'Low Quality': 'Default description for Low Quality.',
    'GPU Caching': 'Default description for GPU Caching.',
    'VISUALS': 'Customize the visual aspects of the game.',
    'HUD': 'Settings related to the heads-up display.',
    'Hide HUD': 'Default description for Hide HUD.',
    'Time Bar': 'Default description for Time Bar.',
    'Game': 'Visual settings for gameplay.',
    'Flashing Lights': 'Default description for Flashing Lights.',
    'Camera Zooms': 'Default description for Camera Zooms.',
    'FPS Counter': 'Default description for FPS Counter.',
    'GAMEPLAY': 'Customize gameplay experience.',
    'Down Scroll': 'Default description for Down Scroll.',
    'Middle Scroll': 'Default description for Middle Scroll.',
    'Opponent Notes': 'Default description for Opponent Notes.',
    'Ghost Tapping': 'Default description for Ghost Tapping.',
    'Auto Pause': 'Default description for Auto Pause.',
    'Disable Reset Button': 'Default description for Disable Reset Button.',
    'Volume Hit Sound': 'Default description for Volume Hit Sound.',
    'Advanced': 'Advanced gameplay settings.',
    'Rating Offset': 'Default description for Rating Offset.',
    'Sick! Hit': 'Default description for Sick! Hit.',
    'Good Hit': 'Default description for Good Hit.',
    'Bad Hit': 'Default description for Bad Hit.'
};

// Objeto que contiene las rutas de imagen para cada opción
const images = {
    'CONTROLS': '',
    'Movement': '',
    'Left': '',
    'Down': '',
    'Up': '',
    'Right': '',
    'UI': '',
    'Accept': '',
    'Back': '',
    'Pause': '',
    'OPTIMIZATION': '',
    'Max Frames': '',
    'Low Quality': '',
    'GPU Caching': '',
    'VISUALS': '',
    'HUD': '',
    'Hide HUD': '',
    'Time Bar': '',
    'Game': '',
    'Flashing Lights': '',
    'Camera Zooms': '',
    'FPS Counter': '',
    'GAMEPLAY': '',
    'Down Scroll': '',
    'Middle Scroll': '',
    'Opponent Notes': '',
    'Ghost Tapping': '',
    'Auto Pause': '',
    'Disable Reset Button': '',
    'Volume Hit Sound': '',
    'Advanced': '',
    'Rating Offset': '',
    'Sick! Hit': '',
    'Good Hit': '',
    'Bad Hit': ''
};


const updateSelectionVisuals = () => {
    let foundValidOption = false;
    const allSections = document.querySelectorAll('.collapsible');
    
    // Itera sobre todas las secciones y verifica su estado
    for (let sectionIndex = 0; sectionIndex < allSections.length; sectionIndex++) {
        const section = allSections[sectionIndex];
        const isCollapsed = section.classList.contains('collapsed');
        
        if (!isCollapsed) {
            const options = section.querySelectorAll('.option');
            let optionFound = false;

            // Itera sobre las opciones dentro de la sección no colapsada
            for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
                const option = options[optionIndex];

                // Verifica si la opción actual coincide con la selección
                if (currentSelectionIndex === option.dataset.index) {
                    option.classList.add('selected');
                    option.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    optionFound = true;
                    foundValidOption = true;
                    break;
                }
            }

            if (optionFound) {
                break; // Sale del bucle de secciones si se encontró una opción válida
            }
        }
    }

    // Si no se encontró una opción válida, reinicia la selección
    if (!foundValidOption) {
        currentSelectionIndex = 0;
        updateSelectionVisuals(); // Reinicia la búsqueda desde el inicio
    }

    // Remueve la selección de todas las demás opciones
    document.querySelectorAll('.option').forEach((option) => {
        if (option.dataset.index !== currentSelectionIndex) {
            option.classList.remove('selected');
        }
    });
};