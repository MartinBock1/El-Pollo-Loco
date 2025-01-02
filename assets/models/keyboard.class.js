/**
 * Class representing the keyboard input states.
 * This class tracks the state of various keys and mouse buttons used for controlling the game.
 * The state of each key is represented as a boolean value (`true` for pressed, `false` for not pressed).
 * 
 * @class Keyboard
 */
class Keyboard {
    /**
     * @type {boolean} - Indicates if the left arrow key or 'a' key is pressed.
     */
    LEFT = false;

    /**
    * @type {boolean} - Indicates if the right arrow key or 'd' key is pressed.
    */
    RIGHT = false;

    /**
     * @type {boolean} - Indicates if the spacebar key is pressed.
     */
    SPACE = false;

    /**
     * @type {boolean} - Indicates if the Enter key is pressed.
     */
    ENTER = false;

    /**
     * @type {boolean} - Indicates if the left mouse button is pressed.
     */
    // MOUSE_LEFT = false;
}

/**
 * Event listener for keyboard keydown events to track when a key is pressed.
 */
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        keyboard.RIGHT = true;
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        keyboard.LEFT = true;
    }
    if (e.key === ' ') {
        keyboard.SPACE = true;
    }
    if (e.key === 'Enter') {
        keyboard.ENTER = true;
    }
});

/**
 * Event listener for mouse button press events to track mouse input.
 */
// window.addEventListener('mousedown', (e) => {
//     if (e.button === 0) {
//         keyboard.MOUSE_LEFT = true;
//     }
// });

/**
 * Event listener for keyboard keyup events to track when a key is released.
 */
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        keyboard.RIGHT = false;
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        keyboard.LEFT = false;
    }
    if (e.key === ' ') {
        keyboard.SPACE = false;
    }
    if (e.key === 'Enter') {
        keyboard.ENTER = false;
    }
});

/**
 * Event listener for mouse button release events to track mouse input.
 */
// window.addEventListener('mouseup', (e) => {
//     if (e.button === 0) {
//         keyboard.MOUSE_LEFT = false;
//     }
// });

/**
 * Binds touch events to on-screen buttons for mobile controls.
 * This allows tracking the state of the on-screen buttons (left, right, jump, throw).
 */
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