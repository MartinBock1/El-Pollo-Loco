class MovableObject extends DrawableObject {                       // Define the MovableObject class, which represents an object that can move
    imageCache = {};                        // Create an object to cache images for quicker loading
    currentImage = 0;                       // Set the initial index for the current image (used in animation)
    speed = 0.15;                           // Set the speed for the moveLeft function (controls how fast the object moves left)
    otherDirection = false;                 // A flag to indicate if the object is moving in the opposite direction (not used in this snippet)
    speedY = 0;                             // Vertical speed, used to simulate gravity or jumping
    acceleration = 2.5;                     // Acceleration rate for gravity (how quickly the object falls)
    walking_sound;
    jumping_sound;
    energy = 100;
    lastHit = 0;

    /**
     * Method to apply gravity to the object, causing it to fall
     */
    applyGravity() {
        setInterval(() => {                                     // Set an interval to apply gravity every 1/25th of a second
            if (this.isAboveGround() || this.speedY > 0) {      // If the object is above the ground or falling
                this.y -= this.speedY;                          // Decrease the y-coordinate (move the object downwards)
                this.speedY -= this.acceleration;               // Decrease the vertical speed, simulating gravity pulling the object down
            }
        }, 1000 / 25);                                          // Run the gravity effect at a rate of 25 times per second (25 FPS)
    }

    /**
     * Method to check if the object is above a certain height (ground level)
     * @returns 'his.y < 215'
     */
    isAboveGround() {
        return this.y < 215;                                    // Return true if the object's y-coordinate is less than 215, indicating it is in the air
    }    

    /**
     * Function to draw a frame (outline) around the object for debugging or visualization
     * @param {*} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall) {
            ctx.beginPath();                                    // Start a new path to draw
            ctx.lineWidth = '5';                                // Set the line width for the frame (outline)
            ctx.strokeStyle = 'blue';                           // Set the stroke color to blue for the frame
            ctx.rect(this.x, this.y, this.width, this.height);  // Draw a rectangle around the object using its current position and size
            ctx.stroke();                                       // Apply the stroke to the path (draw the rectangle)
        }
    }

    /**
     * Function to place enemies (or objects) in the world with random starting positions
     * @param {*} imagesArray 
     */
    placeEnemies(imagesArray) {
        this.loadImages(imagesArray);                           // Load all images from the provided array (e.g., enemy images)
        this.x = 200 + Math.random() * 2000;                    // Set a random horizontal position for the object, between 200px and 2200px
        this.speed = 0.15 + (Math.random() * 0.4);              // Set the speed of the object to a random value between 0.15 and 0.55
    }

    /**
     * Function to play a specific animation from an array of images
     * @param {*} images 
     */
    playAnimation(images) {
        /** explanation - de -
         * Die Zeile sorgt dafür, dass der Wert von i immer innerhalb des Bereichs der verfügbaren Bilder
         * bleibt. Wenn this.currentImage beispielsweise 6 erreicht und die Anzahl der Bilder in
         * IMAGES_WALKING 6 ist, würde der Modulo-Operator 6 % 6 den Wert 0 zurückgeben, was bedeutet,
         * dass die Animation wieder beim ersten Bild startet.
         * Dies stellt sicher, dass die Animation wieder von vorne beginnt, sobald das letzte Bild erreicht ist.
         */
        let i = this.currentImage % images.length;              // Get the index for the current image in the animation sequence
        let path = images[i];                                   // Get the current image path using the index
        this.img = this.imageCache[path];                       // Set the object's img property to the cached image at the current path
        this.currentImage++;                                    // Increment the current image index for the next frame in the animation
    }    

    /**
     * Function to move the object to the right
     */
    moveRight() {
        this.x += this.speed;                                   // Increase the x-coordinate by the object's speed (move right)
    }

    /**
     * Function to move the object to the left
     */
    moveLeft() {
        this.x -= this.speed;                                   // Decrease the x-coordinate by the object's speed (move left)
    }

    /**
     * Function to make the object jump
     */
    jump() {
        this.walking_sound.pause();                             // Pause the walking sound (if any)
        this.speedY = 30;                                       // Set the vertical speed to 30, causing the object to move upwards (jump)
        this.jumpingSound();                                                    // Play the jumping animation.
    }

    walkingSound() {
        this.walking_sound.play();                              // Play the walking sound.
        this.walking_sound.playbackRate = 2;                    // Set the playback speed of the walking sound to 2x (faster).
    }

    jumpingSound() {
        this.jumping_sound.play();                              // Play the jumping sound.
        this.jumping_sound.volume = 0.1;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000;     // difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

}