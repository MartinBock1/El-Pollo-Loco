/**
 * Class representing a cloud object that moves horizontally across the screen.
 * Inherits from the MovableObject class.
 */
class Cloud extends MovableObject {  
    
    /**
    * y position of the cloud.
    * @type {number}
    */
    y = 50;

    /**
     * Width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * Height of the cloud.
     * @type {number}
     */
    height = 250;
    
    /**
     * Creates a new Cloud object with a given image, initial position (x, y), and starts its animation.
     * @param {string} imagePath - Path to the image for the cloud.
     * @param {number} x - The initial x position of the cloud.
     * @param {number} y - The initial y position of the cloud.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y - this.height;
        this.animate();
    } 

    /**
     * Starts the animation of the cloud, making it move left and continuously update its position.
     * @private
     */
    animate() {    
        setStopableInterval(() => {
            this.moveLeft();
            this.updateImages();
        }, 1000 / 60);
    }  
    
    /**
    * Updates the cloud's position to create a continuous scrolling effect by resetting the cloud's x position.
    * This ensures the cloud loops across the screen when it moves off the left side.
    */
    updateImages() {        
        if (this.x < -800) {
            this.x = 2700; 
        }
    }
}