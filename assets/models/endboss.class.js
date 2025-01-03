/**
 * Class representing the end boss in the game.
 * This class handles the end boss behavior, including animations, movement, and sounds during the game.
 */
class Endboss extends MovableObject {

    /**
     * The height of the end boss.
     * @type {number}
     */
    height = 400;

    /**
     * The width of the end boss.
     * @type {number}
     */
    width = 250;

    /**
     * The x-coordinate of the end boss.
     * @type {number}
     */
    x = 2400;

    /**
     * The y-coordinate of the end boss.
     * @type {number}
     */
    y = 60;

    /**
     * The offset values for collision detection.
     * @type {Object}
     * @property {number} top - The top offset for collision detection.
     * @property {number} bottom - The bottom offset for collision detection.
     * @property {number} left - The left offset for collision detection.
     * @property {number} right - The right offset for collision detection.
     */
    offset = {
        top: 150,
        bottom: 20,
        left: 40,
        right: 40,
    };

    /**
     * The speed at which the end boss moves.
     * @type {number}
     */
    speed = 3;

    /**
     * The point at which the end boss starts animation.
     * @type {number}
     */
    flagPoint = 1800;

    /**
     * The health of the end boss.
     * @type {number}
     */
    health = 100;

    /**
     * Audio for the "chicken fried" sound effect.
     * @type {HTMLAudioElement}
     */
    chickenFriedSound = new Audio('./assets/audio/chicken-fried.mp3');

    /**
     * Audio for the "chicken hit" sound effect.
     * @type {HTMLAudioElement}
     */
    chickenHitSound = new Audio('./assets/audio/chicken-hit.mp3');

    /**
    * Audio for the win sound effect.
    * @type {HTMLAudioElement}
    */
    winSound = new Audio('./assets/audio/win.mp3');

    /**
     * Flag indicating whether the end boss has had its first contact with the player.
     * @type {boolean}
     */
    hadFirstContact = false;

    /**
     * Array of image paths for the end boss's alert animation.
     * @type {string[]}
     */
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

    /**
     * Array of image paths for the end boss's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Array of image paths for the end boss's attack animation.
     * @type {string[]}
     */
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

    /**
     * Array of image paths for the end boss's hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Array of image paths for the end boss's dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Flag indicating whether the game over screen has been triggered.
     * @type {boolean}
     */
    gameOverTriggered = false;

    /**
     * Creates an instance of the end boss, loading images and initializing animations.
     */
    constructor() {
        super().loadImage('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    /**
     * Starts the animation loops for the end boss's various states (alert, walking, attacking, hurt, dead).
     * The animation and movement logic is set up here.
     */
    animate() {
        let i = 0;

        /**
         * This interval controls the animation cycle based on certain conditions.
         */
        setStopableInterval(() => {
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

        /**
         * This interval handles the boss's movement based on a condition.
         */
        setStopableInterval(() => {
            if (this.bossMoveLeft()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.soundPlayed = false;
        /**
         * Ensures the hurt animation is played at regular intervals when the boss is hurt.
         */
        setStopableInterval(() => this.hurtAnimation(), 200);

        this.chickenFriedSoundPlayed = false;
        /**
         * Plays the dead animation and triggers game-over logic when the boss dies.
         */
        setStopableInterval(() => {
            if (this.isDead()) {
                this.deadAnimation();
            }
        }, 200);
    }

    /**
    * * Determines whether the boss should start moving left based on first contact.
    * @returns {boolean} True if the boss should move left.
    */
    bossMoveLeft() {
        return this.hadFirstContact
    }

    /**
    * Moves the boss character to the left if conditions are met.
    */
    moveLeft() {
        setTimeout(() => {
            if (this.x >= world.character.x) {
                super.moveLeft();
            }
        }, 2000);
    }

    /**
    * Plays the hurt animation if the boss is hurt and manages sound.
    */
    hurtAnimation() {
        if (this.isHurt()) {
            if (!this.soundPlayed && !isMuted) {
                this.isChickenHitSound();
                this.soundPlayed = true;
            }
            this.playAnimation(this.IMAGES_HURT);
            this.playAnimation(this.IMAGES_ATTACK);
        } else {
            this.soundPlayed = false;
        }
    }

    /**
    * Plays the dead animation and triggers the game over logic when the boss dies.
    */
    deadAnimation() {
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD);
        this.loadImage('./assets/img/4_enemie_boss_chicken/5_dead/G26.png');

        if (!this.chickenFriedSoundPlayed && !isMuted) {
            this.isChickenFriedSound();
            this.chickenFriedSoundPlayed = true;
        }
        if (!this.gameOverTriggered) {
            this.gameOverTriggered = true;
            setTimeout(() => {
                winGame();
                this.isWinSound();
            }, 4000);
        }
    }
}