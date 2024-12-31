/**
 * Represents a level in the game, containing enemies, clouds, background objects, bottles, and coins.
 * This class is responsible for organizing the various elements present in a game level and their properties.
 * The level also defines the x-coordinate at which the level ends.
 * 
 * @class Level
 */
class Level {
    /**
     * List of enemies in the level.
     * @type {Array}
     */
    enemies;   
                                                
    /**
     * List of clouds in the level.
     * @type {Array}
     */
    clouds;   

    /**
     * List of background objects in the level.
     * @type {Array}
     */
    backgroundObjects;   

    /**
     * The x-coordinate at which the level ends.
     * @type {number}
     * @default 2200
     */
    level_end_x = 2200;   

    /**
     * List of bottles in the level.
     * @type {Array}
     */
    bottles;          
                                          
    /**
     * List of coins in the level.
     * @type {Array}
     */
    coins;                                                  
    
    /**
     * Creates an instance of the Level class.
     * Initializes the level with the provided enemies, clouds, background objects, bottles, and coins.
     * The level also has a fixed x-coordinate (`level_end_x`) where the level ends.
     * 
     * @param {Array} enemies - The list of enemies in the level.
     * @param {Array} clouds - The list of clouds in the level.
     * @param {Array} backgroundObjects - The list of background objects in the level.
     * @param {Array} bottles - The list of bottles in the level.
     * @param {Array} coins - The list of coins in the level.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}