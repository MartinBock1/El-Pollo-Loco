class Chicken extends MovableObject {     
    y = 350;
    height = 90;
    width = 70;

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
    }
    
}