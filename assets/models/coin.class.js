class Coin extends MovableObject {
    height = 80;
    width = 80;
    speed = 0; 

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.y = 220 + Math.random() * 50;
        this.x = -500 + Math.random() * 2000;
        // this.x = 200;
    }
}