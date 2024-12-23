class Endboss extends MovableObject {
    height = 400;
    width = 250;
    x = 2500;
    y = 60;
    offset = {
        top: 150,
        bottom: 20,
        left: 40,
        right: 40,
    };
    speed = 3;

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
    flagPoint = 2100;
    health = 100;
    chickenHitSound = new Audio('./assets/audio/chicken-hit.mp3');
    chickenFriedSound = new Audio('./assets/audio/chicken-fried.mp3');
    hadFirstContact = false;

    constructor() {
        super().loadImage('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        let i = 0;

        setInterval(() => {
            if (i < 10) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
            i++;
            
            if (world.character.x > this.flagPoint && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 200);

        let moveInterval = setInterval(() => {
            if (this.hadFirstContact) {
                setTimeout(() => {
                    this.moveLeft();
                }, 2000);

            }
        }, 1000 / 60);

        this.soundPlayed = false;
        let hurtInterval = setInterval(() => {
            if (this.isHurt()) {
                if (!this.soundPlayed) {
                    this.isChickenHitSound();
                    this.soundPlayed = true;
                }
                this.playAnimation(this.IMAGES_HURT);
                this.playAnimation(this.IMAGES_ATTACK)
            } else {
                this.soundPlayed = false;
            }
        }, 200);

        this.chickenFriedSoundPlayed = false;
        let deadInterval = setInterval(() => {
            if (this.isDead()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(moveInterval);
                clearInterval(hurtInterval);
                this.loadImage('./assets/img/4_enemie_boss_chicken/5_dead/G26.png');

                if (!this.chickenFriedSoundPlayed) {
                    this.isChickenFriedSound();
                    this.chickenFriedSoundPlayed = true;
                }
            }
        }, 200);
    }
}