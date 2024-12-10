class Chicken extends MovableObject {     
    y = 370;
    height = 60;
    width = 60;
    
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + (Math.random() * 0.25);   // Speed of the chicken's movement
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
        
    }
    
}