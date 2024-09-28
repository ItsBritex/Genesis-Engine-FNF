async function loadResources() {
    const [imageData, audioData] = await Promise.all([
      //imagenes
      loadImage('main/public/gameSprites/start/subMainSprites/Storymode_idle.webp'),
      loadImage('main/public/gameSprites/start/subMainSprites/Storymode_selected.webp'),

      //audios
      loadAudio('main/public/sounds/sfx/confirmMenu.ogg'),
      loadAudio('main/public/sounds/music/freakyMenu.ogg'),
    ]);
}

window.addEventListener('load', function warning() {
    let warningShown = false;
    const warningElement = document.createElement('div');
    document.fonts.load('10pt "FridayNightFunkin"').then(() => {
        console.log('Fuente cargada correctamente');
        warningElement.style.fontFamily = 'FridayNightFunkin';
    }).catch(error => {
        console.error('Error al cargar la fuente:', error);
    });

    document.body.style.cursor = 'auto';
    const confirmSound = new Audio('main/public/sounds/sfx/confirmMenu.ogg');
    const backgroundMusic = new Audio('main/public/sounds/music/freakyMenu.ogg');

    warningElement.innerHTML = `
        <p style="color: red; font-size: 2em; font-weight: bold;">WARNING</p>
        <p style="color: white; font-size: 1.5em;">
            For the best experience, use <span style="color: blue;">F11</span>.
            If you suffer from <span style="color: red;">EPILEPSY</span>, do not attempt to play this.
            This game/mod is in beta, so please report any bugs <span style="color: blue; text-decoration: underline; cursor: pointer;"><a href="https://github.com/ItsBritex/Genesis-Engine-FNF/issues" target="_blank">here</a></span>.<br>
            Enjoy! :]
            <br><br>
            - Britex
        </p>
    `;
    
    // Estilos del mensaje de advertencia
    warningElement.style.position = 'fixed';
    warningElement.style.top = '50%';
    warningElement.style.left = '50%';
    warningElement.style.transform = 'translate(-50%, -50%)';
    warningElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    warningElement.style.padding = '20px';
    warningElement.style.borderRadius = '10px';
    warningElement.style.textAlign = 'center';
    warningElement.style.color = 'white';
    warningElement.style.fontFamily = 'DOCALLISME ON STREET';
    warningElement.style.zIndex = '1000';

    document.body.appendChild(warningElement);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !warningShown) {
            warningShown = true;
            confirmSound.play();

            // Empieza a sonar la música de fondo en loop
            backgroundMusic.loop = true;
            backgroundMusic.play();

            // Efecto de parpadeo
            let blinkCount = 0;
            const blinkInterval = setInterval(function () {
                warningElement.style.visibility = 
                    warningElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
                blinkCount++;

                if (blinkCount >= 6) {
                    clearInterval(blinkInterval);
                    warningElement.remove();

                    // Inicia la función de Intro después de que el mensaje de advertencia desaparece
                    Intro();
                }
            }, 200);
        }
    });
});

