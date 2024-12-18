class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    offset = {
        top: 150,
        bottom: 20,
        left: 40,
        right: 40,
    };


    IMAGES_ALERT = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    flagContact = false;
    flagPoint = 2000;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        this.animate();
    }

    // animate() {                                                                         
    //     setInterval(() => {                 
    //         this.playAnimation(this.IMAGES_ALERT);
    //     }, 200);
    // }

    animate() {
        let alertInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);

        // darf erst nach der ersten Animation begonnen werden!
        setTimeout(() => {
            clearInterval(alertInterval);
            if (world.character.x > this.flagPoint && !this.flagContact) {
                this.flagContact = true;
                console.log(this.flagContact);
                console.log(world.character.x, "x vom Character wird erkannt");

                // Bewege den Boss nach links
                setInterval(() => {
                    this.moveLeft();
                }, 1000 / 60);

                // Animation des Bosses
                setInterval(() => {
                    this.playAnimation(this.IMAGES_WALKING);
                }, 200);
            }

        }, 5000); // 5 Sekunden warten
    }

    // animate() {
    //     let i = 0;
    //     setInterval(() => {
    //         if (i < this.IMAGES_ALERT.length) {
    //             this.playAnimation(this.IMAGES_ALERT);
    //         } else {
    //             this.playAnimation(this.IMAGES_WALKING);
    //             // this.moveLeft();
    //         }
    //         i++;

    //         if (world.character.x > this.flagPoint && !this.flagContact) {
    //             i = 0;
    //             this.flagContact = true;
    //             console.log(world.character.x, "x vom Character wird erkannt");
    //             setInterval(() => {
    //                 this.moveLeft();
    //             }, 1000 / 60);
    //         }
    //     }, 1000 / 5);

    // }
}