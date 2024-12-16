class Statusbar extends DrawableObject {   
    /**
     * Array of image paths for health statusbar at different percentage levels
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
     * Array of image paths for coin statusbar at different percentage levels
     */
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

    /**
     * Array of image paths for bottle statusbar at different percentage levels
     */
    percentageHealth = 100;                                                 // Default health percentage set to 100

    constructor(type) {                                                     // Constructor initializes the type of statusbar and loads the appropriate images
        super();                                                            // Call the parent class constructor
        this.type = type;                                                   // Store the type of the statusbar (health, coin, bottle)
        switch (type) {                                                     // Load different images based on the statusbar type
            case 'health':
                this.loadImages(this.IMAGES_STATUSBAR_HEALTH);              // Load health images
                break;
            case 'coin':
                this.loadImages(this.IMAGES_STATUSBAR_COIN);                // Load coin images
                break;
            case 'bottle':
                this.loadImages(this.IMAGES_STATUSBAR_BOTTLE);              // Load bottle images
                break;
            default:
                this.loadImages(this.IMAGES_STATUSBAR_HEALTH);              // Default to health images
                break;
        }
        
        this.setPercentageHealth(100);                                      // Set the initial health percentage to 100
    }
    
    /**
     * Function to set the percentage and update the image based on the type of statusbar
     * @param {*} percentage 
     */
    setPercentageHealth(percentage) {                                       
        this.percentage = percentage;                                       // Store the given health percentage
        // Determine the appropriate image path based on the statusbar type
        let path = this.IMAGES_STATUSBAR_HEALTH[this.resolveImageIndex()];  // Default to health
        if (this.type === 'health') {
            path = this.IMAGES_STATUSBAR_HEALTH[this.resolveImageIndex()];  // Health type
        } else if (this.type === 'coin') {
            path = this.IMAGES_STATUSBAR_COIN[this.resolveImageIndex()];    // Coin type
        } else if (this.type === 'bottle') {
            path = this.IMAGES_STATUSBAR_BOTTLE[this.resolveImageIndex()];  // Bottle type
        }
        // Set the position and size of the statusbar image
        this.x = 40;                                                        // Horizontal position
        this.width = 200;                                                   // Width of the statusbar
        this.height = 50;                                                   // Height of the statusbar
        this.img = this.imageCache[path];                                   // Set the image based on the path selected
    }

    /**
     * Function to resolve the image index based on the current percentage
     * @returns 
     */
    resolveImageIndex() {
        // Return the appropriate index based on the percentage
        if (this.percentage == 100) {
            return 5;                                                       // 100% health
        } else if (this.percentage > 80) {
            return 4;                                                       // 80%-99%
        } else if (this.percentage > 60) {
            return 3;                                                       // 60%-79%
        } else if (this.percentage > 40) {
            return 2;                                                       // 40%-59%
        } else if (this.percentage > 20) {
            return 1;                                                       // 20%-39%
        } else {
            return 0;                                                       // 0%-19%
        }
    };
}