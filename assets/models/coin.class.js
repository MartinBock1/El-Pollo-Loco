/**
 * Class representing a coin object in the game.
 * The coin can be collected by the player and has an animation effect.
 * Inherits from the MovableObject class.
 */
class Coin extends MovableObject {

    /**
     * Height of the coin.
     * @type {number}
     */
    height = 80;

    /**
     * Width of the coin.
     * @type {number}
     */
    width = 80;

    /**
     * Speed of the coin (does not move in this case).
     * @type {number}
     */
    speed = 0;

    /**
     * Offset values for the coin's collision detection.
     * @type {Object}
     */
    offset = {
        top: 25,
        bottom: 25,
        left: 25,
        right: 25,
    };

    /**
    * Array of image paths for the coin's animation.
    * @type {string[]}
    */
    IMAGES_COIN = [
        './assets/img/8_coin/coin_1.png',
        './assets/img/8_coin/coin_2.png'
    ];

    /**
     * Creates a new Coin object with a random position and starts its animation.
     */
    constructor() {        
        super().loadImage('./assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.animate();
        this.x = -500 + Math.random() * 2000;
        this.y = 120 + Math.random() * 50;

    }

    /**
     * Starts the coin animation, alternating between the images in the IMAGES_COIN array.
     * The animation runs at a rate of 5 frames per second.
     * @private
     */
    animate() {
        setStopableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000 / 5);
    }
}