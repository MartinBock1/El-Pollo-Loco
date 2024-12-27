/**
 * Represents a keyboard input handler for tracking the state of specific keys and mouse buttons.
 * This class keeps track of whether keys such as LEFT, RIGHT, UP, DOWN, SPACE, ENTER, and MOUSE_LEFT are pressed or not.
 * The state of each key is represented as a boolean value (`true` for pressed, `false` for not pressed).
 * 
 * @class Keyboard
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    ENTER = false;
    MOUSE_LEFT = false;
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