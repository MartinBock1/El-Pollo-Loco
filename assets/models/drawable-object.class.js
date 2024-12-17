class DrawableObject {
    x = 120;
    y = 250;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        // Draw the object using the current image at its x and y position with the given width and height
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + this.offset.left, 
                this.y - this.offset.top, 
                this.width - this.offset.left - this.offset.right, 
                this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}