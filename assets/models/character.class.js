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
     * Flag indicating whether the game over screen has been triggered.
     * @type {boolean}
     */
    gameOverTriggered = false;

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
    * Handles all the character's animations including idle, movement, jumping, hurt, and death.
    * Intervals are set for each type of animation.
    */
    animate() {
        /**
        * Interval for handling idle and long idle animation.
        * When no movement keys are pressed, the character alternates between idle and long idle.
         */
        setStopableInterval(() => this.idleCharacter(), 1000 / 8);

        /**
        * Interval for handling the movement and walking animations.
        * If the character is moving (pressing LEFT or RIGHT), the walking animation plays.
        * The jumping action is handled separately.
        */
        setStopableInterval(() => {
            this.walkCharacter();
            this.jumpCharacter();

            if (this.x <= world.level.level_start_x) {
                this.x = world.level.level_start_x;
            }
        }, 1000 / 60);

        this.soundPlayed = false;

        /**
        * Interval for handling the character's death and hurt animations.
        * If the character is dead, the death animation plays, and the game over screen is triggered.
        * If the character is hurt, the hurt animation plays.
        */
        setStopableInterval(() => {
            this.playCharacter();
        }, 50);

        /**
        * Interval for handling the jumping animation.
        * If the character is above ground (i.e., jumping), the jump animation plays.
        */
        setStopableInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 1000 / 9);
    }

    /**
    * Handles the idle animation of the character.
    * The character alternates between idle and long idle based on the idle count.
    * Plays snoring sound after long idle if not muted.
    */
    idleCharacter() {
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
    }

    /**
    * Handles the walking animation and movement.
    * Pauses the walking sound if no movement keys are pressed.
    * Updates the camera position based on the character's position.
    */
    walkCharacter() {
        if (!this.isDead()) {
            if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                this.walkingSound.pause();
            }

            if (this.canMoveRight()) {
                this.moveRight();
            }

            if (this.canMoveLeft()) {
                this.moveLeft();
            }

            this.world.camera_x = -this.x + 100;
        }
    }

    /**
    * Checks if the character can move to the right.
    * @returns {boolean} True if the character can move right, false otherwise.
    */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
    * Moves the character to the right and plays walking sound if not muted.
    */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!isMuted) {
            this.isWalkingSound();
        }
    }

    /**
    * Checks if the character can move to the left.
    * @returns {boolean} True if the character can move left, false otherwise.
    */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > world.level.level_start_x;
    }

    /**
    * Moves the character to the left and plays walking sound if not muted.
    */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!isMuted) {
            this.isWalkingSound();
        }
    }

    /**
    * Handles the jumping action and animation.
    * Pauses walking sound while the character is jumping.
    * Updates the camera position based on the character's position.
    */
    jumpCharacter() {
        if (!this.isDead()) {
            if (this.canJump()) {
                this.jump();
            }

            if (this.world.keyboard.LEFT && this.world.keyboard.SPACE ||
                this.world.keyboard.RIGHT && this.world.keyboard.SPACE
            ) {
                this.walkingSound.pause();
            }

            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump, false otherwise.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
    * Makes the character jump and resets the idle count and current animation frame.
    */
    jump() {
        super.jump();
        this.idleCount = 0;
        this.currentImage = 0;
    }

    /**
    * Handles the character's animations based on the character's state (dead, hurt, or walking).
    * Calls the respective animation based on whether the character is dead, hurt, or walking.
    */
    playCharacter() {
        if (this.isDead()) {
            this.deadAnimation();
        } else if (this.isHurt()) {
            this.hurtAnimation();
        } else {
            if (!this.isAboveGround()) {
                this.walkAnimation();
            }
        }
    }

    /**
    * Handles the death animation.
    * Plays the death sound and triggers the game over screen if not already triggered.
    */
    deadAnimation() {
        if (!this.soundPlayed && !isMuted) {
            this.isPepeDeathSound();
            this.soundPlayed = true;
        }
        this.playAnimation(this.IMAGES_DEAD);
        this.loadImage('./assets/img/2_character_pepe/5_dead/D-57.png');
        if (!this.gameOverTriggered) {
            this.gameOverTriggered = true;
            setTimeout(() => {
                showGameOver();
                if (!isMuted) {
                    this.isLooseSound();
                }
            }, 500);
        }
    }

    /**
    * Handles the hurt animation.
    * Plays the hurt sound if not muted.
    */
    hurtAnimation() {
        if (!isMuted) {
            this.isPepeHurtSound();
        }
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
    * Plays the walking animation when the character is moving.
    * Resets the idle count when walking starts.
    */
    walkAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idleCount = 0;
        }
    }
}
