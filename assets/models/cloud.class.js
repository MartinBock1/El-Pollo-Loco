class Cloud extends MovableObject {     
    y = 50;
    width = 500;
    height = 250;
    
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y - this.height;
        this.animate();
    } 

    animate() {    
        setStopableInterval(() => {
            this.moveLeft();
            this.updateImages();
        }, 1000 / 60);
    }  
    
    /**
     * Function update the position of the images to create a continuous effect
     */
    updateImages() {        
        if (this.x < -800) {
            this.x = 2700; 
        }
    }
}


