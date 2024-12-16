class Character extends MovableObject {                         // Define a new class called "Character" that extends the MovableObject class.
    y = 235;                                                    // Set the initial y-coordinate (vertical position) of the character to 235.
    height = 200;                                               // Set the height of the character to 200 pixels.
    width = 80;                                                 // Set the width of the character to 80 pixels.
    speed = 5;                                                  // Set the initial speed of the character to 5 (this controls the movement speed).

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
    /** 
     * Define an array containing the paths to the images for the walking animation.
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
     * Define an array containing the paths to the images for the jumping animation.
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
    world;                                                      // Declare a variable "world" (this is likely the game world or level).
    walkingSound = new Audio('./assets/audio/running.mp3');    // Create a new audio object for the walking sound.
    jumpingSound = new Audio('./assets/audio/jump.mp3');       // Create a new audio object for the walking sound.
    idleCount = 0;

    // The constructor method, which is called when an instance of the Character is created.
    constructor() {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png'); // Call the parent class's loadImage method to load the initial image.
        this.loadImages(this.IMAGES_IDLE);                                      // Load all Idle images into the character.
        this.loadImages(this.IMAGES_LONG_IDLE);                                 // Load all Idle images into the character.
        this.loadImages(this.IMAGES_WALKING);                                   // Load all walking images into the character.
        this.loadImages(this.IMAGES_JUMPING);                                   // Load all jumping images into the character.
        this.loadImages(this.IMAGES_HURT);                                      // Load all hurt images into the character.
        this.loadImages(this.IMAGES_DEAD);                                      // Load all dead images into the character.
        this.applyGravity();                                                    // Apply gravity to the character (likely modifies the character's y-position).
        this.animate();                                                         // Start the animation logic for the character.
    }

    /** 
     * Define the animate method, which controls the character's animations and movement.
     */
    animate() {
        setInterval(() => {
            if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                if (this.idleCount < 100) {
                    this.playAnimation(this.IMAGES_IDLE);
                    this.idleCount++;
                } else {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                }
            }
        }, 1000 / 8);

        setInterval(() => {                                                             // Set an interval to check movement every 1/60th of a second (60 FPS).
            if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {              // If no movement keys are pressed.
                this.walkingSound.pause();                                             // Pause the walking sound (no movement).
            }

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {   // If RIGHT arrow key is pressed & the character is within level bounds.
                this.moveRight();                                                       // Move the character to the right.
                this.otherDirection = false;                                            // Set the flag indicating the character is moving right.
                this.isWalkingSound();
            }

            if (this.world.keyboard.LEFT && this.x > -600) {                            // If the LEFT arrow key is pressed & the character is not off-screen.
                this.moveLeft();                                                        // Move the character to the left.
                this.otherDirection = true;                                             // Set the flag indicating the character is moving left.
                this.isWalkingSound();
            }

            if ((this.world.keyboard.UP || this.world.keyboard.SPACE)                   // If the UP arrow key or SPACE bar is pressed 
                && !this.isAboveGround()) {                                             // & the character is not already in the air.
                this.jump();                                                            // Make the character jump.                
                this.idleCount = 0;
            }

            // Update the camera position to follow the character horizontally (camera stays 100px ahead of the character).
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {                                                             // Set an interval to handle the animation frame updates.  
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {                                          // If the character is above the ground (jumping).               
                this.playAnimation(this.IMAGES_JUMPING);
            } else {                                                                    // If the character is not jumping (on the ground).
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {            // If the character is moving left or right.
                    this.playAnimation(this.IMAGES_WALKING);                            // Play the walking animation.
                    this.idleCount = 0;
                }
            }
        }, 50);                                                                         // Run this check every 50 milliseconds (for smoother animation).
    }
}