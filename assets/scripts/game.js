let canvas;
let world;
let canvasHeight = 480;



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas)    

    console.log('My Character is:', world.character);
}