class Coin extends MovableObject {                  // Define a new class "Coin" that extends from the MovableObject class
    height = 80;                                    // Set the height of the coin to 80
    width = 80;                                     // Set the width of the coin to 80
    speed = 0;                                      // Initialize the speed of the coin to 0 (coin doesn't move by default)
    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
    };

    constructor(imagePath) {                        // Constructor function that takes imagePath as an argument
        super().loadImage(imagePath);               // Call the parent class constructor and load the image specified by the path
        this.y = 120 + Math.random() * 50;          // Set the y-coordinate of the coin randomly between 220 and 270
        this.x = 200 + Math.random() * 2000;        // Set the x-coordinate of the coin randomly between 200 and 2200
    }
}