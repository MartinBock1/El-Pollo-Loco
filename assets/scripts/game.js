/**
 * Represents the canvas element used for rendering the game world.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Represents the game world, including the character, enemies, and level.
 * @type {World}
 */
let world;

/**
 * Represents the keyboard input device.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Represents the start screen element.
 * @type {HTMLElement}
 */
let startScreen;

/**
 * Represents the start button element.
 * @type {HTMLElement}
 */
let startButton;

/**
 * Represents the orientation hint element.
 * @type {HTMLElement}
 */
let orientationHint;

/**
 * The background music audio element for the game.
 * @type {HTMLAudioElement}
 */
let backgroundMusic = new Audio('./assets/audio/music.mp3');

/**
 * Stores all active interval IDs used in the game, allowing them to be stopped.
 * @type {Array<number>}
 */
let intervalIds = [];

/**
 * Boolean flag to track whether the music is muted.
 * @type {boolean}
 */
let isMuted = false;


/**
 * Checks the window's orientation and adjusts the start screen accordingly.
 * - Displays an orientation hint when the screen is in portrait mode.
 * - Disables the start button when in portrait mode and enables it in landscape mode.
 * 
 * Also sets up event listeners for the impressum button and close impressum button:
 * - Displays the impressum overlay when the impressum button is clicked.
 * - Hides the impressum overlay when the close button is clicked.
 */
function checkOrientation() {
    let orientationHint = document.getElementById('orientation-hint');
    let startButton = document.getElementById('start-button');
    let impressumButton = document.getElementById("impressum-button");
    let impressumOverlay = document.getElementById("impressum-overlay");
    let closeImpressumButton = document.getElementById("close-impressum");

    impressumButton.addEventListener("click", function () {
        impressumOverlay.style.display = "flex";
    });

    closeImpressumButton.addEventListener("click", function () {
        impressumOverlay.style.display = "none";
    });

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

/**
 * Initializes the game, checks for orientation, and binds event listeners to buttons.
 */
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

/**
 * Toggles the mute state for the background music.
 * Stops the music if it's currently playing, or restarts it if muted.
 */
function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        stopMusic();
    } else {
        restartMusic();
    }
}

/**
 * Stops the background music and resets its playback position to the start.
 */
function stopMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

/**
 * Restarts the background music, playing it from the beginning.
 */
function restartMusic() {
    backgroundMusic.play();
}

/**
 * Starts the game by hiding the start screen and initializing the world and music.
 */
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

/**
 * Enters fullscreen mode for the canvas element.
 */
function fullscreen() {
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

/**
 * Requests fullscreen for a specified element.
 * @param {HTMLElement} element The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode for the document.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Sets an interval that can be stopped later using its ID.
 * @param {Function} fn The function to be executed at intervals.
 * @param {number} time The time in milliseconds between each execution.
 */
function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Displays the game over screen and stops the game music and intervals.
 */
function showGameOver() {
    stopMusic();
    stopIntervalIds();
    let gameOverScreen = document.createElement('div');
    gameOverScreen.classList.add('game-over-screen');
    gameOverScreen.innerHTML = showGameOverTemplate();
    document.body.appendChild(gameOverScreen);
    world.character.gameOver = true;
}

/**
 * Displays the win game screen and stops the game music and intervals.
 */
function winGame() {
    stopMusic();
    stopIntervalIds();
    let winGameScreen = document.createElement('div');
    winGameScreen.classList.add('game-over-screen');
    winGameScreen.innerHTML = winGameTemplate();
    document.body.appendChild(winGameScreen);
    world.character.gameWon = true;
}

/**
 * Restarts the game by reloading the page.
 */
function restartGame() {
    location.reload();
}

/**
 * Stops all active intervals using their stored interval IDs.
 */
function stopIntervalIds() {
    intervalIds.forEach(clearInterval);
    console.log('All IntervalIds ', intervalIds);
}