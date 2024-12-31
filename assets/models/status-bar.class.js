/**
 * Class representing a status bar in the game (e.g., health, coin, bottle, endboss).
 * The status bar visually displays the player's progress in the game, such as health, collected coins, and more.
 */
class Statusbar extends DrawableObject {
    /**
     * Array of image paths representing the health status (0-100%).
     * @type {Array<string>}
     */
    IMAGES_STATUSBAR_HEALTH = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * Array of image paths representing the coin status (0-100%).
     * @type {Array<string>}
     */
    IMAGES_STATUSBAR_COIN = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    /**
     * Array of image paths representing the bottle status (0-100%).
     * @type {Array<string>}
     */
    IMAGES_STATUSBAR_BOTTLE = [
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    /**
     * Array of image paths representing the endboss status (0-100%).
     * @type {Array<string>}
     */
    IMAGES_STATUSBAR_ENDBOSS = [
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    /**
     * Creates an instance of the Statusbar class.
     * @param {string} type - The type of the status bar ('health', 'coin', 'bottle', 'endboss').
     */
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

    /**
     * Increases the percentage of the status bar by the specified amount.
     * Ensures that the percentage does not exceed 100.
     * @param {number} amount - The amount to increase the percentage by.
     */
    increasePercentage(amount) {
        this.percentage += amount;

        if (this.percentage > 100) {
            this.percentage = 100;
        }
        this.setPercentage(this.percentage);
    }

    /**
     * Sets the percentage value of the status bar and updates the visual representation.
     * The image changes based on the percentage value and the type of status bar.
     * @param {number} percentage - The percentage value to set (0-100).
     */
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

    /**
     * Resolves the image index for the health status bar based on the current percentage.
     * @returns {number} - The index of the image to be used for the health status bar.
     */
    resolveImageIndexHealth() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0; 
        }
    };

    /**
     * Resolves the image index for the reverse status bars (coin, bottle) based on the current percentage.
     * @returns {number} - The index of the image to be used for the reverse status bars.
     */
    resolveImageIndexReverse() {
        if (this.percentage < 20) {
            return 0;
        } else if (this.percentage < 40) {
            return 1;
        } else if (this.percentage < 60) {
            return 2;
        } else if (this.percentage < 80) {
            return 3;
        } else if (this.percentage < 100) {
            return 4;
        } else {
            return 5;
        }
    };
}