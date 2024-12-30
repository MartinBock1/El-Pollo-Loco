let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let startButton;
let orientationHint;
let backgroundMusic = new Audio('./assets/audio/music.mp3');
let intervalIds = [];
let isMuted = false;

// Hole die Elemente
let impressumButton = document.getElementById("impressum-button");
let impressumOverlay = document.getElementById("impressum-overlay");
let closeImpressumButton = document.getElementById("close-impressum");

// Eventlistener für den Impressum-Button
impressumButton.addEventListener("click", function () {
    impressumOverlay.style.display = "flex"; // Zeigt das Overlay an
});

// Eventlistener für den Schließen-Button
closeImpressumButton.addEventListener("click", function () {
    impressumOverlay.style.display = "none"; // Versteckt das Overlay
});

// Optional: Klick auf den Overlay-Hintergrund schließt das Overlay
impressumOverlay.addEventListener("click", function (event) {
    if (event.target === impressumOverlay) {
        impressumOverlay.style.display = "none"; // Versteckt das Overlay, wenn auf den Hintergrund geklickt wird
    }
});

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
    document.getElementById('mute').addEventListener('click', toggleMute);
    document.getElementById('mute-responsive').addEventListener('click', toggleMute);
    bindBtsPressEvents();
}

function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        stopAllSounds();
    } else {
        unmuteAllSounds();
    }
}

function stopAllSounds() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

function unmuteAllSounds() {
    backgroundMusic.play();
    backgroundMusic.volume = 0.03;
}

function startGame() {
    startScreen.style.display = 'none';
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.level.enemies.push(new Endboss());
    backgroundMusic.loop = true;
    backgroundMusic.play();
    backgroundMusic.volume = 0.02;

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

function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function showGameOver() {
    let gameOverScreen = document.createElement('div');
    gameOverScreen.classList.add('game-over-screen');
    gameOverScreen.innerHTML = showGameOverTemplate();
    document.body.appendChild(gameOverScreen);
    world.character.gameOver = true;
    stopAllSounds();
    stopIntervalIds();
}

function winGame() {
    let winGameScreen = document.createElement('div');
    winGameScreen.classList.add('game-over-screen');
    winGameScreen.innerHTML = winGameTemplate();
    document.body.appendChild(winGameScreen);
    world.character.gameWon = true;
    stopAllSounds();
    stopIntervalIds();
}

function restartGame() {
    location.reload();
}

function stopIntervalIds() {
    intervalIds.forEach(clearInterval);
    console.log('All IntervalIds ', intervalIds);
}