function Intro() {

     // Asegúrate de que el documento ha cargado la fuente
     document.fonts.load('10pt "FridayNightFunkin"').then(() => {
        console.log('Fuente cargada correctamente');

        // Aplica la fuente a los elementos de texto
        textElement.style.fontFamily = 'FridayNightFunkin, sans-serif';
        textElement.style.fontSize = '4em';  // Asegúrate de aplicar el tamaño adecuado

        // Otros estilos del elemento textElement
        textElement.style.color = '#ffffff';
        textElement.style.textAlign = 'center';
        textElement.style.display = 'none';

        // Repite para otros elementos si es necesario
        // imageElement.style.fontFamily = 'FridayNightFunkin, sans-serif'; // Si aplicas fuente a imágenes también
        // gfElement.style.fontFamily = 'FridayNightFunkin, sans-serif';  // Si aplicas fuente a otros elementos
    }).catch(error => {
        console.error('Error al cargar la fuente:', error);
    });

    document.body.style.cursor = 'none';
    var inIntro = true;
    var introEventsAttached = false;

    const confirmSound = new Audio('main/public/sounds/sfx/confirmMenu.ogg');
    var textElement = document.createElement('div');
    var imageElement = document.createElement('img');
    var flashElement = document.createElement('div');
    var gfElement = document.createElement('img');
    var LogoElement = document.createElement('img');
    let intro = document.getElementById('intro');
    let menu = document.getElementById('menu');
    let flash = document.createElement('div');
    let pressEnter = document.createElement('img');

    // Estilos de los elementos
    textElement.style.position = 'absolute';
    textElement.style.top = '50%';
    textElement.style.left = '50%';
    textElement.style.transform = 'translate(-50%, -50%)';
    textElement.style.fontSize = '2em';
    textElement.style.color = '#ffffff';
    textElement.style.textAlign = 'center';
    textElement.style.display = 'none';

    imageElement.style.position = 'absolute';
    imageElement.style.top = '50%';
    imageElement.style.left = '50%';
    imageElement.style.transform = 'translate(-50%, -50%)';
    imageElement.style.display = 'none';

    flashElement.style.position = 'fixed';
    flashElement.style.top = '0';
    flashElement.style.left = '0';
    flashElement.style.width = '100%';
    flashElement.style.height = '100%';
    flashElement.style.backgroundColor = 'white';
    flashElement.style.opacity = '0';
    flashElement.style.transition = 'opacity 0.5s';
    flashElement.style.zIndex = '1000';
    flashElement.style.display = 'none';

    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'white';
    flash.style.opacity = '1';
    flash.style.transition = 'opacity 0.5s ease-in-out';
    flash.style.pointerEvents = 'none';
    flash.style.display = 'none';

    gfElement.style.position = 'absolute';
    gfElement.style.top = '50%';
    gfElement.style.right = '63px';
    gfElement.style.transform = 'translateY(-50%)';
    gfElement.style.width = '648px';
    gfElement.style.height = 'auto';
    gfElement.style.display = 'none';

    LogoElement.style.position = 'absolute';
    LogoElement.style.width = '650px';
    LogoElement.style.left = '40px';
    LogoElement.style.top = '2%';
    LogoElement.style.height = 'auto';
    LogoElement.style.display = 'none';

    pressEnter.style.position = 'absolute';
    pressEnter.style.bottom = '7%';
    pressEnter.style.height = '5em';
    pressEnter.style.left = '20%';
    pressEnter.style.width = 'auto';
    pressEnter.style.display = 'none';

    document.body.appendChild(textElement);
    document.body.appendChild(imageElement);
    document.body.appendChild(flashElement);
    document.body.appendChild(gfElement);
    document.body.appendChild(LogoElement);
    document.body.appendChild(flash);
    document.body.appendChild(pressEnter);

    function showText(content) {
        textElement.textContent = content;
        textElement.style.display = 'block';
        imageElement.style.display = 'none';
        gfElement.style.display = 'none';
    }

    function showImage(src) {
        imageElement.src = src;
        imageElement.onload = function () {
            textElement.style.display = 'block';
            textElement.textContent = 'by';
            imageElement.style.display = 'block';
            imageElement.style.width = '200px';
            imageElement.style.height = 'auto';
        };
    }

    function hideAllIntro() {
        textElement.style.display = 'none';
        imageElement.style.display = 'none';
        gfElement.style.display = 'none';
        LogoElement.style.display = 'none';
        pressEnter.style.display = 'none';
    }

    function flashAndShowGif() {
        flashElement.style.display = 'block';
        flashElement.style.opacity = '1';

        gfElement.src = 'main/public/gameSprites/start/intro/Gfboombox.webp';
        gfElement.style.display = 'block';

        LogoElement.src = 'main/public/gameSprites/start/intro/LogoBumpin.webp';
        LogoElement.style.display = 'block';

        pressEnter.src = 'main/public/gameSprites/start/intro/pressEnterToBeggin.webp'; 
        pressEnter.style.display = 'block';
        setTimeout(function () {
            flashElement.style.opacity = '0';
        }, 10);

        setTimeout(function () {
            flashElement.style.display = 'none';
        }, 500);
    }

    function goToMain() {
        hideAllIntro();
        Main();
    }

    function startTransition() {
        flash.style.opacity = '1';
        setTimeout(() => {
            flash.style.transition = 'opacity 0.5s ease-in-out';
            flash.style.opacity = '0';
            hideAllIntro();
        }, 100);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            if (inIntro) {
                confirmSound.play();
                goToMain();
                startTransition();
                hideAllIntro();
                inIntro = false;  // Aseguramos que no se pueda reiniciar la introducción
                document.removeEventListener('keydown', handleKeyDown);  // Desactivar el evento
            }
        }
    }

    if (!introEventsAttached) {
        document.addEventListener('keydown', handleKeyDown);
        introEventsAttached = true;
    }

    function showRandomText(texts, startTime, duration) {
        const randomIndex = Math.floor(Math.random() * texts.length);
        const randomText = texts[randomIndex];
        
        setTimeout(function () {
            hideAllIntro();
            showText(randomText);
        }, startTime);
    
        setTimeout(function () {
            hideAllIntro();
        }, startTime + duration);
    }
    
    const randomTexts = [
        "xddd", 
        "MrBeast",
        "¿Lime test windows?", 
        "Why", 
        "I'm cooking", 
        "lololoolololololo",
        "OGOGOGOGOGOGOGO",
        "haay tilin",
        "LOL",
        "bruh",
        "¡No way!",
        "¡Epic win!",
        "¡GG!",
        "rekt",
        "smh",
        "¡Oof!",
        "fail",
        "bored",
        "pls no",
        "oops",
        "yeet",
        "memes",
        "kek",
        "lmao",
        "pog",
        "meme time",
        "not again",
        "yikes",
        "dank",
        "haha",
        "sadge",
        "big yikes",
        "awkward",
        "weird flex",
        "no cap",
        "epic fail",
        "rekt lol",
        "cringe",
        "rip",
        "oopsie",
        "hype",
        "dab",
        "triggered",
        "xD",
        "just vibing",
        "wholesome",
        "whoops",
        "susus mogus"
    ];
    
    
    setTimeout(function () { showText("Friday Night Funkin'"); }, 0);
    setTimeout(function () { hideAllIntro(); showText("by"); }, 1000);
    setTimeout(function () { showImage("./main/public/gameSprites/start/intro/newgrounds_logo.png"); }, 2800);
    
    // Ajusta la duración del segundo texto random a 700 ms
    showRandomText(randomTexts, 3500, 500);
    // Ajusta la duración del primer texto random a 800 ms
    showRandomText(randomTexts, 4200, 800);
    
    setTimeout(function () { hideAllIntro(); showText("welcome to"); }, 5200);
    setTimeout(function () { hideAllIntro(); showText("Friday"); }, 6000);
    setTimeout(function () { hideAllIntro(); showText("Night"); }, 6400);
    setTimeout(function () { hideAllIntro(); showText("FUNKIN'"); }, 6600);
    setTimeout(function () { hideAllIntro(); flashAndShowGif(); }, 8000);
}


// Función para la escena de Main
function Main() {
    var menuDisplayed = false;
    var selectedOption = 0;
    var isOptionSelected = false; // Nueva variable para evitar que el menú se vuelva a mostrar después de una selección

    var storyModeElement = document.createElement('img');
    var freeplayElement = document.createElement('img');
    var creditsElement = document.createElement('img');
    var optionsElement = document.createElement('img');

    // Carga los sonidos
    function playScrollSound() {
        const scrollSound = new Audio('main/public/sounds/sfx/scroll.ogg');
        scrollSound.play();
    }

    const confirmSound = new Audio('main/public/sounds/sfx/confirmMenu.ogg');
    const cancelSound = new Audio('main/public/sounds/sfx/cancel.ogg');

    var options = [
        {
            element: storyModeElement,
            idleSrc: 'main/public/gameSprites/start/subMainSprites/Storymode_idle.webp',
            selectedSrc: 'main/public/gameSprites/start/subMainSprites/Storymode_selected.webp',
            idleHeight: '8.2rem',
            selectedHeight: '10rem',
        },
        {
            element: freeplayElement,
            idleSrc: 'main/public/gameSprites/start/subMainSprites/freeplay_idle.gif',
            selectedSrc: 'main/public/gameSprites/start/subMainSprites/freeplay_selected.gif',
            idleHeight: '8.2rem',
            selectedHeight: '10rem',
        },
        {
            element: creditsElement,
            idleSrc: 'main/public/gameSprites/start/subMainSprites/credits_idle.webp',
            selectedSrc: 'main/public/gameSprites/start/subMainSprites/credits_selected.webp',
            idleHeight: '8.2rem',
            selectedHeight: '10rem',
        },
        {
            element: optionsElement,
            idleSrc: 'main/public/gameSprites/start/subMainSprites/options_idle.webp',
            selectedSrc: 'main/public/gameSprites/start/subMainSprites/options_selected.webp',
            idleHeight: '8.2rem',
            selectedHeight: '10rem',
        }
    ];

    // Estilos para los elementos de Main
    storyModeElement.style.position = 'absolute';
    storyModeElement.style.top = '5%';
    storyModeElement.style.left = '50%';
    storyModeElement.style.transform = 'translateX(-50%)';
    storyModeElement.style.height = '10rem';
    storyModeElement.style.width = 'auto';
    storyModeElement.style.display = 'none';

    freeplayElement.style.position = 'absolute';
    freeplayElement.style.top = '29%';
    freeplayElement.style.left = '50%';
    freeplayElement.style.transform = 'translateX(-50%)';
    freeplayElement.style.height = '8.2rem';
    freeplayElement.style.width = 'auto';
    freeplayElement.style.display = 'none';

    creditsElement.style.position = 'absolute';
    creditsElement.style.top = '53%';
    creditsElement.style.left = '50%';
    creditsElement.style.transform = 'translateX(-50%)';
    creditsElement.style.height = '8.2rem';
    creditsElement.style.width = 'auto';
    creditsElement.style.display = 'none';

    optionsElement.style.position = 'absolute';
    optionsElement.style.top = '77%';
    optionsElement.style.left = '50%';
    optionsElement.style.transform = 'translateX(-50%)';
    optionsElement.style.height = '8.2rem';
    optionsElement.style.width = 'auto';
    optionsElement.style.display = 'none';

    document.body.appendChild(storyModeElement);
    document.body.appendChild(freeplayElement);
    document.body.appendChild(creditsElement);
    document.body.appendChild(optionsElement);

    // Aplica el fondo al body
    document.body.style.backgroundImage = 'url("main/public/gameSprites/backgrounds/menuBG.png")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';

    function updateMenuSelection() {
        for (var i = 0; i < options.length; i++) {
            if (i === selectedOption) {
                options[i].element.src = options[i].selectedSrc;
                options[i].element.style.height = options[i].selectedHeight;
            } else {
                options[i].element.src = options[i].idleSrc;
                options[i].element.style.height = options[i].idleHeight;
            }
        }
    }

    function moveBackgroundWithSelection() {
        const sections = 4; // Número de secciones en el fondo
        const sectionHeight = 18 / sections; // Altura de cada sección en porcentaje
    
        // Calcula el desplazamiento en porcentaje basado en la opción seleccionada
        const yOffset = selectedOption * sectionHeight;
    
        // Aplica el desplazamiento vertical con transición suave
        document.body.style.transition = 'background-position 0.5s ease-in-out';
        document.body.style.backgroundPositionY = `${yOffset}%`;
    }

    // Inicializa el fondo y aplica zoom
    document.body.style.backgroundImage = 'url("main/public/gameSprites/backgrounds/menuBG.png")';
    document.body.style.backgroundSize = 'cover'; // Ajusta el tamaño para que cubra toda la pantalla
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center top'; // Posiciona el fondo en el borde superior
    document.body.style.backgroundSize = '120%'; // Ajusta el valor del zoom según sea necesario

    // Función para ocultar todas las opciones excepto la seleccionada
    function hideAllExceptSelected() {
        for (let i = 0; i < options.length; i++) {
            if (i !== selectedOption) {
                options[i].element.style.display = 'none';
            } else {
                options[i].element.style.display = 'block';
            }
        }
    }

    // Asegúrate de llamar a moveBackgroundWithSelection cuando cambie la selección
    document.addEventListener('keydown', function(event) {
        if (menuDisplayed && (event.key === 'ArrowUp' || event.key === 'w') && !isOptionSelected) {
            selectedOption = (selectedOption - 1 + options.length) % options.length;
            updateMenuSelection();
            moveBackgroundWithSelection();
            playScrollSound(); // Reproduce el sonido de desplazamiento rápidamente
        } else if (menuDisplayed && (event.key === 'ArrowDown' || event.key === 's') && !isOptionSelected) {
            selectedOption = (selectedOption + 1) % options.length;
            updateMenuSelection();
            moveBackgroundWithSelection();
            playScrollSound(); // Reproduce el sonido de desplazamiento rápidamente
        }
    });

    document.addEventListener('keydown', function (event) {
        if (menuDisplayed && (event.key === 'Enter' || event.key === ' ') && !isOptionSelected) {
            confirmSound.play();
            
            // Evita que el menú se vuelva a mostrar
            isOptionSelected = true;

            // Ocultar todas las opciones menos la seleccionada
            hideAllExceptSelected();
            
            // Parpadeo de la opción seleccionada
            let blinkInterval = setInterval(function () {
                options[selectedOption].element.style.visibility =
                    options[selectedOption].element.style.visibility === 'hidden' ? 'visible' : 'hidden';
            }, 100); // Parpadeo cada 0.1 segundos

            // Detener el parpadeo después de 2 segundos y redirigir
            setTimeout(function () {
                clearInterval(blinkInterval);
                options[selectedOption].element.style.visibility = 'visible'; // Asegurarse de que esté visible
                switch (selectedOption) {
                    case 0:
                        window.location.href = 'main/src/subMain/StoryMode/storymode.html';
                        break;
                    case 1:
                        window.location.href = 'main/src/subMain/Freeplay/freeplay.html';
                        break;
                    case 2:
                        window.location.href = 'main/src/subMain/Credits/credits.html';
                        break;
                    case 3:
                        window.location.href = 'main/src/subMain/Options/options.html';
                        break;
                }
                // Establecer menuDisplayed a false para evitar que se muestre el menú nuevamente
                menuDisplayed = false;
            }, 2000);
        } else if (event.key === 'Backspace' && !isOptionSelected) {
            cancelSound.play();
        }
    });

    // Inicializa el menú
    storyModeElement.src = options[0].idleSrc;
    freeplayElement.src = options[1].idleSrc;
    creditsElement.src = options[2].idleSrc;
    optionsElement.src = options[3].idleSrc;

    storyModeElement.style.display = 'block';
    freeplayElement.style.display = 'block';
    creditsElement.style.display = 'block';
    optionsElement.style.display = 'block';

    menuDisplayed = true;

    updateMenuSelection(); // Llama a esta función para inicializar la selección del menú
    moveBackgroundWithSelection(); // Llama a esta función para inicializar el fondo
}