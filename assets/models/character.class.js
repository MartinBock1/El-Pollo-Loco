class Character extends MovableObject {                         // Define a new class called "Character" that extends the MovableObject class.
    y = 235;                                                    // Set the initial y-coordinate (vertical position) of the character to 235.
    height = 200;                                               // Set the height of the character to 200 pixels.
    width = 80;                                                 // Set the width of the character to 80 pixels.
    speed = 5;                                                  // Set the initial speed of the character to 5 (this controls the movement speed).

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
    world;                                                      // Declare a variable "world" (this is likely the game world or level).
    walking_sound = new Audio('./assets/audio/running.mp3');    // Create a new audio object for the walking sound.

    // The constructor method, which is called when an instance of the Character is created.
    constructor() {       
        super().loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');     // Call the parent class's loadImage method to load the initial image.
        this.loadImages(this.IMAGES_WALKING);                                   // Load all walking images into the character.
        this.loadImages(this.IMAGES_JUMPING);                                   // Load all jumping images into the character.
        this.applyGravity();                                                    // Apply gravity to the character (likely modifies the character's y-position).
        this.animate();                                                         // Start the animation logic for the character.
    }

    /** 
     * Define the animate method, which controls the character's animations and movement.
     */
    animate() {
        setInterval(() => {                                                             // Set an interval to check movement every 1/60th of a second (60 FPS).
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {   // If RIGHT arrow key is pressed & the character is within level bounds.
                this.moveRight();                                                       // Move the character to the right.
                this.otherDirection = false;                                            // Set the flag indicating the character is moving right.
                this.walking_sound.play();                                              // Play the walking sound.
                this.walking_sound.playbackRate = 2;                                    // Set the playback speed of the walking sound to 2x (faster).
            } else if (this.world.keyboard.LEFT && this.x > -600) {                     // If the LEFT arrow key is pressed & the character is not off-screen.
                this.moveLeft();                                                        // Move the character to the left.
                this.otherDirection = true;                                             // Set the flag indicating the character is moving left.
                this.walking_sound.play();                                              // Play the walking sound.
                this.walking_sound.playbackRate = 2;                                    // Set the playback speed of the walking sound to 2x (faster).
            } else {                                                                    // If no movement keys are pressed.
                this.walking_sound.pause();                                             // Pause the walking sound (no movement).
            }

            if ((this.world.keyboard.UP || this.world.keyboard.SPACE)                   // If the UP arrow key or SPACE bar is pressed 
                && !this.isAboveGround()) {                                             // & the character is not already in the air.
                this.jump();                                                            // Make the character jump.
            }

            // Update the camera position to follow the character horizontally (camera stays 100px ahead of the character).
            this.world.camera_x = -this.x + 100;    
        }, 1000 / 60);

        setInterval(() => {                                                             // Set an interval to handle the animation frame updates.  
            if (this.isAboveGround()) {                                                 // If the character is above the ground (jumping).
                this.playAnimation(this.IMAGES_JUMPING);                                // Play the jumping animation.
            } else {                                                                    // If the character is not jumping (on the ground).
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {            // If the character is moving left or right.
                    this.playAnimation(this.IMAGES_WALKING);                            // Play the walking animation.
                }
            }
        }, 50);                                                                         // Run this check every 50 milliseconds (for smoother animation).
    }
}