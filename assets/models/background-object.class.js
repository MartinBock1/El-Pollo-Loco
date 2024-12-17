/**
 * Class representing a background object that extends the MovableObject class.
 * The background object is positioned at the bottom of the canvas and is loaded with a specified image.
 * 
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     * @default 720
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     * @default 480
     */
    height = 480;

    /**
     * Creates an instance of the BackgroundObject.
     * Initializes the background object with a specified image and position on the canvas.
     * 
     * @param {string} imagePath - The path to the image to be used as the background.
     * @param {number} x - The x-coordinate (horizontal position) of the background object on the canvas.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);  
        this.x = x;                    
        this.y = 480 - this.height;    
    }
}
