class ThrowableObject extends MovableObject {

    constructor(x, y) {                                                     // Constructor for creating a new ThrowableObject with specified x and y positions.
        super().loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');  // Call the parent class constructor and load the image for the throwable object.
        this.x = x;                                                         // Set the initial horizontal position (x-coordinate) of the throwable object.
        this.y = y;                                                         // Set the initial vertical position (y-coordinate) of the throwable object.
        this.height = 60;                                                   // Set the height of the throwable object.
        this.width = 50;                                                    // Set the width of the throwable object.
        this.throw();                                                       // Call the throw method to simulate the object being thrown.
    }

    /**
     * Function that handles the object's motion when thrown.
     */
    throw() {
        this.speedY = 40;           // Set the initial vertical speed (speedY) of the throwable object.
        this.applyGravity();        // Apply gravity to the object, likely modifying the y-position to simulate falling.
        setInterval(() => {         // Use setInterval to continuously update the object's position every 25 milliseconds (40 times per second).
            this.x += 10;           // Increment the x-coordinate (horizontal position) by 10 pixels every interval, making the object move to the right.
        }, 25);                     // The interval is set to 25 milliseconds (40 frames per second), ensuring smooth movement.
    }
}