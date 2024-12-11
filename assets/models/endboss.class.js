class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60; 
    IMAGES_WALKING = [                                              // Define an array of images for the walking animation of the chicken
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {                                                 // Constructor function to initialize the chicken object
        super().loadImage(this.IMAGES_WALKING[0]);   
        this.loadImages(this.IMAGES_WALKING);  
        this.x = 2500;    
        this.animate();                      
    }

    animate() {                                        // Make the chicken move left continuously
        setInterval(() => {                                         // Set up a repeating interval to change the chicken's walking image every 200ms
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}