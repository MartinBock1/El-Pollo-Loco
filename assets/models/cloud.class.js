class Cloud extends MovableObject {
    y = 50;         // Initial vertical position of the cloud
    width = 500;    // Width of the cloud image
    height = 250;   // Height of the cloud     

    constructor() {
        super().loadImage('./assets/img/5_background/layers/4_clouds/1.png');   // Call the parent class constructor and load the image for the cloud
        this.x = Math.random() * 500;                                           // Randomize the initial horizontal position of the cloud (between -200 and 300)
        // setInterval(this.animate.bind(this), 1000 / 60);                     // Set an interval to call the moveCloud method 60 times per second (60 FPS)
        this.animate();
    }

    // animate() {
    // this.x -= this.speed;   // Move the cloud to the left by decreasing the x position by the speed

    //     // If the cloud moves off the left side of the screen, reset its position to the right
    //     if (this.x + this.width < 0) {
    //     this.x = 800;       // Set the cloud position back to the right side (off-screen)
    //     }
    // }

    animate() {        
        this.moveLeft();
    }

    
}