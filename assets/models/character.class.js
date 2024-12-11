class Character extends MovableObject {
    y = 235;
    height = 200;
    width = 80;
    speed = 5;
    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    walking_sound = new Audio('./assets/audio/running.mp3');

    constructor() {
        super().loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
                this.walking_sound.playbackRate = 2;  // Speed up the walking sound (2x speed)
            } 
            
            else if (this.world.keyboard.LEFT && this.x > -600) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
                this.walking_sound.playbackRate = 2;  // Speed up the walking sound (2x speed)
            }
            else {
                this.walking_sound.pause();
            }

            this.world.camera_x = -this.x + 100;    // Character starts x + 100px
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk animation
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }

    jump() {

    }
}