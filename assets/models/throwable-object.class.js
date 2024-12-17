/**
 * Represents a throwable object in the game that extends the MovableObject class.
 * This class simulates the behavior of an object being thrown, including its initial position, size, and motion.
 * The object is thrown with an initial speed and affected by gravity, moving horizontally over time.
 * 
 * @class ThrowableObject
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
         * Creates an instance of a ThrowableObject with the specified position.
         * Initializes the object's image, size, position, and starts its motion.
         * The object will move horizontally and be affected by gravity when thrown.
         * 
         * @param {number} x - The initial horizontal position (x-coordinate) of the throwable object.
         * @param {number} y - The initial vertical position (y-coordinate) of the throwable object.
         */
    constructor(x, y) {
        super().loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * Handles the motion of the object when thrown.
     * The object starts with an initial vertical speed and is affected by gravity.
     * The horizontal movement is updated periodically.
     * 
     * @method throw
     */
    throw() {
        this.speedY = 40;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}