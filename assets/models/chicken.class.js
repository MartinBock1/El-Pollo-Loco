class Chicken extends MovableObject {
    y = 370;
    height = 60;
    width = 60;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    /**
     * Define an array of images for the walking animation of the chicken
     */
    IMAGES_WALKING = [                                              
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
         super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.placeEnemies(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}