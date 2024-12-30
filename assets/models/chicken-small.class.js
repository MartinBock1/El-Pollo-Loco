class ChickenSmall extends MovableObject {
    y = 370;
    height = 50;
    width = 50;
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
    IMAGE_DEAD = './assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    moveLeftInterval;
    playAnimationInterval;

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.placeEnemies(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        this.moveLeftInterval = setInterval(() => {
            this.moveLeft();     
            intervalIds.push(this.moveLeftInterval);
        }, 1000 / 60);
        
        this.playAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            intervalIds.push(this.playAnimationInterval);
        }, 200);
    }

    die() {
        clearInterval(this.moveLeftInterval);
        clearInterval(this.playAnimationInterval);
        this.loadImage(this.IMAGE_DEAD);
        this.speed = 0;
    }
}