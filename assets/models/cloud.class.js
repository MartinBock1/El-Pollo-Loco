class Cloud extends MovableObject {
    y = 50;         // Initial vertical position of the cloud
    width = 500;    // Width of the cloud image
    height = 250;   // Height of the cloud 

    constructor() {
        super().loadImage('./assets/img/5_background/layers/4_clouds/1.png');   // Call the parent class constructor and load the image for the cloud
        this.x = Math.random() * 500;                                           // Randomize the initial horizontal position of the cloud (between -200 and 300)
        this.animate();
    }    

    animate() {        
        this.moveLeft();
    }    
}