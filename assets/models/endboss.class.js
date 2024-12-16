class Endboss extends MovableObject {                     // Define a new class called "Endboss" that extends the MovableObject class.
    height = 400;                                         // Set the height of the endboss to 400 pixels.
    width = 250;                                          // Set the width of the endboss to 250 pixels.
    y = 60;       

    /**
     * Define an array of images for the walking animation of the chicken
     */
    IMAGES_WALKING = [                                              
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {                                                 
        super().loadImage(this.IMAGES_WALKING[0]);      // Call the parent class constructor and load the first walking image as the initial image.
        this.loadImages(this.IMAGES_WALKING);           // Load all images in the IMAGES_WALKING array for the walking animation.  
        this.x = 2500;                                  // Set the initial horizontal position (x-coordinate) of the endboss to 2500 pixels (start position).  
        this.animate();                                 // Call the animate method to start the animation.                   
    }

    /**
     * Function animate for continuous updates
     */
    animate() {                                                                         
        setInterval(() => {                             // Set an interval to execute the animation logic every 200 illiseconds.                      
            this.playAnimation(this.IMAGES_WALKING);    // Call playAnimation method to play the walking animation using the images in IMAGES_WALKING.
        }, 200);                                        // The animation frame updates every 200 milliseconds (5 frames per second).
    }
}