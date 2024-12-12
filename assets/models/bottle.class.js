class Bottle extends MovableObject {                    // Define a new class "Bottle" that extends from the MovableObject class
    y = 370;                                            // Set the y-coordinate of the bottle to 370                                          
    height = 60;                                        // Set the height of the bottle to 60                                                  
    width = 60;                                         // Set the width of the bottle to 60
    speed = 0;                                          // Initialize the speed of the bottle to 0 (bottle doesn't move by default)

    constructor(imagePath) {                            // Constructor function that takes imagePath as an argument                  
        super().loadImage(imagePath);                   // Call the parent class constructor and load the image specified by the path
        this.x = -500 + Math.random() * 2000;           // Set the x-coordinate of the bottle randomly between -500 and 1500
    }
}