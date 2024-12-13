class Cloud extends MovableObject {
    y = 50;                             // Initial vertical position of the cloud
    width = 500;                        // Width of the cloud image
    height = 250;                       // Height of the cloud 

    constructor() {
        super().loadImage('./assets/img/5_background/layers/4_clouds/1.png');  // Call the parent class constructor and load the image for the cloud
        this.loadImage('./assets/img/5_background/layers/4_clouds/2.png');     // Call the parent class constructor and load the image for the cloud
        this.x = -500 + Math.random() * 2000;                                  // Randomize the initial horizontal position of the cloud (between -500 and 2000)
        this.animate();
    }    

    animate() {    
        setInterval(() => {             // Use setInterval to continuously update the object's position at 60 FPS (1000ms/60)
            this.moveLeft();            // Make the chicken move left continuously
            this.updateImages()
        }, 1000 / 60);                  // Update every 1/60th of a second (60 frames per second)
    }  
    
    /**
     * Function update the position of the images to create a continuous effect
     */
    updateImages() {
        
        if (this.x + this.width < 0) {  // If the first image is fully out of view, move it to the right
            this.x = 2000;              // Reset to the right side
        }
    }
}


