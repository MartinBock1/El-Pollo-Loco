class Chicken extends MovableObject {                               // Define the Chicken class, which extends the MovableObject class
    y = 370;                                                        // Set the vertical position (y-coordinate) of the chicken
    height = 60;                                                    // Set the height of the chicken
    width = 60;                                                     // Set the width of the chicken

    /**
     * Define an array of images for the walking animation of the chicken
     */
    IMAGES_WALKING = [                                              
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {                                                 // Constructor function to initialize the chicken object
        // Call the constructor of the parent class (MovableObject) and load the initial walking image
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.placeEnemies(this.IMAGES_WALKING);
        this.animate();                                             // Start the animation of the chicken
    }

    animate() {                                                     // Function to animate the chicken's movement and walking images
        setInterval(() => {                                         // Use setInterval to continuously update the object's position at 60 FPS (1000ms/60)
            this.moveLeft();                                            // Make the chicken move left continuously
        }, 1000 / 60);                                              // Update every 1/60th of a second (60 frames per second)

        setInterval(() => {                                         // Set up a repeating interval to change the chicken's walking image every 200ms
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}