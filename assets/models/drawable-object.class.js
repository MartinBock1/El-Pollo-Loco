/**
 * Class representing a drawable object in the game.
 * This class provides basic methods for loading, drawing, and handling images,
 * as well as drawing frames for debugging and collision detection.
 */
class DrawableObject {
    /**
     * The x-coordinate of the object.
     * @type {number}
     */
    x = 120;

    /**
     * The y-coordinate of the object.
     * @type {number}
     */
    y = 250;

    /**
    * The height of the object.
    * @type {number}
    */
    height = 150;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 100;

    /**
     * The image associated with the object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * A cache to store loaded images by their paths.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
    * The index of the current image in the image cache (used for animation).
    * @type {number}
    */
    currentImage = 0;    

    /**
     * Loads an image from the specified path and assigns it to the object's `img` property.
     * @param {string} path - The path to the image to be loaded.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the image of the object onto the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the image on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);        
    }

    /**
     * Draws a blue frame around the object for debugging purposes.
     * This frame is drawn only if the object is an instance of Character, Chicken, ChickenSmall, Coin, or Bottle.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the frame on.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Coin || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws a red offset frame around the object for debugging purposes.
     * This frame is drawn only if the object is an instance of Character, Chicken, ChickenSmall, Coin, or Bottle.
     * The frame takes the object's offset into account.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the offset frame on.
     */
    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Coin || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

    /**
     * Loads an array of images and stores them in the image cache.
     * @param {string[]} arr - An array of image paths to be loaded.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}