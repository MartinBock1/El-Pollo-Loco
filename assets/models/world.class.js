class World {                                       // Define the World class, which represents the game world
    character = new Character();                    // Initialize the character object as an instance of the Character class
    level = level1;                                 // Set the level of the game (e.g., level1)
    canvas;                                         // Declare the canvas and context variables
    ctx;                                            // Declare the context of the canvas (used to draw objects)
    keyboard;                                       // Declare the keyboard object to track user input (e.g., keyboard controls)
    camera_x = 0;                                   // Set the initial x-coordinate for the camera (controls the camera's position)
    statusBarHealth = new Statusbar('health');      // Set type as 'health'
    statusBarCoins = new Statusbar('coin');         // Set type as 'coin'
    statusBarBottle = new Statusbar('bottle');      // Set type as 'bottle'
    throwableObjects = [];
    collectedBottles = 0;

    constructor(canvas) {                           // Constructor function to initialize the World object
        this.ctx = canvas.getContext('2d');         // Get the 2D context of the canvas to draw on it
        this.canvas = canvas;                       // Assign the canvas element to the class's canvas property
        this.keyboard = keyboard;                   // Assign the keyboard object to the class's keyboard property
        this.draw();                                // Call the draw method to start rendering the world
        this.setWorld();                            // Set the world for the character, which links the character to the world
        this.run();
    }

    /**
     * Function to set the world reference for the character object
     */
    setWorld() {
        this.character.world = this;                // Assign the current world to the character's world property
    }

    run() {
        setInterval(() => {                         // Set an interval to run this function continuously every 200 milliseconds
            this.checkCollisions();                 // Check for collisions between the character and enemies
            this.checkCollisionsBottles();
            this.checkThrowObjects();               // Check if the player is throwing objects (e.g., bottles)
        }, 200);                                    // Execute every 200ms (5 times per second)
    }

    checkThrowObjects() {
        if (this.keyboard.ENTER || this.keyboard.MOUSE_LEFT) {                                  // If the ENTER key or the left mouse button is pressed
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);    // Create a new throwable object at the character's position
            this.throwableObjects.push(bottle);                                                 // Add the new bottle to the list of throwable objects
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {                             // Loop through each enemy in the current level's enemies array
            if (this.character.isColliding(enemy)) {                        // If the character collides with an enemy
                this.character.hit();                                       // Make the character "hit" (take damage)
                this.statusBarHealth.setPercentage(this.character.energy);  // Update the status bar with the character's current energy
            };
        });
    }

    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && !bottle.collected) {  // Check if character collides with bottle and bottle isn't collected
                this.statusBarBottle.increasePercentage(20);                // Increase the bottle status bar by 20% on each collision
                bottle.collected = true;                                    // Mark this bottle as collected 
                this.collectedBottles++;
                this.level.bottles.splice(index, 1);
                console.log(this.collectedBottles);
                
            };
        });
    }

    /**
     * Function to draw the game world on the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    // Clear the canvas to remove the previous frame
        this.ctx.translate(this.camera_x, 0);                               // Apply a translation to the canvas, moving the camera

        // The order in which objects are added to the map is important for rendering!
        this.addObjectsToMap(this.level.backgroundObjects);                 // Add the background objects to the map (background layers)
        this.addObjectsToMap(this.level.clouds);                            // Add the clouds to the map
        this.addObjectsToMap(this.level.enemies);                           // Add the enemies to the 
        this.addObjectsToMap(this.level.bottles);                           // Add the bottles to the map
        this.addObjectsToMap(this.level.coins);                             // Add the coins to the map
        this.addObjectsToMap(this.throwableObjects);                        // Add throwable objects (e.g., bottles) to the map

        this.ctx.translate(-this.camera_x, 0);                              // Reverse the camera translation to restore the canvas state
        // ----- Space for fixed objects ----- //
        // Set the y-positions for each status bar before drawing
        this.statusBarHealth.y = 10;                                        // Set the Y position for health bar
        this.statusBarCoins.y = 50;                                         // Set the Y position for coin bar
        this.statusBarBottle.y = 100;                                       // Set the Y position for bottle bar
        this.addToMap(this.statusBarHealth);                                // Draw health bar
        this.addToMap(this.statusBarCoins);                                 // Draw coin bar
        this.addToMap(this.statusBarBottle);                                // Draw bottle bar
        this.ctx.translate(this.camera_x, 0);                               // Apply the camera translation again

        this.addToMap(this.character);                                      // Add the character to the map (gameplay object)
        this.ctx.translate(-this.camera_x, 0);                              // Reverse the camera translation to maintain the world’s position

        requestAnimationFrame(() => {                                       // Request the next animation frame to keep the game loop running
            this.draw();                                                    // Recursively call the draw method to continue rendering the game world
        });
    }

    /**
     * Helper function to add multiple objects to the map by iterating over an array
     * @param {*} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {                                              // Loop through each object in the array
            this.addToMap(o);                                               // Add each individual object to the map
        });
    }

    /**
     * Function to add a single object to the map
     * @param {*} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {                                            // If the object is facing the opposite direction
            this.flipImage(mo);                                             // Flip the object horizontally
        }

        mo.draw(this.ctx);                                                  // Draw the object on the canvas
        mo.drawFrame(this.ctx);                                             // Optionally draw the object's frame (debugging tool)

        if (mo.otherDirection) {                                            // If the object was flipped
            this.flipImageBack(mo);                                         // Flip the object back to its original orientation
        }
    }

    /**
     * Function to flip the image horizontally
     * @param {*} mo 
     */
    flipImage(mo) {
        this.ctx.save();                                                    // Save the current canvas state
        this.ctx.translate(mo.width, 0);                                    // Translate the canvas by the width of the object (flip point)
        this.ctx.scale(-1, 1);                                              // Flip the canvas horizontally (scale x by -1)
        mo.x = mo.x * -1;                                                   // Adjust the x-coordinate of the object to reflect the flip
    }

    /**
     * Function to restore the object to its original orientation
     * @param {*} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;                                                   // Reverse the flip by adjusting the x-coordinate back
        this.ctx.restore();                                                 // Restore the canvas state to undo the flip transformation
    }
}