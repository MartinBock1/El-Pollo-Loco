class Bottle extends MovableObject{
    y = 370;                                                        
    height = 60;                                                    
    width = 60; 
    speed = 0;      

    constructor(imagePath) {                     
        super().loadImage(imagePath);
        this.x = -500 + Math.random() * 2000; 
    }
}