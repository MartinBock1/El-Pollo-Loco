let canvas;                         // Declare the 'canvas' variable to hold the canvas element
let world;                          // Declare the 'world' variable which will represent the game world
let keyboard = new Keyboard();      // Create a new Keyboard object to track the keyboard inputs

// Initialize the game world and character
function init() {
    canvas = document.getElementById('canvas');     // Get the canvas element by its ID and assign it to the 'canvas' variable
    world = new World(canvas, keyboard);            // Create a new World object passing the canvas and keyboard objects
    // world.level.enemies.push(new Endboss());

    console.log('My Character is:', world.character);
}

// Listen for keydown events on the window object
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {  // When the RIGHT arrow key is pressed, set the RIGHT property to true
        keyboard.RIGHT = true;
    }   
    if (e.key === 'ArrowLeft' || e.key === 'a') {   // When the LEFT arrow key is pressed, set the LEFT property to true
        keyboard.LEFT = true;
    }
    if (e.key === 'ArrowUp' || e.key === 'w') {     // When the UP arrow key is pressed, set the UP property to true
        keyboard.UP = true;
    }
    if (e.key === 'ArrowDown' || e.key === 's') {   // When the DOWN arrow key is pressed), set the DOWN property to true
        keyboard.DOWN = true;
    }
    if (e.key === ' ') {                            // When the SPACE key is pressed, set the SPACE property to true
        keyboard.SPACE = true;
    }
    if (e.key === 'Enter') {                        // When the Enter-key is pressed, set the ENTER property to true
        keyboard.ENTER = true;
    }
});

window.addEventListener('mousedown', (e) => {
    if (e.button === 0) {                           // When the left Mouse-key is pressed, set the MOUSE_LEFT property to true
        keyboard.MOUSE_LEFT = true;
    }
});

// Listen for keyup events on the window object
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {  // When the RIGHT arrow key is released, set the RIGHT property to false
        keyboard.RIGHT = false;
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {   // When the LEFT arrow key is released, set the LEFT property to false
        keyboard.LEFT = false;
    }
    if (e.key === 'ArrowUp' || e.key === 'w') {     // When the UP arrow key is released, set the UP property to false
        keyboard.UP = false;
    }
    if (e.key === 'ArrowDown' || e.key === 's') {   // When the DOWN arrow key is released, set the DOWN property to false
        keyboard.DOWN = false;
    }
    if (e.key === ' ') {                            // When the SPACE key is released, set the SPACE property to false
        keyboard.SPACE = false;
    }
    if (e.key === 'Enter') {                        // When the Enter-key is released, set the ENTER property to false
        keyboard.ENTER = false;
    }
});

window.addEventListener('mouseup', (e) => {
    if (e.button === 0) {                           // When the left Mouse-key is released, set the MOUSE_LEFT property to false
        keyboard.MOUSE_LEFT = false;
    }
});