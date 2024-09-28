export function initializeLifeBar() {
    const lifeBar = document.createElement('div');
    lifeBar.id = 'life-bar';
    lifeBar.style.width = '100%';
    lifeBar.style.height = '30px';
    lifeBar.style.backgroundColor = 'red';
    document.getElementById('game-ui').appendChild(lifeBar);
}
