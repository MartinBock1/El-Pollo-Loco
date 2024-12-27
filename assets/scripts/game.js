let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;

function init() {
    startScreen = document.getElementById('start-screen');
    startScreen.style.display = 'flex';
    document.getElementById('start-button').addEventListener('click', startGame);
    bindBtsPressEvents();
}

function startGame() {
    startScreen.style.display = 'none';
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.level.enemies.push(new Endboss());

    console.log('My Character is:', world.character);
}

function fullscreen() {
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// Methode um das "Game Over" anzuzeigen
function showGameOver() {
    let gameOverScreen = document.createElement('div');
    gameOverScreen.classList.add('game-over-screen');
    gameOverScreen.innerHTML = `
        <img src="./assets/img/9_intro_outro_screens/game_over/oh no you lost!.png" alt="Game Over">
        <button class="start-button" onclick="restartGame()">Play Again</button>
    `;
    document.body.appendChild(gameOverScreen);
    // Wenn das Spiel verloren ist, stoppe das Schnarchen
    world.character.gameOver = true;
    world.character.stopAllSounds();  // Stopp alle Sounds, einschließlich Schnarchen
}

function winGame() {
    let winGameScreen = document.createElement('div');
    winGameScreen.classList.add('game-over-screen');
    winGameScreen.innerHTML = `
        <img src="./assets/img/9_intro_outro_screens/win/won_2.png" alt="You Win">
        <button class="start-button" onclick="restartGame()">Play Again</button>
    `;
    document.body.appendChild(winGameScreen);
    // Wenn das Spiel gewonnen wurde, stoppe das Schnarchen
    world.character.gameWon = true;
    world.character.stopAllSounds();  // Stopp alle Sounds, einschließlich Schnarchen
}

function restartGame() {
    location.reload();
}