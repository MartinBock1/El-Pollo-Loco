let canvas;                         // Declare the 'canvas' variable to hold the canvas element
let world;                          // Declare the 'world' variable which will represent the game world
let keyboard = new Keyboard();      // Create a new Keyboard object to track the keyboard inputs

// Initialize the game world and character
function init() {
    canvas = document.getElementById('canvas');     // Get the canvas element by its ID and assign it to the 'canvas' variable
    world = new World(canvas, keyboard);            // Create a new World object passing the canvas and keyboard objects

    console.log('My Character is:', world.character);
}

// Listen for keydown events on the window object
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39 || e.keyCode == 68) {      // When the RIGHT arrow key is pressed (keyCode 39), set the RIGHT property to true
        keyboard.RIGHT = true;
    }   
    if (e.keyCode == 37 || e.keyCode == 65) {      // When the LEFT arrow key is pressed (keyCode 37), set the LEFT property to true
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38 || e.keyCode == 87) {      // When the UP arrow key is pressed (keyCode 38), set the UP property to true
        keyboard.UP = true;
    }
    if (e.keyCode == 40 || e.keyCode == 83) {      // When the DOWN arrow key is pressed (keyCode 40), set the DOWN property to true
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {                         // When the SPACE key is pressed (keyCode 32), set the SPACE property to true
        keyboard.SPACE = true;
    }
});

// Listen for keyup events on the window object
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39 || e.keyCode == 68) {      // When the RIGHT arrow key is released (keyCode 39), set the RIGHT property to false
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37 || e.keyCode == 65) {      // When the LEFT arrow key is released (keyCode 37), set the LEFT property to false
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38 || e.keyCode == 87) {      // When the UP arrow key is released (keyCode 38), set the UP property to false
        keyboard.UP = false;
    }
    if (e.keyCode == 40 || e.keyCode == 83) {      // When the DOWN arrow key is released (keyCode 40), set the DOWN property to false
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {                         // When the SPACE key is released (keyCode 32), set the SPACE property to false
        keyboard.SPACE = false;
    }
});