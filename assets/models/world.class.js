// Define the World class, which represents the game world
class World {
    character = new Character();    // Initialize the character object as an instance of the Character class
    enemies = [                     // Create an array of enemies, which in this case are instances of the Chicken class
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds = [                      // Create an array of clouds, which in this case is an instance of the Cloud class
        new Cloud()
    ];

    backgroundObjects = [           // Create an array of background objects, each representing a layer of the background
        new BackgroundObject('./assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0),
    ];
    canvas;                         // Declare the canvas and context variables
    ctx; 
    keyboard;                       // Declare the keyboard object, which will track user input

    constructor(canvas) {                       // Constructor function to initialize the World object
        this.ctx = canvas.getContext("2d");     // Get the 2D context of the canvas to draw on it
        this.canvas = canvas;                   // Assign the canvas element to the class's canvas property
        this.keyboard = keyboard;               // Assign the keyboard object to the class's keyboard property
        this.draw();                            // Call the draw method to start rendering the world
        this.setWorld();                        // Set the world for the character, which links the character to the world
    }

    setWorld() {                                // Set the world reference for the character object
        this.character.world = this;
    }
    
    draw() {                                                                // Draw the game world on the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)     // Clear the canvas to remove the previous frame

        // The order in which objects are added to the map is important for rendering!
        this.addObjectsToMap(this.backgroundObjects);                       // Add the background objects to the map (background layers)
        this.addObjectsToMap(this.clouds);                                  // Add the clouds to the map
        this.addObjectsToMap(this.enemies);                                 // Add the enemies to the map
        this.addToMap(this.character);                                      // Add the character to the map (gameplay object)

        // Continuously call the draw method to create an animation loop
        let self = this;                    
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {          // Helper function to add multiple objects to the map by iterating over an array
        objects.forEach(o => {
            this.addToMap(o);           // Add each object in the array to the map
        });
    }

    addToMap(mo) {                                                      // Function to draw a single object on the map
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);    // Draw the object on the canvas at its position with its size
    }
}