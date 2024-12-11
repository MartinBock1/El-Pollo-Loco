class Bottle extends MovableObject {
    y = 370;                                                        
    height = 60;                                                    
    width = 60;
    // x = 120; 
    speed = 0; 

    // img = './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
    IMAGES_WALKING = [                                              // Define an array of images for the walking animation of the chicken
        // './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {                     // Constructor function to initialize the background object with an image and position
        super().loadImage('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.placeEnemies(this.IMAGES_WALKING);
        // this.animate(); 
    }
}