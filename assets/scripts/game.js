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

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        keyboard.RIGHT = true;
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        keyboard.LEFT = true;
    }
    if (e.key === 'ArrowUp' || e.key === 'w') {
        keyboard.UP = true;
    }
    if (e.key === 'ArrowDown' || e.key === 's') {
        keyboard.DOWN = true;
    }
    if (e.key === ' ') {
        keyboard.SPACE = true;
    }
    if (e.key === 'Enter') {
        keyboard.ENTER = true;
    }
});

window.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        keyboard.MOUSE_LEFT = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        keyboard.RIGHT = false;
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        keyboard.LEFT = false;
    }
    if (e.key === 'ArrowUp' || e.key === 'w') {
        keyboard.UP = false;
    }
    if (e.key === 'ArrowDown' || e.key === 's') {
        keyboard.DOWN = false;
    }
    if (e.key === ' ') {
        keyboard.SPACE = false;
    }
    if (e.key === 'Enter') {
        keyboard.ENTER = false;
    }
});

window.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
        keyboard.MOUSE_LEFT = false;
    }
});


function bindBtsPressEvents() {    
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.ENTER = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.ENTER = false;
    });
}