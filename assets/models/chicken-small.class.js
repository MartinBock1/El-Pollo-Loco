/**
 * Class representing a small chicken enemy that can move and play walking animations.
 * Inherits from the MovableObject class.
 */
class ChickenSmall extends MovableObject {

    /**
     * y position of the chicken.
     * @type {number}
     */
    y = 370;

    /**
     * Height of the chicken.
     * @type {number}
     */
    height = 50;

    /**
     * Width of the chicken.
     * @type {number}
     */
    width = 50;

    /**
     * Offset values for collision detection (top, bottom, left, right).
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offset = {
        top: 10,
        bottom: 0,
        left: 15,
        right: 15,
    };

    /**
     * Array of image paths for the walking animation of the chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [                                              
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Image path for the dead state of the chicken.
     * @type {string}
     */
    IMAGE_DEAD = './assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    /**
     * Interval ID for moving the chicken to the left.
     * @type {number}
     */
    moveLeftInterval;

    /**
    * Interval ID for playing the walking animation.
    * @type {number}
    */
    playAnimationInterval;

    /**
     * Creates a new ChickenSmall object and initializes its image, movement, and animations.
     */
    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.placeEnemies(this.IMAGES_WALKING);
        this.animate();
    }

    /**
     * Starts the animation and movement of the chicken.
     * The chicken moves left and plays the walking animation at regular intervals.
     * @private
     */
    animate() {
        this.moveLeftInterval = setInterval(() => {
            this.moveLeft();     
            intervalIds.push(this.moveLeftInterval);
        }, 1000 / 60);
        
        this.playAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            intervalIds.push(this.playAnimationInterval);
        }, 200);
    }

    /**
    * Stops the chicken's movement and animation, and sets the chicken to the dead state.
    */
    die() {
        clearInterval(this.moveLeftInterval);
        clearInterval(this.playAnimationInterval);
        this.loadImage(this.IMAGE_DEAD);
        this.speed = 0;
    }
}