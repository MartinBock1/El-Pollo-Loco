class MovableObject {                       // Define the MovableObject class, which represents an object that can move
    x = 120;                                // Set the initial horizontal position (x-coordinate) of the object
    y = 250;                                // Set the initial vertical position (y-coordinate) of the object
    img;                                    // Declare the image property for storing the object’s image
    height = 150;                           // Set the initial height of the object
    width = 100;                            // Set the initial width of the object
    imageCache = {};                        // Create an object to cache images for quicker loading
    currentImage = 0;                       // Set the initial index for the current image (used in animation)
    speed = 0.15;                           // Set the speed for the moveLeft function (controls how fast the object moves left)
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 215;
    }

    // Function to load a single image from a given path (e.g. loadImage('img/test.png');)
    loadImage(path) {                       // Create a new Image object and assign it to the img property
        this.img = new Image();             // it means: 'this.img = document.getElementById('image') <img> id="image" src="./img/test.png">'
        this.img.src = path;                // Set the source of the image to the provided path
    }

    /** Function to load multiple images and store them in an image cache.     * 
     * @param {Array} arr - ['./img/image1.png', './img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {             // Iterate over each image path in the provided array
            let img = new Image();          // Create a new Image object for each path
            img.src = path;                 // Set the source of the image to the current path
            this.imageCache[path] = img;    // Store the loaded image in the imageCache object, using the path as the key
        });
    }

    placeEnemies(imagesArray) {
        this.loadImages(imagesArray);                   // Load all walking images from the IMAGES_WALKING array
        this.x = 200 + Math.random() * 2000;            // Set the initial horizontal position (x-coordinate) of the chicken, with a random offset
        this.speed = 0.15 + (Math.random() * 0.4);      // Set the speed of the chicken's movement, which is a random value between 0.15 and 0.55
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;       
    }

    moveLeft() {                            // Function to move the object to the left by reducing the x-coordinate
        this.x -= this.speed;               // Decrease the x-coordinate by the object's speed to move it left
    }

    jump() {
        this.walking_sound.pause();
        this.speedY = 30;
    }
}