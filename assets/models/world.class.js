/**
 * Class representing the game world. Manages the game state, including objects, character, levels, and collision detection.
 */
class World {
    /**
    * @type {Character} The main character of the game.
    * @description Represents the player-controlled character in the game world.
    */
    character = new Character();

    /**
    * @type {Level} The level object representing the current game environment.
    * @description Contains the background, enemies, and other level-specific objects.
    */
    level = level1;

    /**
     * @type {HTMLCanvasElement} The canvas element on which the game world is drawn.
     * @description Used to render the game graphics.
     */
    canvas;

    /**
     * @type {CanvasRenderingContext2D} The 2D rendering context for the canvas.
     * @description Provides methods for drawing on the canvas.
     */
    ctx;

    /**
     * @type {Object} The keyboard object used to track user input.
     * @description Contains the status of key presses for player controls.
     */
    keyboard;

    /**
     * @type {number} The horizontal offset for the camera's position.
     * @description Determines how much the game world moves horizontally with the camera.
     */
    camera_x = 0;

    /**
     * @type {Statusbar} Status bars representing the character's/ endboss's health, collected coins, collected bottles.
     */
    statusBarHealth = new Statusbar('health');
    statusBarCoins = new Statusbar('coin');
    statusBarBottle = new Statusbar('bottle');
    statusBarEndboss = new Statusbar('endboss');

    /**
     * @type {Array<ThrowableObject>} An array holding all throwable objects (e.g., bottles).
     * @description Stores the throwable objects that can be used by the character.
     */
    throwableObjects = [];

    /**
     * @type {number} The number of bottles the character has collected.
     * @description Tracks how many bottles the player has collected for throwing.
     */
    collectedBottles = 0;

    /**
     * @type {number} The number of coins the character has collected.
     * @description Tracks how many coins the player has collected.
     */
    collectedCoins = 0;

    /**
     * @type {number} The timestamp of the last bottle throw.
     * @description Used to prevent throwing bottles too frequently by tracking the last throw time.
     */
    lastThrowTime = 0;

    /**
     * @type {HTMLAudioElement} The audio element for the chicken crush sound effect.
     * @description Plays a sound when a chicken is crushed by the character.
     */
    chickenCrushSound = new Audio('./assets/audio/chicken-crush.mp3');

    /**
    * Creates an instance of a World.
    * @param {HTMLCanvasElement} canvas - The canvas element used to render the game.
    */
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Initializes the world for the character by setting a reference to the world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the main game loops.
     * Periodically checks for collisions and updates game states.
     */
    run() {
        setStopableInterval(() => {
            this.checkCollisions();
        }, 30);

        setStopableInterval(() => {
            this.checkCollisionsWithThrownBottles();
            this.checkCollisionsBottles();
            this.checkCollisionsCoins();
            this.checkThrowObjects();
        }, 150);
    }

    /**
     * Checks if the player has thrown any bottles and attempts to throw one if conditions are met.
     * The bottle can only be thrown if the player has collected bottles (up to 5) and if enough time has passed between throws.
     */
    checkThrowObjects() {
        if (this.collectedBottles > 0 && this.collectedBottles <= 5) {
            if ((this.keyboard.ENTER || this.keyboard.MOUSE_LEFT) && (new Date().getTime() - this.lastThrowTime) > 500) {
                let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.collectedBottles--;
                this.statusBarBottle.setPercentage(this.collectedBottles * 20);
                this.lastThrowTime = new Date().getTime();
            }
        }
    }
   
