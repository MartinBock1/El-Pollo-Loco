class Statusbar extends DrawableObject {
    IMAGES_STATUSBAR_HEALTH = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    IMAGES_STATUSBAR_COIN = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    IMAGES_STATUSBAR_BOTTLE = [
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    IMAGES_STATUSBAR_ENDBOSS = [
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    constructor(type) {
        super();
        this.type = type;
        switch (type) {
            case 'health':
                this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
                break;
            case 'coin':
                this.loadImages(this.IMAGES_STATUSBAR_COIN);
                break;
            case 'bottle':
                this.loadImages(this.IMAGES_STATUSBAR_BOTTLE);
                break;
            case 'endboss':
                this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
                break;
            default:
                this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
                break;
        }

        if (this.type === 'coin' || this.type === 'bottle') {
            this.setPercentage(0);
        } else {
            this.setPercentage(100);
        }

    }

    increasePercentage(amount) {
        this.percentage += amount;

        if (this.percentage > 100) {
            this.percentage = 100;
        }
        this.setPercentage(this.percentage);
    }

    setPercentage(percentage) {
        this.percentage = percentage;        
        let path = this.IMAGES_STATUSBAR_HEALTH[this.resolveImageIndexHealth()];
        if (this.type === 'health') {
            path = this.IMAGES_STATUSBAR_HEALTH[this.resolveImageIndexHealth()];
        } else if (this.type === 'coin') {
            path = this.IMAGES_STATUSBAR_COIN[this.resolveImageIndexReverse()];
        } else if (this.type === 'bottle') {
            path = this.IMAGES_STATUSBAR_BOTTLE[this.resolveImageIndexReverse()];
        } else if (this.type === 'endboss') {
            path = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImageIndexHealth()];
        }
        
        this.x = 40;
        this.width = 200;
        this.height = 50;
        this.img = this.imageCache[path];
    }

    resolveImageIndexHealth() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0; 
        }
    };

    resolveImageIndexReverse() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 80) {
            return 4;
        } else {
            return 5;
        }
    };
}