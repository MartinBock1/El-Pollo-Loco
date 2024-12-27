class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    gameSound;
    snoringSound;
    walkingSound;
    jumpingSound;
    pepeHurtSound;
    pepeDeathSound;
    throwingSound;
    bottleCrashSound;
    chickenHitSound;
    chickenFriedSound;
    winSound;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 50,
        left: 0,
        right: 0,
        bottom: 0
    };
    char_x;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {               
            return true;
        } else {
            return this.y < 215;                             
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }  
    
    placeEnemies(imagesArray) {
        this.loadImages(imagesArray);
        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + (Math.random() * 0.4);
    }

    playAnimation(images) {
        /** explanation - de -
         * Die Zeile sorgt dafür, dass der Wert von i immer innerhalb des Bereichs der verfügbaren Bilder
         * bleibt. Wenn this.currentImage beispielsweise 6 erreicht und die Anzahl der Bilder in
         * IMAGES_WALKING 6 ist, würde der Modulo-Operator 6 % 6 den Wert 0 zurückgeben, was bedeutet,
         * dass die Animation wieder beim ersten Bild startet.
         * Dies stellt sicher, dass die Animation wieder von vorne beginnt, sobald das letzte Bild erreicht ist.
         */
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.walkingSound.pause();
        this.speedY = 30;
        this.isJumpingSound();
    }

    isGameSound() {
        this.gameSound.play();
        this.gameSound.volume = 0.05;
    }

    isSnoringSound() {
        this.snoringSound.play();
        this.snoringSound.volume = 0.07;
    }

    isWalkingSound() {
        this.walkingSound.play();
        this.walkingSound.playbackRate = 2;
    }

    isJumpingSound() {
        this.jumpingSound.play();
        this.jumpingSound.volume = 0.1;
    }

    isPepeHurtSound() {
        this.pepeHurtSound.play();
        this.pepeHurtSound.volume = 0.1;
    }

    isPepeDeathSound() {
        this.pepeDeathSound.play();
        this.pepeDeathSound.volume = 0.1;
    }

    isThrowingSound() {
        this.throwingSound.play();
        this.throwingSound.volume = 0.1;
    }

    isBottleCrashSound() {
        this.bottleCrashSound.play();
        this.bottleCrashSound.volume = 1;
    }

    isChickenHitSound() {
        this.chickenHitSound.play();
        this.chickenHitSound.volume = 1;
    }

    isChickenFriedSound() {
        this.chickenFriedSound.play();
        this.chickenFriedSound.volume = 1;
    }

    isWinSound() {
        this.winSound.play();
        this.winSound.volume = 1;
    }

    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isEndbossHit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;   // difference in ms
        timepassed = timepassed / 1000;                         // difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }
}