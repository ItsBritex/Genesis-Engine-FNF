export class Arrows {
    constructor(startPosition = -458, endPosition = window.innerHeight, globalSpeed = 3) {
        this.arrowsContainerPlayer = document.createElement('div');
        this.arrowsContainerEnemy = document.createElement('div');

        this.arrowsContainerPlayer.style.position = 'fixed';
        this.arrowsContainerPlayer.style.bottom = '55%';
        this.arrowsContainerPlayer.style.left = '55%';
        this.arrowsContainerPlayer.style.width = '100%';
        this.arrowsContainerPlayer.style.zIndex = '100';

        this.arrowsContainerEnemy.style.position = 'fixed';
        this.arrowsContainerEnemy.style.bottom = '55%';
        this.arrowsContainerEnemy.style.left = '5%';
        this.arrowsContainerEnemy.style.width = '100%';
        this.arrowsContainerEnemy.style.zIndex = '100';

        this.keysPressed = {};
        this.staticArrowsPlayer = {};
        this.staticArrowsEnemy = {};
        this.movingArrows = { player: [], enemy: [] };
        this.holdArrows = { player: [], enemy: [] };
        this.globalSpeed = globalSpeed;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.enemyPressDelay = 200;
        this.confirmedAnimationDuration = 400;

        this.setupKeyListeners();
        this.createStaticArrows();
    }

    createStaticArrows() {
        ['left', 'down', 'up', 'right'].forEach(type => {
            const playerArrowContainer = this.createArrowContainer(type, 'player');
            this.arrowsContainerPlayer.appendChild(playerArrowContainer);
            this.staticArrowsPlayer[type] = playerArrowContainer;

            const enemyArrowContainer = this.createArrowContainer(type, 'enemy');
            this.arrowsContainerEnemy.appendChild(enemyArrowContainer);
            this.staticArrowsEnemy[type] = enemyArrowContainer;
        });
    }

    createArrowContainer(type, role) {
        const arrowContainer = document.createElement('div');
        arrowContainer.style.position = 'absolute';
        arrowContainer.style.left = this.getArrowPosition(type, role) + 'px';
        arrowContainer.style.bottom = '150px';
        arrowContainer.style.width = '110px';
        arrowContainer.style.height = '110px';
        arrowContainer.style.display = 'flex';
        arrowContainer.style.alignItems = 'center';
        arrowContainer.style.justifyContent = 'center';
        arrowContainer.style.zIndex = '1';

        const staticArrow = document.createElement('img');
        staticArrow.src = `../../../../main/public/gameSprites/arrows/statics/${type}.webp`;
        staticArrow.alt = `Static Arrow ${type}`;
        staticArrow.style.width = '110px';
        staticArrow.style.height = 'auto';
        staticArrow.dataset.type = type;

        arrowContainer.appendChild(staticArrow);
        return arrowContainer;
    }

    getArrowPosition(type, role) {
        const positionsPlayer = {
            'left': 120,
            'down': 230,
            'up': 340,
            'right': 450
        };

        const positionsEnemy = {
            'left': -30,
            'down': 80,
            'up': 190,
            'right': 300
        };

        return role === 'player' ? positionsPlayer[type] : positionsEnemy[type];
    }

    addToDOM() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.appendChild(this.arrowsContainerPlayer);
        gameContainer.appendChild(this.arrowsContainerEnemy);
    }

    setupKeyListeners() {
        window.addEventListener('keydown', (event) => {
            if (['a', 's', 'k', 'l'].includes(event.key)) {
                this.keysPressed[event.key] = true;
                this.updateArrows('player');
            }
        });

        window.addEventListener('keyup', (event) => {
            if (['a', 's', 'k', 'l'].includes(event.key)) {
                this.keysPressed[event.key] = false;
                this.updateArrows('player');
            }
        });
    }

    updateArrows(role) {
        const arrowMapping = {
            'a': 'left',
            's': 'down',
            'k': 'up',
            'l': 'right'
        };

        for (const key in arrowMapping) {
            const arrowType = arrowMapping[key];
            const staticArrow = this[`staticArrows${role.charAt(0).toUpperCase() + role.slice(1)}`][arrowType];

            if ((role === 'player' && this.keysPressed[key]) || (role === 'enemy' && this.checkArrowHit(arrowType, 'enemy'))) {
                const hitArrow = this.checkArrowHit(arrowType, role);
                const holdArrow = this.checkHoldArrowHit(arrowType, role);
                if (hitArrow) {
                    this.setArrowState(staticArrow, 'confirmed');
                    this.removeArrow(hitArrow, role);
                } else if (holdArrow) {
                    this.setArrowState(staticArrow, 'confirmed');
                } else {
                    this.setArrowState(staticArrow, 'pressed');
                }
            } else {
                this.setArrowState(staticArrow, 'static');
            }
        }
    }

    checkArrowHit(type, role) {
        const staticArrow = this[`staticArrows${role.charAt(0).toUpperCase() + role.slice(1)}`][type];
        const staticRect = staticArrow.getBoundingClientRect();
        
        for (let i = 0; i < this.movingArrows[role].length; i++) {
            const movingArrow = this.movingArrows[role][i];
            if (movingArrow.dataset.type === type) {
                const movingRect = movingArrow.getBoundingClientRect();
                if (this.isOverlapping(staticRect, movingRect)) {
                    return movingArrow;
                }
            }
        }
        return null;
    }

    checkHoldArrowHit(type, role) {
        const staticArrow = this[`staticArrows${role.charAt(0).toUpperCase() + role.slice(1)}`][type];
        const staticRect = staticArrow.getBoundingClientRect();
        
        for (let i = 0; i < this.holdArrows[role].length; i++) {
            const holdArrow = this.holdArrows[role][i];
            if (holdArrow.dataset.type === type) {
                const holdRect = holdArrow.getBoundingClientRect();
                if (this.isOverlapping(staticRect, holdRect)) {
                    return holdArrow;
                }
            }
        }
        return null;
    }

    isOverlapping(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    setArrowState(arrowContainer, state) {
        const arrowType = arrowContainer.firstChild.dataset.type;
        const arrowImage = arrowContainer.firstChild;

        if (state === 'pressed') {
            arrowImage.src = `../../../../main/public/gameSprites/arrows/pressed/${arrowType}.webp`;
        } else if (state === 'confirmed') {
            arrowImage.src = `../../../../main/public/gameSprites/arrows/confirmed/${arrowType}.webp`;
            setTimeout(() => {
                arrowImage.src = `../../../../main/public/gameSprites/arrows/statics/${arrowType}.webp`;
            }, this.confirmedAnimationDuration);
        } else {
            arrowImage.src = `../../../../main/public/gameSprites/arrows/statics/${arrowType}.webp`;
        }
    }

    spawnArrowFromJSON(jsonData) {
        if (jsonData.globalSpeed !== undefined) {
            this.setGlobalSpeed(jsonData.globalSpeed);
        }

        ['player', 'enemy'].forEach(role => {
            jsonData[role].arrows.forEach(arrowData => {
                setTimeout(() => {
                    const arrow = this.createArrow(arrowData.type, role);
                    this[`arrowsContainer${role.charAt(0).toUpperCase() + role.slice(1)}`].appendChild(arrow);
                    this.movingArrows[role].push(arrow);
                    this.moveArrow(arrow, role);

                    if (arrowData.hold && arrowData.hold > 0) {
                        console.log(`Spawning hold arrow: type=${arrowData.type}, role=${role}, hold=${arrowData.hold}`);
                        const holdArrow = this.createHoldArrow(arrowData.type, role, arrowData.hold);
                        this[`arrowsContainer${role.charAt(0).toUpperCase() + role.slice(1)}`].appendChild(holdArrow);
                        this.holdArrows[role].push(holdArrow);
                        this.moveHoldArrow(holdArrow, role);
                    }
                }, arrowData.delay);
            });
        });
    }

    createArrow(type, role) {
        const arrow = document.createElement('img');
        arrow.src = `../../../../main/public/gameSprites/arrows/one/${type}.webp`;
        arrow.dataset.type = type;
        arrow.style.position = 'absolute';
        arrow.style.bottom = `${this.startPosition}px`;
        arrow.style.left = this.getArrowPosition(type, role) + 'px';
        arrow.style.width = '110px';
        arrow.style.zIndex = '2';
        arrow.classList.add(`arrow-${role}`);
        return arrow;
    }

    createHoldArrow(type, role, holdLength) {
        console.log(`Creating hold arrow: type=${type}, role=${role}, holdLength=${holdLength}`);
        const holdContainer = document.createElement('div');
        holdContainer.style.position = 'absolute';
        holdContainer.style.bottom = `${this.startPosition}px`;
        holdContainer.style.left = this.getArrowPosition(type, role) + 'px';
        holdContainer.style.width = '110px';
        holdContainer.style.zIndex = '3';
        holdContainer.dataset.type = type;

        const holdBody = document.createElement('img');
        holdBody.src = `../../../../main/public/gameSprites/arrows/hold/${type}Hold.png`;
        holdBody.style.width = '100%';
        holdBody.style.height = `${holdLength * 110}px`;
        holdBody.style.objectFit = 'cover';
        holdBody.style.objectPosition = 'top';

        const holdEnd = document.createElement('img');
        holdEnd.src = `../../../../main/public/gameSprites/arrows/hold/${type}HoldEnd.png`;
        holdEnd.style.width = '100%';
        holdEnd.style.height = 'auto';

        holdContainer.appendChild(holdBody);
        holdContainer.appendChild(holdEnd);

        // Add a border for visibility during debugging
        holdContainer.style.border = '2px solid red';

        return holdContainer;
    }

    moveArrow(arrow, role) {
        const move = () => {
            const currentPosition = parseInt(arrow.style.bottom);
            const newPosition = currentPosition + this.globalSpeed;
            arrow.style.bottom = `${newPosition}px`;

            if (newPosition >= this.endPosition) {
                this.removeArrow(arrow, role);
            } else {
                if (role === 'enemy') {
                    const hitArrow = this.checkArrowHit(arrow.dataset.type, 'enemy');
                    if (hitArrow) {
                        setTimeout(() => {
                            this.updateArrows('enemy');
                        }, this.enemyPressDelay);
                    }
                }
                requestAnimationFrame(move);
            }
        };

        requestAnimationFrame(move);
    }

    moveHoldArrow(holdArrow, role) {
        console.log(`Moving hold arrow: type=${holdArrow.dataset.type}, role=${role}`);
        const move = () => {
            const currentPosition = parseInt(holdArrow.style.bottom);
            const newPosition = currentPosition + this.globalSpeed;
            holdArrow.style.bottom = `${newPosition}px`;

            const staticArrow = this[`staticArrows${role.charAt(0).toUpperCase() + role.slice(1)}`][holdArrow.dataset.type];
            const staticRect = staticArrow.getBoundingClientRect();
            const holdRect = holdArrow.getBoundingClientRect();

            if (holdRect.top >= staticRect.top + staticRect.height / 2) {
                console.log(`Removing hold arrow: type=${holdArrow.dataset.type}, role=${role}`);
                this.removeHoldArrow(holdArrow, role);
            } else {
                requestAnimationFrame(move);
            }
        };

        requestAnimationFrame(move);
    }

    removeArrow(arrow, role) {
        this.movingArrows[role] = this.movingArrows[role].filter(a => a !== arrow);
        arrow.remove();
    }

    removeHoldArrow(holdArrow, role) {
        this.holdArrows[role] = this.holdArrows[role].filter(a => a !== holdArrow);
        holdArrow.remove();
    }

    setStartPosition(position) {
        this.startPosition = position;
    }

    setEndPosition(position) {
        this.endPosition = position;
    }

    setArrowRange(start, end) {
        this.startPosition = start;
        this.endPosition = end;
    }

    setGlobalSpeed(speed) {
        this.globalSpeed = speed;
    }
}