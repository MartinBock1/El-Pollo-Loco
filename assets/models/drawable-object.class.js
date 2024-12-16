class DrawableObject {
    x = 120;                                                    // Set the initial horizontal position (x-coordinate) of the object
    y = 250;                                                    // Set the initial vertical position (y-coordinate) of the object
    height = 150;                                               // Set the initial height of the object
    width = 100;                                                // Set the initial width of the object
    img;                                                        // Declare the image property for storing the object’s image
    imageCache = {};                                            // Create an object to cache images for quicker loading
    currentImage = 0;                                           // Set the initial index for the current image (used in animation)

    /**
     *  Function to load a single image from a given path (e.g. loadImage('img/test.png');)
     * */
    loadImage(path) {
        this.img = new Image();                                 // Create a new Image object and assign it to the img property of the object
        this.img.src = path;                                    // Set the source of the image to the provided path (this loads the image)
    }

    /**
    * Function to draw the object on the canvas
    * @param {*} ctx 
    */
    draw(ctx) {
        // Draw the object using the current image at its x and y position with the given width and height
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Function to draw a frame (outline) around the object for debugging or visualization
    * @param {*} ctx 
    */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Bottle) {
            ctx.beginPath();                                    // Start a new path to draw
            ctx.lineWidth = '5';                                // Set the line width for the frame (outline)
            ctx.strokeStyle = 'blue';                           // Set the stroke color to blue for the frame
            ctx.rect(this.x, this.y, this.width, this.height);  // Draw a rectangle around the object using its current position and size
            ctx.stroke();                                       // Apply the stroke to the path (draw the rectangle)
        }
    }

    /**      
    * Function to load multiple images and store them in an image cache.
    * @param {Array} arr - ['./img/image1.png', './img/image2.png', ...]
    */
    loadImages(arr) {
        arr.forEach((path) => {                                 // Iterate over each image path in the provided array
            let img = new Image();                              // Create a new Image object for each path
            img.src = path;                                     // Set the source of the image to the current path
            this.imageCache[path] = img;                        // Store the loaded image in the imageCache object, using the path as the key
        });
    }

}