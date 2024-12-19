class Cloud extends MovableObject {     
    y = 50;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('./assets/img/5_background/layers/4_clouds/1.png');
        this.loadImage('./assets/img/5_background/layers/4_clouds/2.png');
        this.x = -500 + Math.random() * 2500;
        this.animate();
    }    

    animate() {    
        setInterval(() => {
            this.moveLeft();
            this.updateImages();
        }, 1000 / 60);
    }  
    
    /**
     * Function update the position of the images to create a continuous effect
     */
    updateImages() {
        
        if (this.x + this.width < 0) {
            this.x = 2500; 
        }
    }
}


