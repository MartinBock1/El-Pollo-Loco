class ChickenSmall extends MovableObject {
    y = 370;
    height = 60;
    width = 60;
    offset = {
        top: 10,
        bottom: 0,
        left: 15,
        right: 15,
    };
    /**
     * Define an array of images for the walking animation of the chicken
     */
    IMAGES_WALKING = [                                              
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.placeEnemies(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        let moveLeftInterval = setInterval(() => {
            this.moveLeft();
            intervalIds.push(moveLeftInterval);         
        }, 1000 / 60);
        
        let playAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            intervalIds.push(playAnimationInterval);
        }, 200);
    }
}