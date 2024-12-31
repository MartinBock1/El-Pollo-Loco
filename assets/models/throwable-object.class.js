/**
 * Represents a throwable object in the game that extends the MovableObject class.
 * This class simulates the behavior of an object being thrown, including its initial position, size, and motion.
 * The object is thrown with an initial speed and affected by gravity, moving horizontally over time.
 * It rotates during flight, and splashes when hitting an enemy or surface.
 * 
 * @class ThrowableObject
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * Array of image paths representing the bottle rotation animation (frames).
     * @type {Array<string>}
     */
    IMAGE_BOTTLE_ROTATION = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * Array of image paths representing the bottle splash animation (frames).
     * @type {Array<string>}
     */
    IMAGE_BOTTLE_SPLASH = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
    * Audio object for the bottle crash sound.
    * @type {HTMLAudioElement}
    */
    bottleCrashSound = new Audio('./assets/audio/bottle-crash.mp3');

    /**
    * Audio object for the throwing sound.
    * @type {HTMLAudioElement}
    */
    throwingSound = new Audio('./assets/audio/throw.mp3');

    /**
    * Creates an instance of a ThrowableObject (bottle).
    * @param {number} x - The initial x-coordinate of the bottle.
    * @param {number} y - The initial y-coordinate of the bottle.
    */
    constructor(x, y) {
        super().loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGE_BOTTLE_ROTATION);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        if (world.character.otherDirection) {
            this.speedX = -10;
        } else {
            this.speedX = 10;
        }
        this.throw();
    }

    /**
     * Initiates the bottle throw.
     * The bottle moves in the x direction with a speed and gravity is applied to it.
     * If the bottle collides with certain enemies (Endboss, Chicken, ChickenSmall), the throw stops and plays the splash animation.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            this.x += this.speedX;
            this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
            if (!this.soundPlayed && !isMuted) {
                this.isThrowingSound();
                this.soundPlayed = true;
            }
            
            world.level.enemies.forEach(enemy => {
                if (this.isColliding(enemy) && (enemy instanceof Endboss || enemy instanceof Chicken || enemy instanceof ChickenSmall)) {
                    clearInterval(throwInterval);
                    this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
                    if (!isMuted) {
                        this.isBottleCrashSound();
                    }                    
                }
            });
        }, 20);
    }
}
