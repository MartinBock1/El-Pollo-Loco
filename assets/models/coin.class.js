class Coin extends MovableObject {
    height = 80;
    width = 80;
    speed = 0;
    offset = {
        top: 25,
        bottom: 25,
        left: 25,
        right: 25,
    };
    IMAGES_COIN = [
        './assets/img/8_coin/coin_1.png',
        './assets/img/8_coin/coin_2.png'
    ];

    constructor() {        
        super().loadImage('./assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.animate();
        this.x = -500 + Math.random() * 2000;
        this.y = 120 + Math.random() * 50;

    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000 / 5);
    }
}