    /**
     * Checks for collisions between thrown bottles and enemies. If a collision occurs, the enemy takes damage or dies.
     * @fires {Event} 'enemy-hit' - Triggered when an enemy is hit by a thrown bottle.
     */
    checkCollisionsWithThrownBottles() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy, index) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        enemy.isEndbossHit();  
                        this.statusBarEndboss.setPercentage(enemy.energy);
                    } else if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {   
                        enemy.die();    
                        setTimeout(() => {                            
                            this.level.enemies.splice(index, 1); 
                        }, 700);                              
                    }                   
                    this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                }
            });
        });
    }   

    /**
     * Checks for collisions between the character and enemies.
     * If the character lands on an enemy from above, the enemy is crushed.
     * Otherwise, the character takes damage.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY <= 0) {
                    if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                        if (!isMuted) {
                            this.chickenCrushSound.play();
                        }
                        this.chickenCrushSound.volume = 0.1;
                        this.level.enemies.splice(index, 1);
                    }
                } else if (enemy instanceof Endboss) {
                    this.character.x -= 30;
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                } else {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Checks for collisions between the character and bottles in the level. 
     * If a bottle is collected, it increases the bottle status bar and removes the bottle from the level.
     */
    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && !bottle.collected) {
                this.statusBarBottle.increasePercentage(20);
                if (this.collectedBottles < 5) {
                    this.collectedBottles++;
                    this.statusBarBottle.setPercentage(this.collectedBottles * 20);
                    this.level.bottles.splice(index, 1);
                    bottle.collected = true;
                }
            };
        });
    }

    /**
     * Checks for collisions between the character and coins in the level.
     * If a coin is collected, it increases the coin status bar and removes the coin from the level.
     */
    checkCollisionsCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.statusBarCoins.increasePercentage(10);
                if (this.collectedCoins < 10) {
                    this.collectedCoins++;
                    this.statusBarCoins.setPercentage(this.collectedCoins * 10);
                    this.level.coins.splice(index, 1);
                }
            };
        });
    }

    /**
     * The main rendering loop of the game, called on every frame via `requestAnimationFrame`.
     * This method is responsible for clearing the canvas and drawing all game objects in a specific, layered order.
     * It handles:
     * 1. Drawing parallax background layers.
     * 2. Applying a camera translation to create a scrolling world.
     * 3. Drawing all dynamic world objects (enemies, items, etc.).
     * 4. Resetting the translation to draw fixed UI elements (HUD).
     * 5. Drawing the main character within the scrolled world.
     * 6. Scheduling the next frame to create a continuous animation.
     * The complex sequence of translations is necessary to correctly layer parallax, scrolling, and fixed elements.
     */
    draw() {
        // Step 1: Clear the entire canvas to remove artifacts from the previous frame.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Step 2: Draw the background objects. These are drawn before any camera translation
        // because their parallax effect is calculated independently inside `addToMap`.
        this.addObjectsToMap(this.level.backgroundObjects);
        
        // Step 3: Apply the main camera's horizontal translation. This shifts the coordinate system
        // for all subsequent drawings, creating the illusion of a scrolling world.
        this.ctx.translate(this.camera_x, 0);

        // Step 4: Draw all world objects that should move with the camera.
        // The order here is important for layering (e.g., clouds are behind enemies).
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        // Step 5: Reset the camera translation. This brings the coordinate system's origin
        // back to the top-left corner of the canvas, which is necessary for drawing fixed objects.
        this.ctx.translate(-this.camera_x, 0);

        // ----- Space for fixed objects (HUD) ----- //
        // Step 6: Draw the status bars. Since the translation was reset, they will be rendered
        // at a fixed position on the screen and will not scroll with the world.
        this.drawStatusBars();

        // Step 7: Re-apply the camera translation to draw the character in the correct world position.
        this.ctx.translate(this.camera_x, 0);

        // Step 8: Draw the main character.
        this.addToMap(this.character);

        // Step 9: Reset the translation a final time to leave the canvas context in a clean state
        // for the next draw cycle.
        this.ctx.translate(-this.camera_x, 0);

        // Step 10: Schedule the `draw` function to be called again before the next browser repaint.
        // This creates the smooth animation loop.
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    /**
     * Draws the status bars for health, coins, bottles, and endboss on the canvas.
     */
    drawStatusBars() {
        this.statusBarHealth.y = 10;
        this.statusBarCoins.y = 50;
        this.statusBarBottle.y = 100;
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        this.statusBarEndboss.x = this.canvas.width - this.statusBarEndboss.width - 40;
        this.statusBarEndboss.y = 10;
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Adds multiple objects to the canvas map.
     * @param {Array<MovableObject>} objects - An array of movable objects to be drawn.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
    * Adds a single object to the canvas map and handles potential direction flipping.
    * @param {MovableObject} mo - The movable object to be drawn.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        if (mo instanceof BackgroundObject) {
            // Wir berechnen die effektive X-Position des Hintergrundbildes manuell.
            // Die globale `camera_x` Verschiebung wird mit dem parallaxFactor des Objekts multipliziert.
            let x = mo.x + this.camera_x * mo.parallaxFactor;
            this.ctx.drawImage(mo.img, x, mo.y, mo.width, mo.height);
        } else {
            // Alle anderen Objekte werden normal gezeichnet.
            // Ihre Position wird bereits durch das globale `ctx.translate` korrekt verschoben.
            mo.draw(this.ctx);
        }

        // mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        // mo.drawOffsetFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an object horizontally for rendering when it is facing the other direction.
     * @param {MovableObject} mo - The movable object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original orientation of the flipped object.
     * @param {MovableObject} mo - The movable object to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}