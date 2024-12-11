class BackgroundObject extends MovableObject {      // Define the BackgroundObject class, which extends the MovableObject class
    width = 720;                                    // Set the width of the background object
    height = 480;                                   // Set the height of the background object

    constructor(imagePath, x) {                     // Constructor function to initialize the background object with an image and position
        super().loadImage(imagePath);               // Call the constructor of the parent class (MovableObject) and load the image from the provided path
        this.x = x;                                 // Set the horizontal position (x-coordinate) of the background object
        this.y = 480 - this.height;        // Set the vertical position (y-coordinate) of the background object to be at the bottom of the canvas
    }
}