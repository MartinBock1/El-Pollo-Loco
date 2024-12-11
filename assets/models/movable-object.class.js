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

    moveRight() {                           
        console.log('Moving right');
    }

    moveLeft() {                            // Function to move the object to the left by reducing the x-coordinate
        setInterval(() => {                 // Use setInterval to continuously update the object's position at 60 FPS (1000ms/60)
            this.x -= this.speed;           // Decrease the x-coordinate by the object's speed to move it left
        }, 1000 / 60);                      // Update every 1/60th of a second (60 frames per second)
    }
}