/**
 * Class representing a movable object in the game.
 * This class includes properties and methods for handling the movement, gravity, collisions, animation, sounds, and health of an object that can move in the game world.
 */
class MovableObject extends DrawableObject {
    /**
     * @type {number} - The speed at which the object moves.
     */
    speed = 0.15;

    /**
    * @type {boolean} - A flag indicating whether the object is moving in the opposite direction.
    */
    otherDirection = false;

    /**
    * @type {number} - The vertical speed of the object, used for gravity and jumping.
    */
    speedY = 0;

    /**
     * @type {number} - The rate of acceleration when the object is affected by gravity.
     */
    acceleration = 2.5;

    /**
     * Audio objects for various sound effects (e.g., chicken fried, bottle crash).
     * @type {Audio}
     */
    bottleCrashSound;
    chickenFriedSound;
    chickenHitSound;
    jumpingSound;
    looseSound;
    pepeDeathSound;
    pepeHurtSound;
    snoringSound;
    throwingSound;
    walkingSound;
    winSound;

    /**
     * @type {number} - The object's energy, which is decreased when the object is hit.
     */
    energy = 100;

    /**
     * @type {number} - The timestamp of the last hit, used to check if the object is recently hurt.
     */
    lastHit = 0;

    /**
     * @type {Object} - The offset used for collision detection (top, left, right, bottom).
     */
    offset = {
        top: 50,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * @type {Array} - Array of interval IDs used to stop intervals when necessary.
     */
    intervalIds = [];

    /**
     * @type {number} - The index for cycling through images for animation.
     */
    index = 1;    

    /**
     * Applies gravity to the object by adjusting its vertical position (y-axis) and speed (y-direction).
     * Uses a stopable interval to continuously apply gravity until the object reaches the ground.
     */
    applyGravity() {
        setStopableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground (used for gravity application).
     * @returns {boolean} - Returns true if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {               
            return true;
        } else {
            return this.y < 215;                             
        }
    }

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MovableObject} mo - The other object to check collision with.
     * @returns {boolean} - Returns true if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }  
    
    /**
     * Places enemies on the game map with random positions and speed.
     * @param {Array} imagesArray - The array of image paths for the enemy.
     */
    placeEnemies(imagesArray) {
        this.loadImages(imagesArray);
        this.x = 400 + Math.random() * 2000;
        this.speed = 0.2 + (Math.random() * 0.8);
    }

    /**
     * Plays the animation based on the provided image array.
     * @param {Array} images - The array of image paths to use for the animation.
     */
    playAnimation(images) {
        /** explanation - de -
         * Die Zeile sorgt dafür, dass der Wert von i immer innerhalb des Bereichs der verfügbaren Bilder
         * bleibt. Wenn this.currentImage beispielsweise 6 erreicht und die Anzahl der Bilder in
         * IMAGES_WALKING 6 ist, würde der Modulo-Operator 6 % 6 den Wert 0 zurückgeben, was bedeutet,
         * dass die Animation wieder beim ersten Bild startet.
         * Dies stellt sicher, dass die Animation wieder von vorne beginnt, sobald das letzte Bild erreicht ist.
         * 
         * --- en ---
         * This line ensures the index `i` stays within the bounds of the available images.
         * For example, if `this.currentImage` reaches 6 and there are 6 images, 
         * the modulo operator will return `0`, meaning the animation starts again from the first image.
         */
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;        
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting a vertical speed and playing the jumping sound.
     */
    jump() {
        this.walkingSound.pause();
        this.speedY = 30;
        if (!isMuted) {
            this.isJumpingSound();
        }        
    }

    /**
     * Plays the snoring sound.
     */
    isSnoringSound() {
        this.snoringSound.play();
        this.snoringSound.volume = 0.07;
    }

    /**
     * Plays the walking sound.
     */
    isWalkingSound() {
        this.walkingSound.play();
        this.walkingSound.playbackRate = 2;
    }

    /**
     * Plays the jumping sound.
     */
    isJumpingSound() {
        this.jumpingSound.play();
        this.jumpingSound.volume = 0.1;
    }

    /**
     * Plays the sound for when the object (e.g., Pepe) is hurt.
     */
    isPepeHurtSound() {
        this.pepeHurtSound.play();
        this.pepeHurtSound.volume = 0.1;
    }

    /**
     * Plays the sound for when the object (e.g., Pepe) dies.
     */
    isPepeDeathSound() {
        this.pepeDeathSound.play();
        this.pepeDeathSound.volume = 0.1;
    }

    /**
     * Plays the sound for when the object throws an item (bottle).
     */
    isThrowingSound() {
        this.throwingSound.play();
        this.throwingSound.volume = 0.1;
    }

    /**
     * Plays the sound for when a bottle crashes.
     */
    isBottleCrashSound() {
        this.bottleCrashSound.play();
        this.bottleCrashSound.volume = 1;
    }

    /**
     * Plays the sound for when a chicken (endboss) is hit.
     */
    isChickenHitSound() {
        this.chickenHitSound.play();
        this.chickenHitSound.volume = 1;
    }

    /**
     * Plays the sound for when the chicken (endboss) is fried.
     */
    isChickenFriedSound() {
        this.chickenFriedSound.play();
        this.chickenFriedSound.volume = 1;
    }   
    
    /**
     * Plays the sound for when the object loses.
     */
    isLooseSound() {
        this.looseSound.play();
        this.looseSound.volume = 0.5;
    }

    /**
     * Plays the sound for when the game is won.
     */
    isWinSound() {
        this.winSound.play();
        this.winSound.volume = 0.5;
    }

    /**
     * Reduces the object's energy by 2 when it is hit.
     * If energy falls below 0, it is set to 0. Otherwise, it records the time of the last hit.
     */
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the object's energy by 20 when hit by the endboss.
     * If energy falls below 0, it is set to 0. Otherwise, it records the time of the last hit.
     */
    isEndbossHit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is recently hurt by comparing the time passed since the last hit.
     * @returns {boolean} - Returns true if the object is hurt within the last second, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;   // difference in ms
        timepassed = timepassed / 1000;                         // difference in s
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead (i.e., its energy is 0).
     * @returns {boolean} - Returns true if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }     
}