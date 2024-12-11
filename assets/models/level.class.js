class Level {
    enemies;                                                // Declares a property `enemies` to hold the list of enemies in the level
    clouds;                                                 // Declares a property `clouds` to hold the list of clouds in the level
    backgroundObjects;                                      // Declares a property `backgroundObjects` to hold the objects in the background of the level
    level_end_x = 2200;                                     // Declares a property `level_end_x` to define the x-coordinate at which the level ends
    bottles;

    // Constructor to initialize the `Level` class with the given parameters: enemies, clouds, and backgroundObjects
    constructor(enemies, clouds, backgroundObjects, bottles) {       
        this.enemies = enemies;                             // Initializes the `enemies` property with the passed `enemies` parameter
        this.bottles = bottles;
        this.clouds = clouds;                               // Initializes the `clouds` property with the passed `clouds` parameter
        this.backgroundObjects = backgroundObjects;         // Initializes the `backgroundObjects` property with the passed `backgroundObjects` parameter
    }
}