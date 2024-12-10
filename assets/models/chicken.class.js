class Chicken extends MovableObject {     
    y = 370;
    height = 60;
    width = 60;
    speed = 0.5;   // Speed of the chicken's movement

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
    
}