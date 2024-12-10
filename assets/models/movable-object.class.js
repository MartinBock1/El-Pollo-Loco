class MovableObject {
    x = 120;
    y = 235;
    img;
    height = 200;
    width = 80;

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img> id="image" src="./img/test.png">
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}