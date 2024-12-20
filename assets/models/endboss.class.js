class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    offset = {
        top: 150,
        bottom: 20,
        left: 40,
        right: 40,
    };


    IMAGES_ALERT = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    flagContact = false;
    flagPoint = 2000;
    health = 100;
    chickenHitSound = new Audio('./assets/audio/chicken-hit.mp3');
    winSound = new Audio('./assets/audio/win.mp3');

    constructor() {
        super().loadImage('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animate();
    }

    animate() {
        
        let alertInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);

        let walkInterval = setInterval(() => {
            if (world.character.x > this.flagPoint) {
                clearInterval(alertInterval);
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);

        let moveInterval = setInterval(() => {
            if (world.character.x > this.flagPoint) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.soundPlayed = false;
        let hurtInterval = setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!this.soundPlayed) {
                    this.isChickenHitSound();
                    this.soundPlayed = true;                    
                }
            }
        }, 50);

        this.winSoundPlayed = false;
        let deadInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(alertInterval);
                clearInterval(walkInterval);
                clearInterval(moveInterval);
                clearInterval(hurtInterval);
                this.loadImage('./assets/img/4_enemie_boss_chicken/5_dead/G26.png');
                if (!this.winSoundPlayed) {
                    this.isWinSound();
                    this.winSoundPlayed = true;
                }
            }
        }, 50);
    }
}