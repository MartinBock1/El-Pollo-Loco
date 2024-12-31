/**
 * Represents a character in the game that extends MovableObject.
 * The character can idle, walk, jump, get hurt, and die.
 */
class Character extends MovableObject {
    /**
     * y position of the character.
     * @type {number}
     */
    y = 235;

    /**
     * Height of the character.
     * @type {number}
     */
    height = 200;

    /**
     * Width of the character.
     * @type {number}
     */
    width = 80;

    /**
     * Speed of the character.
     * @type {number}
     */
    speed = 5;

    /**
     * Offset values for collision detection (top, bottom, left, right).
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offset = {
        top: 100,
        bottom: 10,
        left: 10,
        right: 20,
    };

    /**
     * Array of image paths for the idle state of the character.
     * @type {string[]}
     */
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

    /**
     * Array of image paths for the long idle state of the character.
     * @type {string[]}
     */
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

    /**
     * Array of image paths for the walking state of the character.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png',
    ];

    /**
     * Array of image paths for the jumping state of the character.
     * @type {string[]}
     */
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

    /**
     * Array of image paths for the hurt state of the character.
     * @type {string[]}
     */
    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png',
    ];

    /**
     * Array of image paths for the dead state of the character.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Reference to the world object that controls the game environment.
     * @type {Object}
     */
    world;

    /**
     * Sound effect played when the character jumps.
     * @type {Audio}
     */
    jumpingSound = new Audio('./assets/audio/jump.mp3');

    /**
     * Sound effect played when the character loses the game.
     * @type {Audio}
     */
    looseSound = new Audio('./assets/audio/loose.mp3');

    /**
     * Sound effect played when the character dies.
     * @type {Audio}
     */
    pepeDeathSound = new Audio('./assets/audio/pepe-death.mp3');

    /**
     * Sound effect played when the character gets hurt.
     * @type {Audio}
     */
    pepeHurtSound = new Audio('./assets/audio/pepe-hurt.mp3');

    /**
     * Sound effect played when the character is idle and snoring.
     * @type {Audio}
     */
    snoringSound = new Audio('./assets/audio/snoring.mp3');

    /**
     * Sound effect played when the character is walking.
     * @type {Audio}
     */
    walkingSound = new Audio('./assets/audio/running.mp3');

    /**
     * Counter for the idle animation cycle.
     * @type {number}
     */
    idleCount = 0;

    /**
     * Creates a new character object and initializes the images and sounds.
     */
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

    /**
     * Starts the animation loop for the character's actions.
     * Responsible for idle, walking, jumping, hurt, and dead animations.
     */
    animate() {
        setStopableInterval(() => {
            if (!this.isDead() && !this.gameOver && !this.gameWon) {
                if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                    if (this.idleCount < 100) {
                        this.playAnimation(this.IMAGES_IDLE);
                        this.idleCount++;
                    } else {
                        this.playAnimation(this.IMAGES_LONG_IDLE);
                        if (!isMuted) {
                            this.isSnoringSound();
                        }
                    }
                }
            }
        }, 1000 / 8);

        setStopableInterval(() => {
            if (!this.isDead()) {
                if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                    this.walkingSound.pause();
                }

                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    if (!isMuted) {
                        this.isWalkingSound();
                    }
                }

                if (this.world.keyboard.LEFT && this.x > -600) {
                    this.moveLeft();
                    this.otherDirection = true;
                    if (!isMuted) {
                        this.isWalkingSound();
                    }
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
                if (!this.soundPlayed && !isMuted) {
                    this.isPepeDeathSound();
                    this.soundPlayed = true;
                }
                this.playAnimation(this.IMAGES_DEAD);
                this.loadImage('./assets/img/2_character_pepe/5_dead/D-57.png');
                setTimeout(() => {
                    showGameOver();
                    this.isLooseSound();
                }, 500);
            } else if (this.isHurt()) {
                if (!isMuted) {
                    this.isPepeHurtSound();
                }
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
}
