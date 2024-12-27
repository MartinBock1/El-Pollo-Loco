let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let startButton;
let orientationHint;
let backgroundMusic = new Audio('./assets/audio/music.mp3');
let intervalIds = [];

function checkOrientation() {
    let orientationHint = document.getElementById('orientation-hint');
    let startButton = document.getElementById('start-button');

    if (window.innerHeight > window.innerWidth) {
        orientationHint.style.display = 'flex';
        startButton.disabled = true;
    } else {
        orientationHint.style.display = 'none';
        startButton.disabled = false;
    }
}
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

function init() {
    checkOrientation();
    orientationHint = document.getElementById('orientation-hint');
    startScreen = document.getElementById('start-screen');
    startButton = document.getElementById('start-button');
    startScreen.style.display = 'flex';
    document.getElementById('start-button').addEventListener('click', startGame);
    bindBtsPressEvents();
}

function startGame() {
    startScreen.style.display = 'none';
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.level.enemies.push(new Endboss());
    backgroundMusic.loop = true;
    backgroundMusic.play();
    backgroundMusic.volume = 0.03;

    console.log('My Character is:', world.character);
    console.log('IntervalIds Character ', intervalIds);
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

function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function showGameOver() {
    let gameOverScreen = document.createElement('div');
    gameOverScreen.classList.add('game-over-screen');
    gameOverScreen.innerHTML = `
                                    <img src="./assets/img/9_intro_outro_screens/game_over/oh no you lost!.png" alt="Game Over">
                                    <button class="start-button" onclick="restartGame()">Play Again</button>
                                `;
    document.body.appendChild(gameOverScreen);
    world.character.gameOver = true;
    backgroundMusic.pause();
    stopIntervalIds();
}

function winGame() {
    let winGameScreen = document.createElement('div');
    winGameScreen.classList.add('game-over-screen');
    winGameScreen.innerHTML = `
                                    <img src="./assets/img/9_intro_outro_screens/win/won_2.png" alt="You Win">
                                    <button class="start-button" onclick="restartGame()">Play Again</button>
                               `;
    document.body.appendChild(winGameScreen);
    world.character.gameWon = true;
    backgroundMusic.pause();
    stopIntervalIds();
}

function restartGame() {
    location.reload();
}

function stopIntervalIds() {
    intervalIds.forEach(clearInterval);
    console.log('All IntervalIds ', intervalIds);
}