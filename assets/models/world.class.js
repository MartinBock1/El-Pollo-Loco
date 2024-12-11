class World {                                                             // Define the World class, which represents the game world
    character = new Character();                                          // Initialize the character object as an instance of the Character class
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;

    backgroundObjects = level1.backgroundObjects;

    canvas;                                                               // Declare the canvas and context variables
    ctx;
    keyboard;                                                             // Declare the keyboard object, which will track user input
    camera_x = 0;

    constructor(canvas) {                                                 // Constructor function to initialize the World object
        this.ctx = canvas.getContext("2d");                               // Get the 2D context of the canvas to draw on it
        this.canvas = canvas;                                             // Assign the canvas element to the class's canvas property
        this.keyboard = keyboard;                                         // Assign the keyboard object to the class's keyboard property
        this.draw();                                                      // Call the draw method to start rendering the world
        this.setWorld();                                                  // Set the world for the character, which links the character to the world
    }

    setWorld() {                                                          // Set the world reference for the character object
        this.character.world = this;
    }

    draw() {                                                              // Draw the game world on the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // Clear the canvas to remove the previous frame
        this.ctx.translate(this.camera_x, 0);

        // The order in which objects are added to the map is important for rendering!
        this.addObjectsToMap(this.level.backgroundObjects);                     // Add the background objects to the map (background layers)
        this.addObjectsToMap(this.level.clouds);                                // Add the clouds to the map
        this.addObjectsToMap(this.level.enemies);                               // Add the enemies to the map
        this.addToMap(this.character);                                    // Add the character to the map (gameplay object)
        this.ctx.translate(-this.camera_x, 0);

        // Continuously call the draw method to create an animation loop
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {                                            // Helper function to add multiple objects to the map by iterating over an array
        objects.forEach(o => {
            this.addToMap(o);                                             // Add each object in the array to the map
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }                                                                 // Function to draw a single object on the map
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);      // Draw the object on the canvas at its position with its size

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}