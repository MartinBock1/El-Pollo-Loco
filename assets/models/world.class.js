class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new Statusbar('health');
    statusBarCoins = new Statusbar('coin');
    statusBarBottle = new Statusbar('bottle');
    statusBarEndboss = new Statusbar('endboss');
    throwableObjects = [];
    collectedBottles = 0;
    collectedCoins = 0;
    lastThrowTime = 0;
    chickenCrushSound = new Audio('./assets/audio/chicken-crush.mp3');

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 50);

        setInterval(() => {
            this.checkCollisionsWithThrownBottles();
            this.checkCollisionsBottles();
            this.checkCollisionsCoins();
            this.checkThrowObjects();
        }, 150);
    }

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
   
    checkCollisionsWithThrownBottles() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        enemy.isEndbossHit();  
                        this.statusBarEndboss.setPercentage(enemy.energy);
                    }                    
                    this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                }
            });
        });
    }   

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY <= 0) {
                    if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                        this.chickenCrushSound.play();
                        this.chickenCrushSound.volume = 0.1;
                        this.level.enemies.splice(index, 1);
                    }
                } else {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        // The order in which objects are added to the map is important for rendering!
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed objects ----- //
        // Set the y-positions for each status bar before drawing
        this.statusBarHealth.y = 10;
        this.statusBarCoins.y = 50;
        this.statusBarBottle.y = 100;
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        this.statusBarEndboss.x = this.canvas.width - this.statusBarEndboss.width - 40;
        this.statusBarEndboss.y = 10;
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => {
            this.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        // mo.drawOffsetFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}