class Chicken extends MovableObject {                               // Define the Chicken class, which extends the MovableObject class
    y = 370;                                                        // Set the vertical position (y-coordinate) of the chicken
    height = 60;                                                    // Set the height of the chicken
    width = 60;                                                     // Set the width of the chicken

    IMAGES_WALKING = [                                              // Define an array of images for the walking animation of the chicken
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {                                                 // Constructor function to initialize the chicken object
        // Call the constructor of the parent class (MovableObject) and load the initial walking image
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);                       // Load all walking images from the IMAGES_WALKING array
        this.x = 200 + Math.random() * 800;                         // Set the initial horizontal position (x-coordinate) of the chicken, with a random offset
        this.speed = 0.15 + (Math.random() * 0.25);                 // Set the speed of the chicken's movement, which is a random value between 0.15 and 0.4
        this.animate();                                             // Start the animation of the chicken
    }

    animate() {                                                     // Function to animate the chicken's movement and walking images
        this.moveLeft();                                            // Make the chicken move left continuously
        setInterval(() => {                                         // Set up a repeating interval to change the chicken's walking image every 200ms
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}