class Character extends MovableObject {
    y = 235;
    height = 200;
    width = 80;
    speed = 5;
    offset = {
        top: 100,
        bottom: 10,
        left: 10,
        right: 20,
    };

    IMAGES_IDLE = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png',
    ];
    world;
    snoringSound = new Audio('./assets/audio/snoring.mp3');
    walkingSound = new Audio('./assets/audio/running.mp3');
    jumpingSound = new Audio('./assets/audio/jump.mp3');
    pepeHurtSound = new Audio('./assets/audio/pepe-hurt.mp3');
    pepeDeathSound = new Audio('./assets/audio/pepe-death.mp3');
    idleCount = 0;
    gameOver = false;
    gameWon = false;

    constructor() {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setStopableInterval(() => {
            if (!this.isDead() && !this.gameOver && !this.gameWon) {
                if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                    if (this.idleCount < 100) {
                        this.playAnimation(this.IMAGES_IDLE);
                        this.idleCount++;
                    } else {
                        this.playAnimation(this.IMAGES_LONG_IDLE);
                        this.isSnoringSound();
                    }
                }
            }
        }, 1000 / 8);
        // console.log('ID vom Interval ist ', interval1);

        setStopableInterval(() => {
            if (!this.isDead()) {
                if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                    this.walkingSound.pause();
                }

                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    this.isWalkingSound();
                }

                if (this.world.keyboard.LEFT && this.x > -600) {
                    this.moveLeft();
                    this.otherDirection = true;
                    this.isWalkingSound();
                }

                if ((this.world.keyboard.UP || this.world.keyboard.SPACE)
                    && !this.isAboveGround()) {
                    this.jump();
                    this.idleCount = 0;
                }

                if (this.world.keyboard.LEFT && this.world.keyboard.SPACE ||
                    this.world.keyboard.RIGHT && this.world.keyboard.SPACE ||
                    this.world.keyboard.LEFT && this.world.keyboard.UP ||
                    this.world.keyboard.RIGHT && this.world.keyboard.UP
                ) {
                    this.walkingSound.pause();
                }

                this.world.camera_x = -this.x + 100;
            }            
        }, 1000 / 60);

        this.soundPlayed = false;
        setStopableInterval(() => {
            if (this.isDead()) {
                if (!this.soundPlayed) {
                    this.isPepeDeathSound();
                    this.soundPlayed = true;
                }
                this.playAnimation(this.IMAGES_DEAD);
                this.loadImage('./assets/img/2_character_pepe/5_dead/D-57.png');
                setTimeout(() => {
                    if (this.isDead()) {
                        showGameOver();
                    } else if (this.gameWon) {
                        winGame();
                    }
                }, 500);
            } else if (this.isHurt()) {
                this.isPepeHurtSound();
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.idleCount = 0;
                }
            }
        }, 50);
    }

    stopAllSounds() {
        this.snoringSound.pause();
        this.walkingSound.pause();
        this.jumpingSound.pause();
        this.pepeHurtSound.pause();
        this.pepeDeathSound.pause();
        // Reset sounds to start position if needed
        this.snoringSound.currentTime = 0;
        this.walkingSound.currentTime = 0;
        this.jumpingSound.currentTime = 0;
        this.pepeHurtSound.currentTime = 0;
        this.pepeDeathSound.currentTime = 0;
    }
}
