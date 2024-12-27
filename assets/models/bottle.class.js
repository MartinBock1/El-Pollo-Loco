/**
 * Represents a bottle object in the game or animation that extends the MovableObject class.
 * The bottle is created with a fixed vertical position and random horizontal position on the canvas.
 * It starts with no movement speed and has a collection status, which is tracked using a `collected` property.
 * The bottle can be collected, and its `collected` state can be checked or modified.
 * 
 * @class Bottle
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    /**
     * The vertical position (y-coordinate) of the bottle on the canvas.
     * This is a fixed value representing the initial height of the bottle.
     * @type {number}
     * @default 360
     */
    y = 365;
    /**
     * The height of the bottle.
     * This defines the height of the image representing the bottle.
     * @type {number}
     * @default 60
     */
    height = 60;
    /**
     * The width of the bottle.
     * This defines the width of the image representing the bottle.
     * @type {number}
     * @default 60
     */
    width = 60;
    /**
     * The speed of the bottle, initially set to 0, meaning the bottle does not move.
     * A value greater than 0 would allow for movement, but the bottle does not have speed by default.
     * @type {number}
     * @default 0
     */
    speed = 0;
    /**
     * The offset of the bottle for collision detection, defining how far the bottle can be detected
     * on each side (top, bottom, left, right) from its center.
     * @type {Object}
     * @property {number} top - The top offset of the bottle.
     * @property {number} bottom - The bottom offset of the bottle.
     * @property {number} left - The left offset of the bottle.
     * @property {number} right - The right offset of the bottle.
     * @default {top:10,bottom:5,left:20,right:10}
     */
    offset = {
        top: 10,
        bottom: 5,
        left: 20,
        right: 10,
    };

    IMAGES_BOTTLES = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Creates an instance of the Bottle object.
     * Initializes the bottle with an image, sets its horizontal position randomly within a specified range,
     * and assigns a fixed vertical position. The bottle is initially set as not collected.
     * 
     * @param {string} imagePath - The path to the image file used for the bottle.
     * @description The image for the bottle is loaded and the x-coordinate is assigned a random value within a range.
     * The y-coordinate is fixed at 360, and the `collected` state is set to false, meaning the bottle is not collected initially.
     */
    constructor() {
        super().loadImage('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.animate();
        this.x = -500 + Math.random() * 2000;
        this.collected = false;
    }

    animate() {
        setStopableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);            
        }, 1000 / 3);
    }
}