/**
 * Represents a bottle object in the game or animation that extends the MovableObject class.
 * The bottle has a fixed size and is initially placed at a random horizontal position on the canvas.
 * It starts at a fixed vertical position and has no movement speed by default.
 * The bottle can be collected, which is tracked with a `collected` property.
 * 
 * @class Bottle
 * @extends MovableObject
 */
class Bottle extends MovableObject {                    
    /**
     * The vertical position (y-coordinate) of the bottle.
     * @type {number}
     * @default 370
     */
    y = 370;                                            
    /**
     * The height of the bottle.
     * @type {number}
     * @default 60
     */                                        
    height = 60;                                        
    /**
     * The width of the bottle.
     * @type {number}
     * @default 60
     */                                              
    width = 60;                                        
    /**
     * The speed of the bottle (initially 0, meaning the bottle does not move).
     * @type {number}
     * @default 0
     */
    speed = 0;  
    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
    };                                       

    /**
     * Creates an instance of the Bottle object.
     * Initializes the bottle with an image and sets a random horizontal position on the canvas.
     * The bottle starts at the fixed y-coordinate and is initially not collected.
     * 
     * @param {string} imagePath - The path to the image file used for the bottle.
     */
    constructor(imagePath) {                                           
        super().loadImage(imagePath);                   
        this.x = -500 + Math.random() * 2000;           
        this.collected = false;                         
    }
}