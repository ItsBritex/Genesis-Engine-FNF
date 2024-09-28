export class PauseMenu {
    constructor() {
        this.menuContainer = document.createElement('div');
        this.menuContainer.style.position = 'fixed';
        this.menuContainer.style.top = '0';
        this.menuContainer.style.left = '0';
        this.menuContainer.style.width = '100%';
        this.menuContainer.style.height = '100%';
        this.menuContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Fondo oscuro
        this.menuContainer.style.display = 'none'; // Oculto inicialmente, solo se mostrará con Enter
        this.menuContainer.style.zIndex = '9999'; // Por encima de todo
        this.menuContainer.style.justifyContent = 'flex-start';
        this.menuContainer.style.alignItems = 'center';

        // Crear la lista de opciones
        this.menuList = document.createElement('ul');
        this.menuList.style.listStyle = 'none';
        this.menuList.style.margin = '0';
        this.menuList.style.padding = '0';
        this.menuList.style.color = 'white';
        this.menuList.style.fontSize = '2em';
        this.menuList.style.paddingLeft = '2em';

        // Configurar el audio del scroll
        this.scroll = document.createElement('audio');
        this.scroll.src = '../../../../main/public/sounds/sfx/scroll.ogg'; // Asegúrate de poner la ruta correcta del sonido

        this.options = ['Resume', 'Reset', 'Back to Menu'];
        this.selectedIndex = 0;

        this.options.forEach((option, index) => {
            const li = document.createElement('li');
            li.textContent = option;
            li.style.cursor = 'pointer';
            li.style.padding = '0.5em 0';
            if (index === this.selectedIndex) {
                li.style.color = 'yellow'; // La opción seleccionada se resalta
            }
            this.menuList.appendChild(li);
        });

        this.menuContainer.appendChild(this.menuList);
        document.body.appendChild(this.menuContainer);

        this.isMenuVisible = false; // Controlar la visibilidad del menú

        this.setupKeyListeners();
    }

    // Mostrar el menú de pausa
    show() {
        this.menuContainer.style.display = 'flex';
        this.isMenuVisible = true;
        this.pauseGame();
    }

    // Ocultar el menú de pausa
    hide() {
        this.menuContainer.style.display = 'none';
        this.isMenuVisible = false;
        this.resumeGame();
    }

    // Escuchar las teclas para mostrar o navegar el menú
    setupKeyListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (!this.isMenuVisible) {
                    this.show(); // Mostrar el menú si no está visible
                } else {
                    this.selectOption(); // Seleccionar opción si el menú ya está visible
                }
            } else if (event.key === 'Escape' || event.key === 'Backspace') {
                if (this.isMenuVisible) {
                    this.hide(); // Cerrar el menú si está visible
                }
            } else if (event.key === 'ArrowUp' && this.isMenuVisible) {
                this.moveUp();
            } else if (event.key === 'ArrowDown' && this.isMenuVisible) {
                this.moveDown();
            }
        });
    }

    moveUp() {
        if (this.selectedIndex > 0) {
            this.selectedIndex--;
            this.updateMenu();
            this.playScrollSound(); // Reproducir el sonido al moverse hacia arriba
        }
    }

    moveDown() {
        if (this.selectedIndex < this.options.length - 1) {
            this.selectedIndex++;
            this.updateMenu();
            this.playScrollSound(); // Reproducir el sonido al moverse hacia abajo
        }
    }

    updateMenu() {
        const listItems = this.menuList.querySelectorAll('li');
        listItems.forEach((item, index) => {
            item.style.color = index === this.selectedIndex ? 'yellow' : 'white'; // Resaltar opción seleccionada
        });
    }

    selectOption() {
        const selectedOption = this.options[this.selectedIndex];
        switch (selectedOption) {
            case 'Resume':
                this.hide();
                break;
            case 'Reset':
                this.resetGame();
                break;
            case 'Back to Menu':
                this.backToMenu();
                break;
        }
    }

    pauseGame() {
        console.log('Juego pausado');
        // Implementar lógica para pausar el juego
    }

    resumeGame() {
        console.log('Juego reanudado');
        // Implementar lógica para reanudar el juego
    }

    resetGame() {
        console.log('Reiniciar juego');
        location.reload(); // Recargar la página para reiniciar el juego
    }

    backToMenu() {
        console.log('Volver al menú principal');
        window.location.href = '../../../main/src/subMain/StoryMode/storymode.html';
    }

    // Reproducir el sonido de scroll
    playScrollSound() {
        this.scroll.currentTime = 0; // Reiniciar el audio para que se pueda reproducir varias veces
        this.scroll.play();
    }
